"use client";

import { CATEGORIES } from "@/src/config";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof CATEGORIES)[number];

interface NavItemsProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const Navitem = ({
  category,
  handleOpen,
  isAnyOpen,
  isOpen,
}: NavItemsProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <button type="button"className="Button" onClick={handleOpen}><span data-text={category.label}>{category.label}</span></button>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-full text-sm text-muted-foreground",
          {
            "is-opened": isOpen,
            "is-closed": !isOpen,
          }
        )}
      >
        <div className="absolute inset-0 top-1/2 bg-snow">
          <div
            className={`card-container relative bg-black rounded-b-xl`}
          >
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((feature, i) => (
                    <div key={i} className="card relative text-base sm:text-sm">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                        <div className="overlay" />

                        <Image
                          src={feature.image}
                          alt="product image"
                          fill
                          className="card-img object-cover object-center"
                        />

                        <Link
                          href={feature.href}
                          className="card-link mt-6 font-medium text-snow absolute right-3 bottom-3 z-20"
                        >
                          {feature.name}
                        </Link>
                      </div>

                      <p className="card-p mt-1 text-white" aria-hidden="true">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navitem;
