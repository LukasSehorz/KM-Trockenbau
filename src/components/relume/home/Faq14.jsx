"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "../../../utils/gsap";

const faqs = [
  {
    q: "Welche Leistungen bietet K.M. Trockenbau an?",
    a: "Wir bieten Trockenbau (Wände & Zwischenwände), Dachbodenausbau, Wärme- und Schallschutz, Trockenbaudecken, Bodenbeläge sowie Badsanierung an — alles aus einer Hand, von der Erstberatung bis zur Fertigstellung.",
  },
  {
    q: "In welcher Region sind Sie tätig?",
    a: "Unser Schwerpunkt liegt in Regensburg und der umliegenden Region. Sprechen Sie uns gerne an — wir sind auch für Projekte im weiteren Umkreis der richtige Ansprechpartner.",
  },
  {
    q: "Wie kann ich ein Angebot anfragen?",
    a: "Kontaktieren Sie uns telefonisch unter +49 (0) 176 38 58 39 54 oder per E-Mail an info-kalac-trockenbau@web.de. Gerne fertigen wir Ihnen ein individuelles Angebot an.",
  },
  {
    q: "Halten Sie die aktuellen DIN-Normen ein?",
    a: "Ja, unbedingt. Wir beachten alle aktuellen DIN-Normen beim Trocken- und Innenausbau. Durch kontinuierliche Weiterbildung sind wir stets auf dem neuesten Stand der Technik und Vorschriften.",
  },
  {
    q: "Beraten Sie auch zu Brandschutz und Dämmung?",
    a: "Ja. Da wir großen Wert auf die Sicherheit unserer Kunden legen, sind wir über aktuelle Brandschutzsysteme sehr gut informiert und stehen Ihnen beratend zur Seite. Ebenso beim Thema Wärme- und Schallschutz.",
  },
  {
    q: "Kann ich auch meinen Dachboden ausbauen lassen?",
    a: "Ja. Wenn Sie einen noch nicht genutzten Rohbau besitzen und mehr Wohnfläche schaffen möchten, sind wir der richtige Ansprechpartner. Wir verwandeln ungenutzten Dachraum in wertvolle Wohnfläche.",
  },
];

const EASE = [0.76, 0, 0.24, 1];

export function Faq14() {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      });

      // Eyebrow line + label
      tl.fromTo(".faq-eyebrow-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6 },
        0
      );
      tl.fromTo(".faq-eyebrow-label",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.15
      );

      // Headline lines — mask reveal
      tl.fromTo(".faq-headline-inner",
        { y: "108%" },
        { y: "0%", stagger: 0.12, duration: 0.9 },
        0.25
      );

      // Counter block
      tl.fromTo(".faq-counter",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.55
      );

      // Progress bar track
      tl.fromTo(".faq-track",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
        0.6
      );

      // FAQ rows staggered
      tl.fromTo(".faq-row",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.55 },
        0.75
      );

      // CTA
      tl.fromTo(".faq-cta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.35
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FDFCF8" }}
    >

      {/* Ghost heading — parallax */}
      <motion.div
        style={{ y: ghostY }}
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-heading font-bold leading-none text-[#D94520]"
          style={{
            fontSize: "clamp(8rem, 22vw, 26rem)",
            opacity: 0.045,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
          }}
        >
          FAQ
        </span>
      </motion.div>

      <div className="relative container px-[5%] py-20 md:py-28 lg:py-36">

        {/* Header */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="faq-eyebrow-line h-px w-8 bg-[#D94520]" />
              <p className="faq-eyebrow-label font-body text-xs font-semibold uppercase tracking-[0.32em] text-[#D94520]">
                Häufige Fragen
              </p>
            </div>
            <h2
              className="font-heading font-bold leading-[1.02] tracking-tight text-[#D94520]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
            >
              <span className="block" style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
                <span className="faq-headline-inner block">Was Sie wissen</span>
              </span>
              <span className="block" style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
                <em className="faq-headline-inner not-italic text-[#D94520]/35 block">wollen.</em>
              </span>
            </h2>
          </div>

          {/* Counter */}
          <div className="faq-counter hidden md:flex flex-col items-end gap-1 pb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={openIdx ?? "none"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-heading text-5xl font-bold tabular-nums text-[#D94520]/15"
              >
                {openIdx !== null ? String(openIdx + 1).padStart(2, "0") : "—"}
              </motion.span>
            </AnimatePresence>
            <span className="font-body text-xs text-[#D94520]/70 tracking-widest">
              / {String(faqs.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="faq-track mb-0 h-px w-full bg-[#D94520]/10" />
        <motion.div
          className="mb-0 h-px bg-[#D94520] origin-left"
          animate={{
            scaleX: openIdx !== null ? (openIdx + 1) / faqs.length : 0,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* Accordion */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div key={faq.q} className="faq-row relative">
                <button
                  onClick={() => toggle(i)}
                  className="group relative flex w-full items-start gap-5 py-7 md:gap-8 md:py-8 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span
                    className="shrink-0 font-heading font-bold tabular-nums transition-colors duration-300"
                    style={{
                      fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                      letterSpacing: "0.1em",
                      color: isOpen ? "#D94520" : "rgba(10,22,40,0.32)",
                      paddingTop: "0.35em",
                    }}
                  >
                    {num}
                  </span>

                  {/* Question */}
                  <span
                    className="flex-1 font-heading font-bold leading-snug tracking-tight transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.05rem, 2vw, 1.45rem)",
                      color: isOpen ? "#0A1628" : "rgba(10,22,40,0.62)",
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* Toggle icon */}
                  <div className="relative shrink-0 mt-1 flex h-7 w-7 items-center justify-center">
                    <span
                      className="absolute block h-px w-3.5 transition-colors duration-300"
                      style={{ background: isOpen ? "#D94520" : "rgba(10,22,40,0.35)" }}
                    />
                    <motion.span
                      className="absolute block h-px w-3.5"
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{
                        rotate: "90deg",
                        background: isOpen ? "#D94520" : "rgba(10,22,40,0.35)",
                      }}
                    />
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="flex gap-5 md:gap-8 pb-8">
                        {/* Blue left accent */}
                        <div className="shrink-0" style={{ width: "clamp(0.7rem, 1.2vw, 0.85rem)" }}>
                          <div className="h-full w-px bg-[#D94520]/50 ml-auto" />
                        </div>
                        <p className="font-body text-sm leading-relaxed text-[#D94520]/70 md:text-base max-w-2xl">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Separator */}
                <div
                  className="h-px w-full transition-colors duration-300"
                  style={{ background: isOpen ? "rgba(14,42,107,0.18)" : "rgba(217,69,32,0.08)" }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="faq-cta mt-16 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-[#D94520]/70">
            Noch weitere Fragen? Wir sind persönlich für Sie da.
          </p>
          <a
            href="/kontakt"
            className="group inline-flex items-center gap-4 border border-[#D94520]/30 px-8 py-4 font-body text-sm font-semibold tracking-widest text-[#D94520] uppercase transition-all duration-300 hover:bg-[#D94520] hover:text-white"
          >
            Kontakt aufnehmen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
