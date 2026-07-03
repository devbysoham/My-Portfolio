import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work",       href: "#projects",   badge: "3"  },
    { name: "Service",    href: "#skills",      badge: "4"  },
    { name: "Experience", href: "#experience",  badge: "2+" },
    { name: "Contact",    href: "#contact"                  },
  ];

  return (
    /* ── Navbar slide-down on load ── */
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E0E0DC]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D0D0CC] bg-white/70 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-[#333] tracking-wide">Available for New Project</span>
        </motion.div>

        {/* Desktop nav links — staggered */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.06, ease: EASE }}
              className="relative flex items-center gap-1.5 text-sm font-medium text-[#555] hover:text-[#111] transition-colors duration-200 group"
            >
              {link.name}
              {link.badge && (
                <span className="text-[10px] text-[#999] font-normal">[{link.badge}]</span>
              )}
              {/* Underline hover animation */}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          ))}
        </div>

        {/* CTA — scales on hover */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2 bg-[#111111] text-white text-sm font-medium rounded-full hover:bg-[#333] transition-colors duration-300"
        >
          Let's Talk
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        {/* Mobile toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="md:hidden text-[#111] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="md:hidden bg-[#F7F7F5]/97 backdrop-blur-xl border-b border-[#E0E0DC] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-xl font-medium text-[#333] hover:text-[#111]"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      {link.badge && <span className="text-sm text-[#999]">[{link.badge}]</span>}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-sm font-medium rounded-full w-fit"
                onClick={() => setIsOpen(false)}
              >
                Let's Talk ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
