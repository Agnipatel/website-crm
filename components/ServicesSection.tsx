"use client";

import {
  Search,
  BadgeDollarSign,
  Users,
  Globe,
  Database,
  Bot,
  BarChart3,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { usePopup } from '@/components/PopupProvider';

const services = [

  {
    icon: Globe,
    title: "Website Development",
    description:
      "Get a website engineered to convert—not just look good.",
    features: [
      "Fast & mobile-optimized",
      "Conversion-focused layouts",
      "Custom industry-specific design",
      "CRM-ready integrations",
    ],
  },
   {
    icon: Database,
    title: "CRM Implementation",
    description:
      "Centralize every lead and streamline your sales workflow.",
    features: [
      "Real-time website sync",
      "Automated lead routing",
      "Zero manual data entry",
      "HubSpot, GHL & Custom CRM",
    ],
  },
   {
    icon: Bot,
    title: "Marketing Automation",
    description:
      "Nurture leads automatically from first click to closed deal.",
    features: [
      "Email automation",
      "Behavior-triggered journeys",
      "Instant lead follow-up",
      "Less manual work",
    ],
  },
  {
    icon: Search,
    title: "SEO & AI Visibility",
    description:
      "Rank where customers actually search—including Google and AI answer engines.",
    features: [
      "Rank for high-intent commercial and local keywords",
      "Get cited by AI search engines and answer platforms",
      "Build long-term organic authority",
      "Scale qualified traffic without rising ad costs",
    ],
  },
  {
    icon: BadgeDollarSign,
    title: "Google Search Ads",
    description:
      "Capture high-intent customers at the exact moment they're ready to buy.",
    features: [
      "Precision targeting and smart bidding",
      "Eliminate low-value clicks and irrelevant traffic",
      "Continuous optimization using real performance data",
      "Turn search intent into booked calls",
    ],
  },
  {
    icon: Users,
    title: "Paid Social (Meta & LinkedIn)",
    description:
      "Reach decision-makers and high-intent buyers across social platforms.",
    features: [
      "High-performance creatives",
      "Advanced retargeting campaigns",
      "Continuous A/B testing",
      "Scale proven campaigns backed by data",
    ],
  },
  
 
 
  {
    icon: BarChart3,
    title: "Analytics & Tracking",
    description:
      "Know exactly what's driving revenue and optimize with confidence.",
    features: [
      "Full-funnel attribution",
      "Unified reporting",
      "Cost-per-lead visibility",
      "Actionable business insights",
    ],
  },
  {
    icon: TrendingUp,
    title: "Conversion Rate Optimization",
    description:
      "Turn more visitors into qualified leads and paying customers.",
    features: [
      "Landing page testing",
      "Form optimization",
      "Funnel friction removal",
      "Continuous CRO improvements",
    ],
  },
];

export default function ServicesSection() {
    const { setIsPopupOpen } = usePopup();
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Pill */}
        <div className="flex justify-center">
          <span className="rounded-full border border-green-600/30 bg-green-600/10 px-5 py-2 text-sm font-semibold text-green-600">
            Attract, Convert, and Retain Customers
          </span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mt-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            Everything Your Business Needs
          </h2>

          <p className="mt-6 text-lg text-slate-400 leading-8">
            From search visibility to paid campaigns to the systems that turn
            clicks into customers—we build and connect everything under one
            growth partner.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 mt-20 md:grid-cols-2 xl:grid-cols-4">

         {services.map((service, index) => {
  const Icon = service.icon;

  return (
    <div
      key={index}
      onClick={() => setIsPopupOpen(true)}
      className="group relative cursor-pointer rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-green-600 hover:bg-slate-900 hover:shadow-2xl hover:shadow-green-600/20"
    >
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600/20 transition-all duration-300 group-hover:bg-green-600">
        <Icon className="h-7 w-7 text-green-400 group-hover:text-white" />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-bold text-white">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-slate-400">
        {service.description}
      </p>

      {/* Features */}
      <ul className="mt-8 space-y-4">
        {service.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-slate-300"
          >
            <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8 flex items-center justify-between border-t border-slate-700 pt-6">
        <span className="font-semibold text-green-400 transition group-hover:text-blue-300">
          Learn More
        </span>

        <ArrowRight className="h-5 w-5 text-green-400 transition-all duration-300 group-hover:translate-x-2" />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 rounded-3xl border border-transparent transition-all duration-300 group-hover:border-green-500/30" />
    </div>
  );
})}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <button  onClick={() => setIsPopupOpen(true)} className="group rounded-xl bg-green-600 px-10 py-5 text-lg font-semibold text-black transition-all duration-300 hover:bg-green-600 hover:scale-105">
            <span className="flex items-center gap-3">
              Only Few Spots Left: Apply Before July 20th
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}