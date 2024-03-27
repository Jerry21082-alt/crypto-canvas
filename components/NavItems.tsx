"use client";

import { useState, useRef, useEffect } from "react";
import { CATEGORIES } from "@/src/config";
import Navitem from "./Navitem";
import { clickOutside } from "@/src/hooks";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", (e) => handler(e));

    return document.removeEventListener("keydown", (e) => handler(e));
  }, []);

  const isAnyOpen = activeIndex !== null;

  const containerRef = useRef<HTMLDivElement | null>(null);

  clickOutside(containerRef, () => setActiveIndex(null));

  return (
    <div ref={containerRef} className="flex gap-4 h-full">
      {CATEGORIES.map((category, i) => {
        const isOpen = i === activeIndex;

        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        return (
          <Navitem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
