"use client";
import { useLeaseContext } from "@/app/customHooks/LeastContextApi";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Trash2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Messages({ message }: any) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useLeaseContext();

  async function handleReadClick() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status === 200) {
        // we only want message
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
        if (read) {
          toast.success("Notification marked as read");
        }
        if (!read) {
          toast.success("Notification marked as unread");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function handleDeleteMsg() {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prev) => prev - 1);
        toast.success("Message Deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  if (isDeleted) return null;

  return (
    <Card
      className={`transition-all duration-200 my-4 ${
        !isRead ? "border-l-4 border-l-blue-500 bg-blue-50/20" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-medium text-gray-900">
              {message?.property?.name}
            </h3>
            <p className="text-xs text-gray-500">
              {format(new Date(message?.updatedAt), "MMM d, yyyy")}
            </p>
          </div>
          {!isRead && (
            <Badge variant="secondary" className="text-xs">
              New
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          {message?.body}
        </p>

        <div className="text-xs text-gray-600 space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3" />
            <span className="font-medium">{message.name}</span>
            <a
              href={`mailto:${message?.email}`}
              className="text-blue-600 hover:underline"
            >
              {message?.email}
            </a>
          </div>
          {message?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <a
                href={`tel:${message?.phone}`}
                className="text-blue-600 hover:underline"
              >
                {message?.phone}
              </a>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleReadClick}
            variant="ghost"
            size="sm"
            className={cn("h-7 px-2 text-xs", {
              "bg-green-400 text-white": isRead,
              "bg-blue-500 text-white": !isRead,
            })}
          >
            {isRead ? (
              <EyeOff className="h-3 w-3 mr-1" />
            ) : (
              <Eye className="h-3 w-3 mr-1" />
            )}
            {isRead ? "Mark as New" : "Mark as Read"}
          </Button>
          <Button
            onClick={handleDeleteMsg}
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs bg-red-600 text-white "
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
