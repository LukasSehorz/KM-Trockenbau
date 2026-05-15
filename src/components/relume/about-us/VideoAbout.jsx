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

export function VideoAbout() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef   = useRef(null);
  const paraRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Drei Generationen. Eine Überzeugung.")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(videoWrapRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(videoRef.current, { scale: 1.18 });
      gsap.set(paraRef.current, { y: 24, opacity: 0 });

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
        .to(videoWrapRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "expo.inOut" }, "-=0.5")
        .to(videoRef.current, { scale: 1, duration: 1.6, ease: "power3.out" }, "-=1.1")
        .to(paraRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.8");

      // Subtle parallax on video during scroll
      gsap.to(videoRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background-secondary px-[5%] py-16 md:py-24">
      <div className="container max-w-3xl mx-auto">

        {/* Text above */}
        <div className="mb-8 md:mb-10">
          <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            2020 bis heute
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0A1628" }}
          >
            Drei Generationen. Eine Überzeugung.
          </h2>
        </div>

        {/* Video */}
        <div ref={videoWrapRef} className="overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/video7.mp4"
            autoPlay
            muted
            playsInline
            className="w-full object-cover"
            style={{ willChange: "transform" }}
          />
        </div>

        {/* Text below */}
        <p ref={paraRef} className="mt-6 font-body text-base leading-relaxed text-[#0A1628]/60 md:text-lg max-w-xl">
          Was 2020 mit klaren Werten begann, trägt WM Bau GmbH heute
          über 60 Fachkräfte weiter. Die Werte haben sich nicht verändert –
          nur die Möglichkeiten, sie umzusetzen.
        </p>

      </div>
    </section>
  );
}
