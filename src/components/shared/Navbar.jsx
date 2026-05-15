"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";

const HOUSE_PATH = "M6 20L24 6L42 20V42H30V30H18V42H6V20Z";
const ACCENT = "#D94520";

const navLinks = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Projekte", href: "/projekte" },
  {
    label: "Über uns",
    href: "/ueber-uns",
    children: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Jobs", href: "/ueber-uns#jobs" },
    ],
  },
  { label: "Prozess", href: "/prozess" },
];

function DropdownLink({ link, active, dark }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleChildClick(e, child) {
    setOpen(false);
    if (!child.href.includes("#")) return;
    e.preventDefault();
    const [path, hash] = child.href.split("#");
    const scrollToEl = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (pathname === path) {
      scrollToEl();
    } else {
      navigate(path);
      setTimeout(scrollToEl, 120);
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={link.href}
        className={clsx(
          "relative flex items-center gap-1 text-sm font-medium tracking-wide transition-all duration-300",
          dark
            ? active ? "text-white opacity-100" : "text-white opacity-65 hover:opacity-100"
            : active ? "text-[#0A1628] opacity-100" : "text-[#0A1628] opacity-60 hover:opacity-100"
        )}
      >
        {link.label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="mt-[1px] opacity-60">
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {active && (
          <motion.span
            layoutId="nav-underline"
            className={clsx("absolute -bottom-[1.5px] left-0 right-0 h-px", dark ? "bg-white" : "bg-[#0A1628]")}
          />
        )}
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2 z-50"
          >
            <div className={clsx(
              "min-w-[160px] shadow-xl py-1 border",
              dark
                ? "bg-[#0A1628] border-white/10"
                : "bg-[#FDFCF8] border-[#0A1628]/10"
            )}>
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={(e) => handleChildClick(e, child)}
                  className={clsx(
                    "block px-5 py-3 text-sm font-medium transition-colors duration-150",
                    dark
                      ? "text-white/70 hover:text-white hover:bg-white/5"
                      : "text-[#0A1628]/70 hover:text-[#0A1628] hover:bg-[#0A1628]/5"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const { pathname } = useLocation();
  const toggle = () => setIsMobileMenuOpen((prev) => !prev);
  const navRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const detectTheme = () => {
      const nav = navRef.current;
      if (!nav) return;
      const navH = nav.getBoundingClientRect().height;

      // Force dark while hero section is still the primary view
      const hero = document.getElementById("hero-section");
      if (hero) {
        if (hero.getBoundingClientRect().bottom > navH) {
          setIsDark(true);
          return;
        }
      } else if (window.scrollY < window.innerHeight * 0.8) {
        // Fallback: hero element not yet in DOM, use scroll position
        setIsDark(true);
        return;
      }

      const elements = document.elementsFromPoint(window.innerWidth / 2, navH + 2);

      for (const el of elements) {
        if (nav === el || nav.contains(el)) continue;
        let node = el;
        while (node && node !== document.body) {
          const bg = window.getComputedStyle(node).backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            const nums = bg.match(/[\d.]+/g);
            if (nums && nums.length >= 3) {
              const lum = (0.299 * +nums[0] + 0.587 * +nums[1] + 0.114 * +nums[2]) / 255;
              setIsDark(lum < 0.5);
            }
            return;
          }
          node = node.parentElement;
        }
        break;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detectTheme);
    };

    // Double RAF ensures DOM is fully painted before first detection
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(detectTheme);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Reset to dark on route change (most pages start with a dark hero)
  useEffect(() => { setIsDark(true); }, [pathname]);

  return (
    <nav
      ref={navRef}
      className={clsx(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300",
        isDark
          ? "bg-[#040D1C] border-white/10"
          : "bg-[#FDFCF8]/95 border-[#0A1628]/10"
      )}
    >
      <div className="grid h-auto min-h-[4.5rem] grid-cols-[1fr_max-content_1fr] items-center px-[5%]">

        {/* Left: hamburger (mobile) or nav links (desktop) */}
        <div className="flex items-center">
          <button
            className="flex size-10 flex-col justify-center gap-[5px] lg:hidden"
            onClick={toggle}
            aria-label="Navigation öffnen"
          >
            {[
              isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
              isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 },
              isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
            ].map((anim, i) => (
              <motion.span
                key={i}
                className={clsx("h-[1.5px] w-6 origin-center block transition-colors duration-300", isDark ? "bg-white" : "bg-[#0A1628]")}
                animate={anim}
                transition={{ duration: i === 1 ? 0.15 : 0.25, ease: "easeInOut" }}
              />
            ))}
          </button>

          <div className="hidden lg:flex items-center gap-x-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              if (link.children) {
                return <DropdownLink key={link.href} link={link} active={active} dark={isDark} />;
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx(
                    "relative text-sm font-medium tracking-wide transition-all duration-300",
                    isDark
                      ? active ? "text-white opacity-100" : "text-white opacity-65 hover:opacity-100"
                      : active ? "text-[#0A1628] opacity-100" : "text-[#0A1628] opacity-60 hover:opacity-100"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={clsx("absolute -bottom-[1.5px] left-0 right-0 h-px transition-colors duration-300", isDark ? "bg-white" : "bg-[#0A1628]")}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center: logo */}
        <Link to="/" className="flex items-center justify-center gap-2 py-4">
          <svg viewBox="0 0 48 48" fill="none" className="shrink-0" style={{ width: 20, height: 20 }}>
            <path
              d={HOUSE_PATH}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              className={clsx("transition-colors duration-300", isDark ? "text-white" : "text-[#0A1628]")}
            />
          </svg>
          <span className={clsx("font-heading text-xl font-bold tracking-[0.08em] uppercase transition-colors duration-300", isDark ? "text-white" : "text-[#0A1628]")}>
            WM Bau GmbH
          </span>
        </Link>

        {/* Right: Kontakt + phone */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/kontakt"
            className={clsx(
              "hidden lg:inline-flex items-center rounded-full border px-5 py-2 font-body text-sm font-medium tracking-wide transition-all duration-300",
              isDark
                ? pathname === "/kontakt"
                  ? "border-white/60 text-white"
                  : "border-white/25 text-white/75 hover:border-white/60 hover:text-white"
                : pathname === "/kontakt"
                  ? `border-[${ACCENT}] text-[${ACCENT}]`
                  : "border-[#0A1628]/20 text-[#0A1628]/70 hover:border-[#0A1628]/50 hover:text-[#0A1628]"
            )}
          >
            Kontakt
          </Link>
          <a
            href="tel:+4915158720108"
            className={clsx(
              "hidden sm:inline-flex items-center gap-2 rounded-full border px-5 py-2 font-body text-sm font-medium tracking-wide transition-all duration-300",
              isDark
                ? "border-white/25 text-white/75 hover:border-white/60 hover:text-white"
                : "border-[#0A1628]/20 text-[#0A1628]/70 hover:border-[#0A1628]/50 hover:text-[#0A1628]"
            )}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
            </svg>
            0151 58 72 01 08
          </a>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={toggle}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
              className="fixed left-0 top-0 z-50 flex h-dvh w-[85%] max-w-sm flex-col bg-[#040D1C] border-r border-white/10 shadow-xlarge px-8 pb-10"
            >
              <div className="flex items-center justify-between py-5 mb-8 border-b border-white/10">
                <span className="font-heading text-xl font-bold tracking-[0.12em] uppercase text-white">
                  WM Bau GmbH
                </span>
                <button onClick={toggle} className="size-8 flex items-center justify-center text-white/70 text-2xl leading-none">
                  ×
                </button>
              </div>
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <React.Fragment key={link.href}>
                    <Link
                      to={link.href}
                      onClick={toggle}
                      className={clsx(
                        "py-4 text-base font-medium border-b border-white/10 transition-all duration-200",
                        pathname === link.href ? "text-white pl-2" : "text-white/70 hover:text-white hover:pl-2"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={toggle}
                        className={clsx(
                          "py-3 pl-6 text-sm font-medium border-b border-white/8 transition-all duration-200",
                          pathname === child.href ? "text-white" : "text-white/45 hover:text-white"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <Link
                  to="/kontakt"
                  onClick={toggle}
                  className="flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-wide text-[#0A1628] hover:opacity-90 transition-opacity duration-200"
                >
                  Beratung anfragen
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
