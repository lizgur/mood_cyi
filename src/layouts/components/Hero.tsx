import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      {/* Graffiti elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main graffiti - top left */}
        <div className="hidden md:block absolute -left-40 -top-20 w-[500px] h-[500px] opacity-15">
          <img
            src="/images/graffiti/grafity.svg"
            alt="Graffiti background"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Secondary graffiti - top right */}
        <div className="absolute -right-20 md:-right-40 top-20 md:top-20 w-[200px] h-[200px] md:w-[400px] md:h-[400px] opacity-15">
          <img
            src="/images/graffiti/grafitybox.svg"
            alt="Graffiti box"
            className="w-full h-full object-contain"
          />
        </div>
        {/* Tertiary graffiti - bottom center */}
        <div className="absolute left-1/2 -bottom-20 md:-bottom-20 -translate-x-1/2 w-[250px] h-[250px] md:w-[450px] md:h-[450px] opacity-15">
          <img
            src="/images/graffiti/grafityyellow.svg"
            alt="Yellow graffiti"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="hero-title mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Code your{" "}
            <span className="text-[#BDFF07] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
              identity
            </span>
            <br />
            wear your{" "}
            <span className="text-[#BDFF07] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]" style={{fontFamily: 'var(--font-wallpoet), sans-serif'}}>
              future
            </span>
          </h1>
          {/* Hero subtitle text */}
          <p className="hero-subtitle mb-6 text-[#300B6A]">
            // Whether you're debugging under the sun or brainstorming your next
            big idea in a cafe, the "Code Your Identity" cap keeps you cool,
            collected, and undeniably you!
          </p>
          <Link
            href="/products"
            className="btn btn-primary btn-lg inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
