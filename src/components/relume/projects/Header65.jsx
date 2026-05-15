"use client";

import React from "react";

export function Header65() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-lg text-center">
        <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold md:mb-4">
          Referenzprojekte
        </p>
        <h1 className="mb-5 text-6xl font-bold text-white md:mb-6 md:text-9xl lg:text-10xl">
          Unsere Bauprojekte in Bayern
        </h1>
        <p className="text-white/80 md:text-md">
          Von München bis Augsburg – solides Bauen in ganz Bayern.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
          <a
            href="#projekte"
            className="inline-flex items-center bg-hoser-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-text-primary transition-opacity duration-200 hover:opacity-85"
          >
            Projekte entdecken
          </a>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 border border-white/50 px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:border-hoser-gold hover:text-hoser-gold"
          >
            Beratung anfragen
          </a>
        </div>
      </div>
    </section>
  );
}
