import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { CourseCard } from './components/CourseCard';
import { LanguageHubSpotlight } from './components/LanguageHubSpotlight';
import { ITSpotlight } from './components/ITSpotlight';
import { CourseDetailsModal } from './components/CourseDetailsModal';
import { ClassroomModal } from './components/ClassroomModal';
import { LanguageLabModal } from './components/LanguageLabModal';
import { ITPlaygroundModal } from './components/ITPlaygroundModal';
import { QuizCenterModal } from './components/QuizCenterModal';
import { CertificateModal } from './components/CertificateModal';
import { PersonalCabinetModal } from './components/PersonalCabinetModal';
import { Leaderboard } from './components/Leaderboard';
import { AuthModal } from './components/AuthModal';
import { RealTranslatorModal } from './components/RealTranslatorModal';
import { TechzoneDashboard } from './components/TechzoneDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminCabinetModal } from './components/AdminCabinetModal';
import { SubjectDossier } from './components/SubjectDossier';
import { Footer } from './components/Footer';

import { COURSES_DATA } from './data/coursesData';
import { SUBJECTS_DATA, findMatchingSubjects, SubjectInfo } from './data/subjectsData';
import { Course, CourseCategory, LanguageType, CertificateItem, UserProgress, UserProfile } from './types';
import { getStoredProgress, saveStoredProgress, getStoredUser, saveStoredUser } from './utils/storage';
import { 
  getStoredCourses, 
  saveStoredCourses, 
  getStoredAdminAuth, 
  setStoredAdminAuth,
  getStoredUsers,
  MockUser,
  computeTotalStudentsCount,
  getStoredTotalCertificatesCount,
  incrementStoredCertificatesCount
} from './utils/adminStorage';
import { BookOpen, Sparkles, Filter, Award, CheckCircle2, Languages, Search, X } from 'lucide-react';

export default function App() {
  // Stored state
  const [courses, setCourses] = useState<Course[]>(getStoredCourses());
  const [usersList, setUsersList] = useState<MockUser[]>(getStoredUsers());
  const [totalCertificatesCount, setTotalCertificatesCount] = useState<number>(getStoredTotalCertificatesCount());
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress());
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getStoredUser());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(getStoredAdminAuth());

  const totalStudentsCount = computeTotalStudentsCount(usersList);
  const totalCoursesCount = courses.length;

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Modals
  const [activeCourseForClassroom, setActiveCourseForClassroom] = useState<Course | null>(null);
  const [activeCourseForDetails, setActiveCourseForDetails] = useState<Course | null>(null);
  const [isLanguageLabOpen, setIsLanguageLabOpen] = useState(false);
  const [initialLanguageForLab, setInitialLanguageForLab] = useState<LanguageType>('english');
  const [isITPlaygroundOpen, setIsITPlaygroundOpen] = useState(false);
  const [isQuizCenterOpen, setIsQuizCenterOpen] = useState(false);
  const [activeQuizTestId, setActiveQuizTestId] = useState<string | undefined>(undefined);
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);
  const [isMyLearningOpen, setIsMyLearningOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [translatorInitialTab, setTranslatorInitialTab] = useState<'translator' | 'chat' | 'analysis' | 'test' | 'history'>('translator');
  const [translatorAutoVoice, setTranslatorAutoVoice] = useState(false);
  const [translatorInitialSourceText, setTranslatorInitialSourceText] = useState<string>('');

  const handleOpenTranslator = (
    tab: 'translator' | 'chat' | 'analysis' | 'test' | 'history' = 'translator',
    autoVoice = false,
    sourceText = ''
  ) => {
    setTranslatorInitialTab(tab);
    setTranslatorAutoVoice(autoVoice);
    setTranslatorInitialSourceText(sourceText);
    setIsTranslatorOpen(true);
  };
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminCabinetOpen, setIsAdminCabinetOpen] = useState(false);
  const [interfaceMode, setInterfaceMode] = useState<'techzone' | 'classic'>('techzone');

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync progress changes to localStorage
  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  // Sync user profile changes to localStorage
  useEffect(() => {
    saveStoredUser(currentUser);
  }, [currentUser]);

  // Fanlarda darsni boshlashga kirilganda asosiy panel qimirlamasin, chiqganda qimirlasin
  useEffect(() => {
    if (activeCourseForClassroom) {
      const origBodyOverflow = document.body.style.overflow;
      const origDocOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origBodyOverflow;
        document.documentElement.style.overflow = origDocOverflow;
      };
    }
  }, [activeCourseForClassroom]);

  // Auth Handlers
  const handleAuthSuccess = (user: UserProfile, msg: string) => {
    setCurrentUser(user);
    setUsersList(getStoredUsers());
    showToast(msg);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Akkauntdan muvaffaqiyatli chiqildi');
  };

  const scrollToLeaderboard = () => {
    const el = document.getElementById('leaderboard');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Actions
  const handleEnrollCourse = (course: Course) => {
    if (!progress.enrolledCourseIds.includes(course.id)) {
      setProgress(prev => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, course.id]
      }));
      showToast(`"${course.title}" kursiga aʼzo boʻldingiz!`);
    }
  };

  const handleToggleBookmark = (courseId: string) => {
    setProgress(prev => {
      const isSaved = prev.bookmarkedCourseIds.includes(courseId);
      const nextBookmarks = isSaved 
        ? prev.bookmarkedCourseIds.filter(id => id !== courseId)
        : [...prev.bookmarkedCourseIds, courseId];
      
      showToast(isSaved ? 'Kurs saqlanganlardan olib tashlandi' : 'Kurs saqlandi!');
      return {
        ...prev,
        bookmarkedCourseIds: nextBookmarks
      };
    });
  };

  const handleToggleCompleteLesson = (lessonId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedLessonIds.includes(lessonId);
      const nextLessons = isCompleted
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      
      showToast(isCompleted ? 'Dars belgisi bekor qilindi' : 'Dars muvaffaqiyatli tamomlandi! +10 ball');
      return {
        ...prev,
        completedLessonIds: nextLessons
      };
    });
  };

  const handleGenerateCertificate = (courseTitle: string, customGrade?: string) => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      courseTitle,
      recipientName: currentUser?.fullName || 'Oybekjon Adashev',
      issueDate: new Date().toISOString().split('T')[0],
      grade: customGrade || 'A+ (Aʼlo daraja)',
      verificationCode: `ZT-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setProgress(prev => ({
      ...prev,
      certificates: [newCert, ...prev.certificates.filter(c => c.courseTitle !== courseTitle)]
    }));

    const nextCertsCount = incrementStoredCertificatesCount();
    setTotalCertificatesCount(nextCertsCount);

    setActiveCertificate(newCert);
    showToast('Yangi rasmiy sertifikat tasdiqlandi!');
  };

  const handleOpenLanguageLabWith = (lang: LanguageType) => {
    setInitialLanguageForLab(lang);
    setIsLanguageLabOpen(true);
  };

  const handleToggleMasteredVocab = (vocabId: string) => {
    setProgress(prev => {
      const current = prev.masteredVocabIds || [];
      const exists = current.includes(vocabId);
      const next = exists ? current.filter(id => id !== vocabId) : [...current, vocabId];
      if (!exists) {
        showToast('Soʻz muvaffaqiyatli oʻzlashtirildi (+10 XP reyting bali)!');
      }
      return {
        ...prev,
        masteredVocabIds: next
      };
    });
  };

  const handleResetMasteredVocab = (vocabIdsToReset: string[]) => {
    setProgress(prev => ({
      ...prev,
      masteredVocabIds: (prev.masteredVocabIds || []).filter(id => !vocabIdsToReset.includes(id))
    }));
    showToast('Ushbu darajadagi soʻzlar qayta oʻrganish uchun tozalandi');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    saveStoredUser(updatedUser);
  };

  const handleUnenrollCourse = (courseId: string) => {
    setProgress(prev => {
      const updated = prev.enrolledCourseIds.filter(id => id !== courseId);
      const newProgress = { ...prev, enrolledCourseIds: updated };
      saveStoredProgress(newProgress);
      return newProgress;
    });
  };

  // Admin Gateway Handlers
  const handleOpenAdminGateway = () => {
    if (isAdminLoggedIn) {
      setIsAdminCabinetOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginModalOpen(false);
    setIsAdminCabinetOpen(true);
    showToast('Admin boshqaruv kabinetiga xush kelibsiz!');
  };

  const handleAdminLogout = () => {
    setStoredAdminAuth(false);
    setIsAdminLoggedIn(false);
    setIsAdminCabinetOpen(false);
    showToast('Admin akkauntidan chiqildi');
  };

  const handleUpdateCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    saveStoredCourses(newCourses);
  };

  // Helper to normalize strings for search (ignoring Uzbek apostrophes oʻ, o', gʻ, g', accents, extra spaces)
  const normalizeForSearch = (str: string): string => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['ʻʼ`‘’]/g, '')
      .trim();
  };

  // Multi-field search matching function
  const isCourseMatchingSearch = (course: Course, normQuery: string): boolean => {
    if (!normQuery) return true;
    const words = normQuery.split(/\s+/).filter(Boolean);

    const title = normalizeForSearch(course.title || '');
    const shortDesc = normalizeForSearch(course.shortDescription || '');
    const fullDesc = normalizeForSearch(course.description || course.fullDescription || '');
    const instructor = normalizeForSearch(course.instructor?.name || '');
    const instructorRole = normalizeForSearch(course.instructor?.role || '');
    const level = normalizeForSearch(course.level || '');
    const category = normalizeForSearch(course.category || '');
    const language = course.language ? normalizeForSearch(course.language) : '';
    const highlights = (course.highlights || []).map(h => normalizeForSearch(h)).join(' ');
    const syllabus = (course.modules || []).map(m => 
      `${normalizeForSearch(m.title)} ${(m.lessons || []).map(l => normalizeForSearch(l.title)).join(' ')}`
    ).join(' ');

    // Helpful Uzbek category keywords
    let categoryAlias = '';
    if (course.category === 'languages') categoryAlias = 'til tillar xorijiy xalqaro xorijiy tillar ingliz rus fransuz nemis english russian french german';
    else if (course.category === 'it') categoryAlias = 'it dasturlash kod frontend python backend cyber kiber kompyuter web dastur suniy ai';
    else if (course.category === 'exact_sciences') categoryAlias = 'aniq fanlar matematika fizika hisob algebra geometriya';
    else if (course.category === 'natural_sciences') categoryAlias = 'tabiiy fanlar kimyo biologiya geografiya ximiya tabiat';
    else if (course.category === 'humanities') categoryAlias = 'ijtimoiy gumanitar tarix ona tili adabiyot';

    // If query matches a subject, ensure that subject's courses match
    if (matchedSubjects.length > 0) {
      const relatedIds = matchedSubjects.flatMap(s => s.relatedCourseIds);
      if (relatedIds.includes(course.id)) return true;
    }

    const haystack = `${title} ${shortDesc} ${fullDesc} ${instructor} ${instructorRole} ${level} ${category} ${language} ${categoryAlias} ${highlights} ${syllabus}`;

    return words.every(word => haystack.includes(word));
  };

  // Matched subjects for current query or selected subject
  const matchedSubjects = useMemo(() => {
    if (selectedSubjectId) {
      const found = SUBJECTS_DATA.find(s => s.id === selectedSubjectId);
      if (found) return [found];
    }
    if (searchQuery.trim()) {
      return findMatchingSubjects(searchQuery);
    }
    return [];
  }, [searchQuery, selectedSubjectId]);

  // Filter courses
  const normQuery = normalizeForSearch(searchQuery);
  const isSearchActive = normQuery.length > 0 || !!selectedSubjectId;

  const filteredCourses = courses.filter((course) => {
    // If a subject is explicitly selected
    if (selectedSubjectId && matchedSubjects.length > 0) {
      const related = matchedSubjects[0].relatedCourseIds;
      if (related.includes(course.id)) return true;
      if (course.category === matchedSubjects[0].category) return true;
    }

    // 1. Search query match
    if (isSearchActive) {
      if (!isCourseMatchingSearch(course, normQuery)) {
        return false;
      }
      // If user selected a specific category, but has no matches in that category,
      // fallback to global matches so search always works across all courses!
      if (selectedCategory !== 'all') {
        const hasCategoryMatches = courses.some(
          c => c.category === selectedCategory && isCourseMatchingSearch(c, normQuery)
        );
        if (hasCategoryMatches && course.category !== selectedCategory) {
          return false;
        }
      }
      return true;
    }

    // 2. Normal filters when not searching
    // Category match
    if (selectedCategory !== 'all' && course.category !== selectedCategory) {
      return false;
    }
    // Language specific filter
    if (languageFilter !== 'all') {
      if (course.category !== 'languages' || course.language !== languageFilter) {
        return false;
      }
    }
    // Level match
    if (selectedLevel !== 'all' && course.level !== selectedLevel) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (3 zones) */}
      <Navbar
        progress={progress}
        currentUser={currentUser}
        onOpenMyLearning={() => setIsMyLearningOpen(true)}
        onOpenLanguageLab={() => setIsLanguageLabOpen(true)}
        onOpenITPlayground={() => setIsITPlaygroundOpen(true)}
        onOpenQuizCenter={() => setIsQuizCenterOpen(true)}
        onOpenLeaderboard={scrollToLeaderboard}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdminLogin={handleOpenAdminGateway}
        isAdminLoggedIn={isAdminLoggedIn}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as CourseCategory);
          setLanguageFilter('all');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* Interface Toggle Bar */}
        <div className="bg-slate-900 text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-extrabold text-sm tracking-wide text-white">
              Ziyo Talim akademiyasi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Interfeysni oʻzgartirish:</span>
            <button
              onClick={() => {
                const nextMode = interfaceMode === 'techzone' ? 'classic' : 'techzone';
                setInterfaceMode(nextMode);
                showToast(nextMode === 'techzone' ? 'Ziyo Talim akademiyasi interfeysiga oʻtildi' : 'Klassik katalog koʻrinishiga oʻtildi');
              }}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              {interfaceMode === 'techzone' ? '🔄 Klassik koʻrinishga oʻtish' : '✨ Akademiya koʻrinishiga oʻtish'}
            </button>
          </div>
        </div>

        {/* TECHZONE Futuristic Interface (Requested by user) */}
        {interfaceMode === 'techzone' && (
          <TechzoneDashboard
            courses={courses}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenCourse={(course) => setActiveCourseForClassroom(course)}
            onOpenITPlayground={() => setIsITPlaygroundOpen(true)}
            onOpenLanguageLab={() => setIsLanguageLabOpen(true)}
            onOpenQuizCenter={() => setIsQuizCenterOpen(true)}
            onOpenMyLearning={() => setIsMyLearningOpen(true)}
            onOpenTranslator={handleOpenTranslator}
            totalStudentsCount={totalStudentsCount}
            totalCertificatesCount={totalCertificatesCount}
          />
        )}

        {/* Hero Section (Classic) */}
        {interfaceMode === 'classic' && (
          <HeroSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat as CourseCategory);
              setLanguageFilter('all');
              const el = document.getElementById('courses-catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenLanguageLab={() => setIsLanguageLabOpen(true)}
            onOpenITPlayground={() => setIsITPlaygroundOpen(true)}
            onOpenQuizCenter={() => setIsQuizCenterOpen(true)}
            onOpenLeaderboard={scrollToLeaderboard}
            onOpenTranslator={() => setIsTranslatorOpen(true)}
            onOpenMyLearning={() => setIsMyLearningOpen(true)}
            totalCoursesCount={totalCoursesCount}
            totalStudentsCount={totalStudentsCount}
            totalCertificatesCount={totalCertificatesCount}
          />
        )}

        {/* Dedicated Languages Hub Spotlight (Ingliz, Rus, Fransuz, Nemis) */}
        <LanguageHubSpotlight
          onOpenLanguageLabWith={handleOpenLanguageLabWith}
          onOpenTranslator={() => setIsTranslatorOpen(true)}
          onFilterLanguage={(lang) => {
            setSelectedCategory('languages');
            setLanguageFilter(lang);
            const el = document.getElementById('courses-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Dedicated IT & Coding Spotlight */}
        <ITSpotlight
          onOpenITPlayground={() => setIsITPlaygroundOpen(true)}
          onFilterIT={() => {
            setSelectedCategory('it');
            setLanguageFilter('all');
            const el = document.getElementById('courses-catalog');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Main Courses Explorer & Catalog Section */}
        <section id="courses-catalog" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Counter */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Oʻquv Dasturlari Katalogi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Barcha Fanlar va Amaliy Kurslar
              </h2>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Topilgan kurslar: <strong className="text-slate-900 dark:text-white font-bold tabular-nums">{filteredCourses.length}</strong> ta
            </div>
          </div>

          {/* Category & Subcategory Filter Tabs */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubjectId(null);
              setLanguageFilter('all');
            }}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            languageFilter={languageFilter}
            onSelectLanguageFilter={setLanguageFilter}
          />

          {/* Fanlar ensiklopediyasi & tezkor pasporti bar */}
          <div className="mb-6 pb-2 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Fanlar pasporti:</span>
            </span>
            {SUBJECTS_DATA.map((subj) => {
              const isSubjActive = (matchedSubjects.length > 0 && (selectedSubjectId === subj.id || (!selectedSubjectId && matchedSubjects[0].id === subj.id)));
              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => {
                    if (isSubjActive) {
                      setSelectedSubjectId(null);
                      setSearchQuery('');
                    } else {
                      setSelectedSubjectId(subj.id);
                      setSearchQuery(subj.name);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSubjActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                  }`}
                >
                  <span>{subj.icon}</span>
                  <span>{subj.name}</span>
                </button>
              );
            })}
          </div>

          {/* If search or subject matches multiple subjects, show tabs */}
          {matchedSubjects.length > 1 && (
            <div className="mb-4 p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                Soʻrovingiz boʻyicha {matchedSubjects.length} ta fan topildi:
              </span>
              {matchedSubjects.map((s) => {
                const isCurrent = (selectedSubjectId === s.id) || (!selectedSubjectId && matchedSubjects[0].id === s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSubjectId(s.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Subject Dossier & Information Card (When a subject is matched/searched) */}
          {matchedSubjects.length > 0 && (
            <SubjectDossier
              subject={
                selectedSubjectId
                  ? (SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || matchedSubjects[0])
                  : matchedSubjects[0]
              }
              coursesCount={filteredCourses.length}
              onOpenQuiz={(testId) => {
                setActiveQuizTestId(testId);
                setIsQuizCenterOpen(true);
              }}
              onOpenLab={(toolType) => {
                if (toolType === 'it') setIsITPlaygroundOpen(true);
                else if (toolType === 'language') setIsLanguageLabOpen(true);
                else setIsQuizCenterOpen(true);
              }}
              onOpenAIChat={(subjectName) => {
                handleOpenTranslator(
                  'chat',
                  false,
                  `${subjectName} fani boʻyicha Techie AI shaxsiy oʻqituvchisidan toʻliq darslik va oʻquv yoʻnalishi maslahati`
                );
              }}
              onClose={() => {
                setSelectedSubjectId(null);
                setSearchQuery('');
              }}
              onScrollToCourses={() => {
                document.getElementById('courses-grid-list')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {/* Active Search Results Banner */}
          {searchQuery.trim() && (
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Qidiruv soʻrovi: <span className="text-slate-900 dark:text-white font-bold">"{searchQuery}"</span>
                  </div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium">
                    {filteredCourses.length > 0
                      ? `${filteredCourses.length} ta kurs topildi`
                      : "Hech qanday kurs mos kelmadi"}
                    {matchedSubjects.length > 0 && ` • ${matchedSubjects[0].name} fani maʼlumotlari yuklandi`}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubjectId(null);
                  setSelectedCategory('all');
                  setLanguageFilter('all');
                }}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-2xs"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
                <span>Qidiruvni tozalash</span>
              </button>
            </div>
          )}

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div id="courses-grid-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const isEnrolled = progress.enrolledCourseIds.includes(course.id);
                const isBookmarked = progress.bookmarkedCourseIds.includes(course.id);

                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={isEnrolled}
                    isBookmarked={isBookmarked}
                    onSelect={(c) => setActiveCourseForDetails(c)}
                    onStartLesson={(c) => {
                      handleEnrollCourse(c);
                      setActiveCourseForClassroom(c);
                    }}
                    onToggleBookmark={handleToggleBookmark}
                  />
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {searchQuery.trim() ? `"${searchQuery}" boʻyicha kurs topilmadi` : 'Hech qanday kurs topilmadi'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                Boshqa kalit soʻz kiritib koʻring yoki filtrlarni tozalab barcha kurslarni koʻring.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setLanguageFilter('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Barcha Kurslarni Koʻrsatish
              </button>
            </div>
          )}

        </section>

        {/* Top Students Leaderboard Section (Reyting & Peshqadamlar Jadvali) */}
        <Leaderboard
          progress={progress}
          currentUser={currentUser}
          onOpenQuizCenter={() => setIsQuizCenterOpen(true)}
          onOpenRegister={() => setIsAuthModalOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setLanguageFilter('all');
          const el = document.getElementById('courses-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLanguageLab={() => setIsLanguageLabOpen(true)}
        onOpenITPlayground={() => setIsITPlaygroundOpen(true)}
        onOpenQuizCenter={() => setIsQuizCenterOpen(true)}
        onOpenLeaderboard={scrollToLeaderboard}
      />

      {/* Modals */}
      <CourseDetailsModal
        course={activeCourseForDetails}
        isOpen={!!activeCourseForDetails}
        onClose={() => setActiveCourseForDetails(null)}
        isEnrolled={!!activeCourseForDetails && progress.enrolledCourseIds.includes(activeCourseForDetails.id)}
        isBookmarked={!!activeCourseForDetails && progress.bookmarkedCourseIds.includes(activeCourseForDetails.id)}
        onEnroll={handleEnrollCourse}
        onStartLesson={(course) => {
          handleEnrollCourse(course);
          setActiveCourseForClassroom(course);
        }}
        onToggleBookmark={handleToggleBookmark}
      />

      <ClassroomModal
        course={activeCourseForClassroom}
        isOpen={!!activeCourseForClassroom}
        onClose={() => setActiveCourseForClassroom(null)}
        completedLessonIds={progress.completedLessonIds}
        onToggleCompleteLesson={handleToggleCompleteLesson}
        onGenerateCertificate={(title) => handleGenerateCertificate(title)}
      />

      <LanguageLabModal
        isOpen={isLanguageLabOpen}
        onClose={() => setIsLanguageLabOpen(false)}
        initialLanguage={initialLanguageForLab}
        masteredVocabIds={progress.masteredVocabIds || []}
        onToggleMasteredVocab={handleToggleMasteredVocab}
        onResetMasteredVocab={handleResetMasteredVocab}
      />

      <ITPlaygroundModal
        isOpen={isITPlaygroundOpen}
        onClose={() => setIsITPlaygroundOpen(false)}
      />

      <QuizCenterModal
        isOpen={isQuizCenterOpen}
        onClose={() => {
          setIsQuizCenterOpen(false);
          setActiveQuizTestId(undefined);
        }}
        onSaveCertificate={(title, grade) => handleGenerateCertificate(title, grade)}
        initialTestId={activeQuizTestId}
      />

      <CertificateModal
        certificate={activeCertificate}
        isOpen={!!activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />

      {/* Shaxsiy Kabinet (Personal Cabinet & Learning Hub) */}
      <PersonalCabinetModal
        isOpen={isMyLearningOpen}
        onClose={() => setIsMyLearningOpen(false)}
        progress={progress}
        currentUser={currentUser}
        courses={courses}
        onOpenClassroom={(c) => setActiveCourseForClassroom(c)}
        onViewCertificate={(cert) => setActiveCertificate(cert)}
        onOpenQuizCenter={() => setIsQuizCenterOpen(true)}
        onOpenLanguageLab={() => setIsLanguageLabOpen(true)}
        onUpdateUser={handleUpdateUser}
        onToggleBookmark={handleToggleBookmark}
        onUnenrollCourse={handleUnenrollCourse}
        onLogout={handleLogout}
        showToast={showToast}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSuccessAuth={handleAuthSuccess}
        onLogout={handleLogout}
      />

      {/* Admin Login Modal (Login: 1, Parol: 1) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccessAdminLogin={handleAdminLoginSuccess}
      />

      {/* Admin Cabinet Modal (iPhone-like vertical glassmorphism, logs, settings, course editor) */}
      <AdminCabinetModal
        isOpen={isAdminCabinetOpen}
        onClose={() => setIsAdminCabinetOpen(false)}
        courses={courses}
        onUpdateCourses={handleUpdateCourses}
        totalCertificatesCount={totalCertificatesCount}
        onUpdateTotalCertificatesCount={(newCount) => setTotalCertificatesCount(newCount)}
        onUpdateUsersList={(newUsers) => setUsersList(newUsers)}
        onLogoutAdmin={handleAdminLogout}
        showToast={showToast}
      />

      {/* 10-Language Real Translator Modal (2,650+ words per language) */}
      <RealTranslatorModal
        isOpen={isTranslatorOpen}
        onClose={() => setIsTranslatorOpen(false)}
        initialTab={translatorInitialTab}
        autoStartVoice={translatorAutoVoice}
        initialSourceText={translatorInitialSourceText}
      />

      {/* Floating Quick Launcher for Real Translator */}
      <button
        onClick={() => setIsTranslatorOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-sky-500/25 border border-sky-300/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
        title="10 Tilli Real Tarjimonni ochish"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <Languages className="w-5 h-5 text-sky-200 group-hover:rotate-12 transition-transform" />
        <div className="text-left">
          <div className="text-xs font-black tracking-tight leading-none">Real Tarjimon</div>
          <div className="text-[10px] text-sky-200 font-medium">10 til · 2,650+ soʻz</div>
        </div>
      </button>

    </div>
  );
}
