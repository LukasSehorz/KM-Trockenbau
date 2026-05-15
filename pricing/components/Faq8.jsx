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
            Everything you need to know about our pricing and process in Bavaria
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
              What's included in your quote?
            </h2>
            <p>
              We include materials, labor, permits, and project management from
              start to finish. No hidden fees. No surprise invoices when the
              work is done.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How do you prevent cost overruns?
            </h2>
            <p>
              We lock in fixed prices before breaking ground. If conditions
              change, we discuss it with you first. You decide whether to
              proceed or adjust the scope.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I get a custom quote?
            </h2>
            <p>
              Yes. Every project in Bavaria is different. We'll visit your
              property, understand your vision, and provide a detailed
              fixed-price estimate with no obligation.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What if I need changes mid-project?
            </h2>
            <p>
              Changes are documented and priced separately before we proceed.
              You stay in control of your budget at every step.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Do you offer payment plans?
            </h2>
            <p>
              We work with standard construction payment schedules tied to
              project milestones. We'll discuss the details during your
              consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
