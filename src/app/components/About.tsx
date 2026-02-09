import { Code2, Lightbulb, Rocket } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 font-['Space_Grotesk',sans-serif] inline-flex items-center gap-4 justify-center flex-wrap">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-xy">
              Hi there!!
            </span>
            <span className="text-7xl md:text-9xl animate-wave inline-block">👋</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="group p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Design Focus</h3>
            <p className="text-slate-400">Strong eye for design and performance optimization</p>
          </div>

          <div className="group p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Full-Stack Journey</h3>
            <p className="text-slate-400">Currently upskilling in modern web development</p>
          </div>

          <div className="group p-6 bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-ML Enthusiast</h3>
            <p className="text-slate-400">Blending intelligent systems with web apps</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                A <span className="text-blue-400 font-semibold">Frontend Developer</span> with a strong eye for design, performance, and user experience, currently upskilling in <span className="text-purple-400 font-semibold">Full-Stack Web Development</span>. I enjoy building clean, responsive, and scalable web interfaces that turn ideas into engaging digital experiences.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                An <span className="text-pink-400 font-semibold">AI-ML enthusiast</span>, driven by the vision of blending intelligent systems with modern web applications to solve real-world problems. Passionate about continuous learning, exploring emerging technologies, and collaborating on innovative projects that create meaningful impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
