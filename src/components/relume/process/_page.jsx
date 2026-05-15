import React from "react";
import { ProzessHero } from "./ProzessHero";
import { ProzessPath } from "./ProzessPath";
import { ProzessCTA } from "./ProzessCTA";

export default function Page() {
  return (
    <div>
      <ProzessHero />
      <ProzessPath />
      <ProzessCTA />
    </div>
  );
}
