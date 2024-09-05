"use client";

import { useLeaseContext } from "@/app/customHooks/LeastContextApi";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export default function UnreadMessagesCount() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const { unreadCount, setUnreadCount } = useLeaseContext();

  useEffect(() => {
    if (!session) return;
    async function fetchMessages() {
      try {
        const res = await fetch("api/messages/unread-msgs");
        if (res.status === 200) {
          const data = await res.json();

          setUnreadCount(data.count);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessages();
  }, []);

  if (isLoading) return null;

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
}
