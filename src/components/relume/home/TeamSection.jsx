"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lukas = {
  num: "01",
  name: "Lukas Winter",
  title: "Geschäftsführer",
  role: "Geschäftsführung",
  image: "/images/lukas-winter.png",
  email: "info@wmbau.com",
  bio: "Lukas Winter führt die WM Bau GmbH mit Leidenschaft für Qualität und handwerklicher Präzision. Mit seinem Team realisiert er Projekte von der Planung bis zur Schlüsselübergabe – in Dorfen, der Region Erding und weit darüber hinaus.",
  facts: [
    { label: "Unternehmen", value: "WM Bau GmbH" },
    { label: "Schwerpunkt", value: "Hochbau, Tiefbau & Schlüsselfertigbau" },
    { label: "Standort", value: "Breitenloh 1, 84405 Dorfen" },
  ],
};

const philip = {
  num: "02",
  name: "Philip Marsmann",
  title: "Geschäftsführer",
  role: "Geschäftsführung",
  image: "/images/philip-marsmann.png",
  email: "info@wmbau.com",
  bio: "Philip Marsmann verantwortet die operative und kaufmännische Führung der WM Bau GmbH und sorgt mit seinem Organisationstalent für reibungslose Abläufe – von der Angebotserstellung bis zur Projektabrechnung.",
  facts: [
    { label: "Unternehmen", value: "WM Bau GmbH" },
    { label: "Schwerpunkt", value: "Projektleitung & Verwaltung" },
    { label: "Standort", value: "Breitenloh 1, 84405 Dorfen" },
  ],
};

const ACCENT = "#F07040";
const DARK = "#0A1628";
const LIGHT = "#f0ede8";

function TextPanel({ person }) {
  return (
    <div className="flex h-full flex-col justify-center px-12 md:px-16 lg:px-20">
      <p
        className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em]"
        style={{ color: ACCENT }}
      >
        {person.num} · Geschäftsführung
      </p>
      <h2
        className="mb-2 font-heading font-bold leading-tight tracking-tight text-white"
        style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
      >
        {person.name}
      </h2>
      <p className="mb-8 font-body text-sm uppercase tracking-[0.15em] text-white/40">
        {person.title} · {person.role}
      </p>
      <div className="mb-8 h-px w-12" style={{ backgroundColor: `${ACCENT}80` }} />
      <p className="mb-10 max-w-md font-body text-sm leading-relaxed text-white/55 md:text-base">
        {person.bio}
      </p>
      <div className="mb-10 space-y-4">
        {person.facts.map((f) => (
          <div key={f.label} className="flex items-baseline gap-4">
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
        href={`mailto:${person.email}`}
        className="inline-flex items-center gap-2 font-body text-xs text-white/30 transition-colors duration-200 hover:text-white"
      >
        {person.email}
      </a>
    </div>
  );
}

export function TeamSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Timeline:
  // 0.00–0.15: Lukas voll sichtbar
  // 0.15–0.35: Lukas slidet aus dem Bild
  // 0.35–0.65: Helles Panel wechselt die Seite
  // 0.65–0.85: Philip slidet ins Bild
  // 0.85–1.00: Philip voll sichtbar

  const lukasTextX  = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "-100%"]);
  const lukasImageX = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "100%"]);

  const lightPanelX = useTransform(scrollYProgress, [0.35, 0.65], ["100%", "0%"]);

  const philipImageX = useTransform(scrollYProgress, [0.65, 0.85], ["-100%", "0%"]);
  const philipTextX  = useTransform(scrollYProgress, [0.65, 0.85], ["100%", "0%"]);

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: DARK }}
      >
        {/* Bewegliches helles Hintergrund-Panel */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-1/2"
          style={{ x: lightPanelX, backgroundColor: LIGHT, willChange: "transform" }}
        />

        {/* Phase 1: Lukas — Text links, Bild rechts */}
        <div className="absolute inset-0 flex pointer-events-none overflow-hidden">
          <motion.div
            className="flex h-full w-1/2 bg-transparent pointer-events-auto"
            style={{ x: lukasTextX, willChange: "transform" }}
          >
            <TextPanel person={lukas} />
          </motion.div>
          <motion.div
            className="flex h-full w-1/2 items-end justify-center bg-transparent pointer-events-auto"
            style={{ x: lukasImageX, willChange: "transform" }}
          >
            <img
              src={lukas.image}
              alt={lukas.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 15%" }}
            />
          </motion.div>
        </div>

        {/* Phase 2: Philip — Bild links, Text rechts */}
        <div className="absolute inset-0 flex pointer-events-none overflow-hidden">
          <motion.div
            className="flex h-full w-1/2 items-end justify-center bg-transparent pointer-events-auto"
            style={{ x: philipImageX, willChange: "transform" }}
          >
            <img
              src={philip.image}
              alt={philip.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: "30% 15%" }}
            />
          </motion.div>
          <motion.div
            className="flex h-full w-1/2 bg-transparent pointer-events-auto"
            style={{ x: philipTextX, willChange: "transform" }}
          >
            <TextPanel person={philip} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
