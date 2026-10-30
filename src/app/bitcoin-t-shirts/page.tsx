import { Metadata } from "next";
import Link from "next/link";
import config from "@/config/config.json";
import JsonLd from "@/layouts/components/JsonLd";
import ProductCardGrid from "@/partials/ProductCardGrid";
import FaqSection from "@/layouts/partials/FaqSection";
import PageHeader from "@/layouts/partials/PageHeader";
import { getProduct } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import { absoluteUrl, breadcrumbListJsonLd, faqPageJsonLd } from "@/lib/seo";
import { productDisplayName } from "@/lib/seo/productTitles";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const BITCOIN_TEE_HANDLES = [
  "genesis-t-shirt",
  "whitepaper-t-shirt",
  "pizza-t-shirt",
] as const;

const pageHeading = "Bitcoin T-Shirts";
const pageTitle =
  "Bitcoin T-Shirts – Genesis, Whitepaper & Pizza Day | MOOD";
const pageDescription =
  "MOOD Bitcoin T-shirts from Paphos, Cyprus: Bitcoin Genesis Block, Bitcoin Whitepaper, and Bitcoin Pizza Day designs by Yelyzaveta Hurieva.";
const bitcoinTeeCrumbs = [
  { name: "Home", href: "/" },
  { name: pageHeading, href: "/bitcoin-t-shirts" },
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
  const titleByHandle = Object.fromEntries(
    BITCOIN_TEE_HANDLES.map((handle) => {
      const live = products.find((product) => product.handle === handle);
      return [handle, productDisplayName(handle, live?.title)];
    }),
  );

  const faqs = [
    {
      title: "Which Bitcoin T-shirts does MOOD make?",
      content: `Three designs from Bitcoin history: the ${titleByHandle["genesis-t-shirt"]} (The Times headline from the 3 January 2009 genesis block, printed on the chest), the ${titleByHandle["whitepaper-t-shirt"]} (an all-over print of Satoshi Nakamoto's nine-page paper), and the ${titleByHandle["pizza-t-shirt"]} (the real 22 May 2010 pizza transaction hash on the sleeve cuffs).`,
    },
    {
      title: "Where is MOOD based?",
      content:
        "Paphos, Cyprus. We ship from Cyprus via ACS Courier. Shipping inside Cyprus is free; for other countries, delivery is paid by the buyer at checkout. Full rates are on the Shipping page.",
    },
    {
      title: "Who designs MOOD?",
      content:
        "Yelyzaveta Hurieva designs the shirts. Every page footer credits her.",
    },
    {
      title: "What are the T-shirts made of?",
      content:
        "The Bitcoin Genesis Block and Bitcoin Pizza Day T-Shirts are 100% cotton. Exact fabric for each drop is listed under Product Details on that product page.",
    },
    {
      title: "How do I buy a Bitcoin T-shirt?",
      content:
        "Open a product page, pick a size, and order through store checkout — you do not need to email your address. Questions go to moodcyi@gmail.com.",
    },
  ];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageHeading,
    description: pageDescription,
    url: absoluteUrl("/bitcoin-t-shirts"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: productDisplayName(product.handle, product.title),
        url: absoluteUrl(`/products/${product.handle}`),
      })),
    },
  };

  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbListJsonLd(bitcoinTeeCrumbs)} />
      <PageHeader title={pageHeading} breadcrumbs={bitcoinTeeCrumbs} />

      <section className="py-10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-text-light leading-7 space-y-4">
            <p>
              MOOD makes limited Bitcoin history T-shirts in Paphos, Cyprus —
              designs rooted in real moments like the Whitepaper, the genesis
              block, and Bitcoin Pizza Day. Oversized unisex tees for builders
              who want the story on the fabric, not just in a thread.
            </p>
            <p>
              The dates are public record. On 31 October 2008 Satoshi Nakamoto
              emailed a cryptography mailing list a nine-page paper,{" "}
              <em>Bitcoin: A Peer-to-Peer Electronic Cash System</em>. On 3
              January 2009 the genesis block locked The Times headline about a
              second bank bailout into block 0. On 22 May 2010 Laszlo Hanyecz
              paid 10,000 BTC for two pizzas. Those three moments are the
              current drop.
            </p>
            <p>
              The{" "}
              <Link href="/products/genesis-t-shirt" className="text-primary">
                {titleByHandle["genesis-t-shirt"]}
              </Link>{" "}
              is a black oversized tee with that Times line printed on the
              chest and Code your identity inside. The{" "}
              <Link
                href="/products/whitepaper-t-shirt"
                className="text-primary"
              >
                {titleByHandle["whitepaper-t-shirt"]}
              </Link>{" "}
              is an all-over print of the original nine pages — every line and
              diagram — under a graffiti-style MOOD mark. The{" "}
              <Link href="/products/pizza-t-shirt" className="text-primary">
                {titleByHandle["pizza-t-shirt"]}
              </Link>{" "}
              puts the real 2010 transaction hash on the sleeve cuffs and mini
              pizzas on the sleeves.
            </p>
            <p>
              Yelyzaveta Hurieva designs every piece. We are a small studio in
              Paphos, not a factory line. Drops stay limited. The Bitcoin
              Genesis Block and Bitcoin Pizza Day T-Shirts are 100% cotton;
              exact fabric for each drop, including the Whitepaper shirt, is
              listed under Product Details on that product page. Sizes currently
              offered on these shirts are M and XL.
            </p>
            <p>
              Browse the three designs below, or read the longer stories on each
              product page and the{" "}
              <Link href="/blog" className="text-primary">
                blog
              </Link>
              . If you are buying for someone else, our{" "}
              <Link href="/blog/bitcoin-gift-ideas" className="text-primary">
                Bitcoin gift ideas
              </Link>{" "}
              guide matches each shirt to a date in Bitcoin history. Order
              through store checkout — you do not need to email your
              address. We ship from Cyprus with ACS Courier.{" "}
              <Link href="/shipping" className="text-primary">
                Shipping
              </Link>{" "}
              inside Cyprus is free; other countries are paid by the buyer at
              checkout. Questions go to{" "}
              <a href="mailto:moodcyi@gmail.com" className="text-primary">
                moodcyi@gmail.com
              </a>
              .
            </p>
            <p>Code your identity.</p>
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
