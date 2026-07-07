"use client";

import Link from "next/link";
import { usePopup } from "@/components/PopupProvider";

export default function Footer() {
  const { setIsPopupOpen } = usePopup();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Logo */}
          <div>
            <Link
              href="/"
              className="text-3xl font-bold tracking-tight"
            >
              PANDA<span className="text-[#22c55e]">eCe</span>
            </Link>

            <p className="mt-6 leading-7 text-slate-400">
              We help businesses grow with modern websites, CRM automation,
              SEO, Google Ads, Meta Ads, and complete digital growth systems
              that generate qualified leads and increase revenue.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">
              <a
                href="#servicesSection"
                className="transition hover:text-[#22c55e]"
              >
                Services
              </a>

              <a
                href="#industriesSection"
                className="transition hover:text-[#22c55e]"
              >
                Industries
              </a>

              <a
                href="#scalingArchitecture"
                className="transition hover:text-[#22c55e]"
              >
                Growth Framework
              </a>

              <a
                href="#faqSection"
                className="transition hover:text-[#22c55e]"
              >
                FAQ
              </a>

              <a
                href="#contact"
                className="transition hover:text-[#22c55e]"
              >
                Contact
              </a>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Ready to Grow?
            </h3>

            <p className="mb-6 leading-7 text-slate-400">
              Book your free strategy session and discover how our integrated
              Website Development and CRM Automation solutions can help your
              business scale faster.
            </p>

            <button
              onClick={() => setIsPopupOpen(true)}
              className="rounded-xl bg-[#22c55e] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#16a34a] hover:scale-105"
            >
              Get Free Audit
            </button>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              PANDAeCe
            </span>
            . All Rights Reserved.
          </p>

          <p>
            Website Development • CRM Automation • SEO • Google Ads • Meta Ads
          </p>
        </div>
      </div>
    </footer>
  );
}