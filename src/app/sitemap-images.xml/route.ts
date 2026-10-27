import { buildImageSitemapXml } from "@/lib/seo/imageSitemap";

export const dynamic = "force-dynamic";

export async function GET() {
  const xml = await buildImageSitemapXml();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
