import { Mail, Linkedin, Github, Instagram, Twitter, Send } from "lucide-react";

export function Contact() {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:sohammazumder18@gmail.com",
      color: "from-red-500 to-orange-500",
      hoverColor: "hover:shadow-red-500/50",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/soham-mazumder-154b8732b/",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:shadow-blue-500/50",
    },
    {
      name: "Github",
      icon: Github,
      href: "https://github.com/devbysoham",
      color: "from-slate-600 to-slate-700",
      hoverColor: "hover:shadow-slate-500/50",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/griffin_gurdian_/",
      color: "from-pink-500 via-purple-500 to-orange-500",
      hoverColor: "hover:shadow-pink-500/50",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/mazumder_soham",
      color: "from-sky-400 to-blue-500",
      hoverColor: "hover:shadow-sky-500/50",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 font-['Space_Grotesk',sans-serif]">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Get in Touch Message */}
        <div className="relative mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Send className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-['Space_Grotesk',sans-serif]">
                  Let's Work Together
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Want to work together? Feel free to get in touch with me for <span className="text-blue-400 font-semibold">collaborations</span>, <span className="text-purple-400 font-semibold">internships</span>, or discussions related to web development, full-stack technologies, and AI/ML. I'm always open to learning, building, and growing together in the tech space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 font-['Space_Grotesk',sans-serif]">
            Connect With Me
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col items-center gap-3 p-6 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg ${link.hoverColor}`}
                aria-label={link.name}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-slate-800">
          <p className="text-slate-500">
            &copy; 2026 <span className="text-slate-400 font-semibold">Soham Mazumder</span>. Crafted with passion and code.
          </p>
        </div>
      </div>
    </section>
  );
}
