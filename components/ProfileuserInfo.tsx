import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function ProfileUserInfo() {
  const { data: session } = useSession();

  return (
    <div className=" pl-4 mt-10 flex gap-10">
      <div className=" ">
        <Image
          width={300}
          height={300}
          style={{ height: "auto" }}
          className="h-32 w-32 md:h-32 md:w-32 rounded-full mx-auto md:mx-0"
          src={(session && session?.user?.image) || "/images/profile.png"}
          alt="User"
        />
      </div>

      <div>
        <h2 className="text-xl mb-2">
          <span className="font-bold block">Name: </span>
          {session?.user?.name}
        </h2>
        <h2 className="text-xl">
          <span className="font-bold block">Email: </span>
          {session?.user?.email}
        </h2>
      </div>
    </div>
  );
}
