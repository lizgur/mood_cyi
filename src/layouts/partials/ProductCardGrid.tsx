import Image from "next/image";
import Link from "next/link";
import { featuredProductImageAlt } from "@/lib/seo/productImages";
import { Product } from "@/lib/shopify/types";

const ProductCardGrid = ({ products }: { products: Product[] }) => {
  const layout =
    products.length === 1
      ? "flex justify-center"
      : products.length === 2
        ? "flex justify-center gap-8 md:gap-12"
        : "grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center";

  return (
    <div className="flex justify-center">
      <div className={`${layout} w-full max-w-6xl px-4`}>
        {products.map((product) => {
          const {
            id,
            title,
            handle,
            featuredImage,
            priceRange,
            compareAtPriceRange,
          } = product;
          const imageSrc =
            featuredImage?.url || "/images/product_image404.jpg";
          const hasComparePrice =
            compareAtPriceRange?.maxVariantPrice?.amount &&
            parseFloat(compareAtPriceRange.maxVariantPrice.amount) >
              parseFloat(priceRange.minVariantPrice.amount);

          return (
            <div
              key={id}
              className="text-center mb-4 group relative flex flex-col w-full max-w-sm"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={imageSrc}
                  width={312}
                  height={269}
                  alt={featuredProductImageAlt(
                    handle,
                    title,
                    featuredImage?.altText,
                  )}
                  className="w-full h-[150px] md:h-[269px] object-cover border border-border rounded-md"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="py-2 md:py-4 text-center z-20">
                <h2 className="font-medium text-base md:text-xl">
                  <Link
                    className="after:absolute after:inset-0"
                    href={`/products/${handle}`}
                  >
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-x-2 mt-2 md:mt-4">
                  <span className="text-base md:text-xl font-bold text-text-dark">
                    {priceRange.minVariantPrice.amount}{" "}
                    {priceRange.minVariantPrice.currencyCode}
                  </span>
                  {hasComparePrice && (
                    <s className="text-text-light text-xs md:text-base font-medium">
                      {compareAtPriceRange.maxVariantPrice.amount}{" "}
                      {compareAtPriceRange.maxVariantPrice.currencyCode}
                    </s>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCardGrid;
