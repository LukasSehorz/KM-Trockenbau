"use client";

import { useRef, useEffect } from "react";
import { gsap } from "../../../utils/gsap";

const stats = [
  { value: "57",  label: "Abgeschlossene Projekte",  num: 57,  suffix: "" },
  { value: "98%", label: "Pünktliche Fertigstellung", num: 98,  suffix: "%" },
  { value: "96%", label: "Im Budgetrahmen",           num: 96,  suffix: "%" },
  { value: "30+", label: "Jahre in der Region",       num: 30,  suffix: "+" },
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

      // ── Pinned scrubbed master timeline ────────────────────────────────
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#FDFCF8" }}
    >
      {/* Background */}
      <div className="s17-bg-clip absolute inset-0 z-0">
        <img
          src="/images/villa-twilight.jpg"
          alt="Bayerische Villa im Abendlicht"
          className="s17-bg-img absolute inset-0 size-full object-cover"
          style={{ willChange: "transform" }}
        />
        <div className="s17-overlay absolute inset-0" style={{ backgroundColor: "#FDFCF8" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center px-[5%] py-16 md:py-24 lg:py-28">
        <div className="grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-2 lg:gap-x-20">

          {/* Left */}
          <div>
            <p className="s17-eyebrow mb-3 font-body text-sm font-semibold uppercase tracking-[0.28em] text-[#0D1B2A] md:mb-4">
              Unsere Zahlen
            </p>

            <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-[#0D1B2A] md:mb-6 md:text-5xl lg:text-6xl">
              <span ref={line1Ref} className="block">Ergebnisse,</span>
              <span ref={line2Ref} className="block">die für sich sprechen</span>
            </h2>

            <p className="s17-sub font-body text-base text-[#0A1628]/65 md:text-lg">
              Seit 2020 in der Region Dorfen & Erding. Projekte für Generationen. Ein Name.
            </p>
            <div className="mt-8">
              <a
                href="/projekte"
                className="s17-cta group inline-flex items-center gap-3 border border-[#C8784A]/30 px-7 py-3 font-body text-sm font-semibold tracking-[0.14em] uppercase text-[#C8784A] transition-all duration-200 hover:bg-[#C8784A] hover:text-white hover:border-[#C8784A]"
              >
                Projekte entdecken
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-2 md:gap-x-12 md:gap-y-12">
            {stats.map((stat) => (
              <div key={stat.label} className="s17-stat-item relative pl-6">
                <div
                  className="s17-item-border absolute left-0 top-0 h-full w-0.5 bg-[#C8784A]/70"
                  style={{ transformOrigin: "top center" }}
                />
                <p className="s17-num mb-2 font-heading text-5xl font-bold leading-tight text-[#C8784A] md:text-6xl lg:text-7xl">
                  {stat.value}
                </p>
                <p className="font-body text-sm font-medium text-[#0A1628]/65 md:text-base">
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
