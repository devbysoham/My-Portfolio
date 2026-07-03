import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

const services = [
  {
    title: "FRONTEND DEVELOPMENT",
    description: "Building clear, high-performance, and responsive interfaces with modern frameworks. Optimized builds using Vite, React, and modular styling.",
    skills: ["HTML", "JavaScript", "Tailwind CSS", "React", "TypeScript", "Vite"],
  },
  {
    title: "BACKEND DEVELOPMENT",
    description: "Designing scalable backend architectures, secure REST/GraphQL APIs, and fast server logic using modern Python and JavaScript runtimes.",
    skills: ["Node.js", "Express.js", "NestJS", "FastAPI", "Flask", "Django", "Python"],
  },
  {
    title: "AI & ML INTEGRATION",
    description: "Blending intelligent systems with modern web applications. Computer vision, ML models integrated into production web products.",
    skills: ["Python", "Computer Vision", "OpenAI APIs", "TensorFlow"],
  },
  {
    title: "DATABASE & CLOUD",
    description: "Designing reliable, highly available database schemes and scaling apps across modern multi-cloud platforms.",
    skills: ["PostgreSQL", "MySQL", "AWS", "Microsoft Azure", "GCP", "Vercel", "Netlify", "Supabase", "MongoDB", "Firebase"],
  },
];

/** Sequential heading reveal: / → SERVICE → description */
function SectionHeading({ label, title, delay = 0 }: { label: string; title: string; delay?: number }) {
  return (
    <div className="mb-12">
      {/* Growing divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VP}
        transition={{ duration: 0.7, delay, ease: EASE }}
        className="w-12 h-px bg-[#111111]/30 mb-4 origin-left"
      />
      {/* Slash prefix appears first */}
      <div
        className="text-4xl md:text-5xl font-black text-[#111] tracking-tight overflow-hidden"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.55, delay: delay + 0.1, ease: EASE }}
          >
            /
          </motion.span>
        </span>
        {title.split("").map((ch, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
              whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.5, delay: delay + 0.18 + i * 0.035, ease: EASE }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** 3D tilt card wrapper for service rows */
function TiltRow({ children, className }: { children: React.ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 250, damping: 30 });
  const springRotY = useSpring(rotateY, { stiffness: 250, damping: 30 });

  return (
    <motion.div
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-y * 4);
        rotateY.set(x * 4);
      }}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Skills() {
  const [openService, setOpenService] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto">

        {/* Sequential heading reveal */}
        <SectionHeading label="/SERVICES" title="SERVICE" delay={0} />

        <div className="relative">
          <p
            className="absolute -top-4 right-0 text-[5rem] md:text-[8rem] font-black text-[#EBEBEA] leading-none select-none pointer-events-none tracking-tight uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            SERVICES
          </p>

          <div className="relative z-10 divide-y divide-[#E0E0DC]">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
              >
                {/* ── EXPANDED panel ── */}
                <AnimatePresence initial={false}>
                  {openService === index && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden mb-0">
                        <div className="p-8 md:p-10 flex flex-col md:flex-row items-start gap-8">
                          <div className="flex-1">
                            {/* Title slides up after bg expands */}
                            <motion.h3
                              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
                              className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight"
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {service.title}
                            </motion.h3>
                            {/* Description fades in */}
                            <motion.p
                              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
                              className="text-[#AAAAAA] text-sm leading-relaxed max-w-md"
                            >
                              {service.description}
                            </motion.p>
                            {/* Tags stagger in */}
                            <div className="flex flex-wrap gap-2 mt-6">
                              {service.skills.map((skill, si) => (
                                <motion.span
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{ delay: 0.3 + si * 0.05, ease: EASE, duration: 0.35 }}
                                  className="px-3 py-1 bg-white/10 text-[#CCC] text-xs font-medium rounded-full border border-white/10"
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                          {/* Close button rotates in */}
                          <motion.button
                            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
                            whileHover={{ rotate: 90, scale: 1.15, backgroundColor: "rgba(255,255,255,0.15)" }}
                            onClick={() => setOpenService(null)}
                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
                          >
                            ✕
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── COLLAPSED row ── */}
                {openService !== index && (
                  <TiltRow>
                    <motion.button
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => setOpenService(index)}
                      className="w-full flex items-center justify-between py-7 text-left group"
                    >
                      <h3
                        className="text-2xl md:text-4xl font-black text-[#111] tracking-tight group-hover:text-[#444] transition-colors duration-200"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {service.title}
                      </h3>
                      <motion.div
                        whileHover={{ rotate: 45, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="w-10 h-10 rounded-full border border-[#CCCCC8] flex items-center justify-center text-[#555] group-hover:bg-[#111] group-hover:text-white group-hover:border-[#111] transition-all duration-300 shrink-0"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </motion.button>
                  </TiltRow>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
