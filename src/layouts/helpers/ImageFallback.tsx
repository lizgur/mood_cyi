"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ImageFallback = (props: any) => {
  const { src, fallback, ...rest } = props;

  // Provide a default fallback if none is provided
  const defaultFallback = fallback || "/images/product_image404.jpg";

  // Handle empty, null, or undefined src
  const initialSrc = src && src.trim() !== "" ? src : defaultFallback;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    // Only update if src is valid
    const validSrc = src && src.trim() !== "" ? src : defaultFallback;
    setImgSrc(validSrc);
  }, [src, defaultFallback]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(defaultFallback);
      }}
    />
  );
};

export default ImageFallback;
