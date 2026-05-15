"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const team = [
  { name: "Lukas Winter",   role: "Geschäftsführer", img: "/images/lukas-winter.png" },
  { name: "Philip Marsmann", role: "Geschäftsführer", img: "/images/philip-marsmann.png" },
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

export function Team() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Unser Team")
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

      // Per-card cinematic entrance
      cardsRef.current.filter(Boolean).forEach((card, idx) => {
        const photo = card.querySelector("[data-team-photo]");
        const img   = card.querySelector("img");
        const name  = card.querySelector("[data-team-name]");
        const role  = card.querySelector("[data-team-role]");

        gsap.set(photo, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(img,   { scale: 1.18 });
        gsap.set([name, role], { y: 14, opacity: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          delay: idx * 0.15,
          defaults: { force3D: true },
        })
          .to(photo, { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "expo.inOut" })
          .to(img,   { scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.7")
          .to(name,  { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.5")
          .to(role,  { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.35");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#FDFCF8" }}>
      <div className="container">

        {/* Heading */}
        <div className="mb-14 md:mb-18">
          <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
            Menschen bei WM Bau GmbH
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-[#D94520]"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Unser Team
          </h2>
          <p ref={subRef} className="mt-4 max-w-xl font-body text-base text-[#0A1628]/60">
            Lukas Winter und Philip Marsmann führen die WM Bau GmbH gemeinsam – mit Leidenschaft für Qualität und handwerklicher Präzision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto md:gap-12">
          {team.map((member, idx) => (
            <div
              key={member.name}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div data-team-photo className="relative mb-4 overflow-hidden w-full aspect-square rounded-2xl">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Gold bottom line on hover */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#D94520] transition-all duration-500 group-hover:w-full" />
              </div>

              {/* Info */}
              <h3 data-team-name className="font-heading text-sm font-bold text-[#D94520] md:text-base">
                {member.name}
              </h3>
              <p data-team-role className="mt-1 font-body text-xs text-[#D94520]/80">
                {member.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
