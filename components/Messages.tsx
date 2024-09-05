"use client";
import { useLeaseContext } from "@/app/customHooks/LeastContextApi";
import { format } from "date-fns";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
          toast.success("Message marked as read");
        }
        if (!read) {
          toast.success("Message marked as unread");
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
        toast.success("Message  Deleted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  if (isDeleted) return null;
  return (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!isRead && (
          <div className="absolute  top-2 right-2  text-white bg-blue-500 px-2 py-1 rounded-md">
            New
          </div>
        )}
        <h2 className="text-xl mb-4">
          <span className="font-bold">
            Property Inquiry: {message?.property?.name}
          </span>
        </h2>
        <p className="text-gray-700">{message?.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.name}
          </li>

          <li>
            <strong>Reply Email:</strong>
            <a href="mailto:recipient@example.com" className="text-blue-500">
              {message?.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>
            <a href="tel:123-456-7890" className="text-blue-500">
              {message?.phone}
            </a>
          </li>
          <li>
            <strong>Received: </strong>
            {format(new Date(message?.updatedAt), "MMMM d, yyyy, h:mm a")}
          </li>
        </ul>
        {isRead ? (
          <button
            onClick={handleReadClick}
            className="mt-4 mr-3 bg-green-500 text-white py-1 px-3 rounded-md"
          >
            Mark As New
          </button>
        ) : (
          <button
            onClick={handleReadClick}
            className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
          >
            Mark As Read
          </button>
        )}
        <button
          onClick={handleDeleteMsg}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
