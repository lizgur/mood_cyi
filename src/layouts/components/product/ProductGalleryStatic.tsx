import Image from "next/image";
import type { ImageItem } from "./ProductGallery";

/**
 * Server-rendered product gallery. First HTML includes real next/image <img>
 * tags so Google Images can see the photos without executing the Swiper client.
 */
const ProductGalleryStatic = ({ images }: { images: ImageItem[] }) => {
  if (!images.length) return null;

  const primary = images[0];

  return (
    <div data-product-gallery-ssr>
      <div className="relative w-full overflow-hidden">
        <Image
          src={primary.transformedSrc || primary.url}
          alt={primary.altText}
          width={primary.width || 800}
          height={primary.height || 800}
          className="w-full h-full object-contain"
          style={{ maxHeight: "600px" }}
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 md:mt-4 grid grid-cols-4 gap-2.5">
          {images.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className={`relative aspect-square overflow-hidden rounded-md ${
                index === 0
                  ? "border-2 border-primary"
                  : "border border-border"
              }`}
            >
              <Image
                src={item.transformedSrc || item.url}
                alt={item.altText}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 20vw"
                quality={75}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGalleryStatic;
