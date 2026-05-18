"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

export function Header78() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cursorRef = useRef(null);
  const formCardRef = useRef(null);

  // Smooth cursor follow via gsap.ticker — no React state, no re-renders
  useEffect(() => {
    const section = sectionRef.current;
    const cursorEl = cursorRef.current;
    const imageEl = imageRef.current;
    const formCard = formCardRef.current;
    if (!section || !cursorEl || !imageEl) return;

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let active = false;

    const isOverForm = () => !!(formCard && formCard.matches(':hover'));

    const onMove = (e) => {
      if (isOverForm()) {
        if (active) {
          active = false;
          cursorEl.style.opacity = "0";
          imageEl.style.clipPath = "circle(0px at 50% 50%)";
        }
        return;
      }
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
    const introAlreadyDone = window.__kmIntroDone === true;

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
      window.addEventListener("km-intro-complete", onIntroComplete, { once: true });
    }

    return () => {
      if (tl) tl.kill();
      ctx.revert();
      if (onIntroComplete) {
        window.removeEventListener("km-intro-complete", onIntroComplete);
      }
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "calc(100vh - 4.5rem)", cursor: "none", backgroundColor: "#071A1A" }}
    >
      {/* ── Bild 1: Rohbau — vollflächiger Hintergrund ── */}
      <img
        src="/images/Hero%20section%20Vorher.png"
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
        <span className="block h-1.5 w-1.5 rounded-full" style={{ background: "#7BBFB8" }} />
      </div>


      {/* ── Text-Inhalt ── */}
      <div className="relative z-10 flex h-full items-center justify-between px-[6%] pt-20 pb-12 gap-12">

        {/* Left: copy */}
        <div className="self-stretch flex flex-col justify-center gap-20 lg:max-w-[46%]">
          {/* Eyebrow — top */}
          <div className="flex items-center gap-4">
            <span className="hero-eyebrow-line h-px w-10 flex-shrink-0" style={{ background: "#7BBFB8" }} />
            <div style={{ overflow: "hidden" }}>
              <p className="hero-eyebrow-inner font-body text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "#7BBFB8" }}>
                Regensburg · Innenausbau & Trockenbau
              </p>
            </div>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 5rem)", lineHeight: 1.04 }}
          >
            <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
              <span className="hero-headline-inner block">
                Leistung{" "}
                <em className="italic" style={{ color: "#FFFFFF" }}>& Vertrauen.</em>
              </span>
            </span>
            <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
              <span className="hero-headline-inner block">
                Ihr Trockenbauer.
              </span>
            </span>
          </h1>

          {/* Body */}
          <p className="hero-body max-w-[400px] font-body text-base leading-relaxed text-white/70 md:text-lg">
            Wir haben langjährige Erfahrung im Innenausbau und beherrschen alle Systeme
            im Wand-, Decken- und Bodenbereich — normgerecht nach aktuellen DIN-Normen.
            Von der Erstberatung bis zur Fertigstellung für Sie in Regensburg und Umgebung.
          </p>

          {/* CTAs — bottom */}
          <div className="flex flex-wrap gap-3">
            <a
              href="/galerie"
              className="hero-cta group inline-flex items-center gap-3 border border-white/40 bg-transparent px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white/85 transition-all duration-300 hover:bg-white hover:border-white hover:text-[#5AACB5]"
            >
              Galerie ansehen
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right: contact form card */}
        <div
          ref={formCardRef}
          className="hero-cta hidden lg:flex flex-col ml-auto"
          style={{ cursor: "default", width: "480px", flexShrink: 0, marginRight: "4rem" }}
        >
          <div style={{
            background: "linear-gradient(160deg, rgba(6,22,22,0.92) 0%, rgba(4,16,18,0.96) 100%)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(90,172,181,0.18)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(90,172,181,0.12)",
            padding: "2.25rem 2.5rem 2rem",
          }}>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 28, height: 1.5, background: "linear-gradient(to right, #5AACB5, transparent)" }} />
                <p className="font-body text-sm font-semibold uppercase tracking-[0.3em] text-[#5AACB5]">
                  Kostenloses Angebot
                </p>
              </div>
              <h3 className="font-heading text-3xl font-bold text-white leading-tight">
                Projekt anfragen
              </h3>
              <p className="mt-1.5 font-body text-base text-white/40 leading-relaxed">
                Antwort innerhalb eines Werktages
              </p>
            </div>

            {/* Thin separator */}
            <div style={{ height: 1, background: "linear-gradient(to right, rgba(90,172,181,0.25), transparent)", marginBottom: "1.75rem" }} />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const d = Object.fromEntries(new FormData(e.target));
                window.location.href = `mailto:info-kalac-trockenbau@web.de?subject=Anfrage von ${d.vorname} ${d.nachname}&body=Name: ${d.vorname} ${d.nachname}%0ATelefon: ${d.telefon}%0AE-Mail: ${d.email}%0AProjektart: ${d.projektart || "-"}%0ANachricht: ${d.nachricht}`;
              }}
              className="flex flex-col gap-5"
            >
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Vorname</label>
                  <input
                    name="vorname" required
                    className="w-full border-b border-white/15 bg-transparent pb-2.5 pt-1 font-body text-base text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#5AACB5]/70"
                    style={{ background: "transparent" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Nachname</label>
                  <input
                    name="nachname" required
                    className="w-full border-b border-white/15 bg-transparent pb-2.5 pt-1 font-body text-base text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#5AACB5]/70"
                    style={{ background: "transparent" }}
                  />
                </div>
              </div>

              {/* Phone + Email row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Telefon *</label>
                  <input
                    name="telefon" required
                    className="w-full border-b border-white/15 bg-transparent pb-2.5 pt-1 font-body text-base text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#5AACB5]/70"
                    style={{ background: "transparent" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">E-Mail</label>
                  <input
                    name="email" type="email"
                    className="w-full border-b border-white/15 bg-transparent pb-2.5 pt-1 font-body text-base text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#5AACB5]/70"
                    style={{ background: "transparent" }}
                  />
                </div>
              </div>

              {/* Project type pills */}
              <div>
                <label className="block mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Projektart</label>
                <div className="flex flex-wrap gap-2">
                  {["Neubau", "Sanierung", "Umbau", "Decke", "Beratung"].map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input type="radio" name="projektart" value={opt} className="sr-only peer" />
                      <span className="inline-block border border-white/15 px-4 py-2 font-body text-sm uppercase tracking-[0.15em] text-white/40 transition-all duration-200 peer-checked:border-[#5AACB5]/60 peer-checked:text-[#5AACB5] peer-checked:bg-[#5AACB5]/08 cursor-pointer hover:border-white/30 hover:text-white/60">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Kurze Beschreibung</label>
                <textarea
                  name="nachricht" rows={3}
                  placeholder="z. B. Trockenbau Wohnzimmer ca. 40 m², Regensburg"
                  className="w-full resize-none border-b border-white/15 bg-transparent pb-2.5 pt-1 font-body text-base text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#5AACB5]/70"
                  style={{ background: "transparent" }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative mt-1 w-full overflow-hidden py-4 font-body text-base font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300"
                style={{ background: "linear-gradient(90deg, #3D9AA3 0%, #5AACB5 50%, #3D9AA3 100%)", backgroundSize: "200% 100%" }}
                onMouseEnter={e => e.currentTarget.style.backgroundPosition = "100% 0"}
                onMouseLeave={e => e.currentTarget.style.backgroundPosition = "0% 0"}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Anfrage senden
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div style={{ height: 1, width: 20, background: "rgba(90,172,181,0.2)" }} />
              <a href="tel:+4917638583954" className="font-body text-sm text-white/30 hover:text-[#5AACB5] transition-colors tracking-[0.08em]">
                +49 176 38583954
              </a>
              <div style={{ height: 1, width: 20, background: "rgba(90,172,181,0.2)" }} />
            </div>
          </div>
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
