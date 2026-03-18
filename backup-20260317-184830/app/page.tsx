import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AgentCards from "@/components/AgentCards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AgentCards />
        <TestimonialsSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
