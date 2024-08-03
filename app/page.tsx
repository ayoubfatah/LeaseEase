import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeFeaturedProperties from "@/components/HomeFeaturedProperties";
import HomeProperties from "@/components/HomeProperties";

import InfoBoxes from "@/components/InfoBoxes";

import React from "react";

export const metadata = {
  title: "LeaseEase",
  description:
    "LeaseEase is a modern property rental platform that simplifies the rental process for both property owners and potential tenants. Explore, manage, and list rental properties with ease.",
};
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfoBoxes />
      <HomeFeaturedProperties />
      <HomeProperties />
      <Footer />
    </>
  );
}
