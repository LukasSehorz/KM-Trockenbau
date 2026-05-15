"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact14() {
  return (
    <section className="px-[5%] pt-10 pb-16 md:pt-14 md:pb-24" style={{ backgroundColor: "#FDFCF8" }}>
      <div className="container">

        {/* Top row: text left, map right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mb-14 md:mb-20">

          {/* Left: heading + description */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
              Kontakt
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#D94520]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Sprechen Sie mit uns.
            </h2>
            <p className="font-body text-base leading-relaxed text-[#0A1628]/60 md:text-lg">
              Wir sind Ihr direkter Ansprechpartner für alle Fragen rund um Ihr Bauvorhaben –
              von der ersten Idee bis zur Fertigstellung.
            </p>
          </div>

          {/* Right: Google Maps */}
          <div className="overflow-hidden rounded-sm" style={{ minHeight: 280 }}>
            <iframe
              title="WM Bau GmbH Standort"
              src="https://maps.google.com/maps?q=Breitenloh+1%2C+84405+Dorfen&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
            <div className="mb-3 text-[#D94520] md:mb-4">
              <BiPhone className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#D94520]">
              Telefon
            </h3>
            <p className="mb-2 font-body text-sm text-[#0A1628]/50">
              Mo – Fr, 7:00 – 18:00 Uhr · Sa, 7:00 – 12:00 Uhr
            </p>
            <a
              className="font-body text-base font-semibold text-[#0A1628] transition-colors duration-200 hover:text-[#D94520]"
              href="tel:+4915158720108"
            >
              0151 58 72 01 08
            </a>
          </div>

          <div>
            <div className="mb-3 text-[#D94520] md:mb-4">
              <BiEnvelope className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#D94520]">
              E-Mail
            </h3>
            <p className="mb-2 font-body text-sm text-[#0A1628]/50">
              Projektanfragen und allgemeine Fragen
            </p>
            <a
              className="font-body text-base font-semibold text-[#0A1628] transition-colors duration-200 hover:text-[#D94520]"
              href="mailto:info@wmbau.com"
            >
              info@wmbau.com
            </a>
          </div>

          <div>
            <div className="mb-3 text-[#D94520] md:mb-4">
              <BiMap className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#D94520]">
              Standort
            </h3>
            <p className="font-body text-base text-[#0A1628]/60">
              Breitenloh 1<br />
              84405 Dorfen
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
