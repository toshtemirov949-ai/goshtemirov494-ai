import React from 'react';
import { Code, Terminal, Sparkles, ArrowRight, Cpu, Shield, Globe } from 'lucide-react';

interface ITSpotlightProps {
  onOpenITPlayground: () => void;
  onFilterIT: () => void;
}

export const ITSpotlight: React.FC<ITSpotlightProps> = ({
  onOpenITPlayground,
  onFilterIT,
}) => {
  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Code className="w-4 h-4" />
              <span>Zamonaviy Axborot Texnologiyalari</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Kelajak kasblari: Frontend, Python AI va Kiberxavfsizlik
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bizning IT dasturlarimizda faqat quruq nazariya emas, balki brauzer ichidagi jonli kod muharriri, portfolio loyihalari va xalqaro amaliyot talablariga mos koʻnikmalar oʻrgatiladi.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-slate-200 font-medium">React & TypeScript</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-medium">Python & AI Lab</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-200 font-medium">Node.js & Backend</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-200 font-medium">Kiberxavfsizlik</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenITPlayground}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Jonli Kod Maydonchasini Ochish</span>
              </button>

              <button
                onClick={onFilterIT}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                Barcha IT Kurslari →
              </button>
            </div>
          </div>

          {/* Right Visual / Code Terminal Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 font-mono text-[11px] text-slate-400">ziyotalim_sandbox.ts</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">Node.js v22.14</span>
              </div>

              {/* Code snippet display */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                <p className="text-slate-500">// Sun'iy intellekt va ma'lumotlar tahlili</p>
                <p><span className="text-indigo-400">import</span> &#123; AIModel, DataPipeline &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@ziyotalim/ai'</span>;</p>
                <p>&nbsp;</p>
                <p><span className="text-indigo-400">const</span> studentCourse = <span className="text-indigo-400">new</span> <span className="text-yellow-400">CoursePath</span>(&#123;</p>
                <p className="pl-4">name: <span className="text-emerald-400">"Zamonaviy Fullstack & AI"</span>,</p>
                <p className="pl-4">skills: [<span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"IELTS"</span>],</p>
                <p className="pl-4">mentorSupport: <span className="text-amber-400">true</span>,</p>
                <p className="pl-4">interactivePractice: <span className="text-amber-400">true</span></p>
                <p>&#125;);</p>
                <p>&nbsp;</p>
                <p className="text-emerald-400">✔ Muvaffaqiyatli kompilyatsiya qilindi. O'rganishga tayyormisiz?</p>
              </div>

              <div className="px-5 py-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Status: 0 xato · 100% amaliyot</span>
                <button
                  onClick={onOpenITPlayground}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <span>Kodni sinash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
