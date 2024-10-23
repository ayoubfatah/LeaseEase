"use client";
import Messages from "@/components/Messages";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

async function fetchMessages() {
  const response = await fetch("/api/messages");
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
}

export default function MessagesPage() {
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(),
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          {messages?.map((message: any, i: number) => {
            return <Messages key={i} message={message} />;
          })}
        </div>
      </div>
    </section>
  );
}
