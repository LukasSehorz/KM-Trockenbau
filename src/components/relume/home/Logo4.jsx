"use client";

import React from "react";

const certifications = [
  { name: "Bayerischer\nBaugewerbeverband", short: "BBG" },
  { name: "Zentralverband\nDeutsches Baugewerbe", short: "ZDB" },
  { name: "Meisterbetrieb\nHWK Bayern", short: "HWK" },
  { name: "ISO 9001\nQualitätsmanagement", short: "ISO" },
  { name: "TÜV-zertifiziert\nBauleitung", short: "TÜV" },
  { name: "GreenBuilding\nPartner", short: "GB" },
  { name: "BayernBau\nGütesiegel", short: "BBG" },
  { name: "Energie­effizienz\nPartner", short: "EEP" },
];

export function Logo4() {
  return (
    <section className="bg-background-primary px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold">
              Auszeichnungen
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              Zertifiziert und ausgezeichnet
            </h2>
            <p className="font-body text-base text-text-secondary md:text-lg">
              Auszeichnungen und Zertifikate der führenden bayerischen Bauverbände.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/auszeichnungen"
                className="inline-flex items-center border border-border-primary px-7 py-3 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:border-text-primary"
              >
                Alle Auszeichnungen
              </a>
              <a
                href="/ueber-uns"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-hoser-gold"
              >
                Über uns
                <span className="text-hoser-gold">→</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-px bg-border-primary border border-border-primary overflow-hidden">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col items-center justify-center bg-background-primary px-3 py-5 text-center transition-colors duration-200 hover:bg-hoser-gold group"
              >
                <div className="mb-2 font-heading text-xl font-bold tracking-wide text-text-primary group-hover:text-white transition-colors duration-200">
                  {cert.short}
                </div>
                <p className="font-body text-[0.6rem] leading-tight text-text-secondary group-hover:text-white/80 transition-colors duration-200 whitespace-pre-line text-center">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
