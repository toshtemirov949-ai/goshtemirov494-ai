import React, { useState } from 'react';
import { Globe2, Volume2, ArrowRight, Languages, Sparkles } from 'lucide-react';
import { LanguageType } from '../types';
import { LANGUAGES_INFO } from '../data/languagesLabData';
import { playFemaleSpeech, stopAllSpeech } from '../utils/femaleVoiceService';

interface LanguageHubSpotlightProps {
  onOpenLanguageLabWith: (lang: LanguageType) => void;
  onFilterLanguage: (lang: string) => void;
  onOpenTranslator?: () => void;
}

const LANGUAGE_PREVIEWS: Record<LanguageType, string> = {
  english: "Welcome to our language academy! Let's master English together with perfect pronunciation.",
  russian: "Здравствуйте! Давайте говорить по-русски красиво, грамотно и уверенно.",
  french: "Bonjour! Bienvenue dans notre académie. Apprenons le français avec une prononciation élégante.",
  german: "Guten Tag! Herzlich willkommen beim Deutschlernen mit klarer Aussprache."
};

export const LanguageHubSpotlight: React.FC<LanguageHubSpotlightProps> = ({
  onOpenLanguageLabWith,
  onFilterLanguage,
  onOpenTranslator,
}) => {
  const [playingLangId, setPlayingLangId] = useState<string | null>(null);

  const languageList = (Object.keys(LANGUAGES_INFO) as LanguageType[]).map(
    (key) => LANGUAGES_INFO[key]
  );

  const handlePreviewVoice = (langId: LanguageType) => {
    if (playingLangId === langId) {
      stopAllSpeech();
      setPlayingLangId(null);
      return;
    }

    setPlayingLangId(langId);
    playFemaleSpeech({
      text: LANGUAGE_PREVIEWS[langId],
      lang: langId,
      pitch: 1.1,
      rate: 0.9,
      onStart: () => setPlayingLangId(langId),
      onEnd: () => setPlayingLangId(null),
      onError: () => setPlayingLangId(null)
    });
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400">
                <Globe2 className="w-4 h-4" />
                <span>Xorijiy Tillar Markazi</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-500/20">
                🌸 Qiz bola ovozi (Mayin & Aniq Talaffuz)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ingliz, Rus, Fransuz va Nemis Tillari
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Har bir til boʻyicha noldan boshlab xalqaro sertifikatlar (IELTS, TRKI, DELF, Goethe) gacha toʻliq oʻquv tizimi
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {onOpenTranslator && (
              <button
                onClick={onOpenTranslator}
                className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Languages className="w-4 h-4" />
                <span>10 Tilli Real Tarjimon</span>
              </button>
            )}
            <button
              onClick={() => {
                stopAllSpeech();
                onOpenLanguageLabWith('english');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap border border-transparent dark:border-slate-700/80"
            >
              <span>Interaktiv Audio Trenajyor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Languages Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {languageList.map((lang) => (
            <div
              key={lang.id}
              className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500 hover:shadow-md transition-all bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl drop-shadow-sm">{lang.flag}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handlePreviewVoice(lang.id)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                        playingLangId === lang.id
                          ? 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border-pink-400 animate-pulse'
                          : 'bg-pink-50/80 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border-pink-200/80 dark:border-pink-800/60 hover:bg-pink-100'
                      }`}
                      title="Qiz bola ovozida tinglash"
                    >
                      <Volume2 className="w-3 h-3 text-pink-500" />
                      <span>{playingLangId === lang.id ? 'Yangramoqda...' : 'Ovozli namuna'}</span>
                    </button>
                    <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                      {lang.activeLearners}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {lang.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2">
                  {lang.nativeTitle}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {lang.description}
                </p>

                {/* Popular Topics metadata */}
                <div className="space-y-1 mb-4">
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">Asosiy modullar:</p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {lang.popularTopics.slice(0, 3).map((topic, i) => (
                      <span key={i} className="inline-flex items-center">
                        <span>{topic}</span>
                        {i < 2 && <span className="mx-1 text-slate-300 dark:text-slate-600">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    stopAllSpeech();
                    onOpenLanguageLabWith(lang.id);
                  }}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Mashq Qilish</span>
                </button>
                <button
                  onClick={() => onFilterLanguage(lang.id)}
                  className="py-2 px-2.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer border border-transparent dark:border-slate-700/80"
                  title="Ushbu tildagi kurslar"
                >
                  Kurslar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

