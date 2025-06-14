"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";
import { AddToCart } from "@/layouts/components/cart/AddToCart";
import { useEffect, useState } from "react";
import { getCollectionProducts } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action & {
    fine_print?: string;
  };
}

const CallToAction = ({ data }: { data: PageData }) => {
  const [pizzaProduct, setPizzaProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchPizzaProduct = async () => {
      try {
        const { products } = await getCollectionProducts({
          collection: "_drop01",
        });
        // Find the pizza t-shirt product
        const pizzaTee = products.find((product) =>
          product.title.toLowerCase().includes("pizza"),
        );
        if (pizzaTee) {
          setPizzaProduct(pizzaTee);
        }
      } catch (error) {
        console.error("Error fetching pizza product:", error);
      }
    };

    fetchPizzaProduct();
  }, []);

  return (
    <>
      {data.frontmatter.enable && (
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="rounded-xl bg-light px-6 py-8 md:py-16 ">
              <div className="row items-center">
                <div className="mb-10 md:mb-0 lg:col-6 xl:col-6 mx-auto text-center order-2 lg:order-0">
                  <div
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.sub_title,
                    )}
                    className="md:text-lg text-text-dark  font-bold mb-6 whitespace-pre-line"
                  />
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="my-4 text-2xl md:text-3xl text-text-dark  font-['Wallpoet']"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-8 md:text-lg text-text-dark/80  font-['Consolas'] whitespace-pre-line"
                  />

                  {pizzaProduct ? (
                    <div className="mb-8">
                      <AddToCart
                        variants={pizzaProduct.variants}
                        availableForSale={pizzaProduct.availableForSale}
                        stylesClass="btn btn-lg bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90 font-medium"
                        handle={pizzaProduct.handle}
                        defaultVariantId={pizzaProduct.variants[0]?.id}
                        buttonText={data.frontmatter.button.label}
                      />
                    </div>
                  ) : (
                    <Link
                      className="btn btn-lg bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90 font-medium mb-8"
                      href={data.frontmatter.button.link}
                    >
                      {data.frontmatter.button.label}
                    </Link>
                  )}

                  {data.frontmatter.fine_print && (
                    <p className="text-sm text-text-dark/60  font-['Consolas']">
                      {data.frontmatter.fine_print}
                    </p>
                  )}
                </div>

                <div className="mx-auto lg:col-5 mb-6 lg:mb-0">
                  <ImageFallback
                    src={data.frontmatter.image}
                    width={543}
                    height={390}
                    alt="Bitcoin Pizza Day Tee"
                    className="mx-auto rounded-lg shadow-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
