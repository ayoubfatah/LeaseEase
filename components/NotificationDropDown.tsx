"use client";

import { useLeaseContext } from "@/app/customHooks/LeastContextApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useGetNotifications } from "@/reactQuery/useGetNotification";
import { useOptDeleteNotification } from "@/reactQuery/useOptDeleteNotification";
import { useOptToggleReadStatus } from "@/reactQuery/useOptToggleReadStatus";
import { format } from "date-fns";
import { Eye, EyeOff, Mail, Phone, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  body: string;
  read: boolean;
  updatedAt: string;
  property?: {
    name: string;
  };
}

function NotificationItem({
  message,
  onReadToggle,
  onDelete,
}: {
  message: Message;
  onReadToggle: (id: string, isRead: boolean) => void;
  onDelete: any;
}) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = () => {
    onReadToggle(message._id, isRead);
    setIsRead((prev) => !prev);
  };

  if (isDeleted) return null;

  return (
    <div
      className={cn(
        "p-3 border-b border-border hover:bg-accent/50 transition-colors",
        !isRead && "bg-blue-50/20 border-l-2 border-l-blue-500"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">
              {message.property?.name || "New Message"}
            </h4>
            {!isRead && (
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {format(new Date(message.updatedAt), "MMM d, yyyy")}
          </p>
        </div>
      </div>

      <p className="text-sm text-foreground mb-2 line-clamp-2 leading-relaxed">
        {message.body}
      </p>

      <div className="text-xs text-muted-foreground space-y-1 mb-2">
        <div className="flex items-center gap-1 truncate">
          <Mail className="h-3 w-3 flex-shrink-0" />
          <span className="font-medium truncate">{message.name}</span>
        </div>
        {message.phone && (
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{message.phone}</span>
          </div>
        )}
      </div>

      <div className="flex gap-1">
        <Link
          href={"/conversations"}
          className={cn(
            "h-6 px-2 text-xs bg-green-100 text-green-700 hover:bg-green-200 flex items-center rounded-md"
          )}
        >
          <Eye className="h-3 w-3 " />
          View
        </Link>
        <Button
          onClick={handleClick}
          variant="ghost"
          size="sm"
          className={cn("h-6 px-2 text-xs", {
            "bg-green-100 text-green-700 hover:bg-green-200": isRead,
            "bg-blue-100 text-blue-700 hover:bg-blue-200": !isRead,
          })}
        >
          {isRead ? (
            <EyeOff className="h-3 w-3 mr-1" />
          ) : (
            <Eye className="h-3 w-3 mr-1" />
          )}
          {isRead ? "Mark New" : "Mark Read"}
        </Button>
        <Button
          onClick={() => onDelete(message._id)}
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs bg-red-100 text-red-700 hover:bg-red-200"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function NotificationDropdown() {
  const { data: session } = useSession();
  const { unreadCount, setUnreadCount } = useLeaseContext();
  const { notifications = [], isLoading, isError } = useGetNotifications(); // <-- default fallback to []

  const { mutate: toggleRead } = useOptToggleReadStatus();
  const { mutate: deleteMessage } = useOptDeleteNotification();

  useEffect(() => {
    if (notifications) {
      const unread = notifications.filter((msg: any) => !msg.read).length;
      setUnreadCount(unread);
    }
  }, [notifications]);

  if (isLoading) return null;
  if (isError) {
    console.error("Failed to load notifications");
    return null;
  }

  function handleReadToggle(messageId: string, isRead: boolean) {
    toggleRead({ id: messageId, newReadState: !isRead });
    setUnreadCount((prev) => (!isRead ? prev - 1 : prev + 1));
  }

  function handleDelete(_id: string, wasUnread: boolean) {
    deleteMessage(_id);
    if (wasUnread) {
      setUnreadCount((prev) => prev - 1);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <FaBell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount > 10 ? "10+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0 max-h-96 overflow-hidden"
      >
        <div className="p-3 border-b border-border bg-muted/50 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Link
            href={"/notifications"}
            className="underline text-black/30 text-[11px] hover:text-black transition-colors "
          >
            View All
          </Link>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.filter((m: any) => !m.read).length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No Notifications yet
            </div>
          ) : (
            notifications
              .filter((m: any) => !m.read)
              .map((message: any) => (
                <NotificationItem
                  key={message._id}
                  message={message}
                  onReadToggle={handleReadToggle}
                  onDelete={handleDelete}
                />
              ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
