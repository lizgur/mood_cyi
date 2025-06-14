import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent to-accent/90 py-12 md:py-20">
      {/* Graffiti elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 text-[100px] font-['Wallpoet'] text-white/5 rotate-[-15deg]">
          CODE
        </div>
        <div className="absolute right-0 top-1/4 text-[80px] font-['Wallpoet'] text-white/5 rotate-[10deg]">
          WEAR
        </div>
        <div className="absolute bottom-10 left-1/4 text-[60px] font-['Wallpoet'] text-white/5 rotate-[5deg]">
          FUTURE
        </div>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="hero-title mb-4">
            Code your identity,
            <br />
            wear your future
          </h1>
          <p className="hero-subtitle mb-6">
            Whether you're debugging under the sun or brainstorming your next
            big idea in a café, the "Code Your Identity" cap keeps you cool,
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
