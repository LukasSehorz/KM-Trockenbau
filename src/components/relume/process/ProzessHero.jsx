"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

export function ProzessHero() {
  const sectionRef = useRef(null);

  const handleScrollToProzess = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (next && typeof next.scrollIntoView === "function") {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prozess-hero-bg",     { scale: 1.06, duration: 2.8, ease: "power1.out" });
      gsap.from(".prozess-hero-line",   { scaleX: 0, transformOrigin: "left center", duration: 0.8, delay: 0.3, ease: "power3.out" });
      gsap.from(".prozess-hero-eyebrow",{ y: "120%", duration: 0.65, delay: 0.55, ease: "power3.out" });
      gsap.from(".prozess-hero-title span", { y: "110%", stagger: 0.12, duration: 1.0, delay: 0.75, ease: "power3.out" });
      gsap.from(".prozess-hero-sub",    { y: 24, opacity: 0, duration: 0.8, delay: 1.4, ease: "power2.out" });
      gsap.from(".prozess-hero-cta",    { y: 18, opacity: 0, duration: 0.7, delay: 1.7, ease: "power2.out" });
      gsap.from(".prozess-hero-scroll", { opacity: 0, x: -16, duration: 0.6, delay: 2.0, ease: "power2.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex items-start">
      {/* Inline keyframes for the scroll-dot */}
      <style>{`
        @keyframes prozess-hero-dot-move {
          0%   { transform: translateY(-16px); opacity: 0; }
          18%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translateY(64px); opacity: 0; }
        }
        .prozess-hero-dot {
          animation: prozess-hero-dot-move 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>

      {/* Background image */}
      <img
        src="/images/prozess-hero.jpg"
        alt="WM Bau GmbH – Prozess"
        className="prozess-hero-bg absolute inset-0 h-full w-full object-cover object-center"
        style={{ willChange: "transform" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(4,13,28,0.95) 0%, rgba(4,13,28,0.82) 40%, rgba(4,13,28,0.50) 70%, rgba(4,13,28,0.18) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-[6%] pt-32 pb-24 md:pt-36 lg:pt-44 md:max-w-[55%] lg:max-w-[50%]">
        <div className="mb-10 flex items-center gap-4">
          <span className="prozess-hero-line h-px w-10 flex-shrink-0 bg-hoser-gold" />
          <div style={{ overflow: "hidden" }}>
            <p className="prozess-hero-eyebrow font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Unser Weg · Von der Idee bis zur Übergabe
            </p>
          </div>
        </div>

        <h1
          className="prozess-hero-title mb-10 font-heading font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 5.5vw, 6rem)", lineHeight: 1.04 }}
        >
          {["Ihr Projekt.", "Unser Prozess."].map((line, i) => (
            <span key={i} className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="prozess-hero-sub max-w-[400px] font-body text-base leading-relaxed text-white/55 md:text-lg">
          Fünf klar definierte Schritte. Festpreise, Termintreue und volle
          Transparenz – von der ersten Beratung bis zur Schlüsselübergabe.
        </p>

        {/* CTA (mobile / tablet — desktop CTA lives next to the scroll indicator) */}
        <button
          type="button"
          onClick={handleScrollToProzess}
          className="prozess-hero-cta group mt-10 flex items-center gap-5 cursor-pointer focus:outline-none lg:hidden"
          aria-label="Zum Prozess scrollen"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-colors duration-500 group-hover:border-hoser-gold">
            {/* Hover ring */}
            <span
              className="absolute inset-0 rounded-full border border-hoser-gold opacity-0 scale-125 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
              aria-hidden="true"
            />
            <svg
              className="h-4 w-4 text-white/80 transition-all duration-500 group-hover:text-hoser-gold group-hover:translate-y-0.5"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 2 v12 M3 9 l5 5 l5 -5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-left">
            <span className="block font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-hoser-gold">
              Prozess entdecken
            </span>
            <span className="mt-1 block font-body text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
              5 Schritte · 1 Versprechen
            </span>
          </span>
        </button>
      </div>

      {/* Bottom-left: Scrollen indicator + desktop CTA, CTA vertically centered with the "Scrollen" text */}
      <div className="absolute bottom-12 left-[6%] z-10 hidden lg:block">
        {/* Row 1: Scrollen vertical text + CTA, items-center keeps them vertically centered */}
        <div className="flex items-center gap-5">
          <span
            className="prozess-hero-scroll block font-body text-[0.6rem] uppercase tracking-[0.4em] text-white/60"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Scrollen
          </span>

          <button
            type="button"
            onClick={handleScrollToProzess}
            className="prozess-hero-cta group flex items-center gap-5 cursor-pointer focus:outline-none"
            aria-label="Zum Prozess scrollen"
          >
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-colors duration-500 group-hover:border-hoser-gold">
              <span
                className="absolute inset-0 rounded-full border border-hoser-gold opacity-0 scale-125 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
                aria-hidden="true"
              />
              <svg
                className="h-4 w-4 text-white/80 transition-all duration-500 group-hover:text-hoser-gold group-hover:translate-y-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 2 v12 M3 9 l5 5 l5 -5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-left">
              <span className="block font-body text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#F07040]">
                Prozess entdecken
              </span>
              <span className="mt-1 block font-body text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
                5 Schritte · 1 Versprechen
              </span>
            </span>
          </button>
        </div>

        {/* Row 2: animated line+dot below the Scrollen text */}
        <span className="prozess-hero-scroll relative mt-4 ml-[3px] block h-16 w-px bg-white/35 overflow-hidden">
          <span className="prozess-hero-dot absolute left-0 top-0 block w-px h-4 bg-hoser-gold" />
        </span>
      </div>
    </section>
  );
}
