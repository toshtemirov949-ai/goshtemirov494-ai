import { Course } from '../types';
import { COURSES_DATA } from '../data/coursesData';

export interface AdminLogItem {
  id: string;
  timestamp: string;
  type: 'LOGIN' | 'COURSE_EDIT' | 'AI_TRANSLATE' | 'USER_ACTION' | 'SYSTEM' | 'SECURITY';
  title: string;
  details: string;
  status: 'success' | 'warning' | 'error' | 'info';
  user: string;
  ip: string;
}

export interface AdminSettings {
  platformName: string;
  systemStatus: 'online' | 'maintenance';
  allowRegistrations: boolean;
  aiTranslatorActive: boolean;
  aiTtsSpeed: number;
  autoGrammarAnalysis: boolean;
  sessionTimeoutMinutes: number;
  adminLogin: string;
  adminPassword: string;
  defaultLangPair: string;
}

const ADMIN_AUTH_KEY = 'ziyotalim_admin_auth_v1';
const ADMIN_LOGS_KEY = 'ziyotalim_admin_logs_v1';
const ADMIN_SETTINGS_KEY = 'ziyotalim_admin_settings_v1';
const ADMIN_COURSES_KEY = 'ziyotalim_admin_courses_v1';

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  platformName: 'ZiyoTalim & Techzone Taʼlim Platformasi',
  systemStatus: 'online',
  allowRegistrations: true,
  aiTranslatorActive: true,
  aiTtsSpeed: 0.9,
  autoGrammarAnalysis: true,
  sessionTimeoutMinutes: 120,
  adminLogin: '1',
  adminPassword: '1',
  defaultLangPair: 'uz|en'
};

const DEFAULT_LOGS: AdminLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-24 10:45:12',
    type: 'LOGIN',
    title: 'Admin muvaffaqiyatli kirdi',
    details: 'Bosh admin hisobi bilan tizimga kirish tasdiqlandi (Login: 1)',
    status: 'success',
    user: 'Bosh Administrator',
    ip: '192.168.1.1'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-24 10:30:05',
    type: 'AI_TRANSLATE',
    title: 'Techie AI & Real Tarjimon soʻrovi',
    details: 'Neyron tarjima: "Dasturlash kelajak kasbi" (uz -> en)',
    status: 'success',
    user: 'Talaba (Oybekjon)',
    ip: '178.218.201.44'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-24 10:14:22',
    type: 'COURSE_EDIT',
    title: 'Kurs darsi yangilandi',
    details: '"Python AI Asoslari" kursidagi 3-modul dars jadvali tekshirildi',
    status: 'info',
    user: 'Tizim Moderatori',
    ip: '192.168.1.15'
  },
  {
    id: 'log-4',
    timestamp: '2026-09-24 09:50:33',
    type: 'SYSTEM',
    title: 'Server avtomatik diagnostikasi',
    details: 'CPU: 12%, RAM: 2.1 GB, Uptime: 99.98% barqaror ishlamoqda',
    status: 'success',
    user: 'System Watchdog',
    ip: 'localhost'
  },
  {
    id: 'log-5',
    timestamp: '2026-09-24 09:12:10',
    type: 'SECURITY',
    title: 'Xavfsizlik tekshiruvi',
    details: 'Barcha API shlyuzlari va maʼlumotlar bazasi shifrlangan holatda',
    status: 'info',
    user: 'Security Guard',
    ip: '127.0.0.1'
  }
];

// Check Admin Login
export function getStoredAdminAuth(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setStoredAdminAuth(isLoggedIn: boolean): void {
  try {
    if (isLoggedIn) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch {}
}

// Logs Management
export function getStoredAdminLogs(): AdminLogItem[] {
  try {
    const raw = localStorage.getItem(ADMIN_LOGS_KEY);
    if (!raw) return DEFAULT_LOGS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_LOGS;
  }
}

export function saveStoredAdminLogs(logs: AdminLogItem[]): void {
  try {
    localStorage.setItem(ADMIN_LOGS_KEY, JSON.stringify(logs));
  } catch {}
}

export function addAdminLog(
  type: AdminLogItem['type'],
  title: string,
  details: string,
  status: AdminLogItem['status'] = 'info',
  user: string = 'Bosh Administrator'
): void {
  try {
    const existing = getStoredAdminLogs();
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const newLog: AdminLogItem = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      timestamp: timeStr,
      type,
      title,
      details,
      status,
      user,
      ip: '192.168.1.1'
    };

    const updated = [newLog, ...existing.slice(0, 99)];
    saveStoredAdminLogs(updated);
  } catch {}
}

// Settings Management
export function getStoredAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(ADMIN_SETTINGS_KEY);
    if (!raw) return DEFAULT_ADMIN_SETTINGS;
    return { ...DEFAULT_ADMIN_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ADMIN_SETTINGS;
  }
}

export function saveStoredAdminSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
    addAdminLog('SYSTEM', 'Tizim sozlamalari yangilandi', 'Admin boshqaruv panelidan sozlamalar saqlandi', 'info');
  } catch {}
}

// Editable Courses Management
export function getStoredCourses(): Course[] {
  try {
    const raw = localStorage.getItem(ADMIN_COURSES_KEY);
    if (!raw) return COURSES_DATA;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : COURSES_DATA;
  } catch {
    return COURSES_DATA;
  }
}

export function saveStoredCourses(courses: Course[]): void {
  try {
    localStorage.setItem(ADMIN_COURSES_KEY, JSON.stringify(courses));
  } catch {}
}

// Instructors Management
export interface AdminInstructor {
  id: string;
  name: string;
  role: string;
  organization: string;
  experience: string;
  rating: number;
  bio: string;
  avatarUrl: string;
  specialty?: string;
  email?: string;
  phone?: string;
}

const ADMIN_INSTRUCTORS_KEY = 'ziyotalim_admin_instructors_v1';

export const DEFAULT_INSTRUCTORS: AdminInstructor[] = [
  {
    id: 'inst-1',
    name: 'Sherzodbek Qodirov',
    role: 'IELTS 8.5 sohibi, Kembrij sertifikatlangan bosh instruktor',
    organization: 'ZiyoTalim & Cambridge Academy',
    experience: '10 yil tajriba',
    rating: 4.95,
    bio: '10 yildan ortiq tajribaga ega xalqaro repetitor, 2000 dan ziyod talabasi IELTS 7.0+ natija qayd etgan.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specialty: 'Ingliz tili & IELTS Mastery',
    email: 'sherzod.qodirov@ziyotalim.uz'
  },
  {
    id: 'inst-2',
    name: 'Sardorbek Islomov',
    role: 'Senior Frontend Muhandis (Fintech & Cloud)',
    organization: 'Techzone Labs & Silicon Valley Devs',
    experience: '8 yil tajriba',
    rating: 4.98,
    bio: '8 yillik xalqaro IT tajriba egasi, React, TypeScript va Next.js boʻyicha yirik platformalar arxitektori.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    specialty: 'Web Dasturlash & Frontend',
    email: 'sardor.islomov@techzone.uz'
  },
  {
    id: 'inst-3',
    name: 'Bobur Mirzayev',
    role: 'AI Researcher & Data Scientist',
    organization: 'Google AI & ZiyoTalim Research Lab',
    experience: '7 yil tajriba',
    rating: 4.92,
    bio: 'Sunʼiy intellekt va neyron tarmoqlar boʻyicha ilmiy tadqiqotchi, xalqaro musobaqalar va hakatonlar gʻolibi.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    specialty: 'Sunʼiy Intellekt & Python',
    email: 'bobur.mirzayev@ziyotalim.uz'
  },
  {
    id: 'inst-4',
    name: 'Nilufar Yusupova',
    role: 'OʻzDJTU oʻqituvchisi, CELTA xalqaro diplom sohibi',
    organization: 'Oʻzbekiston Davlat Jahon Tillari Universiteti',
    experience: '9 yil tajriba',
    rating: 4.9,
    bio: 'Xorijiy tillarni interaktiv va kommunikativ metodika orqali oʻrgatish boʻyicha yetakchi ekspert.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specialty: 'General English & Speaking',
    email: 'nilufar.yusupova@ziyotalim.uz'
  },
  {
    id: 'inst-5',
    name: 'Ulugʻbek Rayimov',
    role: 'TestDaF C1, DAAD stipendiyasi gʻolibi',
    organization: 'DAAD & Gyote Instituti Akkretsiyasi',
    experience: '6 yil tajriba',
    rating: 4.88,
    bio: 'Myunxen Texnika Universiteti bitiruvchisi, nemis tilidan xalqaro Goethe va TestDaF imtihonlariga tayyorlaydi.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    specialty: 'Nemis tili & Ausbildung',
    email: 'ulugbek.rayimov@ziyotalim.uz'
  },
  {
    id: 'inst-6',
    name: 'Yelena Volkova',
    role: 'Rus tili filologi, xalqaro TRKI eksperti',
    organization: 'Moskva Davlat Universiteti (MGU) hamkori',
    experience: '12 yil tajriba',
    rating: 4.91,
    bio: 'Rus tili grammatikasi va nutq madaniyatini zamonaviy interaktiv yondashuv orqali oʻqitadi.',
    avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    specialty: 'Rus tili & TRKI',
    email: 'yelena.volkova@ziyotalim.uz'
  },
  {
    id: 'inst-7',
    name: 'Javohir Olimov',
    role: 'Lead Backend Engineer & DevOps Architect',
    organization: 'Fintech Solutions & Techzone',
    experience: '9 yil tajriba',
    rating: 4.94,
    bio: 'Node.js, PostgreSQL va Docker boʻyicha yirik bank tizimlarini loyihalagan katta dasturchi.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    specialty: 'Backend & Cloud DevOps',
    email: 'javohir.olimov@techzone.uz'
  }
];

export function getStoredInstructors(): AdminInstructor[] {
  try {
    const raw = localStorage.getItem(ADMIN_INSTRUCTORS_KEY);
    if (!raw) return DEFAULT_INSTRUCTORS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_INSTRUCTORS;
  } catch {
    return DEFAULT_INSTRUCTORS;
  }
}

export function saveStoredInstructors(instructors: AdminInstructor[]): void {
  try {
    localStorage.setItem(ADMIN_INSTRUCTORS_KEY, JSON.stringify(instructors));
  } catch {}
}

// Textbooks (Darsliklar & Oʻquv qoʻllanmalar) Management
export interface AdminTextbook {
  id: string;
  title: string;
  subject: string;
  category: string;
  author: string;
  pagesCount: number;
  level: string;
  format: 'PDF' | 'EPUB' | 'Interaktiv' | 'Video-darslik';
  fileSize: string;
  downloadUrl?: string;
  coverImage?: string;
  description: string;
  addedDate: string;
  downloadsCount: number;
}

const ADMIN_TEXTBOOKS_KEY = 'ziyotalim_admin_textbooks_v1';

export const DEFAULT_TEXTBOOKS: AdminTextbook[] = [
  {
    id: 'tb-1',
    title: 'English Grammar in Use (5th Edition)',
    subject: 'Ingliz tili',
    category: 'languages',
    author: 'Raymond Murphy (Cambridge University Press)',
    pagesCount: 390,
    level: 'Boshlangʻich & Oʻrta (A2-B2)',
    format: 'PDF',
    fileSize: '18.4 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&auto=format&fit=crop&q=80',
    description: 'Dunyodagi eng mashhur va mukammal ingliz tili amaliy grammatika qoʻllanmasi va mashqlar toʻplami.',
    addedDate: '2026-09-20',
    downloadsCount: 1420
  },
  {
    id: 'tb-2',
    title: 'IELTS Band 8+ Master Speaking & Academic Writing',
    subject: 'Ingliz tili',
    category: 'languages',
    author: 'Sherzodbek Qodirov (IELTS 8.5)',
    pagesCount: 245,
    level: 'Yuqori (B2-C1)',
    format: 'PDF',
    fileSize: '12.8 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
    description: 'IELTS imtihonida 7.5+ va 8.0 ball olish uchun real model javoblar, lugʻat boyligi va strategiyalar darsligi.',
    addedDate: '2026-09-22',
    downloadsCount: 980
  },
  {
    id: 'tb-3',
    title: 'Русский язык: Полный курс грамматики и 6 падежей',
    subject: 'Rus tili',
    category: 'languages',
    author: 'Елена Волкова (МГУ эксперт)',
    pagesCount: 310,
    level: 'Boshlangʻich & Oʻrta (A1-B2)',
    format: 'PDF',
    fileSize: '15.6 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80',
    description: 'Rus tili 6 ta kelishigi, feʼl boshqaruvi, soʻzlashuv nutqi va TRKI imtihoni uchun fundamental qoʻllanma.',
    addedDate: '2026-09-18',
    downloadsCount: 760
  },
  {
    id: 'tb-4',
    title: 'Le Nouvel Édito — Langue Française DELF A1-B2',
    subject: 'Fransuz tili',
    category: 'languages',
    author: 'Élodie Heu (Didier FLE)',
    pagesCount: 260,
    level: 'Oʻrta (A2-B2)',
    format: 'PDF',
    fileSize: '21.0 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&auto=format&fit=crop&q=80',
    description: 'Fransuz tili fonetikasi, R tovushi talaffuzi, dialoglar va DELF xalqaro imtihoniga tayyorlov darsligi.',
    addedDate: '2026-09-15',
    downloadsCount: 540
  },
  {
    id: 'tb-5',
    title: 'Fit fürs Goethe-Zertifikat B1 & TestDaF Leitfaden',
    subject: 'Nemis tili',
    category: 'languages',
    author: 'Ulugʻbek Rayimov (DAAD Alumnus)',
    pagesCount: 220,
    level: 'Oʻrta & Yuqori (B1-C1)',
    format: 'PDF',
    fileSize: '14.5 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&auto=format&fit=crop&q=80',
    description: 'Germaniyada bepul taʼlim va Ausbildung uchun Gyote B1-B2 hamda TestDaF imtihonlari namunaviy darsligi.',
    addedDate: '2026-09-19',
    downloadsCount: 620
  },
  {
    id: 'tb-6',
    title: 'Zamonaviy Frontend & React Arxitekturasi',
    subject: 'Dasturlash & IT',
    category: 'it',
    author: 'Sardorbek Islomov (Techzone Labs)',
    pagesCount: 360,
    level: 'Barcha darajalar (Junior-Senior)',
    format: 'PDF',
    fileSize: '24.2 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80',
    description: 'HTML5, CSS3, Tailwind CSS, TypeScript, React 19 va Next.js boʻyicha toʻliq amaliy dasturlash darsligi.',
    addedDate: '2026-09-21',
    downloadsCount: 1890
  },
  {
    id: 'tb-7',
    title: 'Python va Sunʼiy Intellekt Neyron Tarmoqlari',
    subject: 'Sunʼiy intellekt',
    category: 'it',
    author: 'Bobur Mirzayev (Google AI Partner)',
    pagesCount: 420,
    level: 'Oʻrta & Chuqurlashtirilgan',
    format: 'PDF',
    fileSize: '29.0 MB',
    downloadUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80',
    description: 'Python asoslari, NumPy, Pandas, Scikit-Learn, PyTorch va Katta Til Modellari (LLM) bilan ishlash qoʻllanmasi.',
    addedDate: '2026-09-23',
    downloadsCount: 1650
  }
];

export function getStoredTextbooks(): AdminTextbook[] {
  try {
    const raw = localStorage.getItem(ADMIN_TEXTBOOKS_KEY);
    if (!raw) return DEFAULT_TEXTBOOKS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_TEXTBOOKS;
  } catch {
    return DEFAULT_TEXTBOOKS;
  }
}

export function saveStoredTextbooks(textbooks: AdminTextbook[]): void {
  try {
    localStorage.setItem(ADMIN_TEXTBOOKS_KEY, JSON.stringify(textbooks));
  } catch {}
}

// Billing & Payments Storage
export interface AdminBillingSettings {
  clickActive: boolean;
  paymeActive: boolean;
  uzumActive: boolean;
  currency: string;
  monthlySubscription: number;
}

const ADMIN_BILLING_KEY = 'ziyotalim_admin_billing_v1';

export const DEFAULT_BILLING_SETTINGS: AdminBillingSettings = {
  clickActive: true,
  paymeActive: true,
  uzumActive: true,
  currency: 'Oʻzbekiston soʻmi (UZS)',
  monthlySubscription: 149000
};

export function getStoredBillingSettings(): AdminBillingSettings {
  try {
    const raw = localStorage.getItem(ADMIN_BILLING_KEY);
    if (!raw) return DEFAULT_BILLING_SETTINGS;
    return { ...DEFAULT_BILLING_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_BILLING_SETTINGS;
  }
}

export function saveStoredBillingSettings(settings: AdminBillingSettings): void {
  try {
    localStorage.setItem(ADMIN_BILLING_KEY, JSON.stringify(settings));
    addAdminLog('SYSTEM', 'Toʻlov sozlamalari saqlandi', 'Click, Payme va Uzum parametrlari yangilandi', 'success');
  } catch {}
}

// Certificate Settings Storage
export interface AdminCertificateSettings {
  passingScore: number;
  distinctionScore: number;
  autoIssueCert: boolean;
  certSignerTitle: string;
}

const ADMIN_CERT_KEY = 'ziyotalim_admin_cert_v1';

export const DEFAULT_CERT_SETTINGS: AdminCertificateSettings = {
  passingScore: 70,
  distinctionScore: 90,
  autoIssueCert: true,
  certSignerTitle: 'ZiyoTalim & Techzone Taʼlim Kengashi Raisi'
};

export function getStoredCertificateSettings(): AdminCertificateSettings {
  try {
    const raw = localStorage.getItem(ADMIN_CERT_KEY);
    if (!raw) return DEFAULT_CERT_SETTINGS;
    return { ...DEFAULT_CERT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CERT_SETTINGS;
  }
}

export function saveStoredCertificateSettings(settings: AdminCertificateSettings): void {
  try {
    localStorage.setItem(ADMIN_CERT_KEY, JSON.stringify(settings));
    addAdminLog('SYSTEM', 'Sertifikat sozlamalari saqlandi', `Oʻtish bali: ${settings.passingScore}%, A+: ${settings.distinctionScore}%`, 'success');
  } catch {}
}

// Users Storage
export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'Talaba' | 'Mentor' | 'Admin';
  enrolledCourses: number;
  completedTests: number;
  averageScore: number;
  status: 'Faol' | 'Nofaol';
  joinedDate: string;
}

const ADMIN_USERS_KEY = 'ziyotalim_admin_users_v2';

export const DEFAULT_MOCK_USERS: MockUser[] = [];

export function getStoredUsers(): MockUser[] {
  try {
    const raw = localStorage.getItem(ADMIN_USERS_KEY);
    if (!raw) return DEFAULT_MOCK_USERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_MOCK_USERS;
  } catch {
    return DEFAULT_MOCK_USERS;
  }
}

export function saveStoredUsers(users: MockUser[]): void {
  try {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
  } catch {}
}

export const BASE_STUDENTS_COUNT = 0;
export const BASE_CERTIFICATES_COUNT = 0;
const ADMIN_TOTAL_CERTS_KEY = 'ziyotalim_admin_total_certs_v2';

export function computeTotalStudentsCount(usersList: MockUser[]): number {
  if (!Array.isArray(usersList) || usersList.length === 0) return 0;
  const students = usersList.filter(u => u.role === 'Talaba');
  if (students.length > 0) return students.length;
  return usersList.filter(u => u.role !== 'Admin').length;
}

export function getStoredTotalCertificatesCount(): number {
  try {
    const raw = localStorage.getItem(ADMIN_TOTAL_CERTS_KEY);
    if (!raw) return 0;
    const num = parseInt(raw, 10);
    return isNaN(num) ? 0 : Math.max(0, num);
  } catch {
    return 0;
  }
}

export function saveStoredTotalCertificatesCount(count: number): void {
  try {
    localStorage.setItem(ADMIN_TOTAL_CERTS_KEY, String(Math.max(0, count)));
  } catch {}
}

export function incrementStoredCertificatesCount(): number {
  const next = getStoredTotalCertificatesCount() + 1;
  saveStoredTotalCertificatesCount(next);
  return next;
}

export function decrementStoredCertificatesCount(): number {
  const next = Math.max(0, getStoredTotalCertificatesCount() - 1);
  saveStoredTotalCertificatesCount(next);
  return next;
}

export function resetStoredCertificatesCount(): void {
  saveStoredTotalCertificatesCount(0);
}

// Reset Everything to Factory Defaults
export function resetAdminDataToDefaults(): void {
  try {
    localStorage.removeItem(ADMIN_LOGS_KEY);
    localStorage.removeItem(ADMIN_SETTINGS_KEY);
    localStorage.removeItem(ADMIN_COURSES_KEY);
    localStorage.removeItem(ADMIN_INSTRUCTORS_KEY);
    localStorage.removeItem(ADMIN_TEXTBOOKS_KEY);
    localStorage.removeItem(ADMIN_BILLING_KEY);
    localStorage.removeItem(ADMIN_CERT_KEY);
    localStorage.removeItem(ADMIN_USERS_KEY);
    localStorage.removeItem(ADMIN_TOTAL_CERTS_KEY);
    localStorage.removeItem('ziyotalim_admin_users_v1');
    localStorage.removeItem('ziyotalim_admin_total_certs_v1');
  } catch {}
}


