import React, { useEffect, useState } from "react";
import { ProzessHero } from "./ProzessHero";
import { ProzessPath } from "./ProzessPath";
import { ProzessPathMobile } from "./ProzessPathMobile";
import { ProzessCTA } from "./ProzessCTA";

const MOBILE_QUERY = "(max-width: 991px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return isMobile;
}

export default function Page() {
  const isMobile = useIsMobile();

  return (
    <div>
      <ProzessHero />
      {isMobile ? <ProzessPathMobile /> : <ProzessPath />}
      <ProzessCTA />
    </div>
  );
}
