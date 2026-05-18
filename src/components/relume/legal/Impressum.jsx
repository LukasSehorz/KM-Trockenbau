"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

export function Impressum() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".legal-eyebrow", {
        y: 22, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".legal-heading", {
        y: 36, opacity: 0, duration: 0.9, ease: "expo.out", delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".legal-block", {
        y: 24, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.25,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[5%] pt-32 pb-20 md:pt-40 md:pb-28"
      style={{ backgroundColor: "#0D2020" }}
    >
      <div className="container max-w-3xl">

        {/* Heading */}
        <div className="mb-14 md:mb-20">
          <div className="legal-eyebrow flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ background: "#7BBFB8" }} />
            <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-[#7BBFB8]">
              Rechtliches
            </p>
          </div>
          <h1
            className="legal-heading font-heading font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Impressum
          </h1>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Angaben gemäß § 5 DDG
            </h2>
            <div className="font-body text-base leading-relaxed text-white/75 space-y-1">
              <p className="font-semibold text-white">K.M. Trockenbau</p>
              <p>Inhaber: Kalac Mujo</p>
              <p>Siegfriedstrasse 3</p>
              <p>93051 Regensburg</p>
              <p>Deutschland</p>
            </div>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Kontakt
            </h2>
            <div className="font-body text-base leading-relaxed text-white/75 space-y-1">
              <p>
                Telefon:{" "}
                <a href="tel:+4917638583954" className="text-white hover:text-[#7BBFB8] transition-colors">
                  +49 (0) 176 38 58 39 54
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a href="mailto:info-kalac-trockenbau@web.de" className="text-white hover:text-[#7BBFB8] transition-colors">
                  info-kalac-trockenbau@web.de
                </a>
              </p>
            </div>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Steuerangaben
            </h2>
            <div className="font-body text-base leading-relaxed text-white/75 space-y-1">
              <p>Steuernummer: 24423430024</p>
            </div>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <div className="font-body text-base leading-relaxed text-white/75 space-y-1">
              <p>Kalac Mujo</p>
              <p>Siegfriedstrasse 3</p>
              <p>93051 Regensburg</p>
            </div>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Berufsbezeichnung und berufsrechtliche Regelungen
            </h2>
            <div className="font-body text-base leading-relaxed text-white/75 space-y-3">
              <p>Berufsbezeichnung: Trockenbau / Innenausbau</p>
              <p>Zuständige Handwerkskammer: Handwerkskammer Niederbayern-Oberpfalz</p>
              <p>Verliehen in: Deutschland</p>
            </div>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Streitschlichtung
            </h2>
            <div className="font-body text-base leading-relaxed text-white/75 space-y-3">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-[#7BBFB8] transition-colors">
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Haftung für Inhalte
            </h2>
            <p className="font-body text-base leading-relaxed text-white/75">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
              werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Haftung für Links
            </h2>
            <p className="font-body text-base leading-relaxed text-white/75">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
              ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>

          <div className="legal-block">
            <h2 className="mb-4 font-heading text-lg font-bold uppercase tracking-[0.15em] text-[#7BBFB8]">
              Urheberrecht
            </h2>
            <p className="font-body text-base leading-relaxed text-white/75">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
              nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
              dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Inhalte umgehend entfernen.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
