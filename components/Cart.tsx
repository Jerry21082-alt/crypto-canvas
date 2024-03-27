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
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";

const Cart = () => {
  const count = 0;
  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingBag
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-skyBlue group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Items (0)</SheetTitle>
        </SheetHeader>

        {count > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">Cart items</div>
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
                  <span>{formatPrice(fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart-items"
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
