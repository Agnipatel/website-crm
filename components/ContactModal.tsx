"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { usePopup } from "./PopupProvider";
import { useRouter } from "next/navigation";

const SERVICE_OPTIONS = [
  "Lead Generation Campaigns",
  "Meta Ads Management",
  "Google Ads Management",
  "SEO Management",
  "Landing Page Optimization",
  "WhatsApp & CRM Automation",
  "Social Media Marketing",
  "Website Design & Development",
];

export default function ContactModal() {
  const { isPopupOpen, setIsPopupOpen } = usePopup();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      website: formData.get("website"),
      source: formData.get("source"),
      services: formData.getAll("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      setIsSuccess(true);

      setTimeout(() => {
        setIsPopupOpen(false);
        setIsSuccess(false);
        router.push("/thank-you");
      }, 2000);
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Local SEO Health Check",
    "Landing Page Conversion Review",
    "Advertising Performance Audit",
    "Lead Generation Analysis",
    "Competitor Visibility Insights",
    "90-Day Growth Roadmap",
  ];

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPopupOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl max-h-[95vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-10">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />

                  <h3 className="mt-4 text-3xl font-bold text-slate-900">
                    Success!
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Your request has been submitted successfully.
                  </p>
                </div>
              ) : (
                <>
                  {/* Heading */}
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                      Get Your Free Marketing Audit
                    </h2>

                    <p className="mt-3 text-slate-600">
                      Discover growth opportunities and improve your lead
                      generation strategy.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-8">
                    {benefits.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />

                        <span className="text-sm text-slate-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <div className="mb-5 rounded-xl border border-green-400 bg-green-50 p-3 text-sm text-green-600">
                      {errorMsg}
                    </div>
                  )}

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name + Phone */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        name="name"
                        required
                        placeholder="Enter your full name"
                        className={inputClass}
                      />

                      <input
                        name="phone"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="gmail"
                      className={inputClass}
                    />

                    {/* Location */}
                    <input
                      name="location"
                      placeholder="Location"
                      className={inputClass}
                    />

                    {/* Website */}
                    <input
                      name="website"
                      placeholder="website"
                      className={inputClass}
                    />

                    {/* Source */}
                    <input
                      name="source"
                      placeholder="How Did You Hear About Us? (Google Search, Meta Ads, LinkedIn, Referral)"
                      className={inputClass}
                    />

                    {/* Services */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Services Interested In
                      </label>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {SERVICE_OPTIONS.map((service) => (
                          <label
                            key={service}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 cursor-pointer hover:bg-slate-50"
                          >
                            <input
                              type="checkbox"
                              name="service"
                              value={service}
                              className="h-4 w-4"
                            />

                            <span className="text-sm text-slate-700">
                              {service}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <select
                      name="budget"
                      className={inputClass}
                      required
                    >
                      <option value="">
                        Select Marketing Budget
                      </option>

                      <option value="40k-50k">
                        ₹40k - ₹50k
                      </option>

                      <option value="50k-80k">
                        ₹50k - ₹80k
                      </option>

                      <option value="80k-1L">
                        ₹80k - ₹1 Lakh
                      </option>

                      <option value="1L-5L">
                        ₹1 Lakh - ₹5 Lakh
                      </option>

                      <option value="5L+">
                        ₹5 Lakh+
                      </option>
                    </select>

                    {/* Message */}
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Tell us about your business goals, current challenges, and growth plans..."
                      className={`${inputClass} resize-none`}
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-600 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Get Your Free Marketing Audit"
                      )}
                    </button>

                    {/* Footer */}
                    <p className="text-center text-xs text-slate-500">
                      No spam. Ever. We’ll analyze your business
                      and contact you within 24 hours.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}