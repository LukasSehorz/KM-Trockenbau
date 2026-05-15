"use client";

import React from "react";

export function Layout10() {
  return (
    <section className="bg-background-primary px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
              Unsere Geschichte
            </p>
            <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Gegründet 2020. Qualität aus einer Hand.
            </h2>
            <p className="mb-6 font-body text-base leading-relaxed text-text-secondary md:text-lg">
              <strong className="text-text-primary font-semibold">Lukas Winter</strong> und <strong className="text-text-primary font-semibold">Philip Marsmann</strong> gründeten die WM Bau GmbH 2020 in Dorfen.
              Von Anfang an stand das Unternehmen für klare Werte: Qualität, Verlässlichkeit und persönliche Betreuung.
              Mit eigenem Fachpersonal und moderner Ausstattung wächst WM Bau GmbH stetig in der Region Erding.
            </p>
            <p className="mb-8 font-body text-base leading-relaxed text-text-secondary md:text-lg">
              Unser Aufgabenschwerpunkt liegt in der Ausführung von Baumeisterarbeiten im Hoch-, Erd- und Kanalbau.
              Wir erstellen und sanieren sämtliche Wohn-, Gewerbe- und Ingenieurbauwerke – auch mit höchstem Schwierigkeitsgrad.
              Durch eigene Fachkräfte und konsequente Lehrlingsausbildung sichern wir gleichbleibend hohe Qualität.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div className="border-l-2 border-hoser-gold pl-5">
                <h6 className="mb-2 font-heading text-base font-bold text-text-primary md:text-lg">
                  Eigenes Fachpersonal
                </h6>
                <p className="font-body text-sm text-text-secondary">
                  Kein Rückgriff auf Werklohnfirmen – ausgebildete Mitarbeiter auf allen Baustellen.
                </p>
              </div>
              <div className="border-l-2 border-hoser-gold pl-5">
                <h6 className="mb-2 font-heading text-base font-bold text-text-primary md:text-lg">
                  Modernste Ausstattung
                </h6>
                <p className="font-body text-sm text-text-secondary">
                  Neueste Technik, umfangreicher Maschinen- und Fuhrpark für zuverlässige Ausführung.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/leistungen"
                className="inline-flex items-center border border-border-primary px-7 py-3 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:border-hoser-gold hover:text-hoser-gold"
              >
                Unsere Leistungen
              </a>
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-hoser-gold"
              >
                Kontakt aufnehmen
                <span className="text-hoser-gold">→</span>
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <img
              src="/images/craftsmen-stone-facade.jpg"
              className="w-full object-cover transition-transform duration-700 hover:scale-105"
              alt="WM Bau GmbH – Facharbeiter auf der Baustelle"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
