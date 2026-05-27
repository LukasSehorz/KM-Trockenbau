"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const services = [
  {
    image: "/images/Leistungen/01%20Trockenbau.png",
    num: "01",
    title: "Trockenbau",
    body: "Wenn Sie ein zusätzliches Kinderzimmer benötigen oder ein Büro erweitern möchten. Wir erstellen Wände und Zwischenwände nach Maß.",
    tags: ["Wände", "Zwischenwände", "Innenausbau"],
  },
  {
    image: "/images/Leistungen/02%20Dachbodenausbau.png",
    num: "02",
    title: "Dachbodenausbau",
    body: "Wenn Sie einen noch nicht genutzten Rohbau besitzen und mehr Wohnfläche haben möchten. Wir verwandeln ungenutzten Dachraum in wertvollen Wohnraum.",
    tags: ["Dachausbau", "Wohnfläche", "Rohbau"],
  },
  {
    image: "/images/Leistungen/03%20Waermeschutz.png",
    num: "03",
    title: "Wärme- & Schallschutz",
    body: "Wenn Sie Ihr Haus, Dachgeschoss oder Ihre Wohnung nach heutigen Standards dämmen und isolieren möchten. Energieeffizient und normgerecht.",
    tags: ["Dämmung", "Isolierung", "DIN-Normen"],
  },
  {
    image: "/images/Leistungen/04%20Trockenbaudecke.png",
    num: "04",
    title: "Trockenbaudecke",
    body: "Wenn Sie Ihre Holzdecke modernisieren wollen und den Raum größer wirken lassen möchten. Moderne Abhangdecken für jeden Geschmack.",
    tags: ["Abhangdecke", "Modernisierung", "Gestaltung"],
  },
  {
    image: "/images/Leistungen/05%20Bodenbel%C3%A4ge.png",
    num: "05",
    title: "Bodenbeläge",
    body: "Wenn ein neuer Boden schon lange überfällig ist oder Sie einfach einen schöneren Bodenbelag möchten. Wir verlegen Ihren Wunschboden professionell.",
    tags: ["Parkett", "Laminat", "Fliesen"],
  },
  {
    image: "/images/Leistungen/06%20Badsanierung.png",
    num: "06",
    title: "Badsanierung",
    body: "Falls Sie Ihr in die Jahre gekommenes Bad nach Ihren Wünschen umgestalten möchten. Von der Planung bis zur Fertigstellung — alles aus einer Hand.",
    tags: ["Bad", "Sanierung", "Fliesen"],
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
    // On mobile: simple slide-in from alternating sides
    if (window.innerWidth < 768) {
      const ctx = gsap.context(() => {
        const cards = cardsRef.current.filter(Boolean);
        if (!cards.length) return;

        cards.forEach((card, i) => {
          gsap.set(card, { opacity: 0, x: i % 2 === 0 ? -50 : 50 });
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        if (ctaWrapRef.current?.children.length) {
          gsap.set(ctaWrapRef.current.children, { opacity: 0, y: 16 });
          gsap.to(ctaWrapRef.current.children, {
            opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1,
            scrollTrigger: {
              trigger: ctaWrapRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }

    let animationStarted = false;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const grid  = gridRef.current;
      if (!cards.length || !grid) return;

      // ── 3D stage ─────────────────────────────────────────────────────────
      gsap.set(grid, { perspective: 50000 });
      grid.style.perspectiveOrigin = "50% 50%";
      cards.forEach((c) => { c.style.transformStyle = "preserve-3d"; });

      // Helper to compute absolute offsets relative to a parent container without transforms
      const getElementOffsetTop = (element, targetParent) => {
        let top = 0;
        let curr = element;
        while (curr && curr !== targetParent && curr !== document.body) {
          top += curr.offsetTop;
          curr = curr.offsetParent;
        }
        return top;
      };

      const getElementOffsetLeft = (element, targetParent) => {
        let left = 0;
        let curr = element;
        while (curr && curr !== targetParent && curr !== document.body) {
          left += curr.offsetLeft;
          curr = curr.offsetParent;
        }
        return left;
      };

      // ── Compute per-card offsets to GRID CENTER (resize-aware & robust) ──
      // By centering on the grid itself, we align the stack perfectly with the 
      // grid's perspective origin (50% 50%), preventing perspective projection shifts.
      let offsets = [];
      const computeOffsets = () => {
        const targetParent = sectionRef.current;
        if (!targetParent || !grid) return;

        // Compute the natural center of the grid relative to the section
        const gridLeftInSection = getElementOffsetLeft(grid, targetParent);
        const gridCenterXInSection = gridLeftInSection + grid.offsetWidth / 2;
        
        const vpCenterY   = window.innerHeight / 2;

        offsets = cards.map((card) => {
          // Compute natural, untransformed positions relative to the section
          const cardLeftInSection = getElementOffsetLeft(card, targetParent);
          const cardTopInSection  = getElementOffsetTop(card, targetParent);
          
          const cardCenterX = cardLeftInSection + card.offsetWidth / 2;
          const cardCenterYInSection = cardTopInSection + card.offsetHeight / 2;

          return {
            dx: gridCenterXInSection - cardCenterX,
            dy: vpCenterY - cardCenterYInSection,
          };
        });
        return offsets;
      };

      // ── Initial stack: 5 perfectly horizontal floating "edges" ───────────
      const stackCards = () => {
        computeOffsets();
        const isMobile = window.innerWidth < 768;
        const spacing = isMobile ? 35 : 100;
        // Vertically center the cards perfectly, shifting slightly up on mobile to avoid heading overlap
        const baseOffset = isMobile ? -180 : 150;

        cards.forEach((card, i) => {
          const o = offsets[i];
          if (!o) return;
          gsap.set(card, {
            x: o.dx,
            y: o.dy + (i - 2) * spacing + baseOffset,
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

      // Run immediately
      stackCards();

      // Also run after a short delay to guarantee layout calculations 
      // are fully stable after initial render and styling paint
      const timeoutId = setTimeout(() => {
        if (!animationStarted) {
          stackCards();
        }
      }, 100);

      // Handle window resize dynamically to recompute stack positions
      const handleResize = () => {
        if (!animationStarted) {
          stackCards();
        }
      };
      window.addEventListener("resize", handleResize);

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
          start: "top 90%",
          once: true,
          onStart: () => {
            animationStarted = true;
          }
        },
      });

      // ── PHASE 1 — BRIEF PAUSE (5 lines visible) ──────────────────────────
      tl.to({}, { duration: 0.6 })

        // ── PHASE 2 — CAMERA SWING (collapse to single centered stack) ────
        .to(cards, {
          rotationX: 0,
          rotationZ: 0,
          y: (i) => offsets[i]?.dy || 0,
          duration: 1.8,
          ease: "power3.inOut",
        })
        .to(allCardContents, {
          opacity: 1,
          duration: 1.8,
          ease: "power3.inOut",
        }, "<")

        // ── PHASE 3 — DEAL OUT (clean wave from center) ──────────────────
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

      // Return cleanup function for event listeners and timeout
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("resize", handleResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      className="relative px-[5%] pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p
            ref={eyebrowRef}
            className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#5AACB5]"
            style={{ willChange: "transform, opacity" }}
          >
            Unsere Leistungen auf einen Blick
          </p>
          <h2
            ref={headingRef}
            className="font-heading font-bold leading-tight tracking-tight text-[#5AACB5] md:whitespace-nowrap"
            style={{ fontSize: "clamp(1.6rem, 4vw, 4rem)", willChange: "transform, opacity" }}
          >
            Viele Leistungen. Ein Ansprechpartner.
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
                transition: "box-shadow 0.35s ease",
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, {
                  y: -6,
                  scale: 1.01,
                  boxShadow: "0 20px 40px -12px rgba(217,69,32,0.35)",
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto"
                });
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  boxShadow: "none",
                  duration: 0.35,
                  ease: "power2.out",
                  overwrite: "auto"
                });
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
            className="inline-flex items-center gap-2 border border-[#5AACB5]/30 px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#5AACB5] transition-all duration-300 hover:bg-[#5AACB5] hover:text-white hover:border-[#5AACB5]"
          >
            Termin vereinbaren
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
