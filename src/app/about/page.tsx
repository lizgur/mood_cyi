import Expandable from "@/components/Expandable";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { AboutUsItem, RegularPage } from "@/types";
import Link from "next/link";
import { FaBoxOpen, FaCheckCircle, FaHeadset, FaShieldAlt, FaLeaf, FaUsers } from "react-icons/fa";

const About = () => {
  try {
    const data: RegularPage = getListPage("about/_index.md");

    const { frontmatter } = data;
  const {
    title,
    about_us,
    faq_section_title,
    button,
    faq_section_subtitle,
    faqs,
    testimonials_section_enable,
    testimonials_section_title,
    testimonials,
    staff_section_enable,
    staff,
  } = frontmatter;

  return (
    <>
      <SeoMeta {...frontmatter} />

      <PageHeader title={title} />

      <section className="py-10">
        <div className="container">
          {about_us?.map((section: AboutUsItem, index: number) => (
            <div
              className={`lg:flex gap-8 mt-8 lg:mt-16`}
              key={section?.title}
            >
              {index % 2 === 0 ? (
                <>
                  <ImageFallback
                    className="rounded-md mx-auto"
                    src={section?.image}
                    width={536}
                    height={449}
                    alt={section?.title}
                  />
                  <div className="mt-10 lg:mt-0">
                    <h2>{section?.title}</h2>
                    <p
                      className="mt-4 text-text-light  leading-7"
                      dangerouslySetInnerHTML={markdownify(section?.content)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2>{section.title}</h2>
                    <p
                      className="mt-4 text-text-light  leading-7"
                      dangerouslySetInnerHTML={markdownify(section.content)}
                    />
                  </div>
                  <ImageFallback
                    className="rounded-md mx-auto mt-10 lg:mt-0"
                    src={section.image}
                    width={536}
                    height={449}
                    alt={section.title}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {testimonials_section_enable && (
        <Testimonials
          title={testimonials_section_title!}
          testimonials={testimonials!}
        />
      )}

      {staff_section_enable && (
        <section>
          <div className="container">
            <div className="text-center">
              <h2>Our Staff</h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">
                {staff!.map((s, idx) => (
                  <div key={idx} className="border border-border rounded-lg">
                    <div className="py-6 space-y-2">
                      <h3 className="h4">{s.name}</h3>
                      <p className="text-text-dark ">{s.designation}</p>
                    </div>
                    <div className="bg-light rounded-b-xl mx-auto">
                      <ImageFallback
                        src={s.avatar}
                        alt={`Staff-${s.name}`}
                        width={290}
                        height={250}
                        className="mx-auto w-full h-[250px] rounded-b-xl overflow-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-10">
        <div className="container">
          <div className="bg-light px-4 py-10 text-center rounded-md">
            <h2 className="mb-6">Reasons to shop with us</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
              <div className="flex flex-col items-center">
                <FaShieldAlt size={32} className="mb-3" />
                <h3 className="text-lg font-semibold mb-2">Authentic Web3 Culture</h3>
                <p className="text-sm text-text-light">Real blockchain lore and crypto history - no generic prints.</p>
              </div>

              <div className="flex flex-col items-center">
                <FaBoxOpen size={32} className="mb-3" />
                <h3 className="text-lg font-semibold mb-2">Limited Edition Drops</h3>
                <p className="text-sm text-text-light">Rare and exclusive releases. Once sold out, gone forever.</p>
              </div>

              <div className="flex flex-col items-center">
                <FaLeaf size={32} className="mb-3" />
                <h3 className="text-lg font-semibold mb-2">Sustainable & Ethical</h3>
                <p className="text-sm text-text-light">Premium materials and eco-conscious printing practices.</p>
              </div>

              <div className="flex flex-col items-center">
                <FaUsers size={32} className="mb-3" />
                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                <p className="text-sm text-text-light">Built by and for the Web3 community. Your feedback matters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="bg-light px-7 lg:px-32 py-12 mb-8 rounded-b-md">
            <div className="row">
              <div className="md:col-5 mx-auto space-y-5 mb-10 md:mb-0">
                <h1 dangerouslySetInnerHTML={markdownify(faq_section_title!)} />
                <p
                  dangerouslySetInnerHTML={markdownify(faq_section_subtitle!)}
                  className="md:text-lg"
                />

                {button?.enable && (
                  <Link
                    className="btn btn-sm md:btn-lg btn-primary font-medium"
                    href={button.link}
                  >
                    {button.label}
                  </Link>
                )}
              </div>

              <div className="md:col-7">
                <Expandable faqs={faqs!} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    );
  } catch (error) {
    console.error('Error loading about page:', error);
    return (
      <>
        <PageHeader title="About" />
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>About</h1>
              <p>We're experiencing some technical difficulties. Please try again later.</p>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default About;
