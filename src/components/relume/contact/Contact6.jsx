"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

const inputCls = [
  "w-full border border-[rgba(217,69,32,0.20)] bg-white px-4 py-3",
  "font-body text-sm text-[#0A1628] placeholder:text-[#0A1628]/40",
  "outline-none transition-colors duration-200",
  "focus:border-[#D94520] focus:ring-0",
].join(" ");

const labelCls = "block mb-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-[#0A1628]/60";

export function Contact6() {
  return (
    <section style={{ backgroundColor: "#FDFCF8" }} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">

        {/* Left: info */}
        <div>
          <div className="mb-8">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
              Anfragen
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold text-[#D94520] md:text-6xl lg:text-7xl">
              Ihr Projekt
            </h2>
            <p className="font-body text-base text-[#0A1628]/60">
              Wir antworten innerhalb eines Arbeitstages
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <BiEnvelope className="size-5 flex-none text-[#D94520]" />
              <p className="font-body text-sm text-[#0A1628]">info@wmbau.com</p>
            </div>
            <div className="flex items-center gap-4">
              <BiPhone className="size-5 flex-none text-[#D94520]" />
              <p className="font-body text-sm text-[#0A1628]">0151 58 72 01 08</p>
            </div>
            <div className="flex items-center gap-4">
              <BiMap className="size-5 flex-none text-[#D94520]" />
              <p className="font-body text-sm text-[#0A1628]">Breitenloh 1, 84405 Dorfen</p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form className="grid gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className={labelCls}>Vorname</label>
              <input type="text" id="firstName" className={inputCls} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelCls}>Nachname</label>
              <input type="text" id="lastName" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelCls}>E-Mail</label>
              <input type="email" id="email" className={inputCls} />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>Telefon</label>
              <input type="tel" id="phone" className={inputCls} />
            </div>
          </div>

          <div>
            <label htmlFor="project" className={labelCls}>Art des Projekts</label>
            <select
              id="project"
              className={inputCls + " appearance-none cursor-pointer"}
              defaultValue=""
            >
              <option value="" disabled>Bitte wählen</option>
              <option value="neubau">Neubau</option>
              <option value="sanierung">Sanierung</option>
              <option value="erweiterung">Erweiterung</option>
              <option value="beratung">Beratung</option>
              <option value="sonstiges">Sonstiges</option>
            </select>
          </div>

          <div>
            <p className={labelCls + " mb-3"}>Wie beschreiben Sie sich?</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {["Neubau","Sanierung","Erweiterung","Modernisierung","Beratung","Sonstiges"].map((opt) => (
                <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="beschreibung"
                    value={opt}
                    className="appearance-none size-4 rounded-full border-2 border-[rgba(217,69,32,0.30)] checked:border-[#D94520] checked:bg-[#D94520] transition-colors duration-200 cursor-pointer flex-none"
                  />
                  <span className="font-body text-sm text-[#0A1628]/70 group-hover:text-[#D94520] transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelCls}>Nachricht</label>
            <textarea
              id="message"
              rows={6}
              placeholder="Erzählen Sie uns von Ihrem Projekt"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 size-4 appearance-none border-2 border-[rgba(217,69,32,0.30)] checked:border-[#D94520] checked:bg-[#D94520] transition-colors duration-200 cursor-pointer flex-none"
            />
            <label htmlFor="terms" className="font-body text-sm text-[#0A1628]/60 cursor-pointer leading-snug">
              Ich akzeptiere die Datenschutzerklärung
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 border border-[#D94520] bg-[#D94520] px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#D94520]"
            >
              Senden
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
