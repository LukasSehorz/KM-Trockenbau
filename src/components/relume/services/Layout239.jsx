"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const services = [
  {
    image: "/images/service-schluessel.jpg",
    num: "01",
    title: "Schlüsselfertiges Bauen",
    body: "Ihr Traumhaus wird Wirklichkeit – von der Planung bis zur Schlüsselübergabe. Einfamilien- und Mehrfamilienhäuser aus einer Hand.",
    tags: ["Einfamilienhaus", "Mehrfamilienhaus", "Schlüsselfertig"],
  },
  {
    image: "/images/craftsmen-stone-facade.jpg",
    num: "02",
    title: "Rohbau & Renovierung",
    body: "Solider Rohbau als Basis für alle Folgegewerke. Fachgerechte Sanierung und Renovierung steigert Wert und Wohnqualität.",
    tags: ["Rohbau", "Sanierung", "Renovierung"],
  },
  {
    image: "/images/team-blueprints.jpg",
    num: "03",
    title: "Planung & Beratung",
    body: "Zeitlose, durchdachte Architektur mit Experten aus unserem Netzwerk. Budgets, Vorschriften und Flächen clever genutzt.",
    tags: ["Planung", "Architektur", "Beratung"],
  },
  {
    image: "/images/service-tiefbau.jpg",
    num: "04",
    title: "Tiefbau & Landw. Hallen",
    body: "Kompetenter Tiefbau an und unter der Geländelinie. Maßgeschneiderte landwirtschaftliche Hallen für Lager, Tierhaltung und mehr.",
    tags: ["Tiefbau", "Landw. Hallen", "Infrastruktur"],
  },
  {
    image: "/images/service-geruest.jpg",
    num: "05",
    title: "Transporte, Gerüst & Kran",
    body: "Zuverlässiger Schüttgut- und Baumaterialtransport. Gerüstbau für sichere Arbeiten. Ladekranarbeiten für präzises Heben.",
    tags: ["Transporte", "Gerüstbau", "Ladekran"],
  },
];

export function Layout239() {
  const sectionRef   = useRef(null);
  const eyebrowRef   = useRef(null);
  const headingRef   = useRef(null);
  const gridRef      = useRef(null);
  const cardsRef     = useRef([]);
  const ctaWrapRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const grid  = gridRef.current;
      if (!cards.length || !grid) return;

      // ── 3D stage ─────────────────────────────────────────────────────────
      gsap.set(grid, { perspective: 50000 });
      grid.style.perspectiveOrigin = "50% 50%";
      cards.forEach((c) => { c.style.transformStyle = "preserve-3d"; });

      // ── Compute per-card offsets to VIEWPORT CENTER (resize-aware) ───────
      // Independent of where the grid sits in the document — we always pin
      // the stack to the literal middle of the viewport. The dy is computed
      // so that when the section is pinned at top:0, the card lands on
      // window.innerHeight / 2.
      let offsets = [];
      const computeOffsets = () => {
        cards.forEach((c) => gsap.set(c, { clearProps: "transform" }));

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const vpCenterX   = window.innerWidth  / 2;
        const vpCenterY   = window.innerHeight / 2;

        offsets = cards.map((card) => {
          const r = card.getBoundingClientRect();
          // Card center, X is unaffected by scroll
          const cardCenterX = r.left + r.width / 2;
          // Card center Y measured relative to section top — when section
          // pins at viewport top (0), this becomes the card's viewport Y.
          const cardCenterYInSection = (r.top + r.height / 2) - sectionRect.top;

          return {
            dx: vpCenterX - cardCenterX,
            dy: vpCenterY - cardCenterYInSection,
          };
        });
        return offsets;
      };

      // ── Initial stack: 5 perfectly horizontal floating "edges" ───────────
      // rotationX 89.9 → card faces collapse flat to camera, images vanish,
      //   only the dark card edge remains as a thin horizontal stripe.
      // rotationZ 0 → no tilt, perfectly horizontal lines.
      // y offset = centering offset + small fixed pixel offset around index 2
      //   (middle card stays at center, others spread ±30/±60px).
      const stackCards = () => {
        computeOffsets();
        cards.forEach((card, i) => {
          const o = offsets[i];
          gsap.set(card, {
            x: o.dx,
            y: o.dy + (i - 2) * 100 + 150,
            z: (4 - i) * 2,
            yPercent: 0,
            rotationX: 87,
            rotationZ: 0,
            opacity: 1,
            transformOrigin: "center center",
            force3D: true,
            willChange: "transform",
          });
          card.style.pointerEvents = "none";
        });
      };

      stackCards();

      // ── Inner card content (only animates after the deal lands) ──────────
      const allCardContents   = cards.map((c) => c.querySelector("[data-card-content]")).filter(Boolean);
      const allCardSecondaries = cards.map((c) => c.querySelector("[data-card-secondary]")).filter(Boolean);
      const allCardImages   = cards.map((c) => c.querySelector("[data-card-image]")).filter(Boolean);
      const allCardOverlays = cards.map((c) => c.querySelector("[data-card-overlay]")).filter(Boolean);
      const allCardNums     = cards.map((c) => c.querySelector("[data-card-num]")).filter(Boolean);
      const allCardTitles   = cards.map((c) => c.querySelector("[data-card-title]")).filter(Boolean);
      const allCardArrows   = cards.map((c) => c.querySelector("[data-card-arrow]")).filter(Boolean);
      const allCardBodies   = cards.map((c) => c.querySelector("[data-card-body]")).filter(Boolean);
      const allCardTagWraps = cards.map((c) => c.querySelector("[data-card-tags]")).filter(Boolean);

      // Heading stays visible from the start so the user has context while
      // the floating stack lingers in the buffer zone.
      gsap.set(eyebrowRef.current, { y: 0, opacity: 1, force3D: true });
      gsap.set(headingRef.current, { y: 0, opacity: 1, force3D: true });
      gsap.set(allCardContents, { opacity: 0 });
      gsap.set(allCardSecondaries, { autoAlpha: 0, y: 15 });
      gsap.set(allCardImages,   { scale: 1, force3D: true });
      gsap.set(allCardOverlays, { opacity: 1 });
      gsap.set([...allCardNums, ...allCardTitles, ...allCardArrows, ...allCardBodies, ...allCardTagWraps], {
        opacity: 1, y: 0, force3D: true,
      });
      gsap.set(ctaWrapRef.current?.children || [], { y: 18, opacity: 0, force3D: true });

      // ── Master timeline (auto-play, triggered once when in view) ─────────
      const tl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          once: true,
        },
      });

      // ── PHASE 1 — BRIEF PAUSE (5 lines visible) ──────────────────────────
      tl.to({}, { duration: 0.6 })

        // ── PHASE 2 — CAMERA SWING (collapse to single centered stack) ────
        // No perspective tween (perf hog). Static perspective 2500 on grid.
        .to(cards, {
          rotationX: 0,
          rotationZ: 0,
          y: (i) => offsets[i].dy,
          duration: 1.8,
          ease: "power3.inOut",
        })
        .to(allCardContents, {
          opacity: 1,
          duration: 1.8,
          ease: "power3.inOut",
        }, "<")

        // ── PHASE 3 — DEAL OUT (clean wave from center) ──────────────────
        // Cards fly straight from the centered stack to their grid positions.
        // Wave-stagger from center outward + crisp expo.out ease for a
        // satisfying, premium glide without any 3D tricks that could
        // visually scramble the stack at the transition.
        .to(cards, {
          x: 0,
          y: 0,
          z: 0,
          yPercent: 0,
          rotationX: 0,
          rotationZ: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: { each: 0.14, from: "center", ease: "power2.in" },
        })

        .to(ctaWrapRef.current?.children || [], {
          y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08,
        }, "-=0.3")

        // ── PHASE 4 — REVEAL secondary content (body + tags) ──────────────
        .to(allCardSecondaries, {
          autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1,
        }, "-=0.2")

        // Clear willChange + restore pointer-events when animation completes
        .add(() => {
          cards.forEach((c) => {
            c.style.willChange = "auto";
            c.style.pointerEvents = "";
          });
        });

      // Refresh once layout has settled
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-[5%] pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      style={{ backgroundColor: "#FDFCF8" }}
    >
      <div className="container">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p
            ref={eyebrowRef}
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]"
            style={{ willChange: "transform, opacity" }}
          >
            Unsere Leistungen auf einen Blick
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-[#D94520] whitespace-nowrap"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)", willChange: "transform, opacity" }}
          >
            Gewerke. Ein Ansprechpartner.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 lg:grid-cols-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                backgroundColor: "#060D1F",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(217,69,32,0.35)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div data-card-content>
              {/* Primary: image, gradient, number, title */}
              <div data-card-primary className="relative h-36 overflow-hidden md:h-44">
                <img
                  data-card-image
                  src={s.image}
                  alt={s.title}
                  loading="eager"
                  decoding="sync"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  data-card-overlay
                  className="absolute inset-0 bg-gradient-to-t from-[#060D1F] via-[#060D1F]/40 to-transparent"
                />

                {/* Number top-left */}
                <span
                  data-card-num
                  className="absolute left-5 top-5 font-body text-xs font-semibold uppercase tracking-[0.28em] text-white/85"
                >
                  {s.num}
                </span>

                {/* Title overlay bottom-left */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <h3
                    data-card-title
                    className="font-heading text-base font-bold leading-tight text-white md:text-lg"
                  >
                    {s.title}
                  </h3>
                  <span
                    data-card-arrow
                    className="text-white text-sm transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Secondary: body text + tags (revealed after deal lands) */}
              <div data-card-secondary className="px-4 pb-4 pt-3">
                <p
                  data-card-body
                  className="mb-3 font-body text-xs leading-relaxed text-white/65"
                >
                  {s.body}
                </p>
                <div
                  data-card-tags
                  className="border-t border-white/15 pt-3 flex flex-wrap gap-1.5"
                >
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 px-3 py-1 font-body text-[11px] tracking-wide text-white/70 transition-colors duration-300 hover:border-white hover:text-white cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaWrapRef} className="mt-10 flex flex-wrap items-center gap-6 md:mt-14">
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 border border-[#D94520]/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#D94520] transition-all duration-300 hover:bg-[#D94520] hover:text-white hover:border-[#D94520]"
          >
            Termin vereinbaren
            <span>→</span>
          </a>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-[#D94520]/70 transition-colors duration-200 hover:text-[#D94520]"
          >
            Projekt anfragen
            <span className="text-[#D94520]">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
