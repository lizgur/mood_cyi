"use client";

import { ImageItem } from "@/layouts/components/product/ProductGallery";
import ProductGallery from "@/layouts/components/product/ProductGallery";

interface ProductGalleryWrapperProps {
  images: ImageItem[];
}

const ProductGalleryWrapper = ({ images }: ProductGalleryWrapperProps) => {
  return <ProductGallery images={images} />;
};

export default ProductGalleryWrapper;
