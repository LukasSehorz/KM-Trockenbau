"use client";

import React from "react";

export function Header65() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "60vh", backgroundColor: "#0A1628" }}>
      <div className="absolute inset-0 flex">
        <div className="relative flex-1 overflow-hidden">
          <img
            src="/images/lukas-winter.png"
            alt="Lukas Winter – Geschäftsführer WM Bau GmbH"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 5%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#F07040]">Geschäftsführer</p>
            <p className="font-heading text-lg font-bold text-white">Lukas Winter</p>
          </div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="relative flex-1 overflow-hidden">
          <img
            src="/images/philip-marsmann.png"
            alt="Philip Marsmann – Geschäftsführer WM Bau GmbH"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 5%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#F07040]">Geschäftsführer</p>
            <p className="font-heading text-lg font-bold text-white">Philip Marsmann</p>
          </div>
        </div>
      </div>
    </section>
  );
}
