import { CATEGORIES } from "@/src/config";
import { useCart } from "@/src/hooks/cart";
import { formatPrice } from "@/src/lib/utils";
import { Product } from "@/src/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];
  const { deleteItem } = useCart()

  const label = CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
          {typeof image !== "string" && image.url ? (
            <Image
              src={image.url}
              alt={product.name}
              fill
              className="absolute object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary">
              <ImageIcon
                aria-hidden="true"
                className="h-4 w-4 text-muted-foreground"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col self-start">
          <span className="line-clap-1 text-sm font-medium mb-1">
            {product.name}
          </span>

          <span className="line-clamp-1 text-sm capitalize text-white">
            {label}
          </span>

          <div className="mt-4 text-xs text-muted-foreground">
            <button onClick={() => deleteItem(product.id)} className="flex items-center gap-0.5 text-red-500"><X className="w-3 h-3 text-red-500"/>Remove</button>
          </div>
        </div>

      </div>
        <div className="flex flex-col space-y-1 font-medium">
            <span className="ml-auto line-clamp-1 text-sm">{formatPrice(product.price)}</span>
        </div>
    </div>
  );
};

export default CartItem;
