"use client";

import React from "react";

const kalac = {
  num: "01",
  name: "Kalac Mujo",
  title: "Inhaber",
  role: "Trockenbau & Innenausbau",
  image: "/images/team-kalac.svg",
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
const LIGHT = "#EAF6F5";

function TextPanel({ person }) {
  return (
    <div className="flex h-full flex-col justify-center px-12 md:px-16 lg:px-20">
      <p
        className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em]"
        style={{ color: ACCENT }}
      >
        {person.role}
      </p>
      <h2
        className="mb-2 font-heading font-bold leading-tight tracking-tight text-white"
        style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
      >
        {person.name}
      </h2>
      <p className="mb-8 font-body text-sm uppercase tracking-[0.15em] text-white/40">
        {person.title} · K.M. Trockenbau
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
  return (
    <div style={{ height: "100vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex"
        style={{ backgroundColor: DARK }}
      >
        {/* Text links */}
        <div className="flex h-full w-1/2">
          <TextPanel person={kalac} />
        </div>

        {/* Bild rechts */}
        <div className="flex h-full w-1/2 overflow-hidden">
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
