"use client";

import { ImageItem } from "./ProductGallery";
import ProductGallery from "./ProductGallery";

interface ProductGalleryWrapperProps {
  images: ImageItem[];
}

const ProductGalleryWrapper = ({ images }: ProductGalleryWrapperProps) => {
  return <ProductGallery images={images} />;
};

export default ProductGalleryWrapper;
