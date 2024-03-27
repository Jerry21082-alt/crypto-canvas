"use client";

import WidthWrapper from "@/components/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDownToLine, CheckCircle, DownloadCloud, Leaf, Rabbit, ShieldCheck, Zap } from "lucide-react";
import ProductReel from "@/components/ProductReel";

const options = [
  {
    name: "Instant Delivery",
    icon: Zap,
    description:
      "Get your assets delivered to your mail in seconds and downlaod them right away!",
  },
  {
    name: "Verified Products",
    icon: ShieldCheck,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards.",
  },
  {
    name: "For the planet",
    icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment. ",
  },
];

export default function Home() {
  return (
    <>
      <WidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-snow sm:text-6xl">CryptoCanvas</h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          CryptoCanvas is an indie NFT development studio, based in Beautiful Vicotoria island, Lagos Nigeria. We're handfull of lovely humans creating NFTs with relatable simplicty
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href={``} className="flex items-center justify-center">
              <button className="Button">
                <span data-text='Explore'>Explore</span>
                  <div />
                </button>
            </Link>
          </div>
        </div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products"
          title="Brand New"
        />
      </WidthWrapper>

      {/* <section>
        <WidthWrapper className="p-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {options.map((option, index) => (
              <div
                key={index}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                    {<option.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-snow">
                    {option.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground text-snow">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </WidthWrapper>
      </section> */}
    </>
  );
}
