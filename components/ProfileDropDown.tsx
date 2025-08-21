"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import profileDefault from "@/public/images/profile.png";
import { signOut, useSession } from "next-auth/react";
import { FaBell } from "react-icons/fa";
import Notifications from "./Notifications";
export default function ProfileDropDown() {
  const { data: session } = useSession();
  const [isRightSideMenuOpen, setIsRightSideMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsRightSideMenuOpen(false);
      }
    }

    if (isRightSideMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isRightSideMenuOpen]);

  const handleSignOut = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await signOut({ callbackUrl: "/" });
  };

  const toggleMenu = () => {
    setIsRightSideMenuOpen(!isRightSideMenuOpen);
  };

  return (
    <div className="relative ml-3 flex justify-center gap-3 ">
      {/* notification */}

      <Notifications />

      <button
        onClick={toggleMenu}
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded={isRightSideMenuOpen}
        aria-haspopup="true"
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">Open user menu</span>
        <Image
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
          src={(session && session?.user?.image) || profileDefault}
          alt=""
        />
      </button>

      {/* Right side menu */}

      {isRightSideMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-[25px] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            onClick={(e) => e.stopPropagation()}
          >
            Your Profile
          </Link>
          <Link
            href="/properties/saved"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            onClick={(e) => e.stopPropagation()}
          >
            Saved Properties
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700"
            role="menuitem"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
