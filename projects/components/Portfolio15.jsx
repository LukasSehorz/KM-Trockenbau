"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Portfolio15() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Gebaut</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Completed projects across Bavaria
          </h2>
          <p className="md:text-md">
            Real work. Real results. Real Bavarian craftsmanship.
          </p>
        </div>
        <div>
          <article className="grid grid-cols-1 items-center gap-x-12 gap-y-6 border-t border-border-primary py-8 md:grid-cols-2 md:gap-y-0 lg:gap-x-[4.9rem] lg:py-12">
            <div>
              <h3 className="mb-2 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                <a href="#">Müller residence, Munich</a>
              </h3>
              <p>
                Modern family home with integrated workshop and guest quarters
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    New build
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Munich
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    2023
                  </a>
                </li>
              </ul>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 md:mt-8"
              >
                <a href="#">View project</a>
              </Button>
            </div>
            <div>
              <a href="#" className="flex aspect-[4/3] w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="w-full object-cover"
                />
              </a>
            </div>
          </article>
          <article className="grid grid-cols-1 items-center gap-x-12 gap-y-6 border-t border-border-primary py-8 md:grid-cols-2 md:gap-y-0 lg:gap-x-[4.9rem] lg:py-12">
            <div>
              <h3 className="mb-2 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                <a href="#">Augsburg farmhouse renovation</a>
              </h3>
              <p>
                Historic property restored with modern systems and expanded
                living space
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Renovation
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Augsburg
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    2023
                  </a>
                </li>
              </ul>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 md:mt-8"
              >
                <a href="#">View project</a>
              </Button>
            </div>
            <div>
              <a href="#" className="flex aspect-[4/3] w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="w-full object-cover"
                />
              </a>
            </div>
          </article>
          <article className="grid grid-cols-1 items-center gap-x-12 gap-y-6 border-t border-border-primary py-8 md:grid-cols-2 md:gap-y-0 lg:gap-x-[4.9rem] lg:py-12">
            <div>
              <h3 className="mb-2 text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                <a href="#">Ingolstadt townhouse</a>
              </h3>
              <p>
                Contemporary urban residence with basement garage and rooftop
                terrace
              </p>
              <ul className="mt-3 flex flex-wrap gap-2 md:mt-4">
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    New build
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    Ingolstadt
                  </a>
                </li>
                <li className="flex">
                  <a
                    href="#"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    2022
                  </a>
                </li>
              </ul>
              <Button
                title="View project"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
                className="mt-6 md:mt-8"
              >
                <a href="#">View project</a>
              </Button>
            </div>
            <div>
              <a href="#" className="flex aspect-[4/3] w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                  className="w-full object-cover"
                />
              </a>
            </div>
          </article>
        </div>
        <div className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button title="View all" variant="secondary" size="primary">
            View all
          </Button>
        </div>
      </div>
    </section>
  );
}
