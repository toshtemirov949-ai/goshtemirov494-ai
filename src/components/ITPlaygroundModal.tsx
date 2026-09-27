import React, { useState } from 'react';
import { X, Play, Code2, RefreshCw, Terminal, CheckCircle2, Sparkles } from 'lucide-react';
import { CODE_SNIPPETS, CodeSnippet } from '../data/itPlaygroundData';

interface ITPlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ITPlaygroundModal: React.FC<ITPlaygroundModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(CODE_SNIPPETS[0]);
  const [code, setCode] = useState<string>(CODE_SNIPPETS[0].initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string>('Kod ishga tushishga tayyor.');

  if (!isOpen) return null;

  const handleSelectSnippet = (snippet: CodeSnippet) => {
    setSelectedSnippet(snippet);
    setCode(snippet.initialCode);
    setConsoleOutput('Yangi namuna yuklandi.');
  };

  const handleRunCode = () => {
    if (selectedSnippet.language === 'javascript') {
      try {
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args: unknown[]) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        // Run safe JS evaluation
        // eslint-disable-next-line no-eval
        eval(code);
        console.log = originalLog;
        setConsoleOutput(logs.length ? logs.join('\n') : 'Kod xatosiz bajarildi, chiqish boʻsh.');
      } catch (err: unknown) {
        setConsoleOutput(`Xatolik: ${(err as Error).message}`);
      }
    } else {
      setConsoleOutput('HTML & CSS oldindan koʻrish oynasi yangilandi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>IT & Dasturlash Interaktiv Sandbox</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.2 rounded">
                  Live Runner
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Frontend, Algoritmika va Zamonaviy Veb Kodlarini real vaqtda sinab koʻring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCode}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Ishga Tushirish</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Yopish"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Snippet selector tabs */}
        <div className="px-4 py-2 border-b border-slate-800 bg-slate-950 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-500 font-medium shrink-0">Tayyor namunalar:</span>
          {CODE_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => handleSelectSnippet(snippet)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedSnippet.id === snippet.id
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {snippet.title}
            </button>
          ))}
        </div>

        {/* Workspace Split: Editor & Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Code Editor (6 or 7 cols) */}
          <div className="lg:col-span-6 flex flex-col border-r border-slate-800 bg-slate-950">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Tahrirlagich ({selectedSnippet.language.toUpperCase()})</span>
              <button
                onClick={() => setCode(selectedSnippet.initialCode)}
                className="hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                title="Kodni qayta tiklash"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Qayta tiklash</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 font-mono text-xs sm:text-sm bg-slate-950 text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-indigo-700 selection:text-white"
            />
          </div>

          {/* Live Preview / Terminal (6 cols) */}
          <div className="lg:col-span-6 flex flex-col bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-950/50">
              <span className="font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                {selectedSnippet.language === 'javascript' ? 'Konsol Chiqishi' : 'Brauzer Natijasi'}
              </span>
              <span className="text-[11px] text-slate-500">Avtomatik yangilanadi</span>
            </div>

            {selectedSnippet.language === 'javascript' ? (
              <div className="flex-1 p-4 font-mono text-xs text-emerald-400 bg-black/60 overflow-y-auto whitespace-pre-wrap">
                {consoleOutput}
              </div>
            ) : (
              <div className="flex-1 bg-white relative">
                <iframe
                  title="Live Preview"
                  srcDoc={code}
                  sandbox="allow-scripts"
                  className="w-full h-full border-none"
                />
              </div>
            )}

            {/* Hint Box at bottom */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {selectedSnippet.description}
              </span>
              <span className="text-emerald-400 font-mono hidden sm:inline">Ctrl+Enter = Run</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
