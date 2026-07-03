"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, ctaLinks } from "@/lib/sibylle/siteData";
import { CTAButton } from "./CTAButton";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const desktopLinks = navLinks.filter(l => l.href !== "/");
  const mobileLinks = navLinks;
  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-500 ${scrolled ? "border-olive/15 bg-cream/95 shadow-[0_12px_35px_rgba(35,42,26,.08)]" : "border-olive/10 bg-cream/90"}`}
    >
      <div
        className={`container flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-[68px] md:h-[76px]" : "h-[76px] md:h-[88px]"}`}
      >
        <Link
          href="/"
          className={`focus-ring relative block w-[150px] transition-[height,width] duration-500 ${scrolled ? "h-10 md:w-[165px]" : "h-12 md:h-14 md:w-[180px]"}`}
          aria-label="Sibylle Bergold – Startseite"
        >
          <Image
            src="/assets/sibylle/brand/logo-header.png"
            alt="Sibylle Bergold"
            fill
            priority
            sizes="(min-width: 768px) 180px, 150px"
            className="object-contain object-left"
          />
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          <nav className="flex items-center gap-6">
            {desktopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring text-xs font-semibold text-deepOlive transition hover:text-softGold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CTAButton
            href={ctaLinks.secondary.href}
            variant="secondary"
            external
            className="!h-12 !px-5"
          >
            Erstgespräch
          </CTAButton>
          <CTAButton href={ctaLinks.primary.href} className="!h-12 !px-5">
            Kontakt
          </CTAButton>
        </div>
        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-olive/25 lg:hidden"
        >
          <span
            className={`h-px w-5 bg-deepOlive transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-deepOlive transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-olive/10 bg-cream lg:hidden"
          >
            <div className="container py-6">
              <nav className="grid gap-1">
                {mobileLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base text-deepOlive hover:bg-sibylleMist"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <CTAButton
                  href={ctaLinks.secondary.href}
                  variant="secondary"
                  external
                >
                  Erstgespräch
                </CTAButton>
                <CTAButton href={ctaLinks.primary.href}>Kontakt</CTAButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
