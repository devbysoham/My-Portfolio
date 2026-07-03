import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

/** Safe count-up using requestAnimationFrame — no motion/react animate dependency */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/** Sequential heading reveal: / → EXPERIENCE letters */
function SectionHeading({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VP}
        transition={{ duration: 0.7, delay, ease: EASE }}
        className="w-12 h-px bg-[#111111]/30 mb-4 origin-left"
      />
      <div
        className="text-4xl md:text-5xl font-black text-[#111] tracking-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.5, delay: delay + 0.1, ease: EASE }}
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
              transition={{ duration: 0.45, delay: delay + 0.18 + i * 0.03, ease: EASE }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

const experiences = [
  {
    role: "Fullstack Developer",
    company: "Secret Destiny Tourism",
    period: "Jun 2025 – Present",
    description: "Designing, building, and optimizing trekking adventure platforms and full-stack solutions, integrating responsive user interfaces with solid backend APIs.",
    tags: ["React", "TypeScript", "Node.js", "Express.js", "Next.js"],
  },
  {
    role: "AI Intern",
    company: "Pinnacle Labs",
    period: "Jan 2024 – Jun 2025",
    description: "Developed and optimized machine learning models, working on computer vision and intelligent system integrations to solve real-world problems.",
    tags: ["Python", "TensorFlow", "Computer Vision", "Machine Learning"],
  },
];

const stats = [
  { value: 2, suffix: "+", label: "Years Learning" },
  { value: 3, suffix: "+", label: "Projects Built" },
  { value: 2, suffix: "",  label: "Internships"   },
  { value: 5, suffix: "+", label: "Happy Clients"  },
];

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);

  // Animated timeline line that grows as section enters view
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">

        <SectionHeading title="EXPERIENCE" delay={0} />

        {/* Experience list — with growing timeline line */}
        <div className="relative mb-20" ref={listRef}>
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#E8E8E4] hidden md:block" />
          <motion.div
            className="absolute left-0 top-0 w-px bg-[#111] hidden md:block origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col divide-y divide-[#E8E8E4]">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={VP}
                transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
                className="py-10 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start group md:pl-8"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.4, delay: index * 0.12 + 0.3, type: "spring", stiffness: 300 }}
                  className="hidden md:block absolute left-[-4px] w-[9px] h-[9px] rounded-full bg-[#111] border-2 border-white"
                  style={{ top: `${index === 0 ? "42px" : "calc(50% + 42px)"}` }}
                />

                <span className="text-sm font-mono text-[#BBBBBB] mt-1" style={{ minWidth: "2rem" }}>
                  0{index + 1}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3
                      className="text-xl md:text-2xl font-bold text-[#111] tracking-tight group-hover:text-[#333] transition-colors duration-200"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {exp.role}
                    </h3>
                    <span className="text-[#999] text-sm font-medium">@ {exp.company}</span>
                  </div>
                  <p className="text-sm text-[#666] mb-4 max-w-xl leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8, y: 6 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={VP}
                        transition={{ delay: index * 0.12 + ti * 0.06 + 0.3, ease: EASE, duration: 0.35 }}
                        className="px-3 py-1 bg-[#F2F2F0] text-[#555] text-xs font-medium rounded-full border border-[#E8E8E4]"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <span className="text-sm text-[#999] font-medium whitespace-nowrap">{exp.period}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats — count-up + scale entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VP}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-4 border border-[#E8E8E4] rounded-2xl overflow-hidden"
        >
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              whileHover={{ backgroundColor: "#F7F7F5", scale: 1.02 }}
              className="flex flex-col items-center justify-center py-10 px-4 border-r border-b border-[#E8E8E4] last:border-r-0 transition-colors duration-300"
            >
              <span
                className="text-5xl md:text-6xl font-black text-[#111] tracking-tight leading-none mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <CountUp target={value} suffix={suffix} />
              </span>
              <span className="text-xs text-[#999] font-medium tracking-wide uppercase">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
