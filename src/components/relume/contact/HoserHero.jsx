"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

// BAUUNTERNEHMEN letter indices each HOSER letter "owns"
// B A U U N T E R N E  H  M  E  N
// 0 1 2 3 4 5 6 7 8 9 10 11 12 13
const BAU = "BAUUNTERNEHMEN".split("");
const MAPPING = [
  [0, 1],           // H → B A
  [2, 3],           // O → U U
  [4, 5, 6],        // S → N T E
  [7, 8, 9],        // E → R N E
  [10, 11, 12, 13], // R → H M E N
];

const BAU_META = BAU.map((_, idx) => {
  for (let g = 0; g < MAPPING.length; g++) {
    const p = MAPPING[g].indexOf(idx);
    if (p !== -1) return { g, p, len: MAPPING[g].length };
  }
  return null;
});

// ── Cloud components ─────────────────────────────────────────────────────────

function CloudPuff({ w, h, left, top, blur, alpha }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: `rgba(255,255,255,${alpha})`,
        width: w,
        height: h,
        left,
        top,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

function CloudShape({ w }) {
  const h = w * 0.42;
  return (
    <div style={{ position: "relative", width: w, height: h * 1.35 }}>
      <CloudPuff w={w * 0.62} h={h * 0.72} left={w * 0.19} top={h * 0.28} blur={h * 0.10} alpha={0.95} />
      <CloudPuff w={w * 0.38} h={h * 0.65} left={0}        top={h * 0.30} blur={h * 0.12} alpha={0.90} />
      <CloudPuff w={w * 0.42} h={h * 0.68} left={w * 0.57} top={h * 0.25} blur={h * 0.10} alpha={0.92} />
      <CloudPuff w={w * 0.32} h={h * 0.60} left={w * 0.34} top={0}        blur={h * 0.08} alpha={0.88} />
      <CloudPuff w={w * 0.26} h={h * 0.50} left={w * 0.13} top={h * 0.10} blur={h * 0.10} alpha={0.82} />
      <CloudPuff w={w * 0.80} h={h * 0.28} left={w * 0.10} top={h * 0.88} blur={h * 0.15} alpha={0.65} />
    </div>
  );
}

function Cloud({ w, x, y, opacity, duration, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        animation: `hoserCloudDrift ${duration}s linear ${delay}s infinite`,
        willChange: "transform",
      }}
    >
      <CloudShape w={w} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function HoserHero() {
  const sectionRef = useRef(null);
  const turbRef = useRef(null);
  const rafRef = useRef(null);

  // Animate feTurbulence baseFrequency → cloth-in-wind effect
  useEffect(() => {
    let phase = 0;
    const tick = () => {
      phase += 0.003;
      if (turbRef.current) {
        const fx = (0.017 + Math.sin(phase) * 0.008).toFixed(5);
        const fy = (0.011 + Math.cos(phase * 0.62) * 0.005).toFixed(5);
        turbRef.current.setAttribute("baseFrequency", `${fx} ${fy}`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // GSAP: HOSER float + scroll-driven BAUUNTERNEHMEN reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Gentle perpetual float for HOSER
      gsap.to(".hoser-main-word", {
        y: 14,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Single scrub trigger for the full letter reveal
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          BAU.forEach((_, i) => {
            const meta = BAU_META[i];
            if (!meta) return;
            const segStart = meta.g / 5;
            const segEnd = (meta.g + 1) / 5;
            const litStart = segStart + (meta.p / meta.len) * (segEnd - segStart);
            const litEnd = segStart + ((meta.p + 1) / meta.len) * (segEnd - segStart);
            const lp = Math.max(0, Math.min(1,
              (p - litStart) / Math.max(0.001, litEnd - litStart)
            ));
            const el = section.querySelector(`.bau-inner-${i}`);
            if (el) {
              el.style.transform = `translateY(${((1 - lp) * 110).toFixed(1)}%)`;
              el.style.opacity = lp.toFixed(3);
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes hoserCloudDrift {
          from { transform: translateX(0); }
          to   { transform: translateX(-130vw); }
        }
        @keyframes hoserAlgaeFlow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <section ref={sectionRef} style={{ height: "250vh", position: "relative" }}>

        {/* ── Sticky viewport ── */}
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Sky */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            background: "linear-gradient(to bottom, #1c3d72 0%, #2d62b0 22%, #4e88cc 50%, #7fb4d8 74%, #c0d9ee 100%)",
          }} />

          {/* ── Back clouds (behind text, z:1) ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
            <Cloud w={540} x={2}   y={4}  opacity={0.78} duration={112} delay={0}   />
            <Cloud w={450} x={38}  y={1}  opacity={0.72} duration={96}  delay={-28} />
            <Cloud w={500} x={68}  y={7}  opacity={0.75} duration={106} delay={-54} />
            <Cloud w={370} x={-8}  y={19} opacity={0.62} duration={86}  delay={-16} />
            <Cloud w={420} x={52}  y={17} opacity={0.65} duration={122} delay={-72} />
          </div>

          {/* SVG cloth/algae displacement filter */}
          <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
            <defs>
              <filter id="hoser-cloth" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  ref={turbRef}
                  type="fractalNoise"
                  baseFrequency="0.017 0.011"
                  numOctaves="4"
                  seed="11"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="22"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* ── Text layer (z:2) ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>

            {/* HOSER — cloth/algae animated text */}
            <div
              className="hoser-main-word"
              style={{ filter: "url(#hoser-cloth)", willChange: "transform" }}
            >
              <h1 style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(14vw, 20vw, 22vw)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                margin: 0,
                padding: 0,
                background: [
                  "linear-gradient(135deg,",
                  "#3d7028 0%, #234e12 13%,",
                  "#5a9440 27%, #1c3e0c 40%,",
                  "#4a8030 54%, #6aaa48 67%,",
                  "#2a5518 80%, #4e8a34 92%,",
                  "#3a7024 100%)",
                ].join(" "),
                backgroundSize: "280% 280%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "#4a7c30",
                animation: "hoserAlgaeFlow 14s ease infinite",
                userSelect: "none",
              }}>
                HOSER
              </h1>
            </div>

            {/* BAUUNTERNEHMEN — letter-by-letter scroll reveal */}
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              marginTop: "0.05em",
              gap: "0.02em",
            }}>
              {BAU.map((letter, i) => (
                <div key={i} style={{ overflow: "hidden", lineHeight: 1.15 }}>
                  <span
                    className={`bau-inner-${i}`}
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(3.8vw, 5.5vw, 6.5vw)",
                      letterSpacing: "0.015em",
                      color: "rgba(255,255,255,0.90)",
                      display: "block",
                      opacity: 0,
                      transform: "translateY(110%)",
                      willChange: "transform, opacity",
                    }}
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Front clouds (in front of text, z:3) ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 3,
            overflow: "hidden", pointerEvents: "none",
          }}>
            <Cloud w={320} x={-4}  y={30} opacity={0.90} duration={63}  delay={-9}  />
            <Cloud w={380} x={58}  y={26} opacity={0.93} duration={73}  delay={-33} />
            <Cloud w={280} x={83}  y={41} opacity={0.87} duration={53}  delay={-6}  />
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute", bottom: 32, left: "6%", zIndex: 10,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{
              display: "block", height: 1, width: 32,
              background: "rgba(255,255,255,0.30)",
            }} />
            <span style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}>
              Scroll
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
