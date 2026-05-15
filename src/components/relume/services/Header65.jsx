"use client";

import React from "react";

export function Header65() {
  return (
    <section className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-2xl">
        <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
          Leistungen
        </p>
        <h1
          className="mb-5 font-heading font-bold leading-[1.05] tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
        >
          Bauen aus einer Hand.
        </h1>
        <p className="font-body text-base leading-relaxed text-white/65 md:text-lg">
          Hochbau, Tiefbau, Sanierung, Ingenieurbau und Gewerbebau –
          wir übernehmen Baumeisterarbeiten aller Art in Dorfen,
          der Region Erding und darüber hinaus. Mit eigenem Fachpersonal und modernster Technik.
        </p>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/craftsmen-stone-facade.jpg"
          className="size-full object-cover"
          alt="WM Bau GmbH Leistungen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      </div>
    </section>
  );
}
