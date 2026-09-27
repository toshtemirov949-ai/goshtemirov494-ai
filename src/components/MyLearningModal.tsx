import React, { useState } from 'react';
import { X, Flame, BookOpen, Award, Bookmark, ArrowRight, Clock, CheckCircle2, Trophy } from 'lucide-react';
import { Course, UserProgress, CertificateItem } from '../types';
import { computeUserPoints } from '../data/leaderboardData';

interface MyLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  courses: Course[];
  onOpenClassroom: (course: Course) => void;
  onViewCertificate: (cert: CertificateItem) => void;
  onOpenQuizCenter: () => void;
}

export const MyLearningModal: React.FC<MyLearningModalProps> = ({
  isOpen,
  onClose,
  progress,
  courses,
  onOpenClassroom,
  onViewCertificate,
  onOpenQuizCenter,
}) => {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'certificates' | 'saved'>('enrolled');

  if (!isOpen) return null;

  const enrolledCourses = courses.filter(c => progress.enrolledCourseIds.includes(c.id));
  const bookmarkedCourses = courses.filter(c => progress.bookmarkedCourseIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Mening Shaxsiy Taʼlim Kabinetim
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Oʻzlashtirilgan fanlar, dars jadvallari va rasmiy yutuqlar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Stats Overview Row */}
        {(() => {
          const userPoints = computeUserPoints(progress);
          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center py-3 sm:py-4 text-xs">
              <div className="px-4 py-2 sm:py-0">
                <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold mb-1">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
                  <span className="text-lg font-mono tabular-nums text-slate-900 dark:text-white">{progress.streakDays}</span>
                  <span>kun</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Uzluksiz faollik</p>
              </div>

              <div className="px-4 py-2 sm:py-0">
                <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-lg font-mono tabular-nums text-slate-900 dark:text-white">{enrolledCourses.length}</span>
                  <span>ta</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Yozilingan kurslar</p>
              </div>

              <div className="px-4 py-2 sm:py-0">
                <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-lg font-mono tabular-nums text-slate-900 dark:text-white">{progress.certificates.length}</span>
                  <span>ta</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Olingan sertifikatlar</p>
              </div>

              <div className="px-4 py-2 sm:py-0">
                <div className="flex items-center justify-center gap-1.5 text-amber-500 font-bold mb-1">
                  <Trophy className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <span className="text-lg font-mono tabular-nums text-slate-900 dark:text-white">{userPoints.totalPoints}</span>
                  <span>XP</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Reyting ballari</p>
              </div>
            </div>
          );
        })()}

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'enrolled'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Faol Kurslarim ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sertifikatlarim ({progress.certificates.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Saqlanganlar ({bookmarkedCourses.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-slate-50/40 dark:bg-slate-950/40">
          
          {/* TAB 1: Enrolled Courses */}
          {activeTab === 'enrolled' && (
            <div className="space-y-3">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => {
                  const allLessons = course.modules.flatMap(m => m.lessons);
                  const completedCount = allLessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
                  const percent = Math.round((completedCount / (allLessons.length || 1)) * 100);

                  return (
                    <div
                      key={course.id}
                      className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={course.image || course.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'}
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
                            {course.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                            <span>{completedCount}/{allLessons.length} dars</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono">{percent}% oʻzlashtirildi</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden hidden md:block">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onOpenClassroom(course);
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <span>Darsga kirish</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Hozircha hech qaysi kursga aʼzo boʻlmadingiz.</p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Kurslarni koʻrish
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Certificates */}
          {activeTab === 'certificates' && (
            <div className="space-y-3">
              {progress.certificates.length > 0 ? (
                progress.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cert.courseTitle}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>Sana: {cert.issueDate}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cert.grade}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onViewCertificate(cert)}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg cursor-pointer transition-colors border border-transparent dark:border-slate-700"
                    >
                      Sertifikatni Koʻrish
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Sizda hali sertifikatlar mavjud emas.</p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuizCenter();
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Diagnostik test topshirish
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Saved Courses */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {bookmarkedCourses.length > 0 ? (
                bookmarkedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.level} · {c.duration} · {c.instructor.name}</p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenClassroom(c);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                    >
                      Boshlash
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-500 dark:text-slate-400 py-8">Saqlangan kurslar roʻyxati boʻsh.</p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
