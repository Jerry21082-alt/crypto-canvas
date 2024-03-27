"use client";

import { User } from "@/src/payload-types";
import Link from "next/link";
import { useAuth } from "@/src/hooks/use-auth";
import { MoveRight, UserRound } from "lucide-react";
import { useState } from "react";

const UserMenu = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleShowUserMenu = () => {
    setShowUserMenu((previousState) => !previousState);
  };

  return (
    <div className="flex-col justify-center items-center relative">
      <UserRound cursor="pointer" onClick={handleShowUserMenu} />

      <div
        className={`${
          showUserMenu ? "show-list" : "hide-list"
        } flex flex-col bg-black rounded-b-lg fixed top-14 right-32 w-2/12`}
      >
        <ul className={`mt-5 flex flex-col gap-2 m-0 w-full items-end py-2`}>
          <li className={`flex items-center gap-2 relative`}>
            <div className="absolute -left-10">
              <MoveRight />
            </div>
            <Link href="/sell">User Dashboard</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li onClick={signOut} className="text-red-500 cursor-pointer">
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
