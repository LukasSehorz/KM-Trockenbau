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

const projects = [
  {
    id: "01",
    title: "TV-Wand mit Mediannische",
    category: "Trockenbau",
    desc: "Maßgefertigte TV-Wand mit integrierter Mediannische aus Trockenbau",
    location: "Regensburg",
    img: "/images/projekt-tvwand.png",
    detail: "Für ein Einfamilienhaus in Regensburg realisierte K.M. Trockenbau eine raumhohe TV-Wand aus Rigips. Die eingebaute Mediannische bietet Platz für TV, AV-Geräte und Dekoration – alles sauber verputzt und bereit zur Endbeschichtung. Sämtliche Kabel verlaufen unsichtbar in der Konstruktion.",
  },
  {
    id: "02",
    title: "Abhangdecke mit Beleuchtung",
    category: "Trockenbaudecke",
    desc: "Abgehängte Decke mit LED-Einbauspots und indirekter Beleuchtung",
    location: "Regensburg",
    img: "/images/projekt-abhangdecke.png",
    detail: "In einem Wohnraum in Regensburg baute K.M. Trockenbau eine moderne Abhangdecke mit indirekter LED-Beleuchtung und Einbauspots. Der umlaufende Lichtkanal schafft eine warme Raumwirkung. Die saubere Ausführung in Rigips bildet die perfekte Basis für die Endbeschichtung.",
  },
  {
    id: "03",
    title: "Dachgeschossausbau",
    category: "Dachbodenausbau",
    desc: "Ausbau eines Dachgeschosses mit Trockenbau-Schrägen und Verkleidung",
    location: "Regensburg",
    img: "/images/projekt-dachgeschoss.png",
    detail: "Im Zuge eines Dachgeschossausbaus in Regensburg verkleidete K.M. Trockenbau die Dachschrägen und Wände vollständig in Rigips. Die saubere Ausführung der Schrägenverkleidung schafft einen hellen, modernen Wohnraum. Inklusive Dämmung nach aktuellen Energiesparstandards.",
  },
  {
    id: "04",
    title: "Lichtdecke – Indirekte Beleuchtung",
    category: "Trockenbaudecke",
    desc: "Raumhohe Lichtdecke mit umlaufendem LED-Lichtkanal",
    location: "Regensburg",
    img: "/images/projekt-lichtdecke.png",
    detail: "Diese Lichtdecke entstand im Wohnzimmer eines Privathauses in Regensburg. K.M. Trockenbau baute eine abgehängte Konstruktion mit umlaufendem Lichtkanal für indirektes LED-Licht. Das Ergebnis: ein stimmungsvoller Raum mit gleichmäßiger, blendfreier Beleuchtung.",
  },
  {
    id: "05",
    title: "Wohnzimmer-Nische mit Naturstein",
    category: "Innenausbau",
    desc: "Individuelle Sitz-Nische aus Trockenbau mit Natursteinverkleidung",
    location: "Regensburg",
    img: "/images/projekt-nische.png",
    detail: "Für ein Wohnzimmer in Regensburg fertigte K.M. Trockenbau eine gemütliche Sitz-Nische an. Die Trockenbauwände wurden mit Naturstein verkleidet und mit beleuchteten Nischen kombiniert. Ein individuelles Gestaltungselement das Wohnkomfort und handwerkliche Präzision vereint.",
  },
  {
    id: "06",
    title: "Badezimmer-Ausbau mit Nischen",
    category: "Innenausbau",
    desc: "Trockenbauarbeiten im Bad – Duschbereich mit eingebauten Nischen und Regalturm",
    location: "Regensburg",
    img: "/images/Beispiel-Projekte/20191210_151717.jpg",
    detail: "Für ein Badezimmer in Regensburg realisierte K.M. Trockenbau einen modernen Duschbereich mit eingelassenen Wandnischen sowie einen freistehenden Regalturm aus Rigips. Die Konstruktion wurde wasserfest verspachtelt und ist bereit für die Fliesenarbeiten.",
    imgAspect: "2/5",
  },
  {
    id: "07",
    title: "Deckenverkleidung & Ausbau",
    category: "Trockenbaudecke",
    desc: "Professionelle Deckenverkleidung mit Trockenbau nach Maß",
    location: "Regensburg",
    img: "/images/Beispiel-Projekte/Decken.jpg",
    detail: "Für dieses Projekt in Regensburg realisierte K.M. Trockenbau eine maßgefertigte Deckenverkleidung. Die sorgfältige Ausführung in Rigips ermöglicht eine optimale Grundlage für Anstrich oder weitere Gestaltung. Präzise Verarbeitung auf den letzten Millimeter.",
  },
  {
    id: "08",
    title: "Trockenbau Innenraumgestaltung",
    category: "Innenausbau",
    desc: "Individuelle Raumgestaltung mit Trockenbau-Elementen",
    location: "Regensburg",
    img: "/images/Beispiel-Projekte/20191210_151726.jpg",
    detail: "In diesem Projekt gestaltete K.M. Trockenbau einen Innenraum mit individuellen Trockenbau-Elementen. Von der Planung bis zur Fertigstellung wurde alles aus einer Hand geliefert – termintreu, sauber und mit höchster handwerklicher Qualität.",
    imgAspect: "2/5",
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
        ? splitWords(headingRef.current, "Abgeschlossene Projekte in Regensburg")
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
          .to(num,        { color: "#7BBFB8", duration: 0.4, ease: "power2.out" }, 0);

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
          <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#7BBFB8]">
            Referenzprojekte
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Abgeschlossene Projekte in Regensburg
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
                  className="absolute left-0 top-0 w-[3px] bg-[#7BBFB8]"
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
                    <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7BBFB8]">
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
                      <div className="h-px w-4 bg-[#7BBFB8]/50" />
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
                      className="flex items-center justify-between border border-white/20 px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-[#7BBFB8] hover:text-[#7BBFB8]"
                    >
                      <span>{expanded === i ? "Schließen" : "Mehr erfahren"}</span>
                      <span
                        className="ml-3 text-[#7BBFB8] transition-transform duration-300"
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
                style={{ maxHeight: expanded === i ? "600px" : "0px" }}
              >
                <div className="border-t border-white/10 bg-black/30 px-6 py-10 backdrop-blur-sm md:pl-[calc(60px+1.5rem)]">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Info text */}
                    <div>
                      <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7BBFB8]">
                        Projektbeschreibung
                      </p>
                      <p className="font-body text-base leading-relaxed text-white/80">
                        {p.detail}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="h-px w-6 bg-[#7BBFB8]/60" />
                        <span className="font-body text-xs uppercase tracking-[0.2em] text-[#7BBFB8]/70">
                          {p.category} · {p.location}
                        </span>
                      </div>
                    </div>

                    {/* Single image */}
                    <div
                      className="overflow-hidden rounded-sm"
                      style={{
                        aspectRatio: p.imgAspect || "4/3",
                        maxWidth: p.imgAspect ? "220px" : "100%",
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
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
