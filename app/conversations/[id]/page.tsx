"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function fetchThread(id: string) {
  const res = await fetch(`/api/conversations/${id}`);
  if (!res.ok) throw new Error("Failed to load conversation");
  return res.json();
}

export default function ConversationThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () => fetchThread(id),
  });

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const currentUserId = (session?.user as any)?.id;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  useEffect(() => {
    // mark as read on mount
    fetch(`/api/conversations/${id}`, { method: "PUT" });
  }, [id]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`/api/conversations/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text }),
    });
    if (res.ok) {
      setText("");
      await queryClient.invalidateQueries({ queryKey: ["conversation", id] });
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
    }
  }

  if (isLoading) {
    return (
      <section className="bg-gray-50 min-h-screen">
        <div className="container m-auto py-6 max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg border m-4 md:m-0 flex flex-col h-[calc(100vh-8rem)]">
            <div className="px-6 py-4 border-b bg-white rounded-t-lg">
              <h1 className="text-xl font-semibold">Loading...</h1>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <section className="bg-gray-50 min-h-screen">
        <div className="container m-auto py-6 max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg border m-4 md:m-0 flex flex-col h-[calc(100vh-8rem)]">
            <div className="px-6 py-4 border-b bg-white rounded-t-lg">
              <h1 className="text-xl font-semibold">
                Error loading conversation
              </h1>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 ">
      <div className="container m-auto py-6 max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg border m-4 md:m-0 flex flex-col h-[calc(100vh-8rem)]">
          <div className="px-6 py-4 border-b bg-white rounded-t-lg">
            <h1 className="text-xl font-semibold">Conversation</h1>
            {data?.conversation?.property?.name && (
              <div className="text-sm text-gray-600 mt-1">
                Regarding {data.conversation.property.name}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {data?.messages?.map((m: any) => {
              const isCurrentUser = m.sender._id === currentUserId;
              const isRead = m.readBy?.includes(currentUserId);

              return (
                <div
                  key={m._id}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[70%] ${
                      isCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!isCurrentUser && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarImage
                          src={m.sender?.image || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {m.sender?.username?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`flex flex-col ${
                        isCurrentUser ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`text-xs text-gray-500 mb-1 px-1 ${
                          isCurrentUser ? "text-right" : "text-left"
                        }`}
                      >
                        {isCurrentUser
                          ? "You"
                          : m.sender?.username || "Unknown"}
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-2 max-w-full break-words ${
                          isCurrentUser
                            ? "bg-blue-500 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-900 rounded-bl-md"
                        }`}
                      >
                        <div className="text-sm leading-relaxed">{m.body}</div>
                      </div>

                      <div
                        className={`text-xs text-gray-400 mt-1 px-1 flex items-center gap-1 ${
                          isCurrentUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <span>
                          {new Date(m.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <form onSubmit={handleSend} className="flex gap-3">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white"
              />
              <Button type="submit" className="px-6">
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
