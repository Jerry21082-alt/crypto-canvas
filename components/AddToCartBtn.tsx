"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useCart } from "@/src/hooks/cart";
import { Product } from "@/src/payload-types";

const AddToCartBtn = ({ product }: { product: Product }) => {
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const { addItem } = useCart()

  const handleAddItems = () => {
    addItem(product)
    setAddedToCart(true)
  }

  useEffect(() => {
    const timedOut = setTimeout(() => {
      setAddedToCart(false);
    }, 200);

    return () => {
      clearTimeout(timedOut);
    };
  }, [addedToCart]);
  
  if (addedToCart) {
    toast.success("Item Added to cart!");
    return;
  }

  return (
    <Button size="lg" className="w-full" onClick={handleAddItems}>
      Add To Cart
    </Button>
  );
};

export default AddToCartBtn;
