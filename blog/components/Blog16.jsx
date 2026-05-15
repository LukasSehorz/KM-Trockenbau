"use client";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog16() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Aktuell</p>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Neuste Beiträge
            </h1>
            <p className="md:text-md">Lesen Sie unsere aktuellsten Artikel</p>
          </div>
        </div>
        <Tabs defaultValue="view-all" className="flex flex-col justify-center">
          <TabsList className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center justify-start overflow-scroll pl-[5vw] md:mb-16 md:ml-0 md:w-full md:justify-center md:overflow-hidden md:pl-0">
            <TabsTrigger
              value="view-all"
              className="px-4 data-[state=active]:border data-[state=active]:border-border-primary data-[state=inactive]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-neutral-black"
            >
              Alle zeigen
            </TabsTrigger>
            <TabsTrigger
              value="category-one"
              className="px-4 data-[state=active]:border data-[state=active]:border-border-primary data-[state=inactive]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-neutral-black"
            >
              Sanierung
            </TabsTrigger>
            <TabsTrigger
              value="category-two"
              className="px-4 data-[state=active]:border data-[state=active]:border-border-primary data-[state=inactive]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-neutral-black"
            >
              7 min Lesezeit
            </TabsTrigger>
            <TabsTrigger
              value="category-three"
              className="px-4 data-[state=active]:border data-[state=active]:border-border-primary data-[state=inactive]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-neutral-black"
            >
              Alte Häuser richtig sanieren in Bayern
            </TabsTrigger>
            <TabsTrigger
              value="category-four"
              className="px-4 data-[state=active]:border data-[state=active]:border-border-primary data-[state=inactive]:border-transparent data-[state=active]:bg-transparent data-[state=active]:text-neutral-black"
            >
              Erfahren Sie, wie eine gute Sanierung Ihr Haus wertvoll macht.
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="view-all"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-1 md:gap-y-16 lg:grid-cols-2">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Finanzierung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      5 min Lesezeit
                    </h3>
                  </a>
                  <p>Baufinanzierung verstehen ohne Überraschungen</p>
                  <Button
                    title="Klare Antworten zu Krediten und Förderprogrammen für Ihr Projekt."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Klare Antworten zu Krediten und Förderprogrammen für Ihr
                    Projekt.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Planung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      6 min Lesezeit
                    </h3>
                  </a>
                  <p>Von der Idee zum Grundriss in Bayern</p>
                  <Button
                    title="Wie Sie Ihre Vorstellungen mit realistischen Plänen umsetzen."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Wie Sie Ihre Vorstellungen mit realistischen Plänen
                    umsetzen.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Trends</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      4 min Lesezeit
                    </h3>
                  </a>
                  <p>Nachhaltig bauen in Bayern heute</p>
                  <Button
                    title="Moderne Materialien und Methoden für langlebige Häuser."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Moderne Materialien und Methoden für langlebige Häuser.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">5 min read</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      Blog title heading will go here
                    </h3>
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim...
                  </p>
                  <Button
                    title="Read more"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="category-one"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-1 md:gap-y-16 lg:grid-cols-2">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Finanzierung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      5 min Lesezeit
                    </h3>
                  </a>
                  <p>Baufinanzierung verstehen ohne Überraschungen</p>
                  <Button
                    title="Klare Antworten zu Krediten und Förderprogrammen für Ihr Projekt."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Klare Antworten zu Krediten und Förderprogrammen für Ihr
                    Projekt.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Planung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      6 min Lesezeit
                    </h3>
                  </a>
                  <p>Von der Idee zum Grundriss in Bayern</p>
                  <Button
                    title="Wie Sie Ihre Vorstellungen mit realistischen Plänen umsetzen."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Wie Sie Ihre Vorstellungen mit realistischen Plänen
                    umsetzen.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Trends</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      4 min Lesezeit
                    </h3>
                  </a>
                  <p>Nachhaltig bauen in Bayern heute</p>
                  <Button
                    title="Moderne Materialien und Methoden für langlebige Häuser."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Moderne Materialien und Methoden für langlebige Häuser.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">5 min read</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      Blog title heading will go here
                    </h3>
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim...
                  </p>
                  <Button
                    title="Read more"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="category-two"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-1 md:gap-y-16 lg:grid-cols-2">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Finanzierung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      5 min Lesezeit
                    </h3>
                  </a>
                  <p>Baufinanzierung verstehen ohne Überraschungen</p>
                  <Button
                    title="Klare Antworten zu Krediten und Förderprogrammen für Ihr Projekt."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Klare Antworten zu Krediten und Förderprogrammen für Ihr
                    Projekt.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Planung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      6 min Lesezeit
                    </h3>
                  </a>
                  <p>Von der Idee zum Grundriss in Bayern</p>
                  <Button
                    title="Wie Sie Ihre Vorstellungen mit realistischen Plänen umsetzen."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Wie Sie Ihre Vorstellungen mit realistischen Plänen
                    umsetzen.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Trends</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      4 min Lesezeit
                    </h3>
                  </a>
                  <p>Nachhaltig bauen in Bayern heute</p>
                  <Button
                    title="Moderne Materialien und Methoden für langlebige Häuser."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Moderne Materialien und Methoden für langlebige Häuser.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">5 min read</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      Blog title heading will go here
                    </h3>
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim...
                  </p>
                  <Button
                    title="Read more"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="category-three"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-1 md:gap-y-16 lg:grid-cols-2">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Finanzierung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      5 min Lesezeit
                    </h3>
                  </a>
                  <p>Baufinanzierung verstehen ohne Überraschungen</p>
                  <Button
                    title="Klare Antworten zu Krediten und Förderprogrammen für Ihr Projekt."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Klare Antworten zu Krediten und Förderprogrammen für Ihr
                    Projekt.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Planung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      6 min Lesezeit
                    </h3>
                  </a>
                  <p>Von der Idee zum Grundriss in Bayern</p>
                  <Button
                    title="Wie Sie Ihre Vorstellungen mit realistischen Plänen umsetzen."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Wie Sie Ihre Vorstellungen mit realistischen Plänen
                    umsetzen.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Trends</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      4 min Lesezeit
                    </h3>
                  </a>
                  <p>Nachhaltig bauen in Bayern heute</p>
                  <Button
                    title="Moderne Materialien und Methoden für langlebige Häuser."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Moderne Materialien und Methoden für langlebige Häuser.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">5 min read</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      Blog title heading will go here
                    </h3>
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim...
                  </p>
                  <Button
                    title="Read more"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="category-four"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-1 md:gap-y-16 lg:grid-cols-2">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Finanzierung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      5 min Lesezeit
                    </h3>
                  </a>
                  <p>Baufinanzierung verstehen ohne Überraschungen</p>
                  <Button
                    title="Klare Antworten zu Krediten und Förderprogrammen für Ihr Projekt."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Klare Antworten zu Krediten und Förderprogrammen für Ihr
                    Projekt.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Planung</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      6 min Lesezeit
                    </h3>
                  </a>
                  <p>Von der Idee zum Grundriss in Bayern</p>
                  <Button
                    title="Wie Sie Ihre Vorstellungen mit realistischen Plänen umsetzen."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Wie Sie Ihre Vorstellungen mit realistischen Plänen
                    umsetzen.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">Trends</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      4 min Lesezeit
                    </h3>
                  </a>
                  <p>Nachhaltig bauen in Bayern heute</p>
                  <Button
                    title="Moderne Materialien und Methoden für langlebige Häuser."
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Moderne Materialien und Methoden für langlebige Häuser.
                  </Button>
                </div>
              </div>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4">
                <a href="#" className="w-full">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                    alt="Relume placeholder image"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <div className="flex h-full flex-col items-start justify-center">
                  <div className="rb-4 mb-4 flex w-full items-center justify-start">
                    <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                      Mehr lesen
                    </p>
                    <p className="inline text-sm font-semibold">5 min read</p>
                  </div>
                  <a className="mb-2" href="#">
                    <h3 className="text-xl font-bold md:text-2xl">
                      Blog title heading will go here
                    </h3>
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim...
                  </p>
                  <Button
                    title="Read more"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="mt-6 flex items-center justify-center gap-x-2"
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
