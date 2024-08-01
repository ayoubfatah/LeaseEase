"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
export default function DesktopMenu({
  pathname,
  pages,
}: {
  pathname: string;
  pages: { name: string; href: string }[];
}) {
  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className={`text-white ${
              pathname === page.href ? "bg-gray-700" : ""
            } block rounded-md px-3 py-2 text-sm font-medium`}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
