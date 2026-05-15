"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiLogoDribbble, BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export function Team5() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Team</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            The people behind the work
          </h2>
          <p className="md:text-md">
            Experienced craftsmen and project managers who know Bavaria
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="/images/hero-aerial-construction.jpg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">Klaus Müller</h5>
              <h6 className="md:text-md">Founding director</h6>
            </div>
            <p>
              Twenty-eight years building homes across Bavaria. Knows every
              inspector and supplier from Munich to Augsburg.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="/images/craftsmen-stone-facade.jpg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">Christian Wendelborn</h5>
              <h6 className="md:text-md">Project manager</h6>
            </div>
            <p>
              Manages timelines and coordinates trades with military precision.
              Clients trust her because she delivers what she promises.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="/images/villa-twilight.jpg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">Stefan Bauer</h5>
              <h6 className="md:text-md">Master carpenter</h6>
            </div>
            <p>
              Specializes in renovation and restoration. Understands old
              Bavarian homes and how to preserve their character.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="/images/interior-oak-concrete.jpg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">
                Petra Hoffmann
              </h5>
              <h6 className="md:text-md">Architect</h6>
            </div>
            <p>
              Designs new builds and extensions that fit the landscape and local
              building traditions. Certified in energy efficiency.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="/images/team-blueprints.jpg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">Thomas Weber</h5>
              <h6 className="md:text-md">Site foreman</h6>
            </div>
            <p>
              Oversees daily construction, quality control, and safety. Has
              trained every apprentice on our team.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
              <img
                src="/images/munich-residential.jpg"
                alt="Relume placeholder image 1"
                className="size-20 min-h-20 min-w-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-md font-semibold md:text-lg">
                Margot Schneider
              </h5>
              <h6 className="md:text-md">Permits coordinator</h6>
            </div>
            <p>
              Navigates local regulations and keeps projects moving through
              inspections without delay.
            </p>
            <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
              <a href="#">
                <BiLogoLinkedinSquare className="size-6" />
              </a>
              <a href="#">
                <FaXTwitter className="size-6 p-0.5" />
              </a>
              <a href="#">
                <BiLogoDribbble className="size-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            We're hiring
          </h4>
          <p className="md:text-md">Join a team that builds things that last</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <Button title="Open positions" variant="secondary">
              Open positions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
