import React from 'react';
import { Sun, Moon, Trophy, ShieldCheck } from 'lucide-react';
import { UserProgress, UserProfile } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ZiyoTalimLogo } from './ZiyoTalimLogo';

interface NavbarProps {
  progress?: UserProgress;
  currentUser?: UserProfile | null;
  onOpenMyLearning?: () => void;
  onOpenLanguageLab?: () => void;
  onOpenITPlayground?: () => void;
  onOpenQuizCenter?: () => void;
  onOpenLeaderboard: () => void;
  onOpenAuth?: () => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn?: boolean;
  onSelectCategory?: (cat: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLeaderboard,
  onOpenAdminLogin,
  isAdminLoggedIn = false,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Official Ziyo Talim Logo Wordmark */}
        <a 
          href="#" 
          className="shrink-0 flex items-center transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          <ZiyoTalimLogo size={56} showText={true} />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={onOpenLeaderboard} 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold"
          >
            <Trophy className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Reyting</span>
          </button>
        </nav>

        {/* Zone 3: Theme Toggle & Admin Cabinet */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Theme Toggle Button (Light / Dark Mode Switcher) */}
          <button
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Yorugʻ rejimga oʻtish' : 'Qorongʻu rejimga oʻtish'}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer shadow-xs flex items-center justify-center group"
            title={isDarkMode ? 'Yorugʻ rejimga oʻtish (Light Mode)' : 'Qorongʻu rejimga oʻtish (Dark Mode)'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 group-hover:text-indigo-600 transition-colors" />
            )}
          </button>

          {/* Admin Kabineti Button (Faqat Admin Kabineti qoladi) */}
          <button
            onClick={onOpenAdminLogin}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              isAdminLoggedIn
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-indigo-600/20'
            }`}
            title="Admin va tizim kabinetiga kirish (Login: 1, Parol: 1)"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAdminLoggedIn ? 'Admin Kabineti' : 'Kabinetga kirish'}</span>
            {isAdminLoggedIn && (
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
