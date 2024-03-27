"use client";

import { Product } from "@/src/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/src/lib/utils";
import { CATEGORIES } from "@/src/config";
import ImageSlide from "./ImageSlide";

const ProductPlaceholder = () => (
  <div className="w-full flex flex-col">
    <div className="relative bg-snow aspect-square w-full overflow-hidden rounded-xl">
      <Skeleton className="h-full w-full" />
    </div>
    <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
    <Skeleton className="mt-4 w-16 h-4 rounded-lg" />
    <Skeleton className="mt-4 w-12 h-4 rounded-lg" />
  </div>
);

interface ProductListProps {
  product: Product | null;
  index: number;
}

const ProductList = ({ product, index }: ProductListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const newLabel = CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  const imageUrls = product?.images.map(({ image }) =>
    typeof image === "string" ? image : image.url
  ).filter(Boolean) as string[];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, index * 50);

    return () => clearTimeout(timer);
  }, [index]);

  if (!isLoading || !product) return <ProductPlaceholder />;
  if (isLoading && product)
    return (
      <Link
        href={`/productDetails/${product.id}`}
        className={cn(" invisible h-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isLoading,
        })}
      >
        <div className="flex flex-col w-full group">
          <ImageSlide urls={imageUrls}/>
          <h3 className="mt-4 font-medium text-red-600 group-hover:text-white">{product.name}</h3>
          <p className="mt-1 text-sm text-red-600 group-hover:text-white">{newLabel}</p>
          <p className="mt-1 font-medium text-sm text-red-500 group-hover:text-white">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
};

export default ProductList;
