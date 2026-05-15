"use client";

import React from "react";

const footerLinks = [
  {
    heading: "Leistungen",
    links: [
      { label: "Trockenbau", href: "/leistungen" },
      { label: "Dachbodenausbau", href: "/leistungen" },
      { label: "Wärme- & Schallschutz", href: "/leistungen" },
      { label: "Trockenbaudecke", href: "/leistungen" },
      { label: "Bodenbeläge", href: "/leistungen" },
      { label: "Badsanierung", href: "/leistungen" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Startseite", href: "/" },
      { label: "Leistungen", href: "/leistungen" },
      { label: "Galerie", href: "/galerie" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    heading: "Kontakt",
    links: [
      { label: "Angebot anfragen", href: "/kontakt" },
      { label: "info-kalac-trockenbau@web.de", href: "mailto:info-kalac-trockenbau@web.de" },
      { label: "+49 176 38583954", href: "tel:+4917638583954" },
      { label: "Siegfriedstrasse 3, Regensburg", href: "/kontakt" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

export function Footer6() {
  return (
    <footer className="bg-background-alternative px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        {/* Top: contact info */}
        <div className="mb-12 flex flex-col gap-6 border-b border-border-alternative pb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <div>
            <p className="mb-1 font-heading text-base font-bold tracking-wide text-text-alternative">
              K.M. Trockenbau
            </p>
            <p className="font-body text-sm text-text-alternative/60">
              Kalac Mujo · Siegfriedstrasse 3 · 93051 Regensburg
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm font-body text-text-alternative/60">
            <a href="tel:+4917638583954" className="hover:text-hoser-gold transition-colors duration-200">
              +49 (0) 176 38 58 39 54
            </a>
            <a href="mailto:info-kalac-trockenbau@web.de" className="hover:text-hoser-gold transition-colors duration-200">
              info-kalac-trockenbau@web.de
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
            K.M. Trockenbau
          </a>
          <p className="font-body text-xs text-text-alternative/40">
            © {new Date().getFullYear()} K.M. Trockenbau · Kalac Mujo · Steuernr. 24423430024
          </p>
        </div>
      </div>
    </footer>
  );
}