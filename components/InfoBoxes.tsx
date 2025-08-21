import React from "react";
import InfoBox from "@/components/InfoBox";

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"For Renters"}
            boxBg={"bg-blue-100"}
            btnText={"Browse Properties"}
            btnColor={"bg-blue-500"}
            btnTextColor={"text-white"}
            btnHref={"/properties"}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading={"For Property Owners"}
            boxBg={"bg-gray-100"}
            btnText={"Add Property"}
            btnColor={"bg-slate-700"}
            btnTextColor={"text-white"}
            btnHref={"/properties/add"}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}
