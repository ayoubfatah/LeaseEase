import Link from "next/link";
import React from "react";

export default function InfoBox({
  heading,
  children,
  boxBg,
  btnText,
  btnColor,
  btnTextColor,
  btnHref,
}: {
  heading: string;
  children: React.ReactNode;
  boxBg: string;
  btnText: string;
  btnColor: string;
  btnTextColor: string;
  btnHref: string;
}) {
  return (
    <div
      className={`${boxBg} p-6 rounded-lg shadow-md flex flex-col justify-between`}
    >
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{children}</p>
      <span>
        <Link
          href={btnHref}
          className={`inline-block   ${btnColor}  ${btnTextColor}  rounded-lg px-4 py-2 hover:opacity-90 transition-all duration-500 ease-linear `}
        >
          {btnText}
        </Link>
      </span>
    </div>
  );
}
