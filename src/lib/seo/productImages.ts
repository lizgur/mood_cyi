import type { Image } from "@/lib/shopify/types";

/**
 * Descriptive alts used when Shopify leaves alt empty, or when the storefront
 * alt contradicts the product-body copy (Whitepaper is all-over print, not chest).
 * Genesis live copy is chest-only — do not invent a back print.
 */
export const PRODUCT_IMAGE_ALTS: Record<string, string> = {
  "genesis-t-shirt":
    'MOOD Genesis T-shirt — The Times 03/Jan/2009 genesis block headline printed on the chest',
  "whitepaper-t-shirt":
    "MOOD Whitepaper T-shirt — all-over print of Satoshi Nakamoto's Bitcoin Whitepaper",
  "pizza-t-shirt":
    "MOOD Pizza T-shirt — Bitcoin Pizza Day design with the 2010 pizza transaction hash on the sleeve cuffs",
};

const WHITEPAPER_CHEST_ALT = /printed on the chest/i;

export function productImageAlt({
  handle,
  title,
  altText,
  index = 0,
}: {
  handle: string;
  title?: string;
  altText?: string | null;
  index?: number;
}): string {
  const known = PRODUCT_IMAGE_ALTS[handle];
  const shopify = altText?.trim();

  // Whitepaper Shopify alt currently says "printed on the chest". The shirt is
  // an all-over print of the nine-page paper — always prefer the body claim.
  if (handle === "whitepaper-t-shirt") {
    const base = known;
    return index > 0 ? `${base} — gallery image ${index + 1}` : base;
  }

  if (shopify && !(known && WHITEPAPER_CHEST_ALT.test(shopify))) {
    return shopify;
  }

  if (known) {
    return index > 0 ? `${known} — gallery image ${index + 1}` : known;
  }

  return shopify || title?.trim() || "MOOD Bitcoin T-shirt";
}

export function withProductImageAlts<T extends Pick<Image, "altText">>(
  handle: string,
  title: string,
  images: T[],
): T[] {
  return images.map((image, index) => ({
    ...image,
    altText: productImageAlt({
      handle,
      title,
      altText: image.altText,
      index,
    }),
  }));
}

export function featuredProductImageAlt(
  handle: string,
  title: string,
  altText?: string | null,
): string {
  return productImageAlt({ handle, title, altText, index: 0 });
}
