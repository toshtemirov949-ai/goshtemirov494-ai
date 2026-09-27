import React, { useState } from 'react';
import { 
  X, Lock, ShieldCheck, UserCheck, AlertCircle, ArrowRight, 
  Sparkles, KeyRound, CheckCircle2, Eye, EyeOff, ShieldAlert
} from 'lucide-react';
import { 
  getStoredAdminSettings, 
  setStoredAdminAuth, 
  addAdminLog 
} from '../utils/adminStorage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdminLogin: () => void;
  onOpenStudentCabinet?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessAdminLogin,
  onOpenStudentCabinet,
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const settings = getStoredAdminSettings();
    const targetLogin = settings.adminLogin || '1';
    const targetPassword = settings.adminPassword || '1';

    setTimeout(() => {
      setIsLoading(false);
      // Validate credentials: Login: 1, Parol: 1
      if (login.trim() === targetLogin && password.trim() === targetPassword) {
        setStoredAdminAuth(true);
        addAdminLog(
          'LOGIN', 
          'Admin muvaffaqiyatli kirdi', 
          `Bosh admin paneliga muvaffaqiyatli kirildi (Login: ${targetLogin})`, 
          'success',
          'Bosh Administrator'
        );
        onSuccessAdminLogin();
      } else {
        setErrorMessage('Login yoki parol notoʻgʻri! (Admin uchun: Login: 1, Parol: 1)');
        addAdminLog(
          'SECURITY', 
          'Muvaffaqiyatsiz kirish urinishi', 
          `Notoʻgʻri login/parol kiritildi: "${login}"`, 
          'warning',
          'Mehmon'
        );
      }
    }, 300);
  };

  const handleQuickFill = () => {
    setLogin('1');
    setPassword('1');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-gradient-to-br from-[#0c2340] via-[#09325c] to-[#0a1e38] text-white rounded-3xl shadow-2xl shadow-blue-950/80 border border-blue-500/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glowing ambient accent */}
        <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"></div>

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-blue-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-cyan-300 mb-1 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Kabinetga Kirish
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/80">
              Admin boshqaruv tizimi va boshqaruv paneliga xavfsiz kirish
            </p>
          </div>

          {/* Prompt / Credentials Notice Box */}
          <div className="p-3.5 rounded-2xl bg-[#081e3d] border border-blue-600/50 flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs">
              <span className="font-bold text-cyan-300">
                Admin Kabineti Maʼlumotlari:
              </span>
              <div className="mt-1 flex items-center justify-between text-blue-200">
                <span>Login: <strong className="text-white">1</strong> &nbsp;·&nbsp; Parol: <strong className="text-white">1</strong></span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="font-bold underline text-cyan-300 hover:text-white cursor-pointer"
                >
                  Avto toʻldirish
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in shake duration-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-blue-200">
                Login
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Loginni kiriting (masalan: 1)"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 bg-[#071c36] text-white placeholder-blue-300/50 rounded-xl border border-blue-700/60 focus:outline-none focus:border-cyan-400 text-sm font-medium transition-colors"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-blue-200">
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Parolni kiriting (masalan: 1)"
                  required
                  className="w-full pl-4 pr-11 py-2.5 bg-[#071c36] text-white placeholder-blue-300/50 rounded-xl border border-blue-700/60 focus:outline-none focus:border-cyan-400 text-sm font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white p-1 cursor-pointer"
                  title={showPassword ? 'Yashirish' : 'Koʻrsatish'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Admin Kabinetiga Kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
