import type { MetadataRoute } from "next";
import { getBlogSitemapEntries } from "@/lib/blog";
import { getAllProducts } from "@/lib/shopify";
import { productImageEntries } from "@/lib/seo/imageSitemap";
import { absoluteUrl } from "@/lib/seo";

// Render per request: the Shopify client uses no-store fetches, so a static
// build-time sitemap would come out empty. New products show up immediately.
export const dynamic = "force-dynamic";

// Last meaningful content change for the static pages.
const STATIC_LAST_MODIFIED = new Date("2026-10-23");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const seen = new Set<string>();

  const posts = getBlogSitemapEntries();

  return [
    { url: absoluteUrl("/"), lastModified: STATIC_LAST_MODIFIED },
    { url: absoluteUrl("/products"), lastModified: STATIC_LAST_MODIFIED },
    {
      url: absoluteUrl("/bitcoin-t-shirts"),
      lastModified: new Date("2026-10-27"),
    },
    { url: absoluteUrl("/about"), lastModified: STATIC_LAST_MODIFIED },
    { url: absoluteUrl("/faq"), lastModified: STATIC_LAST_MODIFIED },
    { url: absoluteUrl("/shipping"), lastModified: new Date("2026-10-26") },
    { url: absoluteUrl("/returns"), lastModified: new Date("2026-10-26") },
    { url: absoluteUrl("/blog"), lastModified: STATIC_LAST_MODIFIED },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.date ? new Date(post.date) : STATIC_LAST_MODIFIED,
    })),
    ...products
      .filter((p) => p.handle && !seen.has(p.handle) && seen.add(p.handle))
      .map((p) => ({
        url: absoluteUrl(`/products/${p.handle}`),
        lastModified: p.updatedAt ? new Date(p.updatedAt) : STATIC_LAST_MODIFIED,
        images: productImageEntries(p).map((image) => image.loc),
      })),
  ];
}
