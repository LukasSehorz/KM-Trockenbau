"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    title: "Die Gründung",
    desc: "Lukas Winter und Philip Marsmann gründen die WM Bau GmbH in Dorfen. Von Anfang an stehen Qualität, Verlässlichkeit und persönliche Betreuung im Mittelpunkt.",
    detail: "Was in Dorfen im Landkreis Erding begann, legte den Grundstein für ein modernes, leistungsstarkes Bauunternehmen in der Region.",
    img: "/images/timeline/gruendung.jpg",
  },
  {
    year: "2021",
    title: "Erste Projekte",
    desc: "Das Team wächst und erste Referenzprojekte entstehen – von Rohbau über Sanierung bis hin zu schlüsselfertigen Bauprojekten in der Region.",
    detail: "Mit eigenem Fachpersonal und moderner Ausstattung übernimmt WM Bau GmbH Projekte termingerecht und auf höchstem handwerklichen Niveau.",
    img: "/images/timeline/erste-projekte.jpg",
  },
  {
    year: "2022",
    title: "Wachstum & Ausbau",
    desc: "Erweiterung des Leistungsspektrums und des Fuhrparks. WM Bau GmbH etabliert sich als zuverlässiger Partner für Privat- und Gewerbekunden.",
    detail: "Das Betriebsgelände in Breitenloh 1, Dorfen, bietet optimale Voraussetzungen für Fuhrpark, Maschinen und Lager – eine solide Basis für alle Gewerke.",
    img: "/images/timeline/wachstum.jpg",
  },
  {
    year: "Heute",
    title: "Etabliert in der Region",
    desc: "WM Bau GmbH steht für bayerisches Handwerk auf höchstem Niveau – mit einem erfahrenen Team und einem breiten Leistungsspektrum aus einer Hand.",
    detail: "Von schlüsselfertigem Wohnungsbau über Rohbau und Renovierung bis zu Tiefbau, Gerüst und Transporten – zuverlässig und persönlich für Bauherren in der Region.",
    img: "/images/timeline/heute.jpg",
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

export function Geschichte() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading intro: eyebrow + word-reveal heading + subtitle ────────
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Unsere Geschichte")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(subRef.current, { y: 22, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");

      // Gold thread grows from top to bottom as timeline scrolls into view
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        }
      );

      // Each dot pops in when the line reaches it
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Each milestone card slides in from the right + image clip-path wipe
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector("[data-milestone-img]");
        const innerImg = img?.querySelector("img");

        gsap.fromTo(
          card,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (img) {
          gsap.set(img, { clipPath: "inset(0 0 100% 0)" });
          gsap.set(innerImg, { scale: 1.2 });

          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          })
            .to(img, { clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "expo.inOut" }, 0.2)
            .to(innerImg, { scale: 1, duration: 1.3, ease: "power3.out" }, 0.3);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden" style={{ backgroundColor: "#FDFCF8" }}>

      {/* Top third — image background with heading */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/geschichte-mauerwerk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(240,240,239,0.82) 0%, rgba(240,240,239,0.92) 60%, rgba(240,240,239,1) 100%)",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
              Seit 2020
            </p>
            <h2
              ref={headingRef}
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#D94520]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Unsere Geschichte
            </h2>
            <p ref={subRef} className="font-body text-base leading-relaxed text-[#0A1628]/55">
              Gegründet 2020 in Dorfen.<br />Ein Anspruch: Projekte für Generationen.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom two thirds — timeline on plain background */}
      <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">

          {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Red thread — full height, grows with scroll */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "18px",
              width: "12px",
              background: "linear-gradient(to right, rgba(14,42,107,0.18) 0%, #DDDED8 30%, #E5E4DC 50%, #DDDED8 70%, rgba(14,42,107,0.12) 100%)",
              borderRadius: "6px",
            }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                borderRadius: "6px",
                background: "linear-gradient(to right, rgba(158,48,14,0.8) 0%, #D94520 25%, #E57040 50%, #D94520 75%, rgba(158,48,14,0.8) 100%)",
                boxShadow: "2px 0 8px rgba(14,42,107,0.45), -1px 0 4px rgba(0,0,0,0.15)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Milestones */}
          <div>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative grid grid-cols-[48px_1fr] pb-14 last:pb-0"
              >
                {/* Dot on the thread — 3D sphere */}
                <div className="flex justify-center pt-2 z-10">
                  <div
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 32%, #F07040, #D94520 48%, #9E300E 100%)",
                      boxShadow: "0 0 0 3px #f0f0ef, 0 0 0 5px rgba(14,42,107,0.5), 2px 3px 8px rgba(0,0,0,0.3)",
                      opacity: 0,
                      transform: "scale(0)",
                    }}
                  />
                </div>

                {/* Milestone content */}
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="pl-8 md:pl-12 grid gap-8 md:grid-cols-[1fr_280px] md:gap-10 md:items-start"
                  style={{ opacity: 0 }}
                >
                  <div>
                    {/* Year + number */}
                    <div className="flex items-baseline gap-4 mb-3">
                      <span
                        className="font-heading font-bold leading-none text-[#D94520]/[0.07] select-none"
                        style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
                      >
                        {m.year}
                      </span>
                      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D94520]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mb-3 font-heading text-2xl font-bold text-[#D94520] md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="mb-2 font-body text-base leading-relaxed text-[#0A1628]/65 max-w-2xl">
                      {m.desc}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-[#0A1628]/40 max-w-xl">
                      {m.detail}
                    </p>
                  </div>

                  {/* Milestone image */}
                  <div data-milestone-img className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
                    <img
                      src={m.img}
                      alt={m.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-4 font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85">
                      {m.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          </div>{/* end timeline relative */}
        </div>{/* end container */}
      </div>{/* end bottom section */}
    </section>
  );
}
