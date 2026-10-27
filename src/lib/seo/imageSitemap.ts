import { getAllProducts } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import { featuredProductImageAlt, productImageAlt } from "@/lib/seo/productImages";
import { absoluteUrl } from "@/lib/seo";

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function productImageEntries(product: Product) {
  const seen = new Set<string>();
  const images = product.images.length
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : [];

  return images
    .map((image, index) => {
      const loc = image.url?.startsWith("//") ? `https:${image.url}` : image.url;
      if (!loc || seen.has(loc)) return null;
      seen.add(loc);
      const caption = productImageAlt({
        handle: product.handle,
        title: product.title,
        altText: image.altText,
        index,
      });
      const title =
        index === 0
          ? featuredProductImageAlt(
              product.handle,
              product.title,
              image.altText,
            )
          : `${product.title} — gallery image ${index + 1}`;
      return { loc, title, caption };
    })
    .filter((entry): entry is { loc: string; title: string; caption: string } =>
      Boolean(entry),
    );
}

export async function buildImageSitemapXml(): Promise<string> {
  const products = await getAllProducts();
  const seenHandles = new Set<string>();

  const urls = products
    .filter((p) => p.handle && !seenHandles.has(p.handle) && seenHandles.add(p.handle))
    .map((product) => {
      const images = productImageEntries(product);
      if (!images.length) return "";
      const imageXml = images
        .map(
          (image) => `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`,
        )
        .join("\n");
      return `  <url>
    <loc>${escapeXml(absoluteUrl(`/products/${product.handle}`))}</loc>
${imageXml}
  </url>`;
    })
    .filter(Boolean)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}
