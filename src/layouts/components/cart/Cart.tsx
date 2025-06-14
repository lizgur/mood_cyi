import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { getCart } from "@/lib/shopify";

export default async function Cart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  let cart;

  if (cartId) {
    try {
      // Decode the URL-encoded cart ID before passing to getCart
      const decodedCartId = decodeURIComponent(cartId);
      cart = await getCart(decodedCartId);
    } catch (error) {
      console.error("Error loading cart:", error);
      // Set cart to undefined on error
      cart = undefined;
    }
  }

  return <CartModal cart={cart} />;
}
