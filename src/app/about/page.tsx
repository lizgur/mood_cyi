import config from "@/config/config.json";
import JsonLd from "@/layouts/components/JsonLd";
import { getListPage } from "@/lib/contentParser";
import { faqPageJsonLd } from "@/lib/seo";
import { plainify } from "@/lib/utils/textConverter";
import { Metadata } from "next";
import FaqSection from "@/layouts/partials/FaqSection";
import PageHeader from "@/layouts/partials/PageHeader";
import { RegularPage } from "@/types";
import { FaShieldAlt, FaBoxOpen, FaLeaf, FaUsers } from "react-icons/fa";

const aboutTitle = "About MOOD – Bitcoin History Streetwear Brand";
const aboutDescription =
  "MOOD makes high quality Bitcoin T-shirts that turn moments from Bitcoin history into streetwear. Our story, our designs and answers to common questions.";

export const metadata: Metadata = {
  title: aboutTitle,
  description: aboutDescription,
  alternates: { canonical: `${config.site.base_url}/about` },
  openGraph: { url: `${config.site.base_url}/about`, title: aboutTitle, description: aboutDescription, images: [config.metadata.meta_image] },
  twitter: { card: "summary_large_image", title: aboutTitle, description: aboutDescription, images: [config.metadata.meta_image] },
};

const About = () => {
  const about: RegularPage = getListPage("about/_index.md");
  const faqs = about.frontmatter.faqs || [];
  const faqTitle =
    about.frontmatter.faq_section_title || "Frequently Asked Questions";
  const faqSubtitle =
    about.frontmatter.faq_section_subtitle ||
    "Got questions about MOOD? We've got answers.";

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
      <PageHeader title="About Us" />
      
      {/* About Us Content */}
      <section className="py-10">
        <div className="container">
          <div className="lg:flex gap-8 mt-8 lg:mt-16">
            <img 
              alt="" 
              loading="lazy" 
              width="536" 
              height="449" 
              className="rounded-md mx-auto" 
              src="/images/graffiti/grafity.svg"
            />
            <div className="mt-10 lg:mt-0">
              <h2>Code your identity.</h2>
              <p className="mt-4 text-text-light leading-7">
                MOOD is more than a T-shirt — it's a digital statement. Born at the intersection of blockchain culture, streetwear, and raw self-expression, MOOD lets you code your identity and wear what you believe in. Each design draws from real moments in crypto history — from the Genesis block to Bitcoin Pizza Day — blending tech lore with bold, street-inspired visuals. We're inspired by code, crypto, and the rebels rewriting the rules. When you wear MOOD, you're not just putting on a shirt — you're broadcasting values like freedom, transparency, and a touch of chaos. Join the movement. Wear your code. Be MOOD.
              </p>
            </div>
          </div>
          
          <div className="lg:flex gap-8 mt-8 lg:mt-16">
            <div>
              <h2>Why MOOD?</h2>
              <p className="mt-4 text-text-light leading-7">
                🟡 Built with Love for the Chain: This isn't just a brand — it's my way of sharing a real passion for crypto, decentralization, and digital freedom. Every design is rooted in blockchain history and made to spark conversation. <br/><br/> 🟣 Designed to Mean Something: No random graphics. Each piece references real moments, ideas, and ethos from the Web3 world. <br/><br/> 🟡 Limited Drops, Like Rare Tokens: We don't do mass production. Every drop is limited — unique like the block it was minted in. <br/><br/> 🟣 Made for the Community: MOOD was built by someone deep in the space — and it shows. We design for the people building the future. <br/><br/> 🟡 Sustainable by Default: Ethically sourced materials and low-impact printing. Style shouldn't come at the planet's expense.
              </p>
            </div>
            <img 
              alt="" 
              loading="lazy" 
              width="536" 
              height="449" 
              className="rounded-md mx-auto mt-10 lg:mt-0" 
              src="/images/graffiti/grafityyellow.svg"
            />
          </div>
        </div>
      </section>

      {/* Reasons to shop with us */}
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

      <FaqSection
        title={faqTitle}
        subtitle={faqSubtitle}
        faqs={faqs}
        contactHref={about.frontmatter.button?.link}
        contactLabel={about.frontmatter.button?.label}
      />
    </>
  );
};

export default About;
