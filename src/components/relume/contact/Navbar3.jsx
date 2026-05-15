"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import React, { useState } from "react";

const navLinks = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Prozess", href: "/prozess" },
  { label: "Blog", href: "/blog" },
];

export function Navbar3() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggle = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-primary bg-background-primary/95 backdrop-blur-md">
      <div className="grid h-auto min-h-[4.5rem] grid-cols-[1fr_max-content_1fr] items-center px-[5%]">
        {/* Left: hamburger (mobile) or nav links (desktop) */}
        <div className="flex items-center">
          <button
            className="flex size-10 flex-col justify-center gap-[5px] lg:hidden"
            onClick={toggle}
            aria-label="Navigation öffnen"
          >
            <motion.span
              className="h-[1.5px] w-6 bg-text-primary origin-center block"
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.span
              className="h-[1.5px] w-6 bg-text-primary block"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="h-[1.5px] w-6 bg-text-primary origin-center block"
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </button>

          <div className="hidden lg:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-text-primary opacity-75 hover:opacity-100 hover:text-hoser-gold transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Center: logo */}
        <a href="/" className="flex items-center justify-center py-4">
          <span className="font-heading text-lg font-bold tracking-[0.12em] text-text-primary uppercase">
            WM Bau GmbH
          </span>
        </a>

        {/* Right: CTA */}
        <div className="flex items-center justify-end">
          <a
            href="/kontakt"
            className="hidden sm:inline-flex items-center gap-2 rounded-none bg-hoser-gold px-5 py-2 text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:bg-hoser-gold-light"
          >
            Beratung anfragen
          </a>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={toggle}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
              className={clsx(
                "fixed left-0 top-0 z-50 flex h-dvh w-[85%] max-w-sm flex-col",
                "bg-background-primary border-r border-border-primary shadow-xlarge px-8 pb-10"
              )}
            >
              <div className="flex items-center justify-between py-5 mb-8 border-b border-border-primary">
                <span className="font-heading text-xl font-bold tracking-[0.12em] uppercase text-text-primary">
                  WM Bau GmbH
                </span>
                <button onClick={toggle} className="size-8 flex items-center justify-center text-text-primary text-2xl leading-none">
                  ×
                </button>
              </div>
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={toggle}
                    className="py-4 text-base font-medium text-text-primary border-b border-border-primary hover:text-hoser-gold hover:pl-2 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <a
                  href="/kontakt"
                  onClick={toggle}
                  className="flex w-full items-center justify-center bg-hoser-gold px-6 py-3 text-sm font-semibold tracking-wide text-text-primary hover:bg-hoser-gold-light transition-colors duration-200"
                >
                  Beratung anfragen
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
