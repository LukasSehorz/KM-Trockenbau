"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Stats17() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-text-alternative md:mb-4">
              Numbers
            </p>
            <h2 className="mb-5 text-5xl font-bold text-text-alternative md:mb-6 md:text-7xl lg:text-8xl">
              Results that speak
            </h2>
            <p className="text-text-alternative md:text-md">
              Twenty years building in Bavaria. Thousands of homes. One
              reputation.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button variant="secondary-alt">Discover</Button>
              <Button
                variant="link-alt"
                size="link"
                iconRight={<RxChevronRight />}
              >
                →
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-8 py-2 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            <div className="border-l-2 border-border-alternative pl-8">
              <p className="mb-2 text-10xl font-bold leading-[1.3] text-text-alternative md:text-[4rem] lg:text-[5rem]">
                847
              </p>
              <h3 className="text-md font-bold leading-[1.4] text-text-alternative md:text-xl">
                Projects completed
              </h3>
            </div>
            <div className="border-l-2 border-border-alternative pl-8">
              <p className="mb-2 text-10xl font-bold leading-[1.3] text-text-alternative md:text-[4rem] lg:text-[5rem]">
                98%
              </p>
              <h3 className="text-md font-bold leading-[1.4] text-text-alternative md:text-xl">
                On-time delivery
              </h3>
            </div>
            <div className="border-l-2 border-border-alternative pl-8">
              <p className="mb-2 text-10xl font-bold leading-[1.3] text-text-alternative md:text-[4rem] lg:text-[5rem]">
                96%
              </p>
              <h3 className="text-md font-bold leading-[1.4] text-text-alternative md:text-xl">
                On-budget completion
              </h3>
            </div>
            <div className="border-l-2 border-border-alternative pl-8">
              <p className="mb-2 text-10xl font-bold leading-[1.3] text-text-alternative md:text-[4rem] lg:text-[5rem]">
                20
              </p>
              <h3 className="text-md font-bold leading-[1.4] text-text-alternative md:text-xl">
                Years in Bavaria
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 aspect-video size-full object-cover"
          autoPlay={true}
          loop={true}
          muted={true}
        >
          <source
            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
