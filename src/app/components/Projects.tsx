import { Github, ExternalLink } from "lucide-react";
import accidentDetectionImg from "@/assets/704d8bc962955c583b321ab961190405abd345f7.png";
import secretDestinyImg from "@/assets/fe3568f9e4d58b3a7fec39f02b02747157551127.png";
import simpleStorageImg from "@/assets/d52f450439018b0f33ffbe1d0402c2fb09ad8ed4.png";
import { motion } from "motion/react";

export function Projects() {
  const projects = [
    {
      title: "AI-VISION Emergency Response",
      description: "Real-time accident detection and emergency dispatch system powered by AI and computer vision technology.",
      image: accidentDetectionImg,
      github: "https://github.com/devbysoham/accident-detection2",
      tags: ["AI/ML", "Computer Vision", "Emergency Response"],
      gradient: "from-red-500 to-orange-500",
      featured: true
    },
    {
      title: "Secret Destiny Tourism",
      description: "Discover hidden trails and untouched destinations. An authentic trekking adventure platform for explorers.",
      image: secretDestinyImg,
      website: "https://secret-destiny.vercel.app/",
      tags: ["Full-Stack", "Tourism", "Web App"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Decentralized Storage",
      description: "Securely store your files on the blockchain. Decentralized, private, and reliable Web3 storage solution.",
      image: simpleStorageImg,
      github: "https://github.com/devbysoham/Simple-Storage",
      tags: ["Blockchain", "Web3", "Decentralized"],
      gradient: "from-purple-500 to-blue-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 font-['Space_Grotesk',sans-serif]">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              className="group relative h-full"
            >
              {/* Gradient glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>

              {/* Card content */}
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 h-full flex flex-col hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative overflow-hidden h-56">
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay`}></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                {/* Project Info */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-3 font-['Space_Grotesk',sans-serif] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium rounded-full uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-300 group/btn border border-slate-700 hover:border-slate-500`}
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-medium hover:shadow-lg hover:shadow-${project.gradient.split('-')[1]}-500/25 transition-all duration-300 hover:scale-105 group/btn`}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
