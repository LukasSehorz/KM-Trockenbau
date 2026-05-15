"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout308() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Methodical</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Five phases from consultation to handover
            </h2>
          </div>
          <div>
            <p className="md:text-md">
              We break every project into clear stages. You know exactly what
              happens when, who handles it, and how long it takes. No surprises.
              No guessing.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/favicon.svg" className="hidden size-12"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Initial consultation and site assessment
            </h3>
            <p>
              Meet your project manager. We walk the property, listen to your
              vision, and answer every question you have.
            </p>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/favicon.svg" className="hidden size-12"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Design, planning, and fixed-price quote
            </h3>
            <p>
              Our architects and engineers develop detailed plans. You get a
              binding price quote with no hidden costs.
            </p>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/favicon.svg" className="hidden size-12"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Permits and approvals in Bavaria
            </h3>
            <p>
              We handle all local permits and regulatory requirements. We know
              the Bavarian authorities and their timelines.
            </p>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="/favicon.svg" className="hidden size-12"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Construction with weekly milestones
            </h3>
            <p>
              Work begins on schedule. You receive progress photos every Friday
              and can visit the site anytime.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-18 lg:mt-20">
          <Button title="Learn" variant="secondary">
            Learn
          </Button>
          <Button
            title="→"
            variant="link"
            size="link"
            iconRight={<RxChevronRight />}
          >
            →
          </Button>
        </div>
      </div>
    </section>
  );
}
