"use server";

import { TAGS } from "@/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  let cartId: string | undefined = (await cookies()).get("cartId")?.value;
  let cart;

  // Decode the cart ID if it exists
  if (cartId) {
    try {
      const decodedCartId = decodeURIComponent(cartId);
      cart = await getCart(decodedCartId);
      cartId = decodedCartId;
    } catch (error) {
      console.error("Error decoding/fetching cart:", error);
      // If cart can't be fetched, create a new one
      cart = null;
      cartId = undefined;
    }
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    (await cookies()).set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    console.log("Adding to cart:", { cartId, selectedVariantId });
    const result = await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    console.log("Add to cart result:", result);
    revalidateTag(TAGS.cart);
    return "Item added to cart successfully";
  } catch (e) {
    console.error("Error adding item to cart:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    if (errorMessage.includes("out of stock") || errorMessage.includes("unavailable")) {
      return "This item is currently out of stock";
    }
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: { lineId: string; variantId: string; quantity: number },
) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      { id: lineId, merchandiseId: variantId, quantity },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}
