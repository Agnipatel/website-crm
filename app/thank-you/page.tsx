"use client";

import Navbar from "@/components/Navbar";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-green-500/30 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="bg-slate-900 border border-slate-800 p-10 md:p-16 rounded-3xl text-center max-w-2xl w-full">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 w-24 h-24" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Thank You!
          </h1>
          <p className="text-xl text-slate-400 mb-10">
            We&apos;ve received your request for a free audit. One of our performance marketing specialists will be in touch with you shortly.
          </p>
          <Link
            href="/"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>

   
    </main>
  );
}
