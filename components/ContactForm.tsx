"use client";

import { PropertyType } from "@/types/types";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useDebounce } from "@/app/customHooks/useDebouncing";

export default function ContactForm({ property }: { property: PropertyType }) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // Initialize the debounce hook with 1 second delay
  const debounce = useDebounce(2000);

  // Create the debounced submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Wrap the submission logic in debounce
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

      try {
        const res = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200) {
          toast.success("Your message has been sent!");
          setWasSubmitted(true);
        } else if (res.status === 400 || res.status === 401) {
          const dataObj = await res.json();
          toast.error(dataObj.message);
        } else {
          toast.error("Failed to send message");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to send message");
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
