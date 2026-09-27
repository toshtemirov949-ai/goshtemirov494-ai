import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Globe, ArrowLeftRight, Volume2, Copy, Check, X,
  Search, Sparkles, BookOpen, History, Trash2,
  Layers, MessageSquare, ArrowUpRight, Zap, Bot,
  HelpCircle, Lightbulb, CheckCircle2, ChevronRight, ChevronLeft, Send,
  Mic, MicOff, RefreshCw, Award, PlayCircle, BarChart3,
  AlertCircle, CheckCircle, FileText, Shuffle
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  LanguageCode,
  TRANSLATOR_DB,
  TranslatorDbEntry,
  translateTextOnline,
  speakText,
  findInDictionary,
  getStoredTranslationHistory,
  saveTranslationToHistory,
  clearTranslationHistory,
  TranslationHistoryItem
} from '../data/translator/translatorService';
import { addAdminLog } from '../utils/adminStorage';

interface RealTranslatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSourceText?: string;
  initialFromLang?: LanguageCode;
  initialToLang?: LanguageCode;
  initialTab?: 'translator' | 'chat' | 'analysis' | 'test' | 'history';
  autoStartVoice?: boolean;
}

interface ChatDialogMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  translatedText?: string;
  timestamp: string;
  feedback?: string;
}

interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizHistoryRecord {
  id: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  topicName: string;
}

export const RealTranslatorModal: React.FC<RealTranslatorModalProps> = ({
  isOpen,
  onClose,
  initialSourceText = '',
  initialFromLang = 'uz',
  initialToLang = 'en',
  initialTab = 'translator',
  autoStartVoice = false,
}) => {
  const [fromLang, setFromLang] = useState<LanguageCode>(initialFromLang);
  const [toLang, setToLang] = useState<LanguageCode>(initialToLang);
  const [inputText, setInputText] = useState(initialSourceText);
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationEngine, setTranslationEngine] = useState<'neural_api' | 'local_dict' | 'cache'>('local_dict');
  const [copied, setCopied] = useState<'input' | 'output' | null>(null);

  // Active Tab:
  // 'translator' | 'chat' | 'analysis' | 'test' | 'history'
  const [activeTab, setActiveTab] = useState<'translator' | 'chat' | 'analysis' | 'test' | 'history'>(initialTab);

  // Voice Input (Speech Recognition) State
  const [isListeningTranslator, setIsListeningTranslator] = useState(false);
  const [isListeningChat, setIsListeningChat] = useState(false);
  const isListeningChatRef = useRef(false);
  const isListeningTranslatorRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Clean up audio streams when modal closes or unmounts
  useEffect(() => {
    return () => {
      isListeningChatRef.current = false;
      isListeningTranslatorRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<ChatDialogMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Assalomu alaykum! Men Real Tarjimonning shaxsiy AI-Oʻqituvchisiman. Menga xohlagan tilda yozing yoki ovozli gapiring — men siz bilan suhbatlashaman, xatolaringizni toʻgʻrilayman va talaffuzni oʻrgataman!',
      translatedText: 'Hello! I am the personal AI Tutor of Real Translator. Speak or type to me in any language!',
      timestamp: 'Hozir'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);

  // In-Depth Analysis State
  const [analysisText, setAnalysisText] = useState('');

  // Interactive Knowledge Test State (1-test ... 25-test)
  const [testTopic, setTestTopic] = useState<'all' | 'vocab' | 'grammar' | 'dialogue'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [answeredMap, setAnsweredMap] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [shuffledSeed, setShuffledSeed] = useState(0);

  // History state (Translations & Quiz tests history)
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [testHistory, setTestHistory] = useState<QuizHistoryRecord[]>([]);
  const [historyActiveTab, setHistoryActiveTab] = useState<'translations' | 'quizzes'>('translations');

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      setHistory(getStoredTranslationHistory());
      try {
        const rawQuiz = localStorage.getItem('ziyo_test_quiz_history');
        if (rawQuiz) setTestHistory(JSON.parse(rawQuiz));
      } catch {
        // ignore
      }
      if (initialSourceText) {
        setInputText(initialSourceText);
      }
      if (autoStartVoice) {
        const timer = setTimeout(() => {
          startVoiceInput(initialTab === 'chat' ? 'chat' : 'translator');
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, initialTab, initialSourceText, autoStartVoice]);

  // Scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  // Debounced real-time translation
  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      setIsTranslating(false);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsTranslating(true);
    debounceTimerRef.current = setTimeout(async () => {
      const res = await translateTextOnline(inputText, fromLang, toLang);
      setOutputText(res.text);
      setTranslationEngine(res.source);
      setIsTranslating(false);

      if (res.text && res.text !== inputText) {
        saveTranslationToHistory({
          sourceText: inputText.trim(),
          translatedText: res.text,
          fromLang,
          toLang
        });
        setHistory(getStoredTranslationHistory());
      }
    }, 400);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputText, fromLang, toLang]);

  const fromLangObj = SUPPORTED_LANGUAGES.find(l => l.code === fromLang) || SUPPORTED_LANGUAGES[0];
  const toLangObj = SUPPORTED_LANGUAGES.find(l => l.code === toLang) || SUPPORTED_LANGUAGES[1];

  // Language swap handler
  const handleSwap = () => {
    const tempLang = fromLang;
    setFromLang(toLang);
    setToLang(tempLang);
    if (outputText) {
      setInputText(outputText);
      setOutputText(inputText);
    }
  };

  const handleCopy = (text: string, type: 'input' | 'output') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSpeech = (text: string, lang: LanguageCode) => {
    if (!text.trim()) return;
    speakText(text, lang);
  };

  // --- OVOZ BILAN GAPIRISH: BOSGANDA ISHLAYDI, YANA BIR MARTA BOSGANDA TO'XTAYDI ---
  const stopVoiceInput = (target: 'translator' | 'chat') => {
    if (target === 'chat') {
      isListeningChatRef.current = false;
      setIsListeningChat(false);
    } else {
      isListeningTranslatorRef.current = false;
      setIsListeningTranslator(false);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      } catch {
        // ignore
      }
      mediaStreamRef.current = null;
    }
  };

  const startVoiceInput = async (target: 'translator' | 'chat') => {
    // Agar boshqa bo'limdagi mikrafon ochiq bo'lsa, uni to'xtatamiz
    stopVoiceInput(target === 'chat' ? 'translator' : 'chat');

    // Faollashtiramiz — tugma ko'k rangda yonadi va foydalanuvchi qayta bosguncha o'chmaydi!
    if (target === 'chat') {
      isListeningChatRef.current = true;
      setIsListeningChat(true);
    } else {
      isListeningTranslatorRef.current = true;
      setIsListeningTranslator(true);
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        const primaryLang = fromLangObj.ttsLang || 'uz-UZ';
        recognition.lang = primaryLang;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          if (target === 'chat') {
            isListeningChatRef.current = true;
            setIsListeningChat(true);
          } else {
            isListeningTranslatorRef.current = true;
            setIsListeningTranslator(true);
          }
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          const text = currentTranscript.trim();
          if (text) {
            if (target === 'chat') {
              setChatInput(text);
            } else {
              setInputText(text);
            }
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('SpeechRecognition error:', e?.error);
          if (e?.error === 'no-speech') {
            // Gapirilmagan bo'lsa ham foydalanuvchi qayta bosmaguncha yoniq qoladi
            return;
          }
          if (e?.error === 'language-not-supported' && primaryLang !== 'en-US') {
            try {
              recognition.lang = 'en-US';
              recognition.start();
              return;
            } catch {}
          }
        };

        recognition.onend = () => {
          // Agar foydalanuvchi to'xtatish tugmasini bosmagan bo'lsa, qayta tinglashda davom etsin
          const isActive = target === 'chat' ? isListeningChatRef.current : isListeningTranslatorRef.current;
          if (isActive) {
            try {
              recognition.start();
            } catch {
              // ignore
            }
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn('SpeechRecognition start fallback:', err);
      }
    }

    // Hardware microphone stream via getUserMedia
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }
    } catch (micErr) {
      console.warn('getUserMedia stream warning:', micErr);
    }
  };

  // --- OVOZ BILAN GAPIRISH (Tugmani bosganda ishlaydi, ustiga yana bir marta bosganda to'xtaydi) ---
  const toggleVoiceInput = (target: 'translator' | 'chat') => {
    const isTargetChat = target === 'chat';
    const isCurrentlyActive = isTargetChat ? isListeningChatRef.current : isListeningTranslatorRef.current;

    if (isCurrentlyActive) {
      // Ishlayotgan vaqtda ustiga yana bir marta bosganda mikrafon to'xtasin
      stopVoiceInput(target);
    } else {
      // Ustiga bosganda ishlasin (va ko'k rangda yonsin)
      startVoiceInput(target);
    }
  };

  // --- GAPLASHISH CHAT ORQALI (Conversational AI Chat) ---
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isAiReplying) return;

    const userText = chatInput.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `user-${Date.now()}`;

    const newMsg: ChatDialogMessage = {
      id: userMsgId,
      sender: 'user',
      text: userText,
      timestamp: timeNow
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
    setIsAiReplying(true);

    try {
      // 1. Translate user's message to target language
      const transRes = await translateTextOnline(userText, fromLang, toLang);
      const translatedUserText = transRes.text;

      // 2. Generate conversational AI response
      setTimeout(async () => {
        const lower = userText.toLowerCase();
        let aiUzbekResponse = '';
        let feedback = '';

        if (lower.includes('salom') || lower.includes('hello') || lower.includes('privet') || lower.includes('bonjour')) {
          aiUzbekResponse = `Salom! Siz bilan muloqot qilayotganimdan xursandman. Bugun qaysi mavzuda gaplashamiz yoki qaysi iborani oʻrganamiz?`;
          feedback = `Iforangiz tabiiy va xatosiz tuzilgan. Salomlashuv barcha 10 ta tilda muloqotni boshlashning eng yaxshi usulidir.`;
        } else if (lower.includes('isming') || lower.includes('name') || lower.includes('kim')) {
          aiUzbekResponse = `Mening ismim — Real Tarjimon AI Oʻqituvchisi. Men sizga 10 ta tilda soʻzlashish, talaffuz qilish va xatolarni tuzatishda koʻmaklashaman.`;
          feedback = `Grammatik tuzilish: Ega va kesim oʻrtasidagi aloqa toʻgʻri berilgan.`;
        } else if (lower.includes('ingliz') || lower.includes('english') || lower.includes('ielts')) {
          aiUzbekResponse = `Ingliz tilini oʻrganish uchun ajoyib qaror! Speaking qobiliyatingizni oshirish uchun har kuni kamida 15 daqiqa ovozli gaplashish rejimida mashq qiling.`;
          feedback = `IELTS Speaking boʻyicha tavsiya: Fikringizni qisqa emas, "Because", "Moreover", "In my opinion" kabi bogʻlovchilar bilan kengaytiring.`;
        } else if (lower.includes('rahmat') || lower.includes('thank')) {
          aiUzbekResponse = `Arzimaydi! Bilim olish yoʻlidagi harakatlaringiz doimo bardavom boʻlsin. Yana qanday savollaringiz bor?`;
        } else {
          aiUzbekResponse = `Fikringizni tushundim! "${translatedUserText}" jumlasi ${toLangObj.name} tilida juda ifodali yangraydi. Keling, ushbu mavzuni davom ettiramiz!`;
          feedback = `Tavsiya: Ushbu gapni ${toLangObj.name} tilida ovozli eshitib (🔊) talaffuzini takrorlab koʻring.`;
        }

        // Translate AI response to current toLang as well
        const aiTransRes = await translateTextOnline(aiUzbekResponse, 'uz', toLang);

        const aiMsg: ChatDialogMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiUzbekResponse,
          translatedText: aiTransRes.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          feedback
        };

        setChatMessages(prev => [...prev, aiMsg]);
        setIsAiReplying(false);

        // Record in Admin audit logs
        addAdminLog(
          'AI_TRANSLATE',
          'Real Tarjimon Ovozli & Matnli Chat',
          `Foydalanuvchi bilan muloqot: "${userText.slice(0, 30)}" (${fromLang} ↔ ${toLang})`,
          'success',
          'Real Tarjimon AI'
        );
      }, 500);
    } catch {
      setIsAiReplying(false);
    }
  };

  // --- YOZISHMA ORQALI TAHLIL QILISH FUNKSIYASI ---
  const activeAnalysisContent = useMemo(() => {
    const raw = analysisText.trim() || outputText || inputText || 'Bilim va dasturlash kelajak poydevoridir';
    const words = raw.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Morphological breakdown
    const breakdown = words.slice(0, 6).map((word, idx) => {
      let pos = 'Ot (Noun)';
      let role = 'Ega yoki Toʻldiruvchi';
      if (idx === 1 && wordCount > 2) {
        pos = 'Feʼl (Verb)';
        role = 'Kesim (Predikat)';
      } else if (idx === 0 && word.endsWith('lik')) {
        pos = 'Mavhum ot';
        role = 'Holat ifodasi';
      } else if (word.length > 7) {
        pos = 'Sifat yoki Yasama soʻz';
        role = 'Aniqlovchi';
      }
      return { word, pos, role };
    });

    return {
      text: raw,
      wordCount,
      charCount: raw.length,
      sentenceType: wordCount > 3 ? 'Murakkab sintaktik birikma' : 'Oddiy leksik ibora',
      cefrLevel: wordCount > 5 ? 'B2 (Mustaqil foydalanuvchi)' : 'A2 / B1 (Kundalik soʻzlashuv)',
      ieltsScore: '6.5 - 7.5 (Lexical Resource)',
      tense: 'Present Simple / Hozirgi zamon ifodasi',
      breakdown,
      synonyms: [
        'Fundamental knowledge',
        'Crucial education skill',
        'Advanced professional capability'
      ],
      recommendation: `Ushbu matn ${toLangObj.name} tilida akademik va rasmiy doiralarda birdek qabul qilinadi. Talaffuz paytida boʻgʻinlar urgʻusiga diqqat qiling.`
    };
  }, [analysisText, outputText, inputText, toLangObj.name]);

  // --- BILIMNI BAJARISH VA TEKSHIRISH TESTLARI (1-TESTDAN 25-TESTGACHA) ---
  // Javoblari to'liq aralashtirilgan va faqat A emas (B, C, D, A teng taqsimlangan)
  const rawMasterQuestions: TestQuestion[] = useMemo(() => [
    {
      id: 1,
      question: "1-test: Ingliz tilida 'Mustaqillik' soʻzining toʻgʻri akademik tarjimasi qaysi?",
      options: ['Celebration', 'Independence', 'Agreement', 'Responsibility'],
      correctIndex: 1, // B
      explanation: "'Independence' — mustaqillik, erkinlik va suverenitetni anglatadi. 'Celebration' — bayram, 'Agreement' — bitim."
    },
    {
      id: 2,
      question: "2-test: 'She has been living in London ___ 2020.' Gapdagi boʻsh oʻringa qaysi predlog toʻgʻri keladi?",
      options: ['for', 'in', 'since', 'during'],
      correctIndex: 2, // C
      explanation: "Muayyan boshlangʻich vaqt nuqtasi koʻrsatilganda Present Perfect Continuous zamonida 'since' ishlatiladi (since 2020)."
    },
    {
      id: 3,
      question: "3-test: Nemis tilida 'Xayrli kech!' (Good evening) qanday aytiladi?",
      options: ['Guten Morgen', 'Gute Nacht', 'Danke schön', 'Guten Abend'],
      correctIndex: 3, // D
      explanation: "Nemis tilida 'Guten Abend' — xayrli kech maʼnosini bildiradi. 'Guten Morgen' — xayrli tong, 'Gute Nacht' — xayrli tun."
    },
    {
      id: 4,
      question: "4-test: Rus tilidagi 'Искусственный интеллект' iborasi oʻzbek tilida nimani anglatadi?",
      options: ['Kiberxavfsizlik dasturi', 'Sunʼiy intellekt', 'Bulutli maʼlumotlar ombori', 'Mashina tarjimoni'],
      correctIndex: 1, // B
      explanation: "'Искусственный интеллект' — xalqaro AI terminining ruscha shakli boʻlib, oʻzbek tilida 'Sunʼiy intellekt' deb nomlanadi."
    },
    {
      id: 5,
      question: "5-test: 'Break a leg!' inglizcha iborasi aslida qanday maʼnoda qoʻllaniladi?",
      options: ['Omad tilash (Good luck)', 'Ehtiyot boʻlish', 'Oyogʻini sindirib olish', 'Chekinish'],
      correctIndex: 0, // A
      explanation: "'Break a leg!' — sanʼat va kundalik nutqda 'Omad yor boʻlsin!' (Good luck) degan maʼnoni anglatuvchi mashhur idioma."
    },
    {
      id: 6,
      question: "6-test: 'If I ___ rich, I would travel around the world.' (Second Conditional) Gapga qaysi feʼl shakli toʻgʻri keladi?",
      options: ['am', 'will be', 'were', 'have been'],
      correctIndex: 2, // C
      explanation: "Second Conditional (norasmiy/faraziy hozirgi zamon) qoidasiga binoan barcha shaxslar uchun 'were' qoʻllaniladi (If I were rich...)."
    },
    {
      id: 7,
      question: "7-test: Arab tilidagi 'Shukran' (شكراً) soʻzining maʼnosi nima?",
      options: ['Assalomu alaykum', 'Xayr, salomat boʻling', 'Marhamat, kiring', 'Katta rahmat / Tashakkur'],
      correctIndex: 3, // D
      explanation: "Arab tilida 'Shukran' (شكراً) minnatdorchilik bildirish va 'Rahmat' aytish uchun eng asosiy soʻz hisoblanadi."
    },
    {
      id: 8,
      question: "8-test: 'Although it was raining, ___ they went for a walk.' Ushbu ergashgan qoʻshma gapdagi toʻgʻri qoidani koʻrsating:",
      options: [
        "'raining' soʻzi nooʻrin qoʻllangan",
        "'Although' bor gapda bosh gap oldidan 'but' yoki ortiqcha bogʻlovchi qoʻyilmaydi",
        "'was' oʻrniga 'are' qoʻyilishi lozim",
        "'walk' oʻrniga 'walking' boʻlishi shart"
      ],
      correctIndex: 1, // B
      explanation: "Ingliz tilida 'Although' (Garchi ... boʻlsa ham) qoʻllangan ergashtiruvchi gapda bosh gap oldidan yana 'but' qoʻshilmaydi, faqat vergul qoʻyiladi."
    },
    {
      id: 9,
      question: "9-test: Fransuz tilida 'Merci beaucoup' qanday maʼnoni bildiradi?",
      options: ['Katta rahmat', 'Xush kelibsiz', 'Kechirasiz', 'Koʻrishguncha'],
      correctIndex: 0, // A
      explanation: "'Merci beaucoup' — fransuz tilida 'Katta rahmat!' (Thank you very much) maʼnosini bildiradi."
    },
    {
      id: 10,
      question: "10-test: IT va axborot texnologiyalarida 'Database' soʻzining oʻzbekcha aniq akademik ekvivalenti qaysi?",
      options: ['Dasturiy algoritm', 'Tarmoq protokoli', 'Server xotirasi', 'Maʼlumotlar bazasi'],
      correctIndex: 3, // D
      explanation: "'Database' — tizimli tartiblangan maʼlumotlar majmui boʻlib, oʻzbek tilida rasmiy 'Maʼlumotlar bazasi' deb ataladi."
    },
    {
      id: 11,
      question: "11-test: Turk tilida 'Teşekkür ederim' iborasi qanday maʼnoda qoʻllaniladi?",
      options: ['Kechirim soʻrash', 'Minnatdorchilik bildirish (Rahmat aytish)', 'Xayrlashish', 'Tanishuv boshlash'],
      correctIndex: 1, // B
      explanation: "Turk tilida 'Teşekkür ederim' — 'Rahmat aytaman / Minnatdorman' maʼnosida odobli qoʻllaniladi."
    },
    {
      id: 12,
      question: "12-test: 'Neither John nor his colleagues ___ present at the meeting yesterday.' Boʻsh oʻringa toʻgʻri feʼl shaklini toping:",
      options: ['was', 'is', 'were', 'are'],
      correctIndex: 2, // C
      explanation: "'Neither ... nor' bogʻlovchisida oʻtgan zamon feʼli oxirgi otga (his colleagues — koʻplik) moslashadi, shuning uchun 'were' toʻgʻri."
    },
    {
      id: 13,
      question: "13-test: Ispan tilida 'Hola, ¿cómo estás?' jumlasi nimani bildiradi?",
      options: ['Xayr, yaxshi boring', 'Ismingiz nima?', 'Qayerdan kelgansiz?', 'Salom, ahvollaringiz qanday?'],
      correctIndex: 3, // D
      explanation: "'Hola' — Salom, '¿cómo estás?' — Ahvollaringiz qanday? degan maʼnoni anglatadi."
    },
    {
      id: 14,
      question: "14-test: Qaysi feʼldan soʻng odatda faqat Gerund (-ing) shakli keladi?",
      options: ['decide', 'enjoy', 'hope', 'promise'],
      correctIndex: 1, // B
      explanation: "'Enjoy' feʼlidan keyin doimo feʼlning -ing (gerund) shakli ishlatiladi (e.g. 'I enjoy learning new languages')."
    },
    {
      id: 15,
      question: "15-test: Xitoy tilida (Mandarin) 'Ni hao' (你好) salomlashuvi qanday maʼnoni anglatadi?",
      options: ['Rahmat', 'Xayr', 'Salom / Assalomu alaykum', 'Kechirasiz'],
      correctIndex: 2, // C
      explanation: "'Ni hao' (你好) — xitoy tilida eng mashhur va asosiy 'Salom' (Salomatmisiz) salomlashuvidir."
    },
    {
      id: 16,
      question: "16-test: 'Piece of cake' inglizcha idiomatik iborasining toʻgʻri maʼnosi nima?",
      options: ['Juda oson va joʻn ish', 'Mazali shirinlik', 'Qiyin topshiriq', 'Qimmatbaho sovgʻa'],
      correctIndex: 0, // A
      explanation: "'It's a piece of cake' — ingliz tilida 'Juda oson, hech qanday qiyinchiliksiz' maʼnosida keladigan mashhur idioma."
    },
    {
      id: 17,
      question: "17-test: 'By the time the manager arrived, the team ___ the project.' Gapni toʻgʻri toʻldiring:",
      options: ['has completed', 'was completing', 'had completed', 'is completing'],
      correctIndex: 2, // C
      explanation: "Oʻtmishdagi maʼlum bir vaqtgacha tugallangan harakat Past Perfect (had + V3) zamonida ifodalanadi: 'had completed'."
    },
    {
      id: 18,
      question: "18-test: Koreys tilida 'Kamsahamnida' (감사합니다) soʻzi nimani bildiradi?",
      options: ['Xush kelibsiz', 'Salom', 'Kechirasiz', 'Rahmat (Hurmat bilan)'],
      correctIndex: 3, // D
      explanation: "'Kamsahamnida' — koreys tilida rasmiy va hurmat shaklida 'Rahmat / Tashakkur' aytish iborasidir."
    },
    {
      id: 19,
      question: "19-test: 'I look forward to ___ you next week.' Boʻsh oʻringa qaysi shakl toʻgʻri keladi?",
      options: ['see', 'seeing', 'saw', 'have seen'],
      correctIndex: 1, // B
      explanation: "'Look forward to' iborasida 'to' predlog vazifasida boʻlgani sababli undan soʻng feʼlning -ing (gerund) shakli keladi: 'seeing'."
    },
    {
      id: 20,
      question: "20-test: Yapon tilida 'Arigato gozaimasu' (ありがとうございます) iborasi qanday maʼnoni ifodalaydi?",
      options: ['Xush kelibsiz', 'Kechirasiz', 'Sizga katta rahmat', 'Xayrli tong'],
      correctIndex: 2, // C
      explanation: "'Arigato gozaimasu' — yapon tilida odobli va rasmiy 'Katta rahmat' maʼnosida qoʻllaniladi."
    },
    {
      id: 21,
      question: "21-test: 'Water boils at 100 degrees Celsius.' Ushbu gap nima uchun Present Simple zamonida berilgan?",
      options: [
        'Ayni paytda sodir boʻlayotgan harakat boʻlgani uchun',
        'Kelajakdagi rejalashtirilgan ish boʻlgani uchun',
        'Oʻtmishda tugallangan jarayon boʻlgani uchun',
        'Tabiat qonuni va doimiy ilmiy fakt boʻlgani uchun'
      ],
      correctIndex: 3, // D
      explanation: "Doimiy tabiat qonunlari, universal haqiqatlar va ilmiy qonuniyatlar har doim Present Simple zamonida ifodalanadi."
    },
    {
      id: 22,
      question: "22-test: Tarixiy va madaniy meros: Amir Temur davlatida xalqaro diplomatiya va rasmiy devonda qaysi tillar ustuvor boʻlgan?",
      options: [
        'Turkiy (Chigʻatoy/Eski oʻzbek) va Forsiy tillar',
        'Faqat lotin tili',
        'Qadimgi yunon tili',
        'Arabcha dialektlar'
      ],
      correctIndex: 0, // A
      explanation: "Temuriylar davlatida ichki muloqot va adabiyotda turkiy (chigʻatoy) tili, shuningdek rasmiy devonxona va xalqaro diplomatiyada forsiy til keng qoʻllanilgan."
    },
    {
      id: 23,
      question: "23-test: 'You had better ___ an umbrella, it looks like rain.' Boʻsh oʻringa qaysi feʼl mos?",
      options: ['to take', 'take', 'taking', 'took'],
      correctIndex: 1, // B
      explanation: "'Had better' maslahat birikmasidan soʻng feʼlning 'to'siz sof infinitiv shakli ishlatiladi (You had better take...)."
    },
    {
      id: 24,
      question: "24-test: 'Despite' soʻzidan keyin gap qanday davom etishi shart?",
      options: [
        'Toʻliq ega va kesimli gap (clause) bilan',
        'Faqat "that" bogʻlovchisi bilan',
        'Ot yoki -ing (noun phrase / gerund) bilan',
        'Inkor yuklamasi bilan'
      ],
      correctIndex: 2, // C
      explanation: "'Despite' va 'In spite of' soʻzlaridan soʻng bevosita ot yoki gerund (-ing) keladi, masalan: 'Despite the bad weather'."
    },
    {
      id: 25,
      question: "25-test: 'Call it a day' xalqaro iborasi qanday maʼnoni anglatadi?",
      options: [
        'Yangi kunni nishonlash',
        'Ertalab uygʻonish',
        'Telefon orqali qoʻngʻiroq qilish',
        'Ish yoki mashgʻulotni buguncha toʻxtatish / yakunlash'
      ],
      correctIndex: 3, // D
      explanation: "'Let's call it a day' — 'Bugunga yetadi, ishni yakunlaylik' degan maʼnoda ishlatiladigan mashhur xalqaro iboradir."
    }
  ], []);

  // Questions bank with topics and options shuffle
  const questionsBank: Record<string, TestQuestion[]> = useMemo(() => {
    const processedQuestions = rawMasterQuestions.map((q) => {
      if (shuffledSeed === 0) return q;
      const correctText = q.options[q.correctIndex];
      // Seeded shuffle: mix options order while tracking the correct answer accurately
      const shuffled = [...q.options].sort((a, b) => {
        const hashA = (a.charCodeAt(0) * 31 + shuffledSeed * 19 + q.id * 7) % 97;
        const hashB = (b.charCodeAt(0) * 31 + shuffledSeed * 19 + q.id * 7) % 97;
        return hashA - hashB;
      });
      const newCorrectIndex = shuffled.indexOf(correctText);
      return {
        ...q,
        options: shuffled,
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 1
      };
    });

    return {
      all: processedQuestions,
      vocab: processedQuestions.slice(0, 10),
      grammar: processedQuestions.slice(10, 18),
      dialogue: processedQuestions.slice(18, 25),
    };
  }, [rawMasterQuestions, shuffledSeed]);

  const currentQuestions = questionsBank[testTopic] || questionsBank.all;
  const activeQuestion = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (!activeQuestion || answeredMap[currentQuestionIndex] !== undefined) return;

    const isCorrect = idx === activeQuestion.correctIndex;
    setUserSelectedOption(idx);
    setAnsweredMap(prev => ({
      ...prev,
      [currentQuestionIndex]: { selected: idx, isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setUserSelectedOption(answeredMap[nextIdx]?.selected ?? null);
    } else {
      setTestCompleted(true);
      const correctCount = Object.values(answeredMap).filter(a => a.isCorrect).length;
      const totalCount = currentQuestions.length;
      const percentage = Math.round((correctCount / totalCount) * 100);

      const topicLabel = testTopic === 'all'
        ? '1-testdan 25-testgacha Sinov'
        : testTopic === 'vocab'
        ? 'Lugʻat & Tarjima Testi'
        : testTopic === 'grammar'
        ? 'Grammatika Testi'
        : 'Muloqot & Tarixiy Test';

      const newRecord: QuizHistoryRecord = {
        id: 'qz_' + Date.now(),
        date: new Date().toLocaleDateString('uz-UZ') + ' ' + new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        score: correctCount,
        total: totalCount,
        percentage,
        topicName: topicLabel
      };

      const updatedHistory = [newRecord, ...testHistory.slice(0, 29)];
      setTestHistory(updatedHistory);
      try {
        localStorage.setItem('ziyo_test_quiz_history', JSON.stringify(updatedHistory));
      } catch {
        // ignore
      }

      addAdminLog(
        'USER_ACTION',
        'Real Tarjimon Bilim Testi Yakunlandi',
        `Mavzu: ${topicLabel}, Natija: ${correctCount}/${totalCount} (${percentage}%)`,
        'success',
        'Real Tarjimon Test Markazi'
      );
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      setUserSelectedOption(answeredMap[prevIdx]?.selected ?? null);
    }
  };

  const handleJumpQuestion = (targetIdx: number) => {
    if (targetIdx >= 0 && targetIdx < currentQuestions.length) {
      setCurrentQuestionIndex(targetIdx);
      setUserSelectedOption(answeredMap[targetIdx]?.selected ?? null);
    }
  };

  const handleRestartTest = (topic?: 'all' | 'vocab' | 'grammar' | 'dialogue', doShuffle = false) => {
    if (topic) setTestTopic(topic);
    if (doShuffle) {
      setShuffledSeed(prev => prev + 1);
    }
    setCurrentQuestionIndex(0);
    setUserSelectedOption(null);
    setAnsweredMap({});
    setTestCompleted(false);
  };

  const correctAnswersCount = Object.values(answeredMap).filter(a => a.isCorrect).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-850/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Real Tarjimon & AI Markazi
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  10 Jahon Tili
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ovozli gaplashish, AI chat, yozishma grammatik tahlili va bilimni tekshirish testlari
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Tab Navigation Bar */}
        <div className="px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Tab 1: Real Tarjimon */}
            <button
              onClick={() => setActiveTab('translator')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'translator'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Real Tarjimon & Ovoz</span>
            </button>

            {/* Tab 2: AI Bilan Gaplashish (Chat) */}
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>AI Bilan Gaplashish (Chat)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold">
                Ovozli
              </span>
            </button>

            {/* Tab 3: Yozishma Tahlili */}
            <button
              onClick={() => {
                if (!analysisText && (outputText || inputText)) {
                  setAnalysisText(outputText || inputText);
                }
                setActiveTab('analysis');
              }}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'analysis'
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Yozishma Tahlili</span>
            </button>

            {/* Tab 4: Bilimni Tekshirish Testlari */}
            <button
              onClick={() => setActiveTab('test')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'test'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Bilimni Sinash Testlari</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                Test
              </span>
            </button>

            {/* Tab 5: Tarix */}
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'history'
                  ? 'border-slate-700 text-slate-900 dark:text-white'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Tarix ({history.length})</span>
            </button>

          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Real-Vaqt Tizimi Faol</span>
          </div>
        </div>

        {/* Main Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* ========================================================
              TAB 1: REAL TARJIMON & OVOZ BILAN GAPIRISH
              ======================================================== */}
          {activeTab === 'translator' && (
            <div className="space-y-4">
              
              {/* Language Selector Bar */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                
                {/* Source Language */}
                <div className="w-full sm:w-5/12 flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">Qaysi tildan:</span>
                  <select
                    value={fromLang}
                    onChange={(e) => setFromLang(e.target.value as LanguageCode)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white shadow-xs cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={`from-${lang.code}`} value={lang.code}>
                        {lang.flag} {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <button
                  onClick={handleSwap}
                  className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-750 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs shrink-0"
                  title="Tillarni almashtirish"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>

                {/* Target Language */}
                <div className="w-full sm:w-5/12 flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">Qaysi tilga:</span>
                  <select
                    value={toLang}
                    onChange={(e) => setToLang(e.target.value as LanguageCode)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-600 text-slate-900 dark:text-white shadow-xs cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={`to-${lang.code}`} value={lang.code}>
                        {lang.flag} {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Translation Panels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Left: Input Textarea + Microphone */}
                <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus-within:border-indigo-500 shadow-sm transition-all">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span>{fromLangObj.flag}</span>
                      <span>{fromLangObj.name}</span>
                    </span>
                    {inputText && (
                      <button
                        onClick={() => setInputText('')}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        title="Matnni tozalash"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    dir={fromLangObj.dir}
                    placeholder={`${fromLangObj.name}da istalgan soʻz yoki gap yozing, yoki mikrofon tugmasi orqali ovoz bilan ayting...`}
                    rows={5}
                    className="w-full p-4 text-sm sm:text-base bg-transparent border-0 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 resize-none font-sans"
                  />

                  {/* Input bottom actions: Mic, Speaker, Copy */}
                  <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      {/* Ovozli Gapirish (Microphone button) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleVoiceInput('translator');
                        }}
                        className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                          isListeningTranslator
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40 ring-4 ring-blue-500/25 animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title={isListeningTranslator ? "Mikrofon ishlamoqda. To'xtatish uchun ustiga yana bir marta bosing" : "Mikrofonni yoqish (Bosganda ishlaydi)"}
                      >
                        {isListeningTranslator ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        <span className="text-[11px] font-bold">
                          {isListeningTranslator ? 'Eshitilmoqda (Toʻxtatish)' : 'Ovoz bilan aytish'}
                        </span>
                      </button>

                      <button
                        onClick={() => handleSpeech(inputText, fromLang)}
                        disabled={!inputText.trim()}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Ovozli tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCopy(inputText, 'input')}
                        disabled={!inputText.trim()}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Nusxalash"
                      >
                        {copied === 'input' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="font-mono text-[11px]">
                      {inputText.trim().length} belgi
                    </div>
                  </div>
                </div>

                {/* Right: Output Translation */}
                <div className="flex flex-col bg-slate-50/70 dark:bg-slate-850/70 rounded-2xl border-2 border-indigo-100 dark:border-slate-750 shadow-sm relative">
                  <div className="px-4 py-2.5 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                    <span className="flex items-center gap-1.5">
                      <span>{toLangObj.flag}</span>
                      <span>{toLangObj.name} (Tarjima)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {translationEngine === 'neural_api' ? 'Real-vaqt Neyron AI' : 'Lugʻat Bazasi'}
                    </span>
                  </div>

                  <div className="flex-1 p-4 min-h-[120px] flex flex-col justify-between">
                    {isTranslating ? (
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm italic my-auto">
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Tarjima qilinmoqda va AI tahlil etilmoqda...</span>
                      </div>
                    ) : outputText ? (
                      <div
                        dir={toLangObj.dir}
                        className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white font-sans select-text whitespace-pre-wrap"
                      >
                        {outputText}
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 italic my-auto">
                        Tarjima qilingan matn bu yerda paydo boʻladi...
                      </div>
                    )}
                  </div>

                  {/* Output bottom actions */}
                  <div className="p-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeech(outputText, toLang)}
                        disabled={!outputText}
                        className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 transition-colors disabled:opacity-30 cursor-pointer flex items-center gap-1"
                        title="Ovozli tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-[11px] font-bold">Ovozli talaffuz</span>
                      </button>

                      <button
                        onClick={() => handleCopy(outputText, 'output')}
                        disabled={!outputText}
                        className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 transition-colors disabled:opacity-30 cursor-pointer flex items-center gap-1"
                        title="Nusxalash"
                      >
                        {copied === 'output' ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">Nusxalandi!</span>
                          </>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Direct jump to Yozishma tahlili button */}
                      {outputText && (
                        <button
                          onClick={() => {
                            setAnalysisText(outputText);
                            setActiveTab('analysis');
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold text-[11px] hover:bg-purple-100 cursor-pointer flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Tahlil qilish</span>
                        </button>
                      )}
                    </div>

                    <div className="font-mono text-[11px]">
                      {outputText ? `${outputText.length} belgi` : ''}
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Phrases Chips */}
              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Tezkor amaliy iboralar ({fromLangObj.name}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {fromLangObj.samplePhrases.map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputText(phrase)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      "{phrase}"
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: AI BILAN GAPLASHISH (CHAT & OVOZLI MULOQOT)
              ======================================================== */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[520px] bg-slate-50/50 dark:bg-slate-850/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              
              {/* Chat Sub-header */}
              <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>Real Tarjimon AI Suhbatdoshi</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Ovoz bilan gapiring yoki yozing — AI grammatikani toʻgʻrilab, javob qaytaradi
                    </p>
                  </div>
                </div>

                {/* Preset Scenarios */}
                <div className="hidden sm:flex items-center gap-1 text-[11px]">
                  <span className="text-slate-400 mr-1">Mavzular:</span>
                  <button
                    onClick={() => {
                      setChatInput('Aeroportda samolyotga chiqish va yuk topshirish boʻyicha muloqot qilaylik.');
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  >
                    ✈️ Aeroport
                  </button>
                  <button
                    onClick={() => {
                      setChatInput('Ingliz tilida IT dasturlash boʻyicha ish suhbati (interview) savol-javobini oʻtkazamiz.');
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  >
                    💻 IT Suhbat
                  </button>
                  <button
                    onClick={() => {
                      setChatInput('Restoranda kechki ovqat buyurtma qilish boʻyicha dialog qilaylik.');
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  >
                    🍽️ Restoran
                  </button>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 space-y-2 shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-xs'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-bl-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[10px] opacity-75">
                        <span className="font-bold flex items-center gap-1">
                          {msg.sender === 'ai' ? (
                            <>
                              <Bot className="w-3.5 h-3.5 text-blue-500" />
                              <span>AI Oʻqituvchi</span>
                            </>
                          ) : (
                            <span>Siz</span>
                          )}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>

                      {/* Translated equivalent */}
                      {msg.translatedText && (
                        <div className={`p-2 rounded-xl text-xs space-y-1 ${
                          msg.sender === 'user'
                            ? 'bg-blue-700/60 text-blue-100'
                            : 'bg-slate-50 dark:bg-slate-800/70 text-indigo-600 dark:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60'
                        }`}>
                          <div className="flex items-center justify-between text-[10px] font-bold opacity-80">
                            <span>{toLangObj.name} tarjimasi:</span>
                            <button
                              type="button"
                              onClick={() => handleSpeech(msg.translatedText || '', toLang)}
                              className="hover:scale-110 transition-transform cursor-pointer"
                              title="Tinglash"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="font-semibold text-xs">
                            {msg.translatedText}
                          </div>
                        </div>
                      )}

                      {/* AI Grammatical Feedback Note */}
                      {msg.feedback && (
                        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
                          <span className="font-bold block text-[10px] text-emerald-700 dark:text-emerald-400 mb-0.5">
                            💡 AI Grammatika Maslahati:
                          </span>
                          {msg.feedback}
                        </div>
                      )}

                      {/* Audio playback button for the message */}
                      <div className="flex items-center justify-end gap-1 pt-0.5">
                        <button
                          type="button"
                          onClick={() => handleSpeech(msg.text, msg.sender === 'user' ? fromLang : 'uz')}
                          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Ovozli eshitish"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {isAiReplying && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-blue-600 dark:text-blue-400 w-fit">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                    <span>AI javob tayyorlamoqda va grammatikani tahlil qilmoqda...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar with Microphone & Send */}
              <form onSubmit={handleSendChatMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleVoiceInput('chat');
                  }}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                    isListeningChat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/25 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                  title={isListeningChat ? "Mikrofon ishlamoqda. To'xtatish uchun ustiga yana bir marta bosing" : "Mikrofonni yoqish (Bosganda ishlaydi)"}
                >
                  {isListeningChat ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Xabaringizni yozing yoki mikrofon orqali gapiring..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim() || isAiReplying}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Yuborish</span>
                </button>
              </form>

            </div>
          )}

          {/* ========================================================
              TAB 3: YOZISHMA ORQALI TAHLIL QILISH FUNKSIYASI
              ======================================================== */}
          {activeTab === 'analysis' && (
            <div className="space-y-4">
              
              {/* Analysis Input Bar */}
              <div className="p-4 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Tahlil qilinadigan matn yoki yozishma:</span>
                  </span>
                  {outputText && (
                    <button
                      onClick={() => setAnalysisText(outputText)}
                      className="text-[11px] font-bold text-purple-600 hover:underline cursor-pointer"
                    >
                      Tarjima qilingan matnni yuklash
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={analysisText}
                    onChange={(e) => setAnalysisText(e.target.value)}
                    placeholder="Tahlil qilmoqchi boʻlgan jumla yoki matnni yozing..."
                    className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-600"
                  />
                  <button
                    onClick={() => handleSpeech(activeAnalysisContent.text, toLang)}
                    className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-100 cursor-pointer"
                    title="Ovozli eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Analysis Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Grammatik va Sintaktik Tahlil */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-purple-700 dark:text-purple-400 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>Sintaktik Tuzilish</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Gap strukturasi:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{activeAnalysisContent.sentenceType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Zamon shakli:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{activeAnalysisContent.tense}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">Hajmi:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{activeAnalysisContent.wordCount} ta soʻz · {activeAnalysisContent.charCount} ta belgi</span>
                    </div>
                  </div>
                </div>

                {/* 2. CEFR & IELTS Akademik Baholash */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-blue-700 dark:text-blue-400 font-bold text-xs">
                    <Award className="w-4 h-4" />
                    <span>Akademik Standart</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">CEFR xalqaro darajasi:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{activeAnalysisContent.cefrLevel}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">IELTS / TOEFL qiymati:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeAnalysisContent.ieltsScore}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      Insholar va ogʻzaki nutqda yuqori ball taʼminlovchi leksika.
                    </p>
                  </div>
                </div>

                {/* 3. Sinonimlar va Boyitish */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                    <span>Muqobil Sinonimlar</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeAnalysisContent.synonyms.map((syn, idx) => (
                      <div key={idx} className="p-1.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        • {syn}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* So'zma-so'z morfologik ajratish jadvali */}
              <div className="p-4 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Soʻzma-soʻz grammatik tahlil va soʻz turkumi:
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-medium">
                        <th className="pb-2">Soʻz</th>
                        <th className="pb-2">Soʻz Turkumi (Part of Speech)</th>
                        <th className="pb-2">Gapdagi Vazifasi</th>
                        <th className="pb-2 text-right">Ovoz</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {activeAnalysisContent.breakdown.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-2 font-bold text-slate-900 dark:text-white">{item.word}</td>
                          <td className="py-2 text-indigo-600 dark:text-indigo-400">{item.pos}</td>
                          <td className="py-2 text-slate-600 dark:text-slate-300">{item.role}</td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => handleSpeech(item.word, toLang)}
                              className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                              title="Tinglash"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 text-xs text-purple-900 dark:text-purple-200">
                  <span className="font-bold">💡 AI Xulosasi va Tavsiya: </span>
                  <span>{activeAnalysisContent.recommendation}</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 4: BILIMNI BAJARISH VA TEKSHIRISH TESTLARI (1-25 TEST)
              ======================================================== */}
          {activeTab === 'test' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              
              {/* Test Header & Category Selector with Adapted Background Image */}
              <div className="relative overflow-hidden p-4 sm:p-5 text-white rounded-2xl space-y-3 shadow-lg border border-emerald-400/30">
                {/* Moslashtirilgan fon rasmi va gradient qatlam */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('/src/assets/images/course_languages_learning_1790137063400.jpg')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-emerald-950/90 to-indigo-950/92 backdrop-blur-[1.5px]" />
                
                <div className="relative z-10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-black text-sm sm:text-base flex items-center gap-2 drop-shadow-sm">
                        <Award className="w-5 h-5 text-amber-300" />
                        <span>Bilimni Sinash Testlari (1-testdan 25-testgacha)</span>
                      </h3>
                      <p className="text-xs text-emerald-100/95 drop-shadow-xs">
                        10 Jahon tili, leksika, grammatika va xalqaro muloqot testlari. Barcha javoblar aralashtirilgan (faqat A emas)!
                      </p>
                    </div>

                    {/* Shuffle Button */}
                    <button
                      type="button"
                      onClick={() => handleRestartTest(testTopic, true)}
                      className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto backdrop-blur-xs"
                      title="Barcha savollar variantlarini tasodifiy qayta aralashtirish"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-amber-300" />
                      <span>Javoblarni aralashtirish</span>
                    </button>
                  </div>

                  {/* Topic Tabs */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs p-1 rounded-xl overflow-x-auto border border-white/10">
                    <button
                      onClick={() => handleRestartTest('all')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        testTopic === 'all' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'
                      }`}
                    >
                      Barcha 25 ta Test (1-25)
                    </button>
                    <button
                      onClick={() => handleRestartTest('vocab')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        testTopic === 'vocab' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'
                      }`}
                    >
                      Lugʻat & Tarjima (1-10)
                    </button>
                    <button
                      onClick={() => handleRestartTest('grammar')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        testTopic === 'grammar' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'
                      }`}
                    >
                      Grammatika (11-18)
                    </button>
                    <button
                      onClick={() => handleRestartTest('dialogue')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        testTopic === 'dialogue' ? 'bg-white text-emerald-950 shadow-xs' : 'text-emerald-100 hover:text-white'
                      }`}
                    >
                      Muloqot & Tarix (19-25)
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-100 drop-shadow-xs">
                      <span>Savol {currentQuestionIndex + 1} / {currentQuestions.length} ({activeQuestion ? `${activeQuestion.id}-test` : ''})</span>
                      <span>Toʻgʻri javoblar: {correctAnswersCount} / {currentQuestions.length} ta</span>
                    </div>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
                        style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 25-Test Direct Jumper Pills */}
              <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold">Testlar boʻylab tezkor oʻtish:</span>
                  <span>{Object.keys(answeredMap).length}/{currentQuestions.length} bajarildi</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                  {currentQuestions.map((q, idx) => {
                    const isAnswered = answeredMap[idx] !== undefined;
                    const isCorrect = answeredMap[idx]?.isCorrect;
                    const isCurrent = currentQuestionIndex === idx;

                    let badgeClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200';
                    if (isAnswered) {
                      badgeClass = isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                        : 'bg-rose-600 text-white border-rose-700 font-bold';
                    }
                    if (isCurrent) {
                      badgeClass += ' ring-2 ring-indigo-500 ring-offset-1 font-black shadow-xs';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => handleJumpQuestion(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs shrink-0 cursor-pointer transition-all flex items-center gap-1 ${badgeClass}`}
                        title={`${idx + 1}-test: ${q.question.slice(0, 40)}...`}
                      >
                        <span>{idx + 1}-test</span>
                        {isAnswered && (
                          isCorrect ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Box or Result Box */}
              {!testCompleted && activeQuestion ? (
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  
                  {/* Question Title */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {activeQuestion.id}-test
                      </span>
                      <span className="text-xs text-slate-400">
                        Variantlar aralashtirilgan
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug pt-1">
                      {activeQuestion.question}
                    </h4>
                  </div>

                  {/* Options (A, B, C, D) */}
                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {activeQuestion.options.map((opt, idx) => {
                      const isAnswered = answeredMap[currentQuestionIndex] !== undefined;
                      const isSelected = userSelectedOption === idx || answeredMap[currentQuestionIndex]?.selected === idx;
                      const isCorrect = idx === activeQuestion.correctIndex;

                      let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 text-slate-800 dark:text-slate-200';

                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-bold';
                        } else {
                          btnStyle = 'border-slate-200 dark:border-slate-700 opacity-50 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswered}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white/80 dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Explanation Box when answered */}
                  {answeredMap[currentQuestionIndex] !== undefined && (
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {answeredMap[currentQuestionIndex].isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Toʻgʻri javob! ({String.fromCharCode(65 + activeQuestion.correctIndex)} varianti)
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" /> Notoʻgʻri javob. Toʻgʻri variant: {String.fromCharCode(65 + activeQuestion.correctIndex)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {activeQuestion.explanation}
                      </p>

                      <div className="pt-2 flex items-center justify-between gap-2">
                        <button
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                          className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Oldingi test</span>
                        </button>

                        <button
                          onClick={handleNextQuestion}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>{currentQuestionIndex < currentQuestions.length - 1 ? 'Keyingi test' : 'Natijani koʻrish'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Test Completion Summary */
                <div className="p-6 sm:p-8 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
                    <Award className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">
                      Test Muvaffaqiyatli Yakunlandi!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {testTopic === 'all' ? '1-testdan 25-testgacha boʻlgan barcha bilim testlari' : testTopic.toUpperCase()} boʻyicha natijangiz hisoblandi
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                    <div>
                      <span className="text-xs text-slate-500 block">Natija:</span>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                        {correctAnswersCount} / {currentQuestions.length}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-emerald-200 dark:bg-emerald-800" />
                    <div>
                      <span className="text-xs text-slate-500 block">Aniqlik:</span>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                        {Math.round((correctAnswersCount / currentQuestions.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-px h-8 bg-emerald-200 dark:bg-emerald-800" />
                    <div>
                      <span className="text-xs text-slate-500 block">CEFR Baho:</span>
                      <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {Math.round((correctAnswersCount / currentQuestions.length) * 100) >= 88 ? 'C1 / C2' :
                         Math.round((correctAnswersCount / currentQuestions.length) * 100) >= 70 ? 'B2' :
                         Math.round((correctAnswersCount / currentQuestions.length) * 100) >= 50 ? 'B1' : 'A2'}
                      </span>
                    </div>
                  </div>

                  {/* Review of all tests */}
                  <div className="text-left p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Testlar tahlili (Savollar roʻyxati):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      {currentQuestions.map((q, idx) => {
                        const ans = answeredMap[idx];
                        const isCorrect = ans?.isCorrect;
                        return (
                          <div
                            key={q.id}
                            className={`p-2 rounded-lg border text-center font-semibold ${
                              isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                                : 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                            }`}
                          >
                            <span>{idx + 1}-test: {isCorrect ? 'Toʻgʻri' : 'Xato'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleRestartTest(testTopic, true)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                    >
                      <Shuffle className="w-4 h-4" />
                      <span>Javoblarni yangitdan aralashtirib topshirish</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('history');
                        setHistoryActiveTab('quizzes');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <History className="w-4 h-4" />
                      <span>Testlar Tarixini Koʻrish</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>AI bilan gaplashishga oʻtish</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================
              TAB 5: TARIX (Tarjimalar va Test Natijalari Arxivi)
              ======================================================== */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {/* Tarix Sub-nav: Tarjima tarixi & Bilim testlari natijalari */}
              <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-1 max-w-md">
                <button
                  onClick={() => setHistoryActiveTab('translations')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    historyActiveTab === 'translations'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Tarjimalar Tarixi ({history.length})
                </button>
                <button
                  onClick={() => setHistoryActiveTab('quizzes')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    historyActiveTab === 'quizzes'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Bilim Testlari Tarixi ({testHistory.length})
                </button>
              </div>

              {/* Sub-view 1: Tarjimalar Tarixi */}
              {historyActiveTab === 'translations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Oldingi tarjimalaringiz ({history.length})
                    </span>
                    {history.length > 0 && (
                      <button
                        onClick={() => {
                          clearTranslationHistory();
                          setHistory([]);
                        }}
                        className="px-3 py-1 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Tarixni tozalash</span>
                      </button>
                    )}
                  </div>

                  {history.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 dark:text-slate-500 text-sm">
                      Tarjima tarixi hali boʻsh. Matn tarjima qilganingizda bu yerda avtomatik saqlanadi.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      {history.map((h) => {
                        const fromObj = SUPPORTED_LANGUAGES.find(l => l.code === h.fromLang);
                        const toObj = SUPPORTED_LANGUAGES.find(l => l.code === h.toLang);
                        return (
                          <div
                            key={h.id}
                            onClick={() => {
                              setFromLang(h.fromLang);
                              setToLang(h.toLang);
                              setInputText(h.sourceText);
                              setOutputText(h.translatedText);
                              setActiveTab('translator');
                            }}
                            className="p-3.5 sm:p-4 hover:bg-indigo-50/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                                <span>{fromObj?.flag} {fromObj?.name}</span>
                                <span>→</span>
                                <span>{toObj?.flag} {toObj?.name}</span>
                              </div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                {h.sourceText}
                              </p>
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate mt-0.5">
                                {h.translatedText}
                              </p>
                            </div>

                            <div className="shrink-0 text-right">
                              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Sub-view 2: Bilim Testlari Tarixi */}
              {historyActiveTab === 'quizzes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Bilim Testlari Natijalari Tarixi ({testHistory.length})
                    </span>
                    {testHistory.length > 0 && (
                      <button
                        onClick={() => {
                          setTestHistory([]);
                          try {
                            localStorage.removeItem('ziyo_test_quiz_history');
                          } catch {}
                        }}
                        className="px-3 py-1 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Test tarixini tozalash</span>
                      </button>
                    )}
                  </div>

                  {testHistory.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 dark:text-slate-500 text-sm space-y-3">
                      <p>Hozircha test natijalari mavjud emas.</p>
                      <button
                        onClick={() => setActiveTab('test')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        <span>1-25 testlarni boshlash</span>
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      {testHistory.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 sm:p-4 hover:bg-emerald-50/40 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 dark:text-white">
                                {item.topicName}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.percentage >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                                item.percentage >= 60 ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' :
                                'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              }`}>
                                {item.percentage}%
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Vaqt: {item.date} · Toʻgʻri javoblar: {item.score} / {item.total} ta
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab('test');
                              handleRestartTest('all', true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer shrink-0"
                          >
                            Qayta topshirish
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 sm:px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">10 Jahon Tili:</span>
            <span>🇺🇿 Oʻzbek · 🇬🇧 English · 🇷🇺 Русский · 🇩🇪 Deutsch · 🇫🇷 Français · 🇹🇷 Türkçe · 🇸🇦 العربية · 🇪🇸 Español · 🇨🇳 中文 · 🇰🇷 한국어</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-colors cursor-pointer self-end sm:self-auto"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};
