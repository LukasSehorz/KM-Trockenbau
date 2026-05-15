"use client";

import React from "react";
import { BiSolidStar } from "react-icons/bi";

const reviews = [
  {
    initial: "A",
    name: "Angelika S.",
    label: "Google Rezension, 5/5 Sterne",
    quote:
      "10 Sterne wenn möglich! Fachlich und menschlich großartig! Die Arbeiten werden fachgerecht und auf höchstem Niveau durchgeführt. Absolut empfehlenswert!",
  },
  {
    initial: "C",
    name: "Christian Wendelborn",
    label: "Google Rezension, 5/5 Sterne",
    quote:
      "Die Rezension wird auf zwei Teile aufgeteilt, da sie sonst zu lange ist. Absolut professionelle Arbeit – wir sind rundum begeistert. Termintreue, Sauberkeit und Qualität auf höchstem Niveau. Sehr empfehlenswert!",
  },
  {
    initial: "M",
    name: "Manuela Hiermer",
    label: "Google Rezension, 5/5 Sterne",
    quote:
      "Teil 2 der Rezension: Auch nach der Fertigstellung stand das Team jederzeit für Rückfragen zur Verfügung. Selten so einen guten Service erlebt – WM Bau GmbH ist erste Wahl!",
  },
];

export function Testimonial6() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#FDFCF8" }}>
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
            Kundenstimmen
          </p>
          <h2
            className="font-heading font-bold leading-tight tracking-tight text-[#0A1628]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Was Bauherren sagen.
          </h2>
          <p className="mt-4 font-body text-base text-[#0A1628]/60 md:text-lg">
            Echte Erfahrungen – direkt von unseren Kunden.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          {reviews.map((r) => (
            <div key={r.name} className="flex h-full flex-col items-start justify-start text-left">
              {/* Stars */}
              <div className="mb-6 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <BiSolidStar key={i} className="size-5 text-[#D94520]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-base font-semibold leading-relaxed text-[#0A1628] md:text-lg">
                "{r.quote}"
              </blockquote>

              {/* Reviewer */}
              <div className="mt-6 flex items-center gap-3 md:mt-8">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full font-heading text-base font-bold text-white"
                  style={{ backgroundColor: "#D94520" }}
                >
                  {r.initial}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[#0A1628]">{r.name}</p>
                  <p className="font-body text-xs text-[#0A1628]/50">{r.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
