import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function ProfileUserInfo() {
  const { data: session } = useSession();

  return (
    <div className="md:w-1/4 mx-20 mt-10">
      <div className="mb-4">
        <Image
          width={300}
          height={300}
          style={{ height: "auto" }}
          className="h-32 w-32 md:h-32 md:w-32 rounded-full mx-auto md:mx-0"
          src={(session && session?.user?.image) || "/images/profile.png"}
          alt="User"
        />
      </div>

      <h2 className="text-2xl mb-4">
        <span className="font-bold block">Name: </span>
        {session?.user?.name}
      </h2>
      <h2 className="text-2xl">
        <span className="font-bold block">Email: </span>
        {session?.user?.email}
      </h2>
    </div>
  );
}
