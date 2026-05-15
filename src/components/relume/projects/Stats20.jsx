"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const stats = [
  { value: 57,  suffix: "",  label: "Abgeschlossene\nProjekte" },
  { value: 98,  suffix: "%", label: "Pünktliche\nFertigstellung" },
  { value: 96,  suffix: "%", label: "Im\nBudgetrahmen" },
  { value: 30,  suffix: "+", label: "Jahre\nin der Region" },
];

const splitWords = (el, text) => {
  el.innerHTML = "";
  return text.split(" ").map((word, i, arr) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.paddingBottom = "0.08em";
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

export function Stats20() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const cellsRef   = useRef([]);
  const ctaRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Ergebnisse, die für sich sprechen")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(subRef.current, { y: 18, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5");

      // Per-cell animation: number counts up, gold line wipes, label fades in
      cellsRef.current.filter(Boolean).forEach((cell, idx) => {
        const valueEl = cell.querySelector("[data-stat-value]");
        const lineEl  = cell.querySelector("[data-stat-line]");
        const labelEl = cell.querySelector("[data-stat-label]");
        const target  = stats[idx].value;
        const suffix  = stats[idx].suffix;

        gsap.set(valueEl, { y: 30, opacity: 0 });
        gsap.set(lineEl, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(labelEl, { y: 14, opacity: 0 });

        const counter = { v: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cell,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: idx * 0.08,
        });

        tl.to(valueEl, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
          .to(counter, {
            v: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              if (valueEl) valueEl.textContent = Math.round(counter.v) + suffix;
            },
          }, "-=0.4")
          .to(lineEl, { scaleX: 1, duration: 0.8, ease: "expo.inOut" }, "-=1.0")
          .to(labelEl, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.7");
      });

      // CTA
      gsap.set(ctaRef.current, { y: 18, opacity: 0 });
      gsap.to(ctaRef.current, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-28">

      {/* Heading */}
      <div className="container px-[5%] mb-16">
        <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#F07040]">
          Zahlen & Fakten
        </p>
        <h2
          ref={headingRef}
          className="font-heading font-bold leading-tight tracking-tight text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
        >
          Ergebnisse, die für sich sprechen
        </h2>
        <p ref={subRef} className="mt-4 max-w-xl font-body text-base text-white/60">
          Seit 2020 in der Region Dorfen & Erding. Projekte für Generationen. Ein Name.
        </p>
      </div>

      {/* Full-width stats strip */}
      <div className="border-y border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => (cellsRef.current[i] = el)}
              className={`group px-10 py-12 transition-colors duration-300 hover:bg-white/5 ${
                i < stats.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <p
                data-stat-value
                className="font-heading font-bold leading-none text-white transition-colors duration-300 group-hover:text-[#F07040]"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                0{s.suffix}
              </p>
              <div data-stat-line className="mt-4 h-px w-8 bg-[#F07040]/50 transition-all duration-300 group-hover:w-16 group-hover:bg-[#F07040]" />
              <p data-stat-label className="mt-3 whitespace-pre-line font-body text-sm leading-relaxed text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container px-[5%] mt-10">
        <a
          ref={ctaRef}
          href="#projekte"
          className="inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 hover:text-[#F07040]"
        >
          Projekte entdecken <span className="text-[#F07040]">→</span>
        </a>
      </div>

    </section>
  );
}
