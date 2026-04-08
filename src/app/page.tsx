import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GridBackground from "@/components/GridBackground";
import FluidBackground from "@/components/FluidBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#F0EDFB" }}>
      {/* z-0 — static grid + radial gradients */}
      <GridBackground />
      {/* z-1 — fluid animated color blobs */}
      <FluidBackground />
      {/* z-50 — navbar */}
      <Navbar />
      {/* z-10 — hero content */}
      <HeroSection />
    </div>
  );
}
