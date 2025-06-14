"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  JSX,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiZoomIn } from "react-icons/fi";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import type { Swiper as TSwiper } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingProductThumb from "../loadings/skeleton/SkeletonProductThumb";

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

interface CustomZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CustomZoomImage = ({
  src,
  alt,
  width,
  height,
}: CustomZoomImageProps): JSX.Element => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-contain"
        style={{ maxHeight: "600px" }}
        priority
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

interface ProductGalleryProps {
  images: ImageItem[];
}

const ProductGallery = ({ images }: ProductGalleryProps): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loadingThumb, setLoadingThumb] = useState<boolean>(true);
  const [picUrl, setPicUrl] = useState<string>("");
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<Position>({ x: 50, y: 50 });

  // Debug logs
  console.log("ProductGallery received images:", images);
  console.log("First image transformedSrc:", images[0]?.transformedSrc);
  console.log("First image url:", images[0]?.url);

  // Detect touch device on component mount
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const searchParams = useSearchParams().get("color");

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchParams) {
      const foundIndex: number = images.findIndex(
        (item: ImageItem) => item.altText === searchParams,
      );
      setActiveIndex(foundIndex !== -1 ? foundIndex : 0);
    }
    setLoadingThumb(false);
  }, [searchParams, images]);

  const handleSlideChange = (swiper: TSwiper): void => {
    setActiveIndex(swiper.activeIndex);
    setPicUrl(images[swiper.activeIndex]?.transformedSrc || "");
  };

  const handleThumbSlideClick = (clickedUrl: string): void => {
    const foundIndex: number = images.findIndex(
      (item: ImageItem) => item.transformedSrc === clickedUrl,
    );
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  };

  const handleImageClick = (e: MouseEvent): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setIsZoomed(!isZoomed);
  };

  if (loadingThumb) {
    return <LoadingProductThumb />;
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSlideChange={handleSlideChange}
        >
          {images.map((item: ImageItem, index: number) => {
            // Debug log for each image being rendered
            console.log(`Rendering main image ${index}:`, item.transformedSrc);
            return (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full h-full group overflow-hidden cursor-zoom-in"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleImageClick}
                >
                  <Image
                    src={item.transformedSrc}
                    alt={item.altText}
                    width={item.width}
                    height={item.height}
                    className="w-full h-full object-contain transition-transform duration-300 ease-out"
                    style={{
                      maxHeight: "600px",
                      transform: isZoomed ? `scale(2.5)` : "scale(1)",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                    priority={index === 0}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      console.error(`Error loading image ${index}:`, e);
                      console.log("Failed image URL:", item.transformedSrc);
                    }}
                  />
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FiZoomIn size={20} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="hidden md:flex items-center justify-between mt-4">
          <div
            ref={prevRef}
            className="cursor-pointer p-2 rounded-full bg-light  border border-border  hover:bg-theme-light  transition-colors duration-200"
          >
            <HiOutlineArrowNarrowLeft size={24} className="text-dark " />
          </div>
          <div
            ref={nextRef}
            className="cursor-pointer p-2 rounded-full bg-light  border border-border  hover:bg-theme-light  transition-colors duration-200"
          >
            <HiOutlineArrowNarrowRight size={24} className="text-dark " />
          </div>
        </div>
      </div>

      <div className="mt-3 md:mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images.map((item: ImageItem, index: number) => {
            // Debug log for each thumbnail being rendered
            console.log(`Rendering thumbnail ${index}:`, item.transformedSrc);
            return (
              <SwiperSlide key={index}>
                <div
                  className={`cursor-pointer rounded-md overflow-hidden ${
                    activeIndex === index
                      ? "border-2 border-primary"
                      : "border border-border "
                  }`}
                  onClick={() => handleThumbSlideClick(item.transformedSrc)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.transformedSrc}
                      alt={item.altText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 20vw"
                      quality={75}
                      onError={(e) => {
                        console.error(`Error loading thumbnail ${index}:`, e);
                        console.log(
                          "Failed thumbnail URL:",
                          item.transformedSrc,
                        );
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProductGallery;
