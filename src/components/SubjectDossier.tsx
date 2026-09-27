import React, { useState } from 'react';
import { SubjectInfo } from '../data/subjectsData';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Briefcase, 
  Award, 
  HelpCircle, 
  MessageSquare, 
  Code, 
  Headphones, 
  ChevronRight, 
  CheckCircle2, 
  Flame, 
  Lightbulb,
  X,
  GraduationCap
} from 'lucide-react';

interface SubjectDossierProps {
  subject: SubjectInfo;
  coursesCount: number;
  onOpenQuiz?: (testId?: string) => void;
  onOpenLab?: (toolType?: 'quiz' | 'it' | 'language') => void;
  onOpenAIChat?: (subjectName: string) => void;
  onClose?: () => void;
  onScrollToCourses?: () => void;
}

export const SubjectDossier: React.FC<SubjectDossierProps> = ({
  subject,
  coursesCount,
  onOpenQuiz,
  onOpenLab,
  onOpenAIChat,
  onClose,
  onScrollToCourses,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'roadmap' | 'careers'>('overview');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-2xl mb-8 transition-all animate-fadeIn">
      {/* Top Banner with Gradient */}
      <div className={`p-6 sm:p-8 bg-gradient-to-r ${subject.badgeColor} text-white relative overflow-hidden`}>
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
              <span className="text-base">{subject.icon}</span>
              <span>{subject.categoryName} • Fan Pasporti</span>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                title="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight drop-shadow-sm flex items-center gap-3">
                <span>{subject.name}</span>
                <span className="text-xl sm:text-2xl font-normal opacity-90">fani haqida toʻliq maʼlumot</span>
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed font-medium">
                {subject.tagline}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="px-3.5 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center">
                <div className="text-lg sm:text-xl font-extrabold">{coursesCount} ta</div>
                <div className="text-[11px] text-white/80 font-medium">Mavjud kurslar</div>
              </div>
              <div className="px-3.5 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center">
                <div className="text-lg sm:text-xl font-extrabold">{subject.branches.length} ta</div>
                <div className="text-[11px] text-white/80 font-medium">Asosiy boʻlim</div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons Header */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            {onOpenAIChat && (
              <button
                type="button"
                onClick={() => onOpenAIChat(subject.name)}
                className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Techie AI bilan oʻrganish</span>
              </button>
            )}

            {onOpenQuiz && subject.testId && (
              <button
                type="button"
                onClick={() => onOpenQuiz(subject.testId)}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <HelpCircle className="w-4 h-4 text-amber-300" />
                <span>Fan boʻyicha test topshirish (Quiz)</span>
              </button>
            )}

            {onOpenLab && subject.toolType === 'it' && (
              <button
                type="button"
                onClick={() => onOpenLab('it')}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Code className="w-4 h-4 text-cyan-300" />
                <span>IT Laboratoriyasiga oʻtish</span>
              </button>
            )}

            {onOpenLab && subject.toolType === 'language' && (
              <button
                type="button"
                onClick={() => onOpenLab('language')}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-sky-300" />
                <span>Til Laboratoriyasi (Audio)</span>
              </button>
            )}

            {onScrollToCourses && (
              <button
                type="button"
                onClick={onScrollToCourses}
                className="px-4 py-2 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Kurslarni koʻrish ({coursesCount})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Fanning Tavsifi & Ahamiyati</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('branches')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'branches'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Asosiy Boʻlimlar & Mavzular ({subject.branches.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Oʻrganish Bosqichlari (Roadmap)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('careers')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'careers'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Kasbiy Imkoniyatlar & Karyera</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Description & Importance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                  <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Fan nimani oʻrgatadi?</span>
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                  <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2 mb-2">
                    <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Nega bu fanni oʻrganish kerak? (Ahamiyati)</span>
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {subject.importance}
                  </p>
                </div>
              </div>

              {/* Sidebar with Facts & Exams */}
              <div className="lg:col-span-5 space-y-4">
                {/* Important Formulas or Facts */}
                <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60">
                  <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Muhim formulalar va qiziqarli faktlar</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {subject.keyFormulasOrFacts.map((fact, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exams Preparation */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2.5">
                    <Award className="w-4 h-4 text-indigo-500" />
                    <span>Qaysi imtihon va sertifikatlarga tayyorlaydi?</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {subject.exams.map((exam, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BRANCHES & TOPICS TAB */}
        {activeTab === 'branches' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Ushbu fanning oʻrganiladigan asosiy boʻlimlari va ularning amaliy mavzular xaritasi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {subject.branches.map((branch, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-black text-sm flex items-center justify-center mb-3">
                      0{idx + 1}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                      {branch.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {branch.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Asosiy mavzular:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.topics.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ROADMAP TAB */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Ushbu fanni 0 dan boshlab professional darajagacha oʻrganishning bosqichma-bosqich yoʻl xaritasi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
              {subject.roadmap.map((step, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                        {step.duration}
                      </span>
                      <span className="text-xs font-bold text-slate-400">Bosqich {idx + 1}/3</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {step.stage}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                      🎯 <span className="font-semibold text-slate-700 dark:text-slate-300">Maqsad:</span> {step.goal}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Oʻzlashtiriladigan koʻnikmalar:
                    </div>
                    <ul className="space-y-1.5">
                      {step.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CAREERS TAB */}
        {activeTab === 'careers' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 mb-4">
              <h3 className="text-base font-bold text-sky-950 dark:text-sky-200 flex items-center gap-2 mb-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Ushbu fanni puxta bilish qanday kasbiy eshiklarni ochadi?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Zamonaviy mehnat bozorida mazkur fan boʻyicha chuqur bilimga ega boʻlgan mutaxassislarga talab doimo yuqori. Quyidagi sohalarda yuqori daromadli va nufuzli karyera qurishingiz mumkin:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {subject.careers.map((career, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-sky-400 dark:hover:border-sky-500 transition-colors flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0 font-bold">
                    💼
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
