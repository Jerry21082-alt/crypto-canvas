import AddToCartBtn from "@/components/AddToCartBtn";
import ImageSlide from "@/components/ImageSlide";
import ProductReel from "@/components/ProductReel";
import WidthWrapper from "@/components/WidthWrapper";
import { CATEGORIES } from "@/src/config";
import { getPayloadClient } from "@/src/get-payload";
import { formatPrice } from "@/src/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

interface PageProps {
  params: {
    productId: string;
  };
}
const page = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;

  if (!product) return notFound();

  const label = CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const imageUrls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <WidthWrapper>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-4">
              {BREADCRUMBS.map((crumb, i) => (
                <li key={crumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={crumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {crumb.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1
                className="text-3xl font-bold tracking-tight
               text-red-500 sm:text-4xl"
              >
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-white">
                  {formatPrice(product.price)}
                </p>

                <div className="ml-4 border-l text-white border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-white">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Instant delivery
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlide urls={imageUrls} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <>
              <div className="mt-10">
                <AddToCartBtn product={product}/>
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-muted-foreground hover:text-gray-700">
                    Free 30 Day return
                  </span>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Similar ${label} just like ${product.name}`}
      />
    </WidthWrapper>
  );
};

export default page;
