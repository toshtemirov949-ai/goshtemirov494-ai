import { CourseCategory } from '../types';

export interface SubjectBranch {
  name: string;
  desc: string;
  topics: string[];
}

export interface SubjectRoadmapStep {
  stage: string;
  duration: string;
  goal: string;
  skills: string[];
}

export interface SubjectInfo {
  id: string;
  name: string;
  fullName: string;
  category: CourseCategory;
  categoryName: string;
  icon: string;
  badgeColor: string;
  tagline: string;
  description: string;
  importance: string;
  branches: SubjectBranch[];
  roadmap: SubjectRoadmapStep[];
  careers: string[];
  keyFormulasOrFacts: string[];
  exams: string[];
  relatedCourseIds: string[];
  testId?: string;
  toolType?: 'quiz' | 'it' | 'language';
  keywords: string[];
}

export const SUBJECTS_DATA: SubjectInfo[] = [
  // 1. MATEMATIKA
  {
    id: 'matematika',
    name: 'Matematika',
    fullName: 'Matematika: Algebra, Geometriya va Matematik Analiz',
    category: 'exact_sciences',
    categoryName: 'Aniq Fanlar',
    icon: '📐',
    badgeColor: 'from-amber-500 to-orange-600',
    tagline: 'Barcha aniq fanlarning malikasi va abstrakt mantiqiy tafakkur poydevori',
    description: 'Matematika — miqdorlar, tuzilmalar, fazoviy shakllar va oʻzgarishlar haqidagi fundamental fan. U inson tafakkurini tizimlashtiradi, murakkab muammolarni bosqichma-bosqich yechishga oʻrgatadi hamda axborot texnologiyalari, muhandislik va iqtisodiyotning tayanch vositasi hisoblanadi.',
    importance: 'Zamonaviy dunyoda matematika sunʼiy intellekt neyron tarmoqlarini yaratish, kiberxavfsizlik shifrlash algoritmlari, moliya bozorlari tahlili hamda kosmik kemalarni hisoblashda birlamchi poydevordir. Matematikani puxta egallagan inson har qanday murakkab sohani tez oʻzlashtira oladi.',
    branches: [
      {
        name: 'Arifmetika va Algebra',
        desc: 'Sonlar nazariyasi, algebraik ifodalar, tenglamalar, tengsizliklar va funksiyalar tizimi.',
        topics: ['Haqiqiy va ratsional sonlar', 'Chiziqli va kvadrat tenglamalar', 'Logarifmik va koʻrsatkichli funksiyalar', 'Progressiyalar']
      },
      {
        name: 'Planimetriya va Stereometriya',
        desc: 'Tekislikdagi va fazodagi geometrik shakllar, burchaklar, vektorlar hamda hajmlar hisobi.',
        topics: ['Uchburchak va koʻpburchaklar', 'Pifagor va Sinuslar teoremasi', 'Aylana va doira', 'Prizma, piramida va shar hajmlari']
      },
      {
        name: 'Matematik Analiz va Ehtimollar',
        desc: 'Hosilalar, integrallar, funksiyalar limiti hamda tasodifiy hodisalarni modellashtirish.',
        topics: ['Limit va uzluksizlik', 'Funksiya hosilasi va uning tatbiqi', 'Aniq va noaniq integral', 'Kombinatorika va ehtimollar nazariyasi']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Boshlangʻich (Asoslar)',
        duration: '1-2 oy',
        goal: 'Sonlar ustida amallar, ratsional ifodalar va sodda tenglamalarni yechishni oʻzlashtirish',
        skills: ['Qisqa koʻpaytirish formulalari', 'Chiziqli tenglamalar', 'Burchak va uchburchak xossalari']
      },
      {
        stage: '2-bosqich: Oʻrta (Abituriyent va Amaliyot)',
        duration: '3-4 oy',
        goal: 'Trigonometriya, logarifm, stereometriya va koʻrsatkichli tenglamalarni tahlil qilish',
        skills: ['Trigonometrik ayniyatlar', 'Funksiya grafiklari', 'Fazoviy shakllar yuzasi va hajmi']
      },
      {
        stage: '3-bosqich: Ilgʻor (Milliy Sertifikat & OTM)',
        duration: '2-3 oy',
        goal: 'Hosilalar, integrallar va nostandart mantiqiy masalalarni 100% yechish',
        skills: ['Hosilaning geometrik maʼnosi', 'Yuza va hajmni integral orqali hisoblash', 'Olimpiada kombinatorikasi']
      }
    ],
    careers: [
      'Data Scientist va Sunʼiy Intellekt muhandisi',
      'Moliyaviy tahlilchi va Aktuariy (Investitsiya fondlari)',
      'Algoritmik savdo (Trading) va Kvant moliya mutaxassisi',
      'Kriptograf va Kiberxavfsizlik muhandisi',
      'OTM professori va Ilmiy tadqiqotchi'
    ],
    keyFormulasOrFacts: [
      'Pifagor teoremasi: a² + b² = c² (Toʻgʻri burchakli uchburchak gipotenuzasi kvadratiga teng)',
      'Eyler formulasi: e^(i·π) + 1 = 0 (Matematikadagi eng chiroyli tenglama deb tan olingan)',
      'Nyuton-Leybnits formulasi: ∫[a,b] f(x)dx = F(b) - F(a)',
      'Diskriminant: D = b² - 4ac (Kvadrat tenglama ildizlari soni va qiymatini aniqlaydi)'
    ],
    exams: [
      'Oʻzbekiston Milliy Baholash Sertifikati (A+ daraja)',
      'OTM Kirish Testlari (DTM / Bilimni baholash agentligi)',
      'SAT Math Level 1 & 2 / GRE Quantitative'
    ],
    relatedCourseIds: ['exact-math-higher'],
    testId: 'test-exact-math',
    toolType: 'quiz',
    keywords: [
      'matematika', 'matem', 'math', 'mathematics', 'algebra', 'geometriya', 'hisob', 'arifmetika', 
      'integral', 'hosila', 'differensial', 'logarifm', 'trigonometriya', 'uchburchak', 'pifagor',
      'tenglama', 'funksiya', 'milliy sertifikat matematika', 'dtm matematika', 'matematik'
    ]
  },

  // 2. FIZIKA
  {
    id: 'fizika',
    name: 'Fizika',
    fullName: 'Fizika: Mexanika, Elektrodinamika, Optika va Kvant Fizikasi',
    category: 'exact_sciences',
    categoryName: 'Aniq Fanlar',
    icon: '⚡',
    badgeColor: 'from-blue-600 to-cyan-500',
    tagline: 'Koinot sirlari, materiya, energiya va harakat qonuniyatlari ilmi',
    description: 'Fizika — tabiat hodisalari, moddaning tuzilishi, harakat qonunlari hamda fazo va vaqt munosabatlarini oʻrganuvchi fundamental fan. Atom yadrosidan tortib galaktikalargacha boʻlgan barcha jarayonlar fizik qonuniyatlar asosida yuz beradi.',
    importance: 'Fizika barcha texnologik inqiloblarning asosi: elektr energiyasi, yarimoʻtkazgichlar, internet, mobil aloqa, rentgen va MRI apparatlari, kosmik parvozlar va yadro energetikasi aynan fizik kashfiyotlar mahsulidir.',
    branches: [
      {
        name: 'Klassik Mexanika va Statika',
        desc: 'Moddiy nuqta harakati, Nyuton dinamika qonunlari, kuchlar muvozanati va energiya saqlanishi.',
        topics: ['Kinematika va erkin tushish', 'Nyutonning I, II, III qonunlari', 'Impuls va mexanik ish', 'Gidrostatika (Arximed kuchi)']
      },
      {
        name: 'Molekulyar Fizika va Termodinamika',
        desc: 'Gaz qonunlari, modda agregat holatlari, issiqlik miqdori va ideal gaz holat tenglamasi.',
        topics: ['Mendeleyev-Klapeyron tenglamasi', 'Termodinamikaning 1 va 2-qonuni', 'Issiqlik dvigatellari FIKi', 'Toʻyingan bugʻ va namlik']
      },
      {
        name: 'Elektrodinamika va Kvant Fizikasi',
        desc: 'Elektr zaryadlari, doimiy va oʻzgaruvchan tok, magnit maydoni, yorugʻlik toʻlqinlari va fotoeffekt.',
        topics: ['Kulon qonuni va Om qonuni', 'Elektromagnit induksiya (Faradey)', 'Geometrik va toʻlqin optikasi', 'Eynshteyn fotoeffekt tenglamasi']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Mexanika va Birliklar',
        duration: '1-2 oy',
        goal: 'Xalqaro birliklar tizimi (SI), kinematika va Nyuton qonunlarini tajribalar orqali tushunish',
        skills: ['Tezlik va tezlanish formulalari', 'Kuchlar vektor yigʻindisi', 'Mexanik quvvat hisobi']
      },
      {
        stage: '2-bosqich: Issiqlik va Elektromagnetizm',
        duration: '2-3 oy',
        goal: 'Gaz jarayonlari (izobara, izoxora, izoterma) va zanjir qonunlarini mukammal yechish',
        skills: ['Ideal gaz qonunlari', 'Murakkab zanjirlarda Om qonuni', 'Magnit maydonida Lorents kuchi']
      },
      {
        stage: '3-bosqich: Optika, Atom va Olimpiada',
        duration: '2 oy',
        goal: 'Yorugʻlik sinishi, toʻlqinlar interferensiyasi va kvant formulalarini amaliyotda qoʻllash',
        skills: ['Yupqa linza formulasi', 'Plank gipotezasi: E = h·ν', 'Yadro reaksiyalari hisobi']
      }
    ],
    careers: [
      'Muhandis-konstruktor va Texnolog',
      'Energetika va Qayta tiklanuvchi manbalar (Quyosh/Shamol) mutaxassisi',
      'Kosmik muhandis va Aerodinamik tahlilchi',
      'Tibbiy fizika va Rentgenologiya mutaxassisi',
      'Nanotexnologiyalar boʻyicha ilmiy tadqiqotchi'
    ],
    keyFormulasOrFacts: [
      'Nyutonning II qonuni: F = m · a (Kuch jism massasi va uning tezlanishi koʻpaytmasiga teng)',
      'Eynshteynning mashhur tenglamasi: E = m · c² (Massa va energiya ekvivalentligi)',
      'Om qonuni: I = U / R (Tok kuchi kuchlanishga toʻgʻri, qarshilikka teskari mutanosib)',
      'Yorugʻlikning vakuumdagi tezligi: c ≈ 300 000 km/s (Koinotdagi maksimal harakat tezligi)'
    ],
    exams: [
      'Oʻzbekiston Milliy Baholash Sertifikati (Fizika)',
      'DTM OTM Kirish Imtihonlari (Muhandislik va Texnika yoʻnalishlari)',
      'Xalqaro Fizika Olimpiadalari (IPhO) va SAT Physics'
    ],
    relatedCourseIds: ['exact-physics'],
    testId: 'test-exact-physics',
    toolType: 'quiz',
    keywords: [
      'fizika', 'fizik', 'physics', 'mexanika', 'nyuton', 'tok', 'elektr', 'kuchlanish',
      'magnit', 'optika', 'yoruglik', 'kvant', 'termodinamika', 'arximed', 'kulon',
      'om qonuni', 'energiya', 'tezlik', 'massa', 'dtm fizika'
    ]
  },

  // 3. KIMYO
  {
    id: 'kimyo',
    name: 'Kimyo',
    fullName: 'Kimyo: Umumiy, Noorganik va Organik Kimyo',
    category: 'natural_sciences',
    categoryName: 'Tabiiy Fanlar',
    icon: '🧪',
    badgeColor: 'from-emerald-600 to-teal-500',
    tagline: 'Moddalar xossalari, ularning oʻzgarishi va yangi birikmalar sintezi',
    description: 'Kimyo — moddalar, ularning tarkibi, ichki tuzilishi, xossalari hamda kimyoviy reaksiyalar orqali bir-biriga aylanish qonuniyatlarini oʻrganadi. Barcha tirik va jonsiz tabiat atom va molekulalarning kimyoviy bogʻlanishlaridan tashkil topgan.',
    importance: 'Farmatsevtika va yangi dori-darmonlar yaratish, toza ichimlik suvi texnologiyalari, oziq-ovqat xavfsizligi, polimerlar va ekologik toza materiallar ishlab chiqarish bevosita kimyo fani yutuqlariga asoslanadi.',
    branches: [
      {
        name: 'Umumiy va Noorganik Kimyo',
        desc: 'Atom tuzilishi, D.I. Mendeleyev davriy qonuni, metallar va nometallar kimyosi.',
        topics: ['Davriy jadval va valentlik', 'Kimyoviy bogʻlanish turlari', 'Oksidlanish-qaytarilish reaksiyalari', 'Kislotalar, asoslar va tuzlar']
      },
      {
        name: 'Organik Kimyo va Biopolimerlar',
        desc: 'Uglerod birikmalari, toʻyingan va toʻyinmagan uglevodorodlar, spirtlar, oqsillar va lipidlar.',
        topics: ['Alkanlar, alkenlar va alkinlar', 'Aromatik uglevodorodlar (Benzol)', 'Spirtlar, aldegidlar va karbon kislotalar', 'Aminokislotalar va DNK sintezi']
      },
      {
        name: 'Kimyoviy Texnologiya va Masalalar',
        desc: 'Eritmalar konsentratsiyasi (molyar, foizli), gaz aralashmalari va unumdorlik hisobi.',
        topics: ['Molyar massa va modda miqdori (mol)', 'Eritmalarni aralashtirish (diagonal usul)', 'Reaksiya kinetikasi va muvozanat', 'Elektroliz va galvanik elementlar']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Davriy Qonun va Moddalar',
        duration: '1-2 oy',
        goal: 'Mendeleyev jadvali, valentlik va oksidlanish darajalarini toʻliq egallash',
        skills: ['Formulalarni toʻgʻri tuzish', 'Reaksiya tenglamalarini tenglashtirish', 'Modda miqdori (n = m/M) hisoblari']
      },
      {
        stage: '2-bosqich: Anorganik Sinflar va Eritmalar',
        duration: '2-3 oy',
        goal: 'Oksid, kislota, asos va tuzlarning genetik bogʻlanishi hamda murakkab eritmalar',
        skills: ['Oksidlanish-qaytarilish reaksiyalari (elektron balans)', 'Eritmalar konsentratsiyasi', 'Gidroliz jarayonlari']
      },
      {
        stage: '3-bosqich: Organik Kimyo va Laboratoriya',
        duration: '2-3 oy',
        goal: 'Uglerod zanjirlari, izomeriya, organik sintez va tibbiy kimyo formulalari',
        skills: ['Reaksiyalar mexanizmi (Markovnikov qoidasi)', 'Sifat reaksiyalari (choʻkma va gaz ajralishi)', 'DTM murakkab masalalari']
      }
    ],
    careers: [
      'Farmatsevt va Dori yaratuvchi texnolog',
      'Neft va gaz kimyosi muhandisi',
      'Biotexnolog va Oziq-ovqat xavfsizligi eksperti',
      'Sud-tibbiy ekspert va Kriminalistika kimyogari',
      'Ekolog va Atrof-muhit monitoringi mutaxassisi'
    ],
    keyFormulasOrFacts: [
      'Modda miqdori formulasi: n = m / M = V / V_m = N / N_A',
      'Avogadro soni: N_A = 6.02 · 10²³ ta molekula (1 mol moddadagi zarrachalar soni)',
      'Normal sharoitda 1 mol har qanday gaz egallaydigan hajm: V_m = 22.4 litr',
      'pH shkalasi: pH < 7 kislotali, pH = 7 neytral, pH > 7 ishqoriy muhitni ifodalaydi'
    ],
    exams: [
      'Oʻzbekiston Milliy Baholash Sertifikati (Kimyo)',
      'Tibbiyot OTMlari va Farmatsevtika kirish imtihonlari (DTM)',
      'Xalqaro Kimyo Olimpiadasi (IChO)'
    ],
    relatedCourseIds: ['natural-chemistry'],
    testId: 'test-natural-chemistry',
    toolType: 'quiz',
    keywords: [
      'kimyo', 'ximiya', 'chemistry', 'mendeleyev', 'davriy jadval', 'organik kimyo',
      'noorganik', 'reaksiya', 'valentlik', 'eritma', 'kislota', 'ishqor', 'tuz',
      'uglevodorod', 'alkan', 'farmatsevtika', 'tibbiyot kimyo', 'dtm kimyo'
    ]
  },

  // 4. BIOLOGIYA
  {
    id: 'biologiya',
    name: 'Biologiya',
    fullName: 'Biologiya: Hujayra Sitologiyasi, Odam Anatomiyasi va Genetika',
    category: 'natural_sciences',
    categoryName: 'Tabiiy Fanlar',
    icon: '🧬',
    badgeColor: 'from-green-600 to-emerald-500',
    tagline: 'Hayot evolyutsiyasi, tirik organizmlar tuzilishi va irsiyat sirlari',
    description: 'Biologiya — biosferadagi barcha tirik mavjudotlar, ularning hujayraviy tuzilishi, moddalar almashinuvi, koʻpayishi, genetik kod va atrof-muhit bilan oʻzaro munosabatlarini oʻrganuvchi hayotiy fandir.',
    importance: 'Zamonaviy biologiya — inson umrini uzaytirish, saraton va genetik kasalliklarni davolash, gen muhandisligi (CRISPR), sunʼiy aʼzolar yetishtirish hamda qishloq xoʻjaligida hosildorlikni oshirishning kalitidir.',
    branches: [
      {
        name: 'Sitologiya va Molekulyar Biologiya',
        desc: 'Hujayra organoidlari, ATF sintezi, oqsil biosintezi, mitoz va meyoz boʻlinish.',
        topics: ['Prokariot va eukariot hujayralar', 'Plazmatik membrana va ribosoma', 'Transkripsiya va translyatsiya', 'DNK replikatsiyasi']
      },
      {
        name: 'Odam Anatomiyasi va Fiziologiyasi',
        desc: 'Inson aʼzolari tizimi: qon aylanish, nerv, nafas, hazm va endokrin bezlar.',
        topics: ['Yurak va qon tomirlar ishlashi', 'Bosh miya va reflekslar', 'Gormonlar va immunitet', 'Moddalar almashinuvi (metabolizm)']
      },
      {
        name: 'Genetika va Seleksiya',
        desc: 'Mendel qonunlari, xromosoma nazariyasi, irsiy kasalliklar va chatishtirish masalalari.',
        topics: ['Monogibrid va digibrid chatishtirish', 'Jinsga birikkan irsiylanish', 'Mutatsiyalar va modifikatsiyalar', 'Populyatsiya genetikasi']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Botanika va Zoologiya',
        duration: '1-2 oy',
        goal: 'Oʻsimliklar va hayvonot dunyosi xilma-xilligi, sistematikasi va hayotiy sikllari',
        skills: ['Oʻsimlik toʻqimalari va aʼzolari', 'Umurtqasiz va umurtqali hayvonlar tuzilishi']
      },
      {
        stage: '2-bosqich: Odam Anatomiyasi',
        duration: '2 oy',
        goal: 'Inson tanasining 12 ta tizimini va ularning funksional oʻzaro bogʻliqligini oʻrganish',
        skills: ['Katta va kichik qon aylanish doiralari', 'Nerv impulslarining oʻtishi', 'Gomeostaz tushunchasi']
      },
      {
        stage: '3-bosqich: Genetika va Molekulyar Masalalar',
        duration: '2-3 oy',
        goal: 'DNK uzunligi, massasi, vodorod bogʻlari va chatishtirish masalalarini 100% yechish',
        skills: ['Chargaff qoidasi (A=T, G=S)', 'Pennet panjarasi orqali fenotipni topish', 'DTM 30/30 natijaga erishish']
      }
    ],
    careers: [
      'Shifokor, Jarroh va Klinik tahlilchi',
      'Genetik muhandis va Biotexnolog',
      'Nevrolog va Kognitiv soha mutaxassisi',
      'Bioinformatik (Katta genetik maʼlumotlar tahlilchisi)',
      'Ekolog va Tabiatni muhofaza qilish inspektori'
    ],
    keyFormulasOrFacts: [
      'Chargaff qoidasi: A = T va G = S (Adenin doim Timin bilan, Guanin Sitozin bilan bogʻlanadi)',
      'Mendelning I qonuni: Birinchi avlod duragaylarining bir xillik qonuni',
      'Inson tanasida taxminan 37 trillion tirik hujayra va 20 000 dan ortiq gen mavjud',
      'Mitoz natijasida bitta ona hujayradan 2 ta xromosoma toʻplami teng diploid hujayra hosil boʻladi'
    ],
    exams: [
      'Oʻzbekiston Milliy Baholash Sertifikati (Biologiya)',
      'Tibbiyot Akademiyasi va OTMlarga kirish imtihonlari (DTM)',
      'Xalqaro Biologiya Olimpiadasi (IBO)'
    ],
    relatedCourseIds: ['natural-biology'],
    testId: 'test-natural-biology',
    toolType: 'quiz',
    keywords: [
      'biologiya', 'biology', 'anatomiya', 'genetika', 'hujayra', 'dnk', 'rnk',
      'odam tanasi', 'yurak', 'mendel qonunlari', 'mitoz', 'meyoz', 'botanika',
      'zoologiya', 'organizm', 'tibbiyot biologiya', 'dtm biologiya'
    ]
  },

  // 5. GEOGRAFIYA
  {
    id: 'geografiya',
    name: 'Geografiya',
    fullName: 'Geografiya: Materiklar, Tabiiy, Ijtimoiy va Iqtisodiy Geografiya',
    category: 'natural_sciences',
    categoryName: 'Tabiiy Fanlar',
    icon: '🌍',
    badgeColor: 'from-teal-600 to-sky-500',
    tagline: 'Sayyoramiz tabiati, jahon davlatlari, iqtisodiy resurslar va geosiyosat',
    description: 'Geografiya — Yer yuzi, uning tabiiy qobiqlari (litosfera, gidrosfera, atmosfera, biosfera), aholi joylashuvi hamda xoʻjalik tarmoqlarining fazoviy tarqalishini oʻrganuvchi kompleks fandir.',
    importance: 'Logistika, xalqaro savdo yoʻllari, iqlim oʻzgarishi muammolarini yechish, shaharsozlik (Urban Planning) va global investitsiya qarorlarida geografik bilimlar hal qiluvchi ahamiyat kasb etadi.',
    branches: [
      {
        name: 'Umumiy Yer Bilimi va Tabiiy Geografiya',
        desc: 'Litosfera plitalari harakati, relyef, iqlim mintaqalari va gidrologiya.',
        topics: ['Litosfera va seysmik mintaqalar', 'Atmosfera sirkulyatsiyasi va shamollar', 'Okean oqimlari va ichki suvlar', 'Tabiat zonalari']
      },
      {
        name: 'Materiklar va Okeanlar Geografiyasi',
        desc: '6 ta materik va 4 ta okeanning oʻziga xos geografik oʻrni, tabiati va boyliklari.',
        topics: ['Yevrosiyo va Afrika tabiati', 'Shimoliy va Janubiy Amerika', 'Antarktida va Avstraliya', 'Tinch, Atlantika, Hind, Shimoliy Muz okeanlari']
      },
      {
        name: 'Ijtimoiy-Iqtisodiy Geografiya va Demografiya',
        desc: 'Jahon aholisi, urbanizatsiya, sanoat tarmoqlari, xalqaro transport va Oʻzbekiston iqtisodiyoti.',
        topics: ['Aholi soni, migratsiya va millatlar', 'Energetika va metallurgiya sanoati', 'Qishloq xoʻjaligi mintaqalari', 'Oʻzbekistonning 14 ta hududi iqtisodiy salohiyati']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Xarita va Koordinatalar',
        duration: '1 oy',
        goal: 'Masshtab, meridian va parallellar, gradus toʻri hamda relyef chiziqlarini tahlil qilish',
        skills: ['Geografik koordinatalarni aniqlash', 'Mahalliy vaqt va soat mintaqalari hisobi']
      },
      {
        stage: '2-bosqich: Materiklar va Tabiiy Mintaqalar',
        duration: '2 oy',
        goal: 'Daryolar, togʻlar, sahrolar va iqlim diagrammalarini xaritasiz yoddan topish',
        skills: ['Iqlim tiplarini diagramma orqali aniqlash', 'Materiklar ekstremal nuqtalari']
      },
      {
        stage: '3-bosqich: Jahon Iqtisodiyoti va Oʻzbekiston',
        duration: '2 oy',
        goal: 'Xom-ashyo qazib olish, eksport-import yoʻnalishlari va statistik jadvallarni tahlil qilish',
        skills: ['BMT davlatlari tasnifi', 'Iqtisodiy hududlar ixtisoslashuvi', 'DTM 30/30 natijasi']
      }
    ],
    careers: [
      'Xalqaro logistika va taʼminot zanjiri menejeri',
      'GIS (Geografik axborot tizimlari) mutaxassisi',
      'Shaharsozlik (Urban Planning) loyihachisi',
      'Xalqaro munosabatlar va Geosiyosiy tahlilchi',
      'Turizm va ekoturizm loyihalari rahbari'
    ],
    keyFormulasOrFacts: [
      'Yerning 1 gradus meridian yoyining oʻrtacha uzunligi: 111.1 kilometr',
      'Yer oʻz oʻqi atrofida 1 soatda 15 gradusga buriladi (1 gradus = 4 daqiqa vaqt farqi)',
      'Yer yuzining 71% qismini Jahon okeani, faqat 29% qismini quruqlik egallaydi',
      'Eng baland choʻqqi — Everest (Jomolungma, 8848 m), eng chuqur botiq — Mariana (11022 m)'
    ],
    exams: [
      'Oʻzbekiston Milliy Baholash Sertifikati (Geografiya)',
      'Jahon Iqtisodiyoti va Diplomatiya Universiteti (UWED) va OTM kirish imtihonlari',
      'Xalqaro Geografiya Olimpiadasi (iGeo)'
    ],
    relatedCourseIds: ['natural-geography'],
    testId: 'test-natural-geography',
    toolType: 'quiz',
    keywords: [
      'geografiya', 'geography', 'xarita', 'materik', 'okean', 'iqlim', 'davlatlar',
      'poytaxtlar', 'aholi', 'iqtisodiy geografiya', 'litosfera', 'toglar', 'daryolar',
      'soat mintaqalari', 'ozbekiston geografiyasi', 'dtm geografiya'
    ]
  },

  // 6. TARIX
  {
    id: 'tarix',
    name: 'Tarix',
    fullName: 'Tarix: Oʻzbekiston va Jahon Madaniyatlari Tarixi',
    category: 'humanities',
    categoryName: 'Ijtimoiy-Gumanitar Fanlar',
    icon: '📜',
    badgeColor: 'from-amber-700 to-yellow-600',
    tagline: 'Oʻtmish saboqlari, buyuk davlatchilik, sivilizatsiyalar va buyuk ajdodlar meʼrosi',
    description: 'Tarix — insoniyat jamiyatining paydo boʻlishidan to bugungi kungacha boʻlgan bosqichlarini, buyuk davlatlar yuksalishi va tanazzulini, madaniyatlar toʻqnashuvi hamda tarixiy shaxslar faoliyatini oʻrganadi.',
    importance: 'Oʻtmishni bilmay kelajakni qurib boʻlmaydi. Tarix milliy oʻzlikni shakllantiradi, strategik qarorlar qabul qilishda oʻtmishdagi xato va yutuqlarni tahlil qilish imkonini beradi hamda davlat boshqaruvi va huquqshunoslikning tamal toshidir.',
    branches: [
      {
        name: 'Oʻzbekiston Tarixi (Qadimgi va Oʻrta Asrlar)',
        desc: 'Baqtriya, Sugʻd, Xorazm, Somoniylar, Qoraxoniylar, Xorazmshohlar va Amir Temur saltanati.',
        topics: ['Ibtidoiy jamoa va qadimgi davlatlar', 'Buyuk Ipak yoʻli', 'Amir Temur va Temuriylar renessansi', 'Buxoro, Xiva va Qoʻqon xonliklari']
      },
      {
        name: 'Jahon Tarixi va Buyuk Sivilizatsiyalar',
        desc: 'Qadimgi Misr, Rim, Yunoniston, Uygʻonish davri, Buyuk geografik kashfiyotlar va jahon urushlari.',
        topics: ['Qadimgi Sharq va Antik davr', 'Oʻrta asrlar Yevropasi va Xilofat', 'Sanoat toʻntarishi va inqiloblar', 'I va II Jahon urushlari']
      },
      {
        name: 'Yangi va Eng Yangi Tarix',
        desc: 'Mustamlaka davri, Jadidchilik harakati, Oʻzbekistonning mustaqillikka erishishi va zamonaviy taraqqiyot.',
        topics: ['Chor Rossiyasi bosqini', 'Jadid maʼrifatparvarlari faoliyati', 'Mustaqillik deklaratsiyasi', 'Yangi Oʻzbekiston islohotlari']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Qadimgi Dunyo va Xronologiya',
        duration: '1-2 oy',
        goal: 'Miloddan avvalgi va milodiy sanalar, arxeologik madaniyatlar va ilk davlatlar',
        skills: ['Tarixiy xronologik jadval tuzish', 'Tarixiy xaritalardan foydalanish']
      },
      {
        stage: '2-bosqich: Oʻrta Asrlar va Temuriylar',
        duration: '2 oy',
        goal: 'Buyuk allomalar (Ibn Sino, Beruniy, Mirzo Ulugʻbek) va Temuriylar davlat boshqaruvi',
        skills: ['Manbalar tahlili (Boburnoma, Zafarnoma)', 'Tarixiy shaxslar roʻyxatini solishtirish']
      },
      {
        stage: '3-bosqich: Jadidchilik va Mustaqillik',
        duration: '2 oy',
        goal: 'Behbudiy, Fitrat, Choʻlpon merosi, 1991-yildan keyingi davlat tuzilishi va DTM testlari',
        skills: ['Hujjatlar va shartnomalar sanalari', 'DTM 30/30 tarixiy savollariga aniq javob']
      }
    ],
    careers: [
      'Huquqshunos, Advokat va Davlat xizmatchisi',
      'Xalqaro diplomat va Elchixona attashesi',
      'Tarixchi-tadqiqotchi va Arxeolog',
      'Muzeyshunos va Madaniy meros eksperti',
      'Siyosiy tahlilchi va Jurnalist'
    ],
    keyFormulasOrFacts: [
      'Amir Temur davlat boshqaruvi shiori: "Kuch — adolatdadir" (Tuzukoti Temuriy)',
      '1991-yil 31-avgust — Oʻzbekiston Respublikasining davlat mustaqilligi eʼlon qilingan kun',
      'Dunyoning eng qadimgi yozma qonunlar majmuasi — Bobil shohi Xammurapi qonunlari (m.a. XVIII asr)',
      'Buyuk Ipak yoʻli Sharq va Gʻarb oʻrtasida savdo va sivilizatsiyalar koʻprigi vazifasini bajargan'
    ],
    exams: [
      'Oʻzbekiston Milliy Baholash Sertifikati (Tarix)',
      'Toshkent Davlat Yuridik Universiteti (TDYU) va OTM kirish imtihonlari',
      'Tarix fani boʻyicha Respublika fan olimpiadasi'
    ],
    relatedCourseIds: ['hum-history'],
    testId: 'test-humanities-history',
    toolType: 'quiz',
    keywords: [
      'tarix', 'history', 'ozbekiston tarixi', 'jahon tarixi', 'amir temur', 'bobur',
      'temuriylar', 'xonliklar', 'qadimgi dunyo', 'rim', 'misr', 'jadidlar',
      'mustaqillik', 'urush', 'sivilizatsiya', 'arxeologiya', 'dtm tarix'
    ]
  },

  // 7. ONA TILI VA ADABIYOT
  {
    id: 'ona-tili',
    name: 'Ona Tili va Adabiyot',
    fullName: 'Ona Tili va Adabiyot: Grammatika, Leksikologiya, Matn Tahlili va Insho',
    category: 'humanities',
    categoryName: 'Ijtimoiy-Gumanitar Fanlar',
    icon: '✍️',
    badgeColor: 'from-rose-600 to-pink-500',
    tagline: 'Millat ruhiyati, soʻz boyligi, badiiy tafakkur va savodxonlik poydevori',
    description: 'Ona tili va adabiyot — millat tafakkuri, oʻzbek adabiy tilining fonetik, leksik, morfologik va sintaktik meʼyorlarini hamda asrlar davomida yaratilgan mumtoz va zamonaviy adabiy durdonalarni oʻrganadi.',
    importance: 'Fikrni chiroyli va taʼsirli ifodalash (oratorlik), savodli yozish, huquqiy va rasmiy hujjatlar tuzish, ommaviy axborot vositalarida publitsistika yuritish hamda oʻzbek tilining nufuzini jahon miqyosida yuksaltirishda ushbu fan asosiy oʻrin tutadi.',
    branches: [
      {
        name: 'Fonetika, Grafika va Orfoepiya',
        desc: 'Tovushlar tasnifi, boʻgʻin, urgʻu, fonetik hodisalar (tovush almashinuvi, tushishi, ortishi).',
        topics: ['Ulli va undosh tovushlar', 'Imlo qoidalari', 'Tarixiy va zamonaviy imlo mezonlari', 'Urgʻu va ohang']
      },
      {
        name: 'Morfologiya va Soʻz Yasash',
        desc: '10 ta soʻz turkumi: mustaqil, yordamchi va alohida soʻz guruhlari hamda ularning shakllari.',
        topics: ['Ot, sifat, son, olmosh, feʼl, ravish', 'Koʻmakchi, bogʻlovchi, yuklama', 'Feʼlning vazifadosh shakllari (ravishdosh, sifatdosh, harakat nomi)', 'Soʻz yasovchi qoʻshimchalar']
      },
      {
        name: 'Sintaksis, Matn Tahlili va Adabiyot',
        desc: 'Soʻz birikmalari, sodda va qoʻshma gaplar, tinish belgilari hamda badiiy asarlar tahlili.',
        topics: ['Bogʻlangan, ergashgan va bogʻlovchisiz qoʻshma gaplar', 'Ajratilgan boʻlaklar va kirish soʻzlar', 'Badiiy sanʼatlar (tashbeh, istiora, tazod)', 'Alisher Navoiy, Abdulla Qodiriy va Choʻlpon merosi']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Fonetika va Imlo Qoidalari',
        duration: '1 oy',
        goal: 'Soʻzlarni xatosiz yozish, unli-undosh xususiyatlari va tuturuqli urgʻu qoʻyish',
        skills: ['Tutuq belgisi (ʼ) qoidalari', 'Asos va qoʻshimcha chegaralarini aniqlash']
      },
      {
        stage: '2-bosqich: Morfologiya va Soʻz Turkumlari',
        duration: '2 oy',
        goal: 'Feʼl mayllari, nisbatlar, yordamchi soʻzlar va gap boʻlaklarini tahlil qilish',
        skills: ['Morfologik tahlil oʻtkazish', 'Bosh va ikkinchi darajali boʻlaklarni topish']
      },
      {
        stage: '3-bosqich: Sintaksis, Matn va Milliy Sertifikat',
        duration: '2 oy',
        goal: 'Murakkab sintaktik yaxlitlik, insho yozish mezonlari va adabiyot testlari',
        skills: ['Tinish belgilarini asoslab qoʻyish', 'Essé/Insho yozish metodikasi', 'Milliy sertifikat A+ natija']
      }
    ],
    careers: [
      'Filolog, Muharrir va Matn muharriri (Copywriter / Korrektor)',
      'Jurnalist, Teleboshlovchi va Ssenariy muallifi',
      'Davlat tili va ish yuritish maslahatchisi',
      'Badiiy tarjimon va Adabiyotshunos',
      'Pedagog va Repetitor'
    ],
    keyFormulasOrFacts: [
      'Alisher Navoiy oʻzbek adabiy tilining asoschisi va "Xamsa" (besh doston) muallifidir',
      'Oʻzbek tilida 6 ta unli fonema va 23 ta undosh fonema mavjud',
      '1989-yil 21-oktabrda Oʻzbek tiliga Davlat tili maqomi berilgan',
      'Ergashgan qoʻshma gaplarda bosh gap va ergash gap oʻzaro bogʻlovchi vositalar orqali birikadi'
    ],
    exams: [
      'Ona Tili va Adabiyotdan Milliy Baholash Sertifikati (A+ daraja)',
      'Barcha OTMlar uchun majburiy blok va asosiy blok imtihonlari (DTM)',
      'Alisher Navoiy nomidagi davlat stipendiyasi tanlovlari'
    ],
    relatedCourseIds: ['hum-uzbek-lit'],
    testId: 'test-humanities-uzbek',
    toolType: 'quiz',
    keywords: [
      'ona tili', 'adabiyot', 'ozbek tili', 'grammatika', 'fonetika', 'morfologiya',
      'sintaksis', 'gap bolaklari', 'imlo', 'insho', 'navoiy', 'qodiriy',
      'soz turkumlari', 'milliy sertifikat ona tili', 'dtm ona tili'
    ]
  },

  // 8. INGLIZ TILI
  {
    id: 'ingliz-tili',
    name: 'Ingliz Tili',
    fullName: 'Ingliz Tili: General English, IELTS 7.5+ va CEFR B2/C1',
    category: 'languages',
    categoryName: 'Xorijiy Tillar',
    icon: '🇬🇧',
    badgeColor: 'from-indigo-600 to-blue-500',
    tagline: 'Global muloqot, xalqaro biznes, fan va taʼlimning umumjahon tili',
    description: 'Ingliz tili — 1.5 milliarddan ortiq inson muloqot qiladigan jahon tili. Barcha yetakchi ilmiy maqolalar, dasturlash tillari hujjatlari va xalqaro diplomatiya aynan ingliz tilida olib boriladi.',
    importance: 'Ingliz tilini bilish dunyoning eng nufuzli universitetlarida (Harvard, Oxford, MIT) bepul grantlar yutish, xalqaro IT kompaniyalarida yuqori maoshli ishlash hamda dunyo boʻylab erkin sayohat qilish eshigini ochadi.',
    branches: [
      {
        name: 'Listening & Reading (Qabul qilish koʻnikmalari)',
        desc: 'Akademik matnlar, maqolalar va ilmiy audiolarni tushunish, skimm & scan texnikasi.',
        topics: ['Audioda kalit soʻzlarni ilgʻash', 'Koʻp tanlovli (MCQ) savollar strategiyasi', 'True / False / Not Given tahlili', 'Ilmiy lugʻat boyligi (Vocabulary)']
      },
      {
        name: 'Writing Task 1 & Task 2 (Yozma nutq)',
        desc: 'Jadvallar, grafiklar tahlili hamda dalillarga asoslangan akademik insholar (Essay).',
        topics: ['Grafik va diagrammalarni ifodalash', 'Fikrni argumentlash (Opinion Essay)', 'Muammo va yechim insholari', 'Murakkab grammatik tuzilmalar']
      },
      {
        name: 'Speaking & Pronunciation (Jonli muloqot)',
        desc: 'Ravon nutq, idiomalar, aksentsiz talaffuz va intervyu savollariga erkin javob.',
        topics: ['Part 1 kundalik savollar', 'Part 2 Cue Card boʻyicha 2 daqiqa gapirish', 'Part 3 chuqur falsafiy munozaralar', 'Bogʻlovchi iboralar (Linking devices)']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: A1 - A2 (Elementary / Pre-Intermediate)',
        duration: '2-3 oy',
        goal: 'Boshlangʻich grammatika (Tenses, Modals) va 1500 ta eng koʻp ishlatiladigan soʻz',
        skills: ['Oʻzini tanishtirish', 'Sodda kundalik mavzularda suhbatlashish']
      },
      {
        stage: '2-bosqich: B1 - B2 (Intermediate / Upper-Intermediate)',
        duration: '3-4 oy',
        goal: 'Erkin soʻzlashuv, murakkab zamonlar, passiv nisbat va 4000+ soʻz boyligi',
        skills: ['Inglizcha filmlar va kitoblarni tushunish', 'Xat va hisobotlar yozish']
      },
      {
        stage: '3-bosqich: IELTS 7.5+ / C1 (Advanced Mastery)',
        duration: '3 oy',
        goal: 'IELTS imtihonida har bir moduldan kamida 7.0 - 8.5 ball natija koʻrsatish',
        skills: ['Akademik insho andozalari', 'Xalqaro imtihon testlarini vaqtida bajarish']
      }
    ],
    careers: [
      'Xalqaro IT kompaniyalarida Dasturchi va PM',
      'Sinxron tarjimon va Diplomat',
      'IELTS va Xorijiy tillar boʻyicha yetakchi repetitor',
      'Xalqaro savdo va Logistika menejeri',
      'Xorijiy kompaniyalarning Oʻzbekistondagi vakili'
    ],
    keyFormulasOrFacts: [
      'IELTS ballari 1 dan 9 gacha shkala boʻyicha hisoblanadi (7.5+ "C1 - Expert User" darajasi)',
      'Ingliz tilida 1 milliondan ortiq soʻz mavjud, ammo kundalik soʻzlashuvning 85% qismi 3000 ta soʻz bilan amalga oshadi',
      'Inversiya qoidasi: "Hardly had we arrived when the lesson started" (Ilgʻor grammatika)',
      'Techie AI bilan 24/7 jonli ovozli suhbat orqali Speaking natijasini 2 barobar tezlashtirish mumkin'
    ],
    exams: [
      'IELTS Academic & General Training (7.0 - 8.5+)',
      'TOEFL iBT (100+)',
      'Milliy CEFR B2 va C1 sertifikati',
      'Cambridge English: C1 Advanced (CAE)'
    ],
    relatedCourseIds: ['lang-en-ielts', 'lang-en-general'],
    testId: 'test-languages-ielts',
    toolType: 'language',
    keywords: [
      'ingliz tili', 'english', 'ielts', 'toefl', 'cefr', 'general english', 'grammar',
      'speaking', 'listening', 'reading', 'writing', 'inglizcha', 'vocabulary',
      'insho', 'lugat', 'ingliz tili repetitor'
    ]
  },

  // 9. RUS TILI
  {
    id: 'rus-tili',
    name: 'Rus Tili',
    fullName: 'Rus Tili: Разговорный и Деловой Русский Язык',
    category: 'languages',
    categoryName: 'Xorijiy Tillar',
    icon: '🇷🇺',
    badgeColor: 'from-red-600 to-sky-600',
    tagline: 'MDH davlatlariaro muloqot, ishbilarmonlik, texnika va boy adabiyot tili',
    description: 'Rus tili — BMTning 6 ta rasmiy tilidan biri boʻlib, Markaziy Osiyo va Sharqiy Yevropa boʻylab 250 milliondan ortiq insonlar foydalanadigan xalqaro aloqa vositasidir.',
    importance: 'Biznes va korporativ muhitda rasmiy hujjatlarni yuritish, xalqaro hamkorlar bilan muzokaralar olib borish va texnik adabiyotlarni oʻrganishda rus tili oʻta muhim amaliy ahamiyatga ega.',
    branches: [
      {
        name: 'Разговорный Русский (Jonli Soʻzlashuv)',
        desc: 'Aktsentsiz talaffuz, iboralar, maqollar va kundalik vaziyatlarda erkin fikr bildirish.',
        topics: ['Kundalik situatsiyalar', 'Feʼllar boshqaruvi va rodlar', 'Ravon suhbat dialoglari', 'Jonli intonatsiya']
      },
      {
        name: 'Деловой Русский (Ishbilarmonlik Tili)',
        desc: 'Shartnomalar tuzish, rasmiy yozishmalar, taqdimotlar va muzokaralar leksikasi.',
        topics: ['Biznes xatlar (Деловая переписка)', 'Tijoriy takliflar va hisobotlar', 'Muzokara etiketlari', 'Yuridik atamalar']
      },
      {
        name: 'Практическая Грамматика (Grammatika)',
        desc: '6 ta kelishik (Падежи), feʼl turlari (СВ va НСВ), harakat feʼllari va prefikslar.',
        topics: ['Ot va sifatlarning kelishiklarda turlanishi', 'Глаголы движения (идти/ходить, ехать/ездить)', 'Склонение числительных', 'Punktutatsiya']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: A1 - A2 (Baza)',
        duration: '2 oy',
        goal: 'Rus alifbosi, rodlar, sonlar va sodda kelishiklar (Предложный, Винительный)',
        skills: ['Doʻkon va transportda gaplasha olish', 'Sodda matnlarni oʻqish va tarjima qilish']
      },
      {
        stage: '2-bosqich: B1 (Oʻrta daraja)',
        duration: '2-3 oy',
        goal: 'Barcha 6 ta kelishikni chalkashtirmasdan qoʻllash va harakat feʼllarini tushunish',
        skills: ['Erkin dialog olib borish', 'Xatolarsiz yozish qoidalari']
      },
      {
        stage: '3-bosqich: B2 - C1 (Ishbilarmonlik)',
        duration: '2 oy',
        goal: 'Rasmiy hujjatlar tayyorlash, taqdimotlar oʻtkazish va TRKI sertifikatiga tayyorgarlik',
        skills: ['Biznes leksikasi', 'Murakkab sintaktik tuzilmalarni qoʻllash']
      }
    ],
    careers: [
      'B2B Sotuvlar va Mijozlar bilan aloqa menejeri',
      'Eksport-Import boʻyicha menejer',
      'Rus tili repetitori va Tarjimon',
      'Korporativ kotib va Ish yurituvchi',
      'Turizm va mehmondoʻstlik sohasida boshqaruvchi'
    ],
    keyFormulasOrFacts: [
      'Rus tilida 6 ta kelishik (Именительный, Родительный, Дательный, Винительный, Творительный, Предложный) mavjud',
      'Rus tili boy leksik fondga ega: Pushkin, Tolstoy, Dostoevskiy kabi jahon klassiklari ushbu tilda ijod qilgan',
      'Harakat feʼllariga qoʻshiladigan prefikslar (при-, у-, вы-, за-, пере-) harakat yoʻnalishini butunlay oʻzgartiradi',
      'Techie AI bilan rus tilida soʻzlashuv mashqlari nutq toʻsigʻini (языковой барьер) 2 haftada yoʻqotadi'
    ],
    exams: [
      'ТРКИ (Тест по русскому языку как иностранному) - B1/B2',
      'Oʻzbekiston Milliy Sertifikati (Rus tili)',
      'Rossiya OTMlariga kirish imtihonlari (ЕГЭ / Вступительные)'
    ],
    relatedCourseIds: ['lang-ru-speaking', 'lang-ru-business'],
    testId: 'test-languages-russian-speaking',
    toolType: 'language',
    keywords: [
      'rus tili', 'russian', 'ruscha', 'разговорный русский', 'деловой русский',
      'падежи', 'kelishiklar', 'grammatika', 'sozlashuv', 'trki', 'rus tili darslari'
    ]
  },

  // 10. NEMIS TILI
  {
    id: 'nemis-tili',
    name: 'Nemis Tili',
    fullName: 'Nemis Tili: Deutsch A1-B2, Goethe-Zertifikat va TestDaF',
    category: 'languages',
    categoryName: 'Xorijiy Tillar',
    icon: '🇩🇪',
    badgeColor: 'from-yellow-600 to-stone-700',
    tagline: 'Germaniyada bepul taʼlim, muhandislik, tibbiyot va innovatsiyalar tili',
    description: 'Nemis tili — Yevropa Ittifoqida eng koʻp ona tili sifatida gaplashiladigan til (Germaniya, Avstriya, Shveysariya). Germaniya davlat universitetlarida xorijiy talabalar uchun oliy taʼlim mutlaqo bepul.',
    importance: 'Nemis tilini B2 darajada bilish Germaniyaga "Ausbildung" (ishlab oʻqish dasturi) yoki universitetlarga toʻliq bepul oʻqishga borish, tibbiyot xodimlari uchun esa yuqori oylikli ishga joylashish kafolatini beradi.',
    branches: [
      {
        name: 'Grundstufe (A1 - A2 Boshlangʻich)',
        desc: 'Nemis artikllari (der, die, das), Akkusativ, Dativ va kundalik sodda iboralar.',
        topics: ['Nemis alifbosi va diftonglar', 'Artikllar va ularning turlanishi', 'Modal feʼllar (können, müssen, wollen)', 'Tanaffus va vaqt ifodalari']
      },
      {
        name: 'Mittelstufe (B1 - B2 Oʻrta va Ilgʻor)',
        desc: 'Passiv, Konjunktiv II, murakkab feʼllar boshqaruvi va erkin soʻzlashuv.',
        topics: ['Passiv shakllar (Passiv Präsens / Präteritum)', 'Konjunktiv II (istak va muloyimlik)', 'Bogʻlovchilar (weil, obwohl, damit)', 'Insho va rasmiy xatlar']
      },
      {
        name: 'Goethe & TestDaF Tayyorgarlik',
        desc: 'Hören, Lesen, Schreiben va Sprechen modullari boʻyicha imtihon trenajyori.',
        topics: ['Goethe B1/B2 formatidagi topshiriqlar', 'Grafiklar sharhi (Grafikbeschreibung)', 'Munozara olib borish texnikasi', 'Vaqtni taqsimlash sirlari']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: A1 (Start Deutsch 1)',
        duration: '2 oy',
        goal: 'Boshlangʻich artikllar, feʼl tuslanishi va viza uchun A1 sertifikatini olish',
        skills: ['Oʻzini tanishtirish', 'Sodda xarid va anketa toʻldirish']
      },
      {
        stage: '2-bosqich: A2 - B1 (Ausbildung yoʻllanmasi)',
        duration: '3-4 oy',
        goal: 'B1 sertifikatini qoʻlga kiritish va kundalik vaziyatlarda toʻliq mustaqil boʻlish',
        skills: ['Mavzuli taqdimot qilish', 'Elektron pochta va arizalar yozish']
      },
      {
        stage: '3-bosqich: B2 - TestDaF (Universitet & Shifokorlik)',
        duration: '3 oy',
        goal: 'Germaniya oliygohlariga toʻgʻridan-toʻgʻri qabul qilinish uchun B2/TestDaF balli',
        skills: ['Ilmiy maqolalarni tushunish', 'Spontan va ravon nemischa nutq']
      }
    ],
    careers: [
      'Germaniyada IT muhandis yoki Dasturchi',
      'Germaniya klinikalarida Shifokor yoki Hamshira (Ausbildung)',
      'Nemis tili oʻqituvchisi va Tarjimon',
      'Nemis kompaniyalarida (Siemens, Bosch, BMW) vakil',
      'Gid va Xalqaro sayohat koordinatori'
    ],
    keyFormulasOrFacts: [
      'Nemis tilida barcha otlar bosh harf bilan yoziladi va 3 ta jinsga (der, die, das) ega',
      'Nemis tilidagi gaplarda feʼl doimo 2-oʻrinda turishi shart (Katta qoida!)',
      'Germaniyada Ausbildung dasturi talabalarga oyiga 1000 - 1400 yevro stipendiya toʻlaydi',
      'Goethe B2 sertifikati butun dunyo boʻylab umrbod amal qiladi'
    ],
    exams: [
      'Goethe-Zertifikat (A1, A2, B1, B2, C1)',
      'TestDaF (Test Deutsch als Fremdsprache) - TDN 4 / TDN 5',
      'ÖSD (Österreichisches Sprachdiplom Deutsch)',
      'Milliy Baholash Sertifikati (Nemis tili)'
    ],
    relatedCourseIds: ['lang-de-goethe'],
    testId: 'test-languages-german',
    toolType: 'language',
    keywords: [
      'nemis tili', 'german', 'deutsch', 'goethe', 'testdaf', 'germaniya', 'ausbildung',
      'der die das', 'akkusativ', 'dativ', 'b1', 'b2', 'nemischa', 'nemis tili kurslari'
    ]
  },

  // 11. FRANSUZ TILI
  {
    id: 'fransuz-tili',
    name: 'Fransuz Tili',
    fullName: 'Fransuz Tili: DELF A1-B2 va Jonli Fransuz Nutqi',
    category: 'languages',
    categoryName: 'Xorijiy Tillar',
    icon: '🇫🇷',
    badgeColor: 'from-blue-700 via-white to-red-600',
    tagline: 'Diplomatiya, yuqori madaniyat, moda, gastronomiya va sanʼat tili',
    description: 'Fransuz tili — dunyoning 29 mamlakatida rasmiy til boʻlib, Xalqaro Olimpiya qoʻmitasi, BMT va Yevropa Ittifoqining rasmiy ish yuritish vositasidir.',
    importance: 'Fransiya va Kanadada (Kvebek provinsiyasi) bepul yoki imtiyozli taʼlim olish, xalqaro huquq va diplomatiya sohalarida nufuzli lavozimlarda ishlash imkoniyatini taqdim etadi.',
    branches: [
      {
        name: 'Phonétique & Débutant (Talaffuz va Boshlangʻich)',
        desc: 'Burun tovushlari (voyelles nasales), bogʻlanishlar (liaison) va asosiy iboralar.',
        topics: ['Fransuzcha nafis talaffuz sirlari', 'Être va Avoir feʼllari', 'I, II va III guruh feʼllari tuslanishi', 'Kundalik dialoglar']
      },
      {
        name: 'Grammaire & Expression (Grammatika va Ifoda)',
        desc: 'Passé composé, Imparfait, Subjonctif va gipotezalar (Si conditionnel).',
        topics: ['Oʻtgan zamonlar farqi (Passé composé vs Imparfait)', 'Subjonctif ishlatilish qoidalari', 'Pronom COD va COI (toʻldiruvchilar)', 'Rasmiy xatlar yozish']
      },
      {
        name: 'DELF A1-B2 Tayyorgarlik',
        desc: 'Compréhension orale, Compréhension écrite, Production écrite va Production orale.',
        topics: ['DELF imtihoni strategiyalari', 'Audio yozuvlarni tushunish', 'Monolog va dialog koʻnikmalari', 'Xatolar ustida ishlash']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: A1 (Noldan boshlash)',
        duration: '2 oy',
        goal: 'Alifbo, oʻqish qoidalari, asosiy feʼllar va salomlashish/tanishtirish',
        skills: ['Fransuzcha soʻzlarni toʻgʻri oʻqish', 'Sodda jumlalarni tuza olish']
      },
      {
        stage: '2-bosqich: A2 - B1 (Soʻzlashuv)',
        duration: '3 oy',
        goal: 'Oʻtgan va kelasi zamonda hikoyalar aytish, shaxsiy fikrni dalillash',
        skills: ['Fransuz filmlari va musiqalarini tushunish', 'DELF B1 sertifikatini qoʻlga kiritish']
      },
      {
        stage: '3-bosqich: B2 (Akademik erkinlik)',
        duration: '3 oy',
        goal: 'Fransiya oliygohlariga topshirish uchun rasmiy DELF B2 darajasini olish',
        skills: ['Debatlarda ishtirok etish', 'Akademik tahliliy insholar yozish']
      }
    ],
    careers: [
      'Fransiya va Kanadada Taʼlim oluvchi mutaxassis',
      'Xalqaro tashkilotlarda (BMT, YuNESKO) Diplomat',
      'Fransuz tili oʻqituvchisi va Tarjimon',
      'Turizm, Moda va Mehmonxona biznesi boshqaruvchisi'
    ],
    keyFormulasOrFacts: [
      'Fransuz tilida oxirgi undosh harflar aksariyat hollarda oʻqilmaydi (D, P, S, T, X, Z)',
      'Fransiya davlat universitetlarida yillik taʼlim toʻlovi boshqa Gʻarb davlatlariga nisbatan 10 barobar arzon',
      'DELF sertifikati muddatsiz beriladi va uning muddati hech qachon tugamaydi',
      'Kanadaga immigratsiya (Express Entry) uchun fransuz tilini bilish eng katta qoʻshimcha ball beradi'
    ],
    exams: [
      'DELF (Diplôme d’Études en Langue Française) A1, A2, B1, B2',
      'DALF C1 & C2 (Ilgʻor professional)',
      'TCF Canada / TEF (Kanadaga immigratsiya va taʼlim uchun)',
      'Milliy Baholash Sertifikati (Fransuz tili)'
    ],
    relatedCourseIds: ['lang-fr-delft'],
    testId: 'test-languages-french',
    toolType: 'language',
    keywords: [
      'fransuz tili', 'french', 'français', 'delf', 'dalf', 'tcf', 'fransiya',
      'bonjour', 'subjonctif', 'passe compose', 'fransuzcha', 'kanada immigratsiya'
    ]
  },

  // 12. FRONTEND DASTURLASH
  {
    id: 'frontend',
    name: 'Frontend Dasturlash',
    fullName: 'Frontend Dasturlash: HTML5, CSS3, JavaScript, React va Tailwind CSS',
    category: 'it',
    categoryName: 'IT & Dasturlash',
    icon: '💻',
    badgeColor: 'from-cyan-500 to-blue-600',
    tagline: 'Foydalanuvchi interfeyslari, interaktiv veb-saytlar va zamonaviy SPA ilovalar yaratish',
    description: 'Frontend — veb-sayt va dasturlarning foydalanuvchi koʻradigan, tugmalarini bosadigan va bevosita ishlatadigan vizual qismini yaratish sohasidir. Har qanday zamonaviy sayt (Telegram Web, YouTube, Airbnb) kuchli frontend muhandislari tomonidan ishlab chiqiladi.',
    importance: 'Dunyo boʻyicha eng ommabop va boshlash oson boʻlgan IT yoʻnalishi. Natijani darhol brauzerda koʻrish imkoniyati mavjudligi sababli, dasturlashga endi kirib kelayotganlar uchun eng ideal start hisoblanadi.',
    branches: [
      {
        name: 'HTML5 va Zamonaviy CSS3 / Tailwind',
        desc: 'Semantik teglash, adaptiv dizayn (Flexbox, Grid) va qulay Tailwind utilitalari.',
        topics: ['Semantik struktura', 'Flexbox va CSS Grid arxitekturasi', 'Mobil moslashuvchanlik (Responsive)', 'Tailwind CSS animatsiyalari']
      },
      {
        name: 'JavaScript (ES6+) va DOM Manipulyatsiyasi',
        desc: 'Oʻzgaruvchilar, funksiyalar, array metodlari, asinxron dasturlash (Async/Await) va API.',
        topics: ['Array metodlari (map, filter, reduce)', 'DOM eventlari va formalar', 'Asinxron JS, Fetch va Promises', 'Modulli arxitektura']
      },
      {
        name: 'React.js va Zamonaviy Ekotizim',
        desc: 'Komponentlar, Hooklar (useState, useEffect), global holat (Zustand/Redux) va Next.js.',
        topics: ['Funksional komponentlar va Props', 'Custom Hooklar yaratish', 'REST API bilan integratsiya', 'Vite va deploy qilish (Vercel/Netlify)']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Veb Asoslari (HTML & CSS)',
        duration: '1 oy',
        goal: 'Har qanday Figma dizaynini brauzerda 100% oʻxshash qilib kodlash',
        skills: ['Pixel-perfect kodlash', 'Mobil telefonlar uchun moslashuvchanlik']
      },
      {
        stage: '2-bosqich: Mantiq va Interaktivlik (JavaScript)',
        duration: '2 oy',
        goal: 'Saytga jon berish, kalkulyator, todolist, ob-havo API ilovalarini yaratish',
        skills: ['Algoritmik tafakkur', 'API dan maʼlumot olib ekranga chiqarish']
      },
      {
        stage: '3-bosqich: React va Professional Portfolio',
        duration: '2 oy',
        goal: 'Haqiqiy loyihalar (Internet doʻkon, Dashboard, LMS platformasi) yaratish va Git/GitHub',
        skills: ['React SPA yaratish', 'GitHub da portfolio yigʻish va suhbatga tayyorlanish']
      }
    ],
    careers: [
      'Frontend React Dasturchi (Junior / Middle / Senior)',
      'Veb-dizayner va UI/UX Dasturchi',
      'Fullstack JavaScript Dasturchi',
      'Freelancer (Upwork, Fiverr da loyihalar olish)',
      'Startap asoschisi va Texnik direktor (CTO)'
    ],
    keyFormulasOrFacts: [
      'JavaScript — dunyodagi barcha brauzerlar tushunadigan yagona dasturlash tilidir',
      'React — Meta (Facebook) tomonidan yaratilgan eng ommabop veb kutubxona boʻlib, 10 milliondan ortiq saytlarda ishlatiladi',
      'Tailwind CSS yordamida dizayn yaratish tezligi oddiy CSS yozishga nisbatan 3 barobar yuqori',
      'Platformamizdagi "IT Playground" laboratoriyasida toʻgʻridan-toʻgʻri brauzerda HTML/CSS/JS kodini yozib ishlatib koʻrishingiz mumkin'
    ],
    exams: [
      'Frontend Junior Sertifikati (Techzone Academy)',
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'W3Schools Certified Frontend Developer'
    ],
    relatedCourseIds: ['it-react-frontend'],
    testId: 'test-it-frontend',
    toolType: 'it',
    keywords: [
      'frontend', 'front-end', 'veb dasturlash', 'html', 'css', 'javascript', 'js',
      'react', 'tailwind', 'typescript', 'dasturlash', 'sayt yaratish', 'figma',
      'web developer', 'it kasblari'
    ]
  },

  // 13. PYTHON VA SUN'IY INTELLEKT
  {
    id: 'python-ai',
    name: 'Python va Sunʼiy Intellekt',
    fullName: 'Python va Sunʼiy Intellekt: Python Asoslari, Data Science, Machine Learning va AI',
    category: 'it',
    categoryName: 'IT & Dasturlash',
    icon: '🐍',
    badgeColor: 'from-emerald-500 to-teal-700',
    tagline: 'Dunyoning 1-raqamli dasturlash tili, Data Science va Neyron tarmoqlar olami',
    description: 'Python — sodda sintaksisi, oʻrganish osonligi va ulkan imkoniyatlari bilan dunyodagi eng mashhur dasturlash tili. U Sunʼiy Intellekt (AI), mashinali oʻrganish (Machine Learning), maʼlumotlar tahlili va avtomatlashtirishda mutlaq yetakchidir.',
    importance: 'ChatGPT, DeepSeek, Tesla avtopiloti, Spotify tavsiya algoritmlari va tibbiy diagnostika tizimlari aynan Python tili va uning AI kutubxonalarida (TensorFlow, PyTorch) yaratiladi.',
    branches: [
      {
        name: 'Python Sintaksisi va OOP',
        desc: 'Oʻzgaruvchilar, list, dict, funksiyalar, lambda hamda Obyektga Yoʻnaltirilgan Dasturlash.',
        topics: ['Sodda va qulay sintaksis', 'Roʻyxatlar va lugʻatlar bilan ishlash', 'Klasslar va obyektlar (OOP)', 'Fayllar va xatoliklar bilan ishlash']
      },
      {
        name: 'Data Science va Maʼlumotlar Tahlili',
        desc: 'Katta hajmdagi maʼlumotlarni tozalash, vizuallashtirish va statistik xulosalar chiqarish.',
        topics: ['NumPy massivlari', 'Pandas jadvallari va tahlil', 'Matplotlib va Seaborn grafiklari', 'Katta maʼlumotlar (Big Data) asoslari']
      },
      {
        name: 'Machine Learning va Neyron Tarmoqlar (AI)',
        desc: 'Klassifikatsiya, regressiya, klasterlash, kompyuter koʻrishi (OpenCV) va LLM modellari.',
        topics: ['Scikit-learn algoritmlari', 'Neyron tarmoqlar arxitekturasi', 'PyTorch / TensorFlow asoslari', 'Sunʼiy intellekt botlari yaratish']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Python Asoslari',
        duration: '1 oy',
        goal: 'Sintaksis, tsikllar, funksiyalar va sodda telegram botlar yaratish',
        skills: ['Kodni toza yozish (PEP 8)', 'Algoritmik masalalarni yechish']
      },
      {
        stage: '2-bosqich: Data Science va Tahlil',
        duration: '2 oy',
        goal: 'Real biznes maʼlumotlarini tahlil qilish va bashorat qilish modellarini qurish',
        skills: ['Pandas orqali hisobotlar tuzish', 'Chiroyli interaktiv grafiklar chizish']
      },
      {
        stage: '3-bosqich: AI & Neyron Tarmoqlar',
        duration: '2 oy',
        goal: 'Obyektlarni tanuvchi AI, til modellari (NLP) va tavsiya tizimlarini yaratish',
        skills: ['Modelni oʻqitish va testlash', 'AI loyihalarini deploy qilish']
      }
    ],
    careers: [
      'Sunʼiy Intellekt va Machine Learning muhandisi',
      'Data Scientist va Data Analyst',
      'Python Backend Dasturchi (Django / FastAPI)',
      'Avtomatlashtirish va Scripting mutaxassisi',
      'Telegram bot va API dasturchisi'
    ],
    keyFormulasOrFacts: [
      'Python — TIOBE indeksida bir necha yildan beri dunyoning eng mashhur dasturlash tili sifatida 1-oʻrinda turadi',
      'Sunʼiy intellektning yuragi — gradient tushishi (Gradient Descent) va teskari tarqalish (Backpropagation) algoritmidir',
      'Python kodini oʻqish xuddi ingliz tilidagi oddiy matnni oʻqishdek oson va tushunarli',
      'Platformamizdagi "Techie AI" shaxsiy oʻqituvchisi ham eng ilgʻor sunʼiy intellekt neyron tarmoqlarida ishlaydi'
    ],
    exams: [
      'PCEP / PCAP - Certified Associate in Python Programming',
      'IBM Data Science Professional Certificate',
      'TensorFlow Developer Certificate'
    ],
    relatedCourseIds: ['it-python-ai'],
    testId: 'test-it-python-ai',
    toolType: 'it',
    keywords: [
      'python', 'py', 'suniy intellekt', 'ai', 'data science', 'machine learning',
      'mashina organish', 'neyron tarmoq', 'dasturlash', 'tahlil', 'bot yaratish',
      'django', 'fastapi', 'algoritmlar'
    ]
  },

  // 14. BACKEND DASTURLASH
  {
    id: 'backend',
    name: 'Backend Dasturlash',
    fullName: 'Backend Dasturlash: Node.js, Express, PostgreSQL, REST API va Server Arxitekturasi',
    category: 'it',
    categoryName: 'IT & Dasturlash',
    icon: '⚙️',
    badgeColor: 'from-purple-600 to-indigo-700',
    tagline: 'Maʼlumotlar bazasi, server logikasi, xavfsizlik va yuqori yuklamali tizimlar',
    description: 'Backend — har qanday raqamli xizmatning koʻrinmas, lekin eng muhim "dvigateli"dir. U foydalanuvchi maʼlumotlarini saqlaydi, toʻlovlarni qayta ishlaydi, xavfsizlikni taʼminlaydi va millionlab soʻrovlarga tezkor javob beradi.',
    importance: 'Bank ilovalari, elektron toʻlov tizimlari (Payme, Click), onlayn doʻkonlar va ijtimoiy tarmoqlar ishonchli backend boʻlmasa bir soniya ham ishlay olmaydi. Backend muhandislariga boʻlgan talab va maoshlar doimo eng yuqori pogʻonalarda turadi.',
    branches: [
      {
        name: 'Node.js va Express.js Serverlari',
        desc: 'Asinxron event-loop arxitekturasi, middleware tushunchasi va RESTful API loyihalash.',
        topics: ['Node.js runtime imkoniyatlari', 'Express router va middleware', 'Autentifikatsiya (JWT va bcrypt)', 'Xatoliklarni markazlashgan qayta ishlash']
      },
      {
        name: 'PostgreSQL va Relyatsion Maʼlumotlar Bazasi',
        desc: 'Jadvallar tuzish, murakkab SQL soʻrovlari, indekslash, tranzaksiyalar va ORM (Prisma/Drizzle).',
        topics: ['SQL (SELECT, JOIN, GROUP BY)', 'Jadvallar orasidagi bogʻlanishlar (1:N, N:M)', 'Tranzaksiyalar va ACID qoidalari', 'Indekslash orqali tezlikni oshirish']
      },
      {
        name: 'DevOps, Kesh va Deploy Asoslari',
        desc: 'Redis orqali keshlash, Docker konteynerlari va bulutli serverlarga yuklash.',
        topics: ['Redis kesh tizimi', 'Docker konteynerlashtirish', 'Linux serverlari va Nginx', 'Microservice arxitekturasi asoslari']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Server va API Asoslari',
        duration: '1 oy',
        goal: 'Node.js va Express da ilk REST API (CRUD) yaratish va Postman da sinash',
        skills: ['HTTP metodlari (GET, POST, PUT, DELETE)', 'Status kodlar (200, 400, 404, 500)']
      },
      {
        stage: '2-bosqich: Maʼlumotlar Bazasi (PostgreSQL)',
        duration: '2 oy',
        goal: 'Relyatsion maʼlumotlar bazasini toʻgʻri loyihalash, foydalanuvchilar va toʻlovlar jadvalini yaratish',
        skills: ['Murakkab SQL soʻrovlari', 'Parollarni xavfsiz shifrlash (Hash)']
      },
      {
        stage: '3-bosqich: Xavfsizlik, Kesh va Deploy',
        duration: '2 oy',
        goal: 'Katta yuklamalarga chidamli tizim qurish, JWT tokenlar bilan himoyalash va serverga joylash',
        skills: ['Kiberhujumlardan himoya (CORS, Rate Limiting)', 'Bulutli serverlarda loyihani yuritish']
      }
    ],
    careers: [
      'Backend Node.js Dasturchi',
      'Maʼlumotlar Bazasi Administratori (DBA)',
      'API va Integratsiyalar boʻyicha muhandis',
      'Bulutli texnologiyalar (Cloud / DevOps) mutaxassisi',
      'Tizim meʼmori (Solutions Architect)'
    ],
    keyFormulasOrFacts: [
      'Node.js ning "Non-blocking I/O" (toʻxtovsiz kiritish-chiqarish) texnologiyasi bitta oqimda minglab soʻrovlarni qabul qilish imkonini beradi',
      'PostgreSQL — 35 yildan ortiq vaqt davomida rivojlantirilayotgan, dunyoning eng ishonchli ochiq manbali SQL bazasi',
      'REST API — frontend va backend oʻrtasidagi xalqaro universal kelishuv tilidir',
      'Parollar hech qachon ochiq holda saqlanmaydi — ular "bcrypt" kabi xesh funksiyalari bilan shifrlanadi'
    ],
    exams: [
      'Node.js Certified Application Developer (JSNAD)',
      'PostgreSQL Professional Certification',
      'AWS Certified Developer - Associate'
    ],
    relatedCourseIds: ['it-backend-node'],
    testId: 'test-it-backend',
    toolType: 'it',
    keywords: [
      'backend', 'node', 'nodejs', 'express', 'postgresql', 'postgres', 'sql',
      'baza', 'malumotlar bazasi', 'api', 'rest api', 'server', 'jwt', 'dasturlash',
      'arxitektura', 'docker'
    ]
  },

  // 15. KIBERXAVFSIZLIK
  {
    id: 'kiberxavfsizlik',
    name: 'Kiberxavfsizlik',
    fullName: 'Kiberxavfsizlik: Axborot Xavfsizligi, Tarmoqlar, Ethical Hacking va Kriptografiya',
    category: 'it',
    categoryName: 'IT & Dasturlash',
    icon: '🛡️',
    badgeColor: 'from-red-600 to-rose-800',
    tagline: 'Raqamli dunyo qalqoni, axborot xavfsizligi, tizimlarni himoyalash va etik xakerlik',
    description: 'Kiberxavfsizlik — kompyuter tizimlari, tarmoqlar, dasturiy taʼminot va maxfiy maʼlumotlarni har qanday raqamli hujumlar, ruxsatsiz kirish, viruslar va oʻgʻirlanishlardan himoya qilish sohasidir.',
    importance: 'Banklar, mudofaa tizimlari, shifoxonalar va davlat korxonalari har kuni millionlab kiberhujumlarga duchor boʻladi. Kiberxavfsizlik mutaxassisi boʻlish — jamiyatning raqamli barqarorligini taʼminlovchi eng nufuzli va yuqori haq toʻlanadigan kasblardan biridir.',
    branches: [
      {
        name: 'Tarmoq Xavfsizligi va Linux Asoslari',
        desc: 'TCP/IP protokollari, DNS, portlar, firewall va Kali Linux operatsion tizimi vositalari.',
        topics: ['Tarmoq modeli (OSI va TCP/IP)', 'Wireshark orqali paketlarni tahlil qilish', 'Linux terminali buyruqlari', 'Firewall va VPN arxitekturasi']
      },
      {
        name: 'Ethical Hacking va Pen-Testing',
        desc: 'Tizim zaifliklarini qonuniy aniqlash (Penetration Testing), OWASP Top 10 tahlili.',
        topics: ['SQL Injection va XSS hujumlari', 'Zaifliklarni skanerlash (Nmap, Metasploit)', 'Parollarni buzishga chidamlilikni tekshirish', 'Ijtimoiy muhandislik (Phishing) dan himoya']
      },
      {
        name: 'Kriptografiya va Himoya Strategiyalari',
        desc: 'Simmetrik va asimmetrik shifrlash (AES, RSA), SSL/TLS sertifikatlari va xavfsizlik auditi.',
        topics: ['Ochiq va yopiq kalitlar tizimi', 'Xesh funksiyalari (SHA-256)', 'Tizim xavfsizlik auditini oʻtkazish', 'Hodisalarga tezkor javob berish (Incident Response)']
      }
    ],
    roadmap: [
      {
        stage: '1-bosqich: Tarmoqlar va Operatsion Tizimlar',
        duration: '1-2 oy',
        goal: 'Internet qanday ishlashini, protokollar va Linux tizimini mukammal tushunish',
        skills: ['IP manzillar, routing va portlarni tahlil qilish', 'Kali Linux vositalaridan foydalanish']
      },
      {
        stage: '2-bosqich: Veb Zaifliklari (OWASP Top 10)',
        duration: '2 oy',
        goal: 'Saytlardagi teshiklarni topish va ularni dasturchi sifatida toʻgʻrilash',
        skills: ['SQL Injection va Brute Force hujumlarini bartaraf etish', 'Xavfsizlik hisobotlarini yozish']
      },
      {
        stage: '3-bosqich: Professional Himoya (Blue Team / Red Team)',
        duration: '2-3 oy',
        goal: 'Korporativ tarmoqlarni himoyalash va xalqaro CompTIA / CEH sertifikatlariga tayyorgarlik',
        skills: ['SOC monitoring tizimlari', 'Hujumni daf qilish va audit oʻtkazish']
      }
    ],
    careers: [
      'Axborot Xavfsizligi Mutaxassisi (Cybersecurity Analyst)',
      'Penetration Tester (Etik xaker)',
      'SOC (Security Operations Center) tahlilchisi',
      'Kiberxavfsizlik boʻyicha auditor va maslahatchi',
      'Kriptografiya va Dasturiy taʼminot xavfsizligi muhandisi'
    ],
    keyFormulasOrFacts: [
      'Kiberxavfsizlikning 3 asosiy ustuni: CIA Triad — Maxfiylik (Confidentiality), Butunlik (Integrity) va Erishuvchanlik (Availability)',
      'Dunyo boʻylab har 39 soniyada yangi bir tizimga kiberhujum amalga oshiriladi',
      'Parol uzunligi 8 tadan 14 taga oshirilganda, uni buzish uchun ketadigan vaqt bir necha daqiqadan millionlab yillarga koʻpayadi',
      'Etik xakerlar (White Hat Hackers) tizimdagi xatolarni jinoyatchilardan oldin topib, ularni bartaraf etish uchun qonuniy ishlaydilar'
    ],
    exams: [
      'CompTIA Security+',
      'CEH (Certified Ethical Hacker)',
      'OSCP (Offensive Security Certified Professional)',
      'CISP / CISSP (Axborot xavfsizligi boʻyicha professional sertifikat)'
    ],
    relatedCourseIds: ['it-cybersecurity'],
    testId: 'test-it-cyber',
    toolType: 'it',
    keywords: [
      'kiberxavfsizlik', 'kiber', 'cyber security', 'axborot xavfsizligi', 'xavfsizlik',
      'hacker', 'etik xaker', 'pentest', 'shifrlash', 'tarmoq', 'kali linux',
      'firewall', 'virus', 'antivirus', 'dasturlash'
    ]
  }
];

// Helper to normalize search query string
export const normalizeQuery = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['ʻʼ`‘’]/g, '')
    .trim();
};

// Find matching subjects based on query
export const findMatchingSubjects = (query: string): SubjectInfo[] => {
  if (!query || !query.trim()) return [];
  const norm = normalizeQuery(query);
  const words = norm.split(/\s+/).filter(Boolean);

  // Exact ID or name match gets highest priority
  const directMatches = SUBJECTS_DATA.filter((s) => {
    const sName = normalizeQuery(s.name);
    const sFull = normalizeQuery(s.fullName);
    const sCat = normalizeQuery(s.categoryName);

    // If query matches subject name directly
    if (sName === norm || s.id === norm) return true;
    if (sName.includes(norm) || norm.includes(sName)) return true;

    // Check keyword matches
    const hasKeywordMatch = s.keywords.some(k => {
      const normK = normalizeQuery(k);
      return normK === norm || words.some(w => normK.includes(w) && w.length >= 3);
    });

    if (hasKeywordMatch) return true;

    // Check branches or topics
    const hasBranchMatch = s.branches.some(b => 
      normalizeQuery(b.name).includes(norm) ||
      b.topics.some(t => normalizeQuery(t).includes(norm))
    );

    return hasBranchMatch || sFull.includes(norm) || sCat.includes(norm);
  });

  if (directMatches.length > 0) {
    return directMatches;
  }

  // Broad word match
  return SUBJECTS_DATA.filter((s) => {
    const allHaystack = [
      s.name,
      s.fullName,
      s.categoryName,
      s.tagline,
      s.description,
      ...s.keywords,
      ...s.careers,
      ...s.branches.flatMap(b => [b.name, ...b.topics])
    ].map(t => normalizeQuery(t)).join(' ');

    return words.every(w => allHaystack.includes(w));
  });
};
