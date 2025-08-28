"use client";

import { PropertyType } from "@/types/types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // If using App Router

import { useDebounce } from "@/app/customHooks/useDebouncing";

export default function ContactForm({ property }: { property: PropertyType }) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // Initialize the debounce hook with 1 second delay
  const debounce = useDebounce(2000);

  // Create the debounced submit handler
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await debounce(async () => {
      if (!session || !session.user) {
        toast.error("You must be logged in to send a message.");
        return;
      }

      const { id, name, email, phone } = session.user as {
        id: string;
        name?: string;
        email?: string;
        phone?: string;
      };

      const data = {
        sender: id,
        recipient: property.owner,
        property: property._id,
        name: name || "",
        email: email || "",
        phone: phone || "",
        message,
      };
      const participantId = property.owner;
      const propertyId = property._id;

      try {
        // STEP 1: Get or create the conversation
        const conversationRes = await fetch("/api/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ participantId, propertyId }),
        });

        if (!conversationRes.ok) {
          const err = await conversationRes.json();
          toast.error(err.message || "Failed to start conversation");
          return;
        }

        const conversation = await conversationRes.json();
        const conversationId = conversation._id;

        // STEP 2: Send the message
        const messageRes = await fetch(`/api/conversations/${conversationId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: message }),
        });

        const res = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (messageRes.status === 201) {
          toast.success("Your message has been sent!");
          setWasSubmitted(true);

          // Optional: redirect to the conversation
          router.push(`/conversations/${conversationId}`);
        } else {
          const err = await messageRes.json();
          toast.error(err.message || "Failed to send message");
        }
      } catch (error) {
        console.error("Message sending error:", error);
        toast.error("Something went wrong.");
      } finally {
        setMessage("");
      }
    })();
  };

  if (!session) {
    return <p>You must be logged in to contact this property manager</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!wasSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="submit"
            >
              <i className="fas fa-paper-plane mr-2"></i> Send Message
            </button>
          </div>
        </form>
      ) : (
        <p className="!text-green-500 mb-4">
          Your message has been submitted successfully
        </p>
      )}
    </div>
  );
}
