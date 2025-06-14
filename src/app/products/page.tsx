import LoadingProducts from "@/components/loadings/skeleton/SkeletonProducts";
import ProductLayouts from "@/components/product/ProductLayouts";
import { defaultSort, sorting } from "@/lib/constants";
import { getListPage } from "@/lib/contentParser";
import {
  getCollectionProducts,
  getCollections,
  getHighestProductPrice,
  getProducts,
} from "@/lib/shopify";
import { PageInfo, Product } from "@/lib/shopify/types";
import CallToAction from "@/partials/CallToAction";
import ProductFilters from "@/partials/ProductFilters";
import ResponsiveProductView from "@/partials/ResponsiveProductView";
import { Suspense } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchParams {
  sort?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  c?: string;
  t?: string;
}

const ShowProducts = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    c: category,
    t: tag,
  } = searchParams as {
    [key: string]: string;
  };

  const { layout, cursor } = searchParams as { [key: string]: string };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let productsData: any;
  let categoriesWithCounts: { category: string; productCount: number }[] = [];

  if (searchValue || minPrice || maxPrice || category || tag) {
    let queryString = "";

    if (minPrice || maxPrice) {
      queryString += `variants.price:<=${maxPrice} variants.price:>=${minPrice}`;
    }

    if (searchValue) {
      // Add proper spacing if there's already content in queryString
      if (queryString) {
        queryString += ` `;
      }
      queryString += `title:*${searchValue}*`;
    }

    if (tag) {
      // Add proper spacing if there's already content in queryString
      if (queryString) {
        queryString += ` `;
      }
      queryString += `tag:${tag}`;
    }

    console.log("Search query string:", queryString);

    const query = {
      sortKey,
      reverse,
      query: queryString.trim(),
      cursor,
    };

    productsData =
      category && category !== "all"
        ? await getCollectionProducts({
            collection: category,
            sortKey,
            reverse,
          })
        : await getProducts(query);

    const uniqueCategories: string[] = [
      ...new Set(
        ((productsData?.products as Product[]) || []).flatMap(
          (product: Product) =>
            product.collections.nodes.map(
              (collectionNode: any) => collectionNode.title || "",
            ),
        ),
      ),
    ];

    categoriesWithCounts = uniqueCategories.map((category: string) => {
      const productCount = ((productsData?.products as Product[]) || []).filter(
        (product: Product) =>
          product.collections.nodes.some(
            (collectionNode: any) => collectionNode.title === category,
          ),
      ).length;
      return { category, productCount };
    });
  } else {
    // Fetch all products
    productsData = await getProducts({ sortKey, reverse, cursor });
  }
  const categories = await getCollections();

  const tags = [
    ...new Set(
      (
        productsData as { pageInfo: PageInfo; products: Product[] }
      )?.products.flatMap((product: Product) => product.tags),
    ),
  ];

  const maxPriceData = await getHighestProductPrice();

  return (
    <>
      <Suspense>
        <ProductLayouts
          categories={categories}
          tags={tags}
          maxPriceData={maxPriceData}
          categoriesWithCounts={categoriesWithCounts}
        />
      </Suspense>

      <div className="container">
        <div className="row">
          <div className="col-3 hidden lg:block -mt-14">
            <Suspense>
              <ProductFilters
                categories={categories}
                tags={tags}
                maxPriceData={maxPriceData!}
                categoriesWithCounts={categoriesWithCounts}
              />
            </Suspense>
          </div>

          <div className="col-12 lg:col-9">
            <Suspense fallback={<LoadingProducts />}>
              <ResponsiveProductView
                searchParams={searchParams}
                initialProducts={productsData.products}
                initialPageInfo={productsData.pageInfo}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsListPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchParams = await props.searchParams;
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      {/* <PageHeader title={"Products"} /> */}
      <Suspense fallback={<LoadingProducts />}>
        <ShowProducts searchParams={searchParams} />
      </Suspense>

      <CallToAction data={callToAction} />
    </>
  );
};

export default ProductsListPage;
