import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ImageFallback from "@/helpers/ImageFallback";
import Link from "next/link";
import { Product } from "@/lib/shopify/types";

const HeroSlider = ({ products }: { products: Product[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="hero-slider"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="relative">
            <ImageFallback
              src={product.featuredImage.url}
              alt={product.title}
              width={1200}
              height={600}
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="hero-title mb-4">{product.title}</h1>
                <p className="hero-subtitle mb-8">{product.description}</p>
                <Link
                  href={`/products/${product.handle}`}
                  className="btn-graffiti"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
};

export default HeroSlider;
