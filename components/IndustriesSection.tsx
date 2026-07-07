"use client";

import {
  ShoppingBag,
  Briefcase,
  Cpu,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { usePopup } from '@/components/PopupProvider';

const industries = [
  {
    icon: ShoppingBag,
    title: "E-Commerce & Retail",
    subtitle: "Build systems for:",
    items: [
      "Online Stores",
      "D2C Brands",
      "Subscription Products",
      "Marketplace Sellers",
      "Inventory-Driven Businesses",
    ],
  },
  {
    icon: Briefcase,
    title: "Professional & Local Services",
    subtitle: "Build systems for:",
    items: [
      "Law Firms & Consultancies",
      "Clinics & Healthcare Practices",
      "Real Estate Agencies",
      "Home Services & Contractors",
      "Accounting & Financial Advisory Firms",
    ],
  },
  {
    icon: Cpu,
    title: "SaaS & Technology Startups",
    subtitle: "Scale customer acquisition for:",
    items: [
      "B2B SaaS Platforms",
      "Mobile Apps",
      "Marketplace Platforms",
      "Subscription Software",
      "Early-Stage Startups",
    ],
  },
  {
    icon: Building2,
    title: "Enterprise & B2B Organizations",
    subtitle: "Drive growth for:",
    items: [
      "Multi-Location Businesses",
      "B2B Manufacturers & Distributors",
      "Franchise Networks",
      "Corporate & Institutional Clients",
      "Nonprofit & Membership Organizations",
    ],
  },
];

export default function IndustriesSection() {
   const { setIsPopupOpen } = usePopup();
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm font-semibold text-green-600">
            ● Business Growth Specialists
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white md:text-6xl">
            Web Development & CRM Solutions
            <span className="block text-green-400">
              for Every Business Model
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            From early-stage startups to established enterprises, we build
            systems that acquire high-quality leads, increase customer lifetime
            value, and scale profitably—whatever your industry.
          </p>
        </div>

        {/* Industry Cards */}
       {/* Industry Cards */}
<div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
  {industries.map((industry, index) => {
    const Icon = industry.icon;

    return (
      <div
        key={index}
        onClick={() => setIsPopupOpen(true)}
        className="group relative cursor-pointer rounded-3xl border border-slate-800 bg-slate-900/70 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/20"
      >
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600/20 transition-all duration-300 group-hover:bg-green-600">
          <Icon className="h-7 w-7 text-green-600 transition-colors duration-300 group-hover:text-white" />
        </div>

        {/* Title */}
        <h3 className="mt-6 text-2xl font-bold text-white">
          {industry.title}
        </h3>

        {/* Subtitle */}
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-green-300">
          {industry.subtitle}
        </p>

        {/* List */}
        <ul className="mt-6 space-y-4">
          {industry.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-300"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Card Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-green-700 pt-6">
          <span className="font-semibold text-green-600 transition group-hover:text-green-600">
            Learn More
          </span>

          <ArrowRight className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:translate-x-2" />
        </div>

        {/* Hover Border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-all duration-300 group-hover:border-green-500/30" />
      </div>
    );
  })}
</div>

        {/* Bottom Text */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="text-xl leading-8 text-slate-300">
            Wherever your business operates, we build measurable growth systems
            designed for sustainable, profitable scaling.
          </p>

          <button   onClick={() => setIsPopupOpen(true)} className="group mt-10 inline-flex items-center rounded-xl bg-green-600 px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-green-600">
            Secure 10% Discount Spot
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}