"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePopup } from "@/components/PopupProvider";
import Image from "next/image";

export default function About() {
  const { setIsPopupOpen } = usePopup();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-green-500/30">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-green-500">PANDAeCe</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We are a performance-driven marketing agency dedicated to scaling your business with precision-targeted campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-800">
            {/* Using a placeholder gradient since images aren't provided */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-slate-900 flex items-center justify-center">
              <span className="text-slate-500 font-medium">Company Office Image Placeholder</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-slate-400 mb-6">
              PANDAeCe was founded with a single mission: to deliver measurable results. We don't just focus on vanity metrics; we care about your ROI and revenue growth. Our team of experts specializes in Meta Ads, Google Ads, SEO, and full-stack marketing automation.
            </p>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Get Free Marketing Audit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-col-reverse">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-slate-400 mb-6">
              Collaboration is at the heart of what we do. We work closely with our clients to understand their unique challenges and craft bespoke strategies that drive conversions.
            </p>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Partner With Us
            </button>
          </div>
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-bl from-green-500/20 to-slate-900 flex items-center justify-center">
              <span className="text-slate-500 font-medium">Team Collaboration Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
