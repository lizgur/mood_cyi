"use server";
import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "@/lib/constants";
import { isShopifyError } from "@/lib/typeGuards";
import { ensureStartsWith } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import {
  createCustomerMutation,
  getCustomerAccessTokenMutation,
  getUserDetailsQuery,
} from "./mutations/customer";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
  getHighestProductPriceQuery,
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";
import { getVendorsQuery } from "./queries/vendor";
import {
  Cart,
  Collection,
  Connection,
  CustomerInput,
  Image,
  Menu,
  Page,
  PageInfo,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
  registerOperation,
  user,
  userOperation,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function shopifyFetch<T>({
  cache = "no-store",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    console.log("Shopify Config:", { 
      domain, 
      hasKey: !!key, 
      endpoint 
    });
    
    if (!domain || !key) {
      console.warn(`Missing Shopify credentials - Domain: ${domain}, Key: ${key ? 'Present' : 'Missing'}`);
      // Return mock data structure instead of throwing error
      return { 
        status: 200, 
        body: { 
          data: null,
          errors: [{ message: "Shopify credentials not configured" }]
        } as T 
      };
    }

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache: "no-store",
      next: {
        tags: [...(tags || []), "products", "collections"],
        revalidate: 0,
      },
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const body = await result.json();

    if (body.errors) {
      console.error("Shopify GraphQL errors:", body.errors);
      throw new Error(body.errors[0].message || "GraphQL error");
    }

    // Log the response data for debugging
    console.log("Shopify GraphQL response:", JSON.stringify(body, null, 2));

    return { status: result.status, body };
  } catch (e) {
    console.error("Shopify fetch error:", e);

    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e instanceof Error ? e.message : "Unknown error",
      query,
      status: 500,
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = { amount: "0.0", currencyCode: "USD" };
  }

  return { ...cart, lines: removeEdgesAndNodes(cart.lines) };
};

const reshapeCollection = (
  collection: ShopifyCollection,
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return { ...collection, path: `/products/${collection.handle}` };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  // Log the flattened images for debugging
  console.log("Flattened images:", JSON.stringify(flattened, null, 2));

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    const reshapedImage = {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
      transformedSrc: image.transformedSrc || image.url,
      url: image.url.startsWith("//") ? `https:${image.url}` : image.url,
    };

    // Ensure transformedSrc is also properly formatted
    if (reshapedImage.transformedSrc.startsWith("//")) {
      reshapedImage.transformedSrc = `https:${reshapedImage.transformedSrc}`;
    }

    // Log each reshaped image for debugging
    console.log("Reshaped image:", JSON.stringify(reshapedImage, null, 2));

    return reshapedImage;
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true,
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });

  console.log("Shopify addToCart response:", JSON.stringify(res.body, null, 2));

  if (!res.body.data.cartLinesAdd.cart) {
    throw new Error("Failed to add items to cart - item may be out of stock or unavailable");
  }

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: "no-store",
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: { handle },
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  filterCategoryProduct,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  filterCategoryProduct?: any[]; // Update the type based on your GraphQL schema
}): Promise<{ pageInfo: PageInfo | null; products: Product[] }> {
  try {
    const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
      query: getCollectionProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: {
        handle: collection,
        reverse,
        sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
        filterCategoryProduct, // Pass the filters variable to the query
      } as {
        handle: string;
        reverse?: boolean;
        sortKey?: string;
        filterCategoryProduct?: any[];
      },
    });

    if (!res.body.data.collection) {
      // console.log(`No collection found for \`${collection}\``);
      return { pageInfo: null, products: [] };
    }

    // return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
    const pageInfo = res.body.data?.collection?.products?.pageInfo;

    return {
      pageInfo,
      products: reshapeProducts(
        removeEdgesAndNodes(res.body.data.collection.products),
      ),
    };
  } catch (error) {
    console.error(`Error fetching collection products for ${collection}:`, error);
    return { pageInfo: null, products: [] };
  }
}

export async function createCustomer(input: CustomerInput): Promise<any> {
  const res = await shopifyFetch<registerOperation>({
    query: createCustomerMutation,
    variables: { input },
    cache: "no-store",
  });
  // console.log(res.body.data.customerCreate.customerUserErrors)

  const customer = res.body.data?.customerCreate?.customer;
  const customerCreateErrors =
    res.body.data?.customerCreate?.customerUserErrors;

  return { customer, customerCreateErrors };
}

export async function getCustomerAccessToken({
  email,
  password,
}: Partial<CustomerInput>): Promise<any> {
  const res = await shopifyFetch<any>({
    query: getCustomerAccessTokenMutation,
    variables: { input: { email, password } },
  });

  const token =
    res.body.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
  const customerLoginErrors =
    res?.body?.data?.customerAccessTokenCreate?.customerUserErrors;

  return { token, customerLoginErrors };
}

export async function getUserDetails(accessToken: string): Promise<user> {
  const response = await shopifyFetch<userOperation>({
    query: getUserDetailsQuery,
    variables: { input: accessToken },
    cache: "no-store",
  });

  return response.body.data;
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const shopifyResponse = await shopifyFetch<ShopifyCollectionsOperation>({
      query: getCollectionsQuery,
      tags: [TAGS.collections],
    });

    // Handle missing credentials gracefully
    if (!shopifyResponse.body.data || (shopifyResponse.body as any).errors) {
      console.warn("Shopify not configured, returning empty collections");
      return [];
    }

    const collections = reshapeCollections(
      removeEdgesAndNodes(shopifyResponse.body.data.collections),
    );

    return [
      {
        handle: "all",
        title: "All",
        description: "All products",
        seo: { title: "All", description: "All products" },
        path: "/products",
        updatedAt: new Date().toISOString(),
      },
      // Add a placeholder filter
      ...collections,
    ];
  } catch (error) {
    console.error("Error fetching collections:", error);
    // Return fallback collections
    return [
      {
        handle: "all",
        title: "All",
        description: "All products",
        seo: { title: "All", description: "All products" },
        path: "/products",
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}

export async function getMenu(handle: string): Promise<Menu[]> {
  try {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      tags: [TAGS.collections],
      variables: { handle },
    });

    return (
      res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
        title: item.title,
        path: item.url
          .replace(domain, "")
          .replace("/collections", "/search")
          .replace("/pages", ""),
      })) || []
    );
  } catch (error) {
    console.error(`Error fetching menu ${handle}:`, error);
    return [];
  }
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    const res = await shopifyFetch<ShopifyProductOperation>({
      query: getProductQuery,
      tags: [TAGS.products],
      variables: { handle },
    });

    return reshapeProduct(res.body.data.product, false);
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return undefined;
  }
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  try {
    const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
      query: getProductRecommendationsQuery,
      tags: [TAGS.products],
      variables: { productId },
    });

    return reshapeProducts(res.body.data.productRecommendations);
  } catch (error) {
    console.error(`Error fetching product recommendations for ${productId}:`, error);
    return [];
  }
}

export async function getVendors({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<{ vendor: string; productCount: number }[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getVendorsQuery,
    tags: [TAGS.products],
    variables: { query, reverse, sortKey },
  });

  const products = removeEdgesAndNodes(res.body.data.products);

  // Create an array to store objects with vendor names and product counts
  const vendorProductCounts: { vendor: string; productCount: number }[] = [];

  // Process the products and count them by vendor
  products.forEach((product) => {
    const vendor = product.vendor;
    if (vendor) {
      // Check if the vendor is already in the array
      const existingVendor = vendorProductCounts.find(
        (v) => v.vendor === vendor,
      );

      if (existingVendor) {
        // Increment the product count for the existing vendor
        existingVendor.productCount++;
      } else {
        // Add a new vendor entry
        vendorProductCounts.push({ vendor, productCount: 1 });
      }
    }
  });

  return vendorProductCounts;
}

export async function getTags({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: { query, reverse, sortKey },
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  cursor,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  cursor?: string;
}): Promise<{ pageInfo: PageInfo; products: Product[] }> {
  try {
    const res = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      tags: [TAGS.products],
      variables: { query, reverse, sortKey, cursor },
    });

    // Handle missing credentials gracefully
    if (!res.body.data || (res.body as any).errors) {
      console.warn("Shopify not configured, returning empty products");
      return {
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: "",
        },
        products: [],
      };
    }

    return {
      pageInfo: res.body.data.products.pageInfo,
      products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: "",
      },
      products: [],
    };
  }
}

export async function getHighestProductPrice(): Promise<{
  amount: string;
  currencyCode: string;
} | null> {
  try {
    const res = await shopifyFetch<any>({ query: getHighestProductPriceQuery });

    // Extract and return the relevant data
    const highestProduct = res?.body?.data?.products?.edges[0]?.node;
    const highestProductPrice = highestProduct?.variants?.edges[0]?.node?.price;

    return highestProductPrice || null;
  } catch (error) {
    console.error("Error fetching highest product price:", error);
    return null;
  }
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
  const topic = (await headers()).get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_API_SECRET_KEY) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
