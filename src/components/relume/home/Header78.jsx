"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

export function Header78() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cursorRef = useRef(null);

  // Smooth cursor follow via gsap.ticker — no React state, no re-renders
  useEffect(() => {
    const section = sectionRef.current;
    const cursorEl = cursorRef.current;
    const imageEl = imageRef.current;
    if (!section || !cursorEl || !imageEl) return;

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let active = false;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!active) {
        active = true;
        smoothX = targetX;
        smoothY = targetY;
        cursorEl.style.opacity = "1";
      }
    };

    const onLeave = () => {
      active = false;
      cursorEl.style.opacity = "0";
      imageEl.style.clipPath = "circle(0px at 50% 50%)";
    };

    const tick = () => {
      if (!active) return;
      // Lerp smoothing — feels weighty but still responsive
      smoothX += (targetX - smoothX) * 0.22;
      smoothY += (targetY - smoothY) * 0.22;
      cursorEl.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%)`;
      imageEl.style.clipPath = `circle(180px at ${smoothX}px ${smoothY}px)`;
    };

    // Ensure clean initial state (guards against StrictMode double-invoke)
    cursorEl.style.opacity = "0";
    imageEl.style.clipPath = "circle(0px at 50% 50%)";

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      gsap.ticker.remove(tick);
      // Reset DOM state so re-mount starts clean (StrictMode / SPA navigation)
      active = false;
      cursorEl.style.opacity = "0";
      imageEl.style.clipPath = "circle(0px at 50% 50%)";
    };
  }, []);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    // Window flag (resets on page refresh, persists across SPA navigation).
    // sessionStorage was wrong — it persisted across refreshes, but the intro
    // ALWAYS replays on refresh (App.tsx introComplete inits to false).
    const introAlreadyDone = window.__schmidIntroDone === true;

    let tl = null;
    const animatableSelector = ".hero-bg-img, .hero-eyebrow-line, .hero-eyebrow-inner, .hero-headline-inner, .hero-body, .hero-cta";

    const startAnimations = (delay, s) => {
      // Kill any lingering tweens from StrictMode's first-run cleanup
      gsap.killTweensOf(scope.querySelectorAll(animatableSelector));

      tl = gsap.timeline({ delay, defaults: { ease: "power3.out" } });
      tl.fromTo(scope.querySelector(".hero-bg-img"),
        { scale: 1.08 }, { scale: 1, duration: 3.5 * s, ease: "power1.out" }, 0);
      tl.fromTo(scope.querySelector(".hero-eyebrow-line"),
        { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.85 * s }, 0.35 * s);
      tl.fromTo(scope.querySelector(".hero-eyebrow-inner"),
        { y: "120%" }, { y: "0%", duration: 0.65 * s }, 0.7 * s);
      tl.fromTo(scope.querySelectorAll(".hero-headline-inner"),
        { y: "110%" }, { y: "0%", stagger: 0.13 * s, duration: 1.15 * s }, 0.95 * s);
      tl.fromTo(scope.querySelector(".hero-body"),
        { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 * s }, 1.5 * s);
      tl.fromTo(scope.querySelectorAll(".hero-cta"),
        { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.11 * s, duration: 0.7 * s }, 1.85 * s);
    };

    // Parallax: sync, safe in gsap.context
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, scope);

    let onIntroComplete = null;

    if (introAlreadyDone) {
      // SPA navigation back to home — intro already played in this page load
      startAnimations(0.05, 0.75);
    } else {
      // Intro is playing (or about to). Hide elements NOW so they're not
      // briefly visible behind the intro, then animate when intro finishes.
      gsap.set(scope.querySelector(".hero-eyebrow-line"), { scaleX: 0 });
      gsap.set(scope.querySelector(".hero-eyebrow-inner"), { y: "120%" });
      gsap.set(scope.querySelectorAll(".hero-headline-inner"), { y: "110%" });
      gsap.set(scope.querySelector(".hero-body"), { y: 28, opacity: 0 });
      gsap.set(scope.querySelectorAll(".hero-cta"), { y: 22, opacity: 0 });

      onIntroComplete = () => startAnimations(0.3, 1);
      window.addEventListener("schmid-intro-complete", onIntroComplete, { once: true });
    }

    return () => {
      if (tl) tl.kill();
      ctx.revert();
      if (onIntroComplete) {
        window.removeEventListener("schmid-intro-complete", onIntroComplete);
      }
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "calc(100vh - 4.5rem)", cursor: "none", backgroundColor: "#040D1C" }}
    >
      {/* ── Bild 1: Rohbau — vollflächiger Hintergrund ── */}
      <img
        src="/images/hero-vorher.png"
        alt="Gebäude im Rohbau"
        className="hero-bg-img absolute inset-0 h-full w-full object-cover object-center"
        style={{ willChange: "transform", filter: "saturate(0.92) brightness(1.04)" }}
      />

      {/* Dunkler Verlauf — links dicht, rechts ausblendend */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(4,13,28,0.93) 0%, rgba(4,13,28,0.80) 38%, rgba(4,13,28,0.45) 65%, rgba(4,13,28,0.12) 100%)",
        }}
      />

      {/* ── Bild 2: Fertig — Hover-Reveal (clip-path driven directly via DOM) ── */}
      <img
        ref={imageRef}
        src="/images/hero-nachher.png"
        alt="Fertiggestelltes Gebäude"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          clipPath: "circle(0px at 50% 50%)",
          willChange: "clip-path",
        }}
      />

      {/* ── Custom Cursor: outer ring + inner dot ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          opacity: 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(90,172,207,0.7)" }} />
        {/* Inner dot */}
        <span className="block h-1.5 w-1.5 rounded-full" style={{ background: "#F07040" }} />
      </div>


      {/* ── Text-Inhalt ── */}
      <div className="relative z-10 flex h-full flex-col justify-center px-[6%] pt-20 pb-12 md:max-w-[58%] lg:max-w-[52%]">

        {/* Eyebrow */}
        <div className="mb-12 flex items-center gap-4">
          <span className="hero-eyebrow-line h-px w-10 flex-shrink-0" style={{ background: "#F07040" }} />
          <div style={{ overflow: "hidden" }}>
            <p className="hero-eyebrow-inner font-body text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "#F07040" }}>
              Dorfen · Gegründet 2020
            </p>
          </div>
        </div>

        {/* Headline – each line in its own overflow:hidden mask */}
        <h1
          className="mb-6 font-serif font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(2.4rem, 4.8vw, 5.8rem)", lineHeight: 1.04, marginBottom: "3.5rem" }}
        >
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span className="hero-headline-inner block">
              Bauen,{" "}
              <em className="italic" style={{ color: "#FFFFFF" }}>das bleibt.</em>
            </span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span className="hero-headline-inner block">
              Seit 2020.
            </span>
          </span>
        </h1>

        {/* Body */}
        <p className="hero-body mb-16 max-w-[440px] font-body text-base leading-relaxed text-white/70 md:text-lg">
          Schlüsselfertiges Bauen, Rohbau, Sanierung, Tiefbau und mehr aus Dorfen.
          WM Bau GmbH steht seit 2020 für Qualität, Verlässlichkeit
          und Projekte, die bleiben.
        </p>

        {/* CTAs — both get the fill-on-hover effect */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/kontakt"
            className="hero-cta group inline-flex items-center gap-3 border border-white/40 bg-transparent px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white/85 transition-all duration-300 hover:bg-white hover:border-white hover:text-[#D94520]"
          >
            Projekt anfragen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/projekte"
            className="hero-cta group inline-flex items-center gap-3 border border-white/40 bg-transparent px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white/85 transition-all duration-300 hover:bg-white hover:border-white hover:text-[#D94520]"
          >
            Referenzen ansehen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* Scroll-Indikator — CSS fade-in, unabhängig von GSAP */}
      <div
        className="absolute bottom-8 left-[6%] z-10 hidden lg:flex items-center gap-3"
        style={{ animation: "heroScrollFadeIn 1s ease 0.8s both" }}
      >
        <span className="h-px w-8" style={{ background: "rgba(90,172,207,0.4)" }} />
        <span className="font-body text-xs uppercase tracking-[0.22em]" style={{ color: "rgba(90,172,207,0.65)" }}>Scroll</span>
      </div>
      <style>{`
        @keyframes heroScrollFadeIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
