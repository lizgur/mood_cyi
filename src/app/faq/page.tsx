import { Metadata } from "next";
import JsonLd from "@/layouts/components/JsonLd";
import { getListPage } from "@/lib/contentParser";
import { absoluteUrl, breadcrumbListJsonLd, faqPageJsonLd } from "@/lib/seo";
import { plainify } from "@/lib/utils/textConverter";
import FaqSection from "@/partials/FaqSection";
import PageHeader from "@/partials/PageHeader";
import { RegularPage } from "@/types";

const getStoreFaqs = () => {
  const data: RegularPage = getListPage("about/_index.md");
  const { frontmatter } = data;
  return {
    title: frontmatter.faq_section_title || "Frequently Asked Questions",
    subtitle:
      frontmatter.faq_section_subtitle ||
      "Got questions about MOOD? We've got answers.",
    faqs: frontmatter.faqs || [],
    contactHref: frontmatter.button?.link,
    contactLabel: frontmatter.button?.label,
  };
};

export const generateMetadata = (): Metadata => {
  const title = "FAQ | MOOD – Bitcoin T-Shirts";
  const description =
    "FAQ for MOOD Bitcoin T-shirts: what the tees are made of, how shipping from Cyprus works, and our returns window.";

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl("/faq") },
    openGraph: {
      url: absoluteUrl("/faq"),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

const faqCrumbs = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
];

const FaqPage = () => {
  const { title, subtitle, faqs, contactHref, contactLabel } = getStoreFaqs();

  return (
    <>
      <JsonLd
        data={faqPageJsonLd(
          faqs.map((faq) => ({
            title: faq.title,
            content: plainify(faq.content),
          })),
        )}
      />
      <JsonLd data={breadcrumbListJsonLd(faqCrumbs)} />
      <PageHeader title="FAQ" breadcrumbs={faqCrumbs} />
      <FaqSection
        title={title}
        subtitle={subtitle}
        faqs={faqs}
        contactHref={contactHref}
        contactLabel={contactLabel}
      />
    </>
  );
};

export default FaqPage;
