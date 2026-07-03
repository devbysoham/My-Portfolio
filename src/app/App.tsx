import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Achievements } from "./components/Achievements";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Preloader } from "./components/ui/Preloader";
import { BlobBackground } from "./components/ui/BlobBackground";
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECTIONS = ["hero", "about", "achievements", "skills", "experience", "projects", "contact"];

/** Vertical dot scroll indicator — shows which section the user is in */
function ScrollDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2, ease: EASE }}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {SECTIONS.map((id, i) => (
        <motion.a
          key={id}
          href={`#${id}`}
          aria-label={id}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
          animate={{
            scale: active === i ? 1 : 0.7,
            backgroundColor: active === i ? "#111111" : "rgba(17,17,17,0.25)",
          }}
          whileHover={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            width: 8,
            height: active === i ? 24 : 8,
            borderRadius: 99,
            display: "block",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [loading, setLoading] = useState(true);

  // Lenis smooth scroll — initialize only after loading finishes to prevent scrolling during load
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#F7F7F5] overflow-x-hidden font-sans text-[#111111]">
      <CustomCursor />

      {/* Animated blob background — fixed, z-0 */}
      {!loading && <BlobBackground />}

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#111111] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Vertical dot indicator */}
      {!loading && <ScrollDots />}

      {/* Main content entrance animation */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Navbar />
          <div className="flex flex-col">
            <section id="hero"><Hero /></section>
            <section id="about"><About /></section>
            <section id="achievements"><Achievements /></section>
            <section id="skills"><Skills /></section>
            <section id="experience"><Experience /></section>
            <section id="projects"><Projects /></section>
            <section id="contact"><Contact /></section>
          </div>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}