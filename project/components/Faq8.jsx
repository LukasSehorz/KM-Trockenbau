"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq8() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Questions about this project and how we delivered it
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
              How did costs stay fixed?
            </h2>
            <p>
              We locked in material prices and labor costs before breaking
              ground. Every specification was detailed in writing. No surprises,
              no change orders, no excuses.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What if something unexpected happened?
            </h2>
            <p>
              We build contingencies into our timeline and budget, but we absorb
              them. The owners never see them. That's what a fixed-price
              guarantee means.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Were all materials sourced locally?
            </h2>
            <p>
              Yes. We work with suppliers we've known for years across Bavaria.
              That means quality control, faster delivery, and support after
              handover.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              How were inspections handled?
            </h2>
            <p>
              Every phase was inspected by local authorities and our own team.
              Documentation was provided to the owners at each milestone.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What happens after handover?
            </h2>
            <p>
              We stand behind our work. Warranty coverage and ongoing support
              are part of the agreement. You're not on your own.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
