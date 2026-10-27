import config from "@/config/config.json";
import social from "@/config/social.json";

export const siteUrl = (process.env.SITE_URL || config.site.base_url).replace(
  /\/$/,
  "",
);

export const absoluteUrl = (path: string) =>
  `${siteUrl}${path === "/" ? "" : path}`;

/** First non-empty trimmed string. Used so Shopify SEO fields win over product title. */
export const firstSeoText = (
  ...values: Array<string | null | undefined>
): string | undefined => {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
};

// Only real social profile URLs present in the repo config (mailto links excluded).
const sameAs = social.main
  .map((s) => s.link)
  .filter((link) => /^https?:\/\//.test(link));

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MOOD",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  email: "moodcyi@gmail.com",
  description:
    "MOOD is a Bitcoin-history streetwear brand based in Paphos, Cyprus. Designer Yelyzaveta Hurieva turns the Genesis block, the Bitcoin Whitepaper, and Bitcoin Pizza Day into T-shirts.",
  founder: {
    "@type": "Person",
    name: "Yelyzaveta Hurieva",
    jobTitle: "Founder and designer",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paphos",
    addressCountry: "CY",
  },
  ...(sameAs.length ? { sameAs } : {}),
};

export const faqPageJsonLd = (
  faqs: { title: string; content: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.title,
    acceptedAnswer: { "@type": "Answer", text: faq.content },
  })),
});

export const articleJsonLd = ({
  headline,
  description,
  datePublished,
  url,
  image,
  author = "MOOD",
}: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  image?: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  datePublished,
  author: { "@type": "Organization", name: author },
  publisher: {
    "@type": "Organization",
    name: "MOOD",
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  ...(image ? { image: image.startsWith("http") ? image : `${siteUrl}${image}` } : {}),
});
