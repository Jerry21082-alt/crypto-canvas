"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import { cn } from "@/src/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSlideProps {
  urls: string[];
}
const ImageSlide = ({ urls }: ImageSlideProps) => {
  const activeStyles =
    "active:scale-[0.95] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2  aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-snow border-snow";

  const inActiveStyles = "hidden text-gray-400";

  const [swipe, setSwipe] = useState<null | SwiperType>(null);
  const [activeImg, setActiveImg] = useState<Number>(0);
  const [slideConfig, setSlideConfig] = useState({
    start: true,
    end: activeImg === urls.length - 1,
  });

  useEffect(() => {
    swipe?.on("slideChange", ({ activeIndex }) => {
      setActiveImg(activeIndex);
      setSlideConfig({
        start: activeIndex === 0,
        end: activeIndex === urls.length - 1,
      });
    });
  }, [swipe, urls]);

  return (
    <div className="group relative bg-snow aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swipe?.slideNext();
          }}
          className={cn(activeStyles, "right-3", {
            [inActiveStyles]: slideConfig.end,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.end,
          })}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            swipe?.slidePrev();
          }}
          className={cn(activeStyles, "left-3", {
            [inActiveStyles]: slideConfig.start,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.start,
          })}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          }
        }}
        onSwiper={(swipe) => setSwipe(swipe)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              src={url}
              alt="product image"
              fill
              loading="eager"
              className="-z-10 w-full h-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlide;
