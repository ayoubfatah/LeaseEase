"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export default function UnreadMessagesCount() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [data, setData] = useState([""]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    async function fetchMessages() {
      try {
        const res = await fetch("api/messages");
        if (res.status === 200) {
          const data = await res.json();
          const totalUnreadMessages = data.filter(
            (msg: any) => msg.read === true
          ).length;
          setUnreadCount(totalUnreadMessages);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
  }, []);

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  );
}
