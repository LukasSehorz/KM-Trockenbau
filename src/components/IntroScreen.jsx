"use client";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

const TEXT = "WM Bau GmbH";
const CHARS = TEXT.split("");

const FONT = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(1.5rem, 3.2vw, 3.8rem)",
  color: "#FFFFFF",
  letterSpacing: "0.06em",
  whiteSpace: "pre",
  display: "inline-block",
};

const HOUSE_SIZE = { width: "clamp(26px, 3vw, 44px)", height: "clamp(26px, 3vw, 44px)" };
const HOUSE_PATH = "M6 20L24 6L42 20V42H30V30H18V42H6V20Z";
const EASE = [0.76, 0, 0.24, 1];

export default function IntroScreen({ onComplete }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 1000);
    const t2 = setTimeout(onComplete, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "#040D1C",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      initial={{ opacity: 1 }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.7, ease: EASE },
      }}
    >
      <LayoutGroup>

        {/* ── Phase 1: House alone, centred, draws itself ── */}
        {!revealed && (
          <motion.div layoutId="house">
            <svg viewBox="0 0 48 48" fill="none" style={{ display: "block", ...HOUSE_SIZE }}>
              <motion.path
                d={HOUSE_PATH}
                stroke="#FFFFFF" strokeWidth="2.5"
                strokeLinejoin="round" strokeLinecap="round" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.85, ease: EASE },
                  opacity: { duration: 0.1 },
                }}
              />
            </svg>
          </motion.div>
        )}

        {/* ── Phase 2: House slides left (layoutId), text staggered in ── */}
        {revealed && (
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 1.4vw, 22px)" }}>

            {/* Same layoutId → Framer Motion animates house from centre to here */}
            <motion.div
              layoutId="house"
              transition={{ duration: 1.05, ease: EASE }}
            >
              <svg viewBox="0 0 48 48" fill="none" style={{ display: "block", ...HOUSE_SIZE }}>
                <path
                  d={HOUSE_PATH}
                  stroke="#FFFFFF" strokeWidth="2.5"
                  strokeLinejoin="round" strokeLinecap="round" fill="none"
                />
              </svg>
            </motion.div>

            {/* Text characters stagger in */}
            <div style={{ overflow: "hidden" }}>
              <motion.div
                style={{ display: "flex" }}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.9 } } }}
              >
                {CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
                    }}
                    style={FONT}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

          </div>
        )}

      </LayoutGroup>
    </motion.div>
  );
}
