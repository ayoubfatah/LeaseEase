"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Conversation, User } from "@/types/ConversationType"; // update path if needed
import { useSession } from "next-auth/react"; // if you're using next-auth
import { Skeleton } from "@/components/ui/skeleton";

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch("/api/conversations");
  if (!res.ok) throw new Error("Failed to load conversations");
  return res.json();
}

export default function ConversationsPage() {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  const currentUserId = (session?.user as any)?.id;

  console.log(currentUserId, "currentUser id");

  if (isLoading) {
    return (
      <section>
        <div className="container m-auto py-10 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Conversations:</h1>
            <Skeleton className="w-full h-[80px]" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <div className="container m-auto py-10 max-w-5xl">
          <div className="bg-white px-6 py-8">Error loading conversations</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container m-auto py-10 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Conversations:</h1>
          <div className="space-y-3">
            {data?.map((c: Conversation) => {
              // Find the other participant (not current user)
              const otherUser = c.participants.find(
                (p) => p._id !== currentUserId
              );

              // Find the sender of the last message
              const sender = c.participants.find(
                (p) => p._id === c.lastMessage?.sender
              );

              return (
                <Link
                  className="my-1"
                  key={c._id}
                  href={`/conversations/${c._id}`}
                >
                  <Card className="hover:bg-gray-50">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {otherUser?.image && (
                          <Image
                            src={otherUser.image}
                            alt={otherUser.username}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium">
                            {otherUser?.username || "Conversation"}{" "}
                            {c.property?.name && (
                              <span className="text-gray-500">
                                · {c.property.name}
                              </span>
                            )}
                          </div>
                          {c.lastMessage?.body && (
                            <div className="text-sm text-gray-600 truncate max-w-xl">
                              <span className="font-semibold">
                                {currentUserId === sender?._id
                                  ? "You"
                                  : sender?.username}
                                :
                              </span>{" "}
                              {c.lastMessage.body}
                            </div>
                          )}
                        </div>
                      </div>
                      {c.unreadCount > 0 && <Badge>{c.unreadCount}</Badge>}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            {(!data || data.length === 0) && (
              <div className="text-gray-600 text-sm">No conversations yet.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
