"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const FRAME_COUNT = 361;

// Step targets — each step's "rest frame" where the canvas comes to a stop
// and the title + bullets fade in. Step 0 = pre-services (frame 0).
const STEP_FRAMES   = [0, 60, 130, 200, 270, 340];
// Slightly advanced frames for the bullet sub-step of each step —
// gives the camera a subtle push forward when bullets reveal.
const BULLET_FRAMES = [0, 80, 150, 220, 290, 358];
const LAST_STEP     = STEP_FRAMES.length - 1; // 5

// Per-step travel duration (seconds). Frame index is tweened over this time
// regardless of how fast/far the user scrolled.
const TRAVEL_DURATION  = 1.4;
const TITLE_LEAD_IN    = 0.15; // delay after travel before title flies in
const BULLET_STAGGER   = 0.55; // delay between bullets
const STEP_LOCK_BUFFER = 0.15; // small extra lock so back-to-back wheel ticks don't double-fire

// Each section: title + 3 bullets revealed one-by-one while scrolling
const SECTIONS = [
  {
    start: 0.00, end: 0.18,
    lines: ["Hochbau", "& Neubau"],
    eyebrow: "Leistung 01", number: "01",
    bullets: [
      "Massivbau, Stahlbeton und Fertigteilmontage",
      "Fundierte Planung mit transparenten Festpreisen",
      "Schlüsselfertige Übergabe aus einer Hand",
    ],
  },
  {
    start: 0.20, end: 0.38,
    lines: ["Erd- &", "Kanalbau"],
    eyebrow: "Leistung 02", number: "02",
    bullets: [
      "Millimetergenaue Erdbewegung und Geländemodellierung",
      "Kanal-, Leitungs- und Rohrbauarbeiten",
      "Sichere Fundamente und stabile Untergründe",
    ],
  },
  {
    start: 0.40, end: 0.58,
    lines: ["Sanierung", "& Umbau"],
    eyebrow: "Leistung 03", number: "03",
    bullets: [
      "Energetische Sanierung nach aktuellen Standards",
      "Denkmalgerechte Modernisierung mit Feingefühl",
      "Komplettumbau mit minimaler Beeinträchtigung",
    ],
  },
  {
    start: 0.60, end: 0.78,
    lines: ["Ingenieur", "bau"],
    eyebrow: "Leistung 04", number: "04",
    bullets: [
      "Brücken, Stützmauern und Sonderkonstruktionen",
      "Komplexe Tragwerke nach statischen Anforderungen",
      "Enge Abstimmung mit Planern und Behörden",
    ],
  },
  {
    start: 0.80, end: 0.97,
    lines: ["Industrie- &", "Gewerbebau"],
    eyebrow: "Leistung 05", number: "05",
    bullets: [
      "Hallen, Lager und Produktionsstätten",
      "Funktionale Büro- und Gewerbeimmobilien",
      "Termin- und budgettreue Ausführung",
    ],
  },
];

export function VideoScrollSection() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  // ── Colleague's improved loader: fetch + createImageBitmap ────────────
  const bitmapsRef      = useRef(new Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(-1);
  const rafIdRef        = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady]         = useState(false);

  // ── Title refs ────────────────────────────────────────────────────────
  const titleBlockRef  = useRef(null);
  const eyebrowRowRef  = useRef(null);
  const eyebrowLineRef = useRef(null);
  const eyebrowTextRef = useRef(null);
  const line1Ref       = useRef(null);
  const line2Ref       = useRef(null);
  const ghostNumberRef = useRef(null);

  // ── Bullet refs (3 bullet rows + their text spans) ────────────────────
  const bulletBlockRef = useRef(null);
  const bulletRefs     = useRef([null, null, null]);
  const bulletTextRefs = useRef([null, null, null]);

  // ── Progress bar ──────────────────────────────────────────────────────
  const progressBarRef = useRef(null);

  // ── Sticky container (for zoom-out transition) ────────────────────────
  const stickyRef = useRef(null);

  // ── Overlay wrapper — owns its own 100vh of natural scroll, separate
  //    from the pinned canvas wrapper so the two ScrollTriggers can't
  //    fight over positioning. ──────────────────────────────────────────
  const overlayWrapperRef = useRef(null);

  // ── Intro overlay refs ────────────────────────────────────────────────
  const overlayRef        = useRef(null);
  const overlayEyebrowRef = useRef(null);
  const overlayHeadingRef = useRef(null);
  const overlaySubRef     = useRef(null);
  const overlayLineRef    = useRef(null);
  const overlayCueRef     = useRef(null);

  // ── Step-state tracking ───────────────────────────────────────────────
  const currentStepRef      = useRef(0);             // 0..5 (0 = pre-services)
  const isAnimatingRef      = useRef(false);         // observer lockout flag
  const frameProxyRef       = useRef({ frame: 0 });  // tweenable frame counter
  const activeBulletsRef    = useRef(0);
  const activeTitleDirRef   = useRef(-1);
  const charsRef            = useRef({ line1: [], line2: [] });
  const observerRef         = useRef(null);
  const pinTriggerRef       = useRef(null);
  const lastWheelTimeRef    = useRef(0);
  const overlayDismissingRef = useRef(false);
  const bulletsRevealedRef  = useRef(false); // are the bullets for the current step visible?

  // ── Step-0 intro text overlay ─────────────────────────────────────────
  const stepZeroRef        = useRef(null);
  const stepZeroCueDotRef  = useRef(null);

  // ── Canvas draw ───────────────────────────────────────────────────────
  const drawFrame = useCallback((frameIndex) => {
    if (frameIndex === currentFrameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bitmap = bitmapsRef.current[frameIndex];
    if (!bitmap) return;
    currentFrameRef.current = frameIndex;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext("2d", { alpha: false });
    const ca = w / h, ba = bitmap.width / bitmap.height;
    let rw, rh, x, y;
    if (ca > ba) { rw = w; rh = w / ba; x = 0; y = (h - rh) / 2; }
    else { rh = h; rw = h * ba; y = 0; x = (w - rw) / 2; }
    ctx.drawImage(bitmap, x, y, rw, rh);
  }, []);

  // ── Batch loading ─────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const bitmaps = bitmapsRef.current;
    const BATCH = 25;
    const loadFrame = (i) =>
      fetch(`/images/video3-sequence/frame_${String(i).padStart(4, "0")}.jpg`)
        .then(r => r.blob()).then(blob => createImageBitmap(blob))
        .then(bitmap => {
          bitmaps[i - 1] = bitmap;
          loaded++;
          setLoadedCount(loaded);
          if (loaded === 1) drawFrame(0);
          if (loaded === FRAME_COUNT) setIsReady(true);
        });
    const loadAll = async () => {
      for (let start = 1; start <= FRAME_COUNT; start += BATCH) {
        const end = Math.min(start + BATCH - 1, FRAME_COUNT);
        await Promise.all(Array.from({ length: end - start + 1 }, (_, k) => loadFrame(start + k)));
      }
    };
    loadAll();
  }, [drawFrame]);

  // ── Helper: split element text into individual inline-block char spans ──
  const makeCharSpans = (el, text) => {
    el.innerHTML = "";
    return text.split("").map(char => {
      const s = document.createElement("span");
      s.style.display = "inline-block";
      s.textContent = char === " " ? " " : char;
      el.appendChild(s);
      return s;
    });
  };

  // ── GSAP: title enter/exit ────────────────────────────────────────────
  const enterTitle = (section) => {
    if (ghostNumberRef.current) ghostNumberRef.current.textContent = section.number;
    if (eyebrowTextRef.current) eyebrowTextRef.current.textContent = section.eyebrow;

    // Kill tweens on previous char spans + containers before replacing
    gsap.killTweensOf([
      ...charsRef.current.line1, ...charsRef.current.line2,
      line1Ref.current, line2Ref.current,
      eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current,
    ]);

    // Split lines into char spans for typewriter animation
    const chars1 = line1Ref.current ? makeCharSpans(line1Ref.current, section.lines[0]) : [];
    const chars2 = line2Ref.current ? makeCharSpans(line2Ref.current, section.lines[1]) : [];
    charsRef.current = { line1: chars1, line2: chars2 };

    const idx = SECTIONS.indexOf(section);
    const dir = idx % 2 === 0 ? -1 : 1;
    activeTitleDirRef.current = dir;
    const fromRight = dir === 1;

    // Position title block
    if (titleBlockRef.current) {
      titleBlockRef.current.style.left      = fromRight ? "auto" : "5%";
      titleBlockRef.current.style.right     = fromRight ? "5%"   : "auto";
      titleBlockRef.current.style.textAlign = fromRight ? "right" : "left";
    }
    if (eyebrowRowRef.current) {
      eyebrowRowRef.current.style.flexDirection = fromRight ? "row-reverse" : "row";
    }
    if (ghostNumberRef.current) {
      ghostNumberRef.current.style.left  = fromRight ? "3%"  : "auto";
      ghostNumberRef.current.style.right = fromRight ? "auto" : "3%";
    }

    // Position bullet block on the opposite side
    if (bulletBlockRef.current) {
      bulletBlockRef.current.style.left      = fromRight ? "5%"   : "auto";
      bulletBlockRef.current.style.right     = fromRight ? "auto" : "5%";
      bulletBlockRef.current.style.textAlign = fromRight ? "left"  : "right";
    }

    // Set bullet texts
    section.bullets.forEach((text, i) => {
      if (bulletTextRefs.current[i]) bulletTextRefs.current[i].textContent = text;
    });

    // Reset bullets to hidden
    gsap.set(bulletRefs.current, { opacity: 0, x: fromRight ? -40 : 40 });
    activeBulletsRef.current = 0;

    const extraDelay = (section.number === "02" || section.number === "05") ? 0.4 : 0;

    // Chars fly in from the actual screen edge
    const xStart = fromRight ? window.innerWidth * 0.75 : -window.innerWidth * 0.75;
    gsap.set([...chars1, ...chars2], { x: xStart, opacity: 0 });
    // Container divs must be fully visible — only char spans carry the transform
    gsap.set([line1Ref.current, line2Ref.current], { x: 0, opacity: 1 });

    gsap.set(eyebrowLineRef.current, { scaleX: 0 });
    gsap.set(eyebrowTextRef.current, { opacity: 0, x: dir * -28 });
    gsap.set(ghostNumberRef.current, { opacity: 0, x: dir * 55 });

    gsap.timeline({ delay: extraDelay })
      .to(eyebrowLineRef.current, { scaleX: 1, duration: 0.42, ease: "power3.inOut" }, 0)
      .to(eyebrowTextRef.current, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 0.12)
      .to(chars1, { x: 0, opacity: 1, duration: 0.55, stagger: { amount: 0.45, from: fromRight ? "end" : "start" }, ease: "power3.out" }, 0.18)
      .to(chars2, { x: 0, opacity: 1, duration: 0.55, stagger: { amount: 0.45, from: fromRight ? "end" : "start" }, ease: "power3.out" }, 0.32)
      .to(ghostNumberRef.current, { opacity: 0.12, x: 0, duration: 0.95, ease: "power2.out" }, 0.08);
  };

  const exitTitle = () => {
    const xOut = activeTitleDirRef.current * -80;
    gsap.killTweensOf([
      ...charsRef.current.line1, ...charsRef.current.line2,
      line1Ref.current, line2Ref.current,
      eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current,
      ...bulletRefs.current,
    ]);
    gsap.timeline()
      .to([line1Ref.current, line2Ref.current], { x: xOut, opacity: 0, duration: 0.36, ease: "power2.in", stagger: 0.05 }, 0)
      .to(eyebrowTextRef.current,               { opacity: 0, x: xOut * 0.5, duration: 0.25 },                             0)
      .to(eyebrowLineRef.current,               { scaleX: 0, duration: 0.28, ease: "power2.in" },                          0.04)
      .to(ghostNumberRef.current,               { opacity: 0, duration: 0.22 },                                            0)
      .to(bulletRefs.current,                   { opacity: 0, x: xOut * 0.5, duration: 0.28, stagger: 0.04 },              0);
    activeBulletsRef.current = 0;
  };

  // ── GSAP: show / hide individual bullets ─────────────────────────────
  const showBullet = (idx) => {
    const el = bulletRefs.current[idx];
    if (!el) return;
    const fromRight = activeTitleDirRef.current === 1;
    gsap.killTweensOf(el);
    gsap.fromTo(el,
      { opacity: 0, x: fromRight ? -45 : 45 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }
    );
  };

  const hideBullet = (idx) => {
    const el = bulletRefs.current[idx];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 0, duration: 0.25, ease: "power2.in" });
  };

  // ── Step machine: animates the canvas frame index between rest points
  //    via gsap.to (time-based, NOT scroll-coupled) and synchronises the
  //    title + bullet reveals around the travel tween.
  const goToStep = useCallback((target, { showBulletsAfter = false } = {}) => {
    if (target < 0 || target > LAST_STEP) return false;
    const current = currentStepRef.current;
    if (target === current) return false;
    if (isAnimatingRef.current) return false;

    isAnimatingRef.current = true;
    bulletsRevealedRef.current = false;

    const toFrame = STEP_FRAMES[target];

    // Hide anything currently on-screen before the canvas starts moving.
    if (current >= 1) exitTitle();
    if (current === 0 && stepZeroRef.current) {
      gsap.to(stepZeroRef.current, { opacity: 0, y: -18, duration: 0.38, ease: "power2.in" });
    }
    if (target === 0 && stepZeroRef.current) {
      gsap.to(stepZeroRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: TRAVEL_DURATION + TITLE_LEAD_IN });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${target / LAST_STEP})`;
        }
        currentStepRef.current = target;

        if (showBulletsAfter && target >= 1) {
          // Auto-reveal bullets after backward navigation lands on prev step.
          gsap.delayedCall(STEP_LOCK_BUFFER, () => {
            bulletsRevealedRef.current = true;
            const bf = BULLET_FRAMES[target];
            if (bf !== undefined) {
              gsap.to(frameProxyRef.current, {
                frame: bf, duration: 0.85, ease: "power1.inOut", snap: { frame: 1 },
                onUpdate: () => { const f = Math.round(frameProxyRef.current.frame); if (isReady) drawFrame(Math.max(0, Math.min(FRAME_COUNT - 1, f))); },
              });
            }
            [0, 1, 2].forEach((i) => {
              gsap.delayedCall(i * BULLET_STAGGER, () => showBullet(i));
            });
            gsap.delayedCall(2 * BULLET_STAGGER + STEP_LOCK_BUFFER, () => {
              isAnimatingRef.current = false;
            });
          });
        } else {
          gsap.delayedCall(STEP_LOCK_BUFFER, () => {
            isAnimatingRef.current = false;
          });
        }
      },
    });

    tl.to(frameProxyRef.current, {
      frame: toFrame,
      duration: TRAVEL_DURATION,
      ease: "power2.inOut",
      snap: { frame: 1 },
      onUpdate: () => {
        const f = Math.round(frameProxyRef.current.frame);
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, f));
        if (isReady) drawFrame(clamped);
      },
    });

    // Title only — bullets are shown on the next separate scroll gesture.
    if (target >= 1) {
      const section = SECTIONS[target - 1];
      tl.add(() => enterTitle(section), `+=${TITLE_LEAD_IN}`);
    }

    return true;
  }, [isReady, drawFrame]);

  // ── Pin + wheel wiring ────────────────────────────────────────────────
  // We use a native wheel listener instead of GSAP Observer so that
  // preventDefault is only called when the pin is genuinely active
  // (pin.isActive === true). With Observer + a delayed-enable timer there
  // was a race: the timer could fire while the scroll was still in the
  // overlay zone, causing every wheel event to silently burn through all 5
  // goToStep calls before releasing to the next section. The native approach
  // has zero timer latency — the isActive flag is authoritative.
  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const PIN_DISTANCE_VH = 6;

    const pin = ScrollTrigger.create({
      trigger: stickyRef.current,
      start: "top top",
      end:   () => `+=${window.innerHeight * PIN_DISTANCE_VH}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onEnter: () => {
        // Re-entering from above: reset to step 0 so we always start from
        // the beginning, even if a previous run ended at LAST_STEP.
        gsap.killTweensOf(frameProxyRef.current);
        isAnimatingRef.current = false;
        if (currentStepRef.current > 0) {
          gsap.set(
            [
              line1Ref.current, line2Ref.current,
              eyebrowTextRef.current, eyebrowLineRef.current,
              ghostNumberRef.current,
              ...bulletRefs.current,
            ].filter(Boolean),
            { opacity: 0 }
          );
        }
        currentStepRef.current = 0;
        bulletsRevealedRef.current = false;
        frameProxyRef.current.frame = 0;
        drawFrame(0);
        lastWheelTimeRef.current = performance.now();
        if (stepZeroRef.current) {
          gsap.killTweensOf(stepZeroRef.current);
          gsap.fromTo(stepZeroRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.1 }
          );
        }
      },
      onEnterBack: () => {
        isAnimatingRef.current = false;
        bulletsRevealedRef.current = true; // re-entering from below = was at last step with bullets
      },
    });
    pinTriggerRef.current = pin;

    const TOLERANCE = 10;
    // Minimum gap between wheel events to consider a new gesture.
    // Events closer than this are treated as momentum/inertia from the
    // previous gesture and ignored, making each scroll advance exactly
    // one step regardless of how hard or fast the user scrolls.
    const STREAM_GAP_MS = 250;

    const onWheel = (e) => {
      const now = performance.now();
      const pinST = pinTriggerRef.current;

      // ── Overlay zone: hijack first scroll and tween to pin start in
      //    one motion so a single scroll dismisses the overlay completely.
      //    pinST.start is the absolute document scroll position where the
      //    pin begins; the overlay occupies the 100vh just before that. ──
      if (!pinST || !pinST.isActive) {
        if (pinST) {
          const sy = window.scrollY || window.pageYOffset;
          const pinStart = pinST.start;
          const overlayStart = pinStart - window.innerHeight;

          // ── Overlay zone ──────────────────────────────────────────────
          if (sy >= overlayStart - 4 && sy < pinStart - 4) {
            e.preventDefault();
            if (overlayDismissingRef.current) return;
            if (Math.abs(e.deltaY) < TOLERANCE) return;
            const gap = now - lastWheelTimeRef.current;
            lastWheelTimeRef.current = now;
            if (gap < STREAM_GAP_MS) return;

            overlayDismissingRef.current = true;
            const target = e.deltaY > 0
              ? pinStart
              : Math.max(0, overlayStart - window.innerHeight);
            gsap.to(window, {
              scrollTo: target,
              duration: 0.9,
              ease: "power2.inOut",
              onComplete: () => { overlayDismissingRef.current = false; },
            });
          }

          // ── Post-pin zone: one upward scroll → back to step 5 ────────
          // Covers the camera-zoom zone + first viewport of next section.
          const postPinThreshold = pinST.end + window.innerHeight * 1.5;
          if (e.deltaY < 0 && sy >= pinST.end && sy <= postPinThreshold) {
            e.preventDefault();
            if (overlayDismissingRef.current) return;
            if (Math.abs(e.deltaY) < TOLERANCE) return;
            const gap = now - lastWheelTimeRef.current;
            lastWheelTimeRef.current = now;
            if (gap < STREAM_GAP_MS) return;

            overlayDismissingRef.current = true;
            gsap.to(window, {
              scrollTo: pinST.end - 4,
              duration: 0.9,
              ease: "power2.inOut",
              onComplete: () => { overlayDismissingRef.current = false; },
            });
          }
        }
        return;
      }
      e.preventDefault();

      if (isAnimatingRef.current) {
        // Keep timestamp current so post-animation momentum events are
        // correctly identified as part of the same stream.
        lastWheelTimeRef.current = now;
        return;
      }
      if (Math.abs(e.deltaY) < TOLERANCE) return;

      // Skip if this event is part of an ongoing momentum stream.
      const gap = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;
      if (gap < STREAM_GAP_MS) return;

      // ── Helpers for two-phase (title → bullets) sub-step system ────────
      const tweenToFrame = (targetFrame, duration = 0.7, ease = "power1.inOut") => {
        gsap.to(frameProxyRef.current, {
          frame: targetFrame,
          duration,
          ease,
          snap: { frame: 1 },
          onUpdate: () => {
            const f = Math.round(frameProxyRef.current.frame);
            drawFrame(Math.max(0, Math.min(FRAME_COUNT - 1, f)));
          },
        });
      };

      const showBulletsNow = () => {
        bulletsRevealedRef.current = true;
        isAnimatingRef.current = true;
        // Subtle camera push to the bullet frame.
        const bulletFrame = BULLET_FRAMES[currentStepRef.current];
        if (bulletFrame !== undefined) tweenToFrame(bulletFrame, 0.85, "power1.inOut");
        [0, 1, 2].forEach((i) => {
          gsap.delayedCall(i * BULLET_STAGGER, () => showBullet(i));
        });
        gsap.delayedCall(2 * BULLET_STAGGER + STEP_LOCK_BUFFER, () => {
          isAnimatingRef.current = false;
        });
      };

      const hideBulletsNow = () => {
        bulletsRevealedRef.current = false;
        isAnimatingRef.current = true;
        // Pull camera back to the title frame.
        const titleFrame = STEP_FRAMES[currentStepRef.current];
        if (titleFrame !== undefined) tweenToFrame(titleFrame, 0.55, "power1.inOut");
        [0, 1, 2].forEach((i) => hideBullet(i));
        gsap.delayedCall(0.55 + STEP_LOCK_BUFFER, () => { isAnimatingRef.current = false; });
      };

      if (e.deltaY > 0) {
        if (currentStepRef.current >= LAST_STEP && bulletsRevealedRef.current) {
          // Exit forward (bullets already shown on step 5).
          const nextEl = sectionRef.current?.nextElementSibling;
          const target = nextEl ? nextEl.offsetTop : pinST.end + window.innerHeight;
          gsap.to(window, { scrollTo: target, duration: 0.9, ease: "power2.inOut" });
        } else if (currentStepRef.current >= 1 && !bulletsRevealedRef.current) {
          // Phase 2: reveal bullets for the current step.
          showBulletsNow();
        } else {
          // Advance to next step (title only; bullets come on the next scroll).
          goToStep(currentStepRef.current + 1);
        }
      } else {
        if (currentStepRef.current <= 0) {
          const overlayTarget = Math.max(0, pinST.start - window.innerHeight);
          gsap.to(window, { scrollTo: overlayTarget, duration: 0.9, ease: "power2.inOut" });
        } else if (bulletsRevealedRef.current) {
          // Hide bullets (stay on same step title).
          hideBulletsNow();
        } else {
          // Go back one step and auto-show that step's bullets.
          const prev = currentStepRef.current - 1;
          if (prev <= 0) {
            goToStep(0);
          } else {
            goToStep(prev, { showBulletsAfter: true });
          }
        }
      }
    };

    // Touch: track swipe direction across touchmove
    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      const pinST = pinTriggerRef.current;

      // Overlay + post-pin zones: same one-swipe logic as wheel.
      if (!pinST || !pinST.isActive) {
        if (pinST) {
          const sy = window.scrollY || window.pageYOffset;
          const pinStart = pinST.start;
          const overlayStart = pinStart - window.innerHeight;
          const dy = touchStartY - e.touches[0].clientY;

          if (sy >= overlayStart - 4 && sy < pinStart - 4) {
            e.preventDefault();
            if (overlayDismissingRef.current) return;
            if (Math.abs(dy) < 30) return;
            touchStartY = e.touches[0].clientY;
            overlayDismissingRef.current = true;
            const target = dy > 0
              ? pinStart
              : Math.max(0, overlayStart - window.innerHeight);
            gsap.to(window, {
              scrollTo: target,
              duration: 0.9,
              ease: "power2.inOut",
              onComplete: () => { overlayDismissingRef.current = false; },
            });
          }

          const postPinThreshold = pinST.end + window.innerHeight * 1.5;
          if (dy < 0 && sy >= pinST.end && sy <= postPinThreshold) {
            e.preventDefault();
            if (overlayDismissingRef.current) return;
            if (Math.abs(dy) < 30) return;
            touchStartY = e.touches[0].clientY;
            overlayDismissingRef.current = true;
            gsap.to(window, {
              scrollTo: pinST.end - 4,
              duration: 0.9,
              ease: "power2.inOut",
              onComplete: () => { overlayDismissingRef.current = false; },
            });
          }
        }
        return;
      }
      e.preventDefault();
      if (isAnimatingRef.current) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < 30) return;
      touchStartY = e.touches[0].clientY;
      if (dy > 0) {
        if (currentStepRef.current >= LAST_STEP && bulletsRevealedRef.current) {
          const nextEl = sectionRef.current?.nextElementSibling;
          const target = nextEl ? nextEl.offsetTop : pinST.end + window.innerHeight;
          gsap.to(window, { scrollTo: target, duration: 0.9, ease: "power2.inOut" });
        } else if (currentStepRef.current >= 1 && !bulletsRevealedRef.current) {
          bulletsRevealedRef.current = true;
          isAnimatingRef.current = true;
          const bf = BULLET_FRAMES[currentStepRef.current];
          if (bf !== undefined) gsap.to(frameProxyRef.current, { frame: bf, duration: 0.85, ease: "power1.inOut", snap: { frame: 1 }, onUpdate: () => { drawFrame(Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameProxyRef.current.frame)))); } });
          [0, 1, 2].forEach((i) => { gsap.delayedCall(i * BULLET_STAGGER, () => showBullet(i)); });
          gsap.delayedCall(2 * BULLET_STAGGER + STEP_LOCK_BUFFER, () => { isAnimatingRef.current = false; });
        } else {
          goToStep(currentStepRef.current + 1);
        }
      } else {
        if (currentStepRef.current <= 0) {
          const overlayTarget = Math.max(0, pinST.start - window.innerHeight);
          gsap.to(window, { scrollTo: overlayTarget, duration: 0.9, ease: "power2.inOut" });
        } else if (bulletsRevealedRef.current) {
          bulletsRevealedRef.current = false;
          isAnimatingRef.current = true;
          const tf = STEP_FRAMES[currentStepRef.current];
          if (tf !== undefined) gsap.to(frameProxyRef.current, { frame: tf, duration: 0.55, ease: "power1.inOut", snap: { frame: 1 }, onUpdate: () => { drawFrame(Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameProxyRef.current.frame)))); } });
          [0, 1, 2].forEach((i) => hideBullet(i));
          gsap.delayedCall(0.55 + STEP_LOCK_BUFFER, () => { isAnimatingRef.current = false; });
        } else {
          const prev = currentStepRef.current - 1;
          if (prev <= 0) { goToStep(0); }
          else { goToStep(prev, { showBulletsAfter: true }); }
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      pin.kill();
      pinTriggerRef.current = null;
    };
  }, [goToStep]);

  // ── Camera-style transition between this section and the next ────────
  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    if (!section || !sticky) return;

    const nextEl = section.nextElementSibling;
    if (!nextEl) return;

    sticky.style.transformOrigin   = "center center";
    sticky.style.willChange        = "transform, border-radius";
    nextEl.style.transformOrigin   = "center top";
    nextEl.style.willChange        = "transform, opacity";

    // Phase 1 — sticky pulls back over the last viewport-height of the
    // section. Looks like the camera dollies out.
    const stickyTrigger = ScrollTrigger.create({
      trigger: section,
      start: () => `bottom bottom`,
      end:   () => `bottom top`,
      scrub: 0.6,
      onUpdate: (self) => {
        const t = self.progress;                  // 0 → 1
        const scale  = 1 - t * 0.18;              // 1.00 → 0.82
        const radius = t * 28;                    // 0  → 28px
        const opac   = 1 - t * 0.12;              // 1.00 → 0.88
        sticky.style.transform    = `scale(${scale})`;
        sticky.style.borderRadius = `${radius}px`;
        sticky.style.opacity      = String(opac);
      },
    });

    // Phase 2 — picks up where Phase 1 leaves off: the next section
    // appears oversized (camera "punches into" it) and settles to 1×
    // as the user scrolls it into place. Same easing direction as
    // Phase 1, so the two read as one continuous camera move.
    const nextTrigger = ScrollTrigger.create({
      trigger: nextEl,
      start: "top bottom",   // first peek over the fold
      end:   "top top",      // settled by the time it reaches the top
      scrub: 0.6,
      onUpdate: (self) => {
        const t = self.progress;                  // 0 → 1
        const eased = 1 - Math.pow(1 - t, 3);     // ease-out cubic — punches in fast, settles
        const scale = 2.6 - eased * 1.6;          // 2.60 → 1.00
        const ty    = (1 - eased) * -180;         // -180 → 0
        const opac  = 0.05 + eased * 0.95;        // 0.05 → 1.00
        nextEl.style.transform = `scale(${scale}) translateY(${ty}px)`;
        nextEl.style.opacity   = String(opac);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      stickyTrigger.kill();
      nextTrigger.kill();
      sticky.style.transform    = "";
      sticky.style.borderRadius = "";
      sticky.style.opacity      = "";
      nextEl.style.transform    = "";
      nextEl.style.opacity      = "";
    };
  }, []);

  // (Removed: legacy "snap-to-top when re-entering from below" effect.
  //  The Observer + pin model owns boundary handling now.)

  // ── Intro overlay: enter reveal + scroll-driven fade out ──────────────
  useEffect(() => {
    if (!overlayRef.current) return;
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(overlayRef.current, { autoAlpha: 1 });
      gsap.set(overlayLineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(overlayEyebrowRef.current, { y: 24, opacity: 0 });
      gsap.set(overlayHeadingRef.current, { y: 60, opacity: 0 });
      gsap.set(overlaySubRef.current, { y: 22, opacity: 0 });
      gsap.set(overlayCueRef.current, { y: 18, opacity: 0 });

      // Trigger entrance when section is approaching the viewport
      const enterTl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      enterTl
        .to(overlayLineRef.current, {
          scaleX: 1, duration: 0.9, ease: "expo.inOut",
        })
        .to(overlayEyebrowRef.current, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        }, "-=0.5")
        .to(overlayHeadingRef.current, {
          y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
        }, "-=0.4")
        .to(overlaySubRef.current, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        }, "-=0.6")
        .to(overlayCueRef.current, {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        }, "-=0.4");

      // Single unified dismiss timeline: strict sequence (overlay fully out,
      // then nothing) driven by one ScrollTrigger with directional snap so
      // a single scroll impulse glides past the overlay zone in one motion.
      const dismissTl = gsap.timeline();
      dismissTl
        // Kill pointer interception immediately so the canvas below can
        // receive Observer events during the fade (autoAlpha alone only
        // hides at opacity 0, which is too late).
        .set(overlayRef.current, { pointerEvents: "none" }, 0)
        .to(overlayHeadingRef.current, {
          y: -100, ease: "power2.in", duration: 0.7,
        }, 0)
        .to(overlayRef.current, {
          autoAlpha: 0, scale: 1.05, ease: "power2.inOut", duration: 1,
        }, 0);

      ScrollTrigger.create({
        trigger: overlayWrapperRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
        animation: dismissTl,
      });

      // Animated scroll cue indicator (continuous loop)
      const cueDot = overlayCueRef.current?.querySelector("[data-cue-dot]");
      if (cueDot) {
        gsap.to(cueDot, {
          y: 16, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Init + resize ─────────────────────────────────────────────────────
  useEffect(() => {
    // Line containers stay visible; char spans handle their own opacity/position
    gsap.set([line1Ref.current, line2Ref.current], { x: 0, opacity: 1 });
    gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([eyebrowTextRef.current, ghostNumberRef.current], { opacity: 0 });
    gsap.set(bulletRefs.current, { opacity: 0 });
    if (stepZeroRef.current) gsap.set(stepZeroRef.current, { opacity: 0, y: 22 });

    const handleResize = () => {
      if (!canvasRef.current) return;
      currentFrameRef.current = -1;
      // Re-paint the current step's frame at the new canvas size.
      const f = Math.round(frameProxyRef.current.frame);
      drawFrame(Math.max(0, Math.min(FRAME_COUNT - 1, f)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // ── Fade in step-zero overlay once all frames are loaded ─────────────
  useEffect(() => {
    if (!isReady || !stepZeroRef.current) return;
    gsap.to(stepZeroRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.15 });
    if (stepZeroCueDotRef.current) {
      gsap.to(stepZeroCueDotRef.current, { y: 16, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }
  }, [isReady]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f0f0ef]">
      {/* ── Overlay wrapper — naturally flowing 100vh. Owns the overlay
          snap ScrollTrigger; separate from the pinned canvas wrapper so
          the two cannot fight for positioning. ──────────────────────── */}
      <div ref={overlayWrapperRef} className="relative h-screen w-full overflow-hidden">
        {/* ── Intro overlay ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[45] flex flex-col justify-center px-[5%] pt-32 md:pt-40 pb-32 md:pb-40"
          style={{ background: "#D94520" }}
        >
          {/* Layered gradient (matches Hero aesthetic) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,42,107,1) 0%, rgba(10,32,89,1) 45%, rgba(7,25,74,1) 100%)",
            }}
          />
          {/* Soft gold radial glow (matches Hero) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.12) 0%, transparent 55%)",
            }}
          />

          {/* Top-right meta (matches Hero) */}
          <div className="absolute top-24 right-[5%] hidden lg:flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.3em] text-white/60">
            <span className="h-px w-10 bg-white/70" />
            <span>Kapitel 02</span>
          </div>

          {/* Main content (left-aligned, mirrors Hero composition) */}
          <div className="relative z-10 max-w-[1400px]">
            <p
              ref={overlayEyebrowRef}
              className="mb-6 font-body text-sm font-semibold uppercase tracking-[0.4em] text-white flex items-center gap-4"
            >
              <span ref={overlayLineRef} className="block h-px w-12 bg-white" />
              Eine Reise durch unsere Gewerke
            </p>

            <h2
              ref={overlayHeadingRef}
              className="font-heading font-bold leading-[1.0] tracking-tight text-white"
              style={{ fontSize: "clamp(2.4rem, 6vw, 6rem)" }}
            >
              Unsere Leistungen <br className="hidden md:block" />nah erleben.
            </h2>

            <p
              ref={overlaySubRef}
              className="mt-14 md:mt-20 font-body text-base md:text-lg leading-relaxed text-white/70 max-w-xl"
            >
              Scrollen Sie durch fünf Gewerke und entdecken Sie, wie wir vom
              ersten Erdaushub bis zur schlüsselfertigen Übergabe jeden Schritt
              beherrschen.
            </p>
          </div>

          {/* Scroll cue (matches Hero) */}
          <div
            ref={overlayCueRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/50">
              Weiterscrollen
            </span>
            <div className="relative h-12 w-px bg-white/15 overflow-hidden">
              <span
                data-cue-dot
                className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-px bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Canvas wrapper — pinned by ScrollTrigger ── */}
      <div ref={stickyRef} className="relative h-screen w-full overflow-hidden" style={{ transformOrigin: "center center" }}>

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Atmospheric gradient */}
        <div className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(7,25,74,0.65) 0%, rgba(7,25,74,0.08) 50%, rgba(7,25,74,0.2) 100%)" }}
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.45) 100%)" }}
        />

        {/* Ghost number */}
        <div
          ref={ghostNumberRef}
          className="pointer-events-none absolute bottom-[6%] right-[3%] font-heading font-bold leading-none text-white select-none z-20"
          style={{ fontSize: "clamp(6rem, 14vw, 18rem)", letterSpacing: "-0.04em", opacity: 0 }}
          aria-hidden="true"
        />

        {/* ── Step-0 intro text — visible only before any step is chosen ── */}
        <div
          ref={stepZeroRef}
          className="pointer-events-none absolute bottom-[11%] left-[5%] z-30"
          style={{ opacity: 0 }}
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="block h-px bg-white" style={{ width: "2.2rem" }} />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-white">
              5 Gewerke · Unsere Leistungen
            </span>
          </div>
          <div
            className="font-heading font-bold leading-[0.92] tracking-tight text-white"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 7rem)",
              textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)",
            }}
          >
            Erleben Sie unsere<br />Leistungen hautnah.
          </div>
          <p
            className="mt-5 font-body text-base leading-relaxed text-white/60 max-w-[30rem]"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95)" }}
          >
            Scrollen Sie, um fünf Gewerke und jeden Schritt unserer Arbeit zu entdecken.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <div className="relative h-10 w-px overflow-hidden bg-white/15">
              <span
                ref={stepZeroCueDotRef}
                className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white"
              />
            </div>
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-white/45">
              Weiterscrollen
            </span>
          </div>
        </div>

        {/* ── Title block — repositions left/right ── */}
        <div ref={titleBlockRef} className="pointer-events-none absolute bottom-[11%] z-30" style={{ left: "5%" }}>
          <div ref={eyebrowRowRef} className="mb-5 flex items-center gap-4">
            <span ref={eyebrowLineRef} className="block h-px bg-white" style={{ width: "2.2rem" }} />
            <span ref={eyebrowTextRef} className="font-body text-xs font-semibold uppercase tracking-[0.32em] text-white" />
          </div>
          <div
            ref={line1Ref}
            className="font-heading font-bold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 9vw, 10.5rem)", textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)", paddingBottom: "0.04em" }}
          />
          <div
            ref={line2Ref}
            className="font-heading font-bold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 9vw, 10.5rem)", textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)", paddingBottom: "0.04em" }}
          />
        </div>

        {/* ── Bullet block — opposite side of title ── */}
        <div
          ref={bulletBlockRef}
          className="pointer-events-none absolute top-[38%] z-30 max-w-[340px] -translate-y-1/2 space-y-14"
          style={{ right: "5%" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={el => bulletRefs.current[i] = el}
              className="flex items-start gap-3"
            >
              <span
                className="mt-[0.6em] block h-px w-5 flex-shrink-0 bg-white/70"
              />
              <p
                ref={el => bulletTextRefs.current[i] = el}
                className="font-body text-base leading-relaxed text-white/85 md:text-lg"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.85)" }}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-[2px] w-full bg-white/8">
          <div
            ref={progressBarRef}
            className="h-full bg-white"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
        </div>

        {/* Grain */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay z-20" xmlns="http://www.w3.org/2000/svg">
          <filter id="vss-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vss-grain)" />
        </svg>

        {/* Loading screen */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#D94520]">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-white/40">Wird geladen</p>
            <div className="h-px w-48 bg-white/10">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${Math.round((loadedCount / FRAME_COUNT) * 100)}%` }}
              />
            </div>
            <p className="mt-3 font-body text-xs text-white/25">{Math.round((loadedCount / FRAME_COUNT) * 100)}%</p>
          </div>
        )}

      </div>
    </section>
  );
}
