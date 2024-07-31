"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

export default function DesktopMenu() {
  const pathname = usePathname();
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        <Link
          href="/"
          className={`text-white ${
            pathname === "/" || pathname === "/home" ? "bg-gray-900" : ""
          } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Home
        </Link>
        <Link
          href="/properties"
          className={`text-white ${
            pathname === "/properties" ? "bg-gray-900" : ""
          } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Properties
        </Link>
        <Link
          href="/property/add"
          className={`text-white ${
            pathname === "/property/add" ? "bg-gray-900" : ""
          }  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
          Add Property
        </Link>
      </div>
    </div>
  );
}
