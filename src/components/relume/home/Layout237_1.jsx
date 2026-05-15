"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Beratung und Planung",
    body: "Woche eins bis vier. Wir hören zu, messen aus und planen gemeinsam.",
  },
  {
    number: "02",
    title: "Genehmigungen",
    body: "Woche fünf bis acht. Wir übernehmen die Bürokratie. Sie leben Ihr Leben.",
  },
  {
    number: "03",
    title: "Bau und Übergabe",
    body: "Ab Woche neun. Wir bauen. Wir informieren Sie. Wir liefern pünktlich.",
  },
];

export function Layout237_1() {
  return (
    <section className="bg-background-primary px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-xl text-center md:mb-18 lg:mb-20">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold">
              Unser Ablauf
            </p>
            <h2 className="mb-5 font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              Von der Beratung bis zur Schlüsselübergabe
            </h2>
            <p className="font-body text-base text-text-secondary md:text-lg">
              Wir arbeiten in klaren Phasen. Jede zeitlich definiert. Sie wissen
              immer, wo Sie stehen.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start justify-center gap-y-10 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
            {steps.map((step, i) => (
              <div key={step.number} className="flex w-full flex-col items-start text-left group">
                <div className="mb-6 flex items-end gap-4">
                  <span className="font-heading text-6xl font-bold leading-none text-border-primary group-hover:text-hoser-gold transition-colors duration-300">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="hidden md:block mb-3 text-border-primary text-xl">→</span>
                  )}
                </div>
                <div className="h-px w-full bg-border-primary mb-6 group-hover:bg-hoser-gold transition-colors duration-300" />
                <h3 className="mb-4 font-heading text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                  {step.title}
                </h3>
                <p className="font-body text-base text-text-secondary">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-4 md:mt-16">
            <a
              href="/prozess"
              className="inline-flex items-center border border-border-primary px-7 py-3 font-body text-sm font-semibold tracking-wide text-text-primary transition-colors duration-200 hover:border-text-primary"
            >
              Prozess entdecken
            </a>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-hoser-gold"
            >
              Beratung anfragen
              <span className="text-hoser-gold">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
