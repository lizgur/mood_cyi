import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { getCart, createCart } from "@/lib/shopify";

export default async function Cart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  let cart;

  console.log("Cart component loading - cartId:", cartId);

  if (cartId) {
    try {
      // Decode the URL-encoded cart ID before passing to getCart
      const decodedCartId = decodeURIComponent(cartId);
      console.log("Attempting to fetch cart with decoded ID:", decodedCartId);
      
      cart = await getCart(decodedCartId);
      
      // If cart is null/undefined (expired), create a new one
      if (!cart) {
        console.log("Cart not found or expired, creating new cart");
        cart = await createCart();
        // Update the cookie with the new cart ID
        cookieStore.set("cartId", cart.id);
        console.log("New cart created with ID:", cart.id);
      }
      
      console.log("Cart fetched successfully:", {
        cartExists: !!cart,
        cartId: cart?.id,
        hasCheckoutUrl: !!cart?.checkoutUrl,
        checkoutUrl: cart?.checkoutUrl,
        totalQuantity: cart?.totalQuantity,
        linesCount: cart?.lines?.length
      });
    } catch (error) {
      console.error("Error loading cart:", error);
      
      // Try to create a new cart if the old one failed
      try {
        console.log("Creating new cart due to error");
        cart = await createCart();
        cookieStore.set("cartId", cart.id);
        console.log("Fallback cart created with ID:", cart.id);
      } catch (createError) {
        console.error("Failed to create fallback cart:", createError);
        cart = undefined;
      }
    }
  } else {
    console.log("No cartId found in cookies");
  }

  return <CartModal cart={cart} />;
}
