"use client";

import { PageInfo, Product } from "@/lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCardView from "./ProductCardView";
import ProductListView from "./ProductListView";

interface ResponsiveProductViewProps {
  searchParams: any;
  initialProducts: Product[];
  initialPageInfo: PageInfo;
}

const ResponsiveProductView = ({
  searchParams,
  initialProducts,
  initialPageInfo,
}: ResponsiveProductViewProps) => {
  const urlSearchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const layout = urlSearchParams.get("layout");

  useEffect(() => {
    // Mark that we're now on the client side
    setIsClient(true);
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Don't render anything until we're on the client side to prevent hydration issues
  if (!isClient) {
    return (
      <ProductListView
        searchParams={searchParams}
        initialProducts={initialProducts}
        initialPageInfo={initialPageInfo}
      />
    );
  }

  // Always show list view on mobile
  if (isMobile) {
    return (
      <ProductListView
        searchParams={searchParams}
        initialProducts={initialProducts}
        initialPageInfo={initialPageInfo}
      />
    );
  }

  // On desktop, show grid or list based on layout parameter
  if (layout === "list") {
    return (
      <ProductListView
        searchParams={searchParams}
        initialProducts={initialProducts}
        initialPageInfo={initialPageInfo}
      />
    );
  }

  return (
    <ProductCardView
      searchParams={searchParams}
      initialProducts={initialProducts}
      initialPageInfo={initialPageInfo}
    />
  );
};

export default ResponsiveProductView; 