"use client";

import { DEFAULT_OPTION } from "@/lib/constants";
import { Cart } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Price from "../Price";
import CloseCart from "./CloseCart";
import { DeleteItemButton } from "./DeleteItemButton";
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import OpenCart from "./OpenCart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <div className="cursor-pointer" aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={closeCart}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[390px] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col border-l border-b drop-shadow-lg rounded-bl-md border-neutral-200 bg-body p-4 md:p-6 text-black   ">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Your Cart</p>
            <button aria-label="Close cart" onClick={closeCart}>
              <CloseCart />
            </button>
          </div>

          <div className="w-full h-px absolute bg-dark  left-0 top-16" />

          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col justify-center items-center space-y-6 flex-1 pt-8 md:pt-16">
              <div>
                <FaShoppingCart size={64} className="md:w-[76px] md:h-[76px]" />
              </div>
              <p>Oops. Your Bag Is Empty.</p>
              <Link
                onClick={closeCart}
                href={"/products"}
                className="btn btn-primary w-full"
              >
                Don&apos;t Miss Out: Add Product
              </Link>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <ul className="flex-grow overflow-auto py-4">
                {cart.lines.map((item, i) => {
                  const merchandiseSearchParams = {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(
                    ({ name, value }) => {
                      if (value !== DEFAULT_OPTION) {
                        merchandiseSearchParams[name.toLowerCase()] = value;
                      }
                    },
                  );

                  const merchandiseUrl = createUrl(
                    `/products/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams),
                  );

                  return (
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-300 "
                    >
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <Link
                          href={merchandiseUrl}
                          onClick={closeCart}
                          className="z-30 flex flex-row space-x-3 md:space-x-4 flex-1 min-w-0"
                        >
                          <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 flex-shrink-0">
                            <Image
                              className="h-full w-full object-cover"
                              src={
                                (() => {
                                  // Handle different possible image structures
                                  const images = item.merchandise.product.images as any;
                                  let imageUrl = "/images/product_image404.jpg";
                                  
                                  // Check if images is an array
                                  if (Array.isArray(images)) {
                                    const matchingImage = images.find(
                                      (image: any) =>
                                        image.altText ===
                                        item.merchandise.selectedOptions.find(
                                          (option: any) => option.name === "Color",
                                        )?.value,
                                    );
                                    imageUrl = matchingImage?.url || imageUrl;
                                  }
                                  // Check if images has edges structure (GraphQL)
                                  else if (images?.edges && Array.isArray(images.edges)) {
                                    const matchingEdge = images.edges.find(
                                      (edge: any) =>
                                        edge.node.altText ===
                                        item.merchandise.selectedOptions.find(
                                          (option: any) => option.name === "Color",
                                        )?.value,
                                    );
                                    imageUrl = matchingEdge?.node?.url || imageUrl;
                                  }
                                  
                                  // Fallback to featured image or default
                                  return imageUrl !== "/images/product_image404.jpg" 
                                    ? imageUrl 
                                    : item.merchandise.product.featuredImage?.url || "/images/product_image404.jpg";
                                })()
                              }
                              alt={item.merchandise.title}
                              width={64}
                              height={64}
                            />
                          </div>

                          <div className="flex flex-1 flex-col text-base min-w-0 pr-2">
                            <span className="leading-tight truncate">
                              {item.merchandise.product.title}
                            </span>
                            {item.merchandise.title !== DEFAULT_OPTION ? (
                              <p className="text-sm text-neutral-500 truncate">
                                {item.merchandise.title}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                        
                        <div className="flex flex-col justify-between items-end space-y-2 flex-shrink-0">
                          <div className="flex items-center space-x-2">
                            <Price
                              className="text-right text-sm"
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                            />
                            <DeleteItemButton item={item} />
                          </div>
                          <div className="flex h-8 flex-row items-center rounded-md border border-neutral-200">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="w-6 text-center">
                              <span className="w-full text-xs md:text-sm">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="py-4 text-sm text-neutral-500 ">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 ">
                  <p>Taxes</p>
                  <Price
                    className="text-right text-base text-black "
                    amount={cart.cost.totalTaxAmount.amount}
                    currencyCode={cart.cost.totalTaxAmount.currencyCode}
                  />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 ">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 ">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black "
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
              <a
                href={cart.checkoutUrl}
                className="block w-full rounded-md bg-dark  p-3 text-center text-sm font-medium text-white  opacity-100 hover:opacity-90"
                onClick={async (e) => {
                  // Debug logging for checkout
                  console.log("Checkout button clicked");
                  console.log("Cart data:", {
                    id: cart?.id,
                    checkoutUrl: cart?.checkoutUrl,
                    totalQuantity: cart?.totalQuantity,
                    hasLines: cart?.lines?.length > 0
                  });
                  
                  // Check if checkoutUrl is missing or invalid
                  if (!cart?.checkoutUrl) {
                    e.preventDefault();
                    console.error("Missing checkout URL");
                    
                    // Try to refresh the page to get a fresh cart
                    if (confirm("Unable to proceed to checkout. Would you like to refresh the page to try again?")) {
                      window.location.reload();
                    }
                    return;
                  }
                  
                  // Check if checkoutUrl is malformed
                  if (!cart.checkoutUrl.startsWith('http')) {
                    e.preventDefault();
                    console.error("Invalid checkout URL format:", cart.checkoutUrl);
                    
                    // Try to refresh the page to get a fresh cart
                    if (confirm("Invalid checkout URL detected. Would you like to refresh the page to try again?")) {
                      window.location.reload();
                    }
                    return;
                  }
                  
                  // Log the final checkout URL for debugging
                  console.log("Redirecting to checkout URL:", cart.checkoutUrl);
                  
                  // Try to open in same window first, fallback to new window if blocked
                  try {
                    window.location.href = cart.checkoutUrl;
                  } catch (redirectError) {
                    console.error("Failed to redirect:", redirectError);
                    // Fallback: open in new window
                    window.open(cart.checkoutUrl, '_blank');
                  }
                }}
              >
                Proceed to Checkout
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
