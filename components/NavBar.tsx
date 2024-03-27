import React from "react";
import WidthWrapper from "./WidthWrapper";
import NavItems from "./NavItems";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "@/src/lib/payload-utils";
import { cookies } from "next/headers";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

const NavBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="bg-black sticky z-50 top-0 inset-x-0 h-16 rounded-b-xl">
      <header className="relative">
        <WidthWrapper>
          <div>
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0 text-snow">
                <Link href="/">logo</Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex relative">
                <div className="hidden lg:flex lg:flex-1 lg:flex-center items-center lg:justify-end lg:space-x-6 text-snow">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Log in
                    </Link>
                  )}

                  {user ? (
                    <UserMenu user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign up
                    </Link>
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
