"use client";

import { ShoppingBag } from "lucide-react";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Sheet } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { formatPrice } from "@/src/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/src/hooks/cart";
import CartItem from "./CartItem";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";

const Cart = () => {
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const { items } = useCart();
  const count = items.length;
  const total = items.reduce((total, { product }) => total + product.price, 0);
  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingBag
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">
          {mount ? count : 0}
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg bg-gluonGray text-white">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-white">Items ({count})</SheetTitle>
        </SheetHeader>

        {count > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
              ={" "}
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 ">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction</span>
                  <span>{formatPrice(fee)}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Total Price</span>
                  <span>{formatPrice(total + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="flex h-full flex-col items-center justify-center space-y-1"
            >
              <ShoppingBasket size={100} />

              <div className="text-lg font-semibold">Empty Cart</div>

              <SheetTrigger asChild>
                <Link
                  href="/products"
                  className={buttonVariants({
                    variant: "ghost",
                    className: "text-sm bg-muted-foreground",
                    size: "sm",
                  })}
                >
                  Add product to cart
                </Link>
              </SheetTrigger>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
