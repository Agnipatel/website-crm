import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import ScalingArchitecture from "@/components/ScalingArchitecture";
import FAQSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatApp";

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-black text-white"
    >
      <Navbar />

      <HeroSection />

      <section id="servicesSection" className="scroll-mt-20">
        <ServicesSection />
      </section>

      <section id="industriesSection" className="scroll-mt-20">
        <IndustriesSection />
      </section>

      <section id="scalingArchitecture" className="scroll-mt-20">
        <ScalingArchitecture />
      </section>

      <section id="faqSection" className="scroll-mt-20">
        <FAQSection />
      </section>

      <section id="contact" className="scroll-mt-20">
        <ContactForm />
      </section>

      <Footer />

      <WhatsAppButton />
    </main>
  );
}