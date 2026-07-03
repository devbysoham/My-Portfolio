import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

function WordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", filter: "blur(8px)" }}
            whileInView={{ y: "0%", filter: "blur(0px)" }}
            viewport={VP}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Magnetic button — all hooks at component level */
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.38);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{
        scale: 1.06,
        boxShadow: "0 16px 40px rgba(17,17,17,0.3)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-base font-semibold rounded-full hover:bg-[#333] transition-colors duration-300 group"
    >
      {children}
      <motion.span
        className="inline-block"
        animate={{ x: 0, y: 0 }}
        whileHover={{ x: 3, y: -3 }}
        transition={{ duration: 0.2 }}
      >
        ↗
      </motion.span>
    </motion.a>
  );
}

/** 3D tilt social card */
function TiltSocialCard({ children, href, initial: initVal, i }: {
  children: React.ReactNode;
  href: string;
  initial: object;
  i: number;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const springRotY = useSpring(rotateY, { stiffness: 280, damping: 28 });

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VP}
      transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-y * 8);
        rotateY.set(x * 8);
      }}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(17,17,17,0.06)" }}
      className="flex flex-col items-start gap-3 p-5 bg-white border border-[#E8E8E4] rounded-2xl hover:border-transparent transition-all duration-300 group cursor-pointer"
    >
      {children}
    </motion.a>
  );
}

const socialLinks = [
  { label: "GitHub",    href: "https://github.com/devbysoham",                         icon: Github,    handle: "@devbysoham"       },
  { label: "Instagram", href: "https://www.instagram.com/griffin_gurdian_/",           icon: Instagram, handle: "@griffin_gurdian_"  },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/soham-mazumder-154b8732b/", icon: Linkedin,  handle: "soham-mazumder"    },
  { label: "Twitter",   href: "#",                                                      icon: Twitter,   handle: "@sohammazumder"    },
  { label: "Email",     href: "mailto:sohammazumder18@gmail.com",                       icon: Mail,      handle: "sohammazumder18@"  },
];

export function Contact() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F7F5] relative overflow-hidden">
      {/* Ambient background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(255,210,150,0.14) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 50%, rgba(200,220,255,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(255,210,150,0.14) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">

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
          className="text-xs font-semibold text-[#999] tracking-widest uppercase mb-6 block"
        >
          /CONTACT
        </motion.span>

        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-[#111] tracking-tight leading-[0.9] mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <WordReveal text="Let's Work" delay={0.2} />
          <br />
          <WordReveal text="Together." delay={0.4} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VP}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="text-lg text-[#666] mb-12 max-w-lg leading-relaxed"
        >
          Have a project in mind or want to collaborate? I'm always open to exciting opportunities and conversations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={VP}
          transition={{ duration: 0.6, delay: 0.72, ease: EASE }}
          className="mb-20"
        >
          <MagneticButton href="mailto:sohammazumder18@gmail.com">
            Say Hello
          </MagneticButton>
        </motion.div>

        {/* Social cards — 3D tilt */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <TiltSocialCard key={social.label} href={social.href} initial={{}} i={i}>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-9 h-9 bg-[#F2F2F0] rounded-xl flex items-center justify-center group-hover:bg-[#111] transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 text-[#555] group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-[#111]">{social.label}</p>
                  <p className="text-[11px] text-[#999] mt-0.5 truncate w-full">{social.handle}</p>
                </div>
              </TiltSocialCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
