import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 text-white py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <h1>LeaseEase</h1>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Properties</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-100 mt-2 md:mt-0">
            &copy; {currentYear} LeaseEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
