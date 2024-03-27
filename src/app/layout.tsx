import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import { Roboto } from "@next/font/google";


const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "DigitalTradeHub",
  description: "Your Gateway to Seamless Commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          roboto.className
        )}
      >
        <main className="flex flex-col min-h-screen relative">
          <Providers>
            <NavBar />
            <div className="flex-grow flex-1">{children}</div>
          </Providers>
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
