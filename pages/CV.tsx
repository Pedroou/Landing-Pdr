import React, { useState } from "react";
import { useLanguage } from "../App";
import {
  Printer,
  MapPin,
  Mail,
  Phone,
  Github,
  Globe,
  CheckCircle,
  Share2,
} from "lucide-react";
import { AVATAR_URL } from "../constants";

const CVPage: React.FC = () => {
  const { content } = useLanguage();
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ msg: content.cv.actions.copied, type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ msg: content.cv.actions.copyError, type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black md:py-12 px-4 md:px-6 relative pb-20 print:bg-white print:p-0">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-8 right-8 z-[100] px-6 py-3 rounded-xl shadow-2xl transform transition-all duration-300 flex items-center space-x-3 animate-slide-up border border-white/10 backdrop-blur-xl ${
            toast.type === "success"
              ? "bg-[#1c1c1e] text-white"
              : "bg-red-900/90 text-red-100"
          }`}
        >
          {toast.type === "success" && (
            <CheckCircle size={18} className="text-emerald-500" />
          )}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 no-print z-40">
        <button
          onClick={handlePrint}
          className="bg-white text-black hover:bg-neutral-200 p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          title={content.cv.actions.print}
        >
          <Printer size={20} />
        </button>
      </div>

      {/* CV PAPER CONTAINER - Designed as a clean white document on a dark desk */}
      <div className="max-w-[21cm] mx-auto bg-white text-black shadow-2xl shadow-black overflow-hidden print:shadow-none print:max-w-none print:w-full print:bg-white rounded-sm">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-100 p-10 flex flex-col md:flex-row gap-8 items-start justify-between print:p-0 print:pb-6 print:border-b">
          <div className="flex gap-6 items-center">
            <div className="relative shrink-0">
              <img
                src={AVATAR_URL}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-100 bg-gray-50 print:w-20 print:h-20"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black tracking-tight mb-2">
                {content.hero.name}
              </h1>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <MapPin size={14} className="mr-1" />
                {content.cv.identity.location}
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-600 print:gap-4">
                <button
                  onClick={() => copyToClipboard(content.cv.identity.phone)}
                  className="hover:text-black transition-colors flex items-center"
                >
                  <Phone size={12} className="mr-1.5" />
                  {content.cv.identity.phone}
                </button>

                <span className="text-gray-300 print:hidden">|</span>

                <button
                  onClick={() => copyToClipboard(content.cv.identity.email)}
                  className="hover:text-black transition-colors flex items-center"
                >
                  <Mail size={12} className="mr-1.5" />
                  {content.cv.identity.email}
                </button>

                <span className="text-gray-300 print:hidden">|</span>

                <a
                  href="https://github.com/Pedroou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors flex items-center no-underline"
                >
                  <Github size={12} className="mr-1.5" />
                  {content.cv.identity.githubLabel}
                </a>

                <span className="text-gray-300 print:hidden">|</span>

                <a
                  href="https://pedroou.github.io/Landing-Pdr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors flex items-center no-underline"
                >
                  <Globe size={12} className="mr-1.5" />
                  {content.cv.identity.landingLabel}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-12 print:grid-cols-3 print:bg-white print:gap-8 print:p-0 print:pt-6">
          {/* Main Column */}
          <main className="lg:col-span-2 print:col-span-2 space-y-5">
            {/* Summary */}
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                {content.cv.headings.summary}
                <span className="ml-3 h-px flex-grow bg-gray-100 print:bg-gray-300"></span>
              </h2>
              <p className="text-gray-800 leading-relaxed text-sm text-justify font-normal">
                {content.cv.summary}
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                {content.cv.headings.skills}
                <span className="ml-3 h-px flex-grow bg-gray-100 print:bg-gray-300"></span>
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-semibold text-black uppercase mb-2">
                    {content.cv.skills.languagesTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {content.cv.skills.languages.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-gray-50 text-gray-700 text-[11px] font-medium border border-gray-200 rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-black uppercase mb-2">
                    {content.cv.skills.backendTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {content.cv.skills.backend.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-gray-50 text-gray-700 text-[11px] font-medium border border-gray-200 rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-black uppercase mb-2">
                    {content.cv.skills.frontendTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {content.cv.skills.frontend.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-gray-50 text-gray-700 text-[11px] font-medium border border-gray-200 rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-black uppercase mb-2">
                    {content.cv.skills.toolsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {content.cv.skills.tools.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-gray-50 text-gray-700 text-[11px] font-medium border border-gray-200 rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                {content.cv.headings.experience}
                <span className="ml-3 h-px flex-grow bg-gray-100 print:bg-gray-300"></span>
              </h2>

              <div className="space-y-8 border-l border-gray-200 print:border-gray-300 pl-6 ml-1">
                {content.cv.experience.map((job, idx) => (
                  <div key={idx} className="relative break-inside-avoid">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[28px] top-1.5 w-2 h-2 bg-gray-300 print:bg-gray-400 rounded-full ring-4 ring-white"></div>

                    <div className="flex flex-col mb-2">
                      <h3 className="text-sm font-bold text-black">
                        {job.role}
                      </h3>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-sm font-medium text-gray-600">
                          {job.company}
                        </span>
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-tight">
                          {job.date}
                        </span>
                      </div>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-600 marker:text-gray-300">
                      {job.desc.map((d, i) => (
                        <li key={i} className="pl-1">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Column */}
          <aside className="space-y-10 lg:pl-2 print:pl-2">
            {/* Education */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                {content.cv.headings.education}
                <span className="ml-3 h-px flex-grow bg-gray-100 print:bg-gray-300"></span>
              </h2>
              <div className="space-y-5">
                {content.cv.education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="text-sm font-bold text-black leading-snug mb-1">
                      {edu.title}
                    </div>
                    <div className="text-xs text-gray-500 italic">
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Certifications */}
            <section className="break-inside-avoid">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest my-3 flex items-center">
                {content.cv.headings.certs}
                <span className="ml-3 h-px flex-grow bg-gray-100 print:bg-gray-300"></span>
              </h2>
              <div className="text-xs text-gray-600 space-y-5">
                <div>
                  <strong className="block text-black mb-2 border-b border-gray-100 pb-1">
                    {content.cv.certs.section1Title}
                  </strong>
                  <ul className="space-y-1.5">
                    {content.cv.certs.list1.map((c, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-gray-400">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="block text-black mb-2 border-b border-gray-100 pb-1">
                    {content.cv.certs.section2Title}
                  </strong>
                  <ul className="space-y-1.5">
                    {content.cv.certs.list2.map((c, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-gray-400">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Full Width Projects Section */}
        <div className="bg-gray-50 p-10 print:bg-white print:p-0 print:mt-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
            {content.cv.headings.projects}
            <span className="ml-3 h-px flex-grow bg-gray-200 print:bg-gray-300"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.cv.projects.map((proj, idx) => (
              <a
                key={idx}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-sm border border-gray-200 hover:border-gray-400 transition-colors break-inside-avoid shadow-sm block group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-black group-hover:text-gray-600 flex items-center">
                    {proj.title}
                    <Share2
                      size={12}
                      className="ml-1 opacity-30 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                  {proj.status && (
                    <span className="text-[10px] uppercase font-bold text-black bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                      {proj.status}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {proj.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Footer for Print */}
        <div className="hidden print:block text-center text-[10px] text-gray-400 mt-8 pb-4">
          Pedro G Ourique portfolio - {window.location.href}
        </div>
      </div>
    </div>
  );
};

export default CVPage;
