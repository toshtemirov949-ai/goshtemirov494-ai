import React from 'react';
import { Globe2, Code2, Award, BookOpen, Bot, ShieldCheck } from 'lucide-react';
import { CourseCategory } from '../types';
import { ZiyoTalimLogo } from './ZiyoTalimLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onSelectCategory: (cat: CourseCategory) => void;
  onOpenLanguageLab: () => void;
  onOpenITPlayground: () => void;
  onOpenQuizCenter: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAIChatbot?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenLanguageLab,
  onOpenITPlayground,
  onOpenQuizCenter,
  onOpenLeaderboard,
  onOpenAIChatbot,
}) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <ZiyoTalimLogo size={52} showText={true} textColorMode="light" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'ru' 
                ? 'Инновационная образовательная онлайн-платформа: IT и программирование, мировые языки и персональный AI-ассистент.'
                : language === 'en'
                ? 'Next-generation online learning platform: Software engineering, global languages, and intelligent AI tutoring.'
                : 'Oʻzbekistondagi eng ilgʻor interaktiv taʼlim portali: zamonaviy IT kurslari, jahon tillari va sunʼiy intellekt yordamchisi.'}
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-500">
              <span>Toshkent, Oʻzbekiston</span>
              <span aria-hidden="true">·</span>
              <span>info@ziyotalim.uz</span>
            </div>
          </div>

          {/* Column 1: IT Yo'nalishlari */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold tracking-wide">IT & Dasturlash</h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('it');
                    document.getElementById('it-courses')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frontend & React
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('it');
                    document.getElementById('it-courses')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Python & Sunʼiy Intellekt
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('it');
                    document.getElementById('it-courses')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Backend (Node.js & SQL)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('it');
                    document.getElementById('it-courses')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kiberxavfsizlik
                </button>
              </li>
              <li>
                <button onClick={onOpenITPlayground} className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer">
                  Jonli Kod Muharriri →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Xorijiy Tillar */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold tracking-wide">Xorijiy Tillar</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => { onSelectCategory('languages'); onOpenLanguageLab(); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>🇬🇧</span> Ingliz tili (IELTS 7.5+)
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('languages'); onOpenLanguageLab(); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>🇷🇺</span> Rus tili (Разговорный)
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('languages'); onOpenLanguageLab(); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>🇩🇪</span> Nemis tili (Goethe)
                </button>
              </li>
              <li>
                <button onClick={() => { onSelectCategory('languages'); onOpenLanguageLab(); }} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <span>🇫🇷</span> Fransuz tili (DELF)
                </button>
              </li>
              <li>
                <button onClick={onOpenLanguageLab} className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer">
                  Lugʻat Laboratoriyasi →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: AI va Interaktiv Trenajyorlar */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold tracking-wide">Interaktiv Vositalar</h4>
            <ul className="space-y-1.5">
              {onOpenAIChatbot && (
                <li>
                  <button onClick={onOpenAIChatbot} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-sky-400">
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI Chatbot Yordamchi</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenQuizCenter} className="hover:text-white transition-colors cursor-pointer">
                  25 talik Bilim Testlari
                </button>
              </li>
              {onOpenLeaderboard && (
                <li>
                  <button onClick={onOpenLeaderboard} className="hover:text-white transition-colors cursor-pointer">
                    Peshqadamlar Reytingi
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenITPlayground} className="hover:text-white transition-colors cursor-pointer">
                  Python & JS Sandbox
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} ZiyoTalim. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Maxfiylik siyosati</span>
            <span aria-hidden="true">·</span>
            <span>Foydalanish shartlari</span>
            <span aria-hidden="true">·</span>
            <span>Xavfsizlik</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
