export type CourseCategory = 
  | 'all'
  | 'languages'
  | 'it'
  | 'exact_sciences'
  | 'natural_sciences'
  | 'humanities';

export type LanguageType = 'english' | 'russian' | 'french' | 'german';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz' | 'code' | 'speaking';
  contentSnippet?: string;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  role: string;
  avatar?: string;
  avatarUrl?: string;
  organization?: string;
  experience?: string;
  rating?: number;
  bio?: string;
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  subcategory?: string;
  language?: LanguageType;
  badgeLabel?: string;
  badge?: string;
  level: string;
  duration?: string;
  durationHours?: number;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  fullDescription?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  instructor: Instructor;
  highlights: string[];
  modules: CourseModule[];
  price?: string;
  isPopular?: boolean;
  featured?: boolean;
  sampleVideoUrl?: string;
}

export interface VocabularyItem {
  id: string;
  language: LanguageType;
  word: string;
  translation: string;
  transcription?: string;
  exampleSentence: string;
  exampleTranslation: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectTest {
  id: string;
  title: string;
  subject: string;
  category: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Oson' | 'Oʻrta' | 'Murakkab';
  questions: QuizQuestion[];
}

export interface UserProgress {
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedCourseIds: string[];
  certificates: CertificateItem[];
  streakDays: number;
  totalStudyMinutes: number;
  quizScores: Record<string, number>;
  masteredVocabIds?: string[];
}

export interface CertificateItem {
  id: string;
  courseTitle: string;
  recipientName: string;
  issueDate: string;
  grade: string;
  verificationCode: string;
}

export type LeaderboardTimeframe = 'weekly' | 'monthly' | 'all-time';

export interface StudentRankItem {
  id: string;
  name: string;
  avatar: string;
  completedLessons: number;
  points: number;
  streakDays: number;
  certificatesCount: number;
  badge: 'Grandmaster' | 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  specialty: string;
  category: 'all' | 'it' | 'languages' | 'exact_sciences';
  rank: number;
  trend: 'up' | 'down' | 'same';
  weeklyPoints: number;
  monthlyPoints: number;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  authMethod: 'email' | 'phone';
  email?: string;
  phone?: string;
  isVerified: boolean;
  avatar: string;
  joinedDate: string;
  bio?: string;
  city?: string;
  institution?: string;
  targetGoal?: string;
  dailyGoalMinutes?: number;
  telegram?: string;
}
