import config from "@/config/config.json";
import social from "@/config/social.json";

export const siteUrl = (process.env.SITE_URL || config.site.base_url).replace(
  /\/$/,
  "",
);

export const absoluteUrl = (path: string) =>
  `${siteUrl}${path === "/" ? "" : path}`;

// Only real social profile URLs present in the repo config (mailto links excluded).
const sameAs = social.main
  .map((s) => s.link)
  .filter((link) => /^https?:\/\//.test(link));

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MOOD",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paphos",
    addressCountry: "CY",
  },
  ...(sameAs.length ? { sameAs } : {}),
};
