import { QuizQuestion } from '../types';

// Topic-specific question database keyed by subject or lesson keywords
export function getLessonQuiz(
  courseId: string, 
  lessonId: string, 
  lessonTitle: string, 
  category: string
): QuizQuestion[] {
  // Specific questions generator based on courseId and lesson details
  if (courseId.includes('ielts')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusi boʻyicha: Academic ingliz tilida eng toʻgʻri leksik ifodani aniqlang:`,
        options: [
          'A significant surge in economic growth',
          'A big jump in money and things',
          'People doing lots of more good jobs',
          'Very quick up of the finances'
        ],
        correctIndex: 0,
        explanation: 'IELTS Academic Writing va Speakingda rasmiy, aniq kollokatsiyalar ("significant surge", "exponential increase") ishlatilishi 7.5+ ball kafolatidir.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Grammatik aniqlik: Qaysi gapda Inversiya strukturasi toʻgʻri qoʻllangan?',
        options: [
          'Rarely have researchers encountered such remarkable findings.',
          'Rarely researchers have encountered such findings.',
          'Rarely had encountered researchers such findings.',
          'Researchers rarely have such findings encountered.'
        ],
        correctIndex: 0,
        explanation: 'Salbiy yuklamalar (Rarely, Seldom, Never) gap boshida kelganda yordamchi feʼl egadan oldinga oʻtadi: Rarely have + Subject + V3.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Imtihon strategiyasi: Ushbu modul boʻyicha asosiy tavsiya nima?',
        options: [
          'Parafraz qilish va sinonimlardan oʻz oʻrnida meʼyori bilan foydalanish',
          'Matndagi har bir soʻzni soʻzma-soʻz tarjima qilishga urinish',
          'Faqat murakkab va oʻzi tushunmaydigan arxaik soʻzlarni yozish',
          'Vaqtni hisobga olmasdan faqat bitta savol ustida uzoq toʻxtalish'
        ],
        correctIndex: 0,
        explanation: 'IELTS ning barcha 4 qismida muvaffaqiyat garovi — kontekstni anglash va oʻrinli parafraz (Lexical Resource) qilishdir.'
      }
    ];
  }

  if (courseId.includes('general')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusi boʻyicha toʻgʻri variantni tanlang: "She _____ to the library every Wednesday."`,
        options: ['goes', 'go', 'is going', 'wenting'],
        correctIndex: 0,
        explanation: 'Uchinchi shaxs birlikda (he/she/it) Present Simple zamonida feʼlga -s/-es qoʻshimchasi qoʻshiladi: goes.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Qaysi predlog vaqt bilan toʻgʻri ishlatilgan?',
        options: ['at 5 oʻclock, on Monday, in June', 'in 5 oʻclock, at Monday, on June', 'on 5 oʻclock, in Monday, at June', 'to 5 oʻclock, for Monday, at June'],
        correctIndex: 0,
        explanation: 'Aniq vaqtlar uchun "at", haftaning kunlari uchun "on", oylar va yillar uchun "in" ishlatiladi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Kundalik muloqotda "How do you do?" savoliga eng odobli rasmiy javob qaysi?',
        options: ['How do you do?', 'I am 22 years old.', 'Yes, I do.', 'I am going home.'],
        correctIndex: 0,
        explanation: 'Rasmiy tanishuvda "How do you do?" savoliga javoban xuddi shunday "How do you do?" deb javob qaytariladi.'
      }
    ];
  }

  if (courseId.includes('ru-speaking') || courseId.includes('ru-business')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" darsi boʻyicha: Вставьте правильное окончание: "Мы долго гуляли по красив_____ парку."`,
        options: ['ому', 'ым', 'ого', 'ом'],
        correctIndex: 0,
        explanation: 'Предлог "по" требует Дательного падежа (по чему? по красивому парку).'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Выберите предложение с правильным употреблением глагола движения:',
        options: [
          'Каждое утро я хожу на работу пешком.',
          'Каждое утро я иду на работу пешком (регулярно).',
          'Вчера я ездил пешком.',
          'Мы пошли на самолёте в Ташкент.'
        ],
        correctIndex: 0,
        explanation: 'Muntazam, takrorlanuvchi piyoda harakatlar uchun koʻp yoʻnalishli "ходить" feʼli ishlatiladi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Укажите верное ударение в деловом русском языке:',
        options: ['догово́р', 'до́говор', 'договора́', 'догóворится'],
        correctIndex: 0,
        explanation: 'Литературная норма современного русского языка: догово́р (множественное число: догово́ры).'
      }
    ];
  }

  if (courseId.includes('fr-delft')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" darsi boʻyicha: Choisissez la forme correcte du verbe: "Nous _____ très heureux de vous rencontrer."`,
        options: ['sommes', 'êtes', 'sont', 'suis'],
        correctIndex: 0,
        explanation: 'Être feʼlining "Nous" (biz) olmoshi bilan tuslanishi: Nous sommes.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Fransuz tilida qaysi artikl ayol jinsidagi birlik otlar uchun qoʻllaniladi?',
        options: ['la / une', 'le / un', 'les / des', 'du / au'],
        correctIndex: 0,
        explanation: 'Ayol jinsi (féminin) uchun aniq artikl "la", noaniq artikl "une" ishlatiladi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Fransuzcha "S\'il vous plaît" iborasining maʼnosi nima?',
        options: ['Iltimos / Agar malol kelmasa', 'Xayrli kech', 'Katta rahmat', 'Xush kelibsiz'],
        correctIndex: 0,
        explanation: '"S\'il vous plaît" hurmat maʼnosidagi "Iltimos" degan maʼnoni anglatadi.'
      }
    ];
  }

  if (courseId.includes('de-goethe')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" darsi boʻyicha: Welcher Artikel ist richtig für das Wort "Haus" (uy)?`,
        options: ['das Haus', 'der Haus', 'die Haus', 'den Haus'],
        correctIndex: 0,
        explanation: 'Nemis tilida "Haus" soʻzi oʻrta jinsga (Neutrum) tegishli: das Haus.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Nemis tili asosiy gapida (Hauptsatz) tuslangan feʼl qatʼiy qaysi oʻrinda turadi?',
        options: ['Har doim ikkinchi oʻrinda (Position 2)', 'Har doim birinchi oʻrinda', 'Har doim gapning oxirida', 'Ixtiyoriy joyda'],
        correctIndex: 0,
        explanation: 'Nemis tilining oltin qoidasi: darak gapda (Hauptsatz) tuslangan feʼl doim 2-oʻrinda boʻladi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Akkusativ kelishigida qaysi artikl shakli oʻzgaradi?',
        options: ['Faqat der -> den ga oʻzgaradi', 'Faqat die -> der ga oʻzgaradi', 'Faqat das -> dem ga oʻzgaradi', 'Barcha artikllar oʻzgarishsiz qoladi'],
        correctIndex: 0,
        explanation: 'Akkusativ (tushum) kelishigida faqat erkak jinsidagi "der" artikli "den" ga aylanadi; die va das oʻzgarmaydi.'
      }
    ];
  }

  if (courseId.includes('react') || courseId.includes('frontend')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusi boʻyicha: React da komponent holati (state) yangilanganda nima yuz beradi?`,
        options: [
          'Komponent qayta render qilinadi va DOM optimal yangilanadi',
          'Butun veb-sahifa toʻliq yangidan yuklanadi (full reload)',
          'JavaScript kodi butunlay toʻxtatiladi',
          'Faqat HTML serverdan qayta yuklab olinadi'
        ],
        correctIndex: 0,
        explanation: 'React Virtual DOM yordamida faqat oʻzgargan qismlarni hisoblab, komponentni samarali qayta render qiladi.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'useEffect hooki qanday vazifani bajaradi?',
        options: [
          'Side-effectlar (API chaqiruvlari, obunalar, DOM hodisalari) ni boshqarish',
          'Faqat CSS uslublarini oʻzgartirish',
          'Global oʻzgaruvchilarni butunlay oʻchirib tashlash',
          'Foydalanuvchi parolini shifrlash'
        ],
        correctIndex: 0,
        explanation: 'useEffect asinxron maʼlumot olish, brauzer API lari va komponent hayot sikli hodisalarini boshqarish uchun qoʻllanadi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Tailwind CSS da "flex items-center justify-between" nimani bildiradi?',
        options: [
          'Flexbox yoqiladi, elementlar vertikal markazda va gorizontal chetlarga yoyiladi',
          'Elementlar ustun shaklida teriladi va pastga suriladi',
          'Barcha matnlar qalin qora shriftga aylanadi',
          'Elementlar butunlay koʻrinmas qilib berkitiladi'
        ],
        correctIndex: 0,
        explanation: 'items-center — vertikal tekislash, justify-between — elementlar oʻrtasida teng boʻshliq qoldirib ikki chetga surish.'
      }
    ];
  }

  if (courseId.includes('python') || courseId.includes('ai')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusiga doir: Pythonda roʻyxatdagi juft sonlarni filtrlashning eng qisqa usuli qaysi?`,
        options: [
          '[x for x in numbers if x % 2 == 0]',
          'numbers.filter(x => x % 2 == 0)',
          'for x in numbers: if x % 2 == 0 return x',
          'numbers[x % 2 == 0]'
        ],
        correctIndex: 0,
        explanation: 'Python List Comprehension shartli filtri sintaksisi: [x for x in iterable if condition].'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Pandas kutubxonasida 2 oʻlchamli jadval koʻrinishidagi asosiy maʼlumotlar tuzilmasi qanday ataladi?',
        options: ['DataFrame', 'Series', 'NDArray', 'DictionaryTable'],
        correctIndex: 0,
        explanation: 'Pandas da 1 oʻlchamli ustun Series, qator va ustunlardan iborat 2 oʻlchamli toʻliq jadval esa DataFrame deb ataladi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Machine Learning modellarini oʻqitishda "Overfitting" (oʻta moslashish) nima?',
        options: [
          'Model oʻquv maʼlumotlarini yodlab olib, yangi test maʼlumotlarida past aniqlik koʻrsatishi',
          'Model juda kam oʻrgangani uchun xato koʻp boʻlishi',
          'Kompyuter xotirasi toʻlib dasturning toʻxtab qolishi',
          'Maʼlumotlar bazasi bilan aloqa uzilishi'
        ],
        correctIndex: 0,
        explanation: 'Overfitting — model trening maʼlumotlaridagi shovqinlarni ham yodlab olib, umumlashtirish qobiliyatini yoʻqotishidir.'
      }
    ];
  }

  if (courseId.includes('backend') || courseId.includes('cyber')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" darsiga oid: REST API da mavjud maʼlumotni qisman yangilash uchun qaysi HTTP metod qoʻllaniladi?`,
        options: ['PATCH', 'POST', 'GET', 'DELETE'],
        correctIndex: 0,
        explanation: 'PATCH metodi resursning faqat koʻrsatilgan maydonlarini qisman yangilaydi (toʻliq almashtirish uchun esa PUT ishlatiladi).'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Kiberxavfsizlikda SQL Injection hujumlaridan himoyalanishning eng ishonchli usuli qaysi?',
        options: [
          'Parametrlashtirilgan soʻrovlar (Prepared Statements) ishlatish',
          'Foydalanuvchi nomini faqat kichik harflarda saqlash',
          'Faqat GET soʻrovlaridan foydalanish',
          'Port raqamini 8080 ga oʻzgartirish'
        ],
        correctIndex: 0,
        explanation: 'Prepared Statements yordamida foydalanuvchi kiritgan har qanday matn buyruq sifatida emas, balki sof maʼlumot sifatida qabul qilinadi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'JWT (JSON Web Token) tarkibi qaysi 3 qismdan iborat?',
        options: [
          'Header, Payload, Signature',
          'Username, Password, Hash',
          'Request, Response, Status',
          'Public Key, Private Key, Root'
        ],
        correctIndex: 0,
        explanation: 'JWT tokeni nuqta bilan ajratilgan uch qismdan: Header (algoritm), Payload (maʼlumot) va Signature (raqamli imzo) dan tashkil topadi.'
      }
    ];
  }

  if (courseId.includes('math')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusi boʻyicha: ax² + bx + c = 0 kvadrat tenglamada agar D = b² - 4ac > 0 boʻlsa:`,
        options: [
          'Tenglama 2 ta turli haqiqiy ildizga ega',
          'Tenglama haqiqiy ildizga ega emas',
          'Tenglama faqat 1 ta karrali ildizga ega',
          'Tenglama cheksiz koʻp ildizga ega'
        ],
        correctIndex: 0,
        explanation: 'Diskriminant musbat boʻlsa (D > 0), kvadrat tenglama ikkita haqiqiy ildizga ega boʻladi: x₁,₂ = (-b ± √D) / (2a).'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Funksiyaning hosilasi f\'(x) geometrik jihatdan nimani ifodalaydi?',
        options: [
          'Grafikka oʻtkazilgan urinmaning burchak koeffitsiyentini (k = tg α)',
          'Grafik ostidagi sohaning yuzasini',
          'Funksiyaning koordinata boshidan uzoqligini',
          'Funksiyaning simmetriya oʻqini'
        ],
        correctIndex: 0,
        explanation: 'Hosilaning geometrik maʼnosi: f\'(x₀) nuqtadagi urinmaning burchak koeffitsiyenti k = tg(α) ga teng.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Asosiy trigonometrik ayniyat toʻgʻri koʻrsatilgan qatorni toping:',
        options: [
          'sin²(α) + cos²(α) = 1',
          'sin²(α) - cos²(α) = 1',
          'tg(α) * ctg(α) = 0',
          'sin(2α) = sin(α) + cos(α)'
        ],
        correctIndex: 0,
        explanation: 'Pifagor teoremasidan kelib chiqadigan asosiy ayniyat: sin²(α) + cos²(α) = 1.'
      }
    ];
  }

  if (courseId.includes('physics')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" boʻyicha: Nyutonning ikkinchi qonuni formulasi qaysi?`,
        options: ['F = m * a', 'F = G * (m1*m2)/r²', 'E = m * c²', 'p = m * v'],
        correctIndex: 0,
        explanation: 'Jismga berilgan tezlanish unga taʼsir etuvchi kuchga toʻgʻri, massasiga teskari mutanosib: a = F/m => F = ma.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Zanjir qismi uchun Om qonuni ifodasi qaysi?',
        options: ['I = U / R', 'U = I / R', 'R = I * U', 'P = I² / R'],
        correctIndex: 0,
        explanation: 'Tok kuchi kuchlanishga toʻgʻri mutanosib va qarshilikka teskari mutanosibdir: I = U / R.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Kinetik energiya hisoblash formulasi:',
        options: ['E_k = (m * v²) / 2', 'E_p = m * g * h', 'A = F * s', 'P = A / t'],
        correctIndex: 0,
        explanation: 'Harakatdagi jismning kinetik energiyasi uning massasi va tezligi kvadrati koʻpaytmasining yarmiga teng.'
      }
    ];
  }

  if (courseId.includes('chemistry')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusi: Atomning yadrosida qanday zarrachalar joylashgan?`,
        options: [
          'Protonlar va Neytronlar',
          'Faqat Elektronlar',
          'Protonlar va Elektronlar',
          'Faqat Pozitronlar'
        ],
        correctIndex: 0,
        explanation: 'Atom yadrosi musbat zaryadli protonlar va zaryadsiz neytronlardan tashkil topgan; elektronlar yadro atrofida aylanadi.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Kislotali muhitda lakmus qogʻozi qanday rangga kiradi?',
        options: ['Qizil', 'Koʻk', 'Sariq', 'Binafsharang'],
        correctIndex: 0,
        explanation: 'Lakmus indikatori kislotali muhitda (pH < 7) qizil rangga, asosli muhitda esa koʻk rangga boʻyaladi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Alkanlarning umumiy formulasi qaysi?',
        options: ['CnH2n+2', 'CnH2n', 'CnH2n-2', 'CnH2n-6'],
        correctIndex: 0,
        explanation: 'Toʻyingan uglevodorodlar (alkanlar) ning umumiy formulasi CnH2n+2 hisoblanadi (masalan, metan CH4).'
      }
    ];
  }

  if (courseId.includes('biology')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" darsi: Hujayraning "energetik stansiyasi" qaysi organoid hisoblanadi?`,
        options: ['Mitoxondriya', 'Ribosoma', 'Lizosoma', 'Golji majmuasi'],
        correctIndex: 0,
        explanation: 'Mitoxondriyalarda ATF (adenozintrifosfat) sintezlanadi, shuning uchun ular hujayraning quvvat markazi sanaladi.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'DNK molekulasida Adenin (A) ga komplementar nukleotid qaysi?',
        options: ['Timin (T)', 'Guanin (G)', 'Sitozin (S)', 'Urasil (U)'],
        correctIndex: 0,
        explanation: 'DNK da komplementarlik qoidasiga binoan: A har doim T bilan (ikkita vodorod bogʻ), G esa S bilan bogʻlanadi.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Inson qon aylanish tizimida katta qon aylanish doirasi qayerdan boshlanadi?',
        options: ['Chap qorinchadan', 'Oʻng qorinchadan', 'Chap boʻlmachadan', 'Oʻng boʻlmachadan'],
        correctIndex: 0,
        explanation: 'Katta qon aylanish doirasi yurakning chap qorinchasidan aorta orqali boshlanib, butun tana aʼzolariga kislorod tashiydi.'
      }
    ];
  }

  if (courseId.includes('geography')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" boʻyicha: Yer sharidagi eng katta maydonga ega materik qaysi?`,
        options: ['Yevrosiyo', 'Afrika', 'Shimoliy Amerika', 'Antarktida'],
        correctIndex: 0,
        explanation: 'Yevrosiyo materigi taxminan 54 million km² maydonga ega boʻlib, quruqlikning 1/3 qismini egallaydi.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Topografik xaritada masshtab 1:100 000 boʻlsa, xaritadagi 1 sm joyda qancha masofaga toʻgʻri keladi?',
        options: ['1 km', '100 metr', '10 km', '100 km'],
        correctIndex: 0,
        explanation: '1:100 000 da 1 sm = 100 000 sm = 1 000 metr = 1 kilometr.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'Oʻzbekistonning eng uzun daryosi qaysi?',
        options: ['Sirdaryo', 'Amudaryo', 'Zarafshon', 'Chirchiq'],
        correctIndex: 0,
        explanation: 'Sirdaryoning umumiy uzunligi 3019 km boʻlib, Oʻrta Osiyodagi eng uzun daryo hisoblanadi.'
      }
    ];
  }

  if (courseId.includes('history')) {
    return [
      {
        id: `${lessonId}-q1`,
        question: `"${lessonTitle}" mavzusi: Amir Temur davlatining poytaxti qaysi shahar boʻlgan?`,
        options: ['Samarqand', 'Buxoro', 'Shahrisabz', 'Hirot'],
        correctIndex: 0,
        explanation: 'Amir Temur 1370-yilda Samarqandni saltanat poytaxti deb eʼlon qilgan va uni dunyoning eng goʻzal shahriga aylantirgan.'
      },
      {
        id: `${lessonId}-q2`,
        question: 'Buyuk Ipak Yoʻli qaysi davlatlarni oʻzaro bogʻlagan?',
        options: [
          'Xitoy, Oʻrta Osiyo, Eron, Rim va Oʻrta yer dengizi hududlarini',
          'Faqat Yaponiya va Avstraliyani',
          'Faqat Rossiya va Skandinaviyani',
          'Faqat Afrika va Janubiy Amerikani'
        ],
        correctIndex: 0,
        explanation: 'Buyuk Ipak yoʻli miloddan avvalgi II asrdan to oʻrta asrlargacha Sharq va Gʻarb tamaddunlarini bogʻlagan savdo yoʻli boʻlgan.'
      },
      {
        id: `${lessonId}-q3`,
        question: 'XX asr boshida Turkistonda maʼrifatparvarlik va yangi usul maktablarini ochgan harakat vakillari kimlar deb atalgan?',
        options: ['Jadidlar', 'Sufiylar', 'Muqanna tarafdorlari', 'Narshaxiylar'],
        correctIndex: 0,
        explanation: 'Mahmudxoʻja Behbudiy, Munavvarqori, Abdulla Avloniy kabi jadidchilar xalqni ilm-maʼrifat orqali ozodlikka undagan.'
      }
    ];
  }

  // Default humanities / uzbek language quiz
  return [
    {
      id: `${lessonId}-q1`,
      question: `"${lessonTitle}" darsi: Oʻzbek tilida soʻz yasovchi qoʻshimchalar vazifasi nima?`,
      options: [
        'Yangi maʼnoli mustaqil soʻz hosil qilish (masalan: ish -> ishchi)',
        'Faqat gaplarni bir-biriga bogʻlash',
        'Soʻzning maʼnosini oʻzgartirmasdan shaklini oʻzgartirish',
        'Tinish belgilarini belgilash'
      ],
      correctIndex: 0,
      explanation: 'Soʻz yasovchi affikslar oʻzakdan yangi leksik maʼnoga ega boʻlgan mustaqil soʻz yasaydi (gul -> gulzor).'
    },
    {
      id: `${lessonId}-q2`,
      question: 'Murakkab qoʻshma gaplarda ergashtiruvchi bogʻlovchilar qaysi qatorda toʻgʻri koʻrsatilgan?',
      options: ['chunki, shuning uchun, agar, garchi', 'va, hamda, yo...yo', 'ammo, lekin, biroq', 'na...na, goh...goh'],
      correctIndex: 0,
      explanation: '"Chunki", "agar", "garchi", "shuning uchun" bosh va ergash gaplarni bogʻlovchi tobe vositalardir.'
    },
    {
      id: `${lessonId}-q3`,
      question: 'Mumtoz oʻzbek adabiyotida gʻazal janrining qofiyalanish tartibi qanday?',
      options: ['a-a, b-a, v-a, g-a...', 'a-b, a-b, v-g, v-g', 'a-a-a-a, b-b-b-b', 'a-b-b-a, v-g-g-v'],
      correctIndex: 0,
      explanation: 'Gʻazalning birinchi bayti (matla) oʻzaro qofiyalanadi (a-a), keyingi baytlar esa b-a, v-a, g-a tarzida davom etadi.'
    }
  ];
}
