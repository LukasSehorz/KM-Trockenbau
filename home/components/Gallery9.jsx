"use client";

import React from "react";

export function Gallery9() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Recent work
          </h2>
          <p className="md:text-md">
            Built in Bavaria. Finished on time. Every single one.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-2 grid-rows-2 gap-6 md:auto-cols-auto md:grid-cols-[2fr_1fr_1fr] md:gap-8">
          <a
            href="#"
            className="inline-block size-full col-start-1 col-end-2 row-start-1 row-end-3"
          >
            <div className="size-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="aspect-square size-full object-cover"
              />
            </div>
          </a>
          <a href="#" className="inline-block size-full">
            <div className="size-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 2"
                className="aspect-square size-full object-cover"
              />
            </div>
          </a>
          <a href="#" className="inline-block size-full">
            <div className="size-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 3"
                className="aspect-square size-full object-cover"
              />
            </div>
          </a>
          <a href="#" className="inline-block size-full">
            <div className="size-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 4"
                className="aspect-square size-full object-cover"
              />
            </div>
          </a>
          <a href="#" className="inline-block size-full">
            <div className="size-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 5"
                className="aspect-square size-full object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
