"use client";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/src/config";
import { useCart } from "@/src/hooks/cart";
import { cn, formatPrice } from "@/src/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const { items, deleteItem } = useCart();
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const fee = 1;

  return (
    <div className="bg-black">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"></h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                mount && !items.length,
            })}
          >
            <h2 className="sr-only">Items in Cart</h2>

            {mount && !items.length ? (
              <div className="h-full flex flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image src={``} alt="empty cart icon" fill loading="eager" />
                  <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                  <p className="text-center text-muted-foreground">
                    Nothing to show here!
                  </p>
                </div>
              </div>
            ) : null}

            <ul
              className={cn({
                "divid-y divide-gray-200": mount && items.length,
              })}
            >
              {mount &&
                items.map(({ product }) => {
                  const label = CATEGORIES.find(
                    (c) => c.value === product.category
                  )?.label;
                  const { image } = product.images[0];

                  return (
                    <i key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24 ml-5">
                          {typeof image !== "string" && image.url ? (
                            <Image
                              src={image.url}
                              alt="product image"
                              fill
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-white hover:text-gray-800"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-white">
                                Category: {label}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-white">
                              {formatPrice(product.price)}
                            </p>
                          </>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => deleteItem(product.id)}
                              >
                                <X aria-hidden="true" className="w-5 h-5 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 flex space-x-2 text-sm text-white">
                          <Check className="h-5 w-5 flex flex-shrink-0 text-green-500" />
                          <span>Eligible for instant delivery </span>
                        </p>
                      </div>
                    </i>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-dimVoid px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-white">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white">Subtotal</p>
                <p className="text-sm font-medium text-white">
                  {mount ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-white">
                  <span className="">Flat transaction fee</span>
                </div>
                <div className="text-sm font-medium text-white">
                  {mount ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className="h-4 w-4 text-gray-900 animate-spin" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-white">Order Total</div>
                <div className="text-base font-medium text-white">
                {mount ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className="h-4 w-4 text-gray-900 animate-spin" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
                <Button className="w-full" size="lg">Checkout</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
