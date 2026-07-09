"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IVFAuditSection() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    website: "",
    source: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/thank-you");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  // const benefits = [
  //   "Local SEO Health Check",
  //   "Lead Generation Analysis",
  //   "Landing Page Conversion Review",
  //   "Competitor Visibility Insights",
  //   "Advertising Performance Audit",
  //   "90-Day Growth Roadmap",
  // ];

  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-24">
      {/* Background Blur Effects */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">

        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center">


          <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
            Find Out Why Customers Choose Other

            <span className="block text-green-500">
              Businesses Over Yours
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
            Our growth specialists will identify structural leakages in your website and lead-capture process and provide actionable strategies to decrease your customer acquisition cost (CAC).

          </p>
        </div>

        {/* Main Card */}
        <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:mt-16 lg:p-12">

          {/* Benefits */}
          <div className="mb-10">
            <h3 className="mb-8 text-center text-2xl font-bold text-white lg:text-3xl">
              What You ll Receive
            </h3>

            {/* <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-3"
                >
                  <span className="text-lg font-bold text-green-500">
                    ✔
                  </span>

                  <span className="text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div> */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                placeholder="Enter your full name"
                className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
              />
            </div>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="email"
              className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
            />

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              type="text"
              placeholder="  Location"
              className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
            />

            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              type="url"
              placeholder="website"
              className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
            />

            <input
              name="source"
              value={formData.source}
              onChange={handleChange}
              type="text"
              placeholder="How Did You Hear About Us?(Google Search, Meta Ads, LinkedIn, Referral)"
              className="h-14 w-full rounded-xl border border-white/10 bg-black/40 px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell us about your website goals, challenges, and growth plans..."
              className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-green-500"
            />

            {/* Recaptcha Mock UI */}
            <div className="flex justify-center">
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-6 py-4">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                />

                <span className="text-sm text-gray-300">
                  Im not a robot
                </span>

                <span className="text-xs text-gray-500">
                  reCAPTCHA
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Submitting..."
                : "Get Your website Audit"}
            </button>

            <p className="text-center text-sm text-gray-400">
              No spam. Ever. Well analyze your website and contact you within
              24 hours.
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}