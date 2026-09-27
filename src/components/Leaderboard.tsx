import React, { useState, useMemo } from 'react';
import { 
  Trophy, Medal, Crown, Flame, Award, BookOpen, Sparkles, 
  ArrowUp, ArrowDown, Minus, Search, CheckCircle2,
  ChevronRight, Info
} from 'lucide-react';
import { LeaderboardTimeframe, StudentRankItem, UserProgress, UserProfile } from '../types';
import { getLeaderboardData } from '../data/leaderboardData';

interface LeaderboardProps {
  progress: UserProgress;
  currentUser: UserProfile | null;
  onOpenClassroomDirect?: () => void;
  onOpenQuizCenter?: () => void;
  onOpenRegister?: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  progress,
  currentUser,
  onOpenClassroomDirect,
  onOpenQuizCenter,
  onOpenRegister,
}) => {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('all-time');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'it' | 'languages' | 'exact_sciences'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRules, setShowRules] = useState(false);

  // Compute live ranking data incorporating current user's progress
  const { students, currentUserRankItem } = useMemo(() => {
    return getLeaderboardData(timeframe, categoryFilter, progress, currentUser);
  }, [timeframe, categoryFilter, progress, currentUser]);

  // Filter students by search
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.specialty.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  // Top 3 Podium Students
  const top1 = students[0];
  const top2 = students[1];
  const top3 = students[2];

  // Calculate points difference to next rank for current user
  const userRankIndex = students.findIndex(s => s.isCurrentUser);
  const nextRankStudent = userRankIndex > 0 ? students[userRankIndex - 1] : null;
  const pointsToNext = nextRankStudent ? Math.max(0, nextRankStudent.points - currentUserRankItem.points) : 0;

  const getBadgeStyle = (badge: StudentRankItem['badge']) => {
    switch (badge) {
      case 'Grandmaster':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'Master':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'Diamond':
        return 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800';
      case 'Gold':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Silver':
        return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
      default:
        return 'bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800';
    }
  };

  return (
    <section id="leaderboard" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1.5 uppercase tracking-wider">
            <Trophy className="w-4 h-4 fill-amber-500" />
            <span>Peshqadamlar Jadvali & Natijalar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Iqtidorli Talabalar Reytingi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Tugatilgan darslar soni, toʻplangan bilim ballari (XP), rasmiy sertifikatlar hamda uzluksiz kunlik faollik boʻyicha eng kuchli oʻquvchilar.
          </p>
        </div>

        {/* Action button to view points rules */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Ball Toʻplash Qoidalari</span>
          </button>

          {!currentUser && (
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Roʻyxatdan Oʻtish (+100 ball)</span>
            </button>
          )}
        </div>
      </div>

      {/* Points Rules Explanation Modal/Drawer if opened */}
      {showRules && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/60 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 border border-indigo-100 dark:border-slate-700 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Qanday qilib reytingda yuqoriga koʻtarilish mumkin?
            </h4>
            <button
              onClick={() => setShowRules(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer font-bold"
            >
              Yopish ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base font-mono block mb-0.5">+25 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Har bir darsni tamomlash</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Sinfxonada nazariya va testlarni yakunlang</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-violet-600 dark:text-violet-400 text-base font-mono block mb-0.5">+10 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Audio trenajor soʻzi</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Har bir yangi soʻzni oʻrganib qaytarilmas qiling</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base font-mono block mb-0.5">+50-100 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Yakuniy sinov testlari</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Test markazida bilimingizni tekshiring</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-base font-mono block mb-0.5">+150 ball</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Rasmiy sertifikat olish</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Kursni yakunlab sertifikat oling</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-rose-600 dark:text-rose-400 text-base font-mono block mb-0.5">+12 ball/kun</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">Uzluksiz faollik (Streak)</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Har kuni kamida bitta dars oʻzlashtiring</p>
            </div>
          </div>
        </div>
      )}

      {/* TOP 3 PODIUM DISPLAY */}
      <div className="mb-10 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-4xl mx-auto">
          
          {/* 2nd Place (Silver) */}
          {top2 && (
            <div className="order-2 md:order-1 bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200 dark:border-slate-700 shadow-md text-center flex flex-col items-center relative overflow-hidden transition-all hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300"></div>
              
              <div className="relative mb-3">
                <img
                  src={top2.avatar}
                  alt={top2.name}
                  className="w-18 h-18 rounded-full object-cover border-4 border-slate-300 dark:border-slate-600 shadow-md"
                />
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900 shadow">
                  2
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate max-w-full">
                {top2.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 truncate max-w-full">
                {top2.specialty}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold">
                <Trophy className="w-3.5 h-3.5 text-slate-400" />
                <span>{timeframe === 'weekly' ? top2.weeklyPoints : timeframe === 'monthly' ? top2.monthlyPoints : top2.points} XP</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-around text-[11px] text-slate-600 dark:text-slate-400">
                <span>{top2.completedLessons} dars</span>
                <span aria-hidden="true">·</span>
                <span>{top2.certificatesCount} sertifikat</span>
              </div>
            </div>
          )}

          {/* 1st Place (Gold Crown - Highest) */}
          {top1 && (
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-600 shadow-xl text-center flex flex-col items-center relative overflow-hidden transition-all hover:-translate-y-1.5 md:-mb-2">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>
              
              <div className="absolute top-3 right-3 text-amber-500 animate-pulse">
                <Crown className="w-6 h-6 fill-amber-400" />
              </div>

              <div className="relative mb-3">
                <img
                  src={top1.avatar}
                  alt={top1.name}
                  className="w-22 h-22 rounded-full object-cover border-4 border-amber-400 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center border-2 border-white dark:border-slate-900 shadow">
                  1
                </span>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 mb-1">
                🏆 Mutloq Peshqadam
              </span>

              <h4 className="font-extrabold text-base text-slate-900 dark:text-white truncate max-w-full">
                {top1.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 truncate max-w-full">
                {top1.specialty}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 text-sm font-mono font-extrabold border border-amber-300 dark:border-amber-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{timeframe === 'weekly' ? top1.weeklyPoints : timeframe === 'monthly' ? top1.monthlyPoints : top1.points} XP</span>
              </div>

              <div className="mt-3 pt-3 border-t border-amber-200/60 dark:border-slate-700 w-full flex items-center justify-around text-xs text-slate-600 dark:text-slate-300 font-medium">
                <span>{top1.completedLessons} ta dars</span>
                <span aria-hidden="true">·</span>
                <span>{top1.certificatesCount} ta sertifikat</span>
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) */}
          {top3 && (
            <div className="order-3 bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200 dark:border-slate-700 shadow-md text-center flex flex-col items-center relative overflow-hidden transition-all hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-orange-400 to-amber-600"></div>
              
              <div className="relative mb-3">
                <img
                  src={top3.avatar}
                  alt={top3.name}
                  className="w-18 h-18 rounded-full object-cover border-4 border-amber-700/60 dark:border-amber-600/60 shadow-md"
                />
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-slate-900 shadow">
                  3
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate max-w-full">
                {top3.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 truncate max-w-full">
                {top3.specialty}
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-200 text-xs font-mono font-bold">
                <Medal className="w-3.5 h-3.5 text-amber-700" />
                <span>{timeframe === 'weekly' ? top3.weeklyPoints : timeframe === 'monthly' ? top3.monthlyPoints : top3.points} XP</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-around text-[11px] text-slate-600 dark:text-slate-400">
                <span>{top3.completedLessons} dars</span>
                <span aria-hidden="true">·</span>
                <span>{top3.certificatesCount} sertifikat</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* CURRENT USER STICKY PERFORMANCE CARD */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-lg border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUserRankItem.avatar}
              alt={currentUserRankItem.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400 shadow"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
              #{currentUserRankItem.rank}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-white">
                {currentUser ? currentUser.fullName : 'Sizning Natijangiz'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/50 text-indigo-100 border border-indigo-400/40">
                {currentUserRankItem.badge}
              </span>
            </div>
            
            <p className="text-xs text-indigo-200 mt-0.5">
              Joriy oʻrningiz: <strong className="text-amber-300 font-mono">#{currentUserRankItem.rank}</strong> &nbsp;|&nbsp; 
              Tamomlangan: <strong className="text-white font-mono">{currentUserRankItem.completedLessons} ta dars</strong> &nbsp;|&nbsp; 
              Sertifikatlar: <strong className="text-white font-mono">{currentUserRankItem.certificatesCount} ta</strong>
            </p>

            {pointsToNext > 0 ? (
              <p className="text-[11px] text-indigo-300 mt-1 flex items-center gap-1">
                <ArrowUp className="w-3 h-3 text-emerald-400" />
                <span>Keyingi oʻringa koʻtarilish uchun yana <strong className="text-amber-300 font-mono font-bold">+{pointsToNext} ball</strong> kerak.</span>
              </p>
            ) : (
              <p className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Siz eng yuqori pogʻonalardasiz! Natijani saqlab qoling.</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right sm:text-right hidden sm:block">
            <span className="text-[10px] text-indigo-200 uppercase tracking-wider block">Sizning Ballaringiz</span>
            <span className="text-xl font-black font-mono text-amber-300">
              {timeframe === 'weekly' ? currentUserRankItem.weeklyPoints : timeframe === 'monthly' ? currentUserRankItem.monthlyPoints : currentUserRankItem.points} XP
            </span>
          </div>

          {onOpenQuizCenter && (
            <button
              onClick={onOpenQuizCenter}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Test topshirish (+50 XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Timeframe Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setTimeframe('all-time')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              timeframe === 'all-time'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Barcha davr
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              timeframe === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Shu oy
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              timeframe === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Shu hafta
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'Barcha yoʻnalishlar' },
            { id: 'it', label: 'IT & Dasturlash' },
            { id: 'languages', label: 'Xorijiy Tillar' },
            { id: 'exact_sciences', label: 'Aniq Fanlar' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                categoryFilter === cat.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'bg-transparent border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Talaba qidirish..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
          />
        </div>

      </div>

      {/* FULL LEADERBOARD TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Table Head */}
        <div className="grid grid-cols-12 gap-2 p-4 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/70 dark:bg-slate-950/70">
          <div className="col-span-1 text-center">Oʻrin</div>
          <div className="col-span-5 sm:col-span-4">Talaba & Mutaxassislik</div>
          <div className="col-span-3 sm:col-span-3 text-center">Tugatilgan darslar</div>
          <div className="hidden sm:block sm:col-span-2 text-center">Faollik & Sertifikat</div>
          <div className="col-span-3 sm:col-span-2 text-right pr-2">Ball (XP)</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredStudents.map((student) => {
            const isSelf = student.isCurrentUser;
            const pointsToDisplay = timeframe === 'weekly' ? student.weeklyPoints : timeframe === 'monthly' ? student.monthlyPoints : student.points;

            return (
              <div
                key={student.id}
                className={`grid grid-cols-12 gap-2 p-3.5 sm:p-4 items-center transition-colors ${
                  isSelf
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600 font-medium'
                    : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                }`}
              >
                
                {/* Column 1: Rank Number + Trend */}
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-extrabold ${
                    student.rank === 1
                      ? 'bg-amber-400 text-amber-950'
                      : student.rank === 2
                      ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                      : student.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {student.rank}
                  </span>

                  {/* Trend */}
                  {student.trend === 'up' ? (
                    <ArrowUp className="w-3 h-3 text-emerald-500 hidden sm:block" />
                  ) : student.trend === 'down' ? (
                    <ArrowDown className="w-3 h-3 text-rose-500 hidden sm:block" />
                  ) : (
                    <Minus className="w-3 h-3 text-slate-400 hidden sm:block" />
                  )}
                </div>

                {/* Column 2: Student Details */}
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    {isSelf && (
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 absolute top-0 right-0"></span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs sm:text-sm font-bold truncate ${isSelf ? 'text-indigo-950 dark:text-indigo-200' : 'text-slate-900 dark:text-white'}`}>
                        {student.name}
                      </span>
                      {isSelf && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-600 text-white">
                          Siz
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {student.specialty}
                    </p>
                  </div>
                </div>

                {/* Column 3: Completed Lessons */}
                <div className="col-span-3 sm:col-span-3 text-center">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-mono">{student.completedLessons} ta dars</span>
                  </div>
                  <div className="w-20 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden hidden sm:block">
                    <div 
                      className="bg-indigo-600 h-full rounded-full" 
                      style={{ width: `${Math.min(100, Math.round((student.completedLessons / 200) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                {/* Column 4: Streak & Certificates (hidden on mobile) */}
                <div className="hidden sm:flex sm:col-span-2 items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1" title="Uzluksiz kunlik faollik">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-mono font-medium">{student.streakDays} kun</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1" title="Qoʻlga kiritilgan sertifikatlar">
                    <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-mono font-medium">{student.certificatesCount}</span>
                  </span>
                </div>

                {/* Column 5: Points XP */}
                <div className="col-span-3 sm:col-span-2 text-right pr-2">
                  <span className="inline-block text-xs sm:text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {pointsToDisplay.toLocaleString()} XP
                  </span>
                  <span className={`block text-[10px] font-semibold mt-0.5 px-2 py-0.5 rounded-full text-center max-w-[90px] ml-auto border ${getBadgeStyle(student.badge)}`}>
                    {student.badge}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
