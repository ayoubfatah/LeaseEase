"use client";
import { useLeaseContext } from "@/app/customHooks/LeastContextApi";
import Link from "next/link";

export default function DesktopMenu({
  pathname,
  pages,
}: {
  pathname: string;
  pages: { name: string; href: string }[];
}) {
  const { unReadMsgs } = useLeaseContext();

  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className={`text-white ${
              pathname === page.href ? "bg-gray-700" : ""
            } block rounded-md px-3 py-2 text-sm font-medium relative`}
          >
            <span className="relative">
              {" "}
              {page.name}
              {page.name === "Conversations" && unReadMsgs > 0 && (
                <span className="absolute top-0 right-[-4px] inline-flex items-center justify-center size-[6px] rounded-full text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 "></span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
