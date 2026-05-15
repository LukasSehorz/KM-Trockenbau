"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact14() {
  return (
    <section className="px-[5%] pt-10 pb-16 md:pt-14 md:pb-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">

        {/* Top row: text left, map right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mb-14 md:mb-20">

          {/* Left: heading + description */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#5AACB5]">
              Kontakt
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#5AACB5]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Sprechen Sie mit uns.
            </h2>
            <p className="font-body text-base leading-relaxed text-[#0D2020]/60 md:text-lg">
              Zögern Sie nicht, uns zu kontaktieren. Gerne fertigen wir Ihnen
              ein individuelles Angebot für Ihren Innenausbau in Regensburg an.
            </p>
          </div>

          {/* Right: Google Maps */}
          <div className="overflow-hidden rounded-sm" style={{ minHeight: 280 }}>
            <iframe
              title="K.M. Trockenbau Standort"
              src="https://maps.google.com/maps?q=Siegfriedstrasse+3%2C+93051+Regensburg&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 280 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom row: contact info */}
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-16">
          <div>
            <div className="mb-3 text-[#5AACB5] md:mb-4">
              <BiPhone className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#5AACB5]">
              Telefon
            </h3>
            <p className="mb-2 font-body text-sm text-[#0D2020]/50">
              Jetzt anrufen und Angebot anfragen
            </p>
            <a
              className="font-body text-base font-semibold text-[#0D2020] transition-colors duration-200 hover:text-[#5AACB5]"
              href="tel:+4917638583954"
            >
              +49 (0) 176 38 58 39 54
            </a>
          </div>

          <div>
            <div className="mb-3 text-[#5AACB5] md:mb-4">
              <BiEnvelope className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#5AACB5]">
              E-Mail
            </h3>
            <p className="mb-2 font-body text-sm text-[#0D2020]/50">
              Projektanfragen und allgemeine Fragen
            </p>
            <a
              className="font-body text-base font-semibold text-[#0D2020] transition-colors duration-200 hover:text-[#5AACB5]"
              href="mailto:info-kalac-trockenbau@web.de"
            >
              info-kalac-trockenbau@web.de
            </a>
          </div>

          <div>
            <div className="mb-3 text-[#5AACB5] md:mb-4">
              <BiMap className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#5AACB5]">
              Standort
            </h3>
            <p className="font-body text-base text-[#0D2020]/60">
              Siegfriedstrasse 3<br />
              93051 Regensburg
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
