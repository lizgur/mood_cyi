"use client";

import Image from "next/image";
import { JSX, MouseEvent, useEffect, useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";

export interface ImageItem {
  url: string;
  altText: string;
  width: number;
  height: number;
  transformedSrc: string;
}

interface Position {
  x: number;
  y: number;
}

interface ProductGalleryProps {
  images: ImageItem[];
}

const ProductGallery = ({ images }: ProductGalleryProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<Position>({ x: 50, y: 50 });

  // Optional ?color= match after mount — do not call useSearchParams here.
  // That hook opts the nearest Suspense boundary (the whole product page) into
  // client rendering, which is why gallery <img> tags never appeared in the
  // first HTML response.
  useEffect(() => {
    const color = new URLSearchParams(window.location.search).get("color");
    if (!color) return;
    const foundIndex = images.findIndex((item) => item.altText === color);
    if (foundIndex !== -1) setActiveIndex(foundIndex);
  }, [images]);

  const handleImageClick = (e: MouseEvent): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed((current) => !current);
  };

  const goTo = (index: number) => {
    if (!images.length) return;
    const next = (index + images.length) % images.length;
    setActiveIndex(next);
    setIsZoomed(false);
  };

  if (!images.length) {
    return <></>;
  }

  return (
    <>
      <div className="relative">
        <div
          className="relative w-full h-full group overflow-hidden cursor-zoom-in"
          onClick={handleImageClick}
        >
          {images.map((item: ImageItem, index: number) => (
            <div
              key={`${item.url}-main-${index}`}
              className={index === activeIndex ? "block" : "hidden"}
            >
              <Image
                src={item.transformedSrc || item.url}
                alt={item.altText}
                width={item.width || 800}
                height={item.height || 800}
                className="w-full h-full object-contain transition-transform duration-300 ease-out"
                style={{
                  maxHeight: "600px",
                  transform:
                    isZoomed && index === activeIndex ? "scale(2.5)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
                priority={index === 0}
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FiZoomIn size={20} />
          </div>
        </div>

        {images.length > 1 && (
          <div className="hidden md:flex items-center justify-between mt-4">
            <button
              type="button"
              aria-label="Previous product image"
              onClick={() => goTo(activeIndex - 1)}
              className="cursor-pointer p-2 rounded-full bg-light border border-border hover:bg-theme-light transition-colors duration-200"
            >
              <HiOutlineArrowNarrowLeft size={24} className="text-dark" />
            </button>
            <button
              type="button"
              aria-label="Next product image"
              onClick={() => goTo(activeIndex + 1)}
              className="cursor-pointer p-2 rounded-full bg-light border border-border hover:bg-theme-light transition-colors duration-200"
            >
              <HiOutlineArrowNarrowRight size={24} className="text-dark" />
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 md:mt-4 grid grid-cols-4 gap-2.5">
          {images.map((item: ImageItem, index: number) => (
            <button
              type="button"
              key={`${item.url}-thumb-${index}`}
              aria-label={`Show image ${index + 1}: ${item.altText}`}
              aria-current={activeIndex === index}
              className={`cursor-pointer rounded-md overflow-hidden ${
                activeIndex === index
                  ? "border-2 border-primary"
                  : "border border-border"
              }`}
              onClick={() => goTo(index)}
            >
              <div className="relative aspect-square">
                <Image
                  src={item.transformedSrc || item.url}
                  alt={item.altText}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 20vw"
                  quality={75}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductGallery;
