"use client";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React from "react";
import { BiCheck } from "react-icons/bi";

export function Pricing27() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
          <p className="mb-3 font-semibold md:mb-4">Comparison</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            How we differ
          </h1>
          <p className="md:text-md">
            See what sets our fixed-price model apart from traditional
            construction
          </p>
        </div>
        <div className="w-full">
          <Tabs defaultValue="monthly">
            <TabsList className="mx-auto mb-12 flex w-fit md:mb-20">
              <TabsTrigger value="monthly">New build</TabsTrigger>
              <TabsTrigger value="yearly">Renovation</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <div className="grid grid-cols-3 gap-x-4 bg-white md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-x-8">
                <div className="hidden md:block" />
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                      Fixed price
                    </h2>
                    <div className="my-3 md:my-4">
                      <p className="text-2xl font-bold leading-[1.2] sm:text-6xl md:text-9xl lg:text-10xl">
                        €85,000
                      </p>
                    </div>
                    <p>All-in cost locked before work begins</p>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      title="Request quote"
                      className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                    >
                      Request quote
                    </Button>
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                      Traditional pricing
                    </h2>
                    <div className="my-3 md:my-4">
                      <p className="text-2xl font-bold leading-[1.2] sm:text-6xl md:text-9xl lg:text-10xl">
                        €85,000+
                      </p>
                    </div>
                    <p>Cost can shift during construction</p>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      title="Request quote"
                      className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                    >
                      Request quote
                    </Button>
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                      Flexible scope
                    </h2>
                    <div className="my-3 md:my-4">
                      <p className="text-2xl font-bold leading-[1.2] sm:text-6xl md:text-9xl lg:text-10xl">
                        Custom
                      </p>
                    </div>
                    <p>Varies by project</p>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      title="Request quote"
                      className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                    >
                      Request quote
                    </Button>
                  </div>
                </div>
              </div>
              <h3 className="mt-8 py-5 text-md font-bold leading-[1.4] md:text-xl">
                What's included
              </h3>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Materials, labor, permits
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Yes
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Yes
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Yes
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Project management
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Often billed separately
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Hidden fees possible
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Change orders
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <h3 className="mt-8 py-5 text-md font-bold leading-[1.4] md:text-xl">
                Documented and priced upfront
              </h3>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Timeline certainty
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Yes
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  No
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  No
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Delays can add cost
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Warranty coverage
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  One year included
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Varies
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <h3 className="mt-8 py-5 text-md font-bold leading-[1.4] md:text-xl">
                Often limited
              </h3>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Renovation work
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Fixed price
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  €45,000
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  All-in cost locked before work begins
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Request quote
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Traditional pricing
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  €45,000+
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Cost can shift during construction
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="rt-8 mt-8 grid grid-cols-3 gap-x-4 bg-white md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-x-8">
                <div className="hidden md:block" />
                <Button
                  title="Custom"
                  className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                >
                  Custom
                </Button>
                <Button
                  title="Custom"
                  className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                >
                  Custom
                </Button>
                <Button
                  title="Custom"
                  className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                >
                  Custom
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="yearly">
              <div className="grid grid-cols-3 gap-x-4 bg-white md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-x-8">
                <div className="hidden md:block" />
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                      Varies by project
                    </h2>
                    <div className="my-3 md:my-4">
                      <p className="text-2xl font-bold leading-[1.2] sm:text-6xl md:text-9xl lg:text-10xl">
                        Request quote
                      </p>
                      <p className="font-semibold">What's included</p>
                    </div>
                    <p>Assessment, materials, labor</p>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      title="Yes"
                      className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                    >
                      Yes
                    </Button>
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                      Yes
                    </h2>
                    <div className="my-3 md:my-4">
                      <p className="text-2xl font-bold leading-[1.2] sm:text-6xl md:text-9xl lg:text-10xl">
                        Yes
                      </p>
                      <p className="font-semibold">Project management</p>
                    </div>
                    <p>Often billed separately</p>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      title="Hidden fees possible"
                      className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                    >
                      Hidden fees possible
                    </Button>
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between text-center">
                  <div>
                    <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                      Change orders
                    </h2>
                    <div className="my-3 md:my-4">
                      <p className="text-2xl font-bold leading-[1.2] sm:text-6xl md:text-9xl lg:text-10xl">
                        Documented and priced upfront
                      </p>
                      <p className="font-semibold">Timeline certainty</p>
                    </div>
                    <p>Yes</p>
                  </div>
                  <div className="mt-6 md:mt-8">
                    <Button
                      title="No"
                      className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
              <h3 className="mt-8 py-5 text-md font-bold leading-[1.4] md:text-xl">
                No
              </h3>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Delays can add cost
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Warranty coverage
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  One year included
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Varies
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Often limited
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Extension or addition
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Fixed price
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  €55,000
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <h3 className="mt-8 py-5 text-md font-bold leading-[1.4] md:text-xl">
                All-in cost locked before work begins
              </h3>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Request quote
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Traditional pricing
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  €55,000+
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Cost can shift during construction
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Request quote
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Flexible scope
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Custom
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Varies by project
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <h3 className="mt-8 py-5 text-md font-bold leading-[1.4] md:text-xl">
                Request quote
              </h3>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  What's included
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Design, materials, labor, permits
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Yes
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  Yes
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Yes
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Project management
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Often billed separately
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="grid grid-cols-3 odd:bg-background-secondary md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <p className="col-span-3 row-span-1 p-4 md:col-span-1 md:px-6 md:py-4">
                  Hidden fees possible
                </p>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6"></div>
                <div className="flex items-center justify-center px-4 py-4 text-center font-semibold md:px-6">
                  <BiCheck className="size-6" />
                </div>
              </div>
              <div className="rt-8 mt-8 grid grid-cols-3 gap-x-4 bg-white md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-x-8">
                <div className="hidden md:block" />
                <Button
                  title="Request quote"
                  className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                >
                  Request quote
                </Button>
                <Button
                  title="Request quote"
                  className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                >
                  Request quote
                </Button>
                <Button
                  title="Request quote"
                  className="w-full whitespace-normal px-3 py-1 sm:px-4 sm:py-3"
                >
                  Request quote
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
