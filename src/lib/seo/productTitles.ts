/**
 * Shopify product titles already live on the three Bitcoin tees.
 * Prefer the Storefront `product.title` at render time so H1 / cards /
 * schema stay in sync if Shopify changes again. These strings are fallbacks
 * only (local builds without credentials, or copy that cannot fetch).
 */
export const SHOPIFY_PRODUCT_TITLES: Record<string, string> = {
  "genesis-t-shirt": "Bitcoin Genesis Block T-Shirt",
  "whitepaper-t-shirt": "Bitcoin Whitepaper T-Shirt",
  "pizza-t-shirt": "Bitcoin Pizza Day T-Shirt",
};

export function productDisplayName(
  handle: string,
  shopifyTitle?: string | null,
): string {
  const live = shopifyTitle?.trim();
  if (live) return live;
  return SHOPIFY_PRODUCT_TITLES[handle] || "MOOD Bitcoin T-Shirt";
}
