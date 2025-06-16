export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Social from "@/components/Social";
import { AddToCart } from "@/components/cart/AddToCart";
import LoadingProductGallery from "@/components/loadings/skeleton/SkeletonProductGallery";
import ProductGalleryWrapper from "@/layouts/components/product/ProductGalleryWrapper";
import ShowTags from "@/layouts/components/product/ShowTags";
import { VariantSelector } from "@/layouts/components/product/VariantSelector";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import LatestProducts from "@/partials/FeaturedProducts";
import CallToAction from "@/partials/CallToAction";
import Image from "next/image";
import { Suspense } from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProduct(params.slug);
  if (!product) return notFound();
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
};

const ProductSingle = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  
  // Debug environment variables (only log in development for security)
  if (process.env.NODE_ENV === 'development') {
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN ? 'SET' : 'NOT SET',
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'SET' : 'NOT SET',
      slug: params.slug
    });
  }
  
  let callToAction;
  try {
    callToAction = getListPage("sections/call-to-action.md");
  } catch (error) {
    console.error('Error loading call-to-action:', error);
    // Fallback call-to-action data
    callToAction = {
      frontmatter: {
        enable: true,
        title: "10,000 BTC for 2 pizzas? We'll settle for 22% off this iconic shirt.",
        sub_title: "🍕 Deal of the Month\\nBitcoin Pizza Tee — 22% OFF",
        image: "/images/pizza.png",
        description: "Celebrate crypto's tastiest moment — all June long.\\nNo code needed — discount applied at checkout.",
        button: {
          enable: true,
          label: "Shop Now",
          link: "/products"
        }
      }
    };
  }

  try {
    console.log('Loading product with slug:', params.slug);
    console.log('Environment:', process.env.NODE_ENV);
    
    const paymentsAndDelivery = getListPage("sections/payments-and-delivery.md");
    const { payment_methods, estimated_delivery } =
      paymentsAndDelivery.frontmatter;
    
    console.log('About to call getProduct...');
    const product = await getProduct(params.slug);
    console.log('getProduct completed, result:', product ? 'SUCCESS' : 'FAILED');
    
    if (!product) {
      console.error('Product not found for slug:', params.slug);
      console.error('This might be a production environment issue');
      return notFound();
    }

    console.log('Product details:', { id: product.id, title: product.title, handle: product.handle });

    const productRecommendations = await getProductRecommendations(product.id);
    console.log('Product recommendations loaded:', productRecommendations?.length || 0, 'items');

    const {
      id,
      title,
      description,
      descriptionHtml,
      priceRange,
      compareAtPriceRange,
      images,
      options,
      variants,
      tags,
    } = product;

    const defaultVariantId = variants.length > 0 ? variants[0].id : undefined;

    // Helper function to format keys for display
    const formatKey = (key: string) => {
      return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    };

    // Create product details from available data
    const productDetails = [];

    // Add material information
    productDetails.push({
      key: "material",
      label: "Material",
      value: "100% Cotton",
    });

    // Add fit information
    productDetails.push({
      key: "fit",
      label: "Fit",
      value: "Oversized Fit",
    });

    // Add gender information
    productDetails.push({
      key: "gender",
      label: "Gender",
      value: "Unisex",
    });

    // Add available sizes from options
    const sizeOption = options?.find(
      (option) => option.name.toLowerCase() === "size",
    );
    if (sizeOption && sizeOption.values.length > 0) {
      productDetails.push({
        key: "available_sizes",
        label: "Available Sizes",
        value: sizeOption.values.join(", "),
      });
    }

    // Add collections
    if (product.collections?.nodes && product.collections.nodes.length > 0) {
      const collectionNames = product.collections.nodes
        .map((c: any) => c.title)
        .filter((title: string) => title !== "_drop01");
      if (collectionNames.length > 0) {
        productDetails.push({
          key: "collections",
          label: "Collections",
          value: collectionNames.join(", "),
        });
      }
    }

    // Add brand if not default
    if (product.vendor && product.vendor !== "My Store") {
      productDetails.push({
        key: "brand",
        label: "Brand",
        value: product.vendor,
      });
    }

    return (
      <>
        <section className="md:section-sm">
          <div className="container">
            <div className="row justify-center">
              {/* right side contents  */}
              <div className="col-10 md:col-8 lg:col-6">
                <ProductGalleryWrapper images={images} />
              </div>

              {/* left side contents  */}
              <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
                <h1 className="h2 mb-4">{title}</h1>

                {/* Product Metafields or Fallback Details */}
                {productDetails.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-text-dark ">
                      Product Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Display product details */}
                      {productDetails.map((detail) => (
                        <div key={detail.key} className="flex flex-col">
                          <span className="text-sm font-medium text-text-light ">
                            {detail.label}:
                          </span>
                          <span className="text-sm font-semibold text-text-dark ">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <span className="h3 text-primary">
                    {priceRange.maxVariantPrice.amount}{" "}
                    {priceRange.maxVariantPrice.currencyCode}
                  </span>
                  {compareAtPriceRange.maxVariantPrice.amount &&
                    parseFloat(compareAtPriceRange.maxVariantPrice.amount) >
                      parseFloat(priceRange.maxVariantPrice.amount) && (
                      <span className="h4 text-light ml-2 line-through">
                        {compareAtPriceRange.maxVariantPrice.amount}{" "}
                        {compareAtPriceRange.maxVariantPrice.currencyCode}
                      </span>
                    )}
                </div>

                {/* Description moved here */}
                {description && (
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold mb-3 text-text-dark ">
                      Description
                    </h3>
                    <div
                      className="text-text-light  leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                    />
                  </div>
                )}

                <div className="mb-2">
                  <VariantSelector
                    options={options}
                    variants={variants}
                    images={images}
                  />
                </div>
                <div className="mb-4">
                  <AddToCart
                    variants={variants}
                    availableForSale={product.availableForSale}
                    handle={product.handle}
                    defaultVariantId={defaultVariantId}
                    stylesClass="btn btn-primary max-md:btn-sm"
                  />
                </div>
                <div className="mb-4">
                  <ShowTags tags={tags} />
                </div>
                <div className="mb-4">
                  <Social socialName={title} className="social-icons" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {productRecommendations.length > 0 && (
          <section className="pt-2 pb-8 md:pt-3 md:pb-12">
            <div className="container">
              <div className="text-center mb-8">
                <h2 className="section-title">Discover More...</h2>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <LatestProducts products={productRecommendations} />
                </div>
              </div>
            </div>
          </section>
        )}
        
        <CallToAction data={callToAction} />
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown error type');
    
    // Additional production debugging
    console.error('Production debug info:', {
      NODE_ENV: process.env.NODE_ENV,
      slug: params.slug,
      timestamp: new Date().toISOString(),
      // Don't log actual tokens in production, just check if they exist
      hasShopifyDomain: !!process.env.SHOPIFY_STORE_DOMAIN,
      hasShopifyToken: !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      shopifyDomainLength: process.env.SHOPIFY_STORE_DOMAIN?.length || 0,
      shopifyTokenLength: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length || 0
    });
    
    // In development, show detailed error information
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Development Error</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <p className="font-semibold">Error Details:</p>
              <pre className="mt-2 text-sm overflow-auto">
                {error instanceof Error ? error.stack : String(error)}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    // Production error page with more helpful information
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Available</h1>
          <p className="text-gray-600 mb-4">
            This product is temporarily unavailable. Please try again later or browse our other products.
          </p>
          <div className="space-y-4">
            <a
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse All Products
            </a>
            <br />
            <a
              href="/"
              className="text-blue-600 hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductSingle;
