"use client";

import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import { usePathname } from "next/navigation";

const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
}: {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname();
  
  const finalTitle = plainify(meta_title ? meta_title : title ? title : config.site.title);
  const finalDescription = plainify(description ? description : meta_description);
  
  // Handle image URL - simple and stable approach
  const getImageUrl = () => {
    let imageUrl = image || meta_image;
    
    // If it's a relative path, make it absolute
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${base_url}${imageUrl}`;
    }
    
    return imageUrl;
  };
  
  const finalImage = getImageUrl();
  const currentUrl = `${base_url}${pathname === '/' ? '' : pathname}`;

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{finalTitle}</title>

      {/* canonical url */}
      {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

      {/* noindex robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* meta-description */}
      <meta name="description" content={finalDescription} />

      {/* author from config.json */}
      <meta name="author" content={meta_author} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="moodcyi.com" />
      <meta property="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />
      
      {/* Additional meta for better social sharing */}
      <meta property="og:site_name" content="MOOD" />
      <meta property="og:locale" content="en_US" />
    </>
  );
};

export default SeoMeta;
