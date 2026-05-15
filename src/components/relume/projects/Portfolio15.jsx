"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

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

const PLACEHOLDER = "/images/placeholder.svg";

const projects = [
  {
    id: "01",
    title: "Wohnanlage München/Trudering",
    category: "Wohnungsbau",
    desc: "Neubau einer Wohnanlage mit 97 Wohneinheiten und Tiefgarage",
    location: "München / Trudering",
    img: "/images/Beispiel-Projekte/LP1.jpg",
    detail: "Im Münchner Stadtteil Trudering realisierte WM Bau GmbH eine moderne Wohnanlage mit 97 Wohneinheiten sowie einer Tiefgarage. Das Projekt umfasste alle Rohbau- und Ausbauarbeiten und wurde termingerecht und im vereinbarten Kostenrahmen übergeben. Die Anlage überzeugt durch ihre durchdachte Grundrissplanung und hochwertige Ausstattung.",
    images: ["/images/Beispiel-Projekte/LP1.jpg", PLACEHOLDER, PLACEHOLDER],
  },
  {
    id: "02",
    title: "Wohnpark Haydn, Dorfen",
    category: "Wohnungsbau",
    desc: "Neubau eines Wohnparks mit 56 Wohneinheiten und Tiefgarage",
    location: "Dorfen",
    img: "/images/Beispiel-Projekte/LP2.jpg",
    detail: "In Dorfen entstand der Wohnpark Haydn mit 56 modernen Wohneinheiten und einer Tiefgarage. WM Bau GmbH übernahm die schlüsselfertige Realisierung des gesamten Projekts – von der Rohbauphase bis zur Fertigstellung. Die Anlage vereint zeitgemäße Architektur mit einer nachhaltigen Bauweise und einem hohen Wohnkomfort.",
    images: ["/images/Beispiel-Projekte/LP2.jpg", PLACEHOLDER, PLACEHOLDER],
  },
  {
    id: "03",
    title: "Einfamilienhaus, Dorfen",
    category: "Wohnbau",
    desc: "Schlüsselfertiger Neubau eines Einfamilienhauses",
    location: "Dorfen",
    img: "/images/projekt-03.png",
    detail: "Für eine Privatfamilie in Dorfen realisierte WM Bau GmbH ein schlüsselfertiges Einfamilienhaus mit durchdachter Grundrissplanung und hochwertigen Materialien. Das klare, moderne Erscheinungsbild wurde in enger Zusammenarbeit mit dem Bauherrn entwickelt. Alle Gewerke wurden termingerecht und im vereinbarten Kostenrahmen abgeschlossen.",
    images: ["/images/projekt-03.png", PLACEHOLDER, PLACEHOLDER],
  },
  {
    id: "04",
    title: "Einfamilienhaus Dorfen",
    category: "Wohnbau",
    desc: "Schlüsselfertiger Neubau eines Einfamilienhauses mit Carport",
    location: "Dorfen",
    img: "/images/bild-wohnhaus.jpg",
    detail: "Für eine Privatfamilie in Dorfen realisierte WM Bau GmbH ein schlüsselfertiges Einfamilienhaus mit Keller, Carport und Gartengestaltung. Das klare, moderne Erscheinungsbild mit hochwertigen Materialien und durchdachter Grundrissplanung wurde in enger Zusammenarbeit mit dem Bauherrn entwickelt.",
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
  },
  {
    id: "05",
    title: "Sanierung Bauernhof Buch",
    category: "Sanierung",
    desc: "Kernsanierung und Modernisierung eines denkmalgeschützten Bauernhofs",
    location: "Buch am Buchrain",
    img: "/images/bild-bauernhof.jpg",
    detail: "In Buch am Buchrain sanierte WM Bau GmbH einen historischen Bauernhof unter denkmalschutzrechtlichen Auflagen. Neue Fenster, Dämmung, Haustechnik und Fassade wurden behutsam integriert, ohne den traditionellen Charakter des Gebäudes zu beeinträchtigen. Ein anspruchsvolles Projekt, das Handwerkskunst und moderne Bautechnik vereint.",
    images: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
  },
];

export function Portfolio15() {
  const [expanded, setExpanded] = useState(null);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef    = useRef([]);

  const toggle = (i) => setExpanded(expanded === i ? null : i);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow + heading reveal
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Abgeschlossene Projekte in Bayern")
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
        .to(eyebrowRef.current, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        })
        .to(headingWords, {
          yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07,
        }, "-=0.35");

      // Per row: a one-shot reveal (line, num pop, content slide in, image wipe)
      // plus a separate "active" highlight that toggles based on viewport-center
      // intersection so only the row near the middle shows row-tint / gold left
      // border / gold number color at any given time.
      rowsRef.current.filter(Boolean).forEach((row) => {
        const num        = row.querySelector("[data-row-num]");
        const meta       = row.querySelector("[data-row-meta]");
        const desc       = row.querySelector("[data-row-desc]");
        const img        = row.querySelector("[data-row-img]");
        const btn        = row.querySelector("[data-row-btn]");
        const line       = row.querySelector("[data-row-line]");
        const rowBg      = row.querySelector("[data-row-bg]");
        const goldBorder = row.querySelector("[data-row-gold-border]");

        gsap.set(num,        { scale: 0.6, opacity: 0, color: "rgba(255,255,255,0.15)", transformOrigin: "left center" });
        gsap.set(meta,       { x: -20, opacity: 0 });
        gsap.set(desc,       { x: 20, opacity: 0 });
        gsap.set(btn,        { y: 14, opacity: 0 });
        gsap.set(img,        { clipPath: "inset(0 100% 0 0)", scale: 1.15 });
        gsap.set(line,       { scaleX: 0, transformOrigin: "left center" });
        gsap.set(rowBg,      { backgroundColor: "rgba(255,255,255,0)" });
        gsap.set(goldBorder, { height: "0%" });

        // ── Reveal-once: appears as the row scrolls into view ──────────
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            once: true,
          },
          defaults: { force3D: true },
        })
          .to(line, { scaleX: 1, duration: 0.7, ease: "expo.inOut" })
          .to(num,  { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.6)" }, "-=0.4")
          .to(meta, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.55")
          .to(desc, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.6")
          .to(img,  { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.0, ease: "expo.out" }, "-=0.6")
          .to(btn,  { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.5");

        // ── Active-highlight timeline (paused; toggled by viewport center)
        const activeTl = gsap.timeline({ paused: true })
          .to(rowBg,      { backgroundColor: "rgba(255,255,255,0.05)", duration: 0.4, ease: "power2.out" }, 0)
          .to(goldBorder, { height: "100%", duration: 0.5, ease: "expo.out" }, 0)
          .to(num,        { color: "#F07040", duration: 0.4, ease: "power2.out" }, 0);

        // Row is "active" while the viewport's vertical center intersects it.
        // start fires when row top crosses the center going up;
        // end fires when row bottom crosses the center going up.
        // With stacked rows that means exactly one row is active at any time.
        ScrollTrigger.create({
          trigger: row,
          start: "top center",
          end: "bottom center",
          onEnter:     () => activeTl.play(),
          onLeave:     () => activeTl.reverse(),
          onEnterBack: () => activeTl.play(),
          onLeaveBack: () => activeTl.reverse(),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projekte" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-16 md:mb-20">
          <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#F07040]">
            Referenzprojekte
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Abgeschlossene Projekte in Bayern
          </h2>
        </div>

        {/* Project list */}
        <div>
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => (rowsRef.current[i] = el)}
              className="relative"
            >
              <div data-row-line className="absolute left-0 top-0 h-px w-full bg-white/10" />

              {/* Row */}
              <div
                data-row-bg
                className="relative overflow-hidden"
                style={{ background: "transparent" }}
              >
                {/* Gold left border */}
                <div
                  data-row-gold-border
                  className="absolute left-0 top-0 w-[3px] bg-[#F07040]"
                  style={{ height: "0%" }}
                />

                <div className="grid grid-cols-1 gap-6 py-8 pl-6 md:grid-cols-[60px_1fr_1fr_220px] md:items-center md:py-10 lg:py-12">
                  {/* Number */}
                  <span
                    data-row-num
                    className="font-heading text-4xl font-bold md:text-5xl"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  >
                    {p.id}
                  </span>

                  {/* Title + Category */}
                  <div data-row-meta>
                    <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F07040]">
                      {p.category}
                    </p>
                    <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                      {p.title}
                    </h3>
                  </div>

                  {/* Description + Location */}
                  <div data-row-desc>
                    <p className="font-body text-sm leading-relaxed text-white/75">
                      {p.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-px w-4 bg-[#F07040]/50" />
                      <p className="font-body text-xs uppercase tracking-[0.2em] text-white/50">
                        {p.location}
                      </p>
                    </div>
                  </div>

                  {/* Image + Button */}
                  <div className="flex flex-col gap-3">
                    <div data-row-img className="overflow-hidden rounded-sm md:h-28">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-48 w-full object-cover md:h-full"
                      />
                    </div>
                    <button
                      data-row-btn
                      onClick={() => toggle(i)}
                      className="flex items-center justify-between border border-white/20 px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-[#F07040] hover:text-[#F07040]"
                    >
                      <span>{expanded === i ? "Schließen" : "Mehr erfahren"}</span>
                      <span
                        className="ml-3 text-[#F07040] transition-transform duration-300"
                        style={{ transform: expanded === i ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expand panel */}
              <div
                className="overflow-hidden transition-all duration-700"
                style={{ maxHeight: expanded === i ? "800px" : "0px" }}
              >
                <div className="border-t border-white/10 bg-black/30 px-6 py-10 backdrop-blur-sm md:pl-[calc(60px+1.5rem)]">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Info text */}
                    <div>
                      <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F07040]">
                        Projektbeschreibung
                      </p>
                      <p className="font-body text-base leading-relaxed text-white/80">
                        {p.detail}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="h-px w-6 bg-[#F07040]/60" />
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-[#F07040]/70">
                          {p.category} · {p.location}
                        </span>
                      </div>
                    </div>

                    {/* Image grid */}
                    <div
                      className="grid gap-2"
                      style={{ gridTemplateColumns: `repeat(${Math.min(p.images.length, 2)}, 1fr)` }}
                    >
                      {p.images.map((img, j) => (
                        <div key={j} className="overflow-hidden rounded-sm aspect-[4/3]">
                          <img
                            src={img}
                            alt={`${p.title} ${j + 1}`}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>

      </div>
    </section>
  );
}
