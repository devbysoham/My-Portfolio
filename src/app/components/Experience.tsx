import { Briefcase, ExternalLink, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      role: "Full Stack Web Developer",
      company: "Secret Destiny Tourism",
      type: "Startup",
      website: "https://secret-destiny.vercel.app/",
      current: false,
      description: "Building end-to-end web solutions for tourism platform",
    },
    {
      role: "Intern",
      company: "Pinnacle Labs",
      type: "Currently",
      current: true,
      description: "Learning and contributing to innovative tech projects",
    },
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 font-['Space_Grotesk',sans-serif]">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              {/* Card content */}
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-['Space_Grotesk',sans-serif]">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-300 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-lg">{exp.company}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400">{exp.type}</span>
                        </div>
                      </div>
                      
                      {exp.current && (
                        <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-semibold">
                          Current Position
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-400 mb-4">
                      {exp.description}
                    </p>
                    
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-600/30 hover:border-blue-500/50 transition-all duration-300 font-semibold group/link"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
