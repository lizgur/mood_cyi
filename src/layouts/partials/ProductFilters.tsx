"use client";

import ShowTags from "@/components/product/ShowTags";
import RangeSlider from "@/components/rangeSlider/RangeSlider";
import { ShopifyCollection } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ProductFilters = ({
  categories,
  tags,
  maxPriceData,
  categoriesWithCounts,
}: {
  categories: ShopifyCollection[];
  tags: string[];
  maxPriceData: { amount: string; currencyCode: string };
  categoriesWithCounts: { category: string; productCount: number }[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("c");

  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (handle === selectedCategory) {
      newParams.delete("c");
    } else {
      newParams.set("c", handle);
    }
    router.push(createUrl("/products", newParams), { scroll: false });
  };

  return (
    <div>
      <div>
        <h5 className="mb-2 lg:text-xl">Select Price Range</h5>
        <hr className="border-border " />
        <div className="pt-4">
          <Suspense>
            <RangeSlider maxPriceData={maxPriceData} />
          </Suspense>
        </div>
      </div>

      <div>
        <h5 className="mb-2 mt-4 lg:mt-6 lg:text-xl">Product Categories</h5>
        <hr className="border-border " />
        <ul className="mt-4 space-y-4">
          {categories.map((category) => (
            <li
              key={category.handle}
              className={`flex items-center justify-between cursor-pointer ${
                selectedCategory === category.handle
                  ? "text-text-dark  font-semibold"
                  : "text-text-light "
              }`}
              onClick={() => handleCategoryClick(category.handle)}
            >
              {category.title}{" "}
              {searchParams.has("c") ? (
                <span>({category?.products?.edges.length!})</span>
              ) : (
                <span>
                  {categoriesWithCounts.length > 0
                    ? `(${
                        categoriesWithCounts.find(
                          (c) => c.category === category.title,
                        )?.productCount || 0
                      })`
                    : `(${category?.products?.edges.length!})`}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {tags.length > 0 && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Tags</h5>
          <hr className="border-border " />
          <div className="mt-4">
            <Suspense>
              <ShowTags tags={tags} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
