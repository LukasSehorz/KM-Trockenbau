"use client";

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../../../utils/gsap";

const stats = [
  { value: "10+",  label: "Jahre Erfahrung",          num: 10,  suffix: "+" },
  { value: "100%", label: "DIN-normgerecht",           num: 100, suffix: "%" },
  { value: "1",    label: "Fester Ansprechpartner",    num: 1,   suffix: "" },
  { value: "200+", label: "Abgeschlossene Projekte",   num: 200, suffix: "+" },
];

const splitWords = (el, text) => {
  el.innerHTML = "";
  return text.split(" ").map((word, i, arr) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.paddingBottom = "0.08em";
    if (i < arr.length - 1) wrap.style.marginRight = "0.28em";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    return inner;
  });
};

export function Stats17() {
  const sectionRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words1 = line1Ref.current ? splitWords(line1Ref.current, "Ergebnisse,") : [];
      const words2 = line2Ref.current ? splitWords(line2Ref.current, "die für sich sprechen") : [];
      const allWords = [...words1, ...words2];

      // ── Initial states ─────────────────────────────────────────────────
      gsap.set(".s17-bg-img",      { scale: 1.18 });
      gsap.set(".s17-overlay",     { opacity: 0.15 });
      gsap.set(".s17-eyebrow",     { y: 26, opacity: 0 });
      gsap.set(allWords,           { yPercent: 115 });
      gsap.set(".s17-sub",         { y: 22, opacity: 0 });
      gsap.set(".s17-cta",         { y: 18, opacity: 0 });
      gsap.set(".s17-stat-item",   { y: 44, opacity: 0 });
      gsap.set(".s17-item-border", { scaleY: 0 });

      const mm = gsap.matchMedia();

      // ── Desktop Layout (min-width: 1024px) ──
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Phase 1 (0 → 0.55): clip-path portal + Ken Burns
        tl.fromTo(".s17-bg-clip",
          { clipPath: "inset(18% 22% 18% 22%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.55 },
          0
        );
        tl.to(".s17-bg-img",
          { scale: 1, ease: "power2.out", duration: 0.55 },
          0
        );

        // Phase 2 (0.50 → 0.65): overlay deepens
        tl.to(".s17-overlay",
          { opacity: 0.7, ease: "power2.inOut", duration: 0.15 },
          0.50
        );

        // Phase 3a (0.60): eyebrow slides up
        tl.to(".s17-eyebrow",
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.08 },
          0.60
        );

        // Phase 3b (0.63): heading words mask-reveal, staggered
        tl.to(words1,
          { yPercent: 0, ease: "expo.out", stagger: 0.022, duration: 0.14 },
          0.63
        );
        tl.to(words2,
          { yPercent: 0, ease: "expo.out", stagger: 0.022, duration: 0.14 },
          0.68
        );

        // Phase 3c (0.76): sub text + CTA
        tl.to(".s17-sub",
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.09 },
          0.76
        );
        tl.to(".s17-cta",
          { y: 0, opacity: 1, ease: "back.out(1.5)", duration: 0.09 },
          0.80
        );

        // Phase 4 (0.66): stat cards stagger in from below
        tl.to(".s17-stat-item",
          { y: 0, opacity: 1, ease: "power3.out", stagger: 0.05, duration: 0.12 },
          0.66
        );

        // Phase 4 parallel: borders draw down
        tl.fromTo(".s17-item-border",
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: "top center", stagger: 0.05, ease: "power3.out", duration: 0.10 },
          0.68
        );

        // Phase 4 parallel: counters tick up
        const numEls = gsap.utils.toArray(".s17-num", sectionRef.current);
        numEls.forEach((el, i) => {
          const stat = stats[i];
          const obj  = { val: 0 };
          tl.to(obj, {
            val: stat.num,
            ease: "power2.out",
            duration: 0.14,
            onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
          }, 0.72 + i * 0.04);
        });
      });

      // ── Mobile Layout (max-width: 1023px) ──
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Simple background reveal without pinning
        tl.fromTo(".s17-bg-clip",
          { clipPath: "inset(10% 12% 10% 12%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", duration: 0.8 },
          0
        );
        tl.to(".s17-bg-img",
          { scale: 1, ease: "power2.out", duration: 0.8 },
          0
        );
        tl.to(".s17-overlay",
          { opacity: 0.88, ease: "power2.out", duration: 0.6 },
          0.2
        );

        // Animate copy
        tl.to(".s17-eyebrow", { y: 0, opacity: 1, duration: 0.4 }, 0.3);
        tl.to(words1, { yPercent: 0, stagger: 0.03, duration: 0.6, ease: "expo.out" }, 0.4);
        tl.to(words2, { yPercent: 0, stagger: 0.03, duration: 0.6, ease: "expo.out" }, 0.5);
        tl.to(".s17-sub", { y: 0, opacity: 1, duration: 0.4 }, 0.6);
        tl.to(".s17-cta", { y: 0, opacity: 1, duration: 0.4 }, 0.7);

        // Stats items
        tl.to(".s17-stat-item", { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" }, 0.5);
        tl.to(".s17-item-border", { scaleY: 1, transformOrigin: "top center", stagger: 0.08, duration: 0.4, ease: "power3.out" }, 0.6);

        // Counters
        const numEls = gsap.utils.toArray(".s17-num", sectionRef.current);
        numEls.forEach((el, i) => {
          const stat = stats[i];
          const obj  = { val: 0 };
          tl.to(obj, {
            val: stat.num,
            ease: "power2.out",
            duration: 0.8,
            onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
          }, 0.7 + i * 0.08);
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden h-auto lg:h-screen"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Background */}
      <div className="s17-bg-clip absolute inset-0 z-0">
        <img
          src="/images/villa-twilight.jpg"
          alt="Bayerische Villa im Abendlicht"
          className="s17-bg-img absolute inset-0 size-full object-cover"
          style={{ willChange: "transform" }}
        />
        <div className="s17-overlay absolute inset-0" style={{ backgroundColor: "#FFFFFF" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center px-[5%] py-16 md:py-24 lg:py-28">
        <div className="grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20">

          {/* Left */}
          <div>
            <p className="s17-eyebrow mb-3 font-body text-sm font-semibold uppercase tracking-[0.28em] text-[#0D2020] md:mb-4">
              Unsere Zahlen
            </p>

            <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-[#0D2020] md:mb-6 md:text-5xl lg:text-6xl">
              <span ref={line1Ref} className="block">Ergebnisse,</span>
              <span ref={line2Ref} className="block">die für sich sprechen</span>
            </h2>

            <p className="s17-sub font-body text-base text-[#0D2020]/65 md:text-lg">
              K.M. Trockenbau in Regensburg — Innenausbau nach aktuellen DIN-Normen,
              mit persönlicher Beratung und kontinuierlicher Weiterbildung.
            </p>
            <div className="mt-8">
              <Link
                to="/leistungen"
                className="s17-cta group inline-flex items-center gap-3 border border-[#5AACB5]/30 px-7 py-3 font-body text-sm font-semibold tracking-[0.14em] uppercase text-[#5AACB5] transition-all duration-200 hover:bg-[#5AACB5] hover:text-white hover:border-[#5AACB5]"
              >
                Leistungen entdecken
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-2 md:gap-x-12 md:gap-y-12">
            {stats.map((stat) => (
              <div key={stat.label} className="s17-stat-item relative pl-6">
                <div
                  className="s17-item-border absolute left-0 top-0 h-full w-0.5 bg-[#5AACB5]/70"
                  style={{ transformOrigin: "top center" }}
                />
                <p className="s17-num mb-2 font-heading text-5xl font-bold leading-tight text-[#5AACB5] md:text-6xl lg:text-7xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm font-medium text-[#0D2020]/65 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
