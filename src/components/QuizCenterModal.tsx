import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { SubjectTest, QuizQuestion } from '../types';
import { SUBJECT_TESTS } from '../data/quizCenterData';

interface QuizCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCertificate: (testTitle: string, grade: string) => void;
  initialTestId?: string;
}

export const QuizCenterModal: React.FC<QuizCenterModalProps> = ({
  isOpen,
  onClose,
  onSaveCertificate,
  initialTestId,
}) => {
  const [selectedTest, setSelectedTest] = useState<SubjectTest>(() => {
    if (initialTestId) {
      const found = SUBJECT_TESTS.find(t => t.id === initialTestId);
      if (found) return found;
    }
    return SUBJECT_TESTS[0];
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedTest.durationMinutes * 60);

  // Sync test when initialTestId changes
  useEffect(() => {
    if (isOpen && initialTestId) {
      const found = SUBJECT_TESTS.find(t => t.id === initialTestId);
      if (found) {
        setSelectedTest(found);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setIsFinished(false);
        setTimeLeft(found.durationMinutes * 60);
      }
    }
  }, [isOpen, initialTestId]);

  // Reset when test changes
  const handleSelectTest = (test: SubjectTest) => {
    setSelectedTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setTimeLeft(test.durationMinutes * 60);
  };

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isFinished]);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = selectedTest.questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    selectedTest.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / selectedTest.questions.length) * 100);
  };

  const score = calculateScore();
  const getGrade = () => {
    if (score >= 90) return 'A+ (Aʼlo daraja)';
    if (score >= 70) return 'A (Yaxshi daraja)';
    if (score >= 50) return 'B (Qoniqarli)';
    return 'C (Qayta topshirish tavsiya etiladi)';
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with adapted background image banner */}
        <div className="relative overflow-hidden p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-15 pointer-events-none"
            style={{ backgroundImage: `url('/src/assets/images/hero_education_modern_1790137043631.jpg')` }}
          />
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xs pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Fanlar & Tillar Boʻyicha Diagnostik Test Markazi
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Oʻz bilimingizni sinab koʻring va rasmiy sertifikatga ega boʻling
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="relative z-10 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Test Selector Tabs */}
        <div className="p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 flex items-center gap-2 overflow-x-auto">
          {SUBJECT_TESTS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTest(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTest.id === t.id
                  ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Test Progress & Timer Bar */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <span>Savol: <strong className="font-mono text-slate-900 dark:text-white">{currentQuestionIndex + 1} / {selectedTest.questions.length}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Javob berildi: <strong className="font-mono text-slate-900 dark:text-white">{answeredCount}</strong></span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400 dark:text-slate-500">Vaqt:</span>
            <span className={`px-2 py-0.5 rounded font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
              {formatTimer(timeLeft)}
            </span>
          </div>
        </div>

        {/* Test Stage Body */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/40">
          {!isFinished ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Question Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {selectedTest.subject} · {selectedTest.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Savol #{currentQuestionIndex + 1}
                  </span>
                </div>

                {/* Highlighted Question Box with adapted background image */}
                <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-indigo-400/30">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{ backgroundImage: `url('/src/assets/images/course_it_coding_1790137076730.jpg')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-indigo-950/88 to-blue-950/90 backdrop-blur-[1px]" />
                  <div className="relative z-10">
                    <h3 className="text-base sm:text-lg font-black text-white leading-relaxed drop-shadow-sm">
                      {currentQ.question}
                    </h3>
                  </div>
                </div>

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-semibold shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <span>{option}</span>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white font-bold' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                >
                  ← Oldingi savol
                </button>

                {currentQuestionIndex < selectedTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Keyingi savol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsFinished(true)}
                    className="px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Testni Yakunlash</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <Award className="w-8 h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Sinov Muvaffaqiyatli Yakunlandi!
                </h3>

                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                    {score}%
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    natija
                  </span>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Baholash: <strong className="text-emerald-700 dark:text-emerald-400">{getGrade()}</strong>
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onSaveCertificate(selectedTest.title, getGrade())}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Rasmiy Sertifikatni Koʻrish</span>
                  </button>

                  <button
                    onClick={() => handleSelectTest(selectedTest)}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors border border-transparent dark:border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Qayta topshirish</span>
                  </button>
                </div>
              </div>

              {/* Explanations Accordion */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Savollar va Toʻgʻri Javoblar Tahlili:
                </h4>
                {selectedTest.questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs ${
                        isCorrect 
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
                          : 'bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-bold text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </p>
                        <span className={`px-2 py-0.5 rounded font-mono font-bold shrink-0 ${
                          isCorrect ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60' : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/60'
                        }`}>
                          {isCorrect ? 'Toʻgʻri ✓' : 'Notoʻgʻri ✗'}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-1">
                        Toʻgʻri javob: <strong className="text-slate-900 dark:text-white">{q.options[q.correctIndex]}</strong>
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 italic">
                        Izoh: {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
