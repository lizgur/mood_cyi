"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action & {
    fine_print?: string;
  };
}

interface CallToActionProps {
  data: PageData;
  variant?: "home" | "products";
}

const CallToAction = ({ data, variant = "products" }: CallToActionProps) => {
  // Different spacing classes based on variant
  const spacingClasses = variant === "home" 
    ? "pt-20 pb-12 md:pt-20 md:pb-20" 
    : "mt-6 pt-20 pb-12 md:mt-8 md:pt-20 md:pb-20";

  return (
    <>
      {data.frontmatter.enable && (
        <section className={`${spacingClasses} relative overflow-hidden`}>
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#9658F9]/5 via-transparent to-[#BDFF07]/5 animate-pulse"></div>
          
          {/* Graffiti background elements - similar to hero section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Main graffiti - top left - moved down to avoid touching border */}
            <div className="absolute -left-40 top-10 w-[400px] h-[400px] opacity-15">
              <img
                src="/images/graffiti/grafity.svg"
                alt="Graffiti background"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Secondary graffiti - top right */}
            <div className="absolute -right-20 top-10 w-[300px] h-[300px] opacity-15">
              <img
                src="/images/graffiti/grafitybox.svg"
                alt="Graffiti box"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Tertiary graffiti - bottom left */}
            <div className="absolute -left-20 -bottom-20 w-[350px] h-[350px] opacity-15">
              <img
                src="/images/graffiti/grafityyellow.svg"
                alt="Yellow graffiti"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Fourth graffiti - bottom right */}
            <div className="absolute -right-30 -bottom-10 w-[250px] h-[250px] opacity-15">
              <img
                src="/images/graffiti/grafity.svg"
                alt="Graffiti background"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="container relative z-10">
            <div className="rounded-2xl bg-gradient-to-br from-white via-white to-[#9658F9]/5 border-2 border-[#9658F9]/20 px-8 py-12 md:py-20 shadow-xl backdrop-blur-sm">
              
              {/* Text Content Section */}
              <div className="text-center max-w-4xl mx-auto relative z-10">

                {/* Main title with hero-title styling to match platform sizing */}
                <h2
                  dangerouslySetInnerHTML={markdownify(
                    data.frontmatter.title,
                  )}
                  className="hero-title mb-8 leading-tight"
                />

                {/* Description with smaller text */}
                <p
                  dangerouslySetInnerHTML={markdownify(
                    data.frontmatter.description,
                  )}
                  className="mb-10 text-sm md:text-base text-[#300B6A]/90 whitespace-pre-line leading-relaxed max-w-5xl mx-auto"
                  style={{fontFamily: 'Consolas, monospace'}}
                />

                {/* Enhanced button with proper Wallpoet font styling */}
                <div className="mb-8">
                  <Link
                    className="inline-block btn btn-lg bg-gradient-to-r from-[#BDFF07] to-[#BDFF07]/90 text-[#300B6A] hover:from-[#BDFF07]/90 hover:to-[#BDFF07] hover:scale-105 font-bold text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#300B6A]/10 relative z-20"
                    href={data.frontmatter.button.link}
                    style={{
                      fontFamily: 'var(--font-wallpoet), sans-serif',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      fontWeight: 400
                    }}
                  >
                    {data.frontmatter.button.label}
                  </Link>
                </div>

                {/* Fine print with better visibility */}
                {data.frontmatter.fine_print && (
                  <p className="text-base text-[#9658F9]/80 font-medium" style={{fontFamily: 'Consolas, monospace'}}>
                    {data.frontmatter.fine_print}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
