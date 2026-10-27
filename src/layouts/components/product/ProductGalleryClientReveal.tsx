"use client";

import { useEffect } from "react";

/**
 * After hydration, show the interactive gallery and hide the SSR copy so
 * shoppers are not looking at two identical image stacks. The SSR markup
 * stays in the DOM for the first HTML response.
 */
const ProductGalleryClientReveal = () => {
  useEffect(() => {
    const root = document.querySelector(".product-gallery");
    if (!(root instanceof HTMLElement)) return;
    const ssr = root.querySelector(".product-gallery-ssr");
    const client = root.querySelector(".product-gallery-client");
    if (ssr instanceof HTMLElement) ssr.classList.add("hidden");
    if (client instanceof HTMLElement) client.classList.remove("hidden");
  }, []);

  return null;
};

export default ProductGalleryClientReveal;
