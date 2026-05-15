"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const photos = [
  {
    src: "/images/hero-aerial-construction.jpg",
    caption: "Luftaufnahme einer aktiven Baustelle – präzise Koordination aller Gewerke von Beginn an.",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/Beispiel-Projekte/Vor%20Ort%201.jpg",
    caption: "Gerüstbau für sichere und effiziente Arbeiten auf jeder Baustelle.",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/Beispiel-Projekte/Vor%20Ort%202.jpg",
    caption: "Referenzprojekte aus dem Raum Erding und München – realisiert mit eigenem Fachpersonal.",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/Beispiel-Projekte/Vor%20Ort%203.jpg",
    caption: "Solider Rohbau als Basis für alle Folgegewerke – präzise und termingerecht.",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/bild13.jpg",
    caption: "Fertigstellung und Übergabe – pünktlich, im Budgetrahmen, mit Festpreisgarantie.",
    span: "col-span-1 row-span-1",
  },
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

export function Gallery22() {
  const [hovered, setHovered] = useState(null);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const cellsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Einblicke vor Ort")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(subRef.current, { y: 18, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5");

      // Per-cell clip-path reveal + image scale-down + subtle parallax
      cellsRef.current.filter(Boolean).forEach((cell, idx) => {
        const img = cell.querySelector("img");

        gsap.set(cell, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(img, { scale: 1.25 });

        gsap.timeline({
          scrollTrigger: {
            trigger: cell,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          delay: idx * 0.1,
        })
          .to(cell, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: "expo.inOut",
          })
          .to(img, {
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          }, "-=0.9");

        // Subtle parallax during scroll
        gsap.to(img, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: cell,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#F07040]">
            Einblicke
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Einblicke vor Ort
          </h2>
          <p ref={subRef} className="mt-4 font-body text-base text-white/60">
            Jedes Projekt erzählt von bayerischer Präzision und Verlässlichkeit.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 280px)",
          }}
        >
          {photos.map((p, i) => (
            <div
              key={i}
              ref={(el) => (cellsRef.current[i] = el)}
              className={`relative overflow-hidden cursor-pointer ${p.span}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={p.src}
                alt={p.caption}
                className="h-full w-full object-cover transition-transform duration-700"
                style={{ transform: hovered === i ? "scale(1.06)" : "scale(1)", willChange: "transform" }}
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-400"
                style={{
                  background: hovered === i
                    ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
                }}
              >
                {/* Gold line + caption */}
                <div
                  className="transition-all duration-500"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  <div className="mb-3 h-[2px] w-8 bg-[#F07040]" />
                  <p className="font-body text-sm leading-relaxed text-white/90 md:text-base">
                    {p.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
