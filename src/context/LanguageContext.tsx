import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'uz' | 'ru' | 'en';

export interface TranslationsType {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchClear: string;
  heroStartIT: string;
  heroExploreLanguages: string;
  heroAskAI: string;
  statStudents: string;
  statCourses: string;
  statLanguages: string;
  statSatisfaction: string;
  [key: string]: string;
}

export type TFunction = ((key: string, fallback?: string) => string) & TranslationsType;

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TFunction;
}

const translations: Record<SupportedLanguage, TranslationsType> = {
  uz: {
    heroBadge: 'Zamonaviy Taʼlim Ekologiyasi',
    heroTitle: 'Kelajak kasblari va global tillarni',
    heroHighlight: 'ZiyoTaʼlim bilan oʻrganing',
    heroSubtitle: 'Axborot texnologiyalari, IT dasturlash, 10 ta jahon tillari hamda sunʼiy intellekt repetitori yordamida bilimingizni eng yuqori darajaga olib chiqing.',
    searchPlaceholder: 'Kurslar, fanlar yoki yoʻnalishlarni qidirish...',
    searchClear: 'Qidiruvni tozalash',
    heroStartIT: 'IT Kurslarini Boshlash',
    heroExploreLanguages: 'Chet Tillarini Oʻrganish',
    heroAskAI: 'AI Yordamchi Bilan Suhbat',
    statStudents: 'Faol oʻquvchilar',
    statCourses: 'Amaliy kurslar',
    statLanguages: 'Jahon tillari',
    statSatisfaction: 'Ijobiy baholar',
    'nav.courses': 'Kurslar',
    'nav.languages': 'Tillar',
    'nav.it': 'IT Dasturlash',
    'nav.quiz': 'Quiz Testlar',
    'common.search': 'Qidirish',
    'common.back': 'Orqaga',
    'common.close': 'Yopish',
    'common.save': 'Saqlash',
    'common.loading': 'Yuklanmoqda...',
  },
  ru: {
    heroBadge: 'Современная Образовательная Среда',
    heroTitle: 'Изучайте профессии будущего и мировые языки',
    heroHighlight: 'вместе с ZiyoTaʼlim',
    heroSubtitle: 'Информационные технологии, IT программирование, 10 мировых языков и персональный AI-репетитор для достижения максимальных результатов.',
    searchPlaceholder: 'Поиск курсов, предметов или направлений...',
    searchClear: 'Очистить поиск',
    heroStartIT: 'Начать IT Курсы',
    heroExploreLanguages: 'Изучать Языки',
    heroAskAI: 'Общаться с AI',
    statStudents: 'Активных студентов',
    statCourses: 'Практических курсов',
    statLanguages: 'Мировых языков',
    statSatisfaction: 'Положительных отзывов',
    'nav.courses': 'Курсы',
    'nav.languages': 'Языки',
    'nav.it': 'IT Программирование',
    'nav.quiz': 'Тесты и Квизы',
    'common.search': 'Поиск',
    'common.back': 'Назад',
    'common.close': 'Закрыть',
    'common.save': 'Сохранить',
    'common.loading': 'Загрузка...',
  },
  en: {
    heroBadge: 'Modern Learning Ecosystem',
    heroTitle: 'Master Future Careers & Global Languages',
    heroHighlight: 'with ZiyoTaʼlim',
    heroSubtitle: 'Information technology, software engineering, 10 global languages, and personal AI tutoring to elevate your skills to the highest level.',
    searchPlaceholder: 'Search courses, subjects, or career paths...',
    searchClear: 'Clear search',
    heroStartIT: 'Start IT Courses',
    heroExploreLanguages: 'Explore Languages',
    heroAskAI: 'Ask AI Assistant',
    statStudents: 'Active students',
    statCourses: 'Practical courses',
    statLanguages: 'World languages',
    statSatisfaction: 'Satisfaction rate',
    'nav.courses': 'Courses',
    'nav.languages': 'Languages',
    'nav.it': 'IT Programming',
    'nav.quiz': 'Quiz Tests',
    'common.search': 'Search',
    'common.back': 'Back',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.loading': 'Loading...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ziyo_language');
      if (stored === 'uz' || stored === 'ru' || stored === 'en') {
        return stored;
      }
    }
    return 'uz';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ziyo_language', language);
    }
  }, [language]);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
  };

  const currentTranslations = translations[language] || translations.uz;

  // Build callable and object-accessible t
  const tFunc = ((key: string, fallback?: string): string => {
    return currentTranslations[key] || fallback || key;
  }) as TFunction;

  // Assign dictionary properties directly to function
  Object.assign(tFunc, currentTranslations);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tFunc }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
