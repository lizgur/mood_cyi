import FaqList, { FaqItem } from "@/partials/FaqList";

const FaqSection = ({
  title,
  subtitle,
  faqs,
  contactHref,
  contactLabel = "Contact Us",
}: {
  title: string;
  subtitle: string;
  faqs: FaqItem[];
  contactHref?: string;
  contactLabel?: string;
}) => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="bg-light px-7 lg:px-32 py-12 mb-8 rounded-b-md">
          <div className="row">
            <div className="md:col-5 mx-auto space-y-5 mb-10 md:mb-0">
              <h2 className="h1">{title}</h2>
              <p className="md:text-lg">{subtitle}</p>
              {contactHref && (
                <a
                  className="btn btn-sm md:btn-lg btn-primary font-medium"
                  href={contactHref}
                >
                  {contactLabel}
                </a>
              )}
            </div>
            <div className="md:col-7">
              <FaqList faqs={faqs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
