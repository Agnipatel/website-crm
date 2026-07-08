"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { usePopup } from '@/components/PopupProvider';

const faqs = [
  {
    question: "How do your services help lower customer acquisition cost (CAC)?",
    answer:
      "We eliminate disconnected systems and manual handoffs between your website and your sales process. By channeling every lead into a CRM built for fast follow-up, your cost-per-lead drops significantly while conversion efficiency increases.",
  },
  {
    question:
      "We already have a website. Do we need to rebuild it from scratch?",
    answer:
      "Not always. We start with a free audit to see what's working. In many cases, we integrate your CRM into your existing site and only rebuild the pages that are underperforming.",
  },
  {
    question: "We already have a CRM. Can you still help?",
    answer:
      "Yes. We work with most major CRMs, including HubSpot, GoHighLevel, and custom CRM solutions. We'll connect your existing CRM to your website or recommend a switch only if it will genuinely improve results.",
  },
  {
    question:
      "How do you track post-click activity, like form fills and booked calls?",
    answer:
      "We establish deep-funnel event attribution tracking that links your website traffic data directly to your CRM. This ensure your campaigns are optimized for booked calls and closed deals—not just surface-level clicks.",
  },
  {
    question:
      "Can you support enterprise or multi-location businesses?",
    answer:
      "Absolutely. For larger organizations, we build structured account-based systems across websites, CRM platforms, and paid marketing channels—supporting complex sales cycles and multiple decision-makers.",
  },
  {
    question:
      "What marketing budget do you recommend to see meaningful results?",
    answer:
      "Budget depends on your growth goals, market competition, and marketing channels. For most businesses, we recommend starting with a budget that supports consistent testing, optimization, and scalable lead generation.",
  },
  {
    question: "Is ad spend included in your pricing?",
    answer:
      "No. Our service fee and ad spend are separate. Your advertising budget goes directly to Google, Meta, LinkedIn, or other platforms, while our fee covers strategy, website development, CRM integration, campaign management, and reporting.",
  },
];

export default function FAQSection() {
  const { setIsPopupOpen } = usePopup();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-sm font-semibold text-green-400">
            ● FAQs
          </span>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-bold text-white md:text-6xl">
            Questions Founders Ask
            <span className="block text-green-600">
              Before Scaling With Us
            </span>
          </h2>

          {/* <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Everything you need to know before partnering with us to build your
            website, CRM, and scalable marketing systems.
          </p> */}
        </div>

        {/* Accordion */}
        <div className="mt-20 space-y-5">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-green-800 bg-slate-900/70 transition-all duration-300 hover:border-green-600"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <div className="flex items-start gap-4">

                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-green-600/20">
                      <HelpCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {faq.question}
                    </h3>

                  </div>

                  <ChevronDown
                    className={`h-6 w-6 text-green-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-green-800 px-8 py-6 text-slate-400 leading-8">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-green-600/20 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 p-10 text-center">

          <h3 className="text-3xl font-bold text-white">
           Stop Losing Leads Between Your Website and Your CRM

          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            We only take on a limited number of new builds each month to make sure every client gets our full attention — spots for this month are filling up.

          </p>

          <button
           onClick={() => setIsPopupOpen(true)} className="mt-8 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-green-600">
            Get 10% Off & Book Call Now  →
          </button>


        </div>

      </div>
    </section>
  );
}