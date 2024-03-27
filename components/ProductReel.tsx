"use client";

import { TQueryValidator } from "@/src/lib/validator/query-validator";
import { Product } from "@/src/payload-types";
import { trpc } from "@/src/trpc/client";
import Link from "next/link";
import ProductList from "./ProductList";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALL_BACK = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;
  const { data: queryResult, isLoading } =
    trpc.getInfinitProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALL_BACK,
        query,
      },
      { getNextPageParam: (lastPage) => lastPage.nextPage }
    );

  const products = queryResult?.pages.flatMap((page) => page.items);

  let myMap: (Product | null)[] = [];

  if (products && products.length) {
    myMap = products;
  } else if (isLoading) {
    myMap = new Array<null>(query.limit ?? FALL_BACK).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold sm:text-3xl text-white">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-white">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link href={href} className="text-red-600 hover:text-white hidden md:inline-block">
            Explore Collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="flex items-center w-full mt-6">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {myMap.map((product, index) => (
              <ProductList key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
