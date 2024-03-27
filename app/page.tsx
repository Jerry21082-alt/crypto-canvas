import WidthWrapper from "@/components/WidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

const options = [
  {
    name: "Instant Delivery",
    icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your mail in seconds and downlaod them right away!",
  },
  {
    name: "Instant Delivery",
    icon: CheckCircle,
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
          <h1 className="text-4xl font-bold tracking-tight text-snow sm:text-6xl">
            Welcome to <span className="text-skyBlue">BlockBounty</span>, 
            Your Gateway to Seamless Commerce
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            In a world driven by digital innovation, where connectivity and
            convenience are paramount, we present DigitalTradeHub - your premier
            destination for a transformative online shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Trending Products
            </Link>
            <Button variant={"secondary"} >Our quality promise &rarr;</Button>
          </div>
        </div>
      </WidthWrapper>

      <section className="bg-dimVoid">
        <WidthWrapper className="p-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {options.map((option, index) => (
              <div key={index} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                    {<option.icon className="w-1/3 h-1/3"/>}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-snow">{option.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground text-snow">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </WidthWrapper>
      </section>
    </>
  );
}
