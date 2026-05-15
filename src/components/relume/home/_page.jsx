import React, { useEffect } from "react";
import { Header78 } from "./Header78";
import { VideoSection } from "./VideoSection";
import { Layout237 } from "./Layout237";
import { Stats17 } from "./Stats17";
import { Gallery9 } from "./Gallery9";
import { TeamSection } from "./TeamSection";
import { Faq14 } from "./Faq14";
import { SectionTransition } from "../../ui/SectionTransition";
import { gsap } from "../../../utils/gsap";

const NAVBAR_H = 72; // 4.5rem sticky navbar

export default function Page() {
  useEffect(() => {
    const hero = document.getElementById("hero-section");
    const video = document.getElementById("video-section");
    if (!hero || !video) return;

    let isAnimating = false;
    let postSnapLock = false;
    let idleTimer = null;

    // Release the post-snap lock only when the wheel/trackpad gesture
    // truly ends (no events for 180ms). Prevents trailing momentum
    // events from re-triggering a snap right after the animation.
    const armIdleRelease = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { postSnapLock = false; }, 180);
    };

    const snapTo = (y) => {
      isAnimating = true;
      gsap.to(window, {
        scrollTo: { y: Math.round(y), autoKill: false },
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
          postSnapLock = true;
          armIdleRelease();
        },
      });
    };

    const onWheel = (e) => {
      if (isAnimating) { e.preventDefault(); return; }

      if (postSnapLock) {
        e.preventDefault();
        armIdleRelease(); // keep extending while events keep coming
        return;
      }

      const scrollY = window.scrollY;
      const videoTarget = Math.round(video.offsetTop - NAVBAR_H);

      if (e.deltaY > 0 && scrollY < videoTarget - 20) {
        e.preventDefault();
        snapTo(videoTarget);
      } else if (e.deltaY < 0 && scrollY > 5 && scrollY <= videoTarget + 80) {
        e.preventDefault();
        snapTo(0);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div>
      <Header78 />

      <VideoSection />

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
