"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const kalac = {
  num: "01",
  name: "Kalac Mujo & XXX",
  title: "Inhaber",
  role: "Trockenbau & Innenausbau",
  image: "/images/geschaeftsfuehrer.png",
  email: "info-kalac-trockenbau@web.de",
  bio: "Kalac Mujo führt K.M. Trockenbau mit Leidenschaft für Qualität und handwerklicher Präzision. Langjährige Erfahrung im Innenausbau und kontinuierliche Weiterbildung machen ihn zu Ihrem zuverlässigen Ansprechpartner in Regensburg.",
  facts: [
    { label: "Unternehmen", value: "K.M. Trockenbau" },
    { label: "Schwerpunkt", value: "Trockenbau & Innenausbau" },
    { label: "Standort", value: "Siegfriedstrasse 3, 93051 Regensburg" },
  ],
};

const ACCENT = "#7BBFB8";
const DARK = "#0D2020";

export function TeamSection() {
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const nameRef      = useRef(null);
  const subtitleRef  = useRef(null);
  const dividerRef   = useRef(null);
  const bioRef       = useRef(null);
  const factsRef     = useRef([]);
  const emailRef     = useRef(null);
  const imageRef     = useRef(null);
  const borderRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial hidden states ────────────────────────────────────────────
      gsap.set(eyebrowRef.current,  { x: -32, opacity: 0 });
      gsap.set(nameRef.current,     { y: 48,  opacity: 0 });
      gsap.set(subtitleRef.current, { x: -24, opacity: 0 });
      gsap.set(dividerRef.current,  { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bioRef.current,      { y: 28,  opacity: 0 });
      gsap.set(factsRef.current.filter(Boolean), { x: -28, opacity: 0 });
      gsap.set(emailRef.current,    { y: 18,  opacity: 0 });
      gsap.set(imageRef.current,    { x: 60,  opacity: 0 });
      gsap.set(borderRef.current,   { scaleY: 0, transformOrigin: "top center" });

      // ── Master timeline ─────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl
        // Border line draws down
        .to(borderRef.current, { scaleY: 1, duration: 1.2, ease: "expo.inOut" }, 0)

        // Eyebrow slides in
        .to(eyebrowRef.current, { x: 0, opacity: 1, duration: 0.65 }, 0.15)

        // Name rises up
        .to(nameRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }, 0.32)

        // Subtitle
        .to(subtitleRef.current, { x: 0, opacity: 1, duration: 0.6 }, 0.52)

        // Divider line grows
        .to(dividerRef.current, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 0.65)

        // Bio fades up
        .to(bioRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0.78)

        // Facts stagger in
        .to(factsRef.current.filter(Boolean), {
          x: 0, opacity: 1, duration: 0.55, stagger: 0.1,
        }, 0.9)

        // Email
        .to(emailRef.current, { y: 0, opacity: 1, duration: 0.5 }, 1.2)

        // Image panel slides in from right
        .to(imageRef.current, { x: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 0.25);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "100vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex"
        style={{ backgroundColor: DARK }}
      >
        {/* Text links */}
        <div className="flex h-full w-1/2 flex-col justify-center px-12 md:px-16 lg:px-20">
          <p
            ref={eyebrowRef}
            className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            {kalac.role}
          </p>
          <h2
            ref={nameRef}
            className="mb-2 font-heading font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
          >
            {kalac.name}
          </h2>
          <p
            ref={subtitleRef}
            className="mb-8 font-body text-sm uppercase tracking-[0.15em] text-white/40"
          >
            {kalac.title} · K.M. Trockenbau
          </p>
          <div
            ref={dividerRef}
            className="mb-8 h-px w-12"
            style={{ backgroundColor: `${ACCENT}80` }}
          />
          <p
            ref={bioRef}
            className="mb-10 max-w-md font-body text-sm leading-relaxed text-white/55 md:text-base"
          >
            {kalac.bio}
          </p>
          <div className="mb-10 space-y-4">
            {kalac.facts.map((f, i) => (
              <div
                key={f.label}
                ref={(el) => (factsRef.current[i] = el)}
                className="flex items-baseline gap-4"
              >
                <span
                  className="w-28 shrink-0 font-body text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: `${ACCENT}B0` }}
                >
                  {f.label}
                </span>
                <span className="font-body text-sm text-white/70">{f.value}</span>
              </div>
            ))}
          </div>
          <a
            ref={emailRef}
            href={`mailto:${kalac.email}`}
            className="inline-flex items-center gap-2 font-body text-xs text-white/30 transition-colors duration-200 hover:text-white"
          >
            {kalac.email}
          </a>
        </div>

        {/* Orange divider */}
        <div
          ref={borderRef}
          className="w-px flex-shrink-0"
          style={{ backgroundColor: "#D94520" }}
        />

        {/* Bild rechts */}
        <div ref={imageRef} className="flex h-full w-1/2 overflow-hidden">
          <img
            src={kalac.image}
            alt={kalac.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 10%" }}
          />
        </div>
      </div>
    </div>
  );
}
