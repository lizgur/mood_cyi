import Link from "next/link";
import { ProductEditorial } from "@/lib/productStories";
import FaqList from "@/partials/FaqList";

const ProductStoryFaq = ({ editorial }: { editorial: ProductEditorial }) => {
  const { story, guide, faqs } = editorial;

  return (
    <section className="py-6 md:py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-3 text-text-dark">
            The story
          </h2>
          <p className="text-text-light leading-7">
            {story}
            {guide && (
              <>
                {" "}
                {guide.preface}{" "}
                {guide.href ? (
                  <Link href={guide.href} className="italic hover:text-primary">
                    {guide.title}
                  </Link>
                ) : (
                  <em>{guide.title}</em>
                )}
                .
              </>
            )}
          </p>

          {faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-3 text-text-dark">
                Frequently asked questions
              </h2>
              <FaqList faqs={faqs} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductStoryFaq;
