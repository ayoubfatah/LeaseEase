"use client";

import { useLeaseContext } from "@/app/customHooks/LeastContextApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Trash2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOptToggleReadStatus } from "@/reactQuery/useOptToggleReadStatus";
import { useOptDeleteNotification } from "@/reactQuery/useOptDeleteNotification";

export default function Messages({ message }: any) {
  const { setUnreadCount } = useLeaseContext();
  const { mutate: toggleReadStatus } = useOptToggleReadStatus();
  const { mutate: deleteMessage } = useOptDeleteNotification();

  const isUnread = !message.read;

  function handleReadClick() {
    toggleReadStatus({
      id: message._id,
      newReadState: !message.read,
    });

    // Update unread count manually
    setUnreadCount((prev) => (!message.read ? prev - 1 : prev + 1));
  }

  function handleDeleteMsg() {
    deleteMessage(message._id);

    // Only decrease unreadCount if it was unread
    if (!message.read) {
      setUnreadCount((prev) => prev - 1);
    }
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 my-4",
        isUnread && "border-l-4 border-l-blue-500 bg-blue-50/20"
      )}
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
          {isUnread && (
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
              "bg-green-400 text-white": !isUnread,
              "bg-blue-500 text-white": isUnread,
            })}
          >
            {!isUnread ? (
              <EyeOff className="h-3 w-3 mr-1" />
            ) : (
              <Eye className="h-3 w-3 mr-1" />
            )}
            {!isUnread ? "Mark as New" : "Mark as Read"}
          </Button>
          <Button
            onClick={handleDeleteMsg}
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs bg-red-600 text-white"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
