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

// Removed force-dynamic to prevent SSR failures in production
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

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
  try {
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
  } catch (error) {
    console.error('Error loading products page:', error);
    
    // Fallback UI when API fails
    return (
      <div className="container">
        <div className="text-center py-16">
          <div className="bg-white border-2 border-[#9658F9] rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl text-[#300B6A] mb-4" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
              Products Loading...
            </h2>
            <p className="text-[#300B6A]/80 mb-6" style={{fontFamily: 'Consolas, monospace'}}>
              Our product catalog is being prepared. Please check back in a moment or try refreshing the page.
            </p>
            <div className="space-y-4">
              <a
                href="/products"
                className="btn btn-primary bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90 inline-block"
              >
                Refresh Page
              </a>
              <br />
              <a
                href="/"
                className="text-[#300B6A] hover:underline"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const ProductsListPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchParams = await props.searchParams;
  
  let callToAction;
  try {
    callToAction = getListPage("sections/call-to-action.md");
  } catch (error) {
    console.error('Error loading call-to-action:', error);
    // Fallback call-to-action data
    callToAction = {
      frontmatter: {
        enable: true,
        title: "Ready to Shop?",
        sub_title: "🛍️ Explore Our Collection",
        description: "Discover unique blockchain-inspired designs and limited edition drops.",
        image: "/images/pizza.png",
        button: {
          enable: true,
          label: "Browse Products",
          link: "/products"
        }
      }
    };
  }

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
