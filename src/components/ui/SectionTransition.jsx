import { useRef, useEffect } from "react";
import { gsap } from "../../utils/gsap";

/**
 * Elegant animated divider between page sections.
 * Two gold lines grow outward from a central diamond.
 * Triggered once when the element enters the viewport.
 *
 * Props:
 *   light  – use darker gold tone (for placement on light backgrounds)
 */
export function SectionTransition({ light = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          once: true,
        },
      });

      // Lines grow outward from centre
      tl.from(".st-line", {
        scaleX: 0,
        transformOrigin: "center center",
        duration: 1.3,
        ease: "power3.inOut",
        stagger: 0,
      }, 0);

      // Diamond pops in with spring
      tl.from(".st-diamond", {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: "back.out(2.5)",
      }, 0.55);
    }, ref);

    return () => ctx.revert();
  }, []);

  // Light theme: both variants use brand-blue ink against the off-white canvas;
  // `light` is a quieter version for subtle transitions, default has more presence.
  const colour = light
    ? "bg-gradient-to-r from-transparent via-hoser-gold/15 to-transparent"
    : "bg-gradient-to-r from-transparent via-hoser-gold/40 to-transparent";
  const diamond = light ? "bg-hoser-gold/30" : "bg-hoser-gold/70";

  return (
    <div
      ref={ref}
      className="relative z-10 flex items-center px-[5%] py-5"
      aria-hidden="true"
    >
      <div className={`st-line h-px flex-1 ${colour}`} />
      <div className={`st-diamond mx-5 h-[7px] w-[7px] rotate-45 ${diamond}`} />
      <div className={`st-line h-px flex-1 ${colour}`} />
    </div>
  );
}
