"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

export function ProzessCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".cta-bg",          { scale: 1.08, duration: 2.0, ease: "power2.out" }, 0)
        .from(".cta-line",        { scaleX: 0, transformOrigin: "left center", duration: 0.7 }, 0.1)
        .from(".cta-num",         { y: 22, opacity: 0, duration: 0.55, ease: "power2.out" }, 0.18)
        .from(".cta-eyebrow",     { y: "120%", duration: 0.6 }, 0.28)
        .from(".cta-title-line",  { y: "115%", stagger: 0.14, duration: 0.95 }, 0.36)
        .from(".cta-sub",         { y: 22, opacity: 0, duration: 0.7, ease: "power2.out" }, 1.05)
        .from(".cta-btn",         { y: 18, opacity: 0, stagger: 0.1, duration: 0.55, ease: "power2.out" }, 1.2)
        .from(".cta-meta",        { y: 14, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }, 1.4);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: "#D94520" }}
    >
      {/* Background photo */}
      <img
        src="/images/prozess/step5.png"
        alt=""
        aria-hidden="true"
        className="cta-bg absolute inset-0 h-full w-full object-cover object-center"
        style={{ willChange: "transform", opacity: 0.42 }}
      />

      {/* Gradient overlay (heavy on the left where text sits) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(4,10,22,0.98) 0%, rgba(4,10,22,0.86) 38%, rgba(4,10,22,0.55) 78%, rgba(4,10,22,0.4) 100%)",
        }}
      />

      {/* Soft gold glow top-right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-15vh", right: "-10vw",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid texture (matches ProzessPath) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Vertical accent line on the right */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          right: "6vw", top: "10%", bottom: "10%",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45), transparent)",
        }}
      />

      {/* Giant "06" watermark — completes the 1–5 step sequence */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          right: "8.5vw", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "Syne, sans-serif", fontWeight: 900,
          fontSize: "clamp(10rem, 22vw, 24rem)",
          color: "rgba(255,255,255,0.06)",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 1,
        }}
      >
        06
      </div>

      {/* Content */}
      <div className="relative z-10 px-[6%] py-32 md:py-36 lg:py-40 w-full md:max-w-[68%] lg:max-w-[58%]">
        {/* "06 — Der nächste Schritt" eyebrow */}
        <div className="mb-12 flex items-center gap-4">
          <span className="cta-line block h-px w-10 flex-shrink-0 bg-white" />
          <span className="cta-num inline-block font-body text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white">
            06 — Der nächste Schritt
          </span>
        </div>

        <div style={{ overflow: "hidden" }} className="mb-5">
          <p className="cta-eyebrow font-body text-xs uppercase tracking-[0.28em] text-white/45">
            Bereit anzufangen?
          </p>
        </div>

        {/* Heading */}
        <h2
          className="font-heading font-bold tracking-tight text-white mb-10"
          style={{ fontSize: "clamp(2.4rem, 5.2vw, 5.6rem)", lineHeight: 1.04 }}
        >
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="cta-title-line block">Ihr Projekt.</span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="cta-title-line block">
              Ein <span className="text-white">Gespräch</span>
            </span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="cta-title-line block">entfernt.</span>
          </span>
        </h2>

        <p className="cta-sub max-w-[460px] font-body text-base leading-relaxed text-white/55 md:text-lg mb-12">
          Egal ob Neubau, Sanierung oder Umbau – wir starten mit einem
          unverbindlichen Erstgespräch bei Ihnen vor Ort. Kostenfrei und
          ohne weitere Verpflichtung.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mb-16">
          {/* Primary */}
          <a
            href="#kontakt"
            className="cta-btn group relative inline-flex items-center gap-4 overflow-hidden px-8 py-[18px] font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            style={{ background: "#FFFFFF", color: "#D94520" }}
          >
            <span className="relative z-10">Erstgespräch vereinbaren</span>
            <svg
              className="relative z-10 h-3 w-3 transition-transform duration-500 group-hover:translate-x-1.5"
              viewBox="0 0 16 16" fill="none" aria-hidden="true"
            >
              <path
                d="M2 8 h12 M9 3 l5 5 l-5 5"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            {/* Sweep on hover */}
            <span
              className="absolute inset-0 -translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
              style={{ background: "rgba(7,25,74,0.30)" }}
              aria-hidden="true"
            />
          </a>

          {/* Secondary: phone link */}
          <a
            href="tel:+498912345678"
            className="cta-btn group inline-flex items-center gap-4 font-body text-[0.7rem] uppercase tracking-[0.22em] text-white/65 transition-colors hover:text-white"
          >
            <span>Direkt anrufen</span>
            <span className="block h-px w-6 transition-all duration-500 group-hover:w-12 bg-white/25 group-hover:bg-white" />
            <span
              className="text-sm font-semibold tracking-[0.05em] text-white/85"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              +49 89 1234 5678
            </span>
          </a>
        </div>

        {/* Meta row */}
        <div
          className="flex flex-wrap gap-x-14 gap-y-5 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="cta-meta">
            <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-2">
              Kontakt
            </p>
            <p className="font-body text-sm text-white/85">info@hoser-bau.de</p>
          </div>
          <div className="cta-meta">
            <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-2">
              Standort
            </p>
            <p className="font-body text-sm text-white/85">München · Bayern</p>
          </div>
          <div className="cta-meta">
            <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-2">
              Beratung
            </p>
            <p className="font-body text-sm text-white/85">Mo – Fr · 8 – 18 Uhr</p>
          </div>
          <div className="cta-meta">
            <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-2">
              Antwortzeit
            </p>
            <p className="font-body text-sm text-white/85">Innerhalb von 24h</p>
          </div>
        </div>
      </div>
    </section>
  );
}
