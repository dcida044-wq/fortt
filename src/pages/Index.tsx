import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import ImageSequenceScroll from "@/components/ImageSequenceScroll";
import Spline3DSection from "@/components/Spline3DSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessTimeline />
        <ImageSequenceScroll />
        <Spline3DSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
