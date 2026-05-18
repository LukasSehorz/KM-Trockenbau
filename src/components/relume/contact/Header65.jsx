"use client";

import React from "react";

export function Header65() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "55vh", backgroundColor: "#0D2020" }}>
      <img
        src="/images/kontakt-header.jpg"
        alt="Kontakt K.M. Trockenbau – Angebot anfragen"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 40%" }}
      />
      {/* Gradient overlay — links dicht für Lesbarkeit, rechts offen */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, rgba(13,32,32,0.80) 0%, rgba(13,32,32,0.45) 55%, rgba(13,32,32,0.15) 100%)",
        }}
      />
      {/* Label unten links */}
      <div className="absolute bottom-8 left-8 md:left-[5%]">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#7BBFB8]">
          Inhaber · K.M. Trockenbau
        </p>
        <p className="mt-1 font-heading text-2xl font-bold text-white md:text-3xl">
          Kalac Mujo
        </p>
      </div>
    </section>
  );
}
