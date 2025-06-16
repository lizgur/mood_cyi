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
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  
  // Load call-to-action with safe fallback (avoid notFound() errors in production)
  let callToAction = {
    frontmatter: {
      enable: true,
      title: "10,000 BTC for 2 pizzas? We'll settle for 22% off this iconic shirt.",
      sub_title: "🍕 Deal of the Month\nBitcoin Pizza Tee — 22% OFF",
      image: "/images/pizza.png",
      description: "Celebrate crypto's tastiest moment — all June long.\nNo code needed. Discount applied at checkout.",
      button: {
        enable: true,
        label: "🛒 Grab the Deal Now",
        link: "/products?c=_drop01"
      },
      fine_print: "⏳ Ends June 30 2025 or while supplies last."
    }
  };

  // Try to load the actual file, but don't let it break the page
  try {
    const contentPath = path.join(process.cwd(), 'src/content');
    const callToActionPath = path.join(contentPath, 'sections/call-to-action.md');
    
    if (fs.existsSync(callToActionPath)) {
      const fileContent = fs.readFileSync(callToActionPath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      callToAction = { frontmatter: frontmatter as any };
      console.log('Call-to-action loaded successfully from file');
    } else {
      console.log('Call-to-action file not found, using fallback data');
    }
  } catch (error) {
    console.log('Error loading call-to-action file, using fallback data:', error instanceof Error ? error.message : String(error));
  }

  return (
    <>
      <Suspense fallback={<LoadingProductGallery />}>
        <ShowProductSingle params={params} />
      </Suspense>
      {callToAction.frontmatter.enable && (
        <CallToAction data={callToAction} />
      )}
    </>
  );
};

const ShowProductSingle = async ({ params }: { params: { slug: string } }) => {
  try {
    console.log('Loading product with slug:', params.slug);
    
    const paymentsAndDelivery = getListPage("sections/payments-and-delivery.md");
    const { payment_methods, estimated_delivery } =
      paymentsAndDelivery.frontmatter;
    const product = await getProduct(params.slug);

    console.log('Product fetched:', product ? 'SUCCESS' : 'FAILED');
    
    if (!product) {
      console.error('Product not found for slug:', params.slug);
      return notFound();
    }

    console.log('Product details:', { id: product.id, title: product.title, handle: product.handle });

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

    const relatedProducts = await getProductRecommendations(id);

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

                {/* Payment and Delivery Info */}
                <section className="mt-8">
                  <div className="payment-delivery-info">
                    <div className="row">
                      <div className="col-md-6">
                        <h4>Payment Methods</h4>
                        <ul>
                          {payment_methods.map((method: any, index: number) => (
                            <li key={index}>
                              {typeof method === 'string' ? method : method.name || method}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h4>Estimated Delivery</h4>
                        <p>{estimated_delivery}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="pt-2 pb-8 md:pt-3 md:pb-12">
            <div className="container">
              <div className="text-center mb-8">
                <h2 className="section-title">Discover More...</h2>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <LatestProducts products={relatedProducts} />
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    console.error('Product slug:', params.slug);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    
    // Fallback UI when product fails to load
    return (
      <div className="container">
        <div className="text-center py-16">
          <div className="bg-white border-2 border-[#9658F9] rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl text-[#300B6A] mb-4" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
              Product Not Available
            </h2>
            <p className="text-[#300B6A]/80 mb-6" style={{fontFamily: 'Consolas, monospace'}}>
              This product is temporarily unavailable. Please try again later or browse our other products.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="text-left mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm">
                <strong>Debug Info:</strong><br/>
                <code className="text-red-600">
                  Slug: {params.slug}<br/>
                  Error: {error instanceof Error ? error.message : 'Unknown error'}
                </code>
              </div>
            )}
            <div className="space-y-4">
              <a
                href="/products"
                className="btn btn-primary bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90 inline-block"
              >
                Browse All Products
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

export default ProductSingle;
