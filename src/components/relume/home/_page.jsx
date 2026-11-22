import React from "react";
import { Header78 } from "./Header78";
import { Layout237 } from "./Layout237";
import { Stats17 } from "./Stats17";
import { Gallery9 } from "./Gallery9";
import { TeamSection } from "./TeamSection";
import { Faq14 } from "./Faq14";
import { SectionTransition } from "../../ui/SectionTransition";

export default function Page() {
  return (
    <div>
      <Header78 />

      {/* dark → light */}
      <SectionTransition light />

      <Layout237 />

      {/* light → dark */}
      <SectionTransition />

      <Stats17 />

      {/* dark → light */}
      <SectionTransition light />

      <Gallery9 />

      <TeamSection />

      <Faq14 />
    </div>
  );
}
