"use client";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React, { useState } from "react";
import { RxChevronRight } from "react-icons/rx";

const useTabAnimation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const isTabActive = (index) => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
    return index <= activeIndex;
  };

  const progressWidth = () => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
    return `${(100 / (tabs.length * 2)) * (activeIndex * 2 + 1)}%`;
  };

  const circleClassName = (index) => {
    return `z-20 flex size-[0.9375rem] flex-none items-center justify-center rounded-full shadow-[0_0_0_8px_white] transition-colors duration-300 ${
      isTabActive(index) ? "bg-neutral-black" : "bg-neutral-light"
    }`;
  };

  const triggerClassName = (index) => {
    return `relative flex flex-1 flex-col items-center justify-center gap-2 border-0 px-0 transition-colors duration-300 data-[state=active]:bg-transparent ${
      isTabActive(index)
        ? "data-[state=active]:text-text-primary"
        : "text-neutral-light"
    }`;
  };

  return {
    activeTab,
    setActiveTab,
    progressWidth,
    circleClassName,
    triggerClassName,
  };
};

export function Timeline15() {
  const tabAnimation = useTabAnimation({
    tabs: [
      {
        value: "tab-one",
        trigger: "Date",
        content: {
          date: "Date",
          heading: "Long heading is what you see here in this feature section",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
          buttons: [
            { title: "Button", variant: "secondary" },
            {
              title: "Button",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          ],
          image: {
            src: "/images/hero-aerial-construction.jpg",
            alt: "Relume placeholder image 1",
          },
        },
      },
      {
        value: "tab-two",
        trigger: "Date",
        content: {
          date: "Date",
          heading: "Long heading is what you see here in this feature section",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
          buttons: [
            { title: "Button", variant: "secondary" },
            {
              title: "Button",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          ],
          image: {
            src: "/images/craftsmen-stone-facade.jpg",
            alt: "Relume placeholder image 2",
          },
        },
      },
      {
        value: "tab-three",
        trigger: "Date",
        content: {
          date: "Date",
          heading: "Long heading is what you see here in this feature section",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
          buttons: [
            { title: "Button", variant: "secondary" },
            {
              title: "Button",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          ],
          image: {
            src: "/images/villa-twilight.jpg",
            alt: "Relume placeholder image 3",
          },
        },
      },
      {
        value: "tab-four",
        trigger: "Date",
        content: {
          date: "Date",
          heading: "Long heading is what you see here in this feature section",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
          buttons: [
            { title: "Button", variant: "secondary" },
            {
              title: "Button",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          ],
          image: {
            src: "/images/interior-oak-concrete.jpg",
            alt: "Relume placeholder image 4",
          },
        },
      },
      {
        value: "tab-five",
        trigger: "Date",
        content: {
          date: "Date",
          heading: "Long heading is what you see here in this feature section",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
          buttons: [
            { title: "Button", variant: "secondary" },
            {
              title: "Button",
              variant: "link",
              size: "link",
              iconRight: <RxChevronRight />,
            },
          ],
          image: {
            src: "/images/team-blueprints.jpg",
            alt: "Relume placeholder image 5",
          },
        },
      },
    ],
  });
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative">
        <div
          className="absolute bottom-[99px] z-10 h-[3px] bg-neutral-black transition-[width] duration-300 md:bottom-[3.5625rem]"
          style={{ width: tabAnimation.progressWidth() }}
        />
        <Tabs
          defaultValue="tab-one"
          onValueChange={tabAnimation.setActiveTab}
          className="relative flex flex-col"
        >
          <TabsContent
            value="tab-one"
            className="grid grid-cols-1 gap-x-12 gap-y-12 data-[state=active]:animate-tabs md:grid-cols-2 md:items-center md:gap-y-16 lg:gap-x-20"
          >
            <div>
              <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Week 1
              </h3>
              <h4 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Consultation, site visit, and initial requirements
              </h4>
              <p className="md:text-md">
                You meet with our team. We assess the property, discuss your
                goals, and establish the project scope.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
            <div>
              <img
                src="/images/munich-residential.jpg"
                alt="Relume placeholder image 1"
                className="w-full object-cover"
              />
            </div>
          </TabsContent>
          <TabsContent
            value="tab-two"
            className="grid grid-cols-1 gap-x-12 gap-y-12 data-[state=active]:animate-tabs md:grid-cols-2 md:items-center md:gap-y-16 lg:gap-x-20"
          >
            <div>
              <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Weeks 2–3
              </h3>
              <h4 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Design development and detailed planning
              </h4>
              <p className="md:text-md">
                Our architects create detailed drawings. We refine every detail
                until you approve the final design.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
            <div>
              <img
                src="/images/hero-aerial-construction.jpg"
                alt="Relume placeholder image 2"
                className="w-full object-cover"
              />
            </div>
          </TabsContent>
          <TabsContent
            value="tab-three"
            className="grid grid-cols-1 gap-x-12 gap-y-12 data-[state=active]:animate-tabs md:grid-cols-2 md:items-center md:gap-y-16 lg:gap-x-20"
          >
            <div>
              <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Week 4
              </h3>
              <h4 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fixed-price quote and contract signature
              </h4>
              <p className="md:text-md">
                You receive a binding quote with every cost itemized. No
                surprises later. You sign the contract.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
            <div>
              <img
                src="/images/craftsmen-stone-facade.jpg"
                alt="Relume placeholder image 3"
                className="w-full object-cover"
              />
            </div>
          </TabsContent>
          <TabsContent
            value="tab-four"
            className="grid grid-cols-1 gap-x-12 gap-y-12 data-[state=active]:animate-tabs md:grid-cols-2 md:items-center md:gap-y-16 lg:gap-x-20"
          >
            <div>
              <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Weeks 5–8
              </h3>
              <h4 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Permits and regulatory approvals
              </h4>
              <p className="md:text-md">
                We submit all required documentation to Bavarian authorities. We
                manage the approval process.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
            <div>
              <img
                src="/images/villa-twilight.jpg"
                alt="Relume placeholder image 4"
                className="w-full object-cover"
              />
            </div>
          </TabsContent>
          <TabsContent
            value="tab-five"
            className="grid grid-cols-1 gap-x-12 gap-y-12 data-[state=active]:animate-tabs md:grid-cols-2 md:items-center md:gap-y-16 lg:gap-x-20"
          >
            <div>
              <h3 className="mb-3 text-4xl font-bold leading-[1.2] md:mb-4 md:text-5xl lg:text-6xl">
                Weeks 9+
              </h3>
              <h4 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Construction begins with scheduled milestones
              </h4>
              <p className="md:text-md">
                Work starts on the agreed date. You track progress through our
                digital dashboard and weekly reports.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
            <div>
              <img
                src="/images/interior-oak-concrete.jpg"
                alt="Relume placeholder image 5"
                className="w-full object-cover"
              />
            </div>
          </TabsContent>
          <TabsList className="no-scrollbar relative mb-12 ml-[-5vw] mt-16 flex w-screen items-center justify-start border-b border-b-transparent px-[5vw] md:mb-0 md:ml-0 md:w-auto md:justify-between md:px-0">
            <TabsTrigger
              value="tab-one"
              className={tabAnimation.triggerClassName(0)}
            >
              <div className="absolute left-0 top-3.5 z-20 h-[6px] w-16 bg-gradient-to-l from-transparent to-background-primary" />
              <div className="flex w-full items-center">
                <div className="h-[3px] w-full bg-neutral-lighter" />
                <div className={tabAnimation.circleClassName(0)} />
                <div className="h-[3px] w-full bg-neutral-lighter" />
              </div>
              <span className="text-xl font-bold md:text-2xl">Weeks 9+</span>
            </TabsTrigger>
            <TabsTrigger
              value="tab-two"
              className={tabAnimation.triggerClassName(1)}
            >
              <div className="flex w-full items-center">
                <div className="h-[3px] w-full bg-neutral-lighter" />
                <div className={tabAnimation.circleClassName(1)} />
                <div className="h-[3px] w-full bg-neutral-lighter" />
              </div>
              <span className="text-xl font-bold md:text-2xl">Weeks 9+</span>
            </TabsTrigger>
            <TabsTrigger
              value="tab-three"
              className={tabAnimation.triggerClassName(2)}
            >
              <div className="flex w-full items-center">
                <div className="h-[3px] w-full bg-neutral-lighter" />
                <div className={tabAnimation.circleClassName(2)} />
                <div className="h-[3px] w-full bg-neutral-lighter" />
              </div>
              <span className="text-xl font-bold md:text-2xl">Weeks 9+</span>
            </TabsTrigger>
            <TabsTrigger
              value="tab-four"
              className={tabAnimation.triggerClassName(3)}
            >
              <div className="flex w-full items-center">
                <div className="h-[3px] w-full bg-neutral-lighter" />
                <div className={tabAnimation.circleClassName(3)} />
                <div className="h-[3px] w-full bg-neutral-lighter" />
              </div>
              <span className="text-xl font-bold md:text-2xl">Weeks 9+</span>
            </TabsTrigger>
            <TabsTrigger
              value="tab-five"
              className={tabAnimation.triggerClassName(4)}
            >
              <div className="flex w-full items-center">
                <div className="h-[3px] w-full bg-neutral-lighter" />
                <div className={tabAnimation.circleClassName(4)} />
                <div className="h-[3px] w-full bg-neutral-lighter" />
              </div>
              <span className="text-xl font-bold md:text-2xl">Weeks 9+</span>
              <div className="absolute right-0 top-3.5 z-0 h-2 w-16 bg-gradient-to-r from-transparent to-background-primary" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}
