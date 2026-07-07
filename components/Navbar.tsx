"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import { Menu, X } from "lucide-react";
import { usePopup } from "@/components/PopupProvider";


export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { setIsPopupOpen } = usePopup();

  const closeMenu = () => setMobileMenu(false);

  const navLinks = [
    { name: "Services", href: "#servicesSection" },
    { name: "Industries", href: "#industriesSection" },
    { name: "Architecture", href: "#scalingArchitecture" },
    { name: "FAQ", href: "#faqSection" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/80 shadow-sm backdrop-blur-lg dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}

<Link href="/" className="flex items-center gap-3">
  {/* Circular Logo */}
  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-green-600">
    <Image
      src="/pnew.png"
      alt="PANDAeCe Logo"
      fill
      priority
      className="object-cover"
    />
  </div>

  {/* Brand Name */}
  <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
    PANDA<span className="text-[#22c55e]">eCe</span>
  </span>
</Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-700 transition hover:text-[#22c55e] dark:text-zinc-200"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={() => setIsPopupOpen(true)}
            className="rounded-full bg-[#22c55e] px-6 py-2.5 font-medium text-white transition duration-300 hover:bg-[#16a34a] hover:shadow-lg"
          >
            Get Free Audit
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenu ? (
            <X className="h-7 w-7 text-black dark:text-white" />
          ) : (
            <Menu className="h-7 w-7 text-black dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileMenu ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-5 p-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-base font-medium text-zinc-700 transition hover:text-[#22c55e] dark:text-zinc-200"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                closeMenu();
                setIsPopupOpen(true);
              }}
              className="mt-2 rounded-xl bg-[#22c55e] py-3 font-medium text-white transition duration-300 hover:bg-[#16a34a]"
            >
              Get Free Audit
            </button>
          </div>
        </div>
      </div> 

      {/* Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  );
}