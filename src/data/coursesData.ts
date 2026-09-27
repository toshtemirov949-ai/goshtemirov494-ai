import { Course } from '../types';
import {
  langIeltsModules,
  langGeneralModules,
  langRuSpeakingModules,
  langRuBusinessModules,
  langFrDelftModules,
  langDeGoetheModules,
  itFrontendModules,
  itPythonModules,
  itBackendModules,
  itCyberModules,
  exactMathModules,
  exactPhysicsModules,
  naturalChemistryModules,
  naturalBiologyModules,
  naturalGeographyModules,
  humHistoryModules,
  humUzbekModules
} from './courseCurriculumList';

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Barcha Yoʻnalishlar', count: 17 },
  { id: 'languages', label: 'Xorijiy Tillar (Ingliz, Rus, Fransuz, Nemis)', count: 6 },
  { id: 'it', label: 'IT & Dasturlash', count: 4 },
  { id: 'exact_sciences', label: 'Aniq Fanlar (Matematika, Fizika)', count: 2 },
  { id: 'natural_sciences', label: 'Tabiiy Fanlar (Kimyo, Biologiya, Geografiya)', count: 3 },
  { id: 'humanities', label: 'Ijtimoiy-Gumanitar (Tarix, Ona Tili)', count: 2 },
];

export const COURSES_DATA: Course[] = [
  // 1. IELTS Masterclass
  {
    id: 'lang-en-ielts',
    title: 'IELTS Masterclass 7.5+ va Akademik Ingliz Tili',
    shortDescription: 'IELTS Listening, Reading, Writing Task 1-2 va Speaking boʻyicha xalqaro standartdagi toʻliq 25 darslik master-kurs.',
    description: 'Ushbu kurs sizni IELTS imtihonida kamida 7.5+ ball olishingiz uchun barcha 4 ta modul (Tinglab tushunish, Oʻqish, Yozish va Soʻzlashuv) boʻyicha eng samarali strategiyalar, haqiqiy imtihon savollari va leksik resurslar bilan taʼminlaydi.',
    category: 'languages',
    language: 'english',
    level: 'Ilgʻor (Advanced)',
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: 9400,
    durationHours: 42,
    lessonsCount: 25,
    instructor: {
      name: 'Sherzodbek Qodirov',
      role: 'IELTS 8.5 sohibi, Kembrij sertifikatlangan instruktor',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: '10 yildan ortiq tajribaga ega xalqaro darajadagi repetitor, 2000 dan ziyod talabasi IELTS 7.0+ natija qayd etgan.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    badge: 'Xaridorgir',
    featured: true,
    highlights: [
      '25 ta toʻliq video va amaliy darslik',
      'Speaking boʻyicha jonli interaktiv audio mashqlar',
      'Writing Task 1 va Task 2 insho andozalari',
      'Rasmiy tasdiqlangan kurs sertifikati'
    ],
    modules: langIeltsModules
  },

  // 2. General English
  {
    id: 'lang-en-general',
    title: 'General English: Noldan A1 dan B2 darajagacha',
    shortDescription: 'Ingliz tilini noldan oʻrganuvchilar uchun qulay grammatika, 25 ta bosqichma-bosqich darslik va jonli dialoglar.',
    description: 'Har kuni qoʻllaniladigan soʻzlashuv iboralari, zamonlar uygʻunligi, fonetika va audio mashgʻulotlar orqali ingliz tilida erkin va ravon muloqot qilishni oʻrganasiz.',
    category: 'languages',
    language: 'english',
    level: 'Boshlangʻich (Beginner)',
    rating: 4.8,
    reviewsCount: 2150,
    studentsCount: 16800,
    durationHours: 36,
    lessonsCount: 25,
    instructor: {
      name: 'Nilufar Yusupova',
      role: 'OʻzDJTU oʻqituvchisi, CELTA diplomiga ega',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Xorijiy tillarni interaktiv metodika orqali oʻrgatish boʻyicha tajribali mutaxassis.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    badge: 'Ommabop',
    featured: true,
    highlights: [
      '25 ta bosqichma-bosqich interaktiv dars',
      'Har bir mavzu yuzasidan tekshiruvchi testlar',
      'Audio talaffuz va kundalik muloqot dialoglari',
      'B2 darajali rasmiy bitiruv sertifikati'
    ],
    modules: langGeneralModules
  },

  // 3. Rus Tili Soʻzlashuv
  {
    id: 'lang-ru-speaking',
    title: 'Разговорный Русский: Rus tilida erkin soʻzlashuv',
    shortDescription: 'Fonetika, 6 ta kelishik (падежи), harakat feʼllari va 25 ta amaliy dars orqali toʻsiqlarsiz gapiring.',
    description: 'Rus tilida ravon gapirish, kinolar va qoʻshiqlarni tushunish, talaffuzdagi urgʻu xatolarini toʻgʻrilash va hayotiy vaziyatlarda qoʻrqmasdan suhbatlashish sirlari.',
    category: 'languages',
    language: 'russian',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 1870,
    studentsCount: 14300,
    durationHours: 34,
    lessonsCount: 25,
    instructor: {
      name: 'Yelena Volkova',
      role: 'Rus tili filologi, xalqaro lektor',
      avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
      bio: 'Oʻzbekistonda xorijiy tillarni zamonaviy kommunikativ yondashuv orqali oʻqitib kelmoqda.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    badge: 'Tavsiya etiladi',
    featured: true,
    highlights: [
      '25 ta jonli nutq va amaliyot darslari',
      '6 ta kelishik (падежи) ning oson tushuntirilishi',
      'Audio talaffuz va dialog trenajyori',
      'Akademiya sertifikati'
    ],
    modules: langRuSpeakingModules
  },

  // 4. Rus Tili Ishbilarmonlik
  {
    id: 'lang-ru-business',
    title: 'Ishbilarmonlik va Rasmiy Rus Tili (Деловой Русский)',
    shortDescription: 'Biznes xatlar, muzokaralar, shartnomalar, xalqaro rezyume va TRKI imtihoniga tayyorgarlik kursi.',
    description: 'Kompaniya rahbarlari, menejerlar va xalqaro tashkilotlarda faoliyat olib boruvchilar uchun moʻljallangan 25 ta professional ishbilarmonlik darsligi.',
    category: 'languages',
    language: 'russian',
    level: 'Ilgʻor (Advanced)',
    rating: 4.8,
    reviewsCount: 890,
    studentsCount: 5600,
    durationHours: 32,
    lessonsCount: 25,
    instructor: {
      name: 'Dmitriy Semyonov',
      role: 'Biznes-konsultant va korporativ trener',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Xalqaro korporatsiyalarda 12 yillik aloqalar va muzokaralar tajribasiga ega ekspert.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    badge: 'Professional',
    featured: false,
    highlights: [
      '25 ta korporativ biznes mavzusi',
      'Haqiqiy shartnoma va tijoriy taklif andozalari',
      'TRKI B1/B2 test topshiriqlari',
      'Rasmiy tasdiqlangan sertifikat'
    ],
    modules: langRuBusinessModules
  },

  // 5. Fransuz Tili
  {
    id: 'lang-fr-delft',
    title: 'Fransuz Tili A1 dan B2 gacha: DELF va Jonli Nutq',
    shortDescription: 'Parij fonetikasi, nasal tovushlar, feʼllar tuslanishi va xalqaro DELF imtihoniga tayyorgarlik darslari.',
    description: 'Fransuz tilining jozibador talaffuzi, kundalik hayotdagi muloqot va Fransiyadagi universitetlarga qabul uchun zarur boʻlgan 25 ta toʻliq darslik.',
    category: 'languages',
    language: 'french',
    level: 'Boshlangʻich (Beginner)',
    rating: 4.9,
    reviewsCount: 760,
    studentsCount: 4800,
    durationHours: 35,
    lessonsCount: 25,
    instructor: {
      name: 'Claire Dupont & Jasur Karimov',
      role: 'Alliance Française sertifikatlangan pedagoglari',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      bio: 'Fransiyada tahsil olgan, DELF va DALF imtihonlari boʻyicha koʻp yillik amaliyotchi.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80',
    badge: 'Xalqaro',
    featured: true,
    highlights: [
      '25 ta batafsil darslik va audiodialoglar',
      'DELF A1/A2/B1 imtihon sinovlari',
      'Interaktiv talaffuz va audio darslar',
      'Fransuz tili daraja sertifikati'
    ],
    modules: langFrDelftModules
  },

  // 6. Nemis Tili
  {
    id: 'lang-de-goethe',
    title: 'Nemis Tili A1 dan B2 gacha: Goethe-Zertifikat va TestDaF',
    shortDescription: 'Germaniyada oʻqish va ishlash niyatidagilar uchun 25 ta tizimli darslik, artikllar va imtihon testlari.',
    description: 'Der/Die/Das sirlari, gap qurilishi (Satzbau), Akkusativ/Dativ kelishiklari hamda Goethe-Zertifikat va TestDaF imtihonlari uchun zarur 25 ta toʻliq modul.',
    category: 'languages',
    language: 'german',
    level: 'Boshlangʻich (Beginner)',
    rating: 4.9,
    reviewsCount: 1120,
    studentsCount: 7200,
    durationHours: 38,
    lessonsCount: 25,
    instructor: {
      name: 'Ulugʻbek Rayimov',
      role: 'TestDaF C1, DAAD stipendiyasi sohibi',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Myunxen Texnika Universiteti bitiruvchisi, 6 yildan buyon nemis tilidan yuqori natijalarga tayyorlab kelmoqda.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80',
    badge: 'Top Kurs',
    featured: true,
    highlights: [
      '25 ta modulli grammatika va leksika darslari',
      'Goethe-Zertifikat A1-B2 namunaviy testlari',
      'Audio mashgʻulotlar va nemischa muloqot',
      'Bitiruvchi sertifikati'
    ],
    modules: langDeGoetheModules
  },

  // 7. IT Frontend React
  {
    id: 'it-react-frontend',
    title: 'Zamonaviy Frontend Dasturlash: HTML, CSS, React va Tailwind',
    shortDescription: 'Noldan boshlab professional Frontend mutaxassisi boʻling: 25 ta amaliy kodli darslik va real loyihalar.',
    description: 'HTML5 semantikasi, zamonaviy CSS Flexbox/Grid, Tailwind CSS, JavaScript ES6+, React Hooks, API bilan ishlash va toʻliq internet-doʻkon loyihasini qurish.',
    category: 'it',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 3400,
    studentsCount: 24500,
    durationHours: 48,
    lessonsCount: 25,
    instructor: {
      name: 'Sardorbek Islomov',
      role: 'Senior Frontend Muhandis (Fintech)',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      bio: '8 yillik xalqaro IT tajriba egasi, React va TypeScript boʻyicha yirik platformalar arxitektori.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    badge: 'Talabgir',
    featured: true,
    highlights: [
      '25 ta amaliy dasturlash darsi',
      'Brauzerda jonli ishlaydigan kod maydonchasi',
      'Real portfolio loyihasi va kod tekshiruvlari',
      'Frontend dasturchi rasmiy sertifikati'
    ],
    modules: itFrontendModules
  },

  // 8. IT Python & AI
  {
    id: 'it-python-ai',
    title: 'Python va Sunʼiy Intellekt (AI & Data Science) Asoslari',
    shortDescription: 'Python tili sintaksisi, NumPy, Pandas, Scikit-learn hamda Katta Til Modellari (LLM) bilan ishlash kursi.',
    description: 'Pythonda noldan boshlab algoritmlar, maʼlumotlarni tahlil qilish, mashinali oʻrganish (Machine Learning) va zamonaviy Gemini/OpenAI API lari orqali aqlli loyihalar qurish.',
    category: 'it',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 2980,
    studentsCount: 19800,
    durationHours: 46,
    lessonsCount: 25,
    instructor: {
      name: 'Bobur Mirzayev',
      role: 'AI Researcher & Data Scientist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      bio: 'Sunʼiy intellekt va neyron tarmoqlar boʻyicha ilmiy tadqiqotchi, xalqaro musobaqalar gʻolibi.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    badge: 'Yangi Avlod',
    featured: true,
    highlights: [
      '25 ta chuqurlashtirilgan AI va Python darsliklari',
      'Pandas va NumPy bilan real maʼlumotlar tahlili',
      'Gemini AI integratsiyasi va neyron tarmoqlar',
      'Data Science & AI sertifikati'
    ],
    modules: itPythonModules
  },

  // 9. IT Backend Node.js
  {
    id: 'it-backend-node',
    title: 'Backend Dasturlash: Node.js, Express va PostgreSQL',
    shortDescription: 'Yuqori yuklamali serverlar, REST API lar, SQL bazalar, JWT xavfsizlik va Docker deployment.',
    description: 'Server arxitekturasi, maʼlumotlar bazalarini loyihalash, xavfsiz autentifikatsiya, microservislar asoslari va toʻliq real vaqt chat ilovasi backendini yaratish.',
    category: 'it',
    level: 'Ilgʻor (Advanced)',
    rating: 4.8,
    reviewsCount: 1650,
    studentsCount: 11200,
    durationHours: 44,
    lessonsCount: 25,
    instructor: {
      name: 'Javohir Olimov',
      role: 'Lead Backend Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      bio: 'Fintech va e-commerce backend platformalarini yaratish boʻyicha 9 yillik professional tajriba.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    badge: 'Professional',
    featured: false,
    highlights: [
      '25 ta intensiv backend dasturlash darsi',
      'PostgreSQL relyatsion bazasi va SQL soʻrovlar',
      'JWT xavfsiz autentifikatsiya tizimi',
      'Backend muhandis sertifikati'
    ],
    modules: itBackendModules
  },

  // 10. IT Kiberxavfsizlik
  {
    id: 'it-cybersecurity',
    title: 'Kiberxavfsizlik va Axborot Xavfsizligi Asoslari',
    shortDescription: 'Tarmoq protokollari, Linux xavfsizligi, OWASP Top 10 veb zaifliklar va axloqiy xakerlik.',
    description: 'Axborot xavfsizligi mutaxassisi boʻlish uchun zarur barcha amaliy koʻnikmalar: Nmap, Wireshark, kriptografiya, kiberhujumlarni bartaraf etish va tizim himoyasi.',
    category: 'it',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: 8900,
    durationHours: 40,
    lessonsCount: 25,
    instructor: {
      name: 'Timur Karimov',
      role: 'Certified Ethical Hacker (CEH)',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      bio: 'Davlat va bank tizimlarida axborot xavfsizligi auditi oʻtkazuvchi bosh mutaxassis.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    badge: 'Xavfsizlik',
    featured: false,
    highlights: [
      '25 ta amaliy kiberxavfsizlik darslari',
      'OWASP Top 10 zaifliklarni aniqlash va yopish',
      'Tarmoq paketlari tahlili (Wireshark & Nmap)',
      'Axborot xavfsizligi sertifikati'
    ],
    modules: itCyberModules
  },

  // 11. Matematika
  {
    id: 'exact-math-higher',
    title: 'Matematika: Algebra, Geometriya va Milliy Sertifikat',
    shortDescription: 'Tenglamalar, hosilalar, integrallar, stereometriya va ehtimollar nazariyasi boʻyicha 25 ta toʻliq dars.',
    description: 'Oliy oʻquv yurtlariga kirish imtihonlari va Milliy sertifikatda 100% natija qayd etish uchun chuqurlashtirilgan nazariya, formulalar va masalalar yechimlari.',
    category: 'exact_sciences',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 3100,
    studentsCount: 22000,
    durationHours: 45,
    lessonsCount: 25,
    instructor: {
      name: 'Mansurbek Yoqubov',
      role: 'Fizika-matematika fanlari nomzodi, Milliy sertifikat A+',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      bio: 'Oʻquvchilari respublika va xalqaro fan olimpiadalarida muntazam sovrinli oʻrinlarni egallab keladi.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    badge: 'Akademik',
    featured: true,
    highlights: [
      '25 ta modulga ajratilgan fundamental darslik',
      'Hosilalar, integrallar va murakkab geometriya',
      'Milliy sertifikat darajasidagi test savollari',
      'Matematika bitiruv sertifikati'
    ],
    modules: exactMathModules
  },

  // 12. Fizika
  {
    id: 'exact-physics',
    title: 'Fizika: Mexanika, Elektrodinamika va Kvant Asoslari',
    shortDescription: 'Nyuton qonunlari, termodinamika, zanjir qonunlari, optika va atom fizikasi boʻyicha 25 ta dars.',
    description: 'Fizika qonunlarining amaliy tajribalari, formulalarni yodlash emas mantiqiy tushunish va murakkab hisoblash masalalarini oson yechish uslublari.',
    category: 'exact_sciences',
    level: 'Oʻrta (Intermediate)',
    rating: 4.8,
    reviewsCount: 1840,
    studentsCount: 13500,
    durationHours: 42,
    lessonsCount: 25,
    instructor: {
      name: 'Bahodir Ergashev',
      role: 'Oliy toifali fizika fani ustozi',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      bio: '15 yillik pedagogik stajga ega, abituriyentlarni nufuzli texnika universitetlariga tayyorlovchi lektor.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    badge: 'Fundamental',
    featured: false,
    highlights: [
      '25 ta toʻliq amaliy va nazariy dars',
      'Formulalar va fizik hodisalarning jonli tahlili',
      'DTM va olimpiada testlari toʻplami',
      'Fizika fani sertifikati'
    ],
    modules: exactPhysicsModules
  },

  // 13. Kimyo
  {
    id: 'natural-chemistry',
    title: 'Kimyo: Organik va Noorganik Kimyo Laboratoriyasi',
    shortDescription: 'Atom tuzilishi, Mendeleyev davriy qonuni, eritmalar, redoks reaksiyalari va organik moddalar sinflari.',
    description: 'Tibbiyot va farmatsevtika yoʻnalishlariga kiruvchilar uchun 25 ta chuqurlashtirilgan video darslik, reaksiyalar tenglamalari va hisoblash masalalari.',
    category: 'natural_sciences',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 2200,
    studentsCount: 17400,
    durationHours: 44,
    lessonsCount: 25,
    instructor: {
      name: 'Dr. Shahnoza Karimova',
      role: 'Kimyo fanlari doktori, dotsent',
      avatarUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&auto=format&fit=crop&q=80',
      bio: 'Tibbiyot akademiyasida koʻp yillik faoliyat yuritgan, 1000 dan ortiq boʻlajak shifokorlar ustozi.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    badge: 'Tibbiyot Yoʻnalishi',
    featured: true,
    highlights: [
      '25 ta modulli kimyoviy laboratoriya darslari',
      'Reaksiyalar tenglamalari va elektron balans',
      'Eritmalar konsentratsiyasi masalalari',
      'Kimyo laboratoriyasi sertifikati'
    ],
    modules: naturalChemistryModules
  },

  // 14. Biologiya
  {
    id: 'natural-biology',
    title: 'Biologiya: Genetika, Odam Anatomiyasi va Sitologiya',
    shortDescription: 'Hujayra sirlari, DNK biosintezi, Mendel qonunlari, tana aʼzolari va evolutsiya taʼlimoti.',
    description: 'Biologiya fanini eng mayda detallarigacha tushuntiruvchi 25 ta dars: rangli 3D tasvirlar, irsiyat masalalari va Milliy sertifikat talablari.',
    category: 'natural_sciences',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 2600,
    studentsCount: 19100,
    durationHours: 43,
    lessonsCount: 25,
    instructor: {
      name: 'Farrux Saidov',
      role: 'Biolog-genetik, xalqaro biologiya olimpiadasi eksperti',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      bio: 'Genetika va hujayra biologiyasi boʻyicha ilmiy izlanishlar olib borgan amaliyotchi oʻqituvchi.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop&q=80',
    badge: 'Ommabop',
    featured: false,
    highlights: [
      '25 ta vizual va batafsil darslik',
      'Genetika masalalarini tezkor yechish usullari',
      'Inson anatomiyasi va fiziologiyasi sinovlari',
      'Biologiya kursi sertifikati'
    ],
    modules: naturalBiologyModules
  },

  // 15. Geografiya
  {
    id: 'natural-geography',
    title: 'Geografiya: Materiklar, Tabiiy va Iqtisodiy Xaritalar',
    shortDescription: 'Kartografiya, litosfera plitalari, iqlim mintaqalari, dunyo okeani va Oʻzbekiston iqtisodiyoti.',
    description: 'Sayyoramizning tabiati, qitʼalar, daryolar va foydali qazilmalari hamda Oʻzbekiston viloyatlari boʻyicha 25 ta xaritali tahliliy darslik.',
    category: 'natural_sciences',
    level: 'Boshlangʻich (Beginner)',
    rating: 4.8,
    reviewsCount: 920,
    studentsCount: 7100,
    durationHours: 32,
    lessonsCount: 25,
    instructor: {
      name: 'Ziyoda Mirzayeva',
      role: 'Geografiya fani magistri, kartograf',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Milliy geografiya darsliklari hammuallifi, interaktiv xaritalar boʻyicha mutaxassis.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
    badge: 'Xaritali Kurs',
    featured: false,
    highlights: [
      '25 ta xaritalar va materiklar darsi',
      'Topografiya va masshtab amaliyotlari',
      'Oʻzbekiston va jahon iqtisodiyoti tahlili',
      'Geografiya bitiruv sertifikati'
    ],
    modules: naturalGeographyModules
  },

  // 16. Tarix
  {
    id: 'hum-history',
    title: 'Tarix: Oʻzbekiston va Jahon Madaniyatlari Tarixi',
    shortDescription: 'Qadimgi davrlardan to hozirgi kungacha: Amir Temur, Jadidchilik, jahon sivilizatsiyalari va mustaqillik.',
    description: 'Tarixiy sanalar, shaxslar, janglar va madaniy merosni mantiqiy xronologiyada oʻrganuvchi 25 ta ilmiy-ommabop qiziqarli darslik.',
    category: 'humanities',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 1780,
    studentsCount: 15600,
    durationHours: 39,
    lessonsCount: 25,
    instructor: {
      name: 'Prof. Anvar Qosimov',
      role: 'Tarix fanlari doktori, akademik tadqiqotchi',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      bio: 'Sharqshunoslik va Oʻrta Osiyo tarixi boʻyicha oʻnlab monografiyalar muallifi.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80',
    badge: 'Milliy Meros',
    featured: false,
    highlights: [
      '25 ta xronologik tarix darslari',
      'Amir Temur davri va Jadidlar merosi tahlili',
      'Sanalar va shaxslar boʻyicha eslatma testlari',
      'Tarix kursi sertifikati'
    ],
    modules: humHistoryModules
  },

  // 17. Ona Tili va Adabiyot
  {
    id: 'hum-uzbek-lit',
    title: 'Ona Tili va Adabiyot: Milliy Test Tizimiga Tayyorgarlik',
    shortDescription: 'Fonetika, morfologiya, sintaktik tahlil, tinish belgilari va Alisher Navoiydan zamonaviy adabiyotgacha.',
    description: 'Ona tili va adabiyot boʻyicha Milliy sertifikat va kirish imtihonlarida eng yuqori ballni qoʻlga kiritish uchun moʻljallangan 25 ta mukammal darslik.',
    category: 'humanities',
    level: 'Oʻrta (Intermediate)',
    rating: 4.9,
    reviewsCount: 2890,
    studentsCount: 21300,
    durationHours: 42,
    lessonsCount: 25,
    instructor: {
      name: 'Gulnoza Toʻxtayeva',
      role: 'Ona tili va adabiyot fani eksperti, Milliy sertifikat A+',
      avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
      bio: '14 yillik tajribali oʻqituvchi, uning yuzlab shogirdlari filologiya fakultetlari talabalari.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
    badge: 'Milliy Sertifikat',
    featured: true,
    highlights: [
      '25 ta modulli grammatika va adabiy tahlil darsi',
      'Matn bilan ishlash va sintaksis qoidalari',
      'Mumtoz va zamonaviy adabiyot testlari',
      'Ona tili fani rasmiy sertifikati'
    ],
    modules: humUzbekModules
  }
];
