"use client";

import React, { useState } from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { sendContactForm } from "../../../utils/sendContactForm";

const inputCls = [
  "w-full border border-[rgba(217,69,32,0.20)] bg-white px-4 py-3",
  "font-body text-sm text-[#0D2020] placeholder:text-[#0D2020]/40",
  "outline-none transition-colors duration-200",
  "focus:border-[#5AACB5] focus:ring-0",
].join(" ");

const labelCls = "block mb-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-[#0D2020]/60";

export function Contact6() {
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const d = Object.fromEntries(new FormData(form));
    setFormStatus("sending");
    try {
      await sendContactForm({
        Vorname: d.firstName || "",
        Nachname: d.lastName || "",
        "E-Mail": d.email || "",
        Telefon: d.phone || "",
        Projektart: d.project || "-",
        Beschreibung: d.message || "-",
      });
      setFormStatus("success");
      form.reset();
    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <section style={{ backgroundColor: "#FFFFFF" }} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">

        {/* Left: info */}
        <div>
          <div className="mb-8">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#5AACB5]">
              Anfragen
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold text-[#5AACB5] md:text-6xl lg:text-7xl">
              Ihr Projekt
            </h2>
            <p className="font-body text-base text-[#0D2020]/60">
              Wir antworten innerhalb eines Arbeitstages
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <BiEnvelope className="size-5 flex-none text-[#5AACB5]" />
              <p className="font-body text-sm text-[#0D2020]">info-kalac-trockenbau@web.de</p>
            </div>
            <div className="flex items-center gap-4">
              <BiPhone className="size-5 flex-none text-[#5AACB5]" />
              <p className="font-body text-sm text-[#0D2020]">+49 176 38583954</p>
            </div>
            <div className="flex items-center gap-4">
              <BiMap className="size-5 flex-none text-[#5AACB5]" />
              <p className="font-body text-sm text-[#0D2020]">Siegfriedstrasse 3, 93051 Regensburg</p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className={labelCls}>Vorname</label>
              <input type="text" id="firstName" name="firstName" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelCls}>Nachname</label>
              <input type="text" id="lastName" name="lastName" required className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelCls}>E-Mail</label>
              <input type="email" id="email" name="email" className={inputCls} />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>Telefon</label>
              <input type="tel" id="phone" name="phone" required className={inputCls} />
            </div>
          </div>

          <div>
            <label htmlFor="project" className={labelCls}>Art des Projekts</label>
            <select
              id="project"
              name="project"
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
                    className="appearance-none size-4 rounded-full border-2 border-[rgba(217,69,32,0.30)] checked:border-[#5AACB5] checked:bg-[#5AACB5] transition-colors duration-200 cursor-pointer flex-none"
                  />
                  <span className="font-body text-sm text-[#0D2020]/70 group-hover:text-[#5AACB5] transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelCls}>Nachricht</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Erzählen Sie uns von Ihrem Projekt"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              className="mt-0.5 size-4 appearance-none border-2 border-[rgba(217,69,32,0.30)] checked:border-[#5AACB5] checked:bg-[#5AACB5] transition-colors duration-200 cursor-pointer flex-none"
            />
            <label htmlFor="terms" className="font-body text-sm text-[#0D2020]/60 cursor-pointer leading-snug">
              Ich akzeptiere die Datenschutzerklärung
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="inline-flex items-center gap-2 border border-[#5AACB5] bg-[#5AACB5] px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#5AACB5] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formStatus === "sending" ? "Wird gesendet…" : "Senden"}
              {formStatus !== "sending" && <span>→</span>}
            </button>
            {formStatus === "success" && (
              <p className="font-body text-sm text-[#5AACB5]">
                Vielen Dank! Ihre Anfrage wurde gesendet.
              </p>
            )}
            {formStatus === "error" && (
              <p className="font-body text-sm text-red-500">
                Fehler beim Senden. Bitte erneut versuchen.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
