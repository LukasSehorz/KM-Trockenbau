"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq8() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQ
          </h2>
          <p className="md:text-md">
            Common questions about building and renovating in Bavaria
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
              How long does construction take?
            </h2>
            <p>
              Timeline depends on project scope and complexity. We provide a
              detailed schedule during the planning phase and commit to it in
              writing. Weather and permits can affect timelines, but we build in
              realistic buffers.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What happens if costs increase?
            </h2>
            <p>
              We offer fixed-price contracts for all projects. Any changes
              requested by you are quoted separately before work begins. No
              surprises, no hidden fees.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Are you licensed in Bavaria?
            </h2>
            <p>
              Yes. We hold all required certifications and licenses for
              construction work in Bavaria. We know local building codes, soil
              conditions, and weather challenges that matter for your project.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              Can I see previous projects?
            </h2>
            <p>
              Absolutely. Visit our Projects page to see completed renovations
              and builds across Munich, Augsburg, Regensburg, and other Bavarian
              cities. We also provide references on request.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-base font-bold md:mb-4 md:text-md">
              What's included in a consultation?
            </h2>
            <p>
              We listen to your vision, assess your property, discuss budget and
              timeline, and explain our process. No obligation, no sales
              pressure. You'll leave with a clear understanding of next steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
