"use client";

import React from "react";

const footerLinks = [
  {
    heading: "Leistungen",
    links: [
      { label: "Neubau", href: "/leistungen" },
      { label: "Renovierung", href: "/leistungen" },
      { label: "Anbauten", href: "/leistungen" },
      { label: "Beratung", href: "/leistungen" },
      { label: "Restaurierung", href: "/leistungen" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Unser Team", href: "/ueber-uns" },
      { label: "Unser Prozess", href: "/prozess" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Auszeichnungen", href: "/auszeichnungen" },
    ],
  },
  {
    heading: "Projekte",
    links: [
      { label: "Alle Projekte", href: "/projekte" },
      { label: "Aktuelle Arbeiten", href: "/projekte" },
      { label: "Fotogalerie", href: "/projekte" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      { label: "Beratung anfragen", href: "/kontakt" },
      { label: "Kontakt aufnehmen", href: "/kontakt" },
      { label: "FAQ", href: "/kontakt" },
      { label: "Preise", href: "/preise" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
      { label: "AGB", href: "#" },
      { label: "Cookie-Einstellungen", href: "#" },
    ],
  },
  {
    heading: "Folgen Sie uns",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

export function Footer6() {
  return (
    <footer className="bg-background-alternative px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        {/* Top: newsletter */}
        <div className="mb-12 flex flex-col gap-6 border-b border-border-alternative pb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <div>
            <p className="mb-1 font-heading text-base font-bold tracking-wide text-text-alternative">
              Immer auf dem Laufenden
            </p>
            <p className="font-body text-sm text-text-alternative/60">
              Tipps und Einblicke für Ihr Bauprojekt in Bayern.
            </p>
          </div>
          <form
            className="flex w-full max-w-sm gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="w-full border border-border-alternative bg-transparent px-4 py-2.5 font-body text-sm text-text-alternative placeholder-text-alternative/40 outline-none focus:border-hoser-gold transition-colors duration-200"
            />
            <button
              type="submit"
              className="shrink-0 bg-hoser-gold px-5 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:bg-hoser-gold-light"
            >
              Abonnieren
            </button>
          </form>
        </div>

        {/* Links grid */}
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.15em] text-text-alternative">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-text-alternative/60 transition-colors duration-200 hover:text-hoser-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-alternative pt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="font-heading text-base font-bold tracking-[0.12em] uppercase text-text-alternative">
            WM Bau GmbH
          </a>
          <p className="font-body text-xs text-text-alternative/40">
            © {new Date().getFullYear()} WM Bau GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
