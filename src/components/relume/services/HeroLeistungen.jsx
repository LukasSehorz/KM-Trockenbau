"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

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

export function HeroLeistungen() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const metaRef     = useRef(null);
  const imageRef    = useRef(null);
  const overlayRef  = useRef(null);
  const sideMarkRef = useRef(null);
  const ctaRef      = useRef(null);
  const scrollRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cooldown = false;

    const onWheel = (e) => {
      if (cooldown || e.deltaY <= 0) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight * 0.4) return;
      e.preventDefault();
      cooldown = true;
      const allSections = Array.from(document.querySelectorAll("section"));
      const idx = allSections.indexOf(section);
      const next = idx >= 0 ? allSections[idx + 1] : null;
      const targetY = next
        ? next.getBoundingClientRect().top + window.scrollY
        : window.innerHeight;
      window.scrollTo(0, targetY);
      setTimeout(() => { cooldown = false; }, 600);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image: slow Ken-Burns + initial reveal
      gsap.set(imageRef.current, { scale: 1.18, filter: "brightness(0.7)" });
      gsap.set(overlayRef.current, { opacity: 1 });

      // Side mark
      gsap.set(sideMarkRef.current, { y: 30, opacity: 0 });

      // Eyebrow
      gsap.set(eyebrowRef.current, { x: -30, opacity: 0 });

      // Heading words
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Leistungen mit System.")
        : [];
      gsap.set(headingWords, { yPercent: 110 });

      // Sub paragraph
      gsap.set(subRef.current, { y: 24, opacity: 0 });

      // Meta + CTA
      gsap.set(metaRef.current?.children || [], { y: 18, opacity: 0 });
      gsap.set(ctaRef.current, { y: 18, opacity: 0 });

      // Scroll cue
      gsap.set(scrollRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { force3D: true } });

      tl.to(imageRef.current, {
          scale: 1.06,
          filter: "brightness(0.85)",
          duration: 1.6,
          ease: "power2.out",
        })
        .to(overlayRef.current, {
          opacity: 0.55,
          duration: 1.2,
          ease: "power2.out",
        }, "-=1.2")
        .to(sideMarkRef.current, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        }, "-=1.0")
        .to(eyebrowRef.current, {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        }, "-=0.8")
        .to(headingWords, {
          yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.08,
        }, "-=0.5")
        .to(subRef.current, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        }, "-=0.4")
        .to(metaRef.current?.children || [], {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08,
        }, "-=0.4")
        .to(ctaRef.current, {
          y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)",
        }, "-=0.3")
        .to(scrollRef.current, {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        }, "-=0.2");

      // Slow continuous Ken-Burns drift
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animated scroll indicator dot
      if (scrollRef.current) {
        const dot = scrollRef.current.querySelector("[data-scroll-dot]");
        if (dot) {
          gsap.to(dot, {
            y: 18,
            duration: 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#D94520] text-white"
      style={{ height: "100vh", minHeight: "720px" }}
    >
      {/* Background image */}
      <img
        ref={imageRef}
        src="/images/leistungen-hero.jpg"
        alt="WM Bau GmbH – Leistungen"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ willChange: "transform, filter" }}
      />

      {/* Layered overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,42,107,0.65) 0%, rgba(14,42,107,0.4) 35%, rgba(7,25,74,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.07) 0%, transparent 55%)",
        }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
           style={{
             backgroundImage:
               "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
             backgroundSize: "120px 120px",
           }}
      />

      {/* Vertical side mark removed — collided with the oversized heading. */}

      {/* Top-right meta strip */}
      <div className="absolute top-24 right-[5%] hidden lg:flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.3em] text-white/70">
        <span className="h-px w-10 bg-white/55" />
        <span>Bauunternehmung</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-[5%] pb-20 md:pb-28">
        <div className="max-w-[1400px]">
          <p
            ref={eyebrowRef}
            className="mb-6 font-body text-sm font-semibold uppercase tracking-[0.4em] text-white/85 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-white/65" />
            Leistungen
          </p>

          <h1
            ref={headingRef}
            className="font-heading font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
          >
            Leistungen mit System.
          </h1>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-end">
            <p
              ref={subRef}
              className="md:col-span-6 lg:col-span-5 font-body text-base md:text-lg leading-relaxed text-white/75 max-w-xl"
            >
              Ein Ansprechpartner. Vom ersten Spatenstich bis zur
              schlüsselfertigen Übergabe – wir verbinden traditionelles Handwerk
              mit modernster Bautechnik.
            </p>

            <div
              ref={metaRef}
              className="md:col-span-3 lg:col-span-3 flex md:flex-col gap-8 md:gap-2"
            >
              <div>
                <span className="block font-body text-[11px] uppercase tracking-[0.28em] text-white/65 mb-1">
                  Standort
                </span>
                <span className="font-heading text-lg font-semibold text-white">
                  Dorfen · Erding
                </span>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-4 flex md:justify-end">
              <a
                ref={ctaRef}
                href="#leistungen"
                className="group inline-flex items-center gap-3 border border-white/45 hover:bg-[#D94520] hover:border-[#D94520] px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300"
              >
                <span>Gewerke entdecken</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
          Scroll
        </span>
        <div className="relative h-12 w-px bg-white/15 overflow-hidden">
          <span data-scroll-dot className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-px bg-hoser-gold" />
        </div>
      </div>
    </section>
  );
}
