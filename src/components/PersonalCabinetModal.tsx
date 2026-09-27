import React, { useState } from 'react';
import { 
  X, Flame, BookOpen, Award, Bookmark, ArrowRight, Clock, CheckCircle2, 
  Trophy, User, Settings, Sparkles, Volume2, ShieldCheck, Target, 
  Calendar, BarChart2, Edit3, Save, LogOut, Moon, Sun, Copy, ExternalLink,
  GraduationCap, Trash2, Check, AlertCircle, ChevronRight, ChevronLeft,
  KeyRound, Smartphone, Mail, MapPin, Building, Bell, Sliders, Eye
} from 'lucide-react';
import { Course, UserProgress, CertificateItem, UserProfile } from '../types';
import { computeUserPoints } from '../data/leaderboardData';
import { useTheme } from '../context/ThemeContext';
import { playFemaleSpeech, stopAllSpeech } from '../utils/femaleVoiceService';

interface PersonalCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  currentUser: UserProfile | null;
  courses: Course[];
  onOpenClassroom: (course: Course) => void;
  onViewCertificate: (cert: CertificateItem) => void;
  onOpenQuizCenter: () => void;
  onOpenLanguageLab: () => void;
  onUpdateUser: (user: UserProfile) => void;
  onUpdateProgress?: (progress: UserProgress) => void;
  onToggleBookmark?: (courseId: string) => void;
  onUnenrollCourse?: (courseId: string) => void;
  onLogout?: () => void;
  showToast?: (message: string) => void;
}

type CabinetTab = 
  | 'profile' 
  | 'courses' 
  | 'certificates' 
  | 'analytics' 
  | 'vocab' 
  | 'saved' 
  | 'settings' 
  | 'security';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80'
];

export const PersonalCabinetModal: React.FC<PersonalCabinetModalProps> = ({
  isOpen,
  onClose,
  progress,
  currentUser,
  courses,
  onOpenClassroom,
  onViewCertificate,
  onOpenQuizCenter,
  onOpenLanguageLab,
  onUpdateUser,
  onToggleBookmark,
  onUnenrollCourse,
  onLogout,
  showToast,
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<CabinetTab>('profile');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Profile edit states
  const [fullName, setFullName] = useState(currentUser?.fullName || 'Oybekjon Adashev');
  const [email, setEmail] = useState(currentUser?.email || 'adashevoybekjon@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+998 90 123 45 67');
  const [bio, setBio] = useState(currentUser?.bio || 'Zamonaviy dasturlash va xorijiy tillarni faol oʻrganuvchi talaba, respublika yetakchisi');
  const [city, setCity] = useState(currentUser?.city || 'Toshkent shahri');
  const [institution, setInstitution] = useState(currentUser?.institution || 'Oʻzbekiston Milliy Universiteti / Ziyo IT Akademiya');
  const [targetGoal, setTargetGoal] = useState(currentUser?.targetGoal || 'IELTS 8.5+ va Senior Software Engineer');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || AVATAR_OPTIONS[0]);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(currentUser?.dailyGoalMinutes || 45);
  const [telegram, setTelegram] = useState(currentUser?.telegram || '@oybekjon_dev');

  // iOS-style Preferences toggles
  const [audioAutoplay, setAudioAutoplay] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [dailyNotification, setDailyNotification] = useState(true);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [copiedCertId, setCopiedCertId] = useState<string | null>(null);

  if (!isOpen) return null;

  const enrolledCourses = courses.filter(c => progress.enrolledCourseIds.includes(c.id));
  const bookmarkedCourses = courses.filter(c => progress.bookmarkedCourseIds.includes(c.id));
  const userPoints = computeUserPoints(progress);

  // Handle saving profile
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) return;

    const updated: UserProfile = {
      ...currentUser,
      fullName: fullName.trim() || currentUser.fullName,
      email: email.trim() || currentUser.email,
      phone: phone.trim() || currentUser.phone,
      bio: bio.trim(),
      city: city.trim(),
      institution: institution.trim(),
      targetGoal: targetGoal.trim(),
      avatar: selectedAvatar,
      dailyGoalMinutes: Number(dailyGoalMinutes) || 45,
      telegram: telegram.trim()
    };

    onUpdateUser(updated);
    if (showToast) showToast('Profil maʼlumotlari saqlandi!');
  };

  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      if (showToast) showToast('Parol kamida 6 ta belgidan iborat boʻlishi kerak');
      return;
    }
    if (newPassword !== confirmPassword) {
      if (showToast) showToast('Yangi parollar bir-biriga mos kelmadi');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    if (showToast) showToast('Xavfsizlik paroli muvaffaqiyatli yangilandi!');
  };

  // Copy code helper
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCertId(id);
    if (showToast) showToast(`Sertifikat kodi nusxalandi: ${code}`);
    setTimeout(() => setCopiedCertId(null), 2500);
  };

  // Speak word helper (Female Voice)
  const handleSpeak = (text: string, lang = 'en-US') => {
    playFemaleSpeech({
      text,
      lang,
      rate: 0.9,
      pitch: 1.1 // Sweet and clear female pitch
    });
  };

  // Switch tab with mobile navigation handling
  const handleSelectTab = (tab: CabinetTab) => {
    setActiveTab(tab);
    setMobileDetailOpen(true);
  };

  // Navigation Items Config (iOS style icon badges)
  const navItems = [
    {
      id: 'profile' as CabinetTab,
      label: 'Shaxsiy Profil',
      subtitle: 'Ism, shahar, taʼlim dargohi',
      icon: User,
      badgeColor: 'from-blue-500 to-indigo-600',
      count: null
    },
    {
      id: 'courses' as CabinetTab,
      label: 'Mening Kurslarim',
      subtitle: `${enrolledCourses.length} ta oʻquv kursi faol`,
      icon: BookOpen,
      badgeColor: 'from-amber-500 to-orange-600',
      count: enrolledCourses.length
    },
    {
      id: 'certificates' as CabinetTab,
      label: 'Diplom & Sertifikatlar',
      subtitle: `${progress.certificates.length} ta rasmiy verifikatsiyalangan`,
      icon: Award,
      badgeColor: 'from-amber-400 to-yellow-600',
      count: progress.certificates.length
    },
    {
      id: 'analytics' as CabinetTab,
      label: 'Maqsad & Statistika',
      subtitle: `Kuniga ${dailyGoalMinutes} daq · ${progress.streakDays} kun streak`,
      icon: Target,
      badgeColor: 'from-emerald-500 to-teal-600',
      count: null
    },
    {
      id: 'vocab' as CabinetTab,
      label: 'Soʻz Boyligi Banki',
      subtitle: '10 tildan oʻzlashtirilgan soʻzlar',
      icon: GraduationCap,
      badgeColor: 'from-sky-500 to-blue-600',
      count: (progress.masteredVocabIds || []).length || 6
    },
    {
      id: 'saved' as CabinetTab,
      label: 'Saqlangan Kurslar',
      subtitle: 'Xatchoʻpga olingan darslar',
      icon: Bookmark,
      badgeColor: 'from-purple-500 to-indigo-600',
      count: bookmarkedCourses.length
    },
    {
      id: 'settings' as CabinetTab,
      label: 'Tizim Sozlamalari',
      subtitle: 'Mavzu, bildirishnoma, audio',
      icon: Settings,
      badgeColor: 'from-slate-500 to-slate-700',
      count: null
    },
    {
      id: 'security' as CabinetTab,
      label: 'Xavfsizlik & Parol',
      subtitle: 'Parolni oʻzgartirish va 2FA',
      icon: ShieldCheck,
      badgeColor: 'from-rose-500 to-pink-600',
      count: null
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-300">
      
      {/* Dynamic ambient iOS light orbs for translucent glass effect */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/25 to-sky-400/20 blur-[120px] -translate-x-1/3 -translate-y-1/4 animate-pulse duration-1000" />
        <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/15 blur-[120px] translate-x-1/3 translate-y-1/4" />
      </div>

      {/* Main Glassmorphic iPhone / iPadOS Master-Detail Container */}
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[860px] rounded-[32px] overflow-hidden flex flex-col backdrop-blur-2xl bg-white/85 dark:bg-slate-900/80 border border-white/50 dark:border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-all">
        
        {/* iOS Signature Dynamic Glass Top Header */}
        <div className="shrink-0 px-5 py-3.5 border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md bg-white/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Back Button */}
            {mobileDetailOpen && (
              <button
                type="button"
                onClick={() => setMobileDetailOpen(false)}
                className="md:hidden flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity cursor-pointer pr-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kabinet</span>
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-xs" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-xs" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 ml-1.5 tracking-tight flex items-center gap-1.5">
                <span>Shaxsiy Kabinet</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100/80 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                  iOS Pro
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-mono">
              <Trophy className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{userPoints.totalPoints} XP</span>
            </span>

            {/* iOS Close Circle Button */}
            <button
              onClick={onClose}
              aria-label="Yopish"
              className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 backdrop-blur-md text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Master-Detail Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT SIDEBAR: Vertical iOS Settings Menu */}
          <aside 
            className={`w-full md:w-80 shrink-0 border-r border-slate-200/60 dark:border-slate-800/60 bg-slate-100/40 dark:bg-slate-950/40 backdrop-blur-xl flex flex-col justify-between overflow-y-auto ${
              mobileDetailOpen ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="p-3 sm:p-4 space-y-4">
              
              {/* Apple-ID style User Banner Card */}
              <div 
                onClick={() => handleSelectTab('profile')}
                className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/65 backdrop-blur-lg border border-white/60 dark:border-white/5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedAvatar}
                      alt={fullName}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {fullName}
                      </h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {email}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-mono">
                        1-Oʻrin · Grandmaster
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
                </div>

                {/* Quick 3-metric mini badges */}
                <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
                  <div className="bg-white/50 dark:bg-slate-900/50 py-1.5 px-1 rounded-xl">
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Seriya</div>
                    <div className="text-xs font-black text-amber-500 font-mono flex items-center justify-center gap-0.5 mt-0.5">
                      <Flame className="w-3 h-3 fill-amber-500" />
                      <span>{progress.streakDays}k</span>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-900/50 py-1.5 px-1 rounded-xl">
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Kurslar</div>
                    <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                      {enrolledCourses.length} ta
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-900/50 py-1.5 px-1 rounded-xl">
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Diplom</div>
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      {progress.certificates.length} ta
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical iOS Navigation Group */}
              <div className="space-y-1">
                <div className="px-2.5 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Boʻlimlar va Sozlamalar
                </div>

                <div className="rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg border border-white/60 dark:border-white/5 shadow-xs overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/40">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full flex items-center justify-between p-3 transition-all cursor-pointer text-left ${
                          isActive
                            ? 'bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* iOS Rounded-square Colorful Icon Badge */}
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.badgeColor} text-white flex items-center justify-center shadow-xs shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {item.count !== null && item.count > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                              {item.count}
                            </span>
                          )}
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            isActive ? 'text-indigo-600 dark:text-indigo-400 translate-x-0.5' : 'text-slate-400'
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom iOS Status / Logout strip */}
            <div className="p-3 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                  <span>{isDarkMode ? 'Kunduzgi rejim' : 'Tungi rejim'}</span>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Chiqish"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT DETAIL STAGE: Transparent Glass Views */}
          <main 
            className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 backdrop-blur-md bg-white/40 dark:bg-slate-900/40 ${
              !mobileDetailOpen ? 'hidden md:block' : 'block'
            }`}
          >
            
            {/* VIEW 1: SHAXSIY PROFIL */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-3 duration-300">
                
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Shaxsiy Profil
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Platformadagi shaxsiy maʼlumotlar va taʼlim identifikatorlari
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveProfile()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Saqlash</span>
                  </button>
                </div>

                {/* Avatar Picker Inset Card */}
                <div className="rounded-2xl p-4 sm:p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Profil Avatari
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {AVATAR_OPTIONS.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedAvatar(url)}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${
                          selectedAvatar === url
                            ? 'ring-4 ring-indigo-500 scale-105 shadow-md'
                            : 'opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img src={url} alt="Avatar" className="w-13 h-13 object-cover" />
                        {selectedAvatar === url && (
                          <div className="absolute inset-0 bg-indigo-600/30 backdrop-blur-[1px] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white font-black stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inset Grouped Fields (iOS Settings Group) */}
                <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      F.I.SH (Ism va familiya)
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Oybekjon Adashev"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      Elektron Pochta
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="adashevoybekjon@gmail.com"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      Telefon Raqam
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      Telegram Username
                    </label>
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="@oybekjon_dev"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      Shahar / Hudud
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Toshkent shahri"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      Oʻquv Dargohi / Universitet
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Oʻzbekiston Milliy Universiteti / Ziyo IT"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-44">
                      Asosiy Maqsad
                    </label>
                    <input
                      type="text"
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="IELTS 8.5+ va Senior Software Engineer"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Oʻzingiz haqingizda (Bio)
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                      placeholder="Qiziqishlaringiz va maqsadlaringiz haqida qisqacha..."
                    />
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => handleSaveProfile()}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Oʻzgarishlarni Saqlash</span>
                  </button>
                </div>

              </div>
            )}

            {/* VIEW 2: MENING KURSLARIM */}
            {activeTab === 'courses' && (
              <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Mening Kurslarim
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Faol taʼlim dasturlari va sinfxonaga toʻgʻridan-toʻgʻri kirish
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    + Yangi kurs
                  </button>
                </div>

                {enrolledCourses.length > 0 ? (
                  <div className="space-y-3">
                    {enrolledCourses.map((course) => {
                      const allLessons = course.modules.flatMap(m => m.lessons);
                      const completedCount = allLessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
                      const percent = Math.round((completedCount / (allLessons.length || 1)) * 100);

                      return (
                        <div
                          key={course.id}
                          className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5 min-w-0">
                            <img
                              src={course.image || course.thumbnail || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'}
                              alt={course.title}
                              referrerPolicy="no-referrer"
                              className="w-18 h-18 rounded-2xl object-cover shrink-0 border border-slate-200/60 dark:border-slate-700/60 shadow-xs"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 uppercase">
                                  {course.category}
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                  {course.level}
                                </span>
                              </div>

                              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                                {course.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {course.instructor.name} · {course.durationHours || 30} soat darslik
                              </p>

                              {/* Progress bar */}
                              <div className="mt-3 flex items-center gap-2.5">
                                <div className="flex-1 bg-slate-200/80 dark:bg-slate-700/80 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-indigo-500 to-sky-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                                  {percent}% ({completedCount}/{allLessons.length})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                            {onUnenrollCourse && (
                              <button
                                type="button"
                                onClick={() => {
                                  onUnenrollCourse(course.id);
                                  if (showToast) showToast(`"${course.title}" kursidan chiqildi`);
                                }}
                                className="p-2.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                                title="Kursdan chiqish"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => {
                                onClose();
                                onOpenQuizCenter();
                              }}
                              className="px-3 py-2 bg-slate-100/90 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Award className="w-3.5 h-3.5 text-amber-500" />
                              <span>Imtihon</span>
                            </button>

                            <button
                              onClick={() => {
                                onClose();
                                onOpenClassroom(course);
                              }}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <span>Darsga kirish</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/60 dark:border-white/10 p-6">
                    <BookOpen className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Kurslar roʻyxati boʻsh</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                      Katalogdan dasturlash, chet tillari yoki aniq fanlar kursini tanlab oʻrganishni boshlang.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Katalogga oʻtish
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 3: DIPLOM & SERTIFIKATLAR */}
            {activeTab === 'certificates' && (
              <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Rasmiy Diplom & Sertifikatlar
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      QR-kod va maxsus raqamli verifikatsiya kodiga ega xalqaro diplomlar
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuizCenter();
                    }}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-xs font-extrabold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>+ Yangi sertifikat olish</span>
                  </button>
                </div>

                {progress.certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {progress.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="rounded-2xl p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-amber-200/70 dark:border-amber-900/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
                            <Award className="w-7 h-7" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1">
                              Rasmiy Diplom
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                              {cert.courseTitle}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                              Egasi: <strong className="text-slate-900 dark:text-white">{cert.recipientName}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span>{cert.issueDate}</span>
                            <span>·</span>
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{cert.grade}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopyCode(cert.verificationCode, cert.id)}
                              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                              title="Verifikatsiya kodini nusxalash"
                            >
                              {copiedCertId === cert.id ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3 text-slate-500" />
                              )}
                              <span>{cert.verificationCode}</span>
                            </button>

                            <button
                              onClick={() => onViewCertificate(cert)}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>Ochish</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/60 dark:border-white/10 p-6">
                    <Award className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Sertifikatlar mavjud emas</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                      Test markazidan sinov testini muvaffaqiyatli topshiring va darajangizni tasdiqlovchi diplomga ega boʻling.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenQuizCenter();
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Diagnostik test topshirish
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: MAQSAD & STATISTIKA */}
            {activeTab === 'analytics' && (
              <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Maqsad & Statistika
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Kunlik dars maqsadi va haftalik faollik koʻrsatkichlari
                    </p>
                  </div>
                </div>

                {/* Daily Goal iOS Segmented Control Card */}
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        <Target className="w-4 h-4" />
                        <span>Kunlik Taʼlim Maqsadi</span>
                      </div>
                      <div className="text-base font-black text-slate-900 dark:text-white mt-1">
                        Bugungi reja: {dailyGoalMinutes} daqiqa dars
                      </div>
                    </div>

                    {/* iOS Segmented Selector */}
                    <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/60">
                      {[15, 30, 45, 60, 90].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => {
                            setDailyGoalMinutes(mins);
                            if (currentUser) {
                              onUpdateUser({ ...currentUser, dailyGoalMinutes: mins });
                            }
                            if (showToast) showToast(`Kunlik maqsad ${mins} daqiqaga oʻrnatildi`);
                          }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            dailyGoalMinutes === mins
                              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Bajarilish darajasi</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {Math.min(progress.totalStudyMinutes, dailyGoalMinutes)} / {dailyGoalMinutes} daqiqa (
                        {Math.min(100, Math.round((progress.totalStudyMinutes / dailyGoalMinutes) * 100))}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 via-indigo-600 to-sky-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.round((progress.totalStudyMinutes / dailyGoalMinutes) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Weekly Chart */}
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Haftalik Dars Grafigi
                      </h3>
                    </div>
                    <span className="text-xs text-amber-500 font-bold flex items-center gap-1 font-mono">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{progress.streakDays} kun uzluksiz</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {[
                      { day: 'Dush', mins: 45 },
                      { day: 'Sesh', mins: 50 },
                      { day: 'Chor', mins: 30 },
                      { day: 'Pay', mins: 60 },
                      { day: 'Jum', mins: 40 },
                      { day: 'Shan', mins: 55 },
                      { day: 'Yak', mins: 35 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 p-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{item.day}</span>
                        <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-xl h-20 flex items-end justify-center p-1">
                          <div 
                            className="w-full bg-gradient-to-t from-indigo-600 to-sky-500 rounded-lg transition-all"
                            style={{ height: `${(item.mins / 60) * 100}%` }}
                            title={`${item.mins} daqiqa dars`}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.mins}m</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exam Scores Inset List */}
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Topshirilgan Sinov Imtihonlari</span>
                  </h3>

                  {Object.entries(progress.quizScores || {}).length > 0 ? (
                    <div className="rounded-xl divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden bg-slate-50/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      {Object.entries(progress.quizScores).map(([name, score]) => (
                        <div key={name} className="p-3 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                            {name.replace(/-/g, ' ')}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-black ${score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                              {score}%
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                              Aʼlo
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 dark:text-slate-400">Hozircha test natijalari mavjud emas.</p>
                  )}
                </div>

              </div>
            )}

            {/* VIEW 5: SOʻZ BOYLIGI BANKI */}
            {activeTab === 'vocab' && (
              <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Soʻz Boyligi Banki
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      10 tilda oʻzlashtirilgan faol lugʻat va audio talaffuz
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenLanguageLab();
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tillar Lab</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { word: 'Accomplish', translation: 'Bajarmoq, erishmoq', lang: 'Ingliz tili', flag: '🇬🇧', phonetic: '/əˈkʌm.plɪʃ/' },
                    { word: 'Perseverance', translation: 'Matonat, tirishqoqlik', lang: 'Ingliz tili', flag: '🇬🇧', phonetic: '/ˌpɜː.sɪˈvɪə.rəns/' },
                    { word: 'Вдохновение', translation: 'Ilhom, joʻshqinlik', lang: 'Rus tili', flag: '🇷🇺', phonetic: '[vdəx-nɐ-ˈvʲe-nʲɪ-jə]' },
                    { word: 'Развитие', translation: 'Rivojlanish, taraqqiyot', lang: 'Rus tili', flag: '🇷🇺', phonetic: '[rəz-ˈvʲi-tʲɪ-jə]' },
                    { word: 'Le succès', translation: 'Muvaffaqiyat, gʻalaba', lang: 'Fransuz tili', flag: '🇫🇷', phonetic: '/lyk.sɛ/' },
                    { word: 'Die Zukunft', translation: 'Kelajak, istiqbol', lang: 'Nemis tili', flag: '🇩🇪', phonetic: '/diː ˈtsuː.kʊnft/' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                          <span>{item.flag}</span>
                          <span>{item.lang}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                          {item.word}
                        </h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                          {item.translation}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">{item.phonetic}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSpeak(item.word)}
                        className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 flex items-center justify-center transition-colors cursor-pointer"
                        title="Ovozli eshitish"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 6: SAQLANGAN KURSLAR */}
            {activeTab === 'saved' && (
              <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Saqlangan Kurslar
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Keyinroq oʻrganish uchun xatchoʻpga olingan dasturlar
                    </p>
                  </div>
                </div>

                {bookmarkedCourses.length > 0 ? (
                  <div className="space-y-3">
                    {bookmarkedCourses.map((course) => (
                      <div
                        key={course.id}
                        className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase">
                            {course.category}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                            {course.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {course.level} · {course.durationHours || 30} soat · {course.instructor.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {onToggleBookmark && (
                            <button
                              onClick={() => onToggleBookmark(course.id)}
                              className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-xl transition-colors cursor-pointer"
                              title="Xatchoʻpdan chiqarish"
                            >
                              <Bookmark className="w-4 h-4 fill-amber-500" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              onClose();
                              onOpenClassroom(course);
                            }}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Boshlash
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/60 dark:border-white/10 p-6">
                    <Bookmark className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Saqlangan kurslar roʻyxati boʻsh.</p>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 7: TIZIM SOZLAMALARI (iPhone Settings Style) */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl mx-auto space-y-5 animate-in fade-in slide-in-from-right-3 duration-300">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Tizim Sozlamalari
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Interfeys, ovoz va bildirishnomalarni iOS uslubida moslash
                  </p>
                </div>

                {/* Group 1: Appearance */}
                <div className="space-y-1.5">
                  <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Koʻrinish va Mavzu
                  </div>

                  <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs divide-y divide-slate-100 dark:divide-slate-700/50 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
                          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Tungi Rejim (Dark Mode)
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Koʻzlarni toliqtirmaydigan qorongʻu mavzu
                          </div>
                        </div>
                      </div>

                      {/* iPhone Toggle Switch */}
                      <button
                        type="button"
                        onClick={toggleDarkMode}
                        className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                          isDarkMode ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Group 2: Audio & Preferences */}
                <div className="space-y-1.5">
                  <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ovoz va Tebranish
                  </div>

                  <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs divide-y divide-slate-100 dark:divide-slate-700/50 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
                          <Volume2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Talaffuzni Avtomatik Ijro Etish
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Yangi soʻz ochilganda audio talaffuz qilinadi
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setAudioAutoplay(!audioAutoplay);
                          if (showToast) showToast(audioAutoplay ? 'Ovoz avto-ijrosi oʻchirildi' : 'Ovoz avto-ijrosi yoqildi');
                        }}
                        className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                          audioAutoplay ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                      </button>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Kunlik Eslatma Bildirishnomalari
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Streak uzilib qolmasligi uchun eslatma
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setDailyNotification(!dailyNotification);
                          if (showToast) showToast(dailyNotification ? 'Eslatmalar oʻchirildi' : 'Eslatmalar faollashtirildi');
                        }}
                        className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                          dailyNotification ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Group 3: App info */}
                <div className="space-y-1.5">
                  <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Dastur Maʼlumotlari
                  </div>

                  <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs divide-y divide-slate-100 dark:divide-slate-700/50 overflow-hidden text-xs">
                    <div className="p-3.5 flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Platforma versiyasi</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">v3.5.2 Pro</span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Ishlab chiquvchi</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Ziyo Taʼlim AI Studio</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 8: XAVFSIZLIK & PAROL */}
            {activeTab === 'security' && (
              <div className="max-w-xl mx-auto space-y-5 animate-in fade-in slide-in-from-right-3 duration-300">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Xavfsizlik & Parol
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Hisob xavfsizligini taʼminlash va yangi parol oʻrnatish
                  </p>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xs overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/50">
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-40">
                        Joriy Parol
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-40">
                        Yangi Parol
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        placeholder="Kamida 6 ta belgi"
                      />
                    </div>

                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 w-40">
                        Parolni Tasdiqlang
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Parolni Yangilash</span>
                  </button>
                </form>

                {/* 2FA badge */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-emerald-900 dark:text-emerald-300 font-extrabold block">
                      Hisobingiz Xavfsiz Himoyalangan
                    </strong>
                    <span className="text-emerald-700 dark:text-emerald-400">
                      Google OAuth va biometrik xavfsizlik protokollari faol holatda.
                    </span>
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};
