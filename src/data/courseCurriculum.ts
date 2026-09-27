import { CourseModule, Lesson } from '../types';

interface LessonDef {
  title: string;
  duration?: string;
  type?: Lesson['type'];
  snippet?: string;
}

interface ModuleDef {
  title: string;
  lessons: LessonDef[];
}

export function createCourseModules(coursePrefix: string, modules: ModuleDef[]): CourseModule[] {
  let counter = 1;
  return modules.map((m, mIdx) => ({
    id: `${coursePrefix}-m${mIdx + 1}`,
    title: m.title,
    lessons: m.lessons.map((l) => {
      const lessonNum = counter++;
      return {
        id: `${coursePrefix}-l${lessonNum}`,
        title: l.title,
        duration: l.duration || '30 daqiqa',
        type: l.type || (lessonNum % 5 === 0 ? 'quiz' : lessonNum % 2 === 0 ? 'interactive' : 'video'),
        contentSnippet: l.snippet || `${l.title} mavzusi boʻyicha amaliy mashgʻulotlar, nazariy qoidalar va test savollari.`
      };
    })
  }));
}
