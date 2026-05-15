"use client";

import { Link } from "react-router-dom";

const HOUSE_PATH = "M6 20L24 6L42 20V42H30V30H18V42H6V20Z";

const navCols = [
  {
    heading: "Leistungen",
    links: [
      { label: "Schlüsselfertiges Bauen", to: "/leistungen" },
      { label: "Rohbau & Planung", to: "/leistungen" },
      { label: "Renovierung & Sanierung", to: "/leistungen" },
      { label: "Tiefbau", to: "/leistungen" },
      { label: "Transporte & Gerüstbau", to: "/leistungen" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", to: "/ueber-uns" },
      { label: "Unser Prozess", to: "/prozess" },
      { label: "Projekte", to: "/projekte" },
      { label: "Referenzen", to: "/referenzen" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      { label: "Beratung anfragen", to: "/kontakt" },
      { label: "FAQ", to: "/kontakt" },
      { label: "Auszeichnungen", to: "/auszeichnungen" },
      { label: "Impressum", to: "#" },
      { label: "Datenschutz", to: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #D94520 0%, #B83A14 55%, #9E300E 100%)" }}
    >
      {/* Top hairline accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ghost "HÄRTL" */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 select-none font-heading font-bold leading-none text-white"
        style={{ fontSize: "clamp(6rem, 18vw, 22rem)", opacity: 0.04, letterSpacing: "-0.02em", lineHeight: 0.85 }}
        aria-hidden="true"
      >
        WM BAU
      </div>

      <div className="container relative px-[5%] pt-16 pb-10 md:pt-24 md:pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-16 mb-16 border-b border-white/8 pb-16">

          {/* Brand column */}
          <div>
            <Link to="/" className="mb-6 flex items-center gap-2.5">
              <svg viewBox="0 0 48 48" fill="none" style={{ width: 22, height: 22, flexShrink: 0 }}>
                <path
                  d={HOUSE_PATH}
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="font-heading text-lg font-bold tracking-[0.1em] uppercase text-white">
                WM Bau GmbH
              </span>
            </Link>

            <p className="mb-8 font-body text-sm leading-relaxed text-white/45 max-w-[22ch]">
              Ihr zuverlässiger Baupartner in der Region Dorfen. Qualität aus einer Hand.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="tel:+4915158720108"
                className="flex items-center gap-3 font-body text-sm text-white/55 transition-colors duration-200 hover:text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                </svg>
                0151 58 72 01 08
              </a>
              <a
                href="mailto:info@wmbau.com"
                className="flex items-center gap-3 font-body text-sm text-white/55 transition-colors duration-200 hover:text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                info@wmbau.com
              </a>
              <p className="flex items-start gap-3 font-body text-sm text-white/40">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60 mt-0.5">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Breitenloh 1 · 84405 Dorfen
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-5 font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} WM Bau GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-xs text-white/30 transition-colors duration-200 hover:text-white/60">
              Impressum
            </a>
            <a href="#" className="font-body text-xs text-white/30 transition-colors duration-200 hover:text-white/60">
              Datenschutz
            </a>
            <a href="#" className="font-body text-xs text-white/30 transition-colors duration-200 hover:text-white/60">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
