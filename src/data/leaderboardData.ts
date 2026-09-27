import { StudentRankItem, LeaderboardTimeframe, UserProgress, UserProfile } from '../types';

export const INITIAL_TOP_STUDENTS: Omit<StudentRankItem, 'rank'>[] = [
  {
    id: 'stud-1',
    name: 'Oybekjon Adashev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    completedLessons: 198,
    points: 5240,
    weeklyPoints: 680,
    monthlyPoints: 2180,
    streakDays: 58,
    certificatesCount: 9,
    badge: 'Grandmaster',
    specialty: 'Full-Stack Web & Sunʼiy Intellekt Dasturlash',
    category: 'it',
    trend: 'same'
  },
  {
    id: 'stud-2',
    name: 'Toshtemirov Firdavs',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    completedLessons: 186,
    points: 4890,
    weeklyPoints: 570,
    monthlyPoints: 1840,
    streakDays: 48,
    certificatesCount: 7,
    badge: 'Grandmaster',
    specialty: 'Kiberxavfsizlik, Algoritmlar & Backend Dasturlash',
    category: 'it',
    trend: 'up'
  },
  {
    id: 'stud-3',
    name: 'Madina Ismoilova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    completedLessons: 172,
    points: 4350,
    weeklyPoints: 490,
    monthlyPoints: 1680,
    streakDays: 38,
    certificatesCount: 6,
    badge: 'Grandmaster',
    specialty: 'IELTS Masterclass & Nemis tili C1',
    category: 'languages',
    trend: 'up'
  },
  {
    id: 'stud-4',
    name: 'Javohirbek Aliyev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    completedLessons: 159,
    points: 4020,
    weeklyPoints: 410,
    monthlyPoints: 1450,
    streakDays: 31,
    certificatesCount: 5,
    badge: 'Master',
    specialty: 'Python AI & Maʼlumotlar Tahlili',
    category: 'it',
    trend: 'up'
  },
  {
    id: 'stud-5',
    name: 'Zilola Qosimova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    completedLessons: 146,
    points: 3740,
    weeklyPoints: 390,
    monthlyPoints: 1250,
    streakDays: 27,
    certificatesCount: 4,
    badge: 'Master',
    specialty: 'Fransuz tili DELF B2 & Rus tili',
    category: 'languages',
    trend: 'down'
  },
  {
    id: 'stud-6',
    name: 'Sardorbek Mahmudov',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    completedLessons: 138,
    points: 3520,
    weeklyPoints: 280,
    monthlyPoints: 1120,
    streakDays: 24,
    certificatesCount: 4,
    badge: 'Diamond',
    specialty: 'Oliy Matematika & Nazariy Fizika',
    category: 'exact_sciences',
    trend: 'up'
  },
  {
    id: 'stud-7',
    name: 'Shahnoza Karimova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    completedLessons: 124,
    points: 3190,
    weeklyPoints: 260,
    monthlyPoints: 980,
    streakDays: 19,
    certificatesCount: 3,
    badge: 'Diamond',
    specialty: 'Mobil Ilovalar (Flutter & Kotlin)',
    category: 'it',
    trend: 'same'
  },
  {
    id: 'stud-8',
    name: 'Bobur Mirzayev',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
    completedLessons: 110,
    points: 2850,
    weeklyPoints: 310,
    monthlyPoints: 890,
    streakDays: 16,
    certificatesCount: 3,
    badge: 'Gold',
    specialty: 'Kiberxavfsizlik & Tarmoqlar',
    category: 'it',
    trend: 'up'
  },
  {
    id: 'stud-9',
    name: 'Kamola Toʻrayeva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    completedLessons: 98,
    points: 2540,
    weeklyPoints: 220,
    monthlyPoints: 790,
    streakDays: 14,
    certificatesCount: 2,
    badge: 'Gold',
    specialty: 'Ingliz Tili Soʻzlashuv & Grammatika',
    category: 'languages',
    trend: 'down'
  },
  {
    id: 'stud-10',
    name: 'Ulugʻbek Saidov',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80',
    completedLessons: 86,
    points: 2240,
    weeklyPoints: 190,
    monthlyPoints: 710,
    streakDays: 12,
    certificatesCount: 2,
    badge: 'Silver',
    specialty: 'Matematik Mantiq & Kombinatorika',
    category: 'exact_sciences',
    trend: 'same'
  },
  {
    id: 'stud-11',
    name: 'Nodira Xolmatova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    completedLessons: 74,
    points: 1980,
    weeklyPoints: 170,
    monthlyPoints: 630,
    streakDays: 10,
    certificatesCount: 1,
    badge: 'Silver',
    specialty: 'Front-End Veb & JavaScript',
    category: 'it',
    trend: 'up'
  }
];

export function computeUserBadge(points: number): StudentRankItem['badge'] {
  if (points >= 4000) return 'Grandmaster';
  if (points >= 3000) return 'Master';
  if (points >= 2000) return 'Diamond';
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

export function computeUserPoints(progress: UserProgress): {
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
} {
  const lessonsCount = progress.completedLessonIds.length;
  const certsCount = progress.certificates.length;
  const streak = progress.streakDays || 1;
  const quizScoresSum = Object.values(progress.quizScores || {}).reduce((a, b) => a + b, 0);
  const vocabCount = (progress.masteredVocabIds || []).length;

  // Points calculation formula:
  // Base bonus: 150
  // Each lesson: 25 XP
  // Each mastered vocabulary word: 10 XP
  // Each certificate: 150 XP
  // Streak: streakDays * 12 XP
  // Quiz score points: 50% of quiz scores
  const total = 150 + (lessonsCount * 25) + (vocabCount * 10) + (certsCount * 150) + (streak * 12) + Math.round(quizScoresSum * 0.5);
  const weekly = Math.round(total * 0.15) + (lessonsCount * 15) + (vocabCount * 5);
  const monthly = Math.round(total * 0.45) + (lessonsCount * 20) + (vocabCount * 8);

  return {
    totalPoints: total,
    weeklyPoints: weekly,
    monthlyPoints: monthly,
  };
}

export function getLeaderboardData(
  timeframe: LeaderboardTimeframe,
  categoryFilter: 'all' | 'it' | 'languages' | 'exact_sciences',
  progress: UserProgress,
  currentUser: UserProfile | null
): {
  students: StudentRankItem[];
  currentUserRankItem: StudentRankItem;
} {
  const { totalPoints, weeklyPoints, monthlyPoints } = computeUserPoints(progress);

  const userName = currentUser?.fullName || 'Oybekjon Adashev';
  const userAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80';

  const isOybekjon = !currentUser || userName.toLowerCase().includes('oybekjon') || userName.toLowerCase().includes('adashev');

  type UnrankedStudent = Omit<StudentRankItem, 'rank'> & { isCurrentUser: boolean };

  let baseStudents: UnrankedStudent[] = INITIAL_TOP_STUDENTS.map(s => ({ ...s, isCurrentUser: false }));

  if (isOybekjon) {
    // Current user is Oybekjon Adashev - 1-o'rindagi mutloq peshqadam
    const baseOybek = baseStudents[0];
    const oybekObj: UnrankedStudent = {
      ...baseOybek,
      id: currentUser?.id || baseOybek.id,
      name: 'Oybekjon Adashev',
      avatar: userAvatar,
      points: baseOybek.points + totalPoints,
      weeklyPoints: baseOybek.weeklyPoints + weeklyPoints,
      monthlyPoints: baseOybek.monthlyPoints + monthlyPoints,
      completedLessons: baseOybek.completedLessons + progress.completedLessonIds.length,
      certificatesCount: baseOybek.certificatesCount + progress.certificates.length,
      streakDays: Math.max(baseOybek.streakDays, progress.streakDays || 0),
      isCurrentUser: true,
    };
    baseStudents[0] = oybekObj;
  } else {
    // Current user is another student
    const guestUserObj: UnrankedStudent = {
      id: currentUser?.id || 'current-user-rank-id',
      name: `${userName} (Siz)`,
      avatar: userAvatar,
      completedLessons: progress.completedLessonIds.length,
      points: totalPoints,
      weeklyPoints: weeklyPoints,
      monthlyPoints: monthlyPoints,
      streakDays: progress.streakDays || 6,
      certificatesCount: progress.certificates.length,
      badge: computeUserBadge(totalPoints),
      specialty: 'ZiyoTalim Faol Tinglovchisi',
      category: 'all',
      trend: 'up',
      isCurrentUser: true,
    };
    baseStudents.push(guestUserObj);
  }

  // Filter by category if not 'all'
  let combined = [...baseStudents];
  if (categoryFilter !== 'all') {
    combined = combined.filter(s => s.category === categoryFilter || s.isCurrentUser);
  }

  // Sort based on timeframe
  combined.sort((a, b) => {
    let pA = a.points;
    let pB = b.points;
    if (timeframe === 'weekly') {
      pA = a.weeklyPoints;
      pB = b.weeklyPoints;
    } else if (timeframe === 'monthly') {
      pA = a.monthlyPoints;
      pB = b.monthlyPoints;
    }
    return pB - pA;
  });

  // Assign 1-indexed ranks
  const rankedList: StudentRankItem[] = combined.map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  const userItem = rankedList.find(s => s.isCurrentUser) || rankedList[0];

  return {
    students: rankedList,
    currentUserRankItem: userItem
  };
}
