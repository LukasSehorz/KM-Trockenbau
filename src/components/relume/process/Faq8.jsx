"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq8() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Questions
          </h2>
          <p className="md:text-md">
            Everything you need to know about our building process in Bavaria
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:gap-y-12">
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How does communication work?
            </h2>
            <p>
              You get a dedicated project manager who meets with you weekly. We
              send progress reports every Friday. Any questions get answered
              within 24 hours.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What happens if we fall behind?
            </h2>
            <p>
              We build schedule buffers into every project. If delays occur, we
              notify you immediately with a revised timeline and explain what
              caused it. Our fixed-price guarantee covers all costs regardless.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I see the progress myself?
            </h2>
            <p>
              Yes. You receive weekly photo updates and can visit the site
              anytime. We provide a digital project dashboard where you track
              every phase in real time.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What if I want changes mid-project?
            </h2>
            <p>
              Changes are possible but require a written change order. We show
              you exactly how it affects timeline and cost before you approve
              anything.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How long does a typical build take?
            </h2>
            <p>
              A standard renovation takes 4 to 6 months. New construction takes
              8 to 12 months. We give you a detailed timeline during the
              consultation that breaks down every phase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
