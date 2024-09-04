"use client";
import Messages from "@/components/Messages";
import React, { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getMessages() {
      try {
        const res = await fetch("/api/messages");
        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMessages();
  }, []);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {messages.map((message: any, i: number) => {
            return <Messages key={i} message={message} />;
          })}
        </div>
      </div>
    </section>
  );
}
