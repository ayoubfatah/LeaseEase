"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function MobileMenu({
  pathname,
  pages,
  session,
  providers,
}: {
  pathname: string;
  pages: { name: string; href: string }[];
  session: any;
  providers: any;
}) {
  return (
    <div>
      <div className="" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className={`text-white ${
                pathname === page.href ? "bg-gray-700" : ""
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              {page.name}
            </Link>
          ))}

          {!session &&
            providers &&
            Object.values(providers).map((provider: any, index: number) => (
              <button
                key={index}
                onClick={() => signIn(provider.id)}
                className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                <FaGoogle className="text-white mr-2" />
                <span>Login or Register</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
