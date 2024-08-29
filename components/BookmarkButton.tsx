import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

export default function BookmarkButton({ property }: any) {
  const { data: session } = useSession();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = session?.user?.id; // Move this up

  useEffect(() => {
    if (!userId) return;
    async function getBookmarkedStatus() {
      try {
        const res = await fetch("/api/bookmarks/check", {
          // Ensure endpoint is correct
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (!res.ok) {
          // Check for HTTP errors
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setIsBookMarked(data.isBookmarked);
      } catch (error) {
        console.error("Error occurred:", error); // Improved error logging
      } finally {
        setLoading(false);
      }
    }
    getBookmarkedStatus();
  }, [property._id, userId]);

  async function handleClicked() {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property.");
      return; // Exit function if user is not signed in
    }

    try {
      const res = await fetch("/api/bookmarks", {
        // Ensure endpoint is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (!res.ok) {
        // Check for HTTP errors
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      toast.success(data.message);
      setIsBookMarked(data.isBookmarked);
    } catch (error) {
      console.error("Error occurred:", error); // Improved error logging
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookMarked ? (
    <button
      onClick={handleClicked}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <i className="fas fa-bookmark mr-2"></i> Remove bookmark
    </button>
  ) : (
    <button
      onClick={handleClicked}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <i className="fas fa-bookmark mr-2"></i> Bookmark Property
    </button>
  );
}
