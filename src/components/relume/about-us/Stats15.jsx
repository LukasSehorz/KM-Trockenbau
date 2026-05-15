"use client";

import React from "react";

const stats = [
  { value: "2020", label: "Gründungsjahr" },
  { value: "5+", label: "Jahre in der Region" },
  { value: "10", label: "Leistungen aus einer Hand" },
  { value: "10", label: "Mitarbeiter im Team" },
];

export function Stats15() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/munich-residential.jpg"
          className="size-full object-cover"
          alt="WM Bau GmbH Bauprojekt"
        />
        <div className="absolute inset-0 bg-text-primary/75" />
      </div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20">
          <div>
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold md:mb-4">
              Das Unternehmen in Zahlen
            </p>
            <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-white md:mb-6 md:text-5xl lg:text-6xl">
              Dorfen.<br />Qualität aus einer Hand.
            </h2>
            <p className="font-body text-base text-white/65 md:text-lg">
              Gegründet 2020 von Lukas Winter und Philip Marsmann –
              heute ein etabliertes Bauunternehmen in der Region Dorfen und Erding.
            </p>
            <div className="mt-8">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-3 border border-white/30 px-7 py-3 font-body text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:border-hoser-gold hover:text-hoser-gold"
              >
                Projekt anfragen
                <span>→</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-2 md:gap-x-12 md:gap-y-12">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-hoser-gold pl-6">
                <p className="mb-2 font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm font-medium text-white/60 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
