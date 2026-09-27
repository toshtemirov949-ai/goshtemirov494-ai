import React, { useState } from 'react';
import { 
  Sparkles, MessageSquare, Compass, 
  Layers, FlaskConical, Atom, Cpu, ChevronRight, CheckCircle2,
  BookOpen, Terminal, Globe, Award, ArrowUpRight, Zap,
  FileText, History, Users, Search, X
} from 'lucide-react';
import { Course } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translator/translatorService';

interface TechzoneDashboardProps {
  courses: Course[];
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onOpenCourse: (course: Course) => void;
  onOpenITPlayground: () => void;
  onOpenLanguageLab: () => void;
  onOpenQuizCenter: () => void;
  onOpenMyLearning: () => void;
  onOpenTranslator: (initialTab?: 'translator' | 'chat' | 'analysis' | 'test' | 'history', autoStartVoice?: boolean) => void;
  totalStudentsCount?: number;
  totalCertificatesCount?: number;
}

export const TechzoneDashboard: React.FC<TechzoneDashboardProps> = ({
  courses,
  searchQuery,
  setSearchQuery,
  onOpenCourse,
  onOpenITPlayground,
  onOpenLanguageLab,
  onOpenQuizCenter,
  onOpenMyLearning,
  onOpenTranslator,
  totalStudentsCount = 14820,
  totalCertificatesCount = 3490
}) => {
  // VR Lab active tab
  const [activeLabTab, setActiveLabTab] = useState<'all' | 'ai' | 'physics' | 'chemistry'>('all');
  const [activeSimModal, setActiveSimModal] = useState<{ title: string; category: string; description: string } | null>(null);

  // Featured courses for curriculum
  const pythonCourse = courses.find(c => c.category === 'it') || courses[0];
  const englishCourse = courses.find(c => c.category === 'languages') || courses[1];
  const physicsCourse = courses.find(c => c.category === 'exact_sciences') || courses[2];

  // Lab experiments list
  const labExperiments = [
    {
      id: 'chem-1',
      title: 'Virtual Kimyo Laboratoriyasi',
      category: 'chemistry',
      categoryLabel: 'Kimyo',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      description: 'Kislota va ishqorlar reaksiyasi, eritmalarning pH darajasi va molekulyar oʻzgarishlarni 3D visual kuzatish.',
      tag: 'VR 3D Lab',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'phys-1',
      title: 'Fizika & Kosmik Mexanika',
      category: 'physics',
      categoryLabel: 'Fizika',
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
      description: 'Nyuton qonunlari, elektromagnit toʻlqinlar va yorugʻlik sinishi boʻyicha interaktiv simulyator.',
      tag: 'Simulyator',
      color: 'from-indigo-600 to-purple-700'
    },
    {
      id: 'ai-1',
      title: 'AI & Neyrotarmoqlar Vizualizatori',
      category: 'ai',
      categoryLabel: 'AI Asoslari',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      description: 'Sunʼiy intellekt neyronlari qanday ishlashini 3D oqimlar va dataset tahlili orqali koʻrish.',
      tag: 'Neyrotarmoq',
      color: 'from-cyan-600 to-blue-700'
    },
  ];

  const filteredLabs = labExperiments.filter(item => {
    if (activeLabTab === 'all') return true;
    return item.category === activeLabTab;
  });

  return (
    <div className="w-full bg-[#f4f7fb] dark:bg-slate-950 py-6 sm:py-8 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Section: Hero Card + AI-Chat Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Main Hero Card: Shaxsiy AI-O'qituvchi & Real Tarjimon */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2340] via-[#09325c] to-[#0a1e38] text-white p-6 sm:p-8 shadow-xl border border-blue-900/40 flex flex-col justify-between">
            {/* Glowing neon aura */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md">
                  <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>ZIYO TALIM AKADEMIYASI & AI TRANSLATOR</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                  Shaxsiy AI-Oʻqituvchi & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-cyan-300">
                    Zamonaviy Taʼlim Markazi
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl">
                  Techie AI bilan 10 ta jahon tilida ovozli va matnli muloqot qiling, grammatika tahlilini oʻrganing hamda IT sohasidagi eng talabgir video darsliklar va amaliy laboratoriyalarda bilimingizni oshiring.
                </p>

                {/* Kurslarni qidirish... maydoni */}
                <div className="pt-1 max-w-xl">
                  <div className="relative group">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/80 group-focus-within:text-cyan-300 transition-colors pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery || ''}
                      onChange={(e) => setSearchQuery?.(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          document.getElementById('courses-catalog')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      placeholder="Kurslarni qidirish..."
                      className="w-full pl-10 pr-28 py-2.5 sm:py-3 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder:text-blue-200/70 text-xs sm:text-sm rounded-2xl border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-md transition-all shadow-inner"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery?.('')}
                          className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="Qidiruvni tozalash"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById('courses-catalog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <Search className="w-3 h-3" />
                        <span>Qidirish</span>
                      </button>
                    </div>
                  </div>

                  {/* Fanlar bo'yicha tezkor havolalar */}
                  <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-blue-200/80 font-medium">Fanlar:</span>
                    {[
                      { name: 'Matematika', icon: '📐' },
                      { name: 'Fizika', icon: '⚡' },
                      { name: 'Kimyo', icon: '🧪' },
                      { name: 'Biologiya', icon: '🧬' },
                      { name: 'Python', icon: '🐍' },
                      { name: 'Frontend', icon: '💻' },
                      { name: 'Kiberxavfsizlik', icon: '🛡️' },
                      { name: 'Ingliz Tili', icon: '🇬🇧' },
                      { name: 'Tarix', icon: '📜' },
                      { name: 'Ona Tili', icon: '✍️' },
                    ].map((f) => (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => {
                          setSearchQuery?.(f.name);
                          setTimeout(() => {
                            document.getElementById('courses-catalog')?.scrollIntoView({ behavior: 'smooth' });
                          }, 50);
                        }}
                        className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] text-blue-100 hover:text-white transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <span>{f.icon}</span>
                        <span>{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      if (pythonCourse) onOpenCourse(pythonCourse);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Darsni Boshlash</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenTranslator('translator')}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Globe className="w-4 h-4 text-cyan-300" />
                    <span>Real Tarjimon Oynasi</span>
                  </button>

                  <button
                    onClick={onOpenITPlayground}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Terminal className="w-4 h-4 text-emerald-300" />
                    <span>IT Sandbox</span>
                  </button>
                </div>
              </div>

              {/* Bottom 3 Stat Highlights (Admin va Sayt bilan 100% bir xil real maʼlumotlar) */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-sky-300 text-xs font-bold mb-0.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{totalStudentsCount.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-blue-100/80">Faol talabalar (▲ +12%)</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold mb-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{courses.length} ta</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-blue-100/80">Barcha kurslar toʻliq</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold mb-0.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>{totalCertificatesCount.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-blue-100/80">QR-kodli sertifikatlar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Tarjimon & AI Markazi (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4">
            {/* Header: Sarlavha, 10 Jahon Tili, Faol, Tavsif */}
            <div className="space-y-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div 
                onClick={() => onOpenTranslator('translator')}
                className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                title="Real Tarjimon & AI Markazini ochish"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
                      Real Tarjimon & AI Markazi
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        10 Jahon Tili
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] flex items-center gap-1.5 shadow-xs shrink-0 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  Faol
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ovozli gaplashish, AI chat, yozishma grammatik tahlili va bilimni tekshirish testlari
              </p>
            </div>

            {/* 5 Interaktiv Bo'lim va Tugmalar */}
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              {/* 1. Real Tarjimon & Ovoz */}
              <button
                type="button"
                onClick={() => onOpenTranslator('translator', true)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 text-left transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                title="Real Tarjimon & Ovoz: Ovozli gapirish va tinglash"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      Real Tarjimon & Ovoz
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      Ovozli gaplashish va tinglash
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
              </button>

              {/* 2. AI Bilan Gaplashish (Chat) */}
              <button
                type="button"
                onClick={() => onOpenTranslator('chat')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 text-left transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                title="AI bilan 10 tilda real-vaqt muloqot va suhbat"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                        AI Bilan Gaplashish (Chat)
                      </span>
                      <span className="px-1.5 py-0.2 rounded-md text-[9px] bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-extrabold border border-cyan-200 dark:border-cyan-800">
                        Ovozli
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      Interaktiv suhbat va real-vaqt muloqot
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
              </button>

              {/* 3. Yozishma Tahlili */}
              <button
                type="button"
                onClick={() => onOpenTranslator('analysis')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 text-left transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                title="Yozilgan matn va gapning to'liq grammatik tahlili"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Yozishma Tahlili
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      Morfologiya, sintaksis va grammatik tahlil
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
              </button>

              {/* 4. Bilimni Sinash Testlari */}
              <button
                type="button"
                onClick={() => onOpenTranslator('test')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 text-left transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                title="1-testdan 25-testgacha bilim sinovlari"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        Bilimni Sinash Testlari
                      </span>
                      <span className="px-1.5 py-0.2 rounded-md text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-200 dark:border-amber-800">
                        Test
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      1-testdan 25-testgacha bilim sinovlari
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
              </button>

              {/* 5. Tarix */}
              <button
                type="button"
                onClick={() => onOpenTranslator('history')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-left transition-all cursor-pointer group shadow-xs hover:shadow-sm"
                title="Tarjimalar va test natijalari arxivi"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-slate-700 group-hover:text-white transition-colors shrink-0">
                    <History className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-slate-900 dark:group-hover:text-white">
                      Tarix
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      Tarjimalar va test natijalari arxivi
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
              </button>
            </div>

            {/* Pastki Katta Asosiy Tugma: Real Tarjimon Oynasini Ochish */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <button
                type="button"
                onClick={() => onOpenTranslator('translator')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Real Tarjimon Oynasini Ochish</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              {/* 10 Jahon Tili Bayroqlari */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 pt-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">10 Jahon Tili:</span>
                <div className="flex items-center gap-1.5 font-bold">
                  {SUPPORTED_LANGUAGES.map(l => (
                    <span key={l.code} title={l.name} className="cursor-default hover:scale-110 transition-transform">
                      {l.flag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Mening O'quv Rejam + VR Lab Sima */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bottom Left: Mening O'quv Rejam */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Mening Oʻquv Rejam
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Oʻzlashtirish va yoʻnalishlar statistikasi
                  </p>
                </div>
                <button
                  onClick={onOpenMyLearning}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Barcha rejalarni koʻrish"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Module cards list */}
              <div className="py-3 space-y-2.5">
                
                {/* Item 1: AI Asoslari */}
                <div 
                  onClick={() => pythonCourse && onOpenCourse(pythonCourse)}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        AI Asoslari & Python
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        36 dars · 6 modul tugallangan
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>

                {/* Item 2: STEM Loyihalar */}
                <div 
                  onClick={() => physicsCourse && onOpenCourse(physicsCourse)}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <Atom className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        STEM Loyihalar & Fizika
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        18 ta tajriba moduli
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                </div>

                {/* Item 3: Jahon Tillari & Real Tarjimon */}
                <div 
                  onClick={() => onOpenTranslator('translator')}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Real Tarjimon & Jahon Tillari
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        10 ta til · Audio talaffuz & AI tahlil
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                </div>

              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Umumiy reja:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">78% Oʻzlashtirildi</span>
            </div>
          </div>

          {/* Bottom Right: VR Lab Sima */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
            <div>
              {/* Header with Lab Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>VR Lab Simulyatorlari</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Interaktiv 3D tajribalar va virtual ilmiy laboratoriyalar
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveLabTab('all')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeLabTab === 'all'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Barchasi
                  </button>
                  <button
                    onClick={() => setActiveLabTab('ai')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeLabTab === 'ai'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    AI Asoslari
                  </button>
                  <button
                    onClick={() => setActiveLabTab('physics')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeLabTab === 'physics'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Fizika
                  </button>
                  <button
                    onClick={() => setActiveLabTab('chemistry')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeLabTab === 'chemistry'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Kimyo
                  </button>
                </div>
              </div>

              {/* Lab cards grid */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredLabs.map((lab) => (
                  <div
                    key={lab.id}
                    onClick={() => setActiveSimModal({
                      title: lab.title,
                      category: lab.categoryLabel,
                      description: lab.description
                    })}
                    className="group rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative h-28 overflow-hidden bg-slate-900">
                      <img 
                        src={lab.image} 
                        alt={lab.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
                        {lab.tag}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {lab.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {lab.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400">
                        <span>Sinab koʻrish</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action bar */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Hammasi boʻlib <strong>12 ta interaktiv simulyator</strong> mavjud
              </span>
              <button
                onClick={onOpenITPlayground}
                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Kod Sandboxiga oʻtish</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Simulation Modal */}
      {activeSimModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeSimModal.title}
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold">{activeSimModal.category}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSimModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeSimModal.description}
              </p>

              {/* Mini interactive simulator illustration */}
              <div className="h-32 rounded-xl bg-slate-900 text-white p-3 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mb-2"></div>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  3D VR Muhit Ishga Tushmoqda...
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Laboratoriya parametrlari: 100% Sinxron
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveSimModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Yopish
              </button>
              <button
                onClick={() => {
                  setActiveSimModal(null);
                  onOpenITPlayground();
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Kod va Simulyatsiyani Boshlash</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
