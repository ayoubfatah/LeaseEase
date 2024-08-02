import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HomeFeaturedProperties from "@/components/HomeFeaturedProperties";
import HomeProperties from "@/components/HomeProperties";

import InfoBoxes from "@/components/InfoBoxes";

import React from "react";

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
