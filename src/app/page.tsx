import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import Stories from "@/components/sections/Stories";
import ExploreSection from "@/components/sections/ExploreSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-bg">
      <Hero />
      <Statement />
      <FeaturedWork />
      <Services />
      <Stories />
      <ExploreSection />
    </div>
  );
}
