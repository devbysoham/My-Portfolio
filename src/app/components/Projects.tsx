import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import accidentDetectionImg from "@/assets/704d8bc962955c583b321ab961190405abd345f7.png";
import secretDestinyImg from "@/assets/fe3568f9e4d58b3a7fec39f02b02747157551127.png";
import simpleStorageImg from "@/assets/d52f450439018b0f33ffbe1d0402c2fb09ad8ed4.png";
import dailyBartaImg from "@/assets/daily_barta.png";
import reshamKrishiImg from "@/assets/resham_krishi.png";
import hackanizerImg from "@/assets/hackanizer.png";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP = { once: true, amount: 0.1 } as const;

const projects = [
  {
    title: "AI-VISION Emergency Response",
    description: "Real-time accident detection and emergency dispatch system powered by AI and computer vision technology.",
    image: accidentDetectionImg,
    github: "https://github.com/devbysoham/accident-detection2",
    tags: ["AI/ML", "Computer Vision", "Emergency Response"],
    category: "Real Project",
  },
  {
    title: "Secret Destiny Tourism",
    description: "Discover hidden trails and untouched destinations. An authentic trekking adventure platform for explorers.",
    image: secretDestinyImg,
    website: "https://secret-destiny.vercel.app/",
    tags: ["Full-Stack", "Tourism", "Web App"],
    category: "Real Project",
  },
  {
    title: "The Daily Barta",
    description: "Developed as part of a hackathon to solve the problem of efficient content management and structured publishing in modern web applications.",
    image: dailyBartaImg,
    github: "https://github.com/devbysoham/The-Daily-",
    tags: ["Hackathon", "Content Management", "Full-Stack"],
    category: "Real Project",
  },
  {
    title: "ReshamKrishi AI",
    description: "Silkworm and mulberry leaf disease detection for better sericulture using advanced image classification models.",
    image: reshamKrishiImg,
    github: "https://github.com/devbysoham/Resham-Krishi",
    website: "https://resham-krishi.netlify.app/",
    tags: ["AI/ML", "Image Detection", "Sericulture"],
    category: "Real Project",
  },
  {
    title: "Hackanizer",
    description: "An all-in-one hackathon management platform designed to streamline the complete lifecycle of a hackathon.",
    image: hackanizerImg,
    github: "https://github.com/devbysoham/Hackanizer",
    tags: ["Hackathon", "Platform", "Management"],
    category: "Real Project",
  },
  {
    title: "Decentralized Storage",
    description: "Securely store your files on the blockchain. Decentralized, private, and reliable Web3 storage solution.",
    image: simpleStorageImg,
    github: "https://github.com/devbysoham/Simple-Storage",
    tags: ["Blockchain", "Web3", "Decentralized"],
    category: "Exploration",
  },
];

/** Sequential heading reveal */
function SectionHeading({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <div>
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
              initial={{ y: "110%", opacity: 0, filter: "blur(5px)" }}
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

/** 3D tilt card — all hooks at component level */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 7);
    rotateY.set(x * 7);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: "preserve-3d", perspective: 1200 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Image that scales 1.1 → 1 as it enters viewport (scroll-based reveal) */
function ScrollRevealImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.12, 1]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ scale }}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filters = ["All", "Real Project", "Exploration"];
  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);
  const displayed = showAll ? filtered : filtered.slice(0, 4);

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="relative mb-12">
          <p
            className="absolute -top-6 left-0 text-[6rem] md:text-[9rem] font-black text-[#EBEBEA] leading-none select-none pointer-events-none tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", zIndex: 0 }}
          >
            PORTFOLIO
          </p>
          <div className="relative z-10 pt-8">
            <SectionHeading title="SELECTED WORK" delay={0} />
          </div>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={VP}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="flex items-center justify-between mb-10 flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  setShowAll(false);
                }}
                className={`text-sm font-medium transition-colors duration-200 pb-1 relative ${
                  activeFilter === f ? "text-[#111]" : "text-[#999] hover:text-[#555]"
                }`}
              >
                {f}
                {activeFilter === f && (
                  <motion.span
                    layoutId="filterUnderline"
                    className="absolute -bottom-0 left-0 right-0 h-0.5 bg-[#111]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <a
            href="https://github.com/devbysoham"
            target="_blank" rel="noopener noreferrer"
            className="relative flex items-center gap-1.5 text-sm font-medium text-[#333] hover:text-[#111] transition-colors group"
          >
            View All Work
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#111] group-hover:w-full transition-all duration-300" />
          </a>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayed.map((project, index) => (
            <TiltCard key={project.title} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VP}
                whileHover={{
                  y: -10,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(17,17,17,0.08)",
                }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E8E8E4] hover:border-transparent transition-all duration-300 h-full flex flex-col"
              >
                {/* Image — scroll-based scale reveal */}
                <div className="relative overflow-hidden h-56 bg-[#F0F0EE]">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#333] rounded-full uppercase tracking-widest border border-[#E0E0DC]">
                      {project.category}
                    </span>
                  </div>
                  <ScrollRevealImage src={project.image} alt={project.title} />
                  {/* Hover overlay with arrow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#111]/5 flex items-end justify-end p-4 pointer-events-none"
                  >
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#E0E0DC] shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 12L12 2M12 2H4M12 2V10" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#111] mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#666] mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={VP}
                        transition={{ delay: index * 0.1 + ti * 0.05 + 0.3, ease: EASE }}
                        className="px-3 py-1 bg-[#F2F2F0] text-[#555] text-xs font-medium rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-[#555] hover:text-[#111] transition-colors group/link"
                        whileHover={{ x: 2 }}
                      >
                        <Github size={13} />
                        <span>Code</span>
                        <motion.span
                          className="inline-block"
                          animate={{ x: 0 }}
                          whileHover={{ x: 2, y: -2 }}
                        >↗</motion.span>
                      </motion.a>
                    )}
                    {(project as any).website && (
                      <motion.a
                        href={(project as any).website}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-[#555] hover:text-[#111] transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                        <motion.span
                          className="inline-block"
                          animate={{ x: 0 }}
                          whileHover={{ x: 2, y: -2 }}
                        >↗</motion.span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* View More button */}
        {!showAll && filtered.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.06, boxShadow: "0 12px 32px rgba(17,17,17,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors duration-300 shadow-sm"
            >
              View More Work
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
