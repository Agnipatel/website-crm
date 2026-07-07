"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePopup } from "@/components/PopupProvider";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechStart",
    quote: "PANDAeCe completely transformed our lead generation pipeline. We're seeing a 3x return on ad spend consistently.",
  },
  {
    name: "Michael Chen",
    role: "Founder, Growth E-com",
    quote: "Their team is incredibly responsive and data-driven. The SEO strategies they implemented doubled our organic traffic.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    quote: "The CRM automation setup saved us 20 hours a week and increased our close rate by 45%. Highly recommended!",
  },
];

export default function TestimonialsPage() {
  const { setIsPopupOpen } = usePopup();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-green-500/30">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-green-500">Testimonials</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our partners have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((test, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
              <div className="text-green-500 text-6xl absolute top-4 left-6 opacity-20">"</div>
              <p className="text-slate-300 mb-8 relative z-10 text-lg italic">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                  {/* Placeholder for client profile images */}
                  <span className="text-slate-400 text-sm">{test.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">{test.name}</h4>
                  <p className="text-slate-400 text-sm">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-slate-900 p-12 rounded-3xl border border-slate-800">
          <h2 className="text-3xl font-bold mb-6">Ready to become our next success story?</h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-colors text-lg"
          >
            Get Your Free Audit
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
