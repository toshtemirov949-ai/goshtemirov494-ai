import translatorDbRaw from './translatorDb.json';
import { playFemaleSpeech } from '../../utils/femaleVoiceService';

export type LanguageCode = 'uz' | 'en' | 'ru' | 'de' | 'fr' | 'tr' | 'ar' | 'es' | 'zh' | 'ko';

export interface SupportedLanguage {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  ttsLang: string;
  dir: 'ltr' | 'rtl';
  samplePhrases: string[];
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  {
    code: 'uz',
    name: 'Oʻzbekcha',
    nativeName: 'Oʻzbek tili',
    flag: '🇺🇿',
    ttsLang: 'uz-UZ',
    dir: 'ltr',
    samplePhrases: ['Assalomu alaykum!', 'Kuningiz xayrli oʻtsin', 'Dasturlashni oʻrganish juda qiziqarli', 'ZiyoTalim platformasi']
  },
  {
    code: 'en',
    name: 'Inglizcha',
    nativeName: 'English',
    flag: '🇬🇧',
    ttsLang: 'en-US',
    dir: 'ltr',
    samplePhrases: ['Hello, welcome!', 'Have a wonderful day', 'Learning coding is exciting', 'Knowledge is power']
  },
  {
    code: 'ru',
    name: 'Ruscha',
    nativeName: 'Русский',
    flag: '🇷🇺',
    ttsLang: 'ru-RU',
    dir: 'ltr',
    samplePhrases: ['Здравствуйте!', 'Желаю отличного дня', 'Изучение языков открывает двери', 'Знание — сила']
  },
  {
    code: 'de',
    name: 'Nemischa',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    ttsLang: 'de-DE',
    dir: 'ltr',
    samplePhrases: ['Guten Tag!', 'Schönen Tag noch', 'Bildung ist die Zukunft', 'Vielen Dank für Ihre Hilfe']
  },
  {
    code: 'fr',
    name: 'Fransuzcha',
    nativeName: 'Français',
    flag: '🇫🇷',
    ttsLang: 'fr-FR',
    dir: 'ltr',
    samplePhrases: ['Bonjour tout le monde!', 'Bonne journée à vous', 'La connaissance est une force', 'Merci beaucoup']
  },
  {
    code: 'tr',
    name: 'Turkcha',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    ttsLang: 'tr-TR',
    dir: 'ltr',
    samplePhrases: ['Merhaba, hoş geldiniz!', 'İyi günler dilerim', 'Eğitim geleceğimizdir', 'Çok teşekkür ederim']
  },
  {
    code: 'ar',
    name: 'Arabcha',
    nativeName: 'العربية',
    flag: '🇸🇦',
    ttsLang: 'ar-SA',
    dir: 'rtl',
    samplePhrases: ['مرحبا بك!', 'أتمنى لك يوما سعيدا', 'طلب العلم فريضة', 'شكرا جزيلا لك']
  },
  {
    code: 'es',
    name: 'Ispancha',
    nativeName: 'Español',
    flag: '🇪🇸',
    ttsLang: 'es-ES',
    dir: 'ltr',
    samplePhrases: ['¡Hola, bienvenido!', 'Que tengas un buen día', 'El conocimiento es poder', 'Muchas gracias']
  },
  {
    code: 'zh',
    name: 'Xitoycha',
    nativeName: '中文 (普通话)',
    flag: '🇨🇳',
    ttsLang: 'zh-CN',
    dir: 'ltr',
    samplePhrases: ['你好，欢迎！', '祝你有美好的一天', '知识就是力量', '非常感谢']
  },
  {
    code: 'ko',
    name: 'Koreyscha',
    nativeName: '한국어',
    flag: '🇰🇷',
    ttsLang: 'ko-KR',
    dir: 'ltr',
    samplePhrases: ['안녕하세요, 환영합니다!', '좋은 하루 되세요', '배움은 미래의 힘입니다', '대단히 감사합니다']
  },
];

export interface TranslatorDbEntry {
  id: string;
  category: string;
  pos: string;
  translations: Record<LanguageCode, string>;
}

export const TRANSLATOR_DB: TranslatorDbEntry[] = translatorDbRaw as TranslatorDbEntry[];

export interface TranslationHistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  fromLang: LanguageCode;
  toLang: LanguageCode;
  timestamp: number;
}

const TRANSLATION_CACHE = new Map<string, string>();
const HISTORY_STORAGE_KEY = 'ziyotalim_translation_history_v1';

// Offline dictionary search
export function findInDictionary(
  query: string,
  fromLang: LanguageCode,
  toLang: LanguageCode
): { directMatch?: string; relatedWords: TranslatorDbEntry[] } {
  const q = query.trim().toLowerCase();
  if (!q) return { relatedWords: [] };

  let directMatch: string | undefined;
  const relatedWords: TranslatorDbEntry[] = [];

  for (const entry of TRANSLATOR_DB) {
    const srcVal = (entry.translations[fromLang] || '').toLowerCase();
    if (srcVal === q) {
      directMatch = entry.translations[toLang];
      relatedWords.unshift(entry);
    } else if (srcVal.includes(q) || q.includes(srcVal)) {
      if (relatedWords.length < 15) {
        relatedWords.push(entry);
      }
    }
  }

  return { directMatch, relatedWords };
}

// Fallback multi-word dictionary translation
function translateViaDictionary(text: string, fromLang: LanguageCode, toLang: LanguageCode): string | null {
  const clean = text.trim();
  if (!clean) return '';

  // 1. Exact phrase lookup
  const exact = findInDictionary(clean, fromLang, toLang);
  if (exact.directMatch) {
    return exact.directMatch;
  }

  // 2. Word-by-word fallback if simple sentence/words
  const words = clean.split(/\s+/);
  if (words.length > 1 && words.length <= 12) {
    const translatedParts: string[] = [];
    let matchesCount = 0;

    for (const w of words) {
      const cleanW = w.replace(/[.,!?;:()"']/g, '');
      const match = findInDictionary(cleanW, fromLang, toLang);
      if (match.directMatch) {
        translatedParts.push(match.directMatch);
        matchesCount++;
      } else {
        translatedParts.push(w);
      }
    }

    if (matchesCount >= Math.ceil(words.length / 2)) {
      return translatedParts.join(' ');
    }
  }

  return null;
}

// Neural real-time translation with multi-tier engine
export async function translateTextOnline(
  text: string,
  fromLang: LanguageCode,
  toLang: LanguageCode
): Promise<{ text: string; source: 'neural_api' | 'local_dict' | 'cache' }> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { text: '', source: 'local_dict' };
  }

  if (fromLang === toLang) {
    return { text: trimmed, source: 'cache' };
  }

  const cacheKey = `${fromLang}|${toLang}:${trimmed.toLowerCase()}`;
  if (TRANSLATION_CACHE.has(cacheKey)) {
    return { text: TRANSLATION_CACHE.get(cacheKey)!, source: 'cache' };
  }

  // Check high-speed local dictionary first for exact matches
  const dictMatch = translateViaDictionary(trimmed, fromLang, toLang);

  // Attempt real-time Neural API
  try {
    const pair = `${fromLang}|${toLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${pair}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let result = data.responseData.translatedText;
        // Clean any stray HTML or quotes
        result = result.replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
        
        if (result && !result.toLowerCase().includes('quota exceeded') && !result.toLowerCase().includes('invalid')) {
          TRANSLATION_CACHE.set(cacheKey, result);
          return { text: result, source: 'neural_api' };
        }
      }
    }
  } catch (err) {
    console.warn('Real-time translation API notice, using dictionary engine:', err);
  }

  // If online API did not return, use verified local dictionary
  if (dictMatch) {
    TRANSLATION_CACHE.set(cacheKey, dictMatch);
    return { text: dictMatch, source: 'local_dict' };
  }

  return { text: trimmed, source: 'local_dict' };
}

// Local history management
export function getStoredTranslationHistory(): TranslationHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTranslationToHistory(item: Omit<TranslationHistoryItem, 'id' | 'timestamp'>): void {
  try {
    const history = getStoredTranslationHistory();
    // Avoid duplicate adjacent items
    if (history.length > 0 && history[0].sourceText === item.sourceText && history[0].toLang === item.toLang) {
      return;
    }
    const newItem: TranslationHistoryItem = {
      ...item,
      id: 'th_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      timestamp: Date.now()
    };
    const updated = [newItem, ...history.slice(0, 49)];
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving translation history', e);
  }
}

export function clearTranslationHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {}
}

// Audio Pronunciation TTS (Female Voice)
export function speakText(text: string, langCode: LanguageCode): void {
  const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
  const ttsLang = langConfig?.ttsLang || langCode;
  playFemaleSpeech({
    text,
    lang: ttsLang,
    rate: 0.9,
    pitch: 1.1 // Sweet and clear female pitch
  });
}
