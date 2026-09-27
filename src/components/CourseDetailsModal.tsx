import React from 'react';
import { X, CheckCircle2, Clock, Star, ArrowRight, Bookmark, Play } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isEnrolled: boolean;
  isBookmarked: boolean;
  onEnroll: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onToggleBookmark: (courseId: string) => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  isOpen,
  onClose,
  isEnrolled,
  isBookmarked,
  onEnroll,
  onStartLesson,
  onToggleBookmark,
}) => {
  if (!isOpen || !course) return null;

  const posterImage = course.image || course.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
  const instructorAvatar = course.instructor.avatar || course.instructor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const fullDesc = course.fullDescription || course.description || course.shortDescription;
  const courseDuration = course.duration || (course.durationHours ? `${course.durationHours} soat` : '36 soat');
  const coursePrice = course.price || 'Bepul kirish';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        
        {/* Modal Top Header with Thumbnail Banner */}
        <div className="relative aspect-[21/9] w-full bg-slate-900 overflow-hidden">
          <img
            src={posterImage}
            alt={course.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <span>{course.category.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{course.level}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {courseDuration}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Metrics and Rating Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-sm font-mono">{course.rating.toFixed(1)}</span>
              <span className="text-slate-500 dark:text-slate-400">({course.reviewsCount} ta sharh)</span>
            </div>

            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
              <span>Oʻquvchilar: <strong className="text-slate-900 dark:text-white font-mono">{course.studentsCount}+</strong></span>
              <span aria-hidden="true">·</span>
              <span>Darslar soni: <strong className="text-slate-900 dark:text-white font-mono">{course.lessonsCount} ta</strong></span>
            </div>

            <div className="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              {coursePrice}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kurs haqida umumiy maʼlumot</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {fullDesc}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kursning asosiy afzalliklari</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {course.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Bio */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={instructorAvatar}
                alt={course.instructor.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700"
              />
              <div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Bosh instruktor:</p>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{course.instructor.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{course.instructor.role}</p>
              </div>
            </div>

            <div className="text-right text-xs hidden sm:block">
              <p className="font-semibold text-slate-800 dark:text-slate-200">{course.instructor.experience || 'Akademiya ustozi'}</p>
              <p className="text-slate-500 dark:text-slate-400">Reyting: ★ {course.instructor.rating || 4.9}</p>
            </div>
          </div>

          {/* Syllabus Modules Outline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Oʻquv dasturi (Syllabus — {course.lessonsCount} ta darslik)
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {course.modules.length} ta modul
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((m, idx) => (
                <div key={m.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-xs">
                  <p className="text-xs font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{m.title}</span>
                  </p>
                  <div className="space-y-1.5">
                    {m.lessons.map((l) => (
                      <div 
                        key={l.id} 
                        onClick={() => {
                          onClose();
                          onStartLesson(course);
                        }}
                        className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 p-2 rounded-lg hover:bg-indigo-50/70 dark:hover:bg-slate-700/60 border border-transparent hover:border-indigo-100 dark:hover:border-slate-700 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <Play className="w-3 h-3 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                          <span className="font-medium group-hover:text-indigo-900 dark:group-hover:text-indigo-300">{l.title}</span>
                        </div>
                        <span className="font-mono text-slate-400 dark:text-slate-500 text-[11px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{l.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleBookmark(course.id)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isBookmarked
                ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
            <span>{isBookmarked ? 'Saqlangan' : 'Saqlash'}</span>
          </button>

          <div className="flex items-center gap-2">
            {!isEnrolled && (
              <button
                onClick={() => onEnroll(course)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-transparent dark:border-slate-700"
              >
                Kursga aʼzo boʻlish
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onStartLesson(course);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>{isEnrolled ? 'Darsni Davom Ettirish' : 'Darsni Boshlash (25 ta dars)'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
