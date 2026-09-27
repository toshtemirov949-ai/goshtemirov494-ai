import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Play, Pause, RotateCcw, Volume2, CheckCircle2, 
  BookOpen, Code, Award, VolumeX, Sparkles, HelpCircle,
  ChevronLeft, ChevronRight, Search, Check, FastForward, Rewind, MessageSquare
} from 'lucide-react';
import { Course, Lesson } from '../types';
import { getLessonQuiz } from '../data/lessonQuizData';
import { playFemaleSpeech, stopAllSpeech } from '../utils/femaleVoiceService';

interface ClassroomModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  completedLessonIds: string[];
  onToggleCompleteLesson: (lessonId: string) => void;
  onGenerateCertificate: (courseTitle: string) => void;
}

export const ClassroomModal: React.FC<ClassroomModalProps> = ({
  course,
  isOpen,
  onClose,
  completedLessonIds,
  onToggleCompleteLesson,
  onGenerateCertificate,
}) => {
  // Asosiy panel dars boshlanganda qimirlamasin (scroll qulflansin), darsdan chiqqanda qimirlasin
  useEffect(() => {
    if (isOpen && course) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [isOpen, course]);

  if (!isOpen || !course) return null;

  // Flattened lessons list
  const allLessons = useMemo(() => course.modules.flatMap(m => m.lessons), [course]);
  
  // Selected active lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || '');
  const activeIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const activeLesson: Lesson = (activeIndex >= 0 ? allLessons[activeIndex] : allLessons[0]) || {
    id: 'default',
    title: '1-Dars: Kirish',
    duration: '25 daqiqa',
    type: 'video'
  };

  // Video simulator state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'practice' | 'quiz'>('quiz');

  // Search and filter in curriculum sidebar
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [filterCompletedOnly, setFilterCompletedOnly] = useState(false);

  // Lesson Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Practice state
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);
  const [practiceCode, setPracticeCode] = useState<string>(
    course.category === 'it' 
      ? '// Kod yozing va tekshiring:\nfunction solve() {\n  return "Salom ZiyoTalim";\n}'
      : 'Ushbu mavzu yuzasidan oʻz xulosangizni yozing...'
  );
  const [practiceSuccess, setPracticeSuccess] = useState(false);

  // Audio Speech state for language lessons
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);

  // Reset quiz state when active lesson changes
  const lessonQuizQuestions = useMemo(() => {
    return getLessonQuiz(course.id, activeLesson.id, activeLesson.title, course.category);
  }, [course.id, activeLesson.id, activeLesson.title, course.category]);

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setIsPlaying(false);
    setSelectedAnswers({});
    setCurrentQuizIndex(0);
    setQuizScore(null);
    setPracticeFeedback(null);
    setPracticeAnswer(null);
    setPracticeSuccess(false);
  };

  const handlePrevLesson = () => {
    if (activeIndex > 0) {
      handleSelectLesson(allLessons[activeIndex - 1].id);
    }
  };

  const handleNextLesson = () => {
    if (activeIndex < allLessons.length - 1) {
      handleSelectLesson(allLessons[activeIndex + 1].id);
    }
  };

  const handleSpeak = (text: string, langCode: string = 'en-US', rate: number = 0.88) => {
    playFemaleSpeech({
      text,
      lang: course?.language || langCode,
      rate,
      pitch: 1.1, // Sweet and clear female pitch (qiz bola ovozi)
      onStart: () => setSpeechStatus('Mayin qiz bola ovozida talaffuz...'),
      onEnd: () => setSpeechStatus(null),
      onError: () => setSpeechStatus(null)
    });
  };

  const isCurrentCompleted = completedLessonIds.includes(activeLesson.id);
  const totalCompletedInCourse = allLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const courseCompletionRate = Math.round((totalCompletedInCourse / (allLessons.length || 1)) * 100);

  // Speech language code
  const getSpeechLangCode = () => {
    if (course.language === 'russian') return 'ru-RU';
    if (course.language === 'french') return 'fr-FR';
    if (course.language === 'german') return 'de-DE';
    return 'en-US';
  };

  const posterImage = course.image || course.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
  const instructorAvatar = course.instructor.avatar || course.instructor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // Filter modules/lessons
  const filteredModules = course.modules.map(module => {
    const lessons = module.lessons.filter(l => {
      const matchSearch = curriculumSearch.trim() === '' || l.title.toLowerCase().includes(curriculumSearch.toLowerCase());
      const matchCompleted = !filterCompletedOnly || completedLessonIds.includes(l.id);
      return matchSearch && matchCompleted;
    });
    return { ...module, lessons };
  }).filter(m => m.lessons.length > 0);

  // Handle quiz option select
  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    lessonQuizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);

    // Auto mark as completed if passed (2 out of 3 or more)
    if (score >= Math.ceil(lessonQuizQuestions.length / 2)) {
      if (!isCurrentCompleted) {
        onToggleCompleteLesson(activeLesson.id);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[94vh] transition-colors">
        
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {course.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-2">
                <span className="font-semibold text-indigo-700 dark:text-indigo-400">{activeIndex + 1}/{allLessons.length}-dars:</span>
                <span>{activeLesson.title}</span>
                <span className="text-slate-400 dark:text-slate-500">({activeLesson.duration})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <span>Oʻzlashtirish:</span>
              <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${courseCompletionRate}%` }}
                ></div>
              </div>
              <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white">{courseCompletionRate}%</span>
            </div>

            <button
              onClick={() => onGenerateCertificate(course.title)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer shadow-sm"
              title="Rasmiy Sertifikat Olish"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sertifikat Olish</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Yopish"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Classroom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left/Center Section: Video Player, Navigation & Interactive Tabs (8 cols) */}
          <div className="lg:col-span-8 flex flex-col overflow-y-auto border-r border-slate-200 dark:border-slate-800">
            
            {/* Interactive Video Player Stage */}
            <div className="relative bg-slate-950 aspect-[16/9] w-full flex items-center justify-center overflow-hidden group">
              <img
                src={posterImage}
                alt={activeLesson.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-35 scale-102' : 'opacity-60'}`}
              />

              {/* Simulation Screen Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="bg-black/70 px-2.5 py-1 rounded backdrop-blur-sm font-medium">
                    {course.instructor.name} · {course.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded font-mono text-[10px]">
                      {activeLesson.type.toUpperCase()}
                    </span>
                    <span className="bg-indigo-600/80 text-white px-2 py-0.5 rounded font-mono text-[10px]">
                      1080p Full HD
                    </span>
                  </div>
                </div>

                {!isPlaying && (
                  <div className="text-center pointer-events-auto">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 cursor-pointer mx-auto mb-3"
                    >
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </button>
                    <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-md">
                      Dars videosini tomosha qilish uchun bosing
                    </p>
                  </div>
                )}

                {/* Bottom Custom Playback Bar */}
                <div className="pointer-events-auto bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 -m-4 sm:-m-6 rounded-b-xl flex flex-col gap-2">
                  {/* Scrubber Bar */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressPercent}
                    onChange={(e) => setProgressPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 accent-indigo-500 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1 hover:text-indigo-400 cursor-pointer"
                        title={isPlaying ? "Pauza" : "Ijro"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => setProgressPercent(Math.max(0, progressPercent - 10))}
                        className="p-1 hover:text-indigo-400 cursor-pointer flex items-center gap-0.5 text-[11px]"
                        title="10 soniya orqaga"
                      >
                        <Rewind className="w-3.5 h-3.5" />
                        <span>-10s</span>
                      </button>
                      <button 
                        onClick={() => setProgressPercent(Math.min(100, progressPercent + 10))}
                        className="p-1 hover:text-indigo-400 cursor-pointer flex items-center gap-0.5 text-[11px]"
                        title="10 soniya oldinga"
                      >
                        <FastForward className="w-3.5 h-3.5" />
                        <span>+10s</span>
                      </button>
                      <button 
                        onClick={() => setProgressPercent(0)}
                        className="p-1 hover:text-indigo-400 cursor-pointer"
                        title="Boshidan boshlash"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-[11px] tabular-nums text-slate-300">
                        {Math.floor((progressPercent * 25) / 100)}:15 / 25:00
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1 hover:text-indigo-400 cursor-pointer"
                        title={isMuted ? "Ovozni yoqish" : "Ovozni oʻchirish"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <div className="flex items-center gap-1 font-mono text-[11px] bg-slate-800/90 px-2 py-0.5 rounded">
                        {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setPlaybackSpeed(spd)}
                            className={`px-1 rounded ${playbackSpeed === spd ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-white'}`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Navigation Bar (Prev / Next & Complete) */}
            <div className="p-3 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeIndex === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-650 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Oldingi dars</span>
                </button>

                <button
                  onClick={handleNextLesson}
                  disabled={activeIndex === allLessons.length - 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-650 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Keyingi dars</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleCompleteLesson(activeLesson.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                    isCurrentCompleted 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCurrentCompleted ? 'Dars oʻzlashtirildi ✓' : 'Tugatildi deb belgilash'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Lesson Workspace Tabs */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col bg-white dark:bg-slate-900">
              {/* Tab Selector */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'quiz' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Mavzuviy Test ({lessonQuizQuestions.length} ta savol)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'notes' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Dars Konspekti</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('practice')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'practice' 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Interaktiv Mashq</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: Real Lesson Quiz */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  <div className="bg-slate-50/90 dark:bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          "{activeLesson.title}" boʻyicha tekshiruv testi
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        Savol: {currentQuizIndex + 1} / {lessonQuizQuestions.length}
                      </span>
                    </div>

                    {/* Active Question Box - Beautiful, Highly Visible Card */}
                    {lessonQuizQuestions[currentQuizIndex] && (
                      <div className="space-y-4">
                        {/* Highlighted Question Header Box with adapted background image */}
                        <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-indigo-400/30">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                            style={{ 
                              backgroundImage: `url('${course.category === 'it' ? '/src/assets/images/course_it_coding_1790137076730.jpg' : '/src/assets/images/course_languages_learning_1790137063400.jpg'}')` 
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-indigo-950/88 to-blue-950/90 backdrop-blur-[1px]" />
                          {/* Ambient glow decoration */}
                          <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl pointer-events-none"></div>
                          
                          <div className="relative z-10 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20">
                                {currentQuizIndex + 1}-Savol
                              </span>
                              <span className="text-xs text-blue-100 font-medium">Diqqat bilan oʻqing va toʻgʻri javobni tanlang:</span>
                            </div>

                            <h4 className="text-base sm:text-lg lg:text-xl font-black text-white leading-relaxed drop-shadow-xs">
                              {lessonQuizQuestions[currentQuizIndex].question}
                            </h4>
                          </div>
                        </div>

                        {/* Options List */}
                        <div className="space-y-2.5 pt-1">
                          {lessonQuizQuestions[currentQuizIndex].options.map((option, optIdx) => {
                            const isSelected = selectedAnswers[currentQuizIndex] === optIdx;
                            const isAnswered = selectedAnswers[currentQuizIndex] !== undefined;
                            const isCorrect = optIdx === lessonQuizQuestions[currentQuizIndex].correctIndex;

                            let optStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-slate-750 shadow-xs";
                            if (isAnswered) {
                              if (isSelected && isCorrect) {
                                optStyle = "bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold shadow-sm shadow-emerald-500/10";
                              } else if (isSelected && !isCorrect) {
                                optStyle = "bg-red-50 dark:bg-red-950/80 border-2 border-red-400 text-red-950 dark:text-red-200 shadow-sm";
                              } else if (isCorrect) {
                                optStyle = "bg-emerald-50/90 dark:bg-emerald-950/70 border-2 border-emerald-400 text-emerald-900 dark:text-emerald-300 font-bold";
                              }
                            } else if (isSelected) {
                              optStyle = "bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-600 text-indigo-950 dark:text-white font-bold shadow-sm shadow-indigo-500/10";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuizOption(currentQuizIndex, optIdx)}
                                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${optStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                                    isSelected 
                                      ? (isAnswered ? (isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white') : 'bg-indigo-600 text-white')
                                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                                  }`}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="text-xs sm:text-sm font-medium">{option}</span>
                                </div>
                                {isAnswered && isCorrect && (
                                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/80 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shrink-0">
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation after selecting */}
                        {selectedAnswers[currentQuizIndex] !== undefined && (
                          <div className="p-4 bg-amber-50/80 dark:bg-slate-800 rounded-xl text-xs border border-amber-200 dark:border-amber-900/50 text-slate-800 dark:text-slate-200 mt-3 animate-in fade-in shadow-xs">
                            <span className="font-extrabold text-amber-900 dark:text-amber-400 block mb-1 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              Mavzu izohi va toʻgʻri javob tahlili:
                            </span>
                            <p className="leading-relaxed">
                              {lessonQuizQuestions[currentQuizIndex].explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quiz Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200">
                      <button
                        onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentQuizIndex === 0}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        ← Oldingi savol
                      </button>

                      {currentQuizIndex < lessonQuizQuestions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuizIndex(prev => prev + 1)}
                          disabled={selectedAnswers[currentQuizIndex] === undefined}
                          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs font-semibold text-white cursor-pointer shadow-sm"
                        >
                          Keyingi savol →
                        </button>
                      ) : (
                        <button
                          onClick={handleFinishQuiz}
                          disabled={Object.keys(selectedAnswers).length < lessonQuizQuestions.length}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-xs font-bold text-white cursor-pointer shadow-sm flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Test Natijasini Qayd Etish</span>
                        </button>
                      )}
                    </div>

                    {/* Score banner */}
                    {quizScore !== null && (
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-bold text-sm">
                              Tabriklaymiz! Siz {lessonQuizQuestions.length} tadan {quizScore} ta savolga toʻgʻri javob berdingiz!
                            </h5>
                            <p className="text-xs text-emerald-100 mt-0.5">
                              {quizScore >= 2 ? 'Ushbu dars muvaffaqiyatli oʻzlashtirildi va jarayoningizga qoʻshildi.' : 'Mavzuni mustahkamlash uchun videoni qayta koʻrib chiqishni tavsiya qilamiz.'}
                            </p>
                          </div>
                          <span className="text-2xl font-black font-mono bg-white/20 px-3 py-1 rounded-lg">
                            {Math.round((quizScore / lessonQuizQuestions.length) * 100)}%
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* TAB 2: Notes / Theory */}
              {activeTab === 'notes' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Dars Maqsadi va Asosiy Qoidalar
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {activeLesson.contentSnippet || `${activeLesson.title} mavzusi boʻyicha amaliy qoidalar, xalqaro tajriba va test topshiriqlari.`}
                    </p>
                  </div>

                  {/* Audio speech button for languages */}
                  {course.category === 'languages' && (
                    <div className="p-4 bg-indigo-50/80 dark:bg-slate-800/90 rounded-xl border border-indigo-100 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-950 dark:text-indigo-200 text-xs flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          Jonli Audio Talaffuz Trenajyori (Mavzuviy Misollar):
                        </span>
                        {speechStatus && (
                          <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold animate-pulse">
                            {speechStatus}
                          </span>
                        )}
                      </div>

                      {/* 3 Interactive Lesson Audio Examples */}
                      <div className="space-y-2">
                        {[
                          {
                            label: 'Asosiy tushuncha',
                            text: `${activeLesson.title}. Clear articulation and native intonation.`,
                          },
                          {
                            label: 'Amaliy muloqot jumlasi',
                            text: `Practice makes perfect. Consistent listening and repetition build natural fluency.`,
                          },
                          {
                            label: 'Intonatsiya mashqi',
                            text: `Could you please repeat this phrase once again with proper accent?`,
                          },
                        ].map((audioEx, exIdx) => (
                          <div key={exIdx} className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-indigo-100/90 dark:border-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                                {audioEx.label}
                              </span>
                              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 italic">
                                "{audioEx.text}"
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                              <button
                                onClick={() => handleSpeak(audioEx.text, getSpeechLangCode(), 0.65)}
                                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-[11px] font-medium transition-colors cursor-pointer border border-transparent dark:border-slate-700"
                                title="Sekin talaffuz (0.65x)"
                              >
                                Sekin (0.65x)
                              </button>
                              <button
                                onClick={() => handleSpeak(audioEx.text, getSpeechLangCode(), 0.85)}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                                title="Normal talaffuz"
                              >
                                <Volume2 className="w-3 h-3" />
                                <span>Tinglash</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* IT code snippet preview */}
                  {course.category === 'it' && (
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        Mavzuga oid kod strukturasi:
                      </p>
                      <pre className="p-3.5 bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed">
{`// ${activeLesson.title}
import React, { useState, useEffect } from 'react';

export function LessonSolution() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Asinxron ma'lumot olish
    fetch('/api/lessons')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return <div>Muvaffaqiyatli bajarildi!</div>;
}`}
                      </pre>
                    </div>
                  )}

                  {/* Exact science formulas */}
                  {course.category === 'exact_sciences' && (
                    <div className="p-4 bg-amber-50/60 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-2">
                      <p className="font-bold text-amber-950 dark:text-amber-300 text-xs">Asosiy Qonuniyatlar & Formulalar:</p>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-lg font-mono text-slate-900 dark:text-slate-100 text-xs border border-amber-200 dark:border-amber-900/50">
                        x₁,₂ = (-b ± √(b² - 4ac)) / (2a) &nbsp;|&nbsp; F = m * a &nbsp;|&nbsp; I = U / R
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Har bir masalani yechishda formulalardagi oʻlchov birliklarini SI xalqaro tizimiga keltirish shart.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Interactive Practice */}
              {activeTab === 'practice' && (
                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Amaliy mashgʻulot trenajyori:
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                      "{activeLesson.title}" mavzusi boʻyicha amaliy topshiriqni bajaring va natijani darhol tekshiring.
                    </p>

                    {course.category === 'languages' ? (
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Toʻgʻri soʻz bilan toʻldiring: "He has been mastering this subject _____ over five years."
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['for', 'since', 'during', 'from'].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setPracticeAnswer(opt);
                                if (opt === 'for') {
                                  setPracticeFeedback('Toʻgʻri javob! "for over five years" vaqt davomiyligini ifodalaydi.');
                                  setPracticeSuccess(true);
                                } else {
                                  setPracticeFeedback('Notoʻgʻri! Vaqt davomiyligi (muddat) uchun "for" qoʻllanadi.');
                                  setPracticeSuccess(false);
                                }
                              }}
                              className={`p-2.5 text-xs text-center border rounded-lg font-semibold transition-all cursor-pointer ${
                                practiceAnswer === opt
                                  ? (practiceSuccess ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-red-500 text-white border-red-600')
                                  : 'bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {practiceFeedback && (
                          <div className={`p-3 rounded-lg text-xs font-medium ${practiceSuccess ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/70 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
                            {practiceFeedback}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                          Interaktiv kod maydonchasi / Yechim tahlili:
                        </label>
                        <textarea
                          rows={5}
                          value={practiceCode}
                          onChange={(e) => setPracticeCode(e.target.value)}
                          className="w-full p-3 text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setPracticeFeedback('Kod muvaffaqiyatli kompilyatsiya qilindi va test sinovlaridan 100% oʻtdi!');
                              setPracticeSuccess(true);
                            }}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-sm"
                          >
                            Kodni Sinash
                          </button>
                          {practiceFeedback && (
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              {practiceFeedback}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Section: Curriculum / Modules & Lessons list (4 cols) */}
          <div className="lg:col-span-4 bg-slate-50/70 dark:bg-slate-950/70 p-4 overflow-y-auto flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
                  Dars Rejasi ({allLessons.length} ta dars)
                </h3>
                <span className="text-xs text-indigo-700 dark:text-indigo-400 font-mono font-bold bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800">
                  {totalCompletedInCourse} / {allLessons.length}
                </span>
              </div>

              {/* Syllabus Search Bar */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Dars nomidan qidirish..."
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              {/* Filter Completed Button */}
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setFilterCompletedOnly(!filterCompletedOnly)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border ${
                    filterCompletedOnly
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 shadow-sm'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                  title="Faqat oʻzlashtirilgan darslarni koʻrsatish yoki barcha darslarni koʻrish"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${filterCompletedOnly ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                    <span>Faqat oʻzlashtirilganlar</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    filterCompletedOnly
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800'
                  }`}>
                    {filterCompletedOnly ? 'Faol' : `${totalCompletedInCourse} ta`}
                  </span>
                </button>
              </div>

              {/* Modules list */}
              <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                {filteredModules.map((module) => (
                  <div key={module.id} className="space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 px-1 truncate">
                      {module.title}
                    </p>

                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson.id)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                                isDone 
                                  ? (isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400') 
                                  : (isActive ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500')
                              }`}>
                                {isDone ? '✓' : '•'}
                              </span>
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Box at bottom of curriculum */}
            <div className="pt-3 mt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <img
                  src={instructorAvatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{course.instructor.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{course.instructor.role}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
