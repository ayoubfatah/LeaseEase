"use client";
import Messages from "@/components/Messages";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function MessagesPage() {
  const fetchMessages = async () => {
    const res = await axios.get("/api/messages");
    return res.data;
  };

  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) return <Spinner />;

  if (isError) return <p>Error: {(error as Error).message}</p>;

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
