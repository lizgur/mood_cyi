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
  
  // Debug environment variables (only log in development for security)
  if (process.env.NODE_ENV === 'development') {
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN ? 'SET' : 'NOT SET',
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'SET' : 'NOT SET',
      slug: params.slug
    });
  }
  
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
      availableForSale,
      handle,
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
      <div className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="md:col-7 lg:col-6">
              <div className="product-gallery">
                <div className="gallery-wrapper">
                  <ProductGalleryWrapper images={images} />
                </div>
              </div>
            </div>
            <div className="md:col-5 lg:col-6">
              <div className="product-info">
                <div className="product-info-inner">
                  <div className="product-meta">
                    <h1 className="product-title">{title}</h1>
                    <div className="product-price">
                      <span className="price">
                        {priceRange.minVariantPrice.amount}{" "}
                        {priceRange.minVariantPrice.currencyCode}
                      </span>
                    </div>
                  </div>

                  <div className="product-description">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: descriptionHtml,
                      }}
                    />
                  </div>

                  <div className="variant-selector-wrapper">
                    <VariantSelector
                      options={options}
                      variants={variants}
                      images={images}
                    />
                  </div>

                  <div className="add-to-cart-wrapper">
                    <AddToCart
                      variants={variants}
                      availableForSale={availableForSale}
                      defaultVariantId={defaultVariantId}
                      stylesClass="btn btn-primary max-md:btn-sm"
                      handle={handle}
                    />
                  </div>

                  <div className="product-tags">
                    <ShowTags tags={tags} />
                  </div>

                  <div className="product-social">
                    <Social
                      socialName={title}
                      className="social-icons"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
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
              </div>
            </div>
          </div>
        </section>

        {productRecommendations.length > 0 && (
          <section className="pt-2 pb-8 md:pt-3 md:pb-12">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="h3 mb-8 text-center">You might also like</h2>
                </div>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <LatestProducts products={productRecommendations} />
                </div>
              </div>
            </div>
          </section>
        )}

        {callToAction.frontmatter.enable && (
          <CallToAction data={callToAction} />
        )}
      </div>
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
