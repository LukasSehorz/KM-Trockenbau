"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, Observer } from "../../../utils/gsap";
import { MessageSquare, Ruler, ClipboardCheck, Building2, KeyRound } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Erstgespräch",
    Icon: MessageSquare,
    above: false,
    img: "/images/prozess/step1.png",
    bullets: [
      "Kostenlose Erstberatung vor Ort",
      "Projektziele & Budget definieren",
      "Erste Machbarkeitseinschätzung",
    ],
  },
  {
    num: "02",
    title: "Planung & Angebot",
    Icon: Ruler,
    above: true,
    img: "/images/prozess/step2.png",
    bullets: [
      "Detaillierte Bauplanung & Grundriss",
      "Verbindliches Festpreisangebot",
      "Vertragsabschluss",
    ],
  },
  {
    num: "03",
    title: "Baugenehmigung",
    Icon: ClipboardCheck,
    above: false,
    img: "/images/prozess/step3.png",
    bullets: [
      "Einholung aller Genehmigungen",
      "Baustelle einrichten",
      "Materialbestellung & Terminplanung",
    ],
  },
  {
    num: "04",
    title: "Bauausführung",
    Icon: Building2,
    above: true,
    img: "/images/prozess/step4.png",
    bullets: [
      "Rohbau durch eigenes Fachpersonal",
      "Laufende Qualitätskontrolle",
      "Wöchentliche Statusberichte",
    ],
  },
  {
    num: "05",
    title: "Schlüsselübergabe",
    Icon: KeyRound,
    above: false,
    img: "/images/prozess/step5.png",
    bullets: [
      "Abnahme & Mängelprotokoll",
      "Vollständige Dokumentation",
      "Übergabe & persönliche Einweisung",
    ],
  },
];

// SVG viewBox 0 0 5000 600
// Nodes at x: 500, 1500, 2500, 3500, 4500
// y: center=300, top=150, bottom=450
const NODES = [
  { x: 500,  y: 300 },
  { x: 1500, y: 150 },
  { x: 2500, y: 450 },
  { x: 3500, y: 150 },
  { x: 4500, y: 300 },
];

const PATH_D =
  "M 500,300 C 820,300 1180,150 1500,150 " +
  "C 1820,150 2180,450 2500,450 " +
  "C 2820,450 3180,150 3500,150 " +
  "C 3820,150 4180,300 4500,300";

export function ProzessPath() {
  const sectionRef  = useRef(null);
  const stripRef    = useRef(null);
  const pathRef     = useRef(null);
  const headingRef  = useRef(null);
  const prozessRef  = useRef(null);
  const dotRefs     = useRef([]);
  const cardRefs    = useRef([]);
  const imgRefs     = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const strip   = stripRef.current;
    const path    = pathRef.current;
    if (!section || !strip || !path) return;

    const STEP_DURATION = 1.2;
    const STEP_EASE     = "power2.inOut";
    let currentStep = 0;
    let isAnimating = false;
    let pinST = null;
    let observer = null;
    let heroJumpCleanup = null;
    let ctaJumpCleanup = null;
    let step1JumpCleanup = null;

    const ctx = gsap.context(() => {
      strip.style.willChange = "transform";
      path.style.willChange  = "stroke-dashoffset";

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      // ── Card inner-content helper ─────────────────────────────────────
      // yDir matches the card container's entry direction:
      //   above:true  → card slides UP  (starts y:+22) → inner yDir positive
      //   above:false → card slides DOWN (starts y:-22) → inner yDir negative
      const setCardContent = (i, visible) => {
        if (!cardRefs.current[i]) return;
        const s = gsap.utils.selector(cardRefs.current[i]);
        const yDir = STEPS[i].above ? 14 : -14;
        if (visible) {
          gsap.set(s(".card-icon"),   { scale: 1, opacity: 1 });
          gsap.set(s(".card-num"),    { y: 0, opacity: 1 });
          gsap.set(s(".card-title"),  { y: 0, opacity: 1 });
          gsap.set(s(".card-bullet"), { y: 0, opacity: 1 });
        } else {
          gsap.set(s(".card-icon"),   { scale: 0.75, opacity: 0 });
          gsap.set(s(".card-num"),    { y: yDir * 0.5, opacity: 0 });
          gsap.set(s(".card-title"),  { y: yDir,       opacity: 0 });
          gsap.set(s(".card-bullet"), { y: yDir * 0.6, opacity: 0 });
        }
      };

      // ── Initial states ────────────────────────────────────────────────
      NODES.forEach((node, i) => {
        if (dotRefs.current[i]) {
          gsap.set(dotRefs.current[i], {
            scale: i === 0 ? 1 : 0,
            opacity: i === 0 ? 1 : 0,
            transformOrigin: `${node.x}px ${node.y}px`,
            force3D: true,
          });
        }
        if (cardRefs.current[i]) {
          gsap.set(cardRefs.current[i], {
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : (STEPS[i].above ? 22 : -22),
            force3D: true,
            willChange: "transform, opacity",
          });
        }
        if (imgRefs.current[i]) {
          gsap.set(imgRefs.current[i], {
            opacity: i === 0 ? 1 : 0,
            y: 0,
            scale: i === 0 ? 1 : 0.15,
            transformOrigin: "center center",
            force3D: true,
            willChange: "transform, opacity",
          });
        }
        setCardContent(i, i === 0);
      });

      // ── Goto-step routine ─────────────────────────────────────────────
      const goToStep = (target) => {
        if (isAnimating) return;
        if (target < 0 || target > STEPS.length - 1) return;
        if (target === currentStep) return;

        isAnimating = true;
        const prev = currentStep;
        const dir  = target > prev ? 1 : -1;

        const tl = gsap.timeline({
          defaults: { force3D: true, ease: STEP_EASE },
          onComplete: () => {
            currentStep = target;
            isAnimating = false;
          },
        });

        // Strip travel + path draw
        tl.to(strip, {
          xPercent: -target * 20,
          duration: STEP_DURATION,
          ease: STEP_EASE,
        }, 0);

        tl.to(path, {
          strokeDashoffset: len * (1 - target / (STEPS.length - 1)),
          duration: STEP_DURATION,
          ease: STEP_EASE,
        }, 0);

        // Heading + PROZESS fade out when leaving step 0, fade in when returning
        if (dir > 0 && prev === 0) {
          tl.to([headingRef.current, prozessRef.current], { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" }, 0);
        } else if (dir < 0 && target === 0) {
          tl.to([headingRef.current, prozessRef.current], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, STEP_DURATION * 0.4);
        }

        if (dir > 0) {
          // ── FORWARD: reveal new step ────────────────────────────────

          // Reset inner content to hidden state before animating in
          setCardContent(target, false);
          if (imgRefs.current[target]) {
            gsap.set(imgRefs.current[target], {
              scale: 0.15,
              y: 0,
              opacity: 0,
            });
          }

          // Dot pops in
          tl.to(dotRefs.current[target], {
            scale: 1, opacity: 1,
            duration: STEP_DURATION * 0.6,
            ease: "back.out(1.4)",
          }, STEP_DURATION * 0.25);

          // Card container slides in
          tl.to(cardRefs.current[target], {
            opacity: 1, y: 0,
            duration: STEP_DURATION * 0.65,
            ease: "power2.out",
          }, STEP_DURATION * 0.28);

          // Image grows from tiny → full size (delayed start)
          tl.fromTo(imgRefs.current[target],
            { opacity: 0, y: 0, scale: 0.15 },
            { opacity: 1, y: 0, scale: 1, duration: STEP_DURATION * 0.7, ease: "power3.out" },
            STEP_DURATION * 0.5,
          );

          // ── Staggered inner-content reveal ──────────────────────────
          const cOff = STEP_DURATION * 0.31;   // ~0.37s
          const s = gsap.utils.selector(cardRefs.current[target]);
          const yDir = STEPS[target].above ? 14 : -14;

          // Icon circle springs in
          tl.fromTo(s(".card-icon"),
            { scale: 0.75, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.46, ease: "back.out(1.7)" },
            cOff,
          );

          // Step number rises/falls in
          tl.fromTo(s(".card-num"),
            { y: yDir * 0.5, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" },
            cOff + 0.09,
          );

          // Title slides in
          tl.fromTo(s(".card-title"),
            { y: yDir, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.44, ease: "power3.out" },
            cOff + 0.17,
          );

          // Bullets stagger in
          tl.fromTo(s(".card-bullet"),
            { y: yDir * 0.6, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.065, duration: 0.36, ease: "power2.out" },
            cOff + 0.27,
          );

        } else {
          // ── BACKWARD: hide previous step ────────────────────────────

          tl.to(dotRefs.current[prev], {
            scale: 0, opacity: 0,
            duration: STEP_DURATION * 0.5,
            ease: "power2.in",
          }, 0);

          tl.to(cardRefs.current[prev], {
            opacity: 0,
            y: STEPS[prev].above ? 22 : -22,
            duration: STEP_DURATION * 0.5,
            ease: "power2.in",
          }, 0);

          tl.to(imgRefs.current[prev], {
            opacity: 0,
            y: 0,
            scale: 0.15,
            duration: STEP_DURATION * 0.5,
            ease: "power2.in",
          }, 0);
        }
      };

      // ── Instant snap to a step (no animation) ────────────────────────
      const setStateInstant = (idx) => {
        gsap.set(strip, { xPercent: -idx * 20 });
        gsap.set(path,  { strokeDashoffset: len * (1 - idx / (STEPS.length - 1)) });
        NODES.forEach((_, i) => {
          const visible = i <= idx;
          if (dotRefs.current[i]) {
            gsap.set(dotRefs.current[i], {
              scale: visible ? 1 : 0,
              opacity: visible ? 1 : 0,
            });
          }
          if (cardRefs.current[i]) {
            gsap.set(cardRefs.current[i], {
              opacity: visible ? 1 : 0,
              y: visible ? 0 : (STEPS[i].above ? 22 : -22),
            });
          }
          if (imgRefs.current[i]) {
            gsap.set(imgRefs.current[i], {
              opacity: visible ? 1 : 0,
              y: 0,
              scale: visible ? 1 : 0.15,
            });
          }
          setCardContent(i, visible);
        });
        currentStep = idx;
        gsap.set([headingRef.current, prozessRef.current], { opacity: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : -12 });
      };

      // ── Pinning ScrollTrigger ─────────────────────────────────────────
      pinST = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      let isReleasing = false;
      let boundaryST = null;

      const releaseDown = () => {
        if (isReleasing) return;
        isReleasing = true;
        observer.disable();

        // ScrollTrigger's pinSpacing wraps `section` inside a generated
        // pin-spacer div, so `section.nextElementSibling` is null. Find the
        // CTA section by walking up to an ancestor that *does* have a next
        // sibling, and pick the next <section>.
        const allSections = Array.from(document.querySelectorAll("section"));
        const idx = allSections.indexOf(section);
        const next = idx >= 0 ? allSections[idx + 1] : null;

        let targetY = pinST.end + 8;
        if (next) {
          const rect = next.getBoundingClientRect();
          targetY = rect.top + window.scrollY;
        }

        // Positional scrollTo is guaranteed instant in every browser
        // (the object form can be smooth-scrolled by global CSS).
        window.scrollTo(0, targetY);

        // Longer cooldown so a touchpad's wheel-event burst can't re-trigger.
        setTimeout(() => { isReleasing = false; }, 280);
      };

      const releaseUp = () => {
        if (isReleasing) return;
        isReleasing = true;
        observer.disable();
        // Land at top of the previous (hero) section, fully clear of the pin
        const allSections = Array.from(document.querySelectorAll("section"));
        const idx = allSections.indexOf(section);
        const prev = idx > 0 ? allSections[idx - 1] : null;
        let targetY = Math.max(0, pinST.start - window.innerHeight);
        if (prev) {
          const rect = prev.getBoundingClientRect();
          targetY = rect.top + window.scrollY;
        }
        window.scrollTo(0, targetY);
        setTimeout(() => { isReleasing = false; }, 280);
      };

      // ── Observer: direction-only stepping ────────────────────────────
      observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true,
        onDown: () => {
          if (isAnimating || isReleasing) return;
          if (currentStep === 0) { releaseUp(); return; }
          goToStep(currentStep - 1);
        },
        onUp: () => {
          if (isAnimating || isReleasing) return;
          if (currentStep === STEPS.length - 1) { releaseDown(); return; }
          goToStep(currentStep + 1);
        },
      });

      observer.disable();

      // ── Boundary ScrollTrigger ────────────────────────────────────────
      boundaryST = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        onEnter:      () => { if (isReleasing) return; setStateInstant(0); observer.enable(); },
        onEnterBack:  () => { if (isReleasing) return; setStateInstant(STEPS.length - 1); observer.enable(); },
        onLeave:      () => { observer.disable(); },
        onLeaveBack:  () => { observer.disable(); },
      });

      // ── Hero-jump: 1 wheel-down in the hero → land at step 1 in pin ──
      const heroJump = (e) => {
        if (isReleasing || isAnimating) return;
        if (window.scrollY >= pinST.start - 1) return;
        const dy = e.deltaY ?? 0;
        if (dy <= 0) return;
        e.preventDefault();
        isReleasing = true;
        setStateInstant(0);
        window.scrollTo(0, pinST.start);
        setTimeout(() => {
          isReleasing = false;
          observer.enable();
        }, 280);
      };
      window.addEventListener("wheel", heroJump, { passive: false });
      heroJumpCleanup = () => window.removeEventListener("wheel", heroJump);

      // ── CTA-jump: 1 wheel-up in the CTA section → land at step 5 in pin ──
      const ctaJump = (e) => {
        if (isReleasing || isAnimating) return;
        // Only intercept if user is just past the pin (within first viewport
        // of the CTA section). If they've scrolled deeper into CTA / page,
        // let the wheel scroll naturally.
        if (window.scrollY <= pinST.end + 1) return;
        if (window.scrollY > pinST.end + window.innerHeight * 0.7) return;
        const dy = e.deltaY ?? 0;
        if (dy >= 0) return; // only on wheel-up
        e.preventDefault();
        isReleasing = true;
        observer.disable();
        setStateInstant(STEPS.length - 1);
        window.scrollTo(0, pinST.end - 4);
        setTimeout(() => {
          isReleasing = false;
          observer.enable();
        }, 280);
      };
      window.addEventListener("wheel", ctaJump, { passive: false });
      ctaJumpCleanup = () => window.removeEventListener("wheel", ctaJump);

      // ── Step 1 → hero: 1 wheel-up at step 1 → land at top of hero ──
      // Mirrors ctaJump. Bypasses Observer's tolerance / animation gate so
      // the first wheel input always fires, even mid-cooldown.
      const step1Jump = (e) => {
        if (isReleasing) return;
        if (currentStep !== 0) return;
        if (window.scrollY < pinST.start - 1 || window.scrollY > pinST.end + 1) return;
        const dy = e.deltaY ?? 0;
        if (dy >= 0) return; // only on wheel-up
        e.preventDefault();
        releaseUp();
      };
      window.addEventListener("wheel", step1Jump, { passive: false });
      step1JumpCleanup = () => window.removeEventListener("wheel", step1Jump);
    }, section);

    return () => {
      if (heroJumpCleanup)  heroJumpCleanup();
      if (ctaJumpCleanup)   ctaJumpCleanup();
      if (step1JumpCleanup) step1JumpCleanup();
      if (observer) observer.kill();
      if (pinST)    pinST.kill();
      ctx.revert();
    };
  }, []);

  // ── Layout helpers ───────────────────────────────────────────────────────
  const SVG_H_VH  = 44;
  const SVG_TOP_VH = (100 - SVG_H_VH) / 2;
  const nodeYVh = (i) => SVG_TOP_VH + (NODES[i].y / 600) * SVG_H_VH;

  return (
    <section
      ref={sectionRef}
      style={{ height: "100vh", position: "relative" }}
    >
      <div
        style={{
          position: "relative",
          height: "100vh", overflow: "hidden",
          background: "#FDFCF8",
        }}
      >

        {/* Section label — fixed to section, not strip */}
        <div
          ref={headingRef}
          style={{
            position: "absolute", top: 96, left: "5%", zIndex: 10,
            pointerEvents: "none", maxWidth: "min(36vw, 460px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ display: "block", height: 1, width: 32, background: "#D94520" }} />
            <span style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#D94520",
            }}>
              Der WM Bau GmbH-Prozess
            </span>
          </div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
            color: "#0A1628", lineHeight: 1.1, letterSpacing: "-0.02em",
            margin: 0,
          }}>
            Von der Idee<br />zum Schlüssel.
          </h2>
        </div>

        {/* Horizontal strip */}
        <div
          ref={stripRef}
          style={{
            position: "absolute", top: 0, left: 0,
            width: "500vw", height: "100vh",
            willChange: "transform",
          }}
        >
          {/* ── SVG path ─────────────────────────────────────────────── */}
          <svg
            viewBox="0 0 5000 600"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: `${SVG_TOP_VH}vh`,
              width: "500vw",
              height: `${SVG_H_VH}vh`,
              zIndex: 1,
            }}
          >
            <path
              d={PATH_D}
              stroke="rgba(217,69,32,0.15)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              ref={pathRef}
              d={PATH_D}
              stroke="#D94520"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {NODES.map((node, i) => (
              <g
                key={i}
                ref={(el) => (dotRefs.current[i] = el)}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle cx={node.x} cy={node.y} r="22" fill="rgba(217,69,32,0.10)" />
                <circle cx={node.x} cy={node.y} r="13" fill="#FDFCF8" stroke="#D94520" strokeWidth="2" />
                <circle cx={node.x} cy={node.y} r="4.5" fill="#D94520" />
              </g>
            ))}
          </svg>

          {/* ── Step images (opposite side of the path) ───────────────── */}
          {STEPS.map((step, i) => {
            const xVw  = 50 + i * 100;
            const nyVh = nodeYVh(i);
            const above = step.above;
            const imgStyle = {
              position: "absolute",
              left: `${xVw}vw`,
              marginLeft: -160,
              width: 320,
              zIndex: 2,
              willChange: "transform, opacity",
              ...(above
                ? { top:    `calc(${nyVh + 8}vh)` }
                : { bottom: `calc(${100 - nyVh + 8}vh)` }),
            };
            return (
              <div
                key={`img-${i}`}
                ref={(el) => (imgRefs.current[i] = el)}
                style={imgStyle}
              >
                <div style={{
                  position: "relative",
                  width: "100%", aspectRatio: "16/9",
                  borderRadius: 4, overflow: "hidden",
                  border: "1px solid rgba(14,42,107,0.15)",
                  boxShadow: "0 18px 44px -16px rgba(217,69,32,0.20)",
                }}>
                  {step.img && (
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="eager"
                      style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(7,25,74,0.35) 0%, rgba(7,25,74,0) 50%, rgba(7,25,74,0.55) 100%)",
                  }} />
                  <span style={{
                    position: "absolute", bottom: 10, left: 12,
                    fontFamily: "DM Sans, sans-serif", fontSize: "0.62rem", fontWeight: 600,
                    letterSpacing: "0.3em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.85)",
                  }}>
                    {step.num}
                  </span>
                </div>
              </div>
            );
          })}

          {/* ── Step cards ───────────────────────────────────────────── */}
          {STEPS.map((step, i) => {
            const xVw  = 50 + i * 100;
            const nyVh = nodeYVh(i);
            const above = step.above;
            const { Icon } = step;

            const cardStyle = {
              position: "absolute",
              left: `${xVw}vw`,
              marginLeft: -140,
              width: 280,
              zIndex: 2,
              willChange: "transform, opacity",
              ...(above
                ? { bottom: `calc(${100 - nyVh + 3}vh)` }
                : { top:    `calc(${nyVh + 3}vh)` }),
            };

            return (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                style={cardStyle}
              >
                {above ? (
                  <>
                    <ul style={{ padding: 0, margin: 0, listStyle: "none", marginBottom: 14 }}>
                      {step.bullets.map((b, bi) => (
                        <li key={bi} className="card-bullet" style={{
                          display: "flex", alignItems: "flex-start", gap: 8,
                          fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem",
                          color: "rgba(10,22,40,0.55)", lineHeight: 1.55,
                          marginBottom: 5, textAlign: "left",
                        }}>
                          <span style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "#D94520", flexShrink: 0, marginTop: 6,
                          }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <h3 className="card-title" style={{
                      fontFamily: "Syne, sans-serif", fontWeight: 700,
                      fontSize: "1.35rem", color: "#0A1628",
                      marginBottom: 6, lineHeight: 1.2, textAlign: "center",
                    }}>
                      {step.title}
                    </h3>
                    <p className="card-num" style={{
                      textAlign: "center", fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.72rem", fontWeight: 600,
                      letterSpacing: "0.25em", textTransform: "uppercase",
                      color: "#D94520", marginBottom: 14,
                    }}>
                      {step.num}
                    </p>
                    <div className="card-icon" style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{
                        width: 62, height: 62,
                        border: "1.5px solid rgba(14,42,107,0.25)",
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(14,42,107,0.06)",
                      }}>
                        <Icon size={26} color="rgba(14,42,107,0.80)" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-icon" style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                      <div style={{
                        width: 62, height: 62,
                        border: "1.5px solid rgba(14,42,107,0.25)",
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(14,42,107,0.06)",
                      }}>
                        <Icon size={26} color="rgba(14,42,107,0.80)" />
                      </div>
                    </div>
                    <p className="card-num" style={{
                      textAlign: "center", fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.72rem", fontWeight: 600,
                      letterSpacing: "0.25em", textTransform: "uppercase",
                      color: "#D94520", marginBottom: 6,
                    }}>
                      {step.num}
                    </p>
                    <h3 className="card-title" style={{
                      fontFamily: "Syne, sans-serif", fontWeight: 700,
                      fontSize: "1.35rem", color: "#0A1628",
                      marginBottom: 14, lineHeight: 1.2, textAlign: "center",
                    }}>
                      {step.title}
                    </h3>
                    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                      {step.bullets.map((b, bi) => (
                        <li key={bi} className="card-bullet" style={{
                          display: "flex", alignItems: "flex-start", gap: 8,
                          fontFamily: "DM Sans, sans-serif", fontSize: "0.88rem",
                          color: "rgba(10,22,40,0.55)", lineHeight: 1.55,
                          marginBottom: 5, textAlign: "left",
                        }}>
                          <span style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "#D94520", flexShrink: 0, marginTop: 6,
                          }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            );
          })}

        </div>

        {/* PROZESS watermark — left-aligned, fixed to section, fades with heading */}
        <div
          ref={prozessRef}
          style={{
            position: "absolute", left: "5%", top: "50%",
          transform: "translateY(-50%)",
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
            color: "rgba(14,42,107,0.07)", userSelect: "none",
            zIndex: 0, letterSpacing: "-0.04em",
            whiteSpace: "nowrap", pointerEvents: "none",
          }}
        >
          PROZESS
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 28, right: "4%", zIndex: 10,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            fontFamily: "DM Sans, sans-serif", fontSize: "0.68rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(14,42,107,0.40)",
          }}>
            Scrollen
          </span>
          <span style={{ display: "block", height: 1, width: 28, background: "rgba(14,42,107,0.25)" }} />
          <span style={{ color: "rgba(14,42,107,0.50)", fontSize: "0.9rem" }}>→</span>
        </div>
      </div>
    </section>
  );
}
