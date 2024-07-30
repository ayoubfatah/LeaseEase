import Link from "next/link";
import React from "react";
import ProfileDropDown from "./ProfileDropDown";
import Notifications from "./Notifications";

export default function RightSideMenu() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
      <Notifications />
      {/* <!-- Profile dropdown button --> */}
      <ProfileDropDown />
    </div>
  );
}
