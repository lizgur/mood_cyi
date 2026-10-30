import { Metadata } from "next";
import Link from "next/link";
import { getBlogIndex, getBlogPosts } from "@/lib/blog";
import JsonLd from "@/layouts/components/JsonLd";
import { absoluteUrl, breadcrumbListJsonLd } from "@/lib/seo";
import dateFormat from "@/lib/utils/dateFormat";
import PageHeader from "@/partials/PageHeader";
import { Post } from "@/types";

export const generateMetadata = (): Metadata => {
  const { frontmatter } = getBlogIndex();
  const title = frontmatter.meta_title || frontmatter.title;
  const description = frontmatter.description;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl("/blog") },
    openGraph: {
      url: absoluteUrl("/blog"),
      title,
      description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

const blogCrumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

const BlogIndex = () => {
  const { frontmatter } = getBlogIndex();
  const posts = getBlogPosts();

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(blogCrumbs)} />
      <PageHeader title={frontmatter.title} breadcrumbs={blogCrumbs} />
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {frontmatter.description && (
              <p className="mb-12 text-lg text-text-light">
                {frontmatter.description}
              </p>
            )}
            {posts.length === 0 ? (
              <p className="text-text-light">No articles yet.</p>
            ) : (
              <ul className="space-y-10">
                {posts.map((post: Post) => (
                  <li
                    key={post.slug}
                    className="border-b border-border pb-10 last:border-b-0"
                  >
                    <article>
                      {post.frontmatter.date && (
                        <p className="mb-2 text-sm text-text-light">
                          {dateFormat(post.frontmatter.date)}
                        </p>
                      )}
                      <h2 className="h3 mb-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h2>
                      {post.frontmatter.description && (
                        <p className="mb-6 text-text-light">
                          {post.frontmatter.description}
                        </p>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        Read the story
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogIndex;
