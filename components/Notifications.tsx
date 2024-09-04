"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaBell } from "react-icons/fa";
import UnreadMessagesCount from "./UnreadMessagesCount";

export default function Notifications() {
  const router = useRouter();
  return (
    <Link href="/messages" className="relative group">
      <button
        onClick={() => router.push("/messages")}
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">View notifications</span>
        <FaBell size={20} />
      </button>
      <UnreadMessagesCount />
    </Link>
  );
}
