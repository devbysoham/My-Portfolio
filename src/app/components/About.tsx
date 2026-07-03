import { motion, useMotionValue, useSpring } from "motion/react";
import { Code2, Lightbulb, Rocket } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

/** Clips each word upward into view with blur */
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", filter: "blur(8px)" }}
            whileInView={{ y: "0%", filter: "blur(0px)" }}
            viewport={VP}
            transition={{ duration: 0.7, delay: delay + i * 0.09, ease: EASE }}
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** 3D tilt card for trait items */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const springRotY = useSpring(rotateY, { stiffness: 280, damping: 28 });

  return (
    <motion.div
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-y * 5);
        rotateY.set(x * 5);
      }}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  const traits = [
    { icon: Code2,     label: "Design Focus",      desc: "Strong eye for design and performance optimization" },
    { icon: Rocket,    label: "Full-Stack Journey", desc: "Currently upskilling in modern web development" },
    { icon: Lightbulb, label: "AI-ML Enthusiast",  desc: "Blending intelligent systems with web apps" },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            {/* Growing Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="w-12 h-px bg-[#111111]/30 mb-4 origin-left"
            />

            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="text-xs font-semibold text-[#999] tracking-widest uppercase mb-4 block"
            >
              About
            </motion.span>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[#111] tracking-tight leading-[0.9] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <WordReveal text="Hi there!! 👋" delay={0.2} />
            </h2>

            <div className="flex flex-col gap-4">
              {traits.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={VP}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: EASE }}
                >
                  <TiltCard className="flex items-start gap-4 group p-3 rounded-xl hover:bg-[#F7F7F5] transition-colors duration-200">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-10 h-10 bg-[#F2F2F0] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#111] transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5 text-[#555] group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-[#111]">{label}</p>
                      <p className="text-sm text-[#777] mt-0.5">{desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="flex flex-col justify-center gap-8 lg:pt-16"
          >
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="text-lg md:text-xl text-[#333] leading-relaxed"
            >
              A <strong className="text-[#111] font-semibold">Fullstack Developer</strong> with a strong eye for design, performance, and user experience. I enjoy building clean, responsive, and scalable web interfaces that turn ideas into engaging digital experiences.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="w-16 h-px bg-[#E0E0DC] origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-lg md:text-xl text-[#333] leading-relaxed"
            >
              Currently learning <strong className="text-[#111] font-semibold">Machine Learning (ML)</strong>, driven by the vision of blending intelligent systems with modern web applications to solve real-world problems. Passionate about continuous learning, exploring emerging technologies, and collaborating on innovative projects that create meaningful impact.
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.68, ease: EASE }}
              whileHover={{ x: 4 }}
              className="relative inline-flex items-center gap-1.5 text-sm font-medium text-[#111] w-fit group"
            >
              Get in Touch ↗
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
