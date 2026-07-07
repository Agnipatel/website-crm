"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { usePopup } from '@/components/PopupProvider';

export default function HeroSection() {
   const { setIsPopupOpen } = usePopup();
  return (
    <section className="relative overflow-hidden text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[slowZoom_30s_linear_infinite]"
        style={{
          backgroundImage: "url('/h.gif')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/10" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-blue-950/70" />

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-green-400/40 bg-white/10 px-5 py-2 text-sm font-semibold text-green-600 backdrop-blur-md"
          >
            🚀 Websites & CRM Systems Work as One
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl"
          >
            Web Development &
            <span className="block bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              CRM Automation Services
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl"
          >
            Capture every lead, eliminate manual data entry, and turn website
            visitors into paying customers. We build high-performance websites
            integrated with CRM automation that helps businesses grow faster.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10"
          >
            <button  onClick={() => setIsPopupOpen(true)} className="group inline-flex items-center rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-500">
              Claim 1 Year Free Maintenance
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
              {[
                "Zero Manual Data Entry",
                "Full-Funnel Lead Capture",
                "ROI-Focused Builds",
                "Faster Sales Follow-Up",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                >
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Circles */}
      <div className="absolute bottom-20 left-10 h-32 w-32 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-20 right-20 h-40 w-40 animate-bounce rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}