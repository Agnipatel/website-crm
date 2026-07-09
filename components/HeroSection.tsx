"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { usePopup } from "@/components/PopupProvider";

const SERVICE_OPTIONS = [
  "Web Design & Development",
  "CRM Automation",
  "Lead Generation Campaigns",
  "Meta Ads Management",
  "Google Ads Management",
  "SEO Management",
  "WhatsApp & CRM Automation",
  "Social Media Marketing",
];

export default function HeroSection() {
  const { setIsPopupOpen } = usePopup();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    website: "",
    message: "",
    budget: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
          source: "Hero Form",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Show server message (e.g. duplicate lead)
        setError(json.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Success — redirect to thank you page
      router.push("/thank-you");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[slowZoom_30s_linear_infinite]"
        style={{
          backgroundImage: "url('/h.gif')",
        }}
      />

      <div className="absolute inset-0 bg-slate-950/20" />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-blue-950/70" />

      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:px-8">

        {/* LEFT */}

        <div className="w-full max-w-3xl lg:w-1/2">

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-green-400/40 bg-white/10 px-5 py-2 text-sm font-semibold text-green-400 backdrop-blur-md"
          >
           Websites & CRM Systems Work as One
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
            <button
              onClick={() => setIsPopupOpen(true)}
              className="group inline-flex items-center rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-500"
            >
              Claim 1 Year Free Maintenance

              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                "Zero Manual Data Entry",
                "Full-Funnel Lead Capture",
                "ROI-Focused Builds",
                "Faster Sales Follow-Up",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
                >
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT FORM */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:max-w-md xl:max-w-lg"
        >
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

            <h3 className="text-center text-3xl font-bold">
              Free Website Audit
            </h3>

            <p className="mt-3 text-center text-sm text-slate-300">
              Get a complete website growth report within 24 hours.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                placeholder="Full Name"
                className="h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-white placeholder:text-gray-400 outline-none focus:border-green-500"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                required
                placeholder="Phone Number"
                className="h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-white placeholder:text-gray-400 outline-none focus:border-green-500"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                placeholder="Email Address"
                className="h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-white placeholder:text-gray-400 outline-none focus:border-green-500"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="Location"
                className="h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-white placeholder:text-gray-400 outline-none focus:border-green-500"
              />

              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                type="url"
                placeholder="Website URL"
                className="h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-white placeholder:text-gray-400 outline-none focus:border-green-500"
              />

              {/* Services */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Services Interested In
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((service) => (
                    <label
                      key={service}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 text-xs transition-colors ${
                        selectedServices.includes(service)
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : "border-white/20 bg-black/20 text-slate-300 hover:border-white/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                      />
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                          selectedServices.includes(service)
                            ? "border-green-500 bg-green-500"
                            : "border-white/40"
                        }`}
                      >
                        {selectedServices.includes(service) && (
                          <svg viewBox="0 0 10 8" className="h-2 w-2 fill-white">
                            <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          </svg>
                        )}
                      </span>
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <select
                name="budget"
                value={formData.budget}
                onChange={handleSelectChange}
                required
                className="h-12 w-full rounded-xl border border-white/20 bg-black/30 px-4 text-white outline-none focus:border-green-500 appearance-none"
              >
                <option value="" className="bg-slate-900">Select Your Budget</option>
                <option value="40k-50k" className="bg-slate-900">₹40k – ₹50k</option>
                <option value="50k-80k" className="bg-slate-900">₹50k – ₹80k</option>
                <option value="80k-1L" className="bg-slate-900">₹80k – ₹1 Lakh</option>
                <option value="1L-5L" className="bg-slate-900">₹1 Lakh – ₹5 Lakh</option>
                <option value="5L+" className="bg-slate-900">₹5 Lakh+</option>
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-green-500"
              />

              {error && (
                <p className="rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-2 text-center text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-green-600 text-lg font-bold transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Get Free Audit"}
              </button>

              <p className="text-center text-xs text-slate-400">
                No Spam. We&apos;ll contact you within 24 hours.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Floating Blur */}

      <div className="absolute bottom-20 left-10 h-32 w-32 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute top-20 right-20 h-40 w-40 animate-bounce rounded-full bg-cyan-500/20 blur-3xl" />

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