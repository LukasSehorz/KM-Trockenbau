"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Faq14() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Questions
          </h2>
          <p className="md:text-md">
            Answers to what matters most when you're building or renovating in
            Bavaria.
          </p>
        </div>
        <div className="container grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12 lg:gap-y-16">
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo 1"
                className="size-12"
              />
            </div>
            <h3 className="mb-3 font-bold md:mb-4 md:text-md">
              How do you guarantee fixed pricing?
            </h3>
            <p>
              We lock in the price before construction starts. Every line item,
              every material, every labor cost is documented and agreed upon in
              writing.
            </p>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo 1"
                className="size-12"
              />
            </div>
            <h3 className="mb-3 font-bold md:mb-4 md:text-md">
              What if something unexpected happens?
            </h3>
            <p>
              We build contingency into the plan and communicate immediately if
              anything changes. You're never blindsided by costs.
            </p>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo 1"
                className="size-12"
              />
            </div>
            <h3 className="mb-3 font-bold md:mb-4 md:text-md">
              How do you meet deadlines?
            </h3>
            <p>
              We schedule in phases with clear milestones. Our track record is
              98% on-time delivery across 847 completed projects.
            </p>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo 1"
                className="size-12"
              />
            </div>
            <h3 className="mb-3 font-bold md:mb-4 md:text-md">
              Are you actually local to Bavaria?
            </h3>
            <p>
              We've been building in Bavaria for twenty years. We know the
              permits, the climate, the regulations, and the local inspectors.
            </p>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo 1"
                className="size-12"
              />
            </div>
            <h3 className="mb-3 font-bold md:mb-4 md:text-md">
              What areas do you serve?
            </h3>
            <p>
              We work throughout Bavaria, from Munich to Augsburg to Nuremberg
              and everywhere in between.
            </p>
          </div>
          <div className="flex w-full flex-col items-center text-center">
            <div className="rb-5 mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                alt="Relume logo 1"
                className="size-12"
              />
            </div>
            <h3 className="mb-3 font-bold md:mb-4 md:text-md">
              Can I see your certifications?
            </h3>
            <p>
              Yes. We hold certifications from Bavaria's leading building
              associations and display them proudly on our awards page.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">
            We're here to answer them. No question is too small.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Ask us" variant="secondary">
              Ask us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
