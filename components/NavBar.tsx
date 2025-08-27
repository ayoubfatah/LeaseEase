"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo-white.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, getProviders } from "next-auth/react";

import MobileMenu from "./MobileMenu";
import ProfileDropDown from "./ProfileDropDown";
import RightSideMenu from "./RightSideMenu";
import Login from "./Login";
import DesktopMenu from "./DesktopMenu";

export default function NavBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // UseRef to cache providers so they don’t refetch every render
  const providersRef = useRef<any>(null);
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      if (providersRef.current) {
        setProviders(providersRef.current);
        return;
      }

      try {
        const res = await getProviders();
        providersRef.current = res;
        setProviders(res);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  let pages = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
  ];

  if (status === "authenticated") {
    pages.push({ name: "Add Property", href: "/properties/add" });
    pages.push({ name: "Conversations", href: "/conversations" });
  }

  return (
    <nav className="bg-slate-800 border-b border-slate-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-[70px] items-center justify-between">
          {/* Mobile hamburger button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6 text-white"
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

          {/* Logo + Desktop Menu */}
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

            <DesktopMenu pages={pages} pathname={pathname} />
          </div>

          {/* Auth Area */}
          {status === "unauthenticated" && <Login providers={providers} />}
          {status === "authenticated" && <ProfileDropDown />}
        </div>
      </div>

      {/* Mobile Menu */}
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
