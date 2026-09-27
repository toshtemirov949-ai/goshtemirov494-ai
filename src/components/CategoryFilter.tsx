import React from 'react';
import { CATEGORIES_CONFIG } from '../data/coursesData';
import { CourseCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: CourseCategory;
  onSelectCategory: (cat: CourseCategory) => void;
  selectedLevel: string;
  onSelectLevel: (lvl: string) => void;
  languageFilter: string;
  onSelectLanguageFilter: (lang: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedLevel,
  onSelectLevel,
  languageFilter,
  onSelectLanguageFilter,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Category Tabs (Interactive Segmented Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES_CONFIG.map((item) => {
          const isActive = selectedCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id as CourseCategory)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-md font-mono ${
                  isActive
                    ? 'bg-slate-800 dark:bg-indigo-700 text-indigo-200 dark:text-indigo-100'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-filters: Language selection (when on languages or all) & Difficulty level */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        {/* Language Quick Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Til boʻyicha:</span>
          <button
            onClick={() => onSelectLanguageFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              languageFilter === 'all'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => onSelectLanguageFilter('english')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'english'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇬🇧</span> Ingliz tili
          </button>
          <button
            onClick={() => onSelectLanguageFilter('russian')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'russian'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇷🇺</span> Rus tili
          </button>
          <button
            onClick={() => onSelectLanguageFilter('french')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'french'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇫🇷</span> Fransuz tili
          </button>
          <button
            onClick={() => onSelectLanguageFilter('german')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              languageFilter === 'german'
                ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>🇩🇪</span> Nemis tili
          </button>
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Daraja:</span>
          {['all', 'Boshlangʻich', 'Oʻrta', 'Yuqori'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => onSelectLevel(lvl)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-slate-800 dark:bg-slate-700 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {lvl === 'all' ? 'Barcha darajalar' : lvl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
