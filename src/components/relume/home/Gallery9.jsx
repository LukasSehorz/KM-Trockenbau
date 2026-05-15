"use client";

import { useRef, useEffect } from "react";
import { gsap } from "../../../utils/gsap";

const projects = [
  {
    id: "01",
    image: "/images/Beispiel-Projekte/LP1.jpg",
    title: "Wohnanlage München/Trudering",
    category: "Wohnungsbau · 97 WE + Tiefgarage",
    year: "2023",
  },
  {
    id: "02",
    image: "/images/Beispiel-Projekte/LP2.jpg",
    title: "Wohnpark Haydn, Dorfen",
    category: "Wohnungsbau · 56 WE + Tiefgarage",
    year: "2024",
  },
  {
    id: "03",
    image: "/images/projekt-03.png",
    title: "Einfamilienhaus, Dorfen",
    category: "Wohnbau · Schlüsselfertig",
    year: "2024",
  },
];

export function Gallery9() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: eyebrow fades up, lines mask-reveal ──────────────────
      gsap.from(".g9-eyebrow", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".g9-heading-area", start: "top 82%" },
      });

      gsap.from(".g9-heading-inner", {
        y: "110%",
        stagger: 0.12,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".g9-heading-area", start: "top 82%" },
      });

      // ── Rows: each triggers independently as it enters viewport ───────
      gsap.utils.toArray(".g9-row", sectionRef.current).forEach((row, i) => {
        const card    = row.querySelector(".g9-card");
        const img     = row.querySelector(".g9-card-img");
        const content = row.querySelector(".g9-card-content");
        const line    = row.querySelector(".g9-card-line");
        const numPanel = row.querySelector(".g9-num-panel");

        // Rechts → Links → Rechts  (i=0 right, i=1 left, i=2 right)
        const fromRight = i % 2 === 0;
        const clipFrom  = fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
        const xDrift    = fromRight ? 7 : -7;
        const xNumber   = fromRight ? -40 : 40;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
          },
        });

        // 1. Card wipes in from the correct side
        if (card) {
          tl.from(card, {
            clipPath: clipFrom,
            duration: 1.25,
            ease: "power3.inOut",
          }, 0);
        }

        // 2. Image Ken Burns + slight drift
        if (img) {
          tl.from(img, {
            xPercent: xDrift,
            scale: 1.14,
            duration: 1.85,
            ease: "power2.out",
          }, 0);
        }

        // 3. Gold accent line grows
        if (line) {
          tl.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.6,
            ease: "power3.out",
          }, 0.4);
        }

        // 4. Title content slides up + fades
        if (content) {
          tl.from(content, {
            y: 24,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          }, 0.55);
        }

        // 5. Number panel slides in from opposite side
        if (numPanel) {
          tl.from(numPanel, {
            x: xNumber,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          }, 0.3);
        }

        // 6. Ongoing scroll parallax on the image
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // ── CTAs slide up ─────────────────────────────────────────────────
      gsap.from(".g9-cta", {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".g9-cta-row", start: "top 88%" },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#FDFCF8" }}>
      <div className="container">

        {/* Heading */}
        <div className="g9-heading-area mb-14 max-w-2xl md:mb-18">
          <p className="g9-eyebrow mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
            Portfolio
          </p>
          <h2
            className="font-heading font-bold leading-[1.05] tracking-tight text-[#D94520]"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)" }}
          >
            <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="g9-heading-inner block">Ausgewählte</span>
            </span>
            <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="g9-heading-inner block">
                <em className="font-serif font-light not-italic text-[#D94520]/60">
                  Projekte.
                </em>
              </span>
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((p, i) => {
            const fromRight = i % 2 === 0;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={p.id}
                className={`g9-row grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  fromRight ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                {/* Image card */}
                <div
                  className="g9-card group relative w-full overflow-hidden"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="g9-card-img absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                    style={{ willChange: "transform" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Title overlay */}
                  <div className="g9-card-content absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="g9-card-line mb-3 h-px w-8 bg-[#D94520]" />
                    <h3
                      className="font-heading font-bold leading-tight tracking-tight text-white"
                      style={{ fontSize: "clamp(1.25rem, 2.2vw, 2rem)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-white/70">
                      {p.category} · {p.year}
                    </p>
                  </div>
                </div>

                {/* Number panel */}
                <div className="g9-num-panel flex items-center justify-center">
                  <span
                    className="font-heading font-bold leading-none tracking-tight text-[#D94520]/10 select-none"
                    style={{ fontSize: "clamp(8rem, 18vw, 18rem)" }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="g9-cta-row mt-12 flex flex-wrap items-center gap-6 md:mt-16">
          <a
            href="/projekte"
            className="g9-cta inline-flex items-center bg-[#D94520] px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85"
          >
            Alle Projekte ansehen
          </a>
          <a
            href="/projekte"
            className="g9-cta inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#D94520]/70 transition-colors duration-200 hover:text-[#D94520]"
          >
            Projektübersicht
            <span className="text-[#D94520]">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
