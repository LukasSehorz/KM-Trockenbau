"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq8() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Fragen
          </h2>
          <p className="md:text-md">
            Everything you need to know about our services, timelines, and how
            we work across Bavaria.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Kontakt" variant="secondary">
              Kontakt
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:gap-y-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How long does renovation take?
            </h2>
            <p>
              Most renovations in Bavaria take between four and eight months,
              depending on scope and complexity. We establish a fixed timeline
              at the start and hold ourselves to it. Your project plan is locked
              in writing.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What's included in fixed price?
            </h2>
            <p>
              Everything from initial planning through final handover.
              Materials, labor, permits, inspections, and contingencies are all
              covered. No hidden costs. No surprises at the end.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you work in my city?
            </h2>
            <p>
              We operate throughout Bavaria, from Munich to Augsburg and beyond.
              We know the regional building codes, local suppliers, and the
              inspectors in your area. We are genuinely local.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What happens if costs change?
            </h2>
            <p>
              They don't. Our fixed-price guarantee means the price you agree to
              is the price you pay. If unforeseen conditions arise, we discuss
              them with you first before proceeding. Transparency is
              non-negotiable.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I see your past work?
            </h2>
            <p>
              Yes. Visit our Projects page to see completed renovations, new
              builds, and extensions across Bavaria. We also provide references
              from homeowners who can speak directly to our process and results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
