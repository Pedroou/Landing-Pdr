import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
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
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 400);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        if (isMenuOpen) closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors duration-300 ${
      location.pathname === path ? "text-white" : "text-muted hover:text-white"
    }`;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 no-print transition-all duration-500 animate-slide-down"
    >
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="flex items-center h-16">
          {/* Mobile Menu Button (Left) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-muted hover:text-white w-10 h-10 relative flex items-center justify-center transition-colors"
          >
            <Menu
              size={20}
              className={`absolute transition-all duration-300 transform ${
                isMenuOpen && !isClosing
                  ? "opacity-0 rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={20}
              className={`absolute transition-all duration-300 transform ${
                isMenuOpen && !isClosing
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </button>

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

          {/* Mobile Language Switcher (Right Aligned) */}
          <div className="md:hidden flex items-center space-x-1 bg-[#1c1c1e] rounded-full p-1 ml-auto border border-white/10">
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
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/50 backdrop-blur-xl border-b border-white/5 ${
            isClosing ? "animate-menu-slide-up" : "animate-menu-slide-down"
          }`}
        >
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {content.navigation.home}
            </Link>
            <Link
              to="/cv"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/cv"
                  ? "bg-white/10 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
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
          <main className="flex-grow pt-20 print:pt-0">
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
