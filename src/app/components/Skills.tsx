import { Code2, Server, Database } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["HTML", "Javascript", "Tailwind CSS"],
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Python"],
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["Supabase", "MongoDB", "Firebase"],
      gradient: "from-pink-600 to-orange-600",
      bgGradient: "from-pink-500/10 to-orange-500/10",
      borderColor: "border-pink-500/30",
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-400",
    },
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 font-['Space_Grotesk',sans-serif]">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
              
              {/* Card content */}
              <div className={`relative bg-gradient-to-br ${category.bgGradient} backdrop-blur-xl rounded-3xl p-8 border ${category.borderColor} hover:border-opacity-60 transition-all duration-300 h-full`}>
                <div className={`w-16 h-16 ${category.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk',sans-serif]">
                  {category.title}
                </h3>
                
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-slate-300 group-hover:text-white transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}></div>
                      <span className="text-lg">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
