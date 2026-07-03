import { motion, useMotionValue, useSpring } from "motion/react";
import { Rocket, Users, Lightbulb } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

const achievements = [
  {
    icon: Rocket,
    iconColor: "text-amber-500",
    title: "Full Stack Development",
    description: "Building end-to-end applications with modern technologies",
  },
  {
    icon: Users,
    iconColor: "text-amber-500",
    title: "Team Leadership",
    description: "Leading collaborative teams to successful project execution",
  },
  {
    icon: Lightbulb,
    iconColor: "text-amber-500",
    title: "Innovation Focus",
    description: "Creating cutting-edge solutions with emerging technologies",
  },
];

/** 3D tilt achievement card */
function TiltAchievementCard({ children, index }: { children: React.ReactNode; index: number }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 260, damping: 28 });
  const springRotY = useSpring(rotateY, { stiffness: 260, damping: 28 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={VP}
      transition={{ duration: 0.7, delay: index * 0.14, ease: EASE }}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-y * 8);
        rotateY.set(x * 8);
      }}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      whileHover={{
        y: -10,
        boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
      }}
      className="group relative bg-[#111111] rounded-2xl p-8 border border-[#222222] flex flex-col items-center text-center justify-center min-h-[220px] cursor-default"
    >
      {/* Glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/8 via-transparent to-transparent pointer-events-none"
      />

      {children}
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section className="py-20 px-6 lg:px-12 bg-[#F7F7F5] border-t border-[#E8E8E4]">
      <div className="max-w-7xl mx-auto">

        {/* Growing Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-12 h-px bg-[#111111]/30 mb-4 origin-left"
        />

        {/* Section Header */}
        <motion.span
          initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="text-xs font-semibold text-[#999] tracking-widest uppercase mb-4 block"
        >
          /ACHIEVEMENTS
        </motion.span>

        {/* Heading — letter reveal */}
        <h2
          className="text-4xl md:text-5xl font-black text-[#111] tracking-tight mb-12"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {"Achievements Unlocked".split("").map((ch, i) => (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
                whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                viewport={VP}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.025, ease: EASE }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Cards — staggered 3D tilt */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <TiltAchievementCard key={item.title} index={index}>
                {/* Animated Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="mb-6 p-4 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center"
                >
                  <Icon className={`w-8 h-8 ${item.iconColor}`} />
                </motion.div>

                <h3
                  className="text-lg font-bold text-amber-500 mb-3 tracking-wide"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-[#8A9A9A] text-sm leading-relaxed font-mono font-medium max-w-[220px]">
                  {item.description}
                </p>
              </TiltAchievementCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
