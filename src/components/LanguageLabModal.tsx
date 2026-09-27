import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Volume2, Globe2, Sparkles, Check, 
  RotateCw, ArrowLeft, ArrowRight, Play, CheckCircle2,
  Search, Headphones, Award, RefreshCw, Volume1, Trophy,
  RotateCcw, Zap, BookOpen, Layers
} from 'lucide-react';
import { LanguageType } from '../types';
import { 
  LANGUAGES_INFO, 
  VOCABULARY_LIST, 
  LANGUAGE_PHRASES, 
  AUDIO_LISTENING_CHALLENGES 
} from '../data/languagesLabData';
import { playFemaleSpeech, stopAllSpeech } from '../utils/femaleVoiceService';

interface LanguageLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLanguage?: LanguageType;
  masteredVocabIds?: string[];
  onToggleMasteredVocab?: (vocabId: string) => void;
  onResetMasteredVocab?: (langVocabIds: string[]) => void;
}

type TrainingQueueMode = 'unlearned' | 'all' | 'mastered';
type VocabLevel = 'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export const LanguageLabModal: React.FC<LanguageLabModalProps> = ({
  isOpen,
  onClose,
  initialLanguage = 'english',
  masteredVocabIds = [],
  onToggleMasteredVocab,
  onResetMasteredVocab,
}) => {
  const [activeLang, setActiveLang] = useState<LanguageType>(initialLanguage);
  const [activeTab, setActiveTab] = useState<'flashcards' | 'phrases' | 'quiz'>('flashcards');

  // Internal mastered fallback for local preview
  const [localMasteredIds, setLocalMasteredIds] = useState<string[]>([]);

  // Effective mastered IDs combined
  const effectiveMasteredIds = useMemo(() => {
    return Array.from(new Set([...masteredVocabIds, ...localMasteredIds]));
  }, [masteredVocabIds, localMasteredIds]);

  // Audio Speech synthesis settings
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);
  const [autoSpeakNext, setAutoSpeakNext] = useState<boolean>(true);

  // Flashcards state
  const rawLangVocab = useMemo(() => VOCABULARY_LIST.filter(v => v.language === activeLang), [activeLang]);
  const [selectedLevel, setSelectedLevel] = useState<VocabLevel>('all');
  const [trainingMode, setTrainingMode] = useState<TrainingQueueMode>('unlearned');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Phrases state
  const [phraseCategory, setPhraseCategory] = useState<string>('all');
  const [phraseSearch, setPhraseSearch] = useState<string>('');

  // Audio Listening Quiz state
  const langChallenges = useMemo(() => AUDIO_LISTENING_CHALLENGES.filter(c => c.language === activeLang), [activeLang]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Synchronize initial language if changed externally
  useEffect(() => {
    if (initialLanguage) {
      setActiveLang(initialLanguage);
    }
  }, [initialLanguage]);

  // Reset card index when language or level changes
  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [activeLang, selectedLevel, trainingMode]);

  const currentInfo = LANGUAGES_INFO[activeLang];

  // Vocab items partitioned by level
  const levelVocab = useMemo(() => {
    if (selectedLevel === 'all') return rawLangVocab;
    return rawLangVocab.filter(v => v.level === selectedLevel);
  }, [rawLangVocab, selectedLevel]);

  // Mastered in current level
  const masteredInLevel = useMemo(() => {
    return levelVocab.filter(v => effectiveMasteredIds.includes(v.id));
  }, [levelVocab, effectiveMasteredIds]);

  // Unmastered / Unlearned in current level (The queue that does NOT repeat!)
  const unlearnedInLevel = useMemo(() => {
    return levelVocab.filter(v => !effectiveMasteredIds.includes(v.id));
  }, [levelVocab, effectiveMasteredIds]);

  // Mastered in whole language
  const masteredInLang = useMemo(() => {
    return rawLangVocab.filter(v => effectiveMasteredIds.includes(v.id));
  }, [rawLangVocab, effectiveMasteredIds]);

  // Active training queue based on trainingMode
  const activeDeck = useMemo(() => {
    if (trainingMode === 'unlearned') {
      return unlearnedInLevel;
    } else if (trainingMode === 'mastered') {
      return masteredInLevel;
    }
    return levelVocab;
  }, [trainingMode, unlearnedInLevel, masteredInLevel, levelVocab]);

  // Ensure card index is within bounds
  const safeCardIndex = activeDeck.length > 0 ? Math.min(cardIndex, activeDeck.length - 1) : 0;
  const currentCard = activeDeck[safeCardIndex];

  // Level statistics for badges
  const levelStats = useMemo(() => {
    const levels: VocabLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
    return levels.map(lvl => {
      const allInLvl = rawLangVocab.filter(v => v.level === lvl);
      const masteredInLvl = allInLvl.filter(v => effectiveMasteredIds.includes(v.id));
      return {
        level: lvl,
        total: allInLvl.length,
        mastered: masteredInLvl.length,
        percent: allInLvl.length > 0 ? Math.round((masteredInLvl.length / allInLvl.length) * 100) : 0
      };
    });
  }, [rawLangVocab, effectiveMasteredIds]);

  // Filtered Phrases
  const rawPhrases = useMemo(() => LANGUAGE_PHRASES.filter(p => p.language === activeLang), [activeLang]);
  const filteredPhrases = useMemo(() => {
    return rawPhrases.filter(p => {
      const matchesCat = phraseCategory === 'all' || p.category === phraseCategory;
      const matchesSearch = phraseSearch === '' || 
        p.nativePhrase.toLowerCase().includes(phraseSearch.toLowerCase()) ||
        p.translation.toLowerCase().includes(phraseSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [rawPhrases, phraseCategory, phraseSearch]);

  // Current Listening Question
  const currentChallenge = langChallenges[quizIndex] || langChallenges[0];

  const speakText = (text: string, id: string, customRate?: number) => {
    playFemaleSpeech({
      text,
      lang: activeLang,
      rate: customRate || speechSpeed,
      pitch: 1.1, // Sweet and clear female pitch (qiz bola ovozi)
      onStart: () => setSpeakingWordId(id),
      onEnd: () => setSpeakingWordId(null),
      onError: () => setSpeakingWordId(null)
    });
  };

  const handleNextCard = () => {
    if (activeDeck.length === 0) return;
    setIsFlipped(false);
    const nextIdx = (safeCardIndex + 1) % activeDeck.length;
    setCardIndex(nextIdx);

    if (autoSpeakNext && activeDeck[nextIdx]) {
      setTimeout(() => {
        speakText(activeDeck[nextIdx].word, activeDeck[nextIdx].id);
      }, 200);
    }
  };

  const handlePrevCard = () => {
    if (activeDeck.length === 0) return;
    setIsFlipped(false);
    const prevIdx = (safeCardIndex - 1 + activeDeck.length) % activeDeck.length;
    setCardIndex(prevIdx);

    if (autoSpeakNext && activeDeck[prevIdx]) {
      setTimeout(() => {
        speakText(activeDeck[prevIdx].word, activeDeck[prevIdx].id);
      }, 200);
    }
  };

  // Toggle or add to mastered
  const toggleMastered = (id: string) => {
    if (onToggleMasteredVocab) {
      onToggleMasteredVocab(id);
    }
    setLocalMasteredIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Core requirement: Once learned/finished, it is marked as mastered and NOT repeated in active training queue!
  const handleMarkMasteredAndAdvance = (wordId: string) => {
    toggleMastered(wordId);
    setIsFlipped(false);

    // If we are in 'unlearned' training mode, this word will immediately disappear from activeDeck.
    // The next word will slide into safeCardIndex.
    if (trainingMode === 'unlearned') {
      const nextRemaining = activeDeck.filter(w => w.id !== wordId);
      if (nextRemaining.length > 0) {
        const nextIdx = safeCardIndex >= nextRemaining.length ? 0 : safeCardIndex;
        setCardIndex(nextIdx);
        if (autoSpeakNext && nextRemaining[nextIdx]) {
          setTimeout(() => {
            speakText(nextRemaining[nextIdx].word, nextRemaining[nextIdx].id);
          }, 250);
        }
      }
    } else {
      handleNextCard();
    }
  };

  const handleResetCurrentLevelMastered = () => {
    const idsToReset = masteredInLevel.map(v => v.id);
    if (onResetMasteredVocab) {
      onResetMasteredVocab(idsToReset);
    }
    setLocalMasteredIds(prev => prev.filter(id => !idsToReset.includes(id)));
    setCardIndex(0);
    setIsFlipped(false);
  };

  const handleAdvanceToNextLevel = () => {
    const order: VocabLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const currentIdx = order.indexOf(selectedLevel);
    if (currentIdx >= 0 && currentIdx < order.length - 1) {
      setSelectedLevel(order[currentIdx + 1]);
    } else {
      setSelectedLevel('all');
    }
    setCardIndex(0);
    setIsFlipped(false);
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(optionIndex);
    setIsAnswerSubmitted(true);
    if (optionIndex === currentChallenge.correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    if (quizIndex + 1 < langChallenges.length) {
      setQuizIndex(prev => prev + 1);
      const nextPrompt = langChallenges[quizIndex + 1]?.audioPrompt;
      if (nextPrompt) {
        setTimeout(() => speakText(nextPrompt, `quiz-${quizIndex + 1}`), 250);
      }
    } else {
      setQuizIndex(0);
    }
  };

  if (!isOpen) return null;

  const currentLevelPercent = levelVocab.length > 0 
    ? Math.round((masteredInLevel.length / levelVocab.length) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[94vh] transition-colors">
        
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  Interaktiv Audio Trenajor & Til Laboratoriyasi
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <Sparkles className="w-3 h-3" />
                  4,000 ta soʻz (A1 - C1)
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-500/20">
                  🌸 Qiz bola ovozi (Tabiiy talaffuz)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Har bir tilda 1,000 tadan soʻz. Oʻrgangandan keyin soʻz qaytarilmaydi!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopAllSpeech();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        {speechWarning && (
          <div className="bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
            <span>{speechWarning}</span>
            <button onClick={() => setSpeechWarning(null)} className="text-amber-900 dark:text-amber-100 font-bold ml-2">✕</button>
          </div>
        )}

        {/* Language Tabs (English, Russian, French, German) */}
        <div className="grid grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950">
          {(['english', 'russian', 'french', 'german'] as LanguageType[]).map((langKey) => {
            const info = LANGUAGES_INFO[langKey];
            const isActive = activeLang === langKey;
            const langMasteredCount = rawLangVocab.filter(v => v.language === langKey && effectiveMasteredIds.includes(v.id)).length;

            return (
              <button
                key={langKey}
                onClick={() => {
                  stopAllSpeech();
                  setActiveLang(langKey);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="text-base sm:text-lg">{info.flag}</span>
                <span className="hidden sm:inline font-bold">{info.title}</span>
                <span className="truncate sm:hidden">{info.title.split(' ')[0]}</span>
                <span className="hidden md:inline-flex text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  1,000
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-mode selector (Flashcards, Phrases, Quiz) + Speech Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-5 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'flashcards' 
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Audio Trenajor ({rawLangVocab.length} soʻz)</span>
            </button>
            <button
              onClick={() => setActiveTab('phrases')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'phrases' 
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Muloqot Iboralari ({rawPhrases.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                if (currentChallenge?.audioPrompt) {
                  speakText(currentChallenge.audioPrompt, `quiz-${quizIndex}`);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quiz' 
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Audio Tinglash Sinovi</span>
            </button>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 self-end sm:self-auto">
            {/* Auto-pronounce toggle */}
            <button
              onClick={() => setAutoSpeakNext(!autoSpeakNext)}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border flex items-center gap-1 transition-colors cursor-pointer ${
                autoSpeakNext 
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
              title="Karta oʻzgarganda soʻzni avtomatik ovozda oʻqish"
            >
              <Volume2 className="w-3 h-3" />
              <span>Avto-talaffuz: {autoSpeakNext ? 'ON' : 'OFF'}</span>
            </button>

            {/* Playback speed */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              {[
                { label: '0.7x', val: 0.7, title: 'Sekin talaffuz' },
                { label: '0.85x', val: 0.85, title: 'Qulay tezlik' },
                { label: '1.0x', val: 1.0, title: 'Tabiiy tezlik' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setSpeechSpeed(s.val)}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded cursor-pointer transition-colors ${
                    speechSpeed === s.val
                      ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={s.title}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab 1: Interactive Audio Flashcard Trainer (Non-Repetition Engine) */}
        {activeTab === 'flashcards' && (
          <div className="p-3 sm:p-5 flex-1 flex flex-col items-center justify-between overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40">
            
            {/* Top Bar: Level Distribution & Progress */}
            <div className="w-full max-w-xl space-y-2.5 mb-3">
              
              {/* Level Selector Pills with 200 words each distribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1 whitespace-nowrap">
                    <Layers className="w-3.5 h-3.5" />
                    Daraja:
                  </span>
                  
                  <button
                    onClick={() => {
                      setSelectedLevel('all');
                      setCardIndex(0);
                      setIsFlipped(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                      selectedLevel === 'all'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Barchasi (1,000)
                  </button>

                  {levelStats.map((st) => (
                    <button
                      key={st.level}
                      onClick={() => {
                        setSelectedLevel(st.level);
                        setCardIndex(0);
                        setIsFlipped(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1 ${
                        selectedLevel === st.level
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{st.level}</span>
                      <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        selectedLevel === st.level 
                          ? 'bg-indigo-700 text-indigo-100' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}>
                        {st.mastered}/{st.total}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Random word jump button */}
                {activeDeck.length > 1 && (
                  <button
                    onClick={() => {
                      const randomIdx = Math.floor(Math.random() * activeDeck.length);
                      setCardIndex(randomIdx);
                      setIsFlipped(false);
                      if (autoSpeakNext && activeDeck[randomIdx]) {
                        speakText(activeDeck[randomIdx].word, activeDeck[randomIdx].id);
                      }
                    }}
                    className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs self-end sm:self-auto whitespace-nowrap"
                    title="Navbatdagi tasodifiy soʻz"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Tasodifiy</span>
                  </button>
                )}
              </div>

              {/* Training Mode Switcher (Non-repetition engine) */}
              <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => {
                      setTrainingMode('unlearned');
                      setCardIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                      trainingMode === 'unlearned'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title="Faqat oʻrganilmagan soʻzlar koʻrsatiladi. Oʻrgangach qaytarilmaydi!"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Trenajor (Qaytarilmasin)</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-mono">
                      {unlearnedInLevel.length} ta
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setTrainingMode('mastered');
                      setCardIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                      trainingMode === 'mastered'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Oʻrganilganlar</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                      {masteredInLevel.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setTrainingMode('all');
                      setCardIndex(0);
                    }}
                    className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                      trainingMode === 'all'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Barchasi ({levelVocab.length})</span>
                  </button>
                </div>

                {/* Level mastery progress */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-20 sm:w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${currentLevelPercent}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                    {currentLevelPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Flashcard Body */}
            {currentCard ? (
              <div className="w-full max-w-xl flex flex-col items-center">
                
                {/* Counter & Status Banner */}
                <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">
                      {safeCardIndex + 1} / {activeDeck.length}
                    </span>
                    {trainingMode === 'unlearned' && (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                        • Qolgan soʻzlar
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" />
                      +{masteredInLang.length * 10} XP jamgʻarildi
                    </span>
                  </div>
                </div>

                {/* Main Interactive Card */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full min-h-[300px] sm:min-h-[320px] bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200/90 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-lg p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative select-none group"
                >
                  {/* Top card bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800">
                        {currentCard.level} daraja
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span>{currentInfo.flag}</span>
                        <span>{currentInfo.title}</span>
                      </span>
                    </div>

                    {/* Audio action controls */}
                    <div className="flex items-center gap-2">
                      {/* Slow Speech Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(currentCard.word, `${currentCard.id}-slow`, 0.65);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Sekin va tushunarli talaffuz (0.65x)"
                      >
                        <Volume1 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                        <span>Sekin</span>
                      </button>

                      {/* Main Audio Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(currentCard.word, currentCard.id);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                          speakingWordId === currentCard.id
                            ? 'bg-indigo-600 text-white animate-pulse'
                            : 'bg-indigo-50 dark:bg-indigo-950/90 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200/70 dark:border-indigo-800'
                        }`}
                        title="Talaffuzni eshitish"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Center of the card: Word & Details */}
                  <div className="text-center py-4 sm:py-6">
                    {!isFlipped ? (
                      <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                          {currentCard.word}
                        </h3>
                        {currentCard.transcription && (
                          <p className="text-sm sm:text-base font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 inline-block px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                            {currentCard.transcription}
                          </p>
                        )}
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-6 font-medium flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100">
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Oʻzbekcha tarjimasi va misol gapni koʻrish uchun bosing</span>
                        </p>
                      </div>
                    ) : (
                      <div className="animate-in fade-in zoom-in-95 duration-150 text-left">
                        <div className="text-center mb-4">
                          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Oʻzbekcha tarjimasi:</p>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 dark:text-indigo-200">
                            {currentCard.translation}
                          </h3>
                        </div>

                        {/* Practical example sentence */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                              Amaliy misol gap:
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakText(currentCard.exampleSentence, `${currentCard.id}-ex`);
                              }}
                              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-semibold"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Gapni tinglash</span>
                            </button>
                          </div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic mb-1">
                            "{currentCard.exampleSentence}"
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {currentCard.exampleTranslation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom status */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(currentCard.exampleSentence, `${currentCard.id}-ex`);
                      }}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Misol gapni oʻqish</span>
                    </button>

                    <span className="text-[11px] text-slate-400">
                      Karta ustiga bosib aylantiring
                    </span>
                  </div>
                </div>

                {/* Primary Card Controls & NON-REPETITION Mastery Button */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                  
                  {/* Left: Previous card */}
                  <button
                    onClick={handlePrevCard}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer transition-colors"
                    title="Oldingi soʻz (←)"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Center: CORE NON-REPETITION BUTTON */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="flex-1 sm:flex-initial px-4 py-3 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer transition-colors"
                    >
                      {isFlipped ? 'Soʻzga qaytish' : 'Tarjimani koʻrish'}
                    </button>

                    <button
                      onClick={() => handleMarkMasteredAndAdvance(currentCard.id)}
                      className={`flex-1 sm:flex-initial px-5 py-3 text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 ${
                        effectiveMasteredIds.includes(currentCard.id)
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-500/20'
                      }`}
                      title="Soʻzni oʻrgangandek belgilash. Ushbu soʻz qaytarilmaydi!"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {effectiveMasteredIds.includes(currentCard.id) 
                          ? 'Yodlangan (Keyingisi →)' 
                          : 'Oʻrgandim (Qaytarilmasin) →'}
                      </span>
                    </button>
                  </div>

                  {/* Right: Next card */}
                  <button
                    onClick={handleNextCard}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm cursor-pointer transition-colors"
                    title="Keyingi soʻz (→)"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ) : (
              /* All words mastered / completed state (Celebration!) */
              <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 p-8 text-center shadow-xl animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4 shadow-sm">
                  <Trophy className="w-9 h-9" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {trainingMode === 'unlearned' 
                    ? '🎉 Tabriklaymiz! Barcha soʻzlar oʻrganildi!' 
                    : 'Ushbu boʻlimda soʻz mavjud emas'}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                  {trainingMode === 'unlearned' ? (
                    <>
                      Siz <strong className="text-emerald-600 dark:text-emerald-400">{currentInfo.title}</strong> tilidagi 
                      {selectedLevel === 'all' 
                        ? ' barcha 1,000 ta soʻzni' 
                        : ` ${selectedLevel} darajasidagi barcha ${levelVocab.length} ta soʻzni`} toʻliq oʻrganib chiqdingiz. 
                      Birorta ham soʻz qaytarilmasdan muvaffaqiyatli yakunlandi!
                    </>
                  ) : (
                    'Siz tanlagan filtr boʻyicha soʻzlar roʻyxati boʻsh.'
                  )}
                </p>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-6 flex items-center justify-center gap-4 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Jami oʻzlashtirildi: {masteredInLevel.length} / {levelVocab.length} ta</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>+{masteredInLevel.length * 10} XP ball</span>
                  </div>
                </div>

                {/* Actions after completion */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {selectedLevel !== 'C1' && selectedLevel !== 'all' && (
                    <button
                      onClick={handleAdvanceToNextLevel}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Keyingi darajaga oʻtish</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setTrainingMode('mastered');
                      setCardIndex(0);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs cursor-pointer transition-colors"
                  >
                    Oʻzlashtirilganlarni koʻrish
                  </button>

                  <button
                    onClick={handleResetCurrentLevelMastered}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 font-semibold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                    title="Ushbu darajadagi oʻrganilgan soʻzlarni qayta mashq qilish uchun tozalash"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Qayta boshlash</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Situational Phrases & Dialogues */}
        {activeTab === 'phrases' && (
          <div className="p-3 sm:p-5 flex-1 overflow-y-auto space-y-3 bg-slate-50/40 dark:bg-slate-950/40">
            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phraseSearch}
                    onChange={(e) => setPhraseSearch(e.target.value)}
                    placeholder="Ibora yoki oʻzbekcha tarjimasini qidiring..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                {phraseSearch && (
                  <button
                    onClick={() => setPhraseSearch('')}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    Tozalash
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1">
                {['all', 'Muloqot', 'Sayohat', 'Restoran & Xarid', 'Taʼlim', 'Ish & Biznes', 'Kundalik'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPhraseCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                      phraseCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat === 'all' ? 'Barcha iboralar' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Phrases List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPhrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                        {phrase.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(phrase.nativePhrase, `${phrase.id}-slow`, 0.65)}
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-[10px] cursor-pointer"
                          title="Sekin eshitish"
                        >
                          <Volume1 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => speakText(phrase.nativePhrase, phrase.id)}
                          className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 cursor-pointer"
                          title="Tinglash"
                        >
                          <Volume2 className={`w-4 h-4 ${speakingWordId === phrase.id ? 'animate-bounce text-indigo-600' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                      {phrase.nativePhrase}
                    </h4>
                    {phrase.transcription && (
                      <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-2">
                        {phrase.transcription}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {phrase.translation}
                  </div>
                </div>
              ))}
            </div>

            {filteredPhrases.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm">Ushbu soʻrov boʻyicha iboralar topilmadi.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Audio Listening Comprehension Quiz */}
        {activeTab === 'quiz' && (
          <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-between overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40">
            {currentChallenge ? (
              <div className="w-full max-w-lg flex flex-col items-center">
                
                {/* Header score and question index */}
                <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span>Savol: <strong className="text-slate-900 dark:text-white font-mono">{quizIndex + 1} / {langChallenges.length}</strong></span>
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                    <Award className="w-4 h-4" />
                    Toʻgʻri javoblar: {quizScore}
                  </span>
                </div>

                {/* Audio Listening Card */}
                <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-6 mb-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 mx-auto flex items-center justify-center mb-3">
                    <Headphones className="w-8 h-8" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Audio iborani tinglang va toʻgʻri maʼnoni toping
                  </h3>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                      onClick={() => speakText(currentChallenge.audioPrompt, `quiz-${quizIndex}`)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Ovozni tinglash</span>
                    </button>

                    <button
                      onClick={() => speakText(currentChallenge.audioPrompt, `quiz-${quizIndex}-slow`, 0.65)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Volume1 className="w-4 h-4" />
                      <span>Sekinroq</span>
                    </button>
                  </div>
                </div>

                {/* Question text */}
                <div className="w-full text-left mb-3">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {currentChallenge.question}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="w-full space-y-2 mb-4">
                  {currentChallenge.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswer === oIdx;
                    const isCorrect = oIdx === currentChallenge.correctIndex;
                    let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold';
                      } else if (isSelected) {
                        style = 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-800 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleAnswerSubmit(oIdx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answer */}
                {isAnswerSubmitted && (
                  <div className="w-full p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 mb-4 animate-in fade-in">
                    <p className="font-semibold mb-0.5">Izoh:</p>
                    <p>{currentChallenge.explanation}</p>
                  </div>
                )}

                {/* Next button */}
                {isAnswerSubmitted && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Keyingi savol</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

              </div>
            ) : (
              <p className="text-slate-500 text-sm">Savollar topilmadi.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
