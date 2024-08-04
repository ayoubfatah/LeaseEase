import React from "react";

export default function Spinner() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-screen w-screen fixed top-0 z-50">
      <span className="sr-only">Loading...</span>
      <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-5 w-5 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}
