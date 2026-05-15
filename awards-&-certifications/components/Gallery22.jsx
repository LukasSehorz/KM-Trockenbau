"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const useCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index) => () => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const dotClassName = (index) => {
    return clsx("mx-[3px] inline-block size-2 rounded-full", {
      "bg-black": current === index + 1,
      "bg-neutral-light": current !== index + 1,
    });
  };

  return { api, setApi, handleDotClick, dotClassName };
};

export function Gallery22() {
  const carouselState = useCarousel();
  return (
    <section
      id="relume"
      className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Earned trust
          </h2>
          <p className="md:text-md">Our team and our work speak plainly.</p>
        </div>
        <Carousel
          setApi={carouselState.setApi}
          opts={{ loop: true, align: "start" }}
        >
          <CarouselContent className="ml-0">
            <CarouselItem className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8">
              <div className="w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8">
              <div className="w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 2"
                  className="aspect-square size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8">
              <div className="w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 3"
                  className="aspect-square size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8">
              <div className="w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 4"
                  className="aspect-square size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8">
              <div className="w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 5"
                  className="aspect-square size-full object-cover"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/2 pl-0 pr-6 md:basis-1/3 md:pr-8">
              <div className="w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 6"
                  className="aspect-square size-full object-cover"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="rt-8 mt-8 flex items-center justify-between">
            <div className="mt-5 flex w-full items-start justify-start">
              <button
                onClick={carouselState.handleDotClick(0)}
                className={carouselState.dotClassName(0)}
              />
              <button
                onClick={carouselState.handleDotClick(1)}
                className={carouselState.dotClassName(1)}
              />
              <button
                onClick={carouselState.handleDotClick(2)}
                className={carouselState.dotClassName(2)}
              />
              <button
                onClick={carouselState.handleDotClick(3)}
                className={carouselState.dotClassName(3)}
              />
              <button
                onClick={carouselState.handleDotClick(4)}
                className={carouselState.dotClassName(4)}
              />
              <button
                onClick={carouselState.handleDotClick(5)}
                className={carouselState.dotClassName(5)}
              />
            </div>
            <div className="flex items-end justify-end gap-2 md:gap-4">
              <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0" />
              <CarouselNext className="static right-0 top-0 size-12 -translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
