import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <a href="#" className="text-2xl font-bold font-['Space_Grotesk',sans-serif]">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            SM
                        </span>
                        <span className="text-white">.</span>
                    </a>
                    <p className="text-slate-400 text-sm max-w-md">
                        Building digital experiences with passion and precision. Let's create something amazing together.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a
                        href="https://github.com/soham-mazumder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors hover:scale-110"
                        aria-label="GitHub"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/soham-mazumder"
                        target="_blank"
                        rel="noopener noreferrer" // Added rel for security
                        className="text-slate-400 hover:text-white transition-colors hover:scale-110"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="mailto:sohammazumder31@gmail.com"
                        className="text-slate-400 hover:text-white transition-colors hover:scale-110"
                        aria-label="Email"
                    >
                        <Mail size={24} />
                    </a>
                    <a
                        href="https://twitter.com/sohammazumder" // Placeholder link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors hover:scale-110"
                        aria-label="Twitter"
                    >
                        <Twitter size={24} />
                    </a>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>&copy; {currentYear} Soham Mazumder. All rights reserved.</p>
            </div>
        </footer>
    );
}
