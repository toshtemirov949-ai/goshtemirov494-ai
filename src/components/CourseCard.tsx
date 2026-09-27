import React from 'react';
import { Star, Clock, Bookmark, CheckCircle2, Play } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  isBookmarked: boolean;
  onSelect: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onToggleBookmark: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  isBookmarked,
  onSelect,
  onStartLesson,
  onToggleBookmark,
}) => {
  // Format category kicker label cleanly
  const getCategoryKicker = () => {
    if (course.category === 'languages') {
      const langNames: Record<string, string> = {
        english: 'Ingliz Tili',
        russian: 'Rus Tili',
        french: 'Fransuz Tili',
        german: 'Nemis Tili',
      };
      return course.language ? `Xorijiy Til / ${langNames[course.language] || 'Til'}` : 'Xorijiy Tillar';
    }
    if (course.category === 'it') return 'IT & Dasturlash Akademiyasi';
    if (course.category === 'exact_sciences') return 'Aniq Fanlar';
    if (course.category === 'natural_sciences') return 'Tabiiy Fanlar';
    return 'Ijtimoiy-Gumanitar Fanlar';
  };

  const cardImage = course.image || course.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
  const instructorAvatar = course.instructor.avatar || course.instructor.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const durationText = course.duration || (course.durationHours ? `${course.durationHours} soat` : '36 soat');

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col overflow-hidden relative">
      {/* Visual Thumbnail */}
      <div 
        onClick={() => onSelect(course)}
        className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
      >
        <img
          src={cardImage}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
        
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(course.id);
          }}
          aria-label="Kursni saqlash"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors shadow-sm cursor-pointer border border-transparent dark:border-slate-700"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400' : ''}`} />
        </button>

        {/* Category kicker on bottom left of image */}
        <div className="absolute bottom-2.5 left-3 text-xs text-white font-medium drop-shadow-sm flex items-center gap-1.5">
          <span>{getCategoryKicker()}</span>
        </div>

        {/* 25 Lessons Badge */}
        <div className="absolute top-3 left-3 bg-indigo-600/90 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-xs shadow-sm">
          {course.lessonsCount} ta dars
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>{course.level}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{durationText}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{course.lessonsCount} ta dars</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(course)}
            className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
          >
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {course.shortDescription}
          </p>
        </div>

        <div>
          {/* Instructor & Rating */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={instructorAvatar}
                alt={course.instructor.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              />
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{course.instructor.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{course.instructor.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 font-medium text-slate-700 dark:text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="tabular-nums font-semibold">{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Single-line Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartLesson(course)}
              className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              {isEnrolled ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Darsni Davom Ettirish</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Darsni Boshlash (25 ta dars)</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelect(course)}
              className="py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Dastur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
