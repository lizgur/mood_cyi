import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import { absoluteUrl } from "@/lib/seo";

// Render per request: the Shopify client uses no-store fetches, so a static
// build-time sitemap would come out empty. New products show up immediately.
export const dynamic = "force-dynamic";

// Last meaningful content change for the static pages.
const STATIC_LAST_MODIFIED = new Date("2026-10-23");

async function getAllProducts(): Promise<Product[]> {
  const all: Product[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 20; page++) {
    const { products, pageInfo } = await getProducts({ cursor });
    all.push(...products);
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) break;
    cursor = pageInfo.endCursor;
  }
  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const seen = new Set<string>();

  return [
    { url: absoluteUrl("/"), lastModified: STATIC_LAST_MODIFIED },
    { url: absoluteUrl("/products"), lastModified: STATIC_LAST_MODIFIED },
    { url: absoluteUrl("/about"), lastModified: STATIC_LAST_MODIFIED },
    ...products
      .filter((p) => p.handle && !seen.has(p.handle) && seen.add(p.handle))
      .map((p) => ({
        url: absoluteUrl(`/products/${p.handle}`),
        lastModified: p.updatedAt ? new Date(p.updatedAt) : STATIC_LAST_MODIFIED,
      })),
  ];
}
