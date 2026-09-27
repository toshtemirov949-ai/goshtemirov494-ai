import { SubjectTest } from '../types';

export const SUBJECT_TESTS: SubjectTest[] = [
  // 1. IELTS & Academic English
  {
    id: 'test-languages-ielts',
    title: 'Ingliz Tili: IELTS 7.5+ & Academic English',
    subject: 'Ingliz Tili',
    category: 'languages',
    questionsCount: 6,
    durationMinutes: 8,
    difficulty: 'Murakkab',
    questions: [
      {
        id: 'ielts-1',
        question: 'Choose the correct word: Despite _____ for hours, she could not find the missing document.',
        options: ['searching', 'she searched', 'having searched to', 'searched'],
        correctIndex: 0,
        explanation: '"Despite" predlogidan soʻng feʼl -ing shaklida (gerund) yoki ot keladi: Despite searching.'
      },
      {
        id: 'ielts-2',
        question: 'Which word is a formal synonym for "Widespread / Everywhere"?',
        options: ['Ubiquitous', 'Ephemeral', 'Ambiguous', 'Tedious'],
        correctIndex: 0,
        explanation: '"Ubiquitous" soʻzi akademik tilda "hamma joyda uchraydigan, omnipresent" degan maʼnoda qoʻllanadi.'
      },
      {
        id: 'ielts-3',
        question: 'Complete the sentence with inversion: "Hardly had we arrived at the venue _____ the presentation commenced."',
        options: ['when', 'than', 'that', 'then'],
        correctIndex: 0,
        explanation: 'Ingliz tili inversiya qoidasiga koʻra: "Hardly had ... when ..." bogʻlovchisi ishlatiladi.'
      },
      {
        id: 'ielts-4',
        question: 'In IELTS Writing Task 1, which sentence shows the highest lexical resource for a chart comparison?',
        options: [
          'There was a dramatic escalation in smartphone adoption between 2015 and 2020.',
          'The smartphones went up very much fast in five years.',
          'People liked smartphones more and it was big growth.',
          'Smartphones number climbed high up greatly.'
        ],
        correctIndex: 0,
        explanation: '"Dramatic escalation in smartphone adoption" yuqori akademik leksik birlik (Band 8.0+) namunasidir.'
      },
      {
        id: 'ielts-5',
        question: 'If the committee _____ their proposal earlier, we would not have faced these budget constraints.',
        options: ['had endorsed', 'endorsed', 'would endorse', 'has endorsed'],
        correctIndex: 0,
        explanation: 'Third Conditional (oʻtgan zamondagi nereal shart): If + Past Perfect, would + have + V3.'
      },
      {
        id: 'ielts-6',
        question: 'What is the recommended speaking strategy for IELTS Speaking Part 2?',
        options: [
          'Using the 1-minute preparation to outline keywords and telling a cohesive chronological story',
          'Staying silent for 30 seconds and giving a one-sentence answer',
          'Speaking extremely fast without pauses or intonation',
          'Memorizing an entire Wikipedia article word for word'
        ],
        correctIndex: 0,
        explanation: '1 daqiqalik tayyorgarlik vaqtida reja tuzish va tabiiy bogʻlovchilar bilan 2 daqiqa ravon soʻzlash asosiy talabdir.'
      }
    ]
  },

  // 2. General English
  {
    id: 'test-languages-general',
    title: 'General English: A1-B2 & Daily Conversation',
    subject: 'Ingliz Tili',
    category: 'languages',
    questionsCount: 5,
    durationMinutes: 6,
    difficulty: 'Oson',
    questions: [
      {
        id: 'gen-1',
        question: 'Choose the correct sentence in Present Simple:',
        options: [
          'My brother always finishes his homework before dinner.',
          'My brother always finish his homework before dinner.',
          'My brother is always finish his homework before dinner.',
          'My brother finishes always his homework before dinner.'
        ],
        correctIndex: 0,
        explanation: 'Uchinchi shaxs birlikda (he) feʼlga -es qoʻshiladi va "always" chastota ravishi asosiy feʼldan oldin keladi.'
      },
      {
        id: 'gen-2',
        question: 'Choose the correct preposition: "I have been living in this city _____ 2018."',
        options: ['since', 'for', 'during', 'from'],
        correctIndex: 0,
        explanation: 'Aniq boshlangan vaqt nuqtasi uchun Present Perfect da "since" ishlatiladi.'
      },
      {
        id: 'gen-3',
        question: 'Which modal verb expresses strong obligation or necessity by rules?',
        options: ['must', 'might', 'could', 'shall'],
        correctIndex: 0,
        explanation: '"Must" qatʼiy majburiyat va qonun-qoidalarni ifodalaydi.'
      },
      {
        id: 'gen-4',
        question: 'What is the opposite of the adjective "Generous"?',
        options: ['Stingy / Mean', 'Polite', 'Courageous', 'Affectionate'],
        correctIndex: 0,
        explanation: '"Generous" (saxiy) soʻzining teskarisi "Stingy / Mean" (xasis, ziqna) hisoblanadi.'
      },
      {
        id: 'gen-5',
        question: 'Complete the dialogue: "Would you mind helping me with this suitcase?" — "_____"',
        options: ['Not at all, I would be glad to help.', 'Yes, I mind very much.', 'No, I don\'t like it.', 'Please mind your business.'],
        correctIndex: 0,
        explanation: '"Would you mind...?" savoliga rozilik bildirish uchun "Not at all" (Hechqisi yoʻq, bajonidil) deyiladi.'
      }
    ]
  },

  // 3. Rus Tili Soʻzlashuv
  {
    id: 'test-languages-russian-speaking',
    title: 'Rus Tili: Soʻzlashuv va Jonli Muloqot',
    subject: 'Rus Tili',
    category: 'languages',
    questionsCount: 5,
    durationMinutes: 6,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'ru-1',
        question: 'Выберите правильный вариант: Мы подошли к новому _____ вовремя.',
        options: ['зданию', 'здании', 'зданием', 'здания'],
        correctIndex: 0,
        explanation: 'Предлог "к" требует Дательного падежа (к чему? к новому зданию).'
      },
      {
        id: 'ru-2',
        question: 'Укажите верное нормативное ударение в слове:',
        options: ['звони́т', 'зво́нит', 'звони́шь (на первый слог)', 'звóнят'],
        correctIndex: 0,
        explanation: 'В литературном русском языке нормативное ударение падает на окончание: звони́т, звоня́т.'
      },
      {
        id: 'ru-3',
        question: 'Какой падеж отвечает на вопросы "Кем? Чем?":',
        options: ['Творительный', 'Дательный', 'Винительный', 'Родительный'],
        correctIndex: 0,
        explanation: 'Творительный падеж отвечает на вопросы Кем? Чем? (гордиться победой).'
      },
      {
        id: 'ru-4',
        question: 'Выберите верный глагол движения: "Каждое воскресенье мы _____ в горы."',
        options: ['ездим', 'едем', 'поехали', 'приехали'],
        correctIndex: 0,
        explanation: 'Для регулярно повторяющихся действий туда и обратно используется разнонаправленный глагол "ездить".'
      },
      {
        id: 'ru-5',
        question: 'Что означает фразеологизм "Работать засучив рукава"?',
        options: ['Работать усердно и с полной отдачей', 'Работать неохотно', 'Отдыхать на рабочем месте', 'Испортить одежду'],
        correctIndex: 0,
        explanation: '"Засучив рукава" означает работать энергично, старательно и усердно.'
      }
    ]
  },

  // 4. Rus Tili Ishbilarmonlik
  {
    id: 'test-languages-russian-business',
    title: 'Rus Tili: Ishbilarmonlik va TRKI Sertifikati',
    subject: 'Rus Tili',
    category: 'languages',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Murakkab',
    questions: [
      {
        id: 'rub-1',
        question: 'Какое приветствие является общепринятым стандартом деловой переписки?',
        options: ['Уважаемый господин Иванов!', 'Привет, коллега!', 'Здорово, Иван!', 'Эй, добрый день!'],
        correctIndex: 0,
        explanation: '"Уважаемый господин / Уважаемая госпожа..." — общепринятая норма делового этикета.'
      },
      {
        id: 'rub-2',
        question: 'Выберите правильное управление: "Согласно _____ (распоряжение) директора, совещание переносится."',
        options: ['распоряжению', 'распоряжения', 'распоряжением', 'распоряжении'],
        correctIndex: 0,
        explanation: 'Предлог "согласно" управляет исключительно Дательным падежом: согласно чему? — распоряжению.'
      },
      {
        id: 'rub-3',
        question: 'Укажите правильную форму множественного числа: "В компании подписали важные _____."',
        options: ['догово́ры', 'договора́', 'до́говоры', 'догово́ров'],
        correctIndex: 0,
        explanation: 'Строгая литературная норма делового языка: догово́ры.'
      },
      {
        id: 'rub-4',
        question: 'Какое слово обозначает краткое изложение профессионального опыта кандидата?',
        options: ['Резюме (CV)', 'Накладная', 'Меморандум', 'Протокол'],
        correctIndex: 0,
        explanation: 'Резюме — документ, содержащий информацию о навыках, опыте работы и образовании соискателя.'
      },
      {
        id: 'rub-5',
        question: 'Вставьте подходящий оборот: "Благодарим Вас за _____ интерес к нашей продукции."',
        options: ['проявленный', 'направленный', 'выставленный', 'потраченный'],
        correctIndex: 0,
        explanation: 'Устойчивое деловое клише: "проявленный интерес к продукции/услугам".'
      }
    ]
  },

  // 5. Fransuz Tili
  {
    id: 'test-languages-french',
    title: 'Fransuz Tili: DELF A1-B2 va Fonetika',
    subject: 'Fransuz Tili',
    category: 'languages',
    questionsCount: 5,
    durationMinutes: 6,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'fr-1',
        question: 'Être (boʻlmoq) feʼlining "Ils/Elles" shakli qaysi?',
        options: ['sont', 'sommes', 'êtes', 'ont'],
        correctIndex: 0,
        explanation: 'Ils sont / Elles sont (Ular ...dirlar).'
      },
      {
        id: 'fr-2',
        question: 'Fransuz tilida "Liaison" hodisasi nimani anglatadi?',
        options: [
          'Oldingi soʻzning oʻqilmaydigan oxirgi undoshi keyingi unli bilan boshlanuvchi soʻzga bogʻlanishi',
          'Urgʻuni soʻzning birinchi boʻgʻiniga koʻchirish',
          'Feʼlni notoʻgʻri tuslash',
          'Otning jinsini oʻzgartirish'
        ],
        correctIndex: 0,
        explanation: 'Liaison (bogʻlanish) — masalan "les amis" [le-zami] tarzida nafis oʻqilishi.'
      },
      {
        id: 'fr-3',
        question: 'Parler feʼlining Passé Composé zamonidagi toʻgʻri shakli: "J\'ai _____ français."',
        options: ['parlé', 'parler', 'parles', 'parlons'],
        correctIndex: 0,
        explanation: 'Birinchi guruh feʼllarining oʻtgan zamon sifatdoshi (participe passé) -é bilan tugaydi: parlé.'
      },
      {
        id: 'fr-4',
        question: '"Comment vous appelez-vous ?" savolining maʼnosi nima?',
        options: ['Ismingiz nima?', 'Qayerdan keldingiz?', 'Yoshingiz nechida?', 'Qayerda yashaysiz?'],
        correctIndex: 0,
        explanation: '"Comment vous appelez-vous ?" — rasmiy xushmuomala tarzda ismni soʻrash.'
      },
      {
        id: 'fr-5',
        question: 'Fransuz tilida "Merci beaucoup" qanday maʼnoni bildiradi?',
        options: ['Katta rahmat', 'Xush kelibsiz', 'Kechirasiz', 'Xayr'],
        correctIndex: 0,
        explanation: '"Merci beaucoup" — Katta rahmat, minnatdorman.'
      }
    ]
  },

  // 6. Nemis Tili
  {
    id: 'test-languages-german',
    title: 'Nemis Tili: Goethe-Zertifikat va TestDaF',
    subject: 'Nemis Tili',
    category: 'languages',
    questionsCount: 5,
    durationMinutes: 6,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'de-1',
        question: 'Nemis tilida "Buch" (kitob) soʻzining toʻgʻri artikli qaysi?',
        options: ['das Buch', 'der Buch', 'die Buch', 'den Buch'],
        correctIndex: 0,
        explanation: 'Buch soʻzi oʻrta jinsga (Neutrum) mansub: das Buch.'
      },
      {
        id: 'de-2',
        question: 'Darak gapda (Hauptsatz) tuslangan feʼl har doim nechanchi oʻrinda turadi?',
        options: ['2-oʻrinda', '1-oʻrinda', 'Eng oxirida', 'Ixtiyoriy oʻrinda'],
        correctIndex: 0,
        explanation: 'Nemis tili grammatikasining qatʼiy qoidasi: darak gapda tuslangan feʼl doimo 2-pozitsiyada boʻladi.'
      },
      {
        id: 'de-3',
        question: 'Akkusativ kelishigida qaysi artikl shakli oʻzgaradi?',
        options: ['der -> den', 'die -> der', 'das -> dem', 'die -> den'],
        correctIndex: 0,
        explanation: 'Akkusativ (tushum) kelishigida faqat Maskulinum "der" artikli "den" ga oʻzgaradi.'
      },
      {
        id: 'de-4',
        question: '"Ich möchte einen Kaffee trinken" gapida "möchte" nimani ifodalaydi?',
        options: ['Xohish, istak (Men kofe ichishni istayman)', 'Qatʼiy buyruq', 'Taqiq', 'Oʻtgan zamon voqeasi'],
        correctIndex: 0,
        explanation: '"Möchte" — xushmuomala istak va xohishni ifodalaydi (Konjunktiv II).'
      },
      {
        id: 'de-5',
        question: 'Nemis tilida "Guten Morgen" nimani anglatadi?',
        options: ['Xayrli tong', 'Xayrli tun', 'Xush kelibsiz', 'Salomat boʻling'],
        correctIndex: 0,
        explanation: '"Guten Morgen" — Xayrli tong.'
      }
    ]
  },

  // 7. IT Frontend Dasturlash
  {
    id: 'test-it-frontend',
    title: 'IT & Dasturlash: Frontend (React & TypeScript)',
    subject: 'IT Dasturlash',
    category: 'it',
    questionsCount: 6,
    durationMinutes: 8,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'fe-1',
        question: 'React da komponent qayta render boʻlishiga nima sabab boʻladi?',
        options: [
          'State yoki Props qiymatining oʻzgarishi',
          'Faqat sahifani yangilash (F5)',
          'Oddiy JavaScript let oʻzgaruvchisi qiymati oʻzgarishi',
          'Faqat CSS faylning tahrirlanishi'
        ],
        correctIndex: 0,
        explanation: 'React da useState orqali saqlangan State yoki tashqaridan uzatilgan Props yangilanganda komponent qayta render qilinadi.'
      },
      {
        id: 'fe-2',
        question: 'JavaScript da `typeof null` qanday qiymat qaytaradi?',
        options: ['"object"', '"null"', '"undefined"', '"number"'],
        correctIndex: 0,
        explanation: 'JavaScript ning tarixiy xatosi sababli `typeof null === "object"` hisoblanadi.'
      },
      {
        id: 'fe-3',
        question: 'React da useEffect ichida boʻsh dependency massivi `[]` berilsa nima sodir boʻladi?',
        options: [
          'Effect faqat bir marta — komponent ilk mount boʻlganda bajariladi',
          'Effect har bir render da uzluksiz takrorlanadi',
          'Effect umuman bajarilmaydi',
          'Xatolik (Syntax Error) yuz beradi'
        ],
        correctIndex: 0,
        explanation: 'Boʻsh `[]` massivi hech qanday oʻzgaruvchiga bogʻliq emasligini bildiradi va faqat komponent ilk ochilganda ishga tushadi.'
      },
      {
        id: 'fe-4',
        question: 'Tailwind CSS da elementni toʻliq gorizontal va vertikal markazlashtirish:',
        options: ['flex items-center justify-center', 'text-align: center', 'display-center', 'margin: auto 0'],
        correctIndex: 0,
        explanation: '"flex items-center justify-center" Flexbox orqali bolalarni ikki oʻq boʻyicha markazlashtiradi.'
      },
      {
        id: 'fe-5',
        question: 'TypeScript da `readonly` kalit soʻzi nima vazifani bajaradi?',
        options: [
          'Xususiyat qiymati obyekt yaratilgandan soʻng qayta oʻzgartirilmasligini taʼminlaydi',
          'Obyektni maxfiy (private) qiladi',
          'Faqat raqamli qiymatlarni qabul qilishga ruxsat beradi',
          'Funksiyani avtomatik ishga tushiradi'
        ],
        correctIndex: 0,
        explanation: 'TypeScript `readonly` modifikatori massiv yoki obyekt xususiyatining immutable (oʻzgarmas) boʻlishini kafolatlaydi.'
      },
      {
        id: 'fe-6',
        question: 'Asinxron funksiyada API dan maʼlumot kutib olish uchun qaysi sintaksis qoʻllanadi?',
        options: ['const res = await fetch(url)', 'const res = wait fetch(url)', 'const res = fetch.sync(url)', 'const res = promise(url)'],
        correctIndex: 0,
        explanation: 'ES8 standarti boʻyicha async funksiyalar ichida `await` operatori ishlatiladi.'
      }
    ]
  },

  // 8. Python & AI
  {
    id: 'test-it-python-ai',
    title: 'IT & Python: Sunʼiy Intellekt va Data Science',
    subject: 'IT Sunʼiy Intellekt',
    category: 'it',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'py-1',
        question: 'Pythonda roʻyxatdagi elementlarni kvadratga oshirishning eng optimal usuli (List comprehension):',
        options: [
          '[x**2 for x in numbers]',
          'numbers.map(x => x^2)',
          'for x in numbers: x**2',
          'numbers ** 2'
        ],
        correctIndex: 0,
        explanation: 'Python List Comprehension sintaksisi: [expression for item in iterable].'
      },
      {
        id: 'py-2',
        question: 'Data Science da maʼlumotlar toʻplamidagi yetishmayotgan (NaN) qiymatlarni tozalash funksiyasi qaysi?',
        options: ['df.dropna() yoki df.fillna()', 'df.delete_empty()', 'df.clear_null()', 'df.remove()'],
        correctIndex: 0,
        explanation: 'Pandas da `dropna()` qatorlarni oʻchiradi, `fillna()` esa ularni oʻrtacha yoki koʻrsatilgan qiymat bilan toʻldiradi.'
      },
      {
        id: 'py-3',
        question: 'Neyron tarmoqlarda "Activation Function" (Faollashtirish funksiyasi, masalan ReLU) vazifasi nima?',
        options: [
          'Modelga nochiziqlilik (non-linearity) xususiyatini berish',
          'Faqat maʼlumotlarni diskda saqlash',
          'Kompyuter fanini sovitish',
          'Barcha ogʻirliklarni nolga tenglashtirish'
        ],
        correctIndex: 0,
        explanation: 'Faollashtirish funksiyalari (ReLU, Sigmoid) neyron tarmoqqa murakkab nochiziqli bogʻliqliklarni oʻrganish imkonini beradi.'
      },
      {
        id: 'py-4',
        question: 'Katta Til Modellari (LLM) bilan ishlashda "Prompt Engineering" nimani anglatadi?',
        options: [
          'Modelga aniq, tushunarli va samarali buyruqlar yozish mahorati',
          'Kompilyator kodini qayta yozish',
          'Grafik protsessorni (GPU) sozlash',
          'SQL maʼlumotlar bazasini oʻchirish'
        ],
        correctIndex: 0,
        explanation: 'Prompt Engineering — AI modelidan eng sifatli natijani olish uchun soʻrovlarni professional tarzda shakllantirishdir.'
      },
      {
        id: 'py-5',
        question: 'K-Means algoritmi Machine Learningning qaysi turiga kiradi?',
        options: ['Unsupervised Learning (Oʻqituvchisiz oʻrganish)', 'Supervised Learning', 'Reinforcement Learning', 'Deep Q-Learning'],
        correctIndex: 0,
        explanation: 'K-Means klasterlash algoritmi belgilarsiz (unlabeled) maʼlumotlarni guruhlarga ajratadi, yaʼni Unsupervised Learning.'
      }
    ]
  },

  // 9. IT Backend Node.js
  {
    id: 'test-it-backend',
    title: 'IT Backend: Node.js, Express va PostgreSQL',
    subject: 'IT Backend',
    category: 'it',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'be-1',
        question: 'Node.js ning asosiy arxitektura xususiyati nimada?',
        options: [
          'Single-threaded, non-blocking asynchronous event-driven I/O',
          'Multi-threaded sinxron kompilyatsiya',
          'Faqat brauzer ichida ishlash',
          'Faqat relyatsion bazalar bilan cheklanganlik'
        ],
        correctIndex: 0,
        explanation: 'Node.js V8 dvigatelida ishlaydigan bitta oqimli, asinxron hodisalarga asoslangan arxitekturaga ega.'
      },
      {
        id: 'be-2',
        question: 'PostgreSQL da ikki jadvalni umumiy kalit boʻyicha birlashtirish buyrugʻi:',
        options: ['SELECT * FROM users JOIN orders ON users.id = orders.user_id', 'MERGE users WITH orders', 'CONNECT users, orders', 'ATTACH orders TO users'],
        correctIndex: 0,
        explanation: 'SQL da jadvallarni bogʻlash uchun JOIN ... ON operatori ishlatiladi.'
      },
      {
        id: 'be-3',
        question: 'Express.js da Middleware funksiyasining 3 ta standart parametri nimalardan iborat?',
        options: ['(req, res, next)', '(request, response, stop)', '(ctx, send, callback)', '(event, dispatch, emit)'],
        correctIndex: 0,
        explanation: 'Express middleware funksiyalari `req` (soʻrov), `res` (javob) va zanjirni davom ettiruvchi `next()` funksiyasini qabul qiladi.'
      },
      {
        id: 'be-4',
        question: 'Parollarni maʼlumotlar bazasida saqlashda eng xavfsiz usul qaysi?',
        options: ['Bcrypt yoki Argon2 bilan tuzlab (salt) xesh qilish', 'Oddiy ochiq matn (plaintext) koʻrinishida', 'Base64 ga oʻtkazish', 'MD5 xesh qilish'],
        correctIndex: 0,
        explanation: 'Bcrypt va Argon2 sekin ishlaydigan kuchli kriptografik xesh algoritmlari boʻlib, parollarni xavfsiz himoyalaydi.'
      },
      {
        id: 'be-5',
        question: 'HTTP status kodlarida 404 nimani bildiradi?',
        options: ['Not Found (Soʻralgan resurs topilmadi)', 'Internal Server Error', 'Unauthorized', 'OK (Muvaffaqiyatli)'],
        correctIndex: 0,
        explanation: '404 kodi soʻralgan manzil yoki resurs serverda mavjud emasligini bildiradi.'
      }
    ]
  },

  // 10. Kiberxavfsizlik
  {
    id: 'test-it-cyber',
    title: 'Kiberxavfsizlik: Axborot Xavfsizligi va Tarmoq Himoyasi',
    subject: 'Kiberxavfsizlik',
    category: 'it',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Murakkab',
    questions: [
      {
        id: 'cy-1',
        question: 'TCP uch tomonlama bogʻlanish (Three-Way Handshake) bosqichlari tartibi qaysi?',
        options: ['SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> FIN', 'PING -> PONG -> CONNECT', 'HELLO -> READY -> OK'],
        correctIndex: 0,
        explanation: 'TCP protokoli ishonchli ulanish oʻrnatish uchun SYN, SYN-ACK, ACK ketma-ketligidan foydalanadi.'
      },
      {
        id: 'cy-2',
        question: 'Foydalanuvchini soxta havolalar yoki soxta xatlar orqali aldash hujumi qanday ataladi?',
        options: ['Fishing (Phishing)', 'DDoS', 'Buffer Overflow', 'Ransomware'],
        correctIndex: 0,
        explanation: 'Fishing — ijtimoiy muhandislik yordamida maxfiy login va parollarni qoʻlga kiritishga qaratilgan hujum.'
      },
      {
        id: 'cy-3',
        question: 'HTTPS protokoli maʼlumotlar almashinuvini qaysi protokol orqali shifrlaydi?',
        options: ['TLS / SSL', 'FTP', 'Telnet', 'SNMP'],
        correctIndex: 0,
        explanation: 'HTTPS trafigi Transport Layer Security (TLS) protokoli yordamida uchdan-uchga shifrlanadi.'
      },
      {
        id: 'cy-4',
        question: 'Kriptografiyada ommaviy kalit (Public key) va shaxsiy kalit (Private key) dan foydalanuvchi tizim:',
        options: ['Asimmetrik shifrlash (Asymmetric cryptography)', 'Simmetrik shifrlash', 'Sezar shifri', 'Bir martalik bloknot'],
        correctIndex: 0,
        explanation: 'Asimmetrik shifrlashda (masalan RSA, ECC) ochiq kalit shifrlash uchun, yopiq kalit esa deshifrlash uchun xizmat qiladi.'
      },
      {
        id: 'cy-5',
        question: 'Port 443 standart boʻyicha qaysi xizmat uchun ajratilgan?',
        options: ['HTTPS xavfsiz veb trafigi', 'HTTP ochiq veb trafigi (80)', 'SSH (22)', 'DNS (53)'],
        correctIndex: 0,
        explanation: 'Port 443 — xavfsiz veb aloqasi (HTTPS) uchun xalqaro standart portdir.'
      }
    ]
  },

  // 11. Matematika
  {
    id: 'test-exact-math',
    title: 'Matematika: Algebra, Geometriya & Milliy Sertifikat',
    subject: 'Matematika',
    category: 'exact_sciences',
    questionsCount: 6,
    durationMinutes: 8,
    difficulty: 'Murakkab',
    questions: [
      {
        id: 'm-1',
        question: 'Agar x² - 7x + 12 = 0 boʻlsa, ildizlari koʻpaytmasi nimaga teng?',
        options: ['12', '7', '-12', '-7'],
        correctIndex: 0,
        explanation: 'Viyet teoremasiga koʻra: x₁ * x₂ = c/a = 12/1 = 12.'
      },
      {
        id: 'm-2',
        question: 'sin²(α) + cos²(α) ifodaning qiymati har doim nimaga teng?',
        options: ['1', '0', '2', 'tg(α)'],
        correctIndex: 0,
        explanation: 'Asosiy trigonometrik ayniyat: barcha α burchaklar uchun sin²(α) + cos²(α) = 1.'
      },
      {
        id: 'm-3',
        question: 'f(x) = 3x² - 5x + 4 funksiyaning x = 2 nuqtadagi hosilasi f\'(2) qiymatini toping:',
        options: ['7', '6', '12', '4'],
        correctIndex: 0,
        explanation: 'f\'(x) = 6x - 5. Demak, f\'(2) = 6(2) - 5 = 12 - 5 = 7.'
      },
      {
        id: 'm-4',
        question: 'Radiusi R = 6 sm boʻlgan doiraning yuzasi qancha? (S = πR²)',
        options: ['36π sm²', '12π sm²', '18π sm²', '72π sm²'],
        correctIndex: 0,
        explanation: 'Doira yuzasi formulasi: S = π * R² = π * 6² = 36π sm².'
      },
      {
        id: 'm-5',
        question: 'Bir qutida 3 ta oq va 7 ta qora shar bor. Tavakkaliga olingan 1 ta sharning oq boʻlish ehtimoli qancha?',
        options: ['0.3 (3/10)', '0.7 (7/10)', '0.5 (1/2)', '0.2 (1/5)'],
        correctIndex: 0,
        explanation: 'P = m / n = 3 / (3 + 7) = 3 / 10 = 0.3.'
      },
      {
        id: 'm-6',
        question: 'Pifagor teoremasiga koʻra toʻgʻri burchakli uchburchakda katetlar 3 va 4 boʻlsa, gipotenuza uzunligi qancha?',
        options: ['5', '6', '7', '8'],
        correctIndex: 0,
        explanation: 'c² = a² + b² = 3² + 4² = 9 + 16 = 25 => c = 5.'
      }
    ]
  },

  // 12. Fizika
  {
    id: 'test-exact-physics',
    title: 'Fizika: Mexanika, Elektrodinamika & Optika',
    subject: 'Fizika',
    category: 'exact_sciences',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Murakkab',
    questions: [
      {
        id: 'ph-1',
        question: 'Massasi 2 kg boʻlgan jismga 10 N kuch taʼsir etsa, uning tezlanishi qancha boʻladi?',
        options: ['5 m/s²', '20 m/s²', '2 m/s²', '0.2 m/s²'],
        correctIndex: 0,
        explanation: 'Nyutonning ikkinchi qonuni: a = F / m = 10 N / 2 kg = 5 m/s².'
      },
      {
        id: 'ph-2',
        question: 'Erkin tushish tezlanishi g ning Yer yuzidagi oʻrtacha qabul qilingan qiymati qancha?',
        options: ['9.8 m/s²', '3.14 m/s²', '12.5 m/s²', '100 m/s²'],
        correctIndex: 0,
        explanation: 'Yer yuzida gravitatsion tezlanish taqriban 9.8 m/s² ga teng.'
      },
      {
        id: 'ph-3',
        question: 'Qarshiligi 10 Om boʻlgan oʻtkazgichdan 2 A tok oʻtmoqda. Oʻtkazgich uchlaridagi kuchlanishni toping:',
        options: ['20 V', '5 V', '12 V', '0.2 V'],
        correctIndex: 0,
        explanation: 'Om qonuniga koʻra: U = I * R = 2 A * 10 Om = 20 V.'
      },
      {
        id: 'ph-4',
        question: 'Yorugʻlikning vakuumdagi tarqalish tezligi qanchaga teng?',
        options: ['300 000 km/s (3 * 10⁸ m/s)', '150 000 km/s', '340 m/s', '1 000 km/s'],
        correctIndex: 0,
        explanation: 'Yorugʻlik tezligi c ≈ 3 * 10⁸ m/s yoki 300 000 km/s.'
      },
      {
        id: 'ph-5',
        question: 'Jismning potensial energiyasi qaysi formula bilan hisoblanadi?',
        options: ['E_p = m * g * h', 'E_k = (m * v²) / 2', 'A = F * s', 'P = I * U'],
        correctIndex: 0,
        explanation: 'Yer tortishish maydonidagi potensial energiya E_p = mgh.'
      }
    ]
  },

  // 13. Kimyo
  {
    id: 'test-natural-chemistry',
    title: 'Kimyo: Organik va Noorganik Kimyo',
    subject: 'Kimyo',
    category: 'natural_sciences',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'ch-1',
        question: 'Mendeleyev davriy jadvalida tartib raqami nimani ifodalaydi?',
        options: ['Yadrodagi protonlar sonini', 'Neytronlar sonini', 'Molekula ogʻirligini', 'Valentlik sonini'],
        correctIndex: 0,
        explanation: 'Elementning tartib raqami uning yadrosidagi musbat protonlar soniga teng.'
      },
      {
        id: 'ch-2',
        question: 'Suv (H₂O) molekulasidagi vodorod va kislorod oʻrtasidagi kimyoviy bogʻlanish turi qaysi?',
        options: ['Kovalent qutbli bogʻlanish', 'Ionli bogʻlanish', 'Metall bogʻlanish', 'Kovalent qutbsiz bogʻlanish'],
        correctIndex: 0,
        explanation: 'Elektrmanfiyligi har xil boʻlgan nometall atomlari oʻrtasida kovalent qutbli bogʻlanish hosil boʻladi.'
      },
      {
        id: 'ch-3',
        question: 'Neytrallanish reaksiyasi mahsuloti nimalardan iborat?',
        options: ['Tuz va Suv', 'Kislota va Gaz', 'Asos va Choʻkma', 'Oksid va Vodorod'],
        correctIndex: 0,
        explanation: 'Kislota va asos oʻzaro taʼsirlashganda tuz va suv hosil boʻladi: HCl + NaOH -> NaCl + H₂O.'
      },
      {
        id: 'ch-4',
        question: 'Etanolning (tibbiyot spirtining) kimyoviy formulasi qaysi?',
        options: ['C₂H₅OH', 'CH₃OH', 'CH₃COOH', 'C₆H₁₂O₆'],
        correctIndex: 0,
        explanation: 'Bir atomli toʻyingan spirt etanol formulasi C₂H₅OH.'
      },
      {
        id: 'ch-5',
        question: 'Osh tuzi qanday kimyoviy birikma hisoblanadi?',
        options: ['Natriy xlorid (NaCl)', 'Kalsiy karbonat (CaCO₃)', 'Kaliy gidroksid (KOH)', 'Sulfat kislota (H₂SO₄)'],
        correctIndex: 0,
        explanation: 'Osh tuzi — natriy va xlor atomlaridan iborat ionli birikma (NaCl).'
      }
    ]
  },

  // 14. Biologiya
  {
    id: 'test-natural-biology',
    title: 'Biologiya: Genetika, Sitologiya va Anatomiya',
    subject: 'Biologiya',
    category: 'natural_sciences',
    questionsCount: 5,
    durationMinutes: 6,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'bio-1',
        question: 'Oʻsimlik hujayrasini hayvon hujayrasidan ajratib turuvchi asosiy belgi nima?',
        options: [
          'SelLyuloza qobigʻi va xloroplastlarning mavjudligi',
          'Yadroning yoʻqligi',
          'Mitoxondriyaga ega boʻlmasligi',
          'Hujayra membranasining yoʻqligi'
        ],
        correctIndex: 0,
        explanation: 'Oʻsimlik hujayralari fotosintez qiluvchi xloroplastlarga va mustahkam sellyuloza devoriga ega.'
      },
      {
        id: 'bio-2',
        question: 'Odam organizmida qon guruhlari tizimi qaysi omil boʻyicha aniqlanadi?',
        options: ['AB0 va Rezus (Rh) omili', 'Leykotsitlar shakli', 'Gemoglobin ogʻirligi', 'Trombotsitlar soni'],
        correctIndex: 0,
        explanation: 'Qon guruhlari eritrotsitlar yuzasidagi A va B agglutinogenlar hamda plazmadagi agglutininlar (AB0) boʻyicha 4 guruhga boʻlinadi.'
      },
      {
        id: 'bio-3',
        question: 'Irsiyat qonuniyatlariga asos solgan olim kim?',
        options: ['Gregor Mendel', 'Charlz Darvin', 'Lui Paster', 'Robert Guk'],
        correctIndex: 0,
        explanation: 'Gregor Mendel 1865-yilda noʻxatlarda oʻtkazgan tajribalari bilan genetika qonuniyatlarini kashf etgan.'
      },
      {
        id: 'bio-4',
        question: 'Inson skeletida harakatchan birikkan suyaklar birikmasi nima deb ataladi?',
        options: ['Boʻgʻim (Joint)', 'Chok', 'Pay', 'Paycha'],
        correctIndex: 0,
        explanation: 'Suyaklarning erkin harakatlanishini taʼminlovchi birikmasi boʻgʻim deb ataladi.'
      },
      {
        id: 'bio-5',
        question: 'Fotosintez jarayonida oʻsimliklar nima chiqaradi?',
        options: ['Kislorod (O₂)', 'Karbonat angidrid (CO₂)', 'Azot (N₂)', 'Vodorod sulfid'],
        correctIndex: 0,
        explanation: 'Fotosintezda yorugʻlik energiyasi yordamida suv va CO₂ dan glyukoza sintezlanadi va kislorod ajralib chiqadi.'
      }
    ]
  },

  // 15. Geografiya
  {
    id: 'test-natural-geography',
    title: 'Geografiya: Jahon Materiklari va Xaritalar',
    subject: 'Geografiya',
    category: 'natural_sciences',
    questionsCount: 5,
    durationMinutes: 6,
    difficulty: 'Oson',
    questions: [
      {
        id: 'geo-1',
        question: 'Dunyodagi eng chuqur chuchuk suvli koʻl qaysi?',
        options: ['Baykal koʻli', 'Kaspiy dengizi', 'Viktoriya koʻli', 'Tanganika'],
        correctIndex: 0,
        explanation: 'Baykal koʻli 1642 metr chuqurlik bilan Yer yuzidagi eng chuqur va toza koʻldir.'
      },
      {
        id: 'geo-2',
        question: 'Yer sharining ekvator chizigʻi uzunligi taxminan qancha?',
        options: ['40 075 km', '20 000 km', '6371 km', '100 000 km'],
        correctIndex: 0,
        explanation: 'Yer ekvatori aylanasi uzunligi taxminan 40 075 kilometrga teng.'
      },
      {
        id: 'geo-3',
        question: 'Oʻzbekiston qaysi dengizga toʻgʻridan-toʻgʻri chiqish yoʻliga ega emas?',
        options: ['Dunyo okeaniga (Double landlocked davlat)', 'Orol dengiziga', 'Kaspiyga', 'Qora dengizga'],
        correctIndex: 0,
        explanation: 'Oʻzbekiston va Lixtenshteyn — dunyodagi oʻzi ham, unga qoʻshni barcha davlatlar ham ochiq okeanga chiqa olmaydigan yagona 2 ta davlatdir.'
      },
      {
        id: 'geo-4',
        question: 'Yer yuzidagi eng baland togʻ choʻqqisi qaysi?',
        options: ['Jomolungma (Everest - 8848 m)', 'K2 (Chogori)', 'Elbrus', 'Monblan'],
        correctIndex: 0,
        explanation: 'Himolay togʻlaridagi Everest (Jomolungma) 8848 metr balandlik bilan eng baland nuqtadir.'
      },
      {
        id: 'geo-5',
        question: 'Afrikaning eng uzun daryosi qaysi?',
        options: ['Nil daryosi', 'Kongo', 'Niger', 'Zambezi'],
        correctIndex: 0,
        explanation: 'Nil daryosi uzunligi 6650 km boʻlib, qitʼaning eng ulugʻvor daryosidir.'
      }
    ]
  },

  // 16. Tarix
  {
    id: 'test-humanities-history',
    title: 'Tarix: Oʻzbekiston va Jahon Madaniyatlari',
    subject: 'Tarix',
    category: 'humanities',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'hist-1',
        question: 'Amir Temur qaysi yilda markazlashgan davlatga asos solgan?',
        options: ['1370-yil', '1336-yil', '1405-yil', '1380-yil'],
        correctIndex: 0,
        explanation: '1370-yil Balx qurultoyida Amir Temur Movarounnahrning yagona hukmdori deb eʼlon qilingan.'
      },
      {
        id: 'hist-2',
        question: 'Mirzo Ulugʻbek tomonidan Samarqandda qurilgan rasadxonada qanday mashhur asar yaratilgan?',
        options: ['Ziji Jadidi Koʻragoniy (Yulduzlar jadvali)', 'Boburnoma', 'Temur tuzuklari', 'Tarixi Rashidiy'],
        correctIndex: 0,
        explanation: 'Ulugʻbek 1018 ta yulduzning aniq koordinatasini oʻz ichiga olgan "Ziji Koʻragoniy" astronomik katalogini tuzgan.'
      },
      {
        id: 'hist-3',
        question: 'Zahiriddin Muhammad Bobur qaysi sulolaga asos solgan?',
        options: ['Boburiylar (Buyuk Moʻgʻullar) imperiyasi', 'Somoniylar', 'Gʻaznaviylar', 'Saljuqiylar'],
        correctIndex: 0,
        explanation: '1526-yilda Bobur Hindistonda 300 yildan ortiq hukm surgan buyuk Boburiylar davlatiga asos solgan.'
      },
      {
        id: 'hist-4',
        question: 'Oʻzbekiston Respublikasi Davlat Mustaqilligi qachon eʼlon qilingan?',
        options: ['1991-yil 31-avgust', '1990-yil 20-iyun', '1992-yil 8-dekabr', '1991-yil 1-sentyabr'],
        correctIndex: 0,
        explanation: '1991-yil 31-avgustda Oliy Kengashning navbatdan tashqari sessiyasida Oʻzbekiston mustaqilligi tantanali eʼlon qilingan.'
      },
      {
        id: 'hist-5',
        question: 'Qadimgi Dunyo moʻjizalaridan biri hisoblangan Misr ehromlarining eng kattasi qaysi?',
        options: ['Xeofis (Xufu) ehromi', 'Xafra ehromi', 'Mikerin ehromi', 'Joser ehromi'],
        correctIndex: 0,
        explanation: 'Giza vodiysidagi eng ulugʻvor ehrom Firʼavn Xeops (Xufu) ga tegishli.'
      }
    ]
  },

  // 17. Ona Tili va Adabiyot
  {
    id: 'test-humanities-uzbek',
    title: 'Ona Tili va Adabiyot: Sintaksis va Mumtoz Meros',
    subject: 'Ona Tili & Adabiyot',
    category: 'humanities',
    questionsCount: 5,
    durationMinutes: 7,
    difficulty: 'Oʻrta',
    questions: [
      {
        id: 'uz-1',
        question: 'Alisher Navoiy turkiy tilda yaratgan besh doston toʻplami nima deb ataladi?',
        options: ['Xamsa', 'Xazoyinul-maoniy', 'Muhokamatul-lugʻatayn', 'Lisonut-tayr'],
        correctIndex: 0,
        explanation: 'Navoiy 1483-1485 yillarda turkiy tilda ilk bor muazzam "Xamsa" (Beshlik) dostonlarini yaratgan.'
      },
      {
        id: 'uz-2',
        question: 'Quyidagi gapda qaysi tinish belgisi tushirib qoldirilgan: "Kitob bilim manbai."',
        options: ['Tire (-) belgisi', 'Vergul (,)', 'Nuqtali vergul (;)', 'Qoʻshtirnoq'],
        correctIndex: 0,
        explanation: 'Ega va kesim ikkalasi ham ot bilan ifodalanganda va bogʻlama boʻlmaganda tire qoʻyiladi: "Kitob — bilim manbai."'
      },
      {
        id: 'uz-3',
        question: 'Oʻzbek tilidagi qaysi soʻz turkumi harakat va holatni ifodalaydi?',
        options: ['Feʼl', 'Ot', 'Sifat', 'Ravish'],
        correctIndex: 0,
        explanation: 'Nima qildi? nima qilyapti? soʻroqlariga javob beruvchi mustaqil soʻz turkumi feʼldir.'
      },
      {
        id: 'uz-4',
        question: 'Oʻzbek milliy romanchiligining asoschisi va "Oʻtkan kunlar" romani muallifi kim?',
        options: ['Abdulla Qodiriy', 'Choʻlpon', 'Oybek', 'Gʻafur Gʻulom'],
        correctIndex: 0,
        explanation: 'Abdulla Qodiriy 1922-yilda oʻzbek adabiyotidagi ilk roman — "Oʻtkan kunlar"ni yozgan.'
      },
      {
        id: 'uz-5',
        question: 'Aruz vaznida qisqa va choʻziq boʻgʻinlarning qatʼiy tartibda almashinib kelishi nima deb ataladi?',
        options: ['Rukn va Taqtiʼ', 'Qofiya', 'Radif', 'Tazod'],
        correctIndex: 0,
        explanation: 'Aruz sheʼr tizimida hijolarning oʻlchovi boʻyicha turoqlanishi rukn va taqtiʼ deb ataladi.'
      }
    ]
  }
];
