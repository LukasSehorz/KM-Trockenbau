"use client";

import React from "react";

const badges = [
  "Meisterbetrieb",
  "Festpreisgarantie",
  "20+ Jahre Bayern",
  "847 Projekte",
  "TÜV-zertifiziert",
  "ISO 9001",
];

export function Cta33() {
  return (
    <section className="bg-background-secondary px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-16">
          <div className="mx-auto w-full max-w-2xl text-center">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold">
              Jetzt starten
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              Bereit, Ihr Haus in Bayern zu bauen?
            </h2>
            <p className="mb-8 font-body text-base text-text-secondary md:text-lg">
              Festpreis. Pünktliche Lieferung. Keine Überraschungen.
              Fordern Sie noch heute Ihre kostenlose Beratung an.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/kontakt"
                className="inline-flex items-center bg-hoser-gold px-8 py-3 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:bg-hoser-gold-light"
              >
                Kostenlos beraten lassen
              </a>
              <a
                href="/kontakt"
                className="inline-flex items-center border border-border-primary px-8 py-3 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:border-text-primary"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border-primary pt-10">
          <p className="mb-6 text-center font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
            Unsere Zertifikate & Auszeichnungen
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {badges.map((badge) => (
              <div
                key={badge}
                className="border border-border-primary px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
