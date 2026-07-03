import { motion, useMotionValue, useSpring } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

const socialLinks = [
  { label: "GitHub",    href: "https://github.com/devbysoham" },
  { label: "Instagram", href: "https://www.instagram.com/griffin_gurdian_/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/soham-mazumder-154b8732b/" },
  { label: "Email",     href: "mailto:sohammazumder18@gmail.com" },
];

/** Magnetic social button */
function MagneticIcon({ label, href, i }: { label: string; href: string; i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={VP}
      transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.45);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.45);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.2, backgroundColor: "#ffffff", color: "#111111", borderColor: "transparent" }}
      className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#888] transition-all duration-200"
      aria-label={label}
      title={label}
    >
      <span className="text-[10px] font-semibold tracking-wide uppercase">{label.slice(0, 2)}</span>
    </motion.a>
  );
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VP}
      transition={{ duration: 0.7, ease: EASE }}
      className="bg-[#111111] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          <div>
            {/* Letter-by-letter reveal for SM. */}
            <h3
              className="text-4xl font-black tracking-tight mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {"SM.".split("").map((ch, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    initial={{ y: "110%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={VP}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-sm text-[#666]"
            >
              Building the web, one pixel at a time.
            </motion.p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((s, i) => (
              <MagneticIcon key={s.label} label={s.label} href={s.href} i={i} />
            ))}
          </div>
        </div>

        {/* Divider grows from left */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="w-full h-px bg-[#222] my-10 origin-left"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#555]">
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {new Date().getFullYear()} Soham Mazumder. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[#444]"
          >
            Designed & built with ♥ using React + Tailwind + Framer Motion
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}
