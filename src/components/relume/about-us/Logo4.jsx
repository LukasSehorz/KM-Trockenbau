"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Logo4() {
  return (
    <section id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Certified and recognized
            </h2>
            <p className="md:text-md">
              Industry standards and regional quality marks we hold
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="View" variant="secondary">
                View
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
          <div className="grid grid-cols-2 gap-2">
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
            <div className="flex w-full items-start justify-center justify-self-center bg-neutral-lightest px-4 pb-4 pt-[0.875rem] md:p-[0.875rem]">
              <img
                src="/favicon.svg" style={{opacity:0}}
                alt="Relume placeholder image"
                className="max-h-12 md:max-h-14"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
