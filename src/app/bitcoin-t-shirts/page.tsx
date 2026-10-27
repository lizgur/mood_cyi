import { Metadata } from "next";
import Link from "next/link";
import config from "@/config/config.json";
import JsonLd from "@/layouts/components/JsonLd";
import ProductCardGrid from "@/partials/ProductCardGrid";
import FaqSection from "@/layouts/partials/FaqSection";
import PageHeader from "@/layouts/partials/PageHeader";
import { getProduct } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import { absoluteUrl, faqPageJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const BITCOIN_TEE_HANDLES = [
  "genesis-t-shirt",
  "whitepaper-t-shirt",
  "pizza-t-shirt",
] as const;

const pageTitle = "Bitcoin T-Shirts";
const pageDescription =
  "MOOD Bitcoin T-shirts from Paphos, Cyprus: Genesis block, Whitepaper, and Bitcoin Pizza Day designs by Yelyzaveta Hurieva.";

const faqs = [
  {
    title: "Which Bitcoin T-shirts does MOOD make?",
    content:
      "Three designs from Bitcoin history: the Genesis T-shirt (The Times headline from the 3 January 2009 genesis block, printed on the chest), the Whitepaper T-shirt (an all-over print of Satoshi Nakamoto's nine-page paper), and the Pizza T-shirt (the real 22 May 2010 pizza transaction hash on the sleeve cuffs).",
  },
  {
    title: "Where is MOOD based?",
    content:
      "Paphos, Cyprus. We ship from Cyprus via ACS Courier. Shipping inside Cyprus is free; international delivery is paid by the buyer and includes tracking. Details are on the Shipping page.",
  },
  {
    title: "Who designs MOOD?",
    content:
      "Yelyzaveta Hurieva designs the shirts. Every page footer credits her.",
  },
  {
    title: "What sizes are available?",
    content:
      "The current Bitcoin T-shirts are listed in M and XL on each product page.",
  },
  {
    title: "How do I buy a Bitcoin T-shirt?",
    content:
      "Open a product page, pick a size, and add it to the cart. Questions go to moodcyi@gmail.com.",
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: absoluteUrl("/bitcoin-t-shirts") },
  openGraph: {
    url: absoluteUrl("/bitcoin-t-shirts"),
    title: pageTitle,
    description: pageDescription,
    images: [config.metadata.meta_image],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [config.metadata.meta_image],
  },
};

async function getBitcoinTees(): Promise<Product[]> {
  const products = await Promise.all(
    BITCOIN_TEE_HANDLES.map((handle) => getProduct(handle)),
  );
  return products.filter((product): product is Product => Boolean(product));
}

const BitcoinTShirtsPage = async () => {
  const products = await getBitcoinTees();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: absoluteUrl("/bitcoin-t-shirts"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.title,
        url: absoluteUrl(`/products/${product.handle}`),
      })),
    },
  };

  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />
      <JsonLd data={itemListJsonLd} />
      <PageHeader title="Bitcoin T-Shirts" />

      <section className="py-10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-text-light leading-7 space-y-4">
            <p>
              MOOD makes Bitcoin T-shirts in Paphos, Cyprus — not generic crypto
              merch, but shirts built from the moments that still sit on the
              chain.
            </p>
            <p>
              We started from a simple idea: if you care about Bitcoin, you
              already carry a few dates in your head. 31 October 2008, when
              Satoshi Nakamoto shared a nine-page paper called{" "}
              <em>Bitcoin: A Peer-to-Peer Electronic Cash System</em>. 3 January
              2009, when the genesis block locked The Times headline about a
              second bank bailout into block 0. 22 May 2010, when Laszlo Hanyecz
              paid 10,000 BTC for two pizzas and proved the coins could buy
              something in the real world. Those are the stories on our tees.
            </p>
            <p>
              The{" "}
              <Link href="/products/genesis-t-shirt" className="text-primary">
                Genesis T-shirt
              </Link>{" "}
              is black, oversized, and prints that Times line across the chest,
              with Code your identity inside. The{" "}
              <Link
                href="/products/whitepaper-t-shirt"
                className="text-primary"
              >
                Whitepaper T-shirt
              </Link>{" "}
              wraps the full original paper — every line, every diagram — as an
              all-over print under a graffiti-style MOOD mark. The{" "}
              <Link href="/products/pizza-t-shirt" className="text-primary">
                Pizza T-shirt
              </Link>{" "}
              puts the real 2010 transaction hash on the sleeve cuffs and mini
              pizzas on the sleeves.
            </p>
            <p>
              Yelyzaveta Hurieva designs every piece. We are a small studio, not
              a factory line. Drops stay limited. Materials are listed on each
              product page; this catalog will not invent a fabric story. Sizes
              currently offered on these shirts are M and XL.
            </p>
            <p>
              This page is for people who searched for a Bitcoin T-shirt and
              wanted the history, not a logo dump. Browse the three designs
              below, read the longer stories on each product page or the{" "}
              <Link href="/blog" className="text-primary">
                blog
              </Link>
              , and write to{" "}
              <a href="mailto:moodcyi@gmail.com" className="text-primary">
                moodcyi@gmail.com
              </a>{" "}
              if you have a question. We ship from Cyprus with ACS Courier.{" "}
              <Link href="/shipping" className="text-primary">
                Shipping
              </Link>{" "}
              inside Cyprus is free; everywhere else, the buyer covers delivery
              and gets tracking.
            </p>
            <p>
              When you wear MOOD, you are not wearing a committee moodboard. You
              are wearing the source. Code your identity.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container">
          <h2 className="section-title text-center mb-8">The collection</h2>
          {products.length > 0 ? (
            <ProductCardGrid products={products} />
          ) : (
            <p className="text-center text-text-light">
              The shirts are temporarily unavailable. See{" "}
              <Link href="/products" className="text-primary">
                all products
              </Link>{" "}
              or try again shortly.
            </p>
          )}
        </div>
      </section>

      <FaqSection
        title="Bitcoin T-shirt questions"
        subtitle="Straight answers from the product pages, the shipping policy, and the people who make MOOD."
        faqs={faqs}
        contactHref="mailto:moodcyi@gmail.com"
        contactLabel="Email MOOD"
      />
    </>
  );
};

export default BitcoinTShirtsPage;
