import React, { useRef } from 'react';
import { X, Award, CheckCircle2, Download, Printer, ShieldCheck } from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors">
        
        {/* Top Actions Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Rasmiy Tasdiqlangan Sertifikat</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop etish / Saqlash</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Yopish"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Decorative Border and Parchment Canvas */}
        <div className="p-6 sm:p-10 bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex justify-center">
          <div 
            ref={printRef}
            className="w-full bg-white border-8 border-double border-indigo-900/20 p-8 sm:p-12 rounded-xl shadow-lg relative text-center flex flex-col justify-between min-h-[460px]"
          >
            {/* Corner Filigree Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-indigo-900"></div>
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-indigo-900"></div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-indigo-900"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-indigo-900"></div>

            {/* Institution Brand */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold text-lg">
                  Z
                </span>
                <span className="text-xl font-extrabold tracking-tight text-indigo-950 uppercase">
                  ZiyoTalim Akademiyasi
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-6">
                Zamonaviy Taʼlim & Xalqaro Standartlar Instituti
              </p>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight mb-2">
                MAXSUS SERTIFIKAT
              </h2>
              <p className="text-xs text-slate-500 italic mb-6">
                Ushbu rasmiy hujjat quyidagi talabaga topshiriladi:
              </p>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 underline decoration-indigo-300 underline-offset-8 mb-4">
                {certificate.recipientName}
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed mb-6">
                <strong>"{certificate.courseTitle}"</strong> yoʻnalishi boʻyicha barcha nazariy va amaliy modullarni muvaffaqiyatli tamomlaganligi va yakuniy attestatsiya sinovidan <strong>{certificate.grade}</strong> natijani qayd etganligi tasdiqlanadi.
              </p>
            </div>

            {/* Certificate Footer: Seal & Signatures */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 items-end text-xs">
              <div className="text-left">
                <p className="font-semibold text-slate-800">Sana:</p>
                <p className="text-slate-600 font-mono">{certificate.issueDate}</p>
                <p className="text-[10px] text-slate-400 mt-1">ID: {certificate.verificationCode}</p>
              </div>

              {/* Gold Medalist Stamp */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 flex flex-col items-center justify-center shadow-md border-2 border-amber-600">
                  <Award className="w-7 h-7 text-amber-950" />
                  <span className="text-[8px] font-extrabold tracking-tighter uppercase">VERIFIED</span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-800">Akademiya Kengashi</p>
                <div className="h-6 flex items-center justify-end">
                  <span className="font-serif italic text-indigo-900 font-bold text-sm">ZiyoTalim Board</span>
                </div>
                <p className="text-[10px] text-slate-400">Direktor imzosi</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
