import React, { useState, createContext, useContext } from "react";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import LandingPage from "./pages/Landing";
import CVPage from "./pages/CV";
import { translations } from "./constants";
import { Content, Language } from "./types";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

// --- Context ---
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  content: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

// --- Layout Components ---

const Navbar = () => {
  const { lang, setLang, content } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-300 ${
      location.pathname === path ? "text-white" : "text-muted hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 no-print transition-all duration-500">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="flex items-center h-16">
          {/* Center Nav Links (Desktop) - Absolutely positioned for true centering */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className={navLinkClass("/")}>
              {content.navigation.home}
            </Link>
            <Link to="/cv" className={navLinkClass("/cv")}>
              {content.navigation.cv}
            </Link>
          </div>

          {/* Desktop Language Switcher (Right Aligned) */}
          <div className="hidden md:flex items-center space-x-1 bg-[#1c1c1e] rounded-full p-1 ml-auto border border-white/10">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-1 text-[11px] font-medium rounded-full transition-all duration-300 ${
                lang === "en"
                  ? "bg-white text-black shadow-lg"
                  : "text-muted hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pt")}
              className={`px-4 py-1 text-[11px] font-medium rounded-full transition-all duration-300 ${
                lang === "pt"
                  ? "bg-white text-black shadow-lg"
                  : "text-muted hover:text-white"
              }`}
            >
              PT
            </button>
          </div>

          {/* Mobile Menu Button & Lang Switch (Right Aligned) */}
          <div className="md:hidden ml-auto flex items-center gap-4">
            <div className="flex items-center space-x-1 bg-[#1c1c1e] rounded-full p-1 border border-white/10">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-[10px] font-medium rounded-full transition-all ${
                  lang === "en" ? "bg-white text-black" : "text-muted"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("pt")}
                className={`px-2 py-1 text-[10px] font-medium rounded-full transition-all ${
                  lang === "pt" ? "bg-white text-black" : "text-muted"
                }`}
              >
                PT
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted hover:text-white p-2 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1c1c1e] border-b border-white/10 animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-muted hover:text-white hover:bg-white/5"
            >
              {content.navigation.home}
            </Link>
            <Link
              to="/cv"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-muted hover:text-white hover:bg-white/5"
            >
              {content.navigation.cv}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();

  // Hide footer on Home page
  if (location.pathname === "/") return null;

  return (
    <footer className="bg-transparent py-12 mt-auto no-print">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center">
        <div className="flex space-x-8 mb-4 md:mb-0">
          <a
            href="https://github.com/Pedroou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <Github size={20} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.linkedin.com/in/pedro-guimaraes-ourique/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <Linkedin size={20} strokeWidth={1.5} />
          </a>
          <a
            href="mailto:pedro.g.ourique@gmail.com"
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      {/* Copyright removed as requested */}
    </footer>
  );
};

// --- App Component ---

const App: React.FC = () => {
  const initialLang = (
    navigator.language.startsWith("pt") ? "pt" : "en"
  ) as Language;
  const [lang, setLang] = useState<Language>(initialLang);

  const contextValue = {
    lang,
    setLang,
    content: translations[lang],
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans antialiased">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cv" element={<CVPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageContext.Provider>
  );
};

export default App;
