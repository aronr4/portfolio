import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import Stories from "@/components/sections/Stories";
import ImageReelSection from "@/components/sections/ImageReelSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-bg">
      <Hero />
      <Statement />
      <FeaturedWork />
      <Services />
      <Stories />
      <ImageReelSection />
    </div>
  );
}
