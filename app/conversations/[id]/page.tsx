"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";

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
    refetchInterval: 3000,
    staleTime: 0,
    enabled: !!id,
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

    const messageText = text.trim();
    setText("");

    // Create optimistic message
    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      body: messageText,
      sender: {
        _id: currentUserId,
        username: session?.user?.name || "You",
        image: session?.user?.image,
      },
      createdAt: new Date().toISOString(),
    };

    // Optimistically update the cache
    queryClient.setQueryData(["conversation", id], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        messages: [...(oldData.messages || []), optimisticMessage],
      };
    });

    try {
      const res = await fetch(`/api/conversations/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: messageText }),
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["conversation", id] });
        await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      } else {
        queryClient.setQueryData(["conversation", id], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            messages: oldData.messages.filter(
              (msg: any) => msg._id !== optimisticMessage._id
            ),
          };
        });
        console.error("Failed to send message");
      }
    } catch (error) {
      queryClient.setQueryData(["conversation", id], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          messages: oldData.messages.filter(
            (msg: any) => msg._id !== optimisticMessage._id
          ),
        };
      });
      console.error("Error sending message:", error);
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

  // Last message index for both users
  const lastCurrentUserIndex = data.messages
    ?.map((msg: any, i: number) => ({ ...msg, i }))
    .filter((msg: any) => msg.sender._id === currentUserId)
    .slice(-1)[0]?.i;

  const lastOtherUserIndex = data.messages
    ?.map((msg: any, i: number) => ({ ...msg, i }))
    .filter((msg: any) => msg.sender._id !== currentUserId)
    .slice(-1)[0]?.i;

  return (
    <section className="bg-gray-50 mt-4 flex justify-center items-center">
      <div className="container mx-auto  max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg border m-4 md:m-0 flex flex-col h-[650px]">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-white rounded-t-lg">
            <h1 className="text-xl font-semibold">Conversation</h1>
            {data?.conversation?.property?.name && (
              <div className="text-sm text-gray-600 mt-1">
                Regarding {data.conversation.property.name}
              </div>
            )}
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-0 flex flex-col">
            {data?.messages?.map((m: any, index: number) => {
              const isCurrentUser = m.sender._id === currentUserId;
              const isLastCurrent = index === lastCurrentUserIndex;
              const isLastOther = index === lastOtherUserIndex;
              const showDate = isLastCurrent || isLastOther;

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
                    {!isCurrentUser && isLastOther && (
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
                      className={`flex flex-col group ${
                        isCurrentUser ? "items-end" : "items-start"
                      } ${!isCurrentUser && !isLastOther ? "ml-[40px]" : ""}`}
                    >
                      <div
                        className={`text-xs text-gray-500 px-1 ${
                          isCurrentUser ? "text-right" : "text-left"
                        }`}
                      >
                        {!isCurrentUser && isLastOther
                          ? m.sender?.username
                          : ""}
                      </div>

                      <div
                        className={`relative rounded-2xl max-w-full break-words my-[1.5px] ${
                          isCurrentUser
                            ? `bg-blue-500 text-white ${
                                isLastCurrent ? "rounded-br-[0px]" : ""
                              }`
                            : `bg-gray-100 text-gray-900 ${
                                isLastOther ? "rounded-tl-[0]" : ""
                              }`
                        }`}
                      >
                        <div className="text-sm leading-relaxed flex flex-col">
                          <span className="py-2 px-4">{m.body}</span>
                        </div>
                      </div>

                      {showDate && (
                        <span className="text-[10px] px-1 mt-1 text-gray-400">
                          {formatRelativeTime(m.createdAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input form */}
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
