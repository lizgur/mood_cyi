// Removed force-dynamic to prevent SSR failures in production
// export const dynamic = "force-dynamic";

import CollectionsSlider from "@/components/CollectionsSlider";
import HeroSlider from "@/components/HeroSlider";
import SkeletonCategory from "@/components/loadings/skeleton/SkeletonCategory";
import SkeletonFeaturedProducts from "@/components/loadings/skeleton/SkeletonFeaturedProducts";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import { getCollectionProducts, getCollections } from "@/lib/shopify";
import CallToAction from "@/partials/CallToAction";
import FeaturedProducts from "@/partials/FeaturedProducts";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";
import Hero from "@/layouts/components/Hero";
import Link from "next/link";

const { collections: shopifyCollections } = config.shopify;

// Fallback collections data when Shopify API fails
const fallbackCollections = [
  {
    handle: "_drop01",
    title: "Bitcoin Occasions",
    description: "Celebrate Bitcoin milestones with our exclusive collection. From genesis block to pizza day, wear your crypto pride.",
    available: true
  },
  {
    handle: "_drop02", 
    title: "Coming Soon",
    description: "Get ready for our next blockchain network drop. Stay tuned for exclusive designs celebrating the future of web3.",
    available: false
  }
];

const ShowCollections = async () => {
  try {
    const allCollections = await getCollections();
    const homepageCollections = allCollections.filter(
      (collection) =>
        collection.handle === "_drop01" || collection.handle === "_drop02",
    );

    // Use API data if available, otherwise fallback
    const collectionsToShow = homepageCollections.length > 0 ? homepageCollections : fallbackCollections;

    return (
      <div className="grid md:grid-cols-2 gap-8">
        {collectionsToShow.map((collection) => (
          <div key={collection.handle} className="relative group">
            <div className="bg-white border-2 border-[#9658F9] rounded-lg p-8 md:p-12 h-full flex flex-col">
              <div className="text-center flex-grow">
                <h2 className="section-title text-[#300B6A] mb-6">
                  {collection.handle}
                </h2>
                <h2 className="text-xl md:text-2xl mb-4 text-[#300B6A]" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
                  {collection.handle === "_drop01"
                    ? "Bitcoin Occasions"
                    : "Coming Soon"}
                </h2>
                <h4 className="text-sm md:text-base mb-8 text-[#300B6A]" style={{fontFamily: 'Consolas, monospace'}}>
                  {collection.handle === "_drop01"
                    ? "Celebrate Bitcoin milestones with our exclusive collection. From genesis block to pizza day, wear your crypto pride."
                    : "Get ready for our next blockchain network drop. Stay tuned for exclusive designs celebrating the future of web3."}
                </h4>
              </div>
              <div className="text-center mt-auto">
                {collection.handle === "_drop02" ? (
                  <div className="btn btn-primary btn-lg inline-block bg-[#BDFF07]/50 text-[#300B6A] cursor-not-allowed">
                    Coming Soon
                  </div>
                ) : (
                  <Link
                    href={`/products?c=${collection.handle}`}
                    className="btn btn-primary btn-lg inline-block bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90"
                  >
                    Shop Collection
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error loading collections:', error);
    
    // Return fallback UI with static data
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {fallbackCollections.map((collection) => (
          <div key={collection.handle} className="relative group">
            <div className="bg-white border-2 border-[#9658F9] rounded-lg p-8 md:p-12 h-full flex flex-col">
              <div className="text-center flex-grow">
                <h2 className="section-title text-[#300B6A] mb-6">
                  {collection.handle}
                </h2>
                <h2 className="text-xl md:text-2xl mb-4 text-[#300B6A]" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
                  {collection.title}
                </h2>
                <h4 className="text-sm md:text-base mb-8 text-[#300B6A]" style={{fontFamily: 'Consolas, monospace'}}>
                  {collection.description}
                </h4>
              </div>
              <div className="text-center mt-auto">
                {!collection.available ? (
                  <div className="btn btn-primary btn-lg inline-block bg-[#BDFF07]/50 text-[#300B6A] cursor-not-allowed">
                    Coming Soon
                  </div>
                ) : (
                  <Link
                    href={`/products?c=${collection.handle}`}
                    className="btn btn-primary btn-lg inline-block bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90"
                  >
                    Shop Collection
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

const ShowDrop01Products = async () => {
  try {
    const { products } = await getCollectionProducts({
      collection: shopifyCollections.drop01,
    });
    
    if (products && products.length > 0) {
      return <FeaturedProducts products={products} />;
    } else {
      // Fallback when no products are available
      return (
        <div className="text-center py-12">
          <div className="bg-white border-2 border-[#9658F9] rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl text-[#300B6A] mb-4" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
              Products Loading...
            </h3>
            <p className="text-[#300B6A]/80 mb-6" style={{fontFamily: 'Consolas, monospace'}}>
              Our Bitcoin collection is being prepared. Check back soon for exclusive designs!
            </p>
            <Link
              href="/products"
              className="btn btn-primary bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error('Error loading products:', error);
    
    // Fallback UI when API fails
    return (
      <div className="text-center py-12">
        <div className="bg-white border-2 border-[#9658F9] rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-xl text-[#300B6A] mb-4" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
            Exclusive Bitcoin Collection
          </h3>
          <p className="text-[#300B6A]/80 mb-6" style={{fontFamily: 'Consolas, monospace'}}>
            Celebrate crypto milestones with our limited edition designs. Each piece tells a story from blockchain history.
          </p>
          <Link
            href="/products?c=_drop01"
            className="btn btn-primary bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }
};

const Home = () => {
  let callToAction;
  
  try {
    callToAction = getListPage("sections/call-to-action.md");
  } catch (error) {
    console.error('Error loading call-to-action:', error);
    // Use the original call-to-action content as fallback
    callToAction = {
      frontmatter: {
        enable: true,
        title: "10,000 BTC for 2 pizzas? We'll settle for 22% off this iconic shirt.",
        sub_title: "🍕 Deal of the Month\nBitcoin Pizza Tee — 22% OFF",
        image: "/images/pizza.png",
        description: "Celebrate crypto's tastiest moment — all June long.\nNo code needed. Discount applied at checkout.",
        button: {
          enable: true,
          label: "🛒 Grab the Deal Now",
          link: "/products?c=_drop01"
        },
        fine_print: "⏳ Ends June 30 2025 or while supplies last."
      }
    };
  }

  return (
    <>
      <SeoMeta />
      <Hero />

      {/* _drop01 Products section */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-6">_drop01 Products</h2>
            <p className="section-subtitle mb-2 md:mb-4">
              Exclusive Bitcoin Collection
            </p>
          </div>
          <Suspense fallback={<SkeletonFeaturedProducts />}>
            <ShowDrop01Products />
          </Suspense>
        </div>
      </section>

      {/* Collections section */}
      <section className="py-8 md:py-12 bg-[#300B6A]">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title text-white mb-6">Collections</h2>
            <p className="section-subtitle text-white/80 mb-2 md:mb-4">
              Discover our curated collections
            </p>
          </div>
          <Suspense fallback={<SkeletonCategory />}>
            <ShowCollections />
          </Suspense>
        </div>
      </section>

      {/* Why Us / FOMO Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-[#300B6A]/5 to-transparent">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="section-title text-[#300B6A] mb-3">
              Limited Drops. No Forks. No Watermarks.
            </h2>
            <p className="section-subtitle mb-2 md:mb-4">
              Join the movement. Own the moment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 border-2 border-[#9658F9] shadow-lg h-full flex flex-col">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🔐</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-[#300B6A] mb-3" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
                    Rooted in Real Blockchain History
                  </h3>
                  <p className="text-sm md:text-base text-[#300B6A]/80" style={{fontFamily: 'Consolas, monospace'}}>
                    Each design is a nod to pivotal crypto moments — raw,
                    verifiable, immutable.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-[#9658F9] shadow-lg h-full flex flex-col">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🧵</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-[#300B6A] mb-3" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
                    Quality Worthy of a DAO Proposal
                  </h3>
                  <p className="text-sm md:text-base text-[#300B6A]/80" style={{fontFamily: 'Consolas, monospace'}}>
                    Premium materials and craftsmanship approved by the community (not a committee).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-[#9658F9] shadow-lg h-full flex flex-col">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⏳</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-[#300B6A] mb-3" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
                    Finite Supply. No Restakes.
                  </h3>
                  <p className="text-sm md:text-base text-[#300B6A]/80" style={{fontFamily: 'Consolas, monospace'}}>
                    Every drop is non-replicable. No reruns. When it's gone,
                    it's gone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border-2 border-[#9658F9] shadow-lg h-full flex flex-col">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl text-[#300B6A] mb-3" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
                    Every Tee is a Statement on the Ledger
                  </h3>
                  <p className="text-sm md:text-base text-[#300B6A]/80" style={{fontFamily: 'Consolas, monospace'}}>
                    Wear your alignment. Signal your tribe. No whitepaper
                    required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products?c=_drop01"
              className="btn btn-primary btn-lg inline-block bg-[#BDFF07] text-[#300B6A] hover:bg-[#BDFF07]/90"
            >
              Claim Your Piece of History
            </Link>
          </div>
        </div>
      </section>

      <CallToAction data={callToAction} variant="home" />
    </>
  );
};

export default Home;
