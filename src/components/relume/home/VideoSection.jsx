"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const keyFacts = [
  {
    lead: "12–18",
    leadUnit: "Monate",
    desc: "Vom ersten Entwurf bis zur Schlüsselübergabe.",
  },
  {
    lead: "1",
    leadUnit: "Ansprechpartner",
    desc: "Statt zehn Fachgewerken – eine Stimme.",
  },
  {
    lead: "Festpreis",
    leadUnit: "garantiert",
    desc: "Keine Nachträge, keine Überraschungen.",
  },
  {
    lead: "100%",
    leadUnit: "eigenes Personal",
    desc: "Ausgebildete Maurer, Maler, Zimmerer.",
  },
];

export function VideoSection() {
  const sectionRef = useRef(null);
  const clipRef = useRef(null);

  // ── Scroll-driven choreography ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hide the keyfacts initially — they fade in mid-scroll
      gsap.set(".vs-keyfact", { opacity: 0, y: 40 });
      gsap.set(".vs-keyfact-eyebrow", { opacity: 0, y: 20 });
      gsap.set(".vs-keyfact-divider", { scaleX: 0 });

      // Force GPU compositing on the heavy elements
      gsap.set([clipRef.current, ".vs-video"], { force3D: true });

      // ── Entry: Portal clip-path + Ken Burns combined into ONE timeline ──
      // scrub: 0.08 keeps subtle smoothing for natural scrolling without
      // creating visible lag during programmatic snap from hero.
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 12%",
          scrub: 0.08,
        },
      });

      entryTl.fromTo(clipRef.current,
        { clipPath: "inset(38% 28% 38% 28%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", force3D: true },
        0
      );

      entryTl.fromTo(".vs-video",
        { scale: 1.18 },
        { scale: 1, ease: "none", force3D: true },
        0
      );

      // ── Phase 2: Title text mask reveal ──────────────────────────────
      // Trigger near snap target so reveal plays AFTER the page settles —
      // not mid-snap, where it would compete with the scrolling animation.
      gsap.from(".vs-line-inner", {
        y: "115%",
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 8%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".vs-divider", {
        scaleX: 0,
        transformOrigin: "center center",
        duration: 0.65,
        ease: "power3.inOut",
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 8%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Master end-transition timeline (scrubbed) ────────────────────
      const endTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // 0.0 - 0.35 → video plays freely

      // 0.35 - 0.55 → title fades, video zooms in slightly, image brightens
      endTl.to(".vs-text-overlay", {
        opacity: 0,
        ease: "power2.in",
        duration: 0.18,
      }, 0.35);

      endTl.to(".vs-video", {
        scale: 1.06,
        ease: "power2.inOut",
        duration: 0.4,
      }, 0.35);

      endTl.to(".vs-dark-overlay", {
        opacity: 0.32,
        ease: "power2.inOut",
        duration: 0.35,
      }, 0.38);

      endTl.fromTo(".vs-vignette",
        { opacity: 0 },
        { opacity: 0.6, ease: "power2.in", duration: 0.4 },
        0.45
      );

      // 0.5 - 0.55 → eyebrow + divider appear
      endTl.to(".vs-keyfact-eyebrow", {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.18,
      }, 0.5);

      endTl.to(".vs-keyfact-divider", {
        scaleX: 1,
        ease: "power3.out",
        duration: 0.22,
      }, 0.52);

      // 0.55 - 0.95 → keyfacts staggered slide-up
      endTl.to(".vs-keyfact", {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        ease: "power3.out",
        duration: 0.3,
      }, 0.56);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="video-section"
      ref={sectionRef}
      className="relative"
      style={{ height: "280vh", backgroundColor: "#FDFCF8" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "#FDFCF8" }}>

        {/* Explicit light background layer behind everything */}
        <div className="absolute inset-0" style={{ backgroundColor: "#FDFCF8", zIndex: 0 }} />

        {/* Clip-path wrapper for the entry portal effect */}
        <div
          ref={clipRef}
          className="absolute inset-0"
          style={{ willChange: "clip-path", zIndex: 1 }}
        >
          <img
            src="/images/zwei-bauarbeiter.jpg"
            alt="Zwei Bauarbeiter mit Bauplänen"
            className="vs-video absolute inset-0 h-full w-full object-cover"
            style={{ willChange: "transform" }}
          />

          <div
            className="vs-dark-overlay absolute inset-0 bg-black"
            style={{ opacity: 0.55 }}
          />

          <div
            className="vs-vignette pointer-events-none absolute inset-0"
            style={{
              opacity: 0,
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        {/* Title overlay — fades out before keyfacts arrive */}
        <div className="vs-text-overlay absolute inset-0 z-10 flex flex-col items-center justify-center px-[5%] text-center">
          <div
            className="flex flex-col items-center gap-3 font-serif leading-[1.25] text-white"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 4rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.9)",
            }}
          >
            <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="vs-line-inner block">
                Von der{" "}
                <strong
                  className="font-bold"
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "rgba(240, 112, 64, 0.65)",
                    textUnderlineOffset: "6px",
                    textDecorationThickness: "2px",
                  }}
                >
                  Bauskizze auf dem Schreibtisch
                </strong>
              </span>
            </div>
            <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="vs-line-inner block">
                bis zum{" "}
                <strong
                  className="font-bold"
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "rgba(240, 112, 64, 0.65)",
                    textUnderlineOffset: "6px",
                    textDecorationThickness: "2px",
                  }}
                >
                  fertigen Gebäude.
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Key facts overlay — appears AFTER the title fades */}
        <div className="absolute inset-0 z-20 flex items-center px-[5%]">
          <div className="container">
            <p className="vs-keyfact-eyebrow mb-3 font-body text-sm font-semibold uppercase tracking-[0.28em] text-white">
              So bauen wir
            </p>
            <div
              className="vs-keyfact-divider mb-12 h-px w-16 bg-white/60"
              style={{ transformOrigin: "left center" }}
            />

            <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-14 lg:gap-x-20">
              {keyFacts.map((f) => (
                <div
                  key={f.lead + f.leadUnit}
                  className="vs-keyfact relative pl-6"
                >
                  <div className="absolute left-0 top-0 h-full w-px bg-white/45" />

                  <div className="mb-2 flex items-baseline gap-3">
                    <span
                      className="font-heading font-bold leading-none tracking-tight text-white"
                      style={{
                        fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                        textShadow: "0 2px 24px rgba(0,0,0,0.7)",
                      }}
                    >
                      {f.lead}
                    </span>
                    <span
                      className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-white/85 md:text-base"
                    >
                      {f.leadUnit}
                    </span>
                  </div>
                  <p
                    className="font-serif italic text-white/70 md:text-lg"
                    style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
