"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePopup } from "@/components/PopupProvider";

export default function CaseStudiesPage() {
  const { setIsPopupOpen } = usePopup();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-green-500/30">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Case <span className="text-green-500">Studies</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            See how we have helped businesses scale their revenue and achieve their marketing goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-green-500/50 transition-colors">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-slate-900 flex items-center justify-center">
                <span className="text-slate-500 font-medium">Project #{item} Thumbnail</span>
              </div>
              <div className="p-8">
                <div className="text-green-500 font-bold mb-2">+300% ROI</div>
                <h3 className="text-2xl font-bold mb-4">E-commerce Brand Scaling</h3>
                <p className="text-slate-400 mb-6">
                  We helped this D2C brand scale their monthly recurring revenue by over 300% within 6 months using advanced Meta Ads and Google Ads strategies.
                </p>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="text-white bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg font-medium transition-colors w-full"
                >
                  Get Similar Results
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}
