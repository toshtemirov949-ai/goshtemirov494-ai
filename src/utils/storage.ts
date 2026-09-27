import { UserProgress, CertificateItem, UserProfile } from '../types';

const STORAGE_KEY = 'ziyotalim_user_progress_v1';
const USER_STORAGE_KEY = 'ziyotalim_user_profile_v1';

export const defaultUser: UserProfile = {
  id: 'usr-default-1',
  fullName: 'Oybekjon Adashev',
  authMethod: 'email',
  email: 'adashevoybekjon@gmail.com',
  phone: '+998 90 123 45 67',
  isVerified: true,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  joinedDate: '2026-09-01',
  bio: 'Zamonaviy dasturlash va xorijiy tillarni faol oʻrganuvchi talaba, respublika yetakchisi',
  city: 'Toshkent shahri',
  institution: 'Oʻzbekiston Milliy Universiteti / Ziyo IT Akademiya',
  targetGoal: 'IELTS 8.5+ va Senior Software Engineer',
  dailyGoalMinutes: 45,
  telegram: '@oybekjon_dev'
};

const defaultProgress: UserProgress = {
  enrolledCourseIds: ['lang-en-ielts', 'it-react-frontend'],
  completedLessonIds: ['l1', 'l501'],
  bookmarkedCourseIds: ['lang-de-goethe', 'exact-math-higher'],
  certificates: [
    {
      id: 'cert-sample-1',
      courseTitle: 'IELTS Masterclass 7.5+ va Akademik Ingliz Tili',
      recipientName: 'Oybekjon Adashev',
      issueDate: '2026-09-15',
      grade: 'A+ (Aʼlo daraja)',
      verificationCode: 'ZT-IELTS-9821'
    }
  ],
  streakDays: 6,
  totalStudyMinutes: 240,
  quizScores: {
    'test-languages-ielts': 100,
    'test-it-coding': 80
  },
  masteredVocabIds: ['en-1', 'en-2', 'ru-1']
};

export function getStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      masteredVocabIds: Array.isArray(parsed.masteredVocabIds) ? parsed.masteredVocabIds : (defaultProgress.masteredVocabIds || [])
    };
  } catch (e) {
    console.error('Error reading stored progress', e);
    return defaultProgress;
  }
}

export function saveStoredProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress', e);
  }
}

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return defaultUser;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading stored user', e);
    return defaultUser;
  }
}

export function saveStoredUser(user: UserProfile | null): void {
  try {
    if (!user) {
      localStorage.removeItem(USER_STORAGE_KEY);
    } else {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Error saving user', e);
  }
}
