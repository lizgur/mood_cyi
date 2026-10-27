import ProductGallery from "./ProductGallery";
import ProductGalleryClientReveal from "./ProductGalleryClientReveal";
import ProductGalleryStatic from "./ProductGalleryStatic";
import type { ImageItem } from "./ProductGallery";

interface ProductGalleryWrapperProps {
  images: ImageItem[];
}

/**
 * Server wrapper: emit a static next/image gallery in the first HTML response,
 * then the interactive client gallery (zoom / thumbs) hydrates on top.
 * The static block stays in the document so crawlers that never run JS still
 * see real <img> tags. After hydration the client gallery is shown and the
 * static copy is hidden visually (not removed).
 */
const ProductGalleryWrapper = ({ images }: ProductGalleryWrapperProps) => {
  return (
    <div className="relative product-gallery">
      <div className="product-gallery-ssr">
        <ProductGalleryStatic images={images} />
      </div>
      <div className="product-gallery-client hidden">
        <ProductGallery images={images} />
      </div>
      <ProductGalleryClientReveal />
    </div>
  );
};

export default ProductGalleryWrapper;
