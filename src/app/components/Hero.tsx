import heroImage from "@/assets/soham_hero.png";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/griffin_gurdian_/",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/soham-mazumder-154b8732b/",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "GitHub",    href: "https://github.com/devbysoham",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: "Email",     href: "mailto:sohammazumder18@gmail.com",
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
];

/** Letter-by-letter reveal with layered blur → move → opacity */
function LetterReveal({
  text,
  baseDelay = 0,
  stagger = 0.045,
  className = "",
  style = {},
}: {
  text: string;
  baseDelay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={{ ...style, display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.65,
              delay: baseDelay + i * stagger,
              ease: EASE,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Bouncing scroll indicator */
function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.9, ease: EASE }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
    >
      <span className="text-[10px] font-medium text-[#AAA] tracking-widest uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-8 bg-gradient-to-b from-[#AAA] to-transparent"
      />
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: photo drifts up slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawPhotoY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const rawTextY   = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const photoY  = useSpring(rawPhotoY,  { stiffness: 80, damping: 20 });
  const textY   = useSpring(rawTextY,   { stiffness: 80, damping: 20 });

  return (
    <section ref={sectionRef} className="relative bg-[#F7F7F5] pt-16 overflow-x-hidden">

      {/* ── Name Row ─────────────────────────────── */}
      <div className="w-full overflow-hidden">

        {/* Desktop — one row letter-by-letter reveal */}
        <motion.div
          style={{
            y: textY,
            opacity: rawOpacity,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "8.5vw",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
          }}
          className="hidden md:flex items-baseline justify-center gap-4 lg:gap-6 px-6 lg:px-10 pt-6"
        >
          <LetterReveal
            text="SOHAM"
            baseDelay={0.15}
            stagger={0.055}
            style={{ WebkitTextStroke: "2.5px #111111", color: "transparent" }}
          />
          <LetterReveal
            text="MAZUMDER"
            baseDelay={0.5}
            stagger={0.045}
            style={{ color: "#111111" }}
          />
        </motion.div>

        {/* Mobile — stacked */}
        <div
          className="flex md:hidden flex-col px-3 pt-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.02em" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            style={{ fontSize: "21vw", WebkitTextStroke: "2px #111111", color: "transparent", display: "block" }}
          >
            SOHAM
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.27, ease: EASE }}
            style={{ fontSize: "14vw", color: "#111111", display: "block" }}
          >
            MAZUMDER
          </motion.span>
        </div>
      </div>

      {/* ── Hero Body ─────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end">

          {/* Left: Role & CTA */}
          <div className="order-2 md:order-1 flex flex-col gap-3 py-6 md:pb-12 md:pt-0 max-w-[260px]">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.75, ease: EASE }}
                className="text-lg md:text-xl font-bold text-[#111]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Full Stack Developer
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, delay: 0.88, ease: EASE }}
                className="text-sm text-[#666] mt-1.5 leading-relaxed"
              >
                Building responsive, scalable, and user-focused web applications.
              </motion.p>
            </div>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 15, scale: 0.92, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
              whileHover={{ scale: 1.06, boxShadow: "0 8px 24px rgba(17,17,17,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-semibold rounded-full w-fit hover:bg-[#333] transition-colors duration-300 group"
            >
              Let's collaborate
              <motion.svg
                width="13" height="13" viewBox="0 0 14 14" fill="none"
                animate={{ x: [0, 0], y: [0, 0] }}
                whileHover={{ x: 2, y: -2 }}
                transition={{ duration: 0.2 }}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              >
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.a>
          </div>

          {/* Center: Hero photo — cinematic scale+blur reveal */}
          <div className="order-1 md:order-2" style={{ width: "clamp(180px, 30vw, 400px)", margin: "0 auto" }}>
            <motion.div style={{ y: photoY }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.42, ease: EASE }}
                className="relative flex justify-center items-end"
              >
                {/* Warm glow */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: "80%",
                    background: "radial-gradient(ellipse at 50% 85%, rgba(255,195,120,0.38) 0%, rgba(255,220,160,0.14) 55%, transparent 75%)",
                  }}
                />
                <motion.img
                  src={heroImage}
                  alt="Soham Mazumder"
                  className="relative w-full h-auto object-contain object-bottom z-10"
                  style={{ maxHeight: "clamp(260px, 52vh, 580px)" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Social pills — stagger from right */}
          <motion.div
            className="order-3 flex flex-col gap-2 py-6 md:pb-12 md:pt-0 items-start md:items-end"
          >
            <div className="flex flex-row flex-wrap md:flex-col gap-2">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: 1.1 + i * 0.1, ease: EASE }}
                  whileHover={{ scale: 1.05, x: -4, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-white/80 border border-[#E0E0DC] rounded-full text-sm font-medium text-[#333] hover:bg-white hover:border-[#AAAAAA] hover:shadow-sm transition-all duration-200 backdrop-blur-sm whitespace-nowrap"
                >
                  <span className="text-[#777] flex-shrink-0">{s.icon}</span>
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <ScrollHint />

      <div className="w-full border-t border-[#E0E0DC] mt-6" />
    </section>
  );
}