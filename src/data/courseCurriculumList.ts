import { createCourseModules } from './courseCurriculum';

// 1. IELTS Masterclass (25 lessons)
export const langIeltsModules = createCourseModules('ielts', [
  {
    title: '1-Modul: IELTS Listening & Audio Strategiyalari',
    lessons: [
      { title: '1-Dars: Section 1 — Kundalik muloqot va shakllarni toʻldirish (Form Completion)', duration: '25 daqiqa', type: 'video' },
      { title: '2-Dars: Section 2 — Xaritalar, diagrammalar va yoʻnalishlarni aniqlash', duration: '30 daqiqa', type: 'interactive' },
      { title: '3-Dars: Section 3 — Akademik talabalar va oʻqituvchilar bahsi', duration: '28 daqiqa', type: 'video' },
      { title: '4-Dars: Section 4 — Murakkab monolog maʼruzalarni eshitib qayd etish', duration: '35 daqiqa', type: 'video' },
      { title: '5-Dars: Listening boʻyicha diagnostik amaliy test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: IELTS Academic Reading Tricklari',
    lessons: [
      { title: '6-Dars: Skimming va Scanning — Matndan kalit soʻzlarni 10 soniyada topish', duration: '30 daqiqa', type: 'video' },
      { title: '7-Dars: True, False, Not Given savollarida eng koʻp uchraydigan tuzoqlar', duration: '35 daqiqa', type: 'interactive' },
      { title: '8-Dars: Headings Matching — Abzaslarga sarlavha tanlash usullari', duration: '32 daqiqa', type: 'reading' },
      { title: '9-Dars: Summary Completion va Multiple Choice strategiyasi', duration: '30 daqiqa', type: 'video' },
      { title: '10-Dars: 20 daqiqalik toʻliq Reading Passage 3 simulyatsiyasi', duration: '45 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Academic Writing Task 1 (Vizual tahlil)',
    lessons: [
      { title: '11-Dars: Line Graph va Bar Chart — Oʻsish va pasayish dinamikasini tasvirlash', duration: '30 daqiqa', type: 'video' },
      { title: '12-Dars: Pie Chart va Jadvallar — Foizlarni taqqoslash formulalari', duration: '28 daqiqa', type: 'reading' },
      { title: '13-Dars: Jarayon (Process diagram) va Xaritalar (Map changes) tahlili', duration: '32 daqiqa', type: 'interactive' },
      { title: '14-Dars: Band 8.0 Overview (Umumiy xulosa) yozish sirlari', duration: '25 daqiqa', type: 'video' },
      { title: '15-Dars: Task 1 boʻyicha insho yozish va leksik tekshiruv', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Academic Writing Task 2 (Katta insho)',
    lessons: [
      { title: '16-Dars: Opinion (Agree/Disagree) insholari arxitekturasi', duration: '35 daqiqa', type: 'video' },
      { title: '17-Dars: Discuss Both Views and Give Your Opinion formati', duration: '32 daqiqa', type: 'interactive' },
      { title: '18-Dars: Problem & Solution hamda Advantage/Disadvantage insholari', duration: '30 daqiqa', type: 'reading' },
      { title: '19-Dars: Koheziv vositalar (Cohesive devices) va akademik kollokatsiyalar', duration: '28 daqiqa', type: 'video' },
      { title: '20-Dars: Toʻliq 250 soʻzlik insho yozish trenajyori', duration: '50 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: IELTS Speaking & Fluency Mastery',
    lessons: [
      { title: '21-Dars: Part 1 — Qisqa savollarga tabiiy va boy leksika bilan javob qaytarish', duration: '25 daqiqa', type: 'speaking' },
      { title: '22-Dars: Part 2 — Cue Card: 1 daqiqada reja tuzish va 2 daqiqa toʻxtovsiz gapirish', duration: '30 daqiqa', type: 'speaking' },
      { title: '23-Dars: Part 3 — Chuqur falsafiy va tahliliy munozara olib borish', duration: '32 daqiqa', type: 'speaking' },
      { title: '24-Dars: Idiomalar, toʻgʻri urgʻu va intonatsiya bilan gapirish texnikasi', duration: '28 daqiqa', type: 'interactive' },
      { title: '25-Dars: IELTS Speaking toʻliq Mock imtihon sinovi', duration: '40 daqiqa', type: 'quiz' },
    ]
  }
]);

// 2. General English (25 lessons)
export const langGeneralModules = createCourseModules('general', [
  {
    title: '1-Modul: Alifbo, Fonetika va Tanishtiruv',
    lessons: [
      { title: '1-Dars: Ingliz tili tovushlari va unlilar talaffuzi', duration: '20 daqiqa', type: 'video' },
      { title: '2-Dars: Salomlashuv va oʻzini tanishtirish dialoglari', duration: '25 daqiqa', type: 'speaking' },
      { title: '3-Dars: To Be feʼli (am, is, are) va kishilik olmoshlari', duration: '25 daqiqa', type: 'interactive' },
      { title: '4-Dars: Raqamlar, ranglar va kundalik buyumlar', duration: '22 daqiqa', type: 'reading' },
      { title: '5-Dars: 1-Modul boʻyicha leksik va grammatik test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Kundalik Hayot va Hozirgi Zamonlar',
    lessons: [
      { title: '6-Dars: Present Simple: Kundalik odatlar va tartiblar', duration: '28 daqiqa', type: 'video' },
      { title: '7-Dars: Soʻroq va inkor gaplar yasash (Do / Does)', duration: '25 daqiqa', type: 'interactive' },
      { title: '8-Dars: Present Continuous: Ayni paytda bajarilayotgan ish-harakatlar', duration: '30 daqiqa', type: 'video' },
      { title: '9-Dars: Oilaviy munosabatlar va kasblar leksikasi', duration: '25 daqiqa', type: 'speaking' },
      { title: '10-Dars: Hozirgi zamonlar boʻyicha amaliy mashq va test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Oʻtgan Zamon va Tarixlar (Past Tenses)',
    lessons: [
      { title: '11-Dars: Past Simple: Was / Were va toʻgʻri feʼllar (-ed)', duration: '30 daqiqa', type: 'video' },
      { title: '12-Dars: Notoʻgʻri feʼllar (Irregular verbs) ni eslab qolish formulasi', duration: '35 daqiqa', type: 'interactive' },
      { title: '13-Dars: Past Continuous: Oʻtgan zamonda maʼlum vaqt davom etgan harakatlar', duration: '28 daqiqa', type: 'video' },
      { title: '14-Dars: Oʻtgan dam olish kunlari haqida hikoya tuzish', duration: '30 daqiqa', type: 'speaking' },
      { title: '15-Dars: Oʻtgan zamonlar boʻyicha test sinovi', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Kelajak Zamon va Rejalar (Future Forms)',
    lessons: [
      { title: '16-Dars: Future Simple (Will): Spontan qarorlar va bashoratlar', duration: '25 daqiqa', type: 'video' },
      { title: '17-Dars: Be going to: Aniq rejalashtirilgan ish-harakatlar', duration: '28 daqiqa', type: 'interactive' },
      { title: '18-Dars: Modal feʼllar: Can, Could, Must, Should qoʻllanishi', duration: '32 daqiqa', type: 'video' },
      { title: '19-Dars: Sayohat, mehmonxona va aeroportdagi suhbatlar', duration: '30 daqiqa', type: 'speaking' },
      { title: '20-Dars: Rejalar va modal feʼllar boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Murakkab Konstruksiyalar va B2 Nutq',
    lessons: [
      { title: '21-Dars: Present Perfect (Have/Has + V3) — Hayotiy tajribalar', duration: '35 daqiqa', type: 'video' },
      { title: '22-Dars: Sifat darajalari (Comparative & Superlative)', duration: '25 daqiqa', type: 'interactive' },
      { title: '23-Dars: Shart ergash gaplar: Zero, First va Second Conditionals', duration: '35 daqiqa', type: 'video' },
      { title: '24-Dars: Erkin munozara va suhbat koʻnikmalari (Fluency)', duration: '30 daqiqa', type: 'speaking' },
      { title: '25-Dars: General English B2 yakuniy sertifikat testi', duration: '45 daqiqa', type: 'quiz' },
    ]
  }
]);

// 3. Rus Tili Soʻzlashuv (25 lessons)
export const langRuSpeakingModules = createCourseModules('ru-speak', [
  {
    title: '1-Modul: Fonetika, Tovushlar va Salomlashuv',
    lessons: [
      { title: '1-Dars: Rus tili alifbosi va qattiq/yumshoq undoshlar (Ь, Ъ)', duration: '22 daqiqa', type: 'video' },
      { title: '2-Dars: Rus tilida toʻgʻri urgʻu qoʻyish va jarangli tovushlar', duration: '25 daqiqa', type: 'speaking' },
      { title: '3-Dars: Salomlashuv va xushmuomala murojaat iboralari', duration: '20 daqiqa', type: 'interactive' },
      { title: '4-Dars: Oʻzi va oilasi haqida rus tilida hikoya qilish', duration: '28 daqiqa', type: 'speaking' },
      { title: '5-Dars: Fonetika va tanishuv mavzusida test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Otlar Jinsi va Bosh Kelishiklar',
    lessons: [
      { title: '6-Dars: Rus tilida otlarning jinsi (Мужской, Женский, Средний род)', duration: '30 daqiqa', type: 'video' },
      { title: '7-Dars: Otlarning koʻplik shakli va istisno holatlar', duration: '28 daqiqa', type: 'interactive' },
      { title: '8-Dars: Sifatlarning otlar bilan moslashuvi (Красивый, красивая, красивое)', duration: '32 daqiqa', type: 'reading' },
      { title: '9-Dars: Doʻkon va restoranda buyurtma berish dialoglari', duration: '25 daqiqa', type: 'speaking' },
      { title: '10-Dars: Otlar va sifatlar boʻyicha amaliy test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: 6 ta Kelishik Tizimi (Падежи)',
    lessons: [
      { title: '11-Dars: Родительный падеж (Kogó? Chegó? Откуда?) qoʻshimchalari', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Дательный падеж (Komú? Chemú? По чему?) sirlari', duration: '30 daqiqa', type: 'interactive' },
      { title: '13-Dars: Винительный падеж (Kogó? Chtó? Куда?) jonli va jonsiz otlar', duration: '32 daqiqa', type: 'video' },
      { title: '14-Dars: Творительный падеж (Kem? Chem? С кем?) birgalik ifodasi', duration: '30 daqiqa', type: 'interactive' },
      { title: '15-Dars: Predlojniy va barcha kelishiklar boʻyicha keng qamrovli test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Harakat Feʼllari (Глаголы движения)',
    lessons: [
      { title: '16-Dars: Идти va Ходить oʻrtasidagi asosiy farqlar', duration: '32 daqiqa', type: 'video' },
      { title: '17-Dars: Ехать va Ездить transportda harakatlanish feʼllari', duration: '30 daqiqa', type: 'interactive' },
      { title: '18-Dars: Prefiksli feʼllar: Пойти, прийти, уйти, войти, выйти', duration: '35 daqiqa', type: 'video' },
      { title: '19-Dars: Shaharda yoʻl soʻrash va marshrut tuzish dialogi', duration: '25 daqiqa', type: 'speaking' },
      { title: '20-Dars: Harakat feʼllari boʻyicha vaziyatli test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Jonli Soʻzlashuv va Frazeologizmlar',
    lessons: [
      { title: '21-Dars: Zamonaviy rus tili iboralari va qisqartmalar', duration: '28 daqiqa', type: 'speaking' },
      { title: '22-Dars: Rus filmlari va qoʻshiqlarini eshitib tushunish trenajyori', duration: '30 daqiqa', type: 'interactive' },
      { title: '23-Dars: Telefon orqali muloqot qilish odobi va qoidalari', duration: '25 daqiqa', type: 'speaking' },
      { title: '24-Dars: Rus madaniyati, xalq maqollari va hazillari', duration: '30 daqiqa', type: 'reading' },
      { title: '25-Dars: Erkin soʻzlashuv boʻyicha yakuniy sertifikat sinovi', duration: '45 daqiqa', type: 'quiz' },
    ]
  }
]);

// 4. Rus Tili Ishbilarmonlik (25 lessons)
export const langRuBusinessModules = createCourseModules('ru-biz', [
  {
    title: '1-Modul: Biznes Etiketi va Korporativ Muloqot',
    lessons: [
      { title: '1-Dars: Rasmiy ishbilarmonlik rus tili uslubining xususiyatlari', duration: '28 daqiqa', type: 'video' },
      { title: '2-Dars: Hamkasblar va rahbar bilan rasmiy muloqot meʼyorlari', duration: '25 daqiqa', type: 'reading' },
      { title: '3-Dars: Telefon qoʻngʻiroqlari va biznes uchrashuvlarni belgilash', duration: '30 daqiqa', type: 'speaking' },
      { title: '4-Dars: Korporativ tabriklar va xizmat safari iboralari', duration: '25 daqiqa', type: 'interactive' },
      { title: '5-Dars: Ishbilarmonlik etiketi boʻyicha test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Rasmiy Xatlar va Elektron Yozishmalar',
    lessons: [
      { title: '6-Dars: Ish yuzasidan xat (Деловое письмо) tuzish shabloni', duration: '35 daqiqa', type: 'video' },
      { title: '7-Dars: Tijoriy taklif (Коммерческое предложение) yozish usullari', duration: '30 daqiqa', type: 'reading' },
      { title: '8-Dars: Eʼtiroz va shikoyat xatlariga diplomatik javob yozish', duration: '32 daqiqa', type: 'interactive' },
      { title: '9-Dars: Rasmiy minnatdorchilik va taklifnoma xatlari', duration: '25 daqiqa', type: 'reading' },
      { title: '10-Dars: Xat yozish trenajyori va leksik test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Rezyume (CV) va Suhbatdan Oʻtish',
    lessons: [
      { title: '11-Dars: Rus tilida xalqaro standartdagi professional rezyume tuzish', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Ish beruvchi uchun ilova xati (Сопроводительное письмо)', duration: '28 daqiqa', type: 'interactive' },
      { title: '13-Dars: Ishga qabul qilish suhbatida (Собеседование) eng koʻp beriladigan 15 savol', duration: '35 daqiqa', type: 'speaking' },
      { title: '14-Dars: Ish haqi va mehnat sharoitlari boʻyicha muzokara olib borish', duration: '30 daqiqa', type: 'speaking' },
      { title: '15-Dars: Rezyume va intervyu simulyatsiyasi testi', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Shartnomalar va Yuridik Atamalar',
    lessons: [
      { title: '16-Dars: Oldi-sotdi va xizmat koʻrsatish shartnomalari tili', duration: '35 daqiqa', type: 'reading' },
      { title: '17-Dars: Bank, moliya va soliq atamalarining toʻgʻri qoʻllanishi', duration: '30 daqiqa', type: 'video' },
      { title: '18-Dars: Yetkazib berish shartlari va for-major holatlari', duration: '28 daqiqa', type: 'interactive' },
      { title: '19-Dars: Hisob-faktura va aktlarni tekshirish', duration: '30 daqiqa', type: 'reading' },
      { title: '20-Dars: Yuridik va moliyaviy atamalar testi', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: TRKI B1/B2 Xalqaro Imtihoni',
    lessons: [
      { title: '21-Dars: TRKI leksika va grammatika subtesti tahlili', duration: '35 daqiqa', type: 'video' },
      { title: '22-Dars: TRKI oʻqish va tinglash boʻyicha murakkab topshiriqlar', duration: '30 daqiqa', type: 'interactive' },
      { title: '23-Dars: TRKI yozma ish va insho qoidalari', duration: '35 daqiqa', type: 'reading' },
      { title: '24-Dars: TRKI ogʻzaki nutq sinovi simulyatsiyasi', duration: '30 daqiqa', type: 'speaking' },
      { title: '25-Dars: Toʻliq TRKI namunaviy imtihon sinovi', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 5. Fransuz Tili DELF (25 lessons)
export const langFrDelftModules = createCourseModules('fr-delf', [
  {
    title: '1-Modul: Parij Fonetikasi va Tovushlar Uygʻunligi',
    lessons: [
      { title: '1-Dars: Fransuzcha unlilar, nasal (burun) tovushlari va "R" talaffuzi', duration: '30 daqiqa', type: 'video' },
      { title: '2-Dars: Fransuz tilidagi urgʻu belgilari: Accent aigu (é), grave (è), circonflexe (ê)', duration: '28 daqiqa', type: 'interactive' },
      { title: '3-Dars: Salomlashuv va xushmuomala murojaat (Bonjour, Bonsoir, Au revoir)', duration: '25 daqiqa', type: 'speaking' },
      { title: '4-Dars: Raqamlar, hafta kunlari va oylar', duration: '25 daqiqa', type: 'reading' },
      { title: '5-Dars: Fonetika va salomlashuv boʻyicha test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Asosiy Feʼllar va Grammatika Asoslari',
    lessons: [
      { title: '6-Dars: Être (boʻlmoq) va Avoir (ega boʻlmoq) feʼllari', duration: '32 daqiqa', type: 'video' },
      { title: '7-Dars: 1-guruh feʼllari (-er) hozirgi zamonda tuslanishi (Parler, Aimer)', duration: '30 daqiqa', type: 'interactive' },
      { title: '8-Dars: Aniq va noaniq artikllar: Le, La, Les, Un, Une, Des', duration: '28 daqiqa', type: 'reading' },
      { title: '9-Dars: Inkor gaplar yasash (Ne ... pas) strukturasi', duration: '25 daqiqa', type: 'video' },
      { title: '10-Dars: Feʼllar va artikllar boʻyicha oraliq test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Kundalik Hayot va Suhbatlashish',
    lessons: [
      { title: '11-Dars: Fransuz kafesi va novvoyxonasida buyurtma berish', duration: '25 daqiqa', type: 'speaking' },
      { title: '12-Dars: Uy-joy, shahar va yoʻnalish soʻrash dialoglari', duration: '30 daqiqa', type: 'interactive' },
      { title: '13-Dars: 2-guruh feʼllari (-ir) tuslanishi (Finir, Choisir)', duration: '28 daqiqa', type: 'video' },
      { title: '14-Dars: Egalik sifatlari: Mon, Ma, Mes, Ton, Ta, Tes', duration: '25 daqiqa', type: 'reading' },
      { title: '15-Dars: Kundalik dialoglar va leksik test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Oʻtgan va Kelajak Zamonlar',
    lessons: [
      { title: '16-Dars: Passé Composé: Avoir va Être yordamida oʻtgan zamon', duration: '35 daqiqa', type: 'video' },
      { title: '17-Dars: Notoʻgʻri feʼllarning oʻtgan zamon shakllari (Participe passé)', duration: '32 daqiqa', type: 'interactive' },
      { title: '18-Dars: Futur Proche: Aller + Infinitif bilan yaqin kelajak', duration: '28 daqiqa', type: 'video' },
      { title: '19-Dars: Imparfait va Passé Composé farqlari', duration: '35 daqiqa', type: 'reading' },
      { title: '20-Dars: Zamonlar uygʻunligi boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: DELF A1/A2/B1 Xalqaro Imtihoni',
    lessons: [
      { title: '21-Dars: DELF Compréhension de l\'oral (Tinglab tushunish taktikasi)', duration: '30 daqiqa', type: 'video' },
      { title: '22-Dars: DELF Compréhension des écrits (Matn tahlili va savollar)', duration: '32 daqiqa', type: 'reading' },
      { title: '23-Dars: DELF Production écrite (Xat va shaxsiy fikr yozish)', duration: '35 daqiqa', type: 'interactive' },
      { title: '24-Dars: DELF Production orale (Ogʻzaki imtihon suhbati)', duration: '30 daqiqa', type: 'speaking' },
      { title: '25-Dars: Toʻliq DELF A2/B1 darajali namunaviy imtihon', duration: '45 daqiqa', type: 'quiz' },
    ]
  }
]);

// 6. Nemis Tili Goethe (25 lessons)
export const langDeGoetheModules = createCourseModules('de-goethe', [
  {
    title: '1-Modul: Alifbo, Fonetika va Birinchi Qadamlar',
    lessons: [
      { title: '1-Dars: Nemis alifbosi, Umlautlar (Ä, Ö, Ü) va ß harfi talaffuzi', duration: '25 daqiqa', type: 'video' },
      { title: '2-Dars: Salomlashuv va xayrlashuv (Hallo, Guten Tag, Auf Wiedersehen)', duration: '20 daqiqa', type: 'speaking' },
      { title: '3-Dars: Kishilik olmoshlari va Sein (boʻlmoq) feʼlining tuslanishi', duration: '28 daqiqa', type: 'interactive' },
      { title: '4-Dars: Nemis tilida sanoq sonlar va vaqtni aytish', duration: '25 daqiqa', type: 'reading' },
      { title: '5-Dars: Alifbo va tanishuv mavzusida test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Artikllar Tizimi va Gap Qurilishi (Satzbau)',
    lessons: [
      { title: '6-Dars: Der, Die, Das artikllarini oson eslab qolish mnemotexnikasi', duration: '32 daqiqa', type: 'video' },
      { title: '7-Dars: Hauptsatz: Gapda feʼlning qatʼiy 2-oʻrinda turishi qoidasi', duration: '30 daqiqa', type: 'reading' },
      { title: '8-Dars: Noaniq artikllar (Ein, Eine) va Inkor (Kein, Keine)', duration: '28 daqiqa', type: 'interactive' },
      { title: '9-Dars: Oddiy feʼllarning hozirgi zamonda (Präsens) tuslanishi', duration: '30 daqiqa', type: 'video' },
      { title: '10-Dars: Gap tuzilishi va artikllar boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Kelishiklar (Kasus): Akkusativ va Dativ',
    lessons: [
      { title: '11-Dars: Akkusativ kelishigi: Qachon va qaysi feʼllar bilan ishlatiladi?', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Dativ kelishigi: Kimga? Qayerda? savollariga javob berish', duration: '32 daqiqa', type: 'interactive' },
      { title: '13-Dars: Wechselpräpositionen (Ikki tomonlama predloglar: in, an, auf)', duration: '35 daqiqa', type: 'reading' },
      { title: '14-Dars: Egalik olmoshlari: Mein, Dein, Sein, Ihr kelishiklarda', duration: '28 daqiqa', type: 'interactive' },
      { title: '15-Dars: Akkusativ va Dativ boʻyicha amaliy test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Modal Feʼllar va Kundalik Muloqot',
    lessons: [
      { title: '16-Dars: Modalverben: Können, Müssen, Wollen, Dürfen, Sollen', duration: '32 daqiqa', type: 'video' },
      { title: '17-Dars: Doʻkon, vokzal va shifoxonada nemischa muloqot', duration: '30 daqiqa', type: 'speaking' },
      { title: '18-Dars: Ajraladigan feʼllar (Trennbare Verben: einkaufen, anrufen)', duration: '28 daqiqa', type: 'interactive' },
      { title: '19-Dars: Perfekt zamoni: Haben va Sein bilan oʻtgan zamon', duration: '35 daqiqa', type: 'video' },
      { title: '20-Dars: Modal feʼllar va Perfekt boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Goethe-Zertifikat A1/B1 va TestDaF',
    lessons: [
      { title: '21-Dars: Hören (Tinglab tushunish) strategiyalari va audio trenajyor', duration: '30 daqiqa', type: 'video' },
      { title: '22-Dars: Lesen (Oʻqish) qismidagi tuzoq savollarni yechish', duration: '32 daqiqa', type: 'reading' },
      { title: '23-Dars: Schreiben (Xat va elektron murojaat yozish shablonlari)', duration: '35 daqiqa', type: 'interactive' },
      { title: '24-Dars: Sprechen (Partnyor bilan muloqot va taqdimot qilish)', duration: '30 daqiqa', type: 'speaking' },
      { title: '25-Dars: Goethe-Zertifikat namunaviy toʻliq imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 7. IT Frontend React (25 lessons)
export const itFrontendModules = createCourseModules('fe', [
  {
    title: '1-Modul: Zamonaviy HTML5, Semantika va CSS Asoslari',
    lessons: [
      { title: '1-Dars: Veb sahifa anatomiyasi va Semantik HTML5 teglari', duration: '30 daqiqa', type: 'video' },
      { title: '2-Dars: CSS Box Model, Padding, Margin va Border sirlari', duration: '35 daqiqa', type: 'code' },
      { title: '3-Dars: Flexbox — 1 oʻlchamli moslashuvchan maketlar yaratish', duration: '40 daqiqa', type: 'code' },
      { title: '4-Dars: CSS Grid — 2 oʻlchamli murakkab dashboard va jadvallar', duration: '45 daqiqa', type: 'code' },
      { title: '5-Dars: HTML va CSS boʻyicha amaliy test sinovi', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Tailwind CSS va Moslashuvchan Dizayn',
    lessons: [
      { title: '6-Dars: Tailwind CSS utility-first konsepti va afzalliklari', duration: '30 daqiqa', type: 'video' },
      { title: '7-Dars: Responsive dizayn: sm, md, lg, xl ekranlar uchun moslashuv', duration: '35 daqiqa', type: 'code' },
      { title: '8-Dars: Dark mode va dinamik ranglar tizimini oʻrnatish', duration: '32 daqiqa', type: 'code' },
      { title: '9-Dars: Tailwind bilan zamonaviy Landing Page sahifasini terish', duration: '50 daqiqa', type: 'interactive' },
      { title: '10-Dars: Tailwind CSS boʻyicha amaliy test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: JavaScript ES6+ va Asinxron Dasturlash',
    lessons: [
      { title: '11-Dars: Oʻzgaruvchilar (let, const), Arrow Functions va Destructuring', duration: '35 daqiqa', type: 'code' },
      { title: '12-Dars: Massiv metodlari: Map, Filter, Reduce, Find, Some, Every', duration: '40 daqiqa', type: 'code' },
      { title: '13-Dars: DOM manipulyatsiyasi va Event Listenerlar bilan ishlash', duration: '38 daqiqa', type: 'code' },
      { title: '14-Dars: Promises, Async/Await va Fetch API orqali server bilan aloqa', duration: '45 daqiqa', type: 'code' },
      { title: '15-Dars: JavaScript ES6+ boʻyicha algoritmik test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: React.js Komponentlar va State Boshqaruvi',
    lessons: [
      { title: '16-Dars: React falsafasi, JSX sintaksisi va Virtual DOM tushunchasi', duration: '35 daqiqa', type: 'video' },
      { title: '17-Dars: Komponentlar va Props orqali maʼlumot uzatish', duration: '38 daqiqa', type: 'code' },
      { title: '18-Dars: useState hooki — Holatni boshqarish va reaktiv UI', duration: '42 daqiqa', type: 'code' },
      { title: '19-Dars: useEffect hooki — Hayot sikli va API integratsiyasi', duration: '45 daqiqa', type: 'code' },
      { title: '20-Dars: React asoslari va State boʻyicha test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Ilgʻor React, TypeScript va Portfolio Loyihasi',
    lessons: [
      { title: '21-Dars: TypeScript bilan React: Props va State lar uchun tiplar yozish', duration: '40 daqiqa', type: 'code' },
      { title: '22-Dars: Custom Hooks yaratish (masalan: useFetch, useDebounce)', duration: '38 daqiqa', type: 'code' },
      { title: '23-Dars: React Router DOM orqali koʻp sahifali ilova (SPA) qurish', duration: '45 daqiqa', type: 'code' },
      { title: '24-Dars: Internet-doʻkon (E-commerce) toʻliq loyihasini ishlab chiqish', duration: '60 daqiqa', type: 'interactive' },
      { title: '25-Dars: Frontend Dasturchi yakuniy sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 8. IT Python & AI (25 lessons)
export const itPythonModules = createCourseModules('py', [
  {
    title: '1-Modul: Python Dasturlash Asoslari',
    lessons: [
      { title: '1-Dars: Python oʻrnatish, sintaksis va oʻzgaruvchilar', duration: '25 daqiqa', type: 'video' },
      { title: '2-Dars: Maʼlumotlar turlari: int, float, str, bool va Type Casting', duration: '30 daqiqa', type: 'code' },
      { title: '3-Dars: Shartli operatorlar: if, elif, else mantiqi', duration: '32 daqiqa', type: 'code' },
      { title: '4-Dars: Sikllar: for va while, break va continue buyruqlari', duration: '35 daqiqa', type: 'code' },
      { title: '5-Dars: Python asoslari boʻyicha sintaktik test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Kolleksiyalar va Funksional Dasturlash',
    lessons: [
      { title: '6-Dars: Roʻyxatlar (Lists) va Tuple bilan ishlash', duration: '35 daqiqa', type: 'code' },
      { title: '7-Dars: Lugʻatlar (Dictionaries) va Toʻplamlar (Sets)', duration: '35 daqiqa', type: 'code' },
      { title: '8-Dars: Funksiyalar yaratish (*args, **kwargs) va Lambda ifodalar', duration: '40 daqiqa', type: 'code' },
      { title: '9-Dars: List Comprehension va Generatorlar orqali kodni optimallash', duration: '38 daqiqa', type: 'code' },
      { title: '10-Dars: Kolleksiyalar va funksiyalar boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Obyektga Yoʻnaltirilgan Dasturlash (OOP)',
    lessons: [
      { title: '11-Dars: Klasslar, Obyektlar va __init__ konstruktori', duration: '35 daqiqa', type: 'code' },
      { title: '12-Dars: Vorislik (Inheritance) va Polimorfizm tamoyillari', duration: '40 daqiqa', type: 'code' },
      { title: '13-Dars: Enkapsulyatsiya va xususiy (private) maydonlar', duration: '32 daqiqa', type: 'code' },
      { title: '14-Dars: Fayllar bilan ishlash (I/O) va JSON maʼlumotlarni oʻqish', duration: '35 daqiqa', type: 'code' },
      { title: '15-Dars: Python OOP boʻyicha amaliy test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Data Science: NumPy, Pandas va Matplotlib',
    lessons: [
      { title: '16-Dars: NumPy: Koʻp oʻlchamli massivlar va matritsalar ustida amallar', duration: '40 daqiqa', type: 'code' },
      { title: '17-Dars: Pandas DataFrame: Maʼlumotlar toʻplamini filtrlash va tahlil qilish', duration: '45 daqiqa', type: 'code' },
      { title: '18-Dars: Yetishmayotgan maʼlumotlarni tozalash (Data Cleaning)', duration: '38 daqiqa', type: 'code' },
      { title: '19-Dars: Matplotlib va Seaborn orqali grafiklar chizish', duration: '42 daqiqa', type: 'interactive' },
      { title: '20-Dars: Data Science kutubxonalari boʻyicha test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Sunʼiy Intellekt va Machine Learning',
    lessons: [
      { title: '21-Dars: Machine Learning kirish: Chiziqli regressiya (Linear Regression)', duration: '45 daqiqa', type: 'video' },
      { title: '22-Dars: Tasniflash (Classification) va Logistik Regressiya', duration: '42 daqiqa', type: 'code' },
      { title: '23-Dars: Scikit-learn orqali bashorat qiluvchi model qurish', duration: '50 daqiqa', type: 'code' },
      { title: '24-Dars: Gemini va OpenAI API yordamida AI botlar yaratish', duration: '55 daqiqa', type: 'code' },
      { title: '25-Dars: Python & AI kursi boʻyicha yakuniy sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 9. IT Backend Node.js (25 lessons)
export const itBackendModules = createCourseModules('be', [
  {
    title: '1-Modul: Node.js Arxitekturasi va NPM',
    lessons: [
      { title: '1-Dars: Node.js qanday ishlaydi? V8 dvigateli va Event Loop', duration: '30 daqiqa', type: 'video' },
      { title: '2-Dars: NPM va Package.json: Paketlarni boshqarish', duration: '25 daqiqa', type: 'code' },
      { title: '3-Dars: CommonJS va ES Modullari oʻrtasidagi farqlar', duration: '28 daqiqa', type: 'code' },
      { title: '4-Dars: File System (fs) moduli orqali fayllarni asinxron boshqarish', duration: '35 daqiqa', type: 'code' },
      { title: '5-Dars: Node.js asoslari boʻyicha oraliq test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Express.js va RESTful API Tuzish',
    lessons: [
      { title: '6-Dars: Express server yaratish va marshrutlash (Routing)', duration: '35 daqiqa', type: 'code' },
      { title: '7-Dars: HTTP metodlari: GET, POST, PUT, PATCH, DELETE', duration: '32 daqiqa', type: 'code' },
      { title: '8-Dars: Express Middleware: Logger, CORS va Body-Parser', duration: '38 daqiqa', type: 'code' },
      { title: '9-Dars: Xatoliklarni global tutish (Global Error Handling Middleware)', duration: '30 daqiqa', type: 'code' },
      { title: '10-Dars: REST API arxitekturasi boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Relyatsion Bazalar: PostgreSQL va SQL',
    lessons: [
      { title: '11-Dars: Relyatsion maʼlumotlar bazasi tushunchasi va jadvallar', duration: '30 daqiqa', type: 'video' },
      { title: '12-Dars: Asosiy SQL soʻrovlari: SELECT, INSERT, UPDATE, DELETE', duration: '35 daqiqa', type: 'code' },
      { title: '13-Dars: Jadvallarni bogʻlash: Primary Key, Foreign Key va JOIN turlari', duration: '40 daqiqa', type: 'code' },
      { title: '14-Dars: Node.js ni PostgreSQL ga ulash (pg drayveri)', duration: '38 daqiqa', type: 'code' },
      { title: '15-Dars: SQL va PostgreSQL boʻyicha amaliy test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Autentifikatsiya, JWT va Xavfsizlik',
    lessons: [
      { title: '16-Dars: Parollarni xavfsiz saqlash: Bcrypt bilan heshlash', duration: '35 daqiqa', type: 'code' },
      { title: '17-Dars: JSON Web Token (JWT) orqali avtorizatsiya mexanizmi', duration: '40 daqiqa', type: 'code' },
      { title: '18-Dars: Himoyalangan (Protected) endpointlar uchun auth middleware', duration: '35 daqiqa', type: 'code' },
      { title: '19-Dars: Rollar asosida kirish huquqlari (RBAC: Admin / User)', duration: '38 daqiqa', type: 'code' },
      { title: '20-Dars: Backend xavfsizligi va JWT boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Deployment, Docker va Yakuniy Loyiha',
    lessons: [
      { title: '21-Dars: Environment oʻzgaruvchilar (.env) va konfiguratsiya', duration: '28 daqiqa', type: 'code' },
      { title: '22-Dars: Docker asoslari: Backend loyihani konteynerga joylash', duration: '45 daqiqa', type: 'code' },
      { title: '23-Dars: Swagger / OpenAPI orqali API hujjatlarini yaratish', duration: '35 daqiqa', type: 'interactive' },
      { title: '24-Dars: Real vaqtdagi WebSockets (Socket.io) bilan chat yaratish', duration: '50 daqiqa', type: 'code' },
      { title: '25-Dars: Backend Dasturchi yakuniy sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 10. IT Kiberxavfsizlik (25 lessons)
export const itCyberModules = createCourseModules('cyber', [
  {
    title: '1-Modul: Tarmoq Asoslari va TCP/IP Arxitekturasi',
    lessons: [
      { title: '1-Dars: OSI va TCP/IP modelining 7 qatlami', duration: '30 daqiqa', type: 'video' },
      { title: '2-Dars: IP manzillar, Subnet maskalar va marshrutlash', duration: '32 daqiqa', type: 'interactive' },
      { title: '3-Dars: TCP 3 tomonlama bogʻlanish (Three-way handshake) tahlili', duration: '28 daqiqa', type: 'video' },
      { title: '4-Dars: Asosiy portlar va protokollar: HTTP, HTTPS, SSH, FTP, DNS', duration: '30 daqiqa', type: 'reading' },
      { title: '5-Dars: Tarmoq asoslari boʻyicha test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Linux Xavfsizligi va Tizim Boshqaruvi',
    lessons: [
      { title: '6-Dars: Linux terminal asoslari va fayl ruxsatlari (chmod, chown)', duration: '35 daqiqa', type: 'code' },
      { title: '7-Dars: Foydalanuvchilar va guruhlarni boshqarish (sudo, /etc/passwd)', duration: '30 daqiqa', type: 'code' },
      { title: '8-Dars: Jarayonlar va tarmoq ulanishlarini monitoring qilish (ps, netstat, lsof)', duration: '32 daqiqa', type: 'code' },
      { title: '9-Dars: UFW va iptables bilan Firewall qoidalarini sozlash', duration: '35 daqiqa', type: 'code' },
      { title: '10-Dars: Linux tizim xavfsizligi boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Kriptografiya va Maʼlumotlar Himoyasi',
    lessons: [
      { title: '11-Dars: Simmetrik va Asimmetrik shifrlash tamoyillari (AES, RSA)', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Kriptografik xeshlash: SHA-256, MD5 va yaxlitlik tekshiruvi', duration: '30 daqiqa', type: 'code' },
      { title: '13-Dars: Raqamli imzolar va SSL/TLS sertifikatlari zanjiri', duration: '32 daqiqa', type: 'video' },
      { title: '14-Dars: VPN va Proxy serverlarning ishlash mexanizmi', duration: '28 daqiqa', type: 'reading' },
      { title: '15-Dars: Kriptografiya asoslari boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Veb Zaifliklar va OWASP Top 10',
    lessons: [
      { title: '16-Dars: SQL Injection (SQLi) hujumi va undan himoyalanish', duration: '40 daqiqa', type: 'code' },
      { title: '17-Dars: XSS (Cross-Site Scripting) va Cookie oʻgʻirlash xavfi', duration: '35 daqiqa', type: 'code' },
      { title: '18-Dars: CSRF (Cross-Site Request Forgery) va SameSite atributi', duration: '32 daqiqa', type: 'code' },
      { title: '19-Dars: Notoʻgʻri konfiguratsiyalar va zaif parollar', duration: '30 daqiqa', type: 'reading' },
      { title: '20-Dars: OWASP Top 10 zaifliklari boʻyicha test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Axloqiy Xakerlik (Ethical Hacking) va Audit',
    lessons: [
      { title: '21-Dars: Tarmoq skaneri Nmap bilan ochiq portlarni aniqlash', duration: '40 daqiqa', type: 'code' },
      { title: '22-Dars: Wireshark orqali tarmoq paketlarini tahlil qilish', duration: '38 daqiqa', type: 'interactive' },
      { title: '23-Dars: Ijtimoiy muhandislik (Phishing) va kibergigiyena qoidalari', duration: '30 daqiqa', type: 'reading' },
      { title: '24-Dars: Xavfsizlik insidentlariga javob qaytarish (Incident Response)', duration: '35 daqiqa', type: 'video' },
      { title: '25-Dars: Kiberxavfsizlik mutaxassisi yakuniy sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 11. Aniq Fanlar: Matematika (25 lessons)
export const exactMathModules = createCourseModules('math', [
  {
    title: '1-Modul: Tenglamalar va Tengsizliklar',
    lessons: [
      { title: '1-Dars: Chiziqli va kvadrat tenglamalar, Viyet teoremasi', duration: '30 daqiqa', type: 'video' },
      { title: '2-Dars: Ratsional va irratsional tenglamalar yechish usullari', duration: '35 daqiqa', type: 'interactive' },
      { title: '3-Dars: Modulli tenglama va tengsizliklarni intervallar usulida yechish', duration: '32 daqiqa', type: 'video' },
      { title: '4-Dars: Koʻrsatkichli va logarifmik ifodalar va tenglamalar', duration: '38 daqiqa', type: 'reading' },
      { title: '5-Dars: Tenglamalar boʻyicha Milliy sertifikat darajasidagi test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Funksiyalar va Matematik Tahlil Asoslari',
    lessons: [
      { title: '6-Dars: Funksiya aniqlanish sohasi va qiymatlar sohasi', duration: '30 daqiqa', type: 'video' },
      { title: '7-Dars: Funksiya grafiglarini yasash va koordinatalarda siljitish', duration: '35 daqiqa', type: 'interactive' },
      { title: '8-Dars: Hosila (Derivatives): Asosiy qoidalar va formulalar jadvali', duration: '40 daqiqa', type: 'video' },
      { title: '9-Dars: Hosilaning geometrik va fizik maʼnosi, urinma tenglamasi', duration: '35 daqiqa', type: 'interactive' },
      { title: '10-Dars: Funksiyalar va hosila boʻyicha diagnostik test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Integral va Maydonlarni Hisoblash',
    lessons: [
      { title: '11-Dars: Boshlangʻich funksiya va aniqmas integral', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Aniq integral va Nyuton-Leybnits formulasi', duration: '40 daqiqa', type: 'interactive' },
      { title: '13-Dars: Egri chiziqli trapetsiya yuzasini integral orqali topish', duration: '38 daqiqa', type: 'video' },
      { title: '14-Dars: Aylanma jismlar hajmini hisoblash', duration: '35 daqiqa', type: 'reading' },
      { title: '15-Dars: Integrallar va tatbiqi boʻyicha oraliq test', duration: '45 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Trigonometriya Asoslari',
    lessons: [
      { title: '16-Dars: Radian oʻlchovi, trigonometrik aylanada sin, cos, tg, ctg', duration: '32 daqiqa', type: 'video' },
      { title: '17-Dars: Asosiy trigonometrik ayniyatlar va keltirish formulalari', duration: '35 daqiqa', type: 'interactive' },
      { title: '18-Dars: Qoʻshish formulalari va ikkilangan burchak formulalari', duration: '35 daqiqa', type: 'reading' },
      { title: '19-Dars: Oddiy va murakkab trigonometrik tenglamalarni yechish', duration: '38 daqiqa', type: 'video' },
      { title: '20-Dars: Trigonometriya boʻyicha olimpiada testlari', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Planimetriya, Stereometriya va Ehtimollar',
    lessons: [
      { title: '21-Dars: Uchburchak, toʻrtburchak va aylananing yuz formulalari', duration: '35 daqiqa', type: 'video' },
      { title: '22-Dars: Stereometriya: Prizma, piramida, silindr va konus hajmi', duration: '40 daqiqa', type: 'interactive' },
      { title: '23-Dars: Kombinatorika elementlari: Oʻrinlashtirish va guruhlash', duration: '30 daqiqa', type: 'reading' },
      { title: '24-Dars: Ehtimollar nazariyasi va matematik statistika masalalari', duration: '35 daqiqa', type: 'video' },
      { title: '25-Dars: Matematika boʻyicha toʻliq Milliy Sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 12. Aniq Fanlar: Fizika (25 lessons)
export const exactPhysicsModules = createCourseModules('phys', [
  {
    title: '1-Modul: Kinematika va Toʻgʻri Chiziqli Harakat',
    lessons: [
      { title: '1-Dars: Moddiy nuqta, sanoq sistemasi, yoʻl va koʻchish', duration: '28 daqiqa', type: 'video' },
      { title: '2-Dars: Toʻgʻri chiziqli tekis harakat tezligi va grafigi', duration: '30 daqiqa', type: 'interactive' },
      { title: '3-Dars: Tekis tezlanuvchan harakat va tezlanish formulalari', duration: '35 daqiqa', type: 'video' },
      { title: '4-Dars: Erkin tushish tezlanishi (g) va vertikal harakat', duration: '32 daqiqa', type: 'reading' },
      { title: '5-Dars: Kinematika boʻyicha masalalar va test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Dinamika va Nyuton Qonunlari',
    lessons: [
      { title: '6-Dars: Nyutonning 1, 2 va 3-qonunlarining fizik maʼnosi', duration: '35 daqiqa', type: 'video' },
      { title: '7-Dars: Tabiatdagi kuchlar: Ogʻirlik, elastiklik va ishqalanish kuchi', duration: '32 daqiqa', type: 'interactive' },
      { title: '8-Dars: Butun olam tortishish qonuni va sunʼiy yoʻldoshlar', duration: '30 daqiqa', type: 'video' },
      { title: '9-Dars: Jismlar muvozanati (Statika) va richag qoidasi', duration: '28 daqiqa', type: 'reading' },
      { title: '10-Dars: Dinamika qonunlari boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Saqlanish Qonunlari va Mexanik Ish',
    lessons: [
      { title: '11-Dars: Mexanik ish va quvvat (A = F*s*cos α)', duration: '30 daqiqa', type: 'video' },
      { title: '12-Dars: Kinetik va potensial energiya tushunchasi', duration: '32 daqiqa', type: 'interactive' },
      { title: '13-Dars: Toʻliq mexanik energiyaning saqlanish qonuni', duration: '35 daqiqa', type: 'video' },
      { title: '14-Dars: Jism impulsi va impulsning saqlanish qonuni (Reaktiv harakat)', duration: '32 daqiqa', type: 'reading' },
      { title: '15-Dars: Energiya va impuls boʻyicha test sinovi', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Molekulyar Fizika va Termodinamika',
    lessons: [
      { title: '16-Dars: Modda tuzilishining asosiy qoidalari va ideal gaz', duration: '30 daqiqa', type: 'video' },
      { title: '17-Dars: Mendeleyev-Klapeyron tenglamasi va izojarayonlar', duration: '38 daqiqa', type: 'interactive' },
      { title: '18-Dars: Termodinamikaning 1-qonuni va ichki energiya', duration: '35 daqiqa', type: 'video' },
      { title: '19-Dars: Issiqlik dvigatellari va Foydali Ish Koeffitsiyenti (FIK)', duration: '30 daqiqa', type: 'reading' },
      { title: '20-Dars: Termodinamika va gaz qonunlari testi', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Elektrodinamika va Optika',
    lessons: [
      { title: '21-Dars: Kulon qonuni va elektr maydon kuchlanganligi', duration: '32 daqiqa', type: 'video' },
      { title: '22-Dars: Oʻzgarmas tok qonunlari: Om qonuni va ketma-ket/parallel ulash', duration: '35 daqiqa', type: 'interactive' },
      { title: '23-Dars: Magnit maydoni va Elektromagnit induksiya (Faradey qonuni)', duration: '38 daqiqa', type: 'video' },
      { title: '24-Dars: Geometrik optika: Yorugʻlikning qaytishi va sinishi qonunlari', duration: '32 daqiqa', type: 'reading' },
      { title: '25-Dars: Fizika boʻyicha toʻliq DTM va Milliy sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 13. Tabiiy Fanlar: Kimyo (25 lessons)
export const naturalChemistryModules = createCourseModules('chem', [
  {
    title: '1-Modul: Kimyoning Asosiy Tushunchalari va Atom Tuzilishi',
    lessons: [
      { title: '1-Dars: Modda, atom, molekula va kimyoviy element tushunchasi', duration: '28 daqiqa', type: 'video' },
      { title: '2-Dars: Atom tuzilishi: Proton, neytron, elektron va izotoplar', duration: '32 daqiqa', type: 'reading' },
      { title: '3-Dars: Kvant sonlari va elektronlarning orbitallarda taqsimlanishi', duration: '35 daqiqa', type: 'interactive' },
      { title: '4-Dars: Mendeleyev davriy qonuni va davriy xossalar oʻzgarishi', duration: '30 daqiqa', type: 'video' },
      { title: '5-Dars: Atom tuzilishi va davriy qonun boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Kimyoviy Bogʻlanish va Noorganik Moddalar Sinflari',
    lessons: [
      { title: '6-Dars: Kovalent, ionli, metall va vodorod bogʻlanishlar', duration: '32 daqiqa', type: 'video' },
      { title: '7-Dars: Oksidlar: Tasniflanishi, nomlanishi va olinishi', duration: '30 daqiqa', type: 'reading' },
      { title: '8-Dars: Asoslar va kislotalarning kimyoviy xossalari', duration: '35 daqiqa', type: 'interactive' },
      { title: '9-Dars: Tuzlar va ularning oʻzaro taʼsirlashuv qonuniyatlari', duration: '30 daqiqa', type: 'video' },
      { title: '10-Dars: Noorganik birikmalar sinflari boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Eritmalar va Kimyoviy Reaksiyalar Qonuniyatlari',
    lessons: [
      { title: '11-Dars: Modda miqdori (mol), Avogadro doimiysi va molyar massa', duration: '30 daqiqa', type: 'video' },
      { title: '12-Dars: Eritmalarning foiz va molyar konsentratsiyasi masalalari', duration: '40 daqiqa', type: 'interactive' },
      { title: '13-Dars: Kimyoviy reaksiya tezligi va unga taʼsir etuvchi omillar', duration: '32 daqiqa', type: 'video' },
      { title: '14-Dars: Kimyoviy muvozanat va Le Shatelye prinsipi', duration: '35 daqiqa', type: 'reading' },
      { title: '15-Dars: Eritmalar va reaksiyalar kinetikasi testi', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Elektrolitik Dissotsiatsiya va Redoks Jarayonlar',
    lessons: [
      { title: '16-Dars: Elektrolitlar va qisqa ionli tenglamalarni yozish', duration: '32 daqiqa', type: 'interactive' },
      { title: '17-Dars: Tuzlarning gidrolizi va muhit (pH koʻrsatkichi)', duration: '35 daqiqa', type: 'video' },
      { title: '18-Dars: Oksidlanish-qaytarilish reaksiyalari (Elektron balans usuli)', duration: '40 daqiqa', type: 'interactive' },
      { title: '19-Dars: Metallar faollik qatori va elektrokimyo asoslari', duration: '30 daqiqa', type: 'reading' },
      { title: '20-Dars: Redoks va ion almashinish reaksiyalari testi', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Organik Kimyo Asoslari',
    lessons: [
      { title: '21-Dars: Organik birikmalarning tuzilish nazariyasi (Butlerov)', duration: '30 daqiqa', type: 'video' },
      { title: '22-Dars: Alkanlar, Alkenlar va Alkinlarning gomologik qatori', duration: '38 daqiqa', type: 'interactive' },
      { title: '23-Dars: Kislorodli organik birikmalar: Spirtlar, aldegidlar va kislotalar', duration: '35 daqiqa', type: 'video' },
      { title: '24-Dars: Aminokislotalar, oqsillar va uglevodlar biokimyosi', duration: '32 daqiqa', type: 'reading' },
      { title: '25-Dars: Kimyo fani boʻyicha toʻliq Milliy Sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 14. Tabiiy Fanlar: Biologiya (25 lessons)
export const naturalBiologyModules = createCourseModules('bio', [
  {
    title: '1-Modul: Sitologiya — Hujayra Haqidagi Fan',
    lessons: [
      { title: '1-Dars: Hujayra nazariyasi tarixi va mikroskopiya asoslari', duration: '28 daqiqa', type: 'video' },
      { title: '2-Dars: Hujayra membranasi va uning transport funksiyalari', duration: '30 daqiqa', type: 'reading' },
      { title: '3-Dars: Organoidlar: Mitoxondriya, Ribosoma, Golji, Lizosoma', duration: '35 daqiqa', type: 'interactive' },
      { title: '4-Dars: Yadro va xromosomalar tuzilishi (Kariotip)', duration: '30 daqiqa', type: 'video' },
      { title: '5-Dars: Hujayra tuzilishi boʻyicha amaliy test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Hujayra Biokimyosi va Energetik Almashinuv',
    lessons: [
      { title: '6-Dars: Oqsillar, uglevodlar va lipidlarning biologik ahamiyati', duration: '30 daqiqa', type: 'reading' },
      { title: '7-Dars: Nuklein kislotalar: DNK va RNK tuzilishi, komplementarlik', duration: '38 daqiqa', type: 'video' },
      { title: '8-Dars: Oqsil biosintezi: Transkripsiya va Translyatsiya jarayonlari', duration: '40 daqiqa', type: 'interactive' },
      { title: '9-Dars: Fotosintez va xemasintez bosqichlari (Yorugʻlik va qorongʻulik)', duration: '35 daqiqa', type: 'video' },
      { title: '10-Dars: Moddalar almashinuvi va biosintez boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Genetika va Seleksiya Asoslari',
    lessons: [
      { title: '11-Dars: Mendelning 1 va 2-qonunlari: Monoduragay chatishtirish', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Mendelning 3-qonuni: Diduragay chatishtirish va genlar mustaqilligi', duration: '38 daqiqa', type: 'interactive' },
      { title: '13-Dars: Jins bilan birikkan irsiylanish (Gemofiliya, daltonizm masalalari)', duration: '35 daqiqa', type: 'video' },
      { title: '14-Dars: Oʻzgaruvchanlik turlari: Modifikatsion va Mutatsion', duration: '30 daqiqa', type: 'reading' },
      { title: '15-Dars: Genetika masalalari boʻyicha amaliy test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Odam Anatomiyasi va Fiziologiyasi',
    lessons: [
      { title: '16-Dars: Qon aylanish tizimi: Yurak tuzilishi va qon bosimi', duration: '35 daqiqa', type: 'video' },
      { title: '17-Dars: Nafas olish va gazlar almashinuvi mexanizmi', duration: '30 daqiqa', type: 'interactive' },
      { title: '18-Dars: Ovqat hazm qilish aʼzolari va fermentlar faoliyati', duration: '32 daqiqa', type: 'reading' },
      { title: '19-Dars: Asab tizimi va oliy asab faoliyati reflekslari', duration: '38 daqiqa', type: 'video' },
      { title: '20-Dars: Odam anatomiyasi boʻyicha oraliq test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Evolutsiya va Ekologiya Asoslari',
    lessons: [
      { title: '21-Dars: Darvin taʼlimoti va tabiiy tanlanish harakatlantiruvchi kuchlari', duration: '32 daqiqa', type: 'video' },
      { title: '22-Dars: Tur mezonlari va yangi turlarning hosil boʻlishi', duration: '30 daqiqa', type: 'reading' },
      { title: '23-Dars: Ekologik omillar (abiotik, biotik, antropogen) va oziq zanjirlari', duration: '35 daqiqa', type: 'interactive' },
      { title: '24-Dars: Biosfera va global ekologik muammolar yechimi', duration: '28 daqiqa', type: 'reading' },
      { title: '25-Dars: Biologiya boʻyicha toʻliq Milliy Sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 15. Tabiiy Fanlar: Geografiya (25 lessons)
export const naturalGeographyModules = createCourseModules('geo', [
  {
    title: '1-Modul: Kartografiya va Yer Sayyorasi',
    lessons: [
      { title: '1-Dars: Geografik koordinatalar: Kenglik, uzunlik va ekvator', duration: '25 daqiqa', type: 'video' },
      { title: '2-Dars: Masshtab va joy planini tuzish qoidalari', duration: '28 daqiqa', type: 'interactive' },
      { title: '3-Dars: Globus va zamonaviy raqamli xaritalar tahlili', duration: '30 daqiqa', type: 'reading' },
      { title: '4-Dars: Yerning oʻz oʻqi va Quyosh atrofida aylanish oqibatlari', duration: '32 daqiqa', type: 'video' },
      { title: '5-Dars: Kartografiya boʻyicha amaliy test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Litosfera va Yer Relyefi',
    lessons: [
      { title: '6-Dars: Litosfera plitalari tektonikasi va qitʼalar dreyfi', duration: '32 daqiqa', type: 'video' },
      { title: '7-Dars: Zilzilalar, vulqonlar va togʻ hosil boʻlish jarayonlari', duration: '30 daqiqa', type: 'interactive' },
      { title: '8-Dars: Yer yuzasining tekisliklari va togʻ tizmalari atlasi', duration: '28 daqiqa', type: 'reading' },
      { title: '9-Dars: Foydali qazilmalar va geologik boyliklar', duration: '30 daqiqa', type: 'video' },
      { title: '10-Dars: Litosfera qonuniyatlari boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Atmosfera, Gidrosfera va Iqlim',
    lessons: [
      { title: '11-Dars: Atmosfera qatlamlari, havo bosimi va shamollar tizimi', duration: '30 daqiqa', type: 'video' },
      { title: '12-Dars: Iqlim mintaqalari: Ekvatorialdan Arktikagacha', duration: '35 daqiqa', type: 'interactive' },
      { title: '13-Dars: Dunyo okeani: Oqimlar, toʻlqinlar va shoʻrlanish darajasi', duration: '32 daqiqa', type: 'video' },
      { title: '14-Dars: Quruqlik suvlari: Daryolar, koʻllar, muzliklar va yerosti suvlari', duration: '28 daqiqa', type: 'reading' },
      { title: '15-Dars: Iqlim va gidrosfera boʻyicha oraliq test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Dunyo Materiklari va Tabiiy Zonalari',
    lessons: [
      { title: '16-Dars: Yevrosiyo materigi tabiati, daryolari va tabiiy zonalari', duration: '35 daqiqa', type: 'video' },
      { title: '17-Dars: Afrika: Sahroi Kabir, savannalar va ekvatorial oʻrmonlar', duration: '30 daqiqa', type: 'reading' },
      { title: '18-Dars: Shimoliy va Janubiy Amerika materiklari tabiati', duration: '32 daqiqa', type: 'interactive' },
      { title: '19-Dars: Avstraliya va Antarktida — noyob tabiat muzeylari', duration: '28 daqiqa', type: 'video' },
      { title: '20-Dars: Jahon materiklari boʻyicha xaritali test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Oʻzbekiston Tabiiy va Iqtisodiy Geografiyasi',
    lessons: [
      { title: '21-Dars: Oʻzbekistonning geografik oʻrni, chegaralari va relyefi', duration: '30 daqiqa', type: 'video' },
      { title: '22-Dars: Oʻzbekiston iqlimi, daryolari (Amudaryo, Sirdaryo) va Orol muammosi', duration: '35 daqiqa', type: 'interactive' },
      { title: '23-Dars: Tabiiy boyliklar, gaz, neft, oltin va rangli metallar zaxirasi', duration: '30 daqiqa', type: 'reading' },
      { title: '24-Dars: Aholi demografiyasi, shaharlar va iqtisodiy rayonlashtirish', duration: '32 daqiqa', type: 'video' },
      { title: '25-Dars: Geografiya boʻyicha toʻliq yakuniy imtihon', duration: '45 daqiqa', type: 'quiz' },
    ]
  }
]);

// 16. Ijtimoiy Fanlar: Tarix (25 lessons)
export const humHistoryModules = createCourseModules('hist', [
  {
    title: '1-Modul: Qadimgi Sivilizatsiyalar va Oʻrta Osiyo',
    lessons: [
      { title: '1-Dars: Tarix faniga kirish, manbashunoslik va arxeologiya', duration: '25 daqiqa', type: 'video' },
      { title: '2-Dars: Qadimgi Misr, Mesopotamiya va Qadimgi Yunoniston madaniyati', duration: '30 daqiqa', type: 'reading' },
      { title: '3-Dars: Qadimgi Baqtriya, Soʻgʻdiyona va Xorazm davlatlari', duration: '32 daqiqa', type: 'video' },
      { title: '4-Dars: Zardushtiylik dini va "Avesto" muqaddas kitobi', duration: '28 daqiqa', type: 'reading' },
      { title: '5-Dars: Qadimgi dunyo tarixi boʻyicha test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Buyuk Ipak Yoʻli va Ilk Oʻrta Asrlar',
    lessons: [
      { title: '6-Dars: Buyuk Ipak Yoʻli va xalqaro savdo diplomatiyasi', duration: '30 daqiqa', type: 'video' },
      { title: '7-Dars: Kushon davlati va Eftaliylar davri tarixi', duration: '28 daqiqa', type: 'reading' },
      { title: '8-Dars: Arab xalifaligi bosqini va Muqanna qoʻzgʻoloni', duration: '32 daqiqa', type: 'video' },
      { title: '9-Dars: Somoniylar davlati va ilm-fan renasansi (Xorazmiy, Fargʻoniy, Ibn Sino)', duration: '35 daqiqa', type: 'interactive' },
      { title: '10-Dars: Ilk oʻrta asrlar madaniyati boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Amir Temur va Temuriylar Renasansi',
    lessons: [
      { title: '11-Dars: Amir Temurning hokimiyat tepasiga kelishi va markazlashgan saltanat', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: "Temur tuzuklari" — Davlat boshqaruvi va harbiy sanʼat durdonasi', duration: '32 daqiqa', type: 'reading' },
      { title: '13-Dars: Mirzo Ulugʻbek va Samarqand astronomiya maktabi', duration: '35 daqiqa', type: 'interactive' },
      { title: '14-Dars: Hirot madaniy muhiti va Alisher Navoiy davri', duration: '30 daqiqa', type: 'reading' },
      { title: '15-Dars: Temuriylar davri tarixi boʻyicha oraliq test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Xonliklar Davri va Jadidchilik Harakati',
    lessons: [
      { title: '16-Dars: Buxoro amirligi, Xiva va Qoʻqon xonliklarining tashkil topishi', duration: '32 daqiqa', type: 'video' },
      { title: '17-Dars: Rossiya imperiyasining Turkistonni bosib olishi', duration: '35 daqiqa', type: 'reading' },
      { title: '18-Dars: Jadidchilik harakati: Mahmudxoʻja Behbudiy, Munavvarqori, Fitrat', duration: '38 daqiqa', type: 'video' },
      { title: '19-Dars: Yangi usul maktablari va Turkiston milliy matbuoti', duration: '30 daqiqa', type: 'reading' },
      { title: '20-Dars: Mustamlakachilik va jadidlar merosi testi', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: XX Asr Sinovlari va Mustaqil Oʻzbekiston',
    lessons: [
      { title: '21-Dars: Ikkinchi jahon urushida Oʻzbekiston xalqining jasorati', duration: '30 daqiqa', type: 'video' },
      { title: '22-Dars: 1991-yil 31-avgust: Davlat Mustaqilligining eʼlon qilinishi', duration: '35 daqiqa', type: 'interactive' },
      { title: '23-Dars: Oʻzbekiston Respublikasi Konstitutsiyasi va davlat ramzlari', duration: '28 daqiqa', type: 'reading' },
      { title: '24-Dars: Yangi Oʻzbekiston taraqqiyot strategiyasi va xalqaro nufuzi', duration: '32 daqiqa', type: 'video' },
      { title: '25-Dars: Oʻzbekiston va Jahon tarixi boʻyicha yakuniy imtihon', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);

// 17. Ijtimoiy Fanlar: Ona Tili va Adabiyot (25 lessons)
export const humUzbekModules = createCourseModules('uzb', [
  {
    title: '1-Modul: Fonetika, Grafika va Imlo Qoidalari',
    lessons: [
      { title: '1-Dars: Oʻzbek tili unli va undosh tovushlar tizimi', duration: '25 daqiqa', type: 'video' },
      { title: '2-Dars: Singarmonizm va tovush oʻzgarishlari (tushish, ortish, almashish)', duration: '30 daqiqa', type: 'interactive' },
      { title: '3-Dars: Asosiy imlo qoidalari: Tutuq belgisi (\') va chiziqcha bilan yozish', duration: '28 daqiqa', type: 'reading' },
      { title: '4-Dars: Boʻgʻin koʻchirish va bosh harflar imlosi', duration: '25 daqiqa', type: 'video' },
      { title: '5-Dars: Fonetika va imlo boʻyicha amaliy test', duration: '30 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '2-Modul: Leksikologiya va Morfologiya Asoslari',
    lessons: [
      { title: '6-Dars: Soʻzning leksik maʼnosi: Sinonimlar, antonimlar, omonimlar, paronimlar', duration: '32 daqiqa', type: 'video' },
      { title: '7-Dars: Ot soʻz turkumi: Egalik, kelishik va koʻplik qoʻshimchalari', duration: '35 daqiqa', type: 'interactive' },
      { title: '8-Dars: Sifat va Son: Maʼno turlari va yasalishi', duration: '30 daqiqa', type: 'reading' },
      { title: '9-Dars: Olmosh va Ravish: Maʼno guruhlari va sintaktik vazifalari', duration: '32 daqiqa', type: 'video' },
      { title: '10-Dars: Mustaqil soʻz turkumlari boʻyicha test', duration: '35 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '3-Modul: Feʼl Morfologiyasi va Yordamchi Soʻzlar',
    lessons: [
      { title: '11-Dars: Feʼl nisbatlari: Aniq, oʻzlik, majhul, orttirma, birgalik', duration: '35 daqiqa', type: 'video' },
      { title: '12-Dars: Feʼlning vazifadosh shakllari: Sifatdosh, ravishdosh, harakat nomi', duration: '38 daqiqa', type: 'interactive' },
      { title: '13-Dars: Feʼl mayllari va zamonlari tizimi', duration: '30 daqiqa', type: 'reading' },
      { title: '14-Dars: Yordamchi soʻz turkumlari: Koʻmakchi, bogʻlovchi, yuklama', duration: '35 daqiqa', type: 'video' },
      { title: '15-Dars: Feʼl va yordamchi soʻzlar boʻyicha test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '4-Modul: Sintaksis, Gap Boʻlaklari va Tinish Belgilari',
    lessons: [
      { title: '16-Dars: Soʻz birikmasi va gap: Bosh va ikkinchi darajali boʻlaklar', duration: '32 daqiqa', type: 'video' },
      { title: '17-Dars: Bir bosh boʻlakli gaplar (shaxsi maʼlum, nomaʼlum, umumiy, shaxssiz)', duration: '35 daqiqa', type: 'interactive' },
      { title: '18-Dars: Qoʻshma gaplar: Bogʻlangan, ergashgan va bogʻlovchisiz qoʻshma gaplar', duration: '40 daqiqa', type: 'video' },
      { title: '19-Dars: Qoʻshma gaplarda tinish belgilari: Vergul, nuqtali vergul, tire, ikki nuqta', duration: '35 daqiqa', type: 'reading' },
      { title: '20-Dars: Sintaksis va tinish belgilari boʻyicha test', duration: '40 daqiqa', type: 'quiz' },
    ]
  },
  {
    title: '5-Modul: Oʻzbek Adabiyoti Durlari va Matn Tahlili',
    lessons: [
      { title: '21-Dars: Xalq ogʻzaki ijodi va "Alpomish" dostoni badiiyati', duration: '30 daqiqa', type: 'reading' },
      { title: '22-Dars: Alisher Navoiy ijodi: Gʻazaliyot, aruz vazni va ramzlar', duration: '38 daqiqa', type: 'interactive' },
      { title: '23-Dars: Bobur, Ogahiy va Furqat merosi tahlili', duration: '30 daqiqa', type: 'reading' },
      { title: '24-Dars: Choʻlpon, Abdulla Qodiriy va Oybek asarlari poetikasi', duration: '35 daqiqa', type: 'video' },
      { title: '25-Dars: Ona tili va adabiyot boʻyicha toʻliq Milliy Sertifikat imtihoni', duration: '50 daqiqa', type: 'quiz' },
    ]
  }
]);
