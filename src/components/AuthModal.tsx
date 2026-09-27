import React, { useState, useEffect } from 'react';
import { 
  X, Mail, Phone, Lock, User, ShieldCheck, CheckCircle2, 
  ArrowRight, RefreshCw, KeyRound, Sparkles, LogIn, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';
import { getStoredUsers, saveStoredUsers, MockUser } from '../utils/adminStorage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSuccessAuth: (user: UserProfile, message: string) => void;
  onLogout: () => void;
}

type AuthMode = 'register' | 'login' | 'profile';
type VerificationMethod = 'email' | 'phone';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccessAuth,
  onLogout
}) => {
  const [mode, setMode] = useState<AuthMode>(currentUser ? 'profile' : 'register');
  const [method, setMethod] = useState<VerificationMethod>('email');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Verification step
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationDigits, setVerificationDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset or initialize modal
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      if (currentUser) {
        setMode('profile');
      } else {
        setMode('register');
        setIsVerifying(false);
      }
    }
  }, [isOpen, currentUser]);

  // Countdown timer for resending code
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isVerifying && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVerifying, timer]);

  if (!isOpen) return null;

  // Generate a random 6-digit verification code
  const sendVerificationCode = () => {
    setErrorMsg(null);

    // Validate fields
    if (!fullName.trim() && mode === 'register') {
      setErrorMsg('Iltimos, ism va familiyangizni kiriting');
      return;
    }

    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        setErrorMsg('Toʻgʻri elektron pochta manzilini kiriting (masalan: talaba@gmail.com)');
        return;
      }
    } else {
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length < 9) {
        setErrorMsg('Toʻliq telefon raqamini kiriting (masalan: +998 90 123 45 67)');
        return;
      }
    }

    if (!password || password.length < 6) {
      setErrorMsg('Parol kamida 6 ta belgidan iborat boʻlishi lozim');
      return;
    }

    // Generate code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setIsVerifying(true);
    setTimer(60);
    setVerificationDigits(['', '', '', '', '', '']);
  };

  const handleDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...verificationDigits];
    newDigits[index] = cleanVal;
    setVerificationDigits(newDigits);

    // Auto-focus next input
    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`digit-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePasteCode = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = ['', '', '', '', '', ''];
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i];
      }
      setVerificationDigits(newDigits);
      const focusIndex = Math.min(pastedData.length, 5);
      document.getElementById(`digit-input-${focusIndex}`)?.focus();
    }
  };

  const handleConfirmVerification = () => {
    const inputCode = verificationDigits.join('');
    if (inputCode.length !== 6) {
      setErrorMsg('Iltimos, 6 xonali tasdiqlash kodini toʻliq kiriting');
      return;
    }

    if (inputCode !== generatedCode) {
      setErrorMsg('Tasdiqlash kodi notoʻgʻri kiritildi. Iltimos qaytadan tekshiring');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: fullName.trim(),
        authMethod: method,
        email: method === 'email' ? email.trim() : undefined,
        phone: method === 'phone' ? phone.trim() : undefined,
        isVerified: true,
        avatar: method === 'email' 
          ? `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=250&q=80`
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        bio: 'ZiyoTalim zamonaviy taʼlim platformasining tasdiqlangan tinglovchisi'
      };

      try {
        const storedUsers = getStoredUsers();
        const newMockUser: MockUser = {
          id: newUser.id,
          name: newUser.fullName,
          email: newUser.email || (newUser.phone ? `${newUser.phone.replace(/[^0-9]/g, '')}@ziyotalim.uz` : `${newUser.id}@ziyotalim.uz`),
          role: 'Talaba',
          enrolledCourses: 0,
          completedTests: 0,
          averageScore: 100,
          status: 'Faol',
          joinedDate: newUser.joinedDate
        };
        saveStoredUsers([newMockUser, ...storedUsers]);
      } catch {}

      onSuccessAuth(
        newUser, 
        `Tabriklaymiz, ${newUser.fullName}! ${method === 'email' ? 'Elektron pochta' : 'Telefon raqam'} orqali roʻyxatdan oʻtish muvaffaqiyatli tasdiqlandi (+100 ball)!`
      );
      onClose();
    }, 800);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const identifier = method === 'email' ? email.trim() : phone.trim();
    if (!identifier) {
      setErrorMsg(method === 'email' ? 'Elektron pochtani kiriting' : 'Telefon raqamni kiriting');
      return;
    }
    if (!password) {
      setErrorMsg('Parolni kiriting');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const loggedUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: fullName.trim() || (method === 'email' ? email.split('@')[0] : 'Oybekjon Adashev'),
        authMethod: method,
        email: method === 'email' ? email.trim() : undefined,
        phone: method === 'phone' ? phone.trim() : undefined,
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        joinedDate: '2026-09-01',
        bio: 'Zamonaviy dasturlash va xorijiy tillarni faol oʻrganuvchi talaba'
      };

      onSuccessAuth(loggedUser, `Xush kelibsiz, ${loggedUser.fullName}! Tizimga muvaffaqiyatli kirdingiz.`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-white to-slate-50 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {currentUser && mode === 'profile' ? (
                  <span>Shaxsiy Profil & Akkaunt</span>
                ) : mode === 'register' ? (
                  <span>ZiyoTalim Talabasi Roʻyxatdan Oʻtishi</span>
                ) : (
                  <span>Tizimga Kirish</span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser && mode === 'profile'
                  ? 'Rasmiy tasdiqlangan talaba maʼlumotlari'
                  : 'Elektron pochta yoki telefon raqam orqali tasdiqlash'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Yopish"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch for Register / Login (when not viewing profile) */}
        {!currentUser && (
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <button
              onClick={() => {
                setMode('register');
                setIsVerifying(false);
                setErrorMsg(null);
              }}
              className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${
                mode === 'register'
                  ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yangi Roʻyxatdan Oʻtish</span>
            </button>
            <button
              onClick={() => {
                setMode('login');
                setIsVerifying(false);
                setErrorMsg(null);
              }}
              className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 border-b-2 ${
                mode === 'login'
                  ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Tizimga Kirish</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* VIEW: LOGGED IN PROFILE */}
          {currentUser && mode === 'profile' ? (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                      {currentUser.fullName}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Tasdiqlangan
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {currentUser.authMethod === 'email' ? currentUser.email : currentUser.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Aʼzo boʻlgan sana: {currentUser.joinedDate}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Talaba haqida qisqacha maʼlumot:
                </label>
                <p className="text-xs text-slate-600 dark:text-slate-400 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 leading-relaxed">
                  {currentUser.bio || 'Zamonaviy bilimlar va IT koʻnikmalarini egallayotgan faol talaba.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setMode('register');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 rotate-180" />
                  <span>Akkauntdan chiqish</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                >
                  Yopish
                </button>
              </div>
            </div>
          ) : isVerifying ? (
            /* STEP 2: CODE VERIFICATION SCREEN */
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Tasdiqlash Kodini Kiriting
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Tasdiqlash kodi quyidagi manzilga yuborildi: <br />
                  <strong className="text-slate-800 dark:text-slate-200 font-mono">
                    {method === 'email' ? email : phone}
                  </strong>
                </p>
              </div>

              {/* DEMO SIMULATION NOTICE BANNER */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Simulyatsiya kodi: <strong className="font-mono font-bold text-sm tracking-wider">{generatedCode}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const codeArr = generatedCode.split('');
                    setVerificationDigits(codeArr);
                  }}
                  className="px-2.5 py-1 bg-amber-200/80 dark:bg-amber-900/80 hover:bg-amber-300 dark:hover:bg-amber-800 rounded font-semibold text-[11px] cursor-pointer transition-colors"
                >
                  Avtomatik toʻldirish
                </button>
              </div>

              {/* 6 Digit Input Boxes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block text-center">
                  6 xonali tasdiqlash raqami:
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePasteCode}>
                  {verificationDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`digit-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && idx > 0) {
                          document.getElementById(`digit-input-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-lg font-bold bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-500 rounded-xl focus:outline-none transition-all text-slate-900 dark:text-white"
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend Action */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 dark:text-slate-400">
                  {timer > 0 ? (
                    <span>Qayta yuborish: <strong className="font-mono text-indigo-600 dark:text-indigo-400">00:{timer < 10 ? `0${timer}` : timer}</strong></span>
                  ) : (
                    <span className="text-red-500">Vaqt tugadi</span>
                  )}
                </span>

                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => {
                    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedCode(newCode);
                    setTimer(60);
                  }}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Kodni qayta yuborish</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsVerifying(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Ortga
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmVerification}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Tasdiqlanmoqda...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tasdiqlash va Roʻyxatdan Oʻtish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : mode === 'register' ? (
            /* STEP 1: REGISTRATION FORM */
            <div className="space-y-4">
              {/* Method Switch: Email or Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tasdiqlash usulini tanlang:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMethod('email');
                      setErrorMsg(null);
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      method === 'email'
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Elektron Pochta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMethod('phone');
                      setErrorMsg(null);
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      method === 'phone'
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Telefon Raqami</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Ism va Familiyangiz:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masalan: Sardorbek Aliyev"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Email or Phone field based on choice */}
              {method === 'email' ? (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Elektron pochta manzili (Tasdiqlash kodi uchun):
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="talaba@domain.uz yoki gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Telefon raqamingiz (SMS tasdiqlash uchun):
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Parol yarating (kamida 6 ta belgi):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Bonus banner */}
              <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-2.5 text-xs text-indigo-900 dark:text-indigo-200">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>
                  Roʻyxatdan oʻtib tasdiqlasangiz, reyting jadvali uchun <strong>+100 ball</strong> boshlangʻich bonus beriladi!
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={sendVerificationCode}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tasdiqlash Kodini Yuborish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Method Switch: Email or Phone */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    method === 'email'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Elektron Pochta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    method === 'phone'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Telefon Raqam</span>
                </button>
              </div>

              {method === 'email' ? (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Elektron pochta:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adashevoybekjon@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Telefon raqami:
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Parol:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{isSubmitting ? 'Kirilmoqda...' : 'Tizimga Kirish'}</span>
              </button>

              {/* Demo quick login hint */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('adashevoybekjon@gmail.com');
                    setPassword('123456');
                    setFullName('Oybekjon Adashev');
                  }}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  ⚡ Demo akkaunt maʼlumotlarini toʻldirish
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
