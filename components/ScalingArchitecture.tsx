"use client";

import {
  SearchCheck,
  Target,
  Rocket,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { usePopup } from '@/components/PopupProvider';

const stages = [
  {
    number: "01",
    icon: SearchCheck,
    title: "Funnel Leakage & Attribution Audit",
    description:
      "We dissect your customer journey to uncover exactly where prospects drop off before converting.",
  },
  {
    number: "02",
    icon: Target,
    title: "Competitive Arbitrage Strategy",
    description:
      "We analyze competitor spend, messaging, and keyword gaps to identify low-cost, high-yield growth opportunities.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Aggressive Deployment & Validation",
    description:
      "We launch your integrated website, CRM, SEO, and paid campaigns to capture high-intent customers immediately.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Unit Economics Optimization",
    description:
      "We analyze post-click behavior, reduce acquisition costs, and increase customer lifetime value through continuous optimization.",
  },
];

export default function ScalingArchitecture() {
   const { setIsPopupOpen } = usePopup();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">

          <span className="rounded-full border border-green-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-green-400">
            🚀 Our Proven Growth Framework
          </span>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-6xl">
            Our Data-Backed Framework
            <span className="block text-green-400">
              to Predictable Growth
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            A proven four-stage system that takes your business from leaking
            leads to scaling profitably—built on data at every step.
          </p>

        </div>

        {/* Timeline */}
        <div className="relative mt-24">

          {/* Vertical Line */}
          <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-green-600 via-green-500 to-green-700 lg:block"></div>

          <div className="space-y-10">

           {stages.map((stage) => {
  const Icon = stage.icon;

  return (
    <div
      key={stage.number}
      onClick={() => setIsPopupOpen(true)}
      className="group relative flex cursor-pointer flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:bg-slate-900 hover:shadow-2xl hover:shadow-green-500/20 lg:ml-16 lg:flex-row lg:items-center"
    >
      {/* Step Number */}
      <div className="absolute -left-6 hidden h-12 w-12 items-center justify-center rounded-full bg-green-600 font-bold text-white shadow-lg lg:flex">
        {stage.number}
      </div>

      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 transition-all duration-300 group-hover:bg-green-600">
        <Icon className="h-8 w-8 text-green-400 transition-colors duration-300 group-hover:text-white" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-400">
          Stage {stage.number}
        </div>

        <h3 className="text-2xl font-bold text-white">
          {stage.title}
        </h3>

        <p className="mt-4 leading-8 text-slate-400">
          {stage.description}
        </p>

        {/* Learn More */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-5">
          <span className="font-semibold text-green-400 transition group-hover:text-blue-300">
            Learn More
          </span>

          <ArrowRight className="h-5 w-5 text-green-400 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>

      {/* Hover Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-all duration-300 group-hover:border-green-500/30" />
    </div>
  );
})}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">

          <button  onClick={() => setIsPopupOpen(true)} className="group inline-flex items-center rounded-xl bg-green-600 px-10 py-5 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-green-500">

            See How It Works For You

            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />

          </button>

        </div>

      </div>
    </section>
  );
}