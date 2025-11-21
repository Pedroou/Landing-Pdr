import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../App";
import DarkVeil from "../components/DarkVeil";
import { Github, Linkedin, FileText, Mail, ArrowRight } from "lucide-react";
import { AVATAR_URL } from "../constants";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const { content } = useLanguage();
  const linksRef = useRef<HTMLDivElement>(null);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLinksVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (linksRef.current) {
      observer.observe(linksRef.current);
    }

    return () => {
      if (linksRef.current) observer.unobserve(linksRef.current);
    };
  }, []);

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Docker",
    "Python",
    "Ruby on Rails",
    "HTML5",
    "Tailwind",
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-start items-center pt-10 md:pt-16 text-text selection:bg-white/20 selection:text-white pb-32">
      <div className="fixed inset-0">
        <DarkVeil />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Avatar - Floating Glass Container */}
        <div
          className="relative mb-10 animate-fade-in opacity-0"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative p-1.5 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/5 shadow-2xl">
            <img
              src={AVATAR_URL}
              alt={content.hero.avatarAlt}
              className="w-28 h-28 rounded-full object-cover transition-all duration-700 ease-out"
            />
          </div>
        </div>

        {/* Hero Name - Crisp White */}
        <h1
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 animate-fade-in opacity-0 drop-shadow-xl"
          style={{ animationDelay: "600ms" }}
        >
          {content.hero.name}
        </h1>

        {/* Tagline - Technical Mono */}
        <div
          className="animate-fade-in opacity-0 mb-16"
          style={{ animationDelay: "900ms" }}
        >
          <span className="font-mono text-sm md:text-base text-muted tracking-[0.2em] uppercase">
            {content.hero.tagline}
          </span>
        </div>

        {/* About Blurb - Apple Gray */}
        <div
          className="text-muted text-lg md:text-2xl font-normal leading-relaxed max-w-2xl mb-16 animate-fade-in opacity-0"
          style={{ animationDelay: "1200ms" }}
          dangerouslySetInnerHTML={{ __html: content.hero.about }}
        />

        {/* Tech Stack - Sequential Stagger */}
        <div className="w-full max-w-3xl mb-20">
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, idx) => (
              <div
                key={skill}
                className="px-5 py-2 bg-white/5 backdrop-blur-md border border-white/5 rounded-lg text-neutral-300 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default animate-fade-in opacity-0"
                style={{ animationDelay: `${1500 + idx * 150}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Links Grid - Glass Cards - Scroll Triggered Sequential Animation */}
        <div
          ref={linksRef}
          className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              link: "https://github.com/Pedroou",
              icon: Github,
              title: content.landing.links.github.title,
              desc: content.landing.links.github.desc,
            },
            {
              link: "https://www.linkedin.com/in/pedro-guimaraes-ourique/",
              icon: Linkedin,
              title: content.landing.links.linkedin.title,
              desc: content.landing.links.linkedin.desc,
            },
            {
              to: "/cv",
              icon: FileText,
              title: content.landing.links.cv.title,
              desc: content.landing.links.cv.desc,
            },
            {
              link: "mailto:pedro.g.ourique@gmail.com",
              icon: Mail,
              title: content.landing.links.email.title,
              desc: content.landing.links.email.desc,
            },
          ].map((item, idx) => {
            const Wrapper = item.to ? Link : "a";
            const props = item.to
              ? { to: item.to }
              : {
                  href: item.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };

            return (
              // @ts-ignore
              <Wrapper
                key={idx}
                {...props}
                style={{ animationDelay: `${idx * 300}ms` }}
                className={`group relative flex items-center justify-between p-6 bg-[#1c1c1e]/60 hover:bg-[#2c2c2e]/80 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 backdrop-blur-xl overflow-hidden opacity-0 ${
                  linksVisible ? "animate-fade-in" : ""
                }`}
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className="text-muted group-hover:text-white transition-colors duration-300">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted group-hover:text-neutral-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-muted group-hover:text-white transition-colors transform group-hover:translate-x-1 relative z-10"
                />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
