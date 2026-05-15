"use client";

import { useRef, useEffect } from "react";
import { gsap } from "../../../utils/gsap";

const features = [
  {
    title: "Handwerk als Berufung",
    body: "Gegründet 2020 von Lukas Winter und Philip Marsmann. WM Bau GmbH setzt auf klare Werte: Qualität, Verlässlichkeit und persönliche Betreuung auf jedem Bauprojekt.",
    image: "/images/layout-handwerk.jpg",
  },
  {
    title: "Persönlichkeit & Beständigkeit",
    body: "Klare Angebote, direkte Kommunikation, ein Ansprechpartner. Mit unserem Team betreuen wir jedes Projekt von der Planung bis zur Schlüsselübergabe – zuverlässig und termintreu.",
    image: "/images/layout-persoenlichkeit.jpg",
  },
  {
    title: "Verwurzelt in der Region",
    body: "Dorfen ist unsere Heimat. Seit 2020 bauen wir in der Region Erding und weit darüber hinaus. Sie finden uns in der Breitenloh 1 – zentral gelegen, direkt für Sie erreichbar.",
    image: "/images/layout-region.jpg",
  },
];

export function Layout237() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: eyebrow fades up, lines mask-reveal ──────────────────
      gsap.from(".l237-eyebrow", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".l237-heading-area", start: "top 82%" },
      });

      gsap.from(".l237-heading-inner", {
        y: "110%",
        stagger: 0.12,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".l237-heading-area", start: "top 82%" },
      });

      // ── Cards: each triggers independently as it enters the viewport ──
      gsap.utils.toArray(".l237-card", sectionRef.current).forEach((card, i) => {
        const img     = card.querySelector(".l237-card-img");
        const content = card.querySelector(".l237-card-content");
        const line    = card.querySelector(".l237-card-line");

        const fromLeft = i % 2 === 0;
        const clipFrom  = fromLeft ? "inset(0 100% 0 0)"  : "inset(0 0 0 100%)";
        const xDrift    = fromLeft ? -7  : 7;
        const xContent  = fromLeft ? -30 : 30;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
          },
        });

        tl.from(card, {
          clipPath: clipFrom,
          duration: 1.25,
          ease: "power3.inOut",
        }, 0);

        if (img) {
          tl.from(img, {
            xPercent: xDrift,
            duration: 1.9,
            ease: "power2.out",
          }, 0);
        }

        if (line) {
          tl.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.6,
            ease: "power3.out",
          }, 0.4);
        }

        if (content) {
          tl.from(content, {
            x: xContent,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          }, 0.55);
        }

        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // ── CTAs slide up ─────────────────────────────────────────────────
      gsap.from(".l237-cta", {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".l237-cta-row", start: "top 88%" },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-16 md:py-24 lg:py-28" style={{ backgroundColor: "#FDFCF8" }}>
      <div className="container">

        {/* Heading */}
        <div className="l237-heading-area mb-14 max-w-2xl md:mb-18">
          <p className="l237-eyebrow mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#D94520]">
            Unsere Philosophie
          </p>
          <h2
            className="font-heading font-bold leading-[1.05] tracking-tight text-[#D94520]"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)" }}
          >
            <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="l237-heading-inner block">Wie wir denken.</span>
            </span>
            <span className="block" style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
              <span className="l237-heading-inner block">
                <em className="font-serif font-light not-italic text-[#D94520]/60">
                  Wie wir bauen.
                </em>
              </span>
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="l237-cards flex flex-col gap-3">
          {features.map((f, i) => {
            const isEven = i % 2 === 0;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={f.title}
                className="l237-card group relative overflow-hidden"
                style={{ height: "clamp(280px, 48vh, 520px)" }}
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="l237-card-img absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  style={{ willChange: "transform" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    isEven ? "from-black/50 to-transparent" : "from-transparent to-black/50"
                  }`}
                />

                <div
                  className="pointer-events-none absolute top-4 font-heading font-bold leading-none select-none"
                  style={{
                    fontSize: "clamp(5rem, 14vw, 12rem)",
                    right: isEven ? "2rem" : "auto",
                    left: isEven ? "auto" : "2rem",
                    color: "rgba(255,255,255,0.45)",
                  }}
                  aria-hidden="true"
                >
                  {num}
                </div>

                <div
                  className={`l237-card-content absolute bottom-0 ${isEven ? "left-0" : "right-0"} p-8 md:p-12 max-w-xl`}
                >
                  <div className="l237-card-line mb-4 h-px w-8 bg-[#D94520]" />
                  <h3
                    className="mb-3 font-heading font-bold leading-tight tracking-tight text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-white/65 md:text-base">
                    {f.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="l237-cta-row mt-12 flex flex-wrap items-center gap-6 md:mt-16">
          <a
            href="/leistungen"
            className="l237-cta inline-flex items-center bg-[#D94520] px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85"
          >
            Leistungen entdecken
          </a>
          <a
            href="/ueber-uns"
            className="l237-cta inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#D94520]/70 transition-colors duration-200 hover:text-[#D94520]"
          >
            Unsere Geschichte
            <span className="text-[#D94520]">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
