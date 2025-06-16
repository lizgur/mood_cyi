import SeoMeta from "@/layouts/partials/SeoMeta";
import PageHeader from "@/layouts/partials/PageHeader";
import { FaShieldAlt, FaBoxOpen, FaLeaf, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <>
      <SeoMeta
        title="About Us"
        meta_title="About"
        description="MOOD is not just a T-shirt brand — it's a digital statement. Born at the intersection of blockchain culture, streetwear, and self-expression."
        image=""
      />
      <PageHeader title="About Us" />
      
      {/* About Us Content */}
      <section className="py-10">
        <div className="container">
          <div className="lg:flex gap-8 mt-8 lg:mt-16">
            <img 
              alt="Code your identity." 
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
              alt="Why MOOD?" 
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

      {/* FAQ Section */}
      <section className="py-10">
        <div className="container">
          <div className="bg-light px-7 lg:px-32 py-12 mb-8 rounded-b-md">
            <div className="row">
              <div className="md:col-5 mx-auto space-y-5 mb-10 md:mb-0">
                <h1>Frequently Asked Questions</h1>
                <p className="md:text-lg">Got questions about MOOD? We've got answers. From sizing to shipping, here's everything you need to know about our crypto-inspired streetwear.</p>
                <a className="btn btn-sm md:btn-lg btn-primary font-medium" href="mailto:moodcyi@gmail.com">Contact Us</a>
              </div>
              <div className="md:col-7">
                <div className="space-y-4">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
                      <span className="font-semibold">What makes MOOD different from other streetwear brands?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      MOOD is specifically designed for the Web3 community. Every design is rooted in real blockchain history, crypto culture, and tech milestones. We're not just printing random designs - we're creating wearable pieces of digital culture.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
                      <span className="font-semibold">What are your T-shirts made of?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      Our T-shirts are made from premium, ethically sourced cotton blends. We use eco-conscious printing methods and sustainable materials because we believe in building a better future - both digitally and environmentally.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
                      <span className="font-semibold">How do limited drops work?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      Our T-shirt releases are limited and exclusive. Once a design sells out, it's gone forever. We announce upcoming drops on our social channels like Instagram.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
                      <span className="font-semibold">How does shipping work?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      Shipping is free to Cyprus. For all other countries, delivery cost is covered by the buyer. To place your order, send us your details: Full name, Phone number, Address with postal code. Sit back and wait to claim your T-shirt(s)! We'll keep you updated on the process.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
                      <span className="font-semibold">What's your return policy?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      We offer a 14-day return window for unworn items in original condition. Since our drops are limited, we encourage checking our size guide carefully before ordering.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
                      <span className="font-semibold">Can I suggest designs or collaborate with MOOD?</span>
                      <span className="group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-4 bg-gray-50 rounded-b-lg">
                      Absolutely! We're always looking for fresh ideas from the community. Reach out to us with your concepts - the best community suggestions might make it into future drops with proper credit.
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
