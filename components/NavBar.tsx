"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo-white.png";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import ProfileDropDown from "./ProfileDropDown";
import RightSideMenu from "./RightSideMenu";
2;
import Login from "./Login";
import DesktopMenu from "./DesktopMenu";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function NavBar() {
  const [providers, setProviders] = useState<any>(null);

  const { data: session } = useSession();
  console.log("Session:", session);
  useEffect(() => {
    const setAuthProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    setAuthProviders();
  }, []);

  const pathname = usePathname();

  let pages = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
  ];
  if (session) {
    pages = pages.concat([{ name: "Add Property", href: "/property/add" }]);
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="bg-slate-800 border-b border-slate-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-[70px] items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset "
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6 text-white   "
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                height={20}
                width={20}
                className="h-auto w-auto"
                src={logo}
                alt="LeaseEase"
              />

              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                LeaseEase
              </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}

            <DesktopMenu pages={pages} pathname={pathname} />
          </div>
          {!session && <Login providers={providers} />}
          {session && <ProfileDropDown />}
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          providers={providers}
          session={session}
          pages={pages}
          pathname={pathname}
        />
      )}
    </nav>
  );
}
