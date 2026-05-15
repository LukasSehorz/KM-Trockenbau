"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";
import liebherrLogo from "../../../assets/logos/liebherr.svg";
import zeppelinLogo from "../../../assets/logos/zeppelin.svg";
import hiltiLogo from "../../../assets/logos/hilti.svg";
import heidelbergLogo from "../../../assets/logos/heidelberg.svg";

const certifications = [
  { label: "ISO 9001", sub: "Qualitätsmanagement" },
  { label: "SCC**", sub: "Arbeitssicherheit" },
  { label: "VOB", sub: "Vergabe & Vertragsordnung" },
  { label: "DGNB", sub: "Nachhaltiges Bauen" },
];

const partners = [
  { label: "PERI", logo: null },
  { label: "Liebherr", logo: liebherrLogo },
  { label: "Zeppelin", logo: zeppelinLogo },
  { label: "Hilti", logo: hiltiLogo },
  { label: "Knauf", logo: null },
  { label: "Heidelberg Materials", logo: heidelbergLogo },
];

const track = [...partners, ...partners];

const splitWords = (el, text) => {
  el.innerHTML = "";
  return text.split(" ").map((word, i, arr) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    if (i < arr.length - 1) wrap.style.marginRight = "0.28em";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    return inner;
  });
};

export function Layout239_1() {
  const sectionRef    = useRef(null);
  const eyebrowRef    = useRef(null);
  const headingRef    = useRef(null);
  const certStripRef  = useRef(null);
  const certCellsRef  = useRef([]);
  const partnerLabelRef = useRef(null);
  const marqueeWrapRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading reveal ─────────────────────────────────────────────────
      gsap.set(eyebrowRef.current, { y: 18, opacity: 0 });

      let headingWords = [];
      if (headingRef.current) {
        headingWords = splitWords(headingRef.current, "Qualität, die man nachweisen kann.");
        gsap.set(headingWords, { yPercent: 110 });
      }

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
      headingTl
        .to(eyebrowRef.current, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        })
        .to(headingWords, {
          yPercent: 0, duration: 1.0, ease: "expo.out",
          stagger: 0.08,
        }, "-=0.35");

      // ── Certifications strip ───────────────────────────────────────────
      // Strip itself: gold border draws in left→right via clip-path
      if (certStripRef.current) {
        gsap.set(certStripRef.current, {
          clipPath: "inset(0 100% 0 0)",
        });
        gsap.to(certStripRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: certStripRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Each certification cell: stagger reveal of content
      certCellsRef.current.forEach((cell, idx) => {
        if (!cell) return;
        const eyebrow = cell.querySelector("[data-cert-eyebrow]");
        const label   = cell.querySelector("[data-cert-label]");
        const sub     = cell.querySelector("[data-cert-sub]");
        const accent  = cell.querySelector("[data-cert-accent]");

        gsap.set([eyebrow, label, sub], { y: 24, opacity: 0 });
        gsap.set(accent, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: certStripRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          delay: 0.5 + idx * 0.12,
        });
        tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" })
          .to(label,   { y: 0, opacity: 1, duration: 0.7,  ease: "expo.out" }, "-=0.35")
          .to(sub,     { y: 0, opacity: 1, duration: 0.5,  ease: "power3.out" }, "-=0.45");

        // Hover: gold underline grows
        cell.addEventListener("mouseenter", () => {
          gsap.to(accent, { scaleX: 1, duration: 0.5, ease: "power3.out" });
          gsap.to(label,  { y: -3, color: "#D94520", duration: 0.4, ease: "power3.out" });
        });
        cell.addEventListener("mouseleave", () => {
          gsap.to(accent, { scaleX: 0, duration: 0.4, ease: "power3.in",
            transformOrigin: "right center" });
          gsap.to(label,  { y: 0, color: "#ffffff", duration: 0.4, ease: "power3.out" });
        });
      });

      // ── Partner section ────────────────────────────────────────────────
      gsap.set(partnerLabelRef.current, { x: -20, opacity: 0 });
      gsap.set(marqueeWrapRef.current, { y: 30, opacity: 0 });

      gsap.to(partnerLabelRef.current, {
        x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: partnerLabelRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(marqueeWrapRef.current, {
        y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: {
          trigger: marqueeWrapRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Marquee logos: gentle fade-up stagger on first reveal
      if (marqueeWrapRef.current) {
        const items = marqueeWrapRef.current.querySelectorAll("[data-partner]");
        gsap.from(items, {
          y: 14, opacity: 0,
          duration: 0.5, ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: marqueeWrapRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f0f0ef] py-16 md:py-24 lg:py-28 overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Heading */}
      <div className="container px-[5%] mb-12 md:mb-16">
        <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
          Zertifikate & Partner
        </p>
        <h2
          ref={headingRef}
          className="font-heading font-bold leading-tight tracking-tight text-[#D94520]"
          style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
        >
          Qualität, die man nachweisen kann.
        </h2>
      </div>

      {/* Certifications dark strip — full width */}
      <div ref={certStripRef} className="mb-16" style={{ borderTop: "2px solid #060D1F" }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ background: "#060D1F" }}
        >
          {certifications.map((c, i) => (
            <div
              key={c.label}
              ref={(el) => (certCellsRef.current[i] = el)}
              className={`group relative flex flex-col justify-between py-8 px-8 transition-colors duration-300 hover:bg-white/[0.05] cursor-default ${
                i < certifications.length - 1 ? "border-r border-white/12" : ""
              }`}
            >
              <span data-cert-eyebrow className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70">
                Zertifiziert
              </span>
              <span data-cert-label className="font-heading text-2xl font-bold text-white md:text-3xl">
                {c.label}
              </span>
              <span data-cert-sub className="mt-3 font-body text-xs text-white/55 tracking-wide">
                {c.sub}
              </span>
              <div data-cert-accent className="absolute bottom-0 left-0 h-[2px] w-full bg-white/85" />
            </div>
          ))}
        </div>
      </div>

      {/* Partner label */}
      <div className="container px-[5%] mb-6">
        <p ref={partnerLabelRef} className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#0A1628]/40">
          Partner & Lieferanten
        </p>
      </div>

      {/* Partner marquee — full width */}
      <div ref={marqueeWrapRef} className="overflow-hidden border-y border-[#0A1628]/8">
        <div className="marquee-track py-6">
          {track.map((p, i) => (
            <div
              key={i}
              data-partner
              className="flex items-center justify-center px-14"
              style={{ minWidth: "180px", height: "64px" }}
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.label}
                  style={{ maxHeight: "36px", width: "auto", maxWidth: "140px", display: "block" }}
                />
              ) : (
                <span className="font-heading text-lg font-bold text-[#D94520]/30">
                  {p.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
