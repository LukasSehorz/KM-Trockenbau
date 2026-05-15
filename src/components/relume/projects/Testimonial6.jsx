"use client";

import React, { useEffect, useRef } from "react";
import { BiSolidStar } from "react-icons/bi";
import { gsap } from "../../../utils/gsap";

const testimonials = [
  {
    quote: "Jedes Detail wurde sorgfältig umgesetzt, ohne Abstriche – und das Haus war pünktlich fertig, genau wie versprochen.",
    name: "Klaus Müller",
    role: "Bauherr, München",
    img: "/images/hero-aerial-construction.jpg",
  },
  {
    quote: "Wir waren skeptisch wegen der Sanierungskosten – aber die Festpreisgarantie hat uns vom ersten Tag an Sicherheit gegeben.",
    name: "Maria Hoffmann",
    role: "Eigentümerin, Augsburg",
    img: "/images/craftsmen-stone-facade.jpg",
  },
  {
    quote: "Regionales Know-how, professionelle Ausführung und ein Team, das wirklich zuhört.",
    name: "Thomas Weber",
    role: "Bauherr, Ingolstadt",
    img: "/images/villa-twilight.jpg",
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

export function Testimonial6() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Was unsere Kunden sagen")
        : [];
      gsap.set(headingWords, { yPercent: 110 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35");

      // Per-card cinematic entrance
      cardsRef.current.filter(Boolean).forEach((card, idx) => {
        const quoteMark = card.querySelector("[data-quote-mark]");
        const stars = card.querySelectorAll("[data-star]");
        const quote = card.querySelector("blockquote");
        const divider = card.querySelector("[data-card-divider]");
        const author = card.querySelector("[data-card-author]");

        gsap.set(card, { y: 48, opacity: 0, rotationX: 8, transformPerspective: 800 });
        gsap.set(quoteMark, { scale: 0.4, opacity: 0, transformOrigin: "right top" });
        gsap.set(stars, { scale: 0, opacity: 0, transformOrigin: "center center" });
        gsap.set(quote, { y: 18, opacity: 0 });
        gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(author, { y: 14, opacity: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: idx * 0.12,
          defaults: { force3D: true },
        })
          .to(card, {
            y: 0, opacity: 1, rotationX: 0, duration: 1.0, ease: "expo.out",
          })
          .to(quoteMark, {
            scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.6)",
          }, "-=0.7")
          .to(stars, {
            scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.2)", stagger: 0.06,
          }, "-=0.55")
          .to(quote, {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          }, "-=0.4")
          .to(divider, {
            scaleX: 1, duration: 0.7, ease: "expo.inOut",
          }, "-=0.5")
          .to(author, {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          }, "-=0.4");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-14 md:mb-18">
          <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#F07040]">
            Kundenstimmen
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Was unsere Kunden sagen
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-md transition-all duration-500 hover:border-[#F07040]/40"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {/* Decorative quote mark */}
              <span
                data-quote-mark
                className="absolute right-6 top-4 font-heading font-bold leading-none text-[#F07040]/10 transition-all duration-500 group-hover:text-[#F07040]/20"
                style={{ fontSize: "8rem" }}
              >
                "
              </span>

              {/* Stars */}
              <div className="mb-6 flex gap-1 text-[#F07040]">
                {[...Array(5)].map((_, i) => (
                  <BiSolidStar key={i} data-star className="size-4" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 mb-8 font-body text-base font-medium leading-relaxed text-white/90 md:text-lg">
                {t.quote}
              </blockquote>

              {/* Divider */}
              <div data-card-divider className="mb-6 h-px w-full bg-white/10" />

              {/* Author */}
              <div data-card-author className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="size-12 rounded-full object-cover ring-2 ring-[#F07040]/30"
                />
                <div>
                  <p className="font-body text-sm font-semibold text-white">{t.name}</p>
                  <p className="font-body text-xs text-white/50">{t.role}</p>
                </div>
              </div>

              {/* Bottom gold accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F07040] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
