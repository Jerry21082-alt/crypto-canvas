"use client";

import React from "react";
import WidthWrapper from "./WidthWrapper";
import NavItems from "./NavItems";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Cart from "./Cart";

const NavBar = () => {
  const user = null;

  return (
    <div className="bg-darkVoid sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-darkVoid">
        <WidthWrapper>
          <div>
            <div className="flex h-16 items-center">
              {/*todo */}

              <div className="ml-4 flex lg:ml-0">Logo</div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex">
                <div className="hidden lg:flex lg:flex-1 lg:flex-center items-center lg:justify-end lg:space-x-6 text-snow">
                  {user ? null : (
                    <Link
                      href="/sing-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Log in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign up
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
