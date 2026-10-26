import { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/layouts/components/JsonLd";
import Share from "@/layouts/components/Share";
import MDXContent from "@/helpers/MDXContent";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { absoluteUrl, articleJsonLd, faqPageJsonLd } from "@/lib/seo";
import dateFormat from "@/lib/utils/dateFormat";
import { plainify } from "@/lib/utils/textConverter";
import FaqList from "@/partials/FaqList";
import PageHeader from "@/partials/PageHeader";

export const dynamicParams = false;

export const generateStaticParams = () => {
  return getBlogPosts().map((post) => ({ slug: post.slug! }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const title = frontmatter.meta_title || frontmatter.title;
  const description = frontmatter.description;
  const url = absoluteUrl(`/blog/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
  };
};

const BlogPost = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) return notFound();

  const { frontmatter, content } = post;
  const url = absoluteUrl(`/blog/${slug}`);
  const faqs = frontmatter.faqs || [];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: frontmatter.title,
          description: frontmatter.description || "",
          datePublished: frontmatter.date || new Date().toISOString(),
          url,
          image: frontmatter.image,
          author: frontmatter.author || "MOOD",
        })}
      />
      {faqs.length > 0 && (
        <JsonLd
          data={faqPageJsonLd(
            faqs.map((faq) => ({
              title: faq.title,
              content: plainify(faq.content),
            })),
          )}
        />
      )}
      <PageHeader title={frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="content max-w-4xl mx-auto">
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-light">
              {frontmatter.author && <span>{frontmatter.author}</span>}
              {frontmatter.date && <span>{dateFormat(frontmatter.date)}</span>}
            </div>
            <MDXContent content={content} />
            {faqs.length > 0 && (
              <div className="mt-14">
                <h2>{frontmatter.faq_section_title || "Frequently asked questions"}</h2>
                <FaqList faqs={faqs} />
              </div>
            )}
            {frontmatter.after_faq && (
              <div className="mt-14">
                <MDXContent content={frontmatter.after_faq} />
              </div>
            )}
            <div className="mt-10">
              <p className="mb-3 font-medium">Share</p>
              <Share
                className="social-icons"
                title={frontmatter.title}
                description={frontmatter.description}
                slug={`blog/${slug}`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
