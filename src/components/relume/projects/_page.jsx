import React from "react";
import { Portfolio15 } from "./Portfolio15";
import { Stats20 } from "./Stats20";
import { Gallery22 } from "./Gallery22";
import { Testimonial6 } from "./Testimonial6";

export default function Page() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/projekte-bayern.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Portfolio15 />
      <Stats20 />
      <Gallery22 />
      <Testimonial6 />
    </div>
  );
}
