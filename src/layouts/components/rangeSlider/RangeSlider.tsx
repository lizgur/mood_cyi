"use client";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./rangeSlider.css";

const RangeSlider = ({
  maxPriceData,
}: {
  maxPriceData: { amount: string; currencyCode: string };
}) => {
  const maxAmount = parseInt(maxPriceData?.amount);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(maxAmount);
  const [initialMinValue, setInitialMinValue] = useState(0);
  const [initialMaxValue, setInitialMaxValue] = useState(maxAmount);

  const router = useRouter();
  const searchParams = useSearchParams();
  const getMinPrice = searchParams.get("minPrice");
  const getMaxPrice = searchParams.get("maxPrice");

  const rangeRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const rangeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with URL params if available
    const minVal = getMinPrice ? parseInt(getMinPrice) : 0;
    const maxVal = getMaxPrice ? parseInt(getMaxPrice) : maxAmount;
    
    setMinValue(minVal);
    setMaxValue(maxVal);
    setInitialMinValue(minVal);
    setInitialMaxValue(maxVal);
  }, [getMinPrice, getMaxPrice, maxAmount]);

  useEffect(() => {
    updateRangeBar();
  }, [minValue, maxValue]);

  const updateRangeBar = () => {
    if (
      !rangeLineRef.current ||
      !minThumbRef.current ||
      !maxThumbRef.current ||
      !rangeRef.current
    )
      return;

    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const minPercent = (minValue / maxAmount) * 100;
    const maxPercent = (maxValue / maxAmount) * 100;

    // Update the range line position
    rangeLineRef.current.style.left = `${minPercent}%`;
    rangeLineRef.current.style.width = `${maxPercent - minPercent}%`;

    // Update thumbs position
    minThumbRef.current.style.left = `${minPercent}%`;
    maxThumbRef.current.style.left = `${maxPercent}%`;
  };

  const handlePointerDown = (thumb: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rangeRect = rangeRef.current?.getBoundingClientRect();
    if (!rangeRect) return;

    const rangeWidth = rangeRect.width;
    const initialMinVal = minValue;
    const initialMaxVal = maxValue;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const dx = currentX - startX;
      const dPercent = (dx / rangeWidth) * 100;

      if (thumb === "min") {
        const newPercent = (initialMinVal / maxAmount) * 100 + dPercent;
        const newValue = Math.max(
          0,
          Math.min(maxValue - 1, Math.round((newPercent * maxAmount) / 100)),
        );
        setMinValue(newValue);
      } else {
        const newPercent = (initialMaxVal / maxAmount) * 100 + dPercent;
        const newValue = Math.max(
          minValue + 1,
          Math.min(maxAmount, Math.round((newPercent * maxAmount) / 100)),
        );
        setMaxValue(newValue);
      }
    };

    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  };



  function priceChange(minValue: number, maxValue: number) {
    const newParams = new URLSearchParams(searchParams.toString());

    // Update or add "minPrice" and "maxPrice" parameters
    newParams.set("minPrice", minValue.toString());
    newParams.set("maxPrice", maxValue.toString());

    router.push(createUrl("/products", newParams), { scroll: false });
  }

  const showSubmitButton =
    minValue !== initialMinValue ||
    maxValue !== initialMaxValue;

  return (
    <div className="range-slider-container">
      <div className="flex justify-between">
        <p>
          {minValue} {maxPriceData?.currencyCode}
        </p>
        <p>
          {maxValue} {maxPriceData?.currencyCode}
        </p>
      </div>

      <div className="range-slider" ref={rangeRef}>
        <div className="slider-track"></div>
        <div className="slider-range" ref={rangeLineRef}></div>
        <div
          className="slider-thumb thumb-min"
          ref={minThumbRef}
          onMouseDown={handlePointerDown("min")}
          onTouchStart={handlePointerDown("min")}
        ></div>
        <div
          className="slider-thumb thumb-max"
          ref={maxThumbRef}
          onMouseDown={handlePointerDown("max")}
          onTouchStart={handlePointerDown("max")}
        ></div>
      </div>

      {showSubmitButton && (
        <button
          className="btn btn-sm btn-primary w-full mb-4"
          onClick={() => {
            priceChange(minValue, maxValue);
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default RangeSlider;
