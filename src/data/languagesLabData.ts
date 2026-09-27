import { LanguageType, VocabularyItem } from '../types';
import { englishVocab } from './vocab/englishVocab';
import { russianVocab } from './vocab/russianVocab';
import { frenchVocab } from './vocab/frenchVocab';
import { germanVocab } from './vocab/germanVocab';


export interface LanguageInfo {
  id: LanguageType;
  title: string;
  nativeTitle: string;
  flag: string;
  speechCode: string;
  description: string;
  activeLearners: string;
  popularTopics: string[];
}

export const LANGUAGES_INFO: Record<LanguageType, LanguageInfo> = {
  english: {
    id: 'english',
    title: 'Ingliz Tili',
    nativeTitle: 'English Language',
    flag: '🇬🇧',
    speechCode: 'en-US',
    description: 'Xalqaro muloqot, IELTS, biznes, IT va global taʼlim tili.',
    activeLearners: '8,400+ talaba',
    popularTopics: ['IELTS Speaking 7.5+', 'Academic Writing', 'Business English', 'Daily Conversation']
  },
  russian: {
    id: 'russian',
    title: 'Rus Tili',
    nativeTitle: 'Русский язык',
    flag: '🇷🇺',
    speechCode: 'ru-RU',
    description: 'MDH hududida erkin soʻzlashuv, oliy taʼlim, savdo va ishbilarmonlik tili.',
    activeLearners: '6,200+ talaba',
    popularTopics: ['Разговорная речь', '6 та падеж', 'Деловая переписка', 'ТРКИ сертификация']
  },
  french: {
    id: 'french',
    title: 'Fransuz Tili',
    nativeTitle: 'Langue Française',
    flag: '🇫🇷',
    speechCode: 'fr-FR',
    description: 'Diplomatiya, Yevropa Ittifoqi, moda, madaniyat va sayohat tili.',
    activeLearners: '2,800+ talaba',
    popularTopics: ['Prononciation & R', 'DELF A1-B2', 'Voyage en France', 'Grammaire facile']
  },
  german: {
    id: 'german',
    title: 'Nemis Tili',
    nativeTitle: 'Deutsche Sprache',
    flag: '🇩🇪',
    speechCode: 'de-DE',
    description: 'Germaniyada bepul oliy taʼlim (DAAD), Ausbildung va muhandislik tili.',
    activeLearners: '3,900+ talaba',
    popularTopics: ['Goethe A1-B2', 'Satzbau & Grammatik', 'TestDaF tayyorgarlik', 'Ausbildung nemis tili']
  }
};

export const VOCABULARY_LIST: VocabularyItem[] = [
  ...englishVocab,
  ...russianVocab,
  ...frenchVocab,
  ...germanVocab
];

export interface LanguagePhrase {
  id: string;
  language: LanguageType;
  category: 'Muloqot' | 'Sayohat' | 'Restoran & Xarid' | 'Taʼlim' | 'Ish & Biznes' | 'Kundalik';
  nativePhrase: string;
  transcription: string;
  translation: string;
}

export const LANGUAGE_PHRASES: LanguagePhrase[] = [
  // ==========================================
  // INGLIZ TILI (20 ta jonli ibora)
  // ==========================================
  {
    id: 'en-p1',
    language: 'english',
    category: 'Muloqot',
    nativePhrase: 'Could you please elaborate on that point?',
    transcription: '/kʊd juː pliːz ɪˈlæb.ə.reɪt ɒn ðæt pɔɪnt/',
    translation: 'Iltimos, shu fikrni biroz kengroq tushuntirib bera olasizmi?'
  },
  {
    id: 'en-p2',
    language: 'english',
    category: 'Muloqot',
    nativePhrase: 'It is a real pleasure to meet you in person.',
    transcription: '/ɪt ɪz ə rɪəl ˈpleʒ.ər tuː miːt juː ɪn ˈpɜː.sən/',
    translation: 'Siz bilan yuzma-yuz uchrashganimdan juda mamnunman.'
  },
  {
    id: 'en-p3',
    language: 'english',
    category: 'Taʼlim',
    nativePhrase: 'I am preparing for the academic IELTS exam with great dedication.',
    transcription: '/aɪ æm prɪˈpeə.rɪŋ fɔː ðə æk.əˈdem.ɪk aɪ.elts ɪɡˈzæm/',
    translation: 'Men katta ishtiyoq bilan akademik IELTS imtihoniga tayyorlanyapman.'
  },
  {
    id: 'en-p4',
    language: 'english',
    category: 'Taʼlim',
    nativePhrase: 'Could you recommend some reliable sources for my scientific research?',
    transcription: '/kʊd juː ˌrek.əˈmend sʌm rɪˈlaɪ.ə.bəl ˈsɔː.sɪz/',
    translation: 'Ilmiy tadqiqotim uchun bir nechta ishonchli manbalarni tavsiya qila olasizmi?'
  },
  {
    id: 'en-p5',
    language: 'english',
    category: 'Sayohat',
    nativePhrase: 'Excuse me, which terminal does the flight to London Heathrow depart from?',
    transcription: '/ɪkˈskjuːz miː, wɪtʃ ˈtɜː.mɪ.nəl dʌz ðə flaɪt dɪˈpɑːt/',
    translation: 'Kechirasiz, London Hitrouga uchadigan reys qaysi terminaldan joʻnaydi?'
  },
  {
    id: 'en-p6',
    language: 'english',
    category: 'Sayohat',
    nativePhrase: 'Could you help me with my luggage, please?',
    transcription: '/kʊd juː help miː wɪð maɪ ˈlʌɡ.ɪdʒ pliːz/',
    translation: 'Iltimos, yuklarimni olishga yordam berib yubora olasizmi?'
  },
  {
    id: 'en-p7',
    language: 'english',
    category: 'Restoran & Xarid',
    nativePhrase: 'Could we have the bill, please? We would like to pay by credit card.',
    transcription: '/kʊd wiː hæv ðə bɪl pliːz? wiː wʊd laɪk tuː peɪ/',
    translation: 'Hisobni olib kela olasizmi? Biz bank kartasi bilan toʻlamoqchimiz.'
  },
  {
    id: 'en-p8',
    language: 'english',
    category: 'Restoran & Xarid',
    nativePhrase: 'What do you recommend as the chefʼs special dish for dinner tonight?',
    transcription: '/wɒt duː juː ˌrek.əˈmend æz ðə ʃefs ˈspeʃ.əl dɪʃ/',
    translation: 'Bugungi kechki ovqatga oshpazning qaysi maxsus taomini tavsiya qilasiz?'
  },
  {
    id: 'en-p9',
    language: 'english',
    category: 'Ish & Biznes',
    nativePhrase: 'We are looking forward to establishing a fruitful long-term partnership.',
    transcription: '/wiː ɑː ˈlʊk.ɪŋ ˈfɔː.wəd tuː ɪˈstæb.lɪʃ.ɪŋ ə ˈfruːt.fəl/',
    translation: 'Biz samarali va uzoq muddatli hamkorlik oʻrnatilishini intiqlik bilan kutamiz.'
  },
  {
    id: 'en-p10',
    language: 'english',
    category: 'Ish & Biznes',
    nativePhrase: 'Let us schedule a follow-up meeting for next Tuesday morning.',
    transcription: '/let ʌs ˈskedʒ.uːl ə ˈfɒl.əʊ.ʌp ˈmiː.tɪŋ fɔː nekst ˈtjuːz.deɪ/',
    translation: 'Keling, keyingi seshanba kuni ertalab navbatdagi uchrashuvni belgilaymiz.'
  },
  {
    id: 'en-p11',
    language: 'english',
    category: 'Muloqot',
    nativePhrase: 'As far as I am concerned, consistency is the ultimate key to success.',
    transcription: '/æz fɑːr æz aɪ æm kənˈsɜːnd, kənˈsɪs.tən.si ɪz ðə kiː/',
    translation: 'Mening fikrimcha, tizimlilik va davomiylik muvaffaqiyatning asosiy kalitidir.'
  },
  {
    id: 'en-p12',
    language: 'english',
    category: 'Kundalik',
    nativePhrase: 'Have a wonderful day ahead and take good care of yourself!',
    transcription: '/hæv ə ˈwʌn.də.fəl deɪ əˈhed ænd teɪk ɡʊd keər/',
    translation: 'Kuningiz ajoyib oʻtsin, oʻzingizni yaxshi ehtiyot qiling!'
  },
  {
    id: 'en-p13',
    language: 'english',
    category: 'Taʼlim',
    nativePhrase: 'Practice makes perfect, especially when mastering English pronunciation.',
    transcription: '/ˈpræk.tɪs meɪks ˈpɜː.fekt, ɪˈspeʃ.əl.i wɪð prəˌnʌn.siˈeɪ.ʃən/',
    translation: 'Mashq qilish mukammallikka olib keladi, ayniqsa inglizcha talaffuzda.'
  },
  {
    id: 'en-p14',
    language: 'english',
    category: 'Ish & Biznes',
    nativePhrase: 'I truly appreciate your prompt feedback on the draft project.',
    transcription: '/aɪ ˈtruː.li əˈpriː.ʃi.eɪt jɔː prɒmpt ˈfiːd.bæk/',
    translation: 'Loyiha qoralamasi boʻyicha tezkor javobingiz uchun chin dildan minnatdorman.'
  },
  {
    id: 'en-p15',
    language: 'english',
    category: 'Sayohat',
    nativePhrase: 'Where can I find the nearest currency exchange booth around here?',
    transcription: '/weər kæn aɪ faɪnd ðə ˈnɪə.rɪst ˈkʌr.ən.si ɪksˈtʃeɪndʒ/',
    translation: 'Bu yerga eng yaqin valyuta ayirboshlash shoxobchasini qayerdan topsam boʻladi?'
  },
  {
    id: 'en-p16',
    language: 'english',
    category: 'Muloqot',
    nativePhrase: 'I couldnʼt agree with you more on this crucial matter.',
    transcription: '/aɪ ˈkʊd.ənt əˈɡriː wɪð juː mɔːr ɒn ðɪs ˈkruː.ʃəl ˈmæt.ər/',
    translation: 'Ushbu muhim masala boʻyicha sizga yuz foiz toʻliq qoʻshilaman.'
  },
  {
    id: 'en-p17',
    language: 'english',
    category: 'Taʼlim',
    nativePhrase: 'The more you read authentic books, the more fluent your vocabulary becomes.',
    transcription: '/ðə mɔːr juː riːd, ðə mɔːr ˈfluː.ənt jɔː vəʊˈkæb.jə.lər.i/',
    translation: 'Qanchalik koʻp kitob oʻqisangiz, soʻz boyligingiz shunchalik ravon boʻladi.'
  },
  {
    id: 'en-p18',
    language: 'english',
    category: 'Restoran & Xarid',
    nativePhrase: 'Does this meal contain any nuts or dairy products?',
    transcription: '/dʌz ðɪs miːl kənˈteɪn ˈen.i nʌts ɔːr ˈdeə.ri ˈprɒd.ʌkts/',
    translation: 'Ushbu taomda yongʻoq yoki sut mahsulotlari bormi?'
  },
  {
    id: 'en-p19',
    language: 'english',
    category: 'Ish & Biznes',
    nativePhrase: 'Thank you for your valuable time and consideration during the interview.',
    transcription: '/θæŋk juː fɔː jɔː ˈvæl.jə.bəl taɪm ænd kənˌsɪd.əˈreɪ.ʃən/',
    translation: 'Suhbat davomida ajratgan qimmatli vaqtingiz va eʼtiboringiz uchun tashakkur.'
  },
  {
    id: 'en-p20',
    language: 'english',
    category: 'Kundalik',
    nativePhrase: 'It was fantastic catching up with you, letʼs stay in touch!',
    transcription: '/ɪt wɒz fænˈtæs.tɪk ˈkætʃ.ɪŋ ʌp wɪð juː, lets steɪ ɪn tʌtʃ/',
    translation: 'Siz bilan dildan suhbatlashganimdan xursandman, doimiy aloqada boʻlaylik!'
  },

  // ==========================================
  // RUS TILI (20 ta jonli ibora)
  // ==========================================
  {
    id: 'ru-p1',
    language: 'russian',
    category: 'Muloqot',
    nativePhrase: 'Будьте добры, подскажите дорогу к центральной библиотеке.',
    transcription: '[bood-tye dob-ry, pad-ska-zhee-tye da-ro-goo]',
    translation: 'Marhamat qilib, markaziy kutubxonaga boradigan yoʻlni koʻrsatib yubora olasizmi?'
  },
  {
    id: 'ru-p2',
    language: 'russian',
    category: 'Muloqot',
    nativePhrase: 'Мне очень приятно познакомиться с вами лично.',
    transcription: '[mnye o-chyen pree-yat-na paz-na-ko-meet-sya]',
    translation: 'Siz bilan shaxsan tanishganimdan juda ham xursandman.'
  },
  {
    id: 'ru-p3',
    language: 'russian',
    category: 'Ish & Biznes',
    nativePhrase: 'Мы готовы к долгосрочному и взаимовыгодному партнерству.',
    transcription: '[my ga-to-vy k dal-ga-sroch-na-moo part-nyor-stvoo]',
    translation: 'Biz uzoq muddatli va oʻzaro manfaatli hamkorlikka tayyormiz.'
  },
  {
    id: 'ru-p4',
    language: 'russian',
    category: 'Ish & Biznes',
    nativePhrase: 'Позвольте представить вам презентацию нашего нового проекта.',
    transcription: '[paz-vol-tye pred-sta-veet vam pre-zen-ta-tsee-yoo]',
    translation: 'Ruxsat etsangiz, sizga yangi loyihamiz taqdimotini tanishtirsam.'
  },
  {
    id: 'ru-p5',
    language: 'russian',
    category: 'Sayohat',
    nativePhrase: 'Скажите, пожалуйста, где находится камера хранения багажа?',
    transcription: '[ska-zhee-tye pa-zhal-oo-sta, gdye ka-mye-ra khra-nye-nee-ya]',
    translation: 'Aytib yubora olmaysizmi, yuk saqlash xonasi qayerda joylashgan?'
  },
  {
    id: 'ru-p6',
    language: 'russian',
    category: 'Sayohat',
    nativePhrase: 'Сколько времени займет поездка до аэропорта на экспрессе?',
    transcription: '[skol-ka vre-mye-nee zay-myot pa-yezd-ka da ae-ra-por-ta]',
    translation: 'Ekspress poyezdda aeroportgacha borish qancha vaqt oladi?'
  },
  {
    id: 'ru-p7',
    language: 'russian',
    category: 'Restoran & Xarid',
    nativePhrase: 'Будьте добры, принесите меню и стакан негазированной воды.',
    transcription: '[bood-tye dob-ry, pree-nye-see-tye me-nyoo ee sta-kan va-dy]',
    translation: 'Iltimos, taomnoma va bir stakan gazsiz suv olib kelsangiz.'
  },
  {
    id: 'ru-p8',
    language: 'russian',
    category: 'Restoran & Xarid',
    nativePhrase: 'Счет, пожалуйста! Подскажите, принимаете ли вы оплату картой?',
    transcription: '[schyot pa-zhal-oo-sta! pree-nee-ma-ye-tye li ap-la-too kar-toy]',
    translation: 'Hisobni bering, iltimos! Karta orqali toʻlov qilsa boʻladimi?'
  },
  {
    id: 'ru-p9',
    language: 'russian',
    category: 'Taʼlim',
    nativePhrase: 'Я готовлюсь к сдаче международного сертификационного теста ТРКИ.',
    transcription: '[ya ga-tov-lyus k sda-che tye-sta tr-kee]',
    translation: 'Men xalqaro TRKI rus tili sertifikat imtihoniga tayyorgarlik koʻryapman.'
  },
  {
    id: 'ru-p10',
    language: 'russian',
    category: 'Taʼlim',
    nativePhrase: 'Повторите, пожалуйста, это грамматическое правило еще раз.',
    transcription: '[pav-ta-ree-tye pa-zhal-oo-sta e-ta pra-vee-la]',
    translation: 'Iltimos, ushbu grammatik qoidani yana bir marta tushuntirib bering.'
  },
  {
    id: 'ru-p11',
    language: 'russian',
    category: 'Kundalik',
    nativePhrase: 'Желаю вам прекрасного дня и отличного бодрого настроения!',
    transcription: '[zhe-la-yoo vam prek-ras-na-va dnya ee na-stro-ye-nee-ya]',
    translation: 'Sizga ajoyib kun va koʻtarinki kayfiyat tilab qolaman!'
  },
  {
    id: 'ru-p12',
    language: 'russian',
    category: 'Kundalik',
    nativePhrase: 'Огромное спасибо за вашу бесценную помощь и чуткую поддержку.',
    transcription: '[ag-rom-na-ye spa-see-ba za va-shoo po-moshch]',
    translation: 'Bebaho yordamingiz va samimiy qoʻllab-quvvatlaganingiz uchun katta rahmat.'
  },
  {
    id: 'ru-p13',
    language: 'russian',
    category: 'Ish & Biznes',
    nativePhrase: 'Мы вышлем вам официальное коммерческое предложение до конца дня.',
    transcription: '[my vysh-lyem vam kam-mer-che-ska-ye pred-la-zhe-nee-ye]',
    translation: 'Biz sizga kun oxirigacha rasmiy tijoriy taklifni yuboramiz.'
  },
  {
    id: 'ru-p14',
    language: 'russian',
    category: 'Ish & Biznes',
    nativePhrase: 'Давайте подробно обсудим все условия контракта на встрече.',
    transcription: '[da-vay-tye pad-rob-na ab-soo-deem oon-slo-vee-ya]',
    translation: 'Keling, uchrashuvda shartnomaning barcha bandlarini batafsil koʻrib chiqamiz.'
  },
  {
    id: 'ru-p15',
    language: 'russian',
    category: 'Sayohat',
    nativePhrase: 'Где я могу приобрести единый проездной билет на общественный транспорт?',
    transcription: '[gdye ya ma-goo pree-ab-res-tee pra-yezd-noy bee-lyet]',
    translation: 'Jamoat transporti uchun yagona chiptani qayerdan sotib olsam boʻladi?'
  },
  {
    id: 'ru-p16',
    language: 'russian',
    category: 'Muloqot',
    nativePhrase: 'Я полностью разделяю вашу точку зрения по этому вопросу.',
    transcription: '[ya pol-nast-yoo raz-de-lya-yoo va-shoo toch-koo zre-nee-ya]',
    translation: 'Bu masala boʻyicha nuqtai nazaringizga toʻliq qoʻshilaman.'
  },
  {
    id: 'ru-p17',
    language: 'russian',
    category: 'Taʼlim',
    nativePhrase: 'Регулярное чтение книг на русском расширяет словарный запас.',
    transcription: '[re-gool-yar-na-ye chte-nee-ye ras-shee-rya-yet sla-var]',
    translation: 'Rus tilida muntazam kitob oʻqish soʻz boyligini kengaytiradi.'
  },
  {
    id: 'ru-p18',
    language: 'russian',
    category: 'Restoran & Xarid',
    nativePhrase: 'Это национальное блюдо очень вкусное, передайте комплименты шеф-повару!',
    transcription: '[e-ta blyoo-da o-chen vkoos-na-ye, kom-plee-men-ty po-va-roo]',
    translation: 'Bu milliy taom juda mazali ekan, bosh oshpazga tashakkurimizni yetkazing!'
  },
  {
    id: 'ru-p19',
    language: 'russian',
    category: 'Kundalik',
    nativePhrase: 'Не волнуйтесь, все обязательно решится наилучшим образом.',
    transcription: '[nye val-nooy-tyes, vsyo re-sheet-sya nai-looch-sheem]',
    translation: 'Xavotir olmang, hammasi albatta eng yaxshi tarzda hal boʻladi.'
  },
  {
    id: 'ru-p20',
    language: 'russian',
    category: 'Muloqot',
    nativePhrase: 'Извините за беспокойство, у вас найдется пара свободных минут?',
    transcription: '[eez-vee-nee-tye za bes-pa-koy-stva, nay-dyot-sya pa-ra mee-noot]',
    translation: 'Bezovta qilganim uchun kechirasiz, ikki daqiqa boʻsh vaqtingiz bormi?'
  },

  // ==========================================
  // FRANSUZ TILI (20 ta jonli ibora)
  // ==========================================
  {
    id: 'fr-p1',
    language: 'french',
    category: 'Sayohat',
    nativePhrase: 'Pardon monsieur, où se trouve la station de métro la plus proche?',
    transcription: '[par-dohn muh-syuh, oo suh troov lah stah-syon duh may-troh]',
    translation: 'Kechirasiz janob, eng yaqin metro bekati qayerda joylashgan?'
  },
  {
    id: 'fr-p2',
    language: 'french',
    category: 'Muloqot',
    nativePhrase: 'Je suis très heureux dʼapprendre la langue française avec vous.',
    transcription: '[zhuh swee tray zuh-ruh dah-prahn-druh lah lahng frahn-sez]',
    translation: 'Siz bilan birgalikda fransuz tilini oʻrganayotganimdan juda xursandman.'
  },
  {
    id: 'fr-p3',
    language: 'french',
    category: 'Muloqot',
    nativePhrase: 'Pourriez-vous répéter un peu plus lentement, sʼil vous plaît?',
    transcription: '[poo-ryay voo ray-pay-tay un puh ploo lahn-tuh-mahn, seel voo play]',
    translation: 'Iltimos, biroz sekinroq qaytara olasizmi?'
  },
  {
    id: 'fr-p4',
    language: 'french',
    category: 'Taʼlim',
    nativePhrase: 'Je prépare lʼexamen du DELF B2 pour étudier dans une université en France.',
    transcription: '[zhuh pray-par leg-zah-mahn doo delf bay-duh]',
    translation: 'Men Fransiyadagi universitetda oʻqish uchun DELF B2 imtihoniga tayyorlanyapman.'
  },
  {
    id: 'fr-p5',
    language: 'french',
    category: 'Restoran & Xarid',
    nativePhrase: 'Sʼil vous plaît, lʼaddition! Est-ce que nous pouvons régler par carte bancaire?',
    transcription: '[seel voo play, lah-dee-syon! ehs-kuh noo poo-vohn ray-glay par kart]',
    translation: 'Iltimos, hisobni keltiring! Bank kartasi orqali toʻlasak boʻladimi?'
  },
  {
    id: 'fr-p6',
    language: 'french',
    category: 'Restoran & Xarid',
    nativePhrase: 'Une table pour deux personnes près de la terrasse, sʼil vous plaît.',
    transcription: '[oon tah-bluh poor duh pair-sohn pray duh lah tay-rahs]',
    translation: 'Iltimos, ayvon yonida ikki kishilik stol berolsangiz.'
  },
  {
    id: 'fr-p7',
    language: 'french',
    category: 'Taʼlim',
    nativePhrase: 'Comment prononcez-vous cette expression en français courant?',
    transcription: '[kuh-mahn proh-nohn-say voo set eks-preh-syon]',
    translation: 'Ushbu iborani jonli fransuz tilida qanday talaffuz qilasiz?'
  },
  {
    id: 'fr-p8',
    language: 'french',
    category: 'Sayohat',
    nativePhrase: 'À quelle heure part le prochain train à grande vitesse pour Lyon?',
    transcription: '[ah kel ur par luh proh-shahn trahn ah grahnd vee-tes]',
    translation: 'Lion shahriga boruvchi navbatdagi tezyurar poyezd soat nechada joʻnaydi?'
  },
  {
    id: 'fr-p9',
    language: 'french',
    category: 'Sayohat',
    nativePhrase: 'Pourriez-vous mʼindiquer le chemin pour aller au musée du Louvre?',
    transcription: '[poo-ryay voo mahn-dee-kay luh shuh-mahn poor ah-lay oh moo-zay]',
    translation: 'Luvr muzeyiga olib boruvchi yoʻlni koʻrsatib yubora olasizmi?'
  },
  {
    id: 'fr-p10',
    language: 'french',
    category: 'Ish & Biznes',
    nativePhrase: 'Je vous remercie sincèrement pour votre excellente collaboration.',
    transcription: '[zhuh voo ruh-mair-see san-sair-mahn poor voh-truh koh-lah-boh-rah-syon]',
    translation: 'Aʼlo darajadagi samarali hamkorligingiz uchun chin dildan tashakkur aytaman.'
  },
  {
    id: 'fr-p11',
    language: 'french',
    category: 'Ish & Biznes',
    nativePhrase: 'Nous pouvons organiser une réunion de travail en visioconférence demain.',
    transcription: '[noo poo-vohn or-gah-nee-zay oon ray-oo-nyon duh trah-vye]',
    translation: 'Biz ertaga onlayn videokonferensiya orqali ishchi uchrashuv oʻtkazishimiz mumkin.'
  },
  {
    id: 'fr-p12',
    language: 'french',
    category: 'Kundalik',
    nativePhrase: 'Passez une excellente journée et profitez bien du beau soleil!',
    transcription: '[pah-say zoon eks-say-lahnt zhoor-nay ay proh-fee-tay]',
    translation: 'Kuningiz aʼlo darajada oʻtsin, quyoshli ob-havodan zavqlaning!'
  },
  {
    id: 'fr-p13',
    language: 'french',
    category: 'Kundalik',
    nativePhrase: 'Merci infiniment pour votre accueil si chaleureux et généreux.',
    transcription: '[mair-see ahn-fee-nee-mahn poor voh-truh ah-kuhy]',
    translation: 'Bunday iliq va saxiy kutib olganingiz uchun cheksiz minnatdorman.'
  },
  {
    id: 'fr-p14',
    language: 'french',
    category: 'Muloqot',
    nativePhrase: 'Je suis tout à fait dʼaccord avec votre point de vue constructif.',
    transcription: '[zhuh swee too tah fay dah-kor ah-vek voh-truh pwahn duh vyoo]',
    translation: 'Sizning konstruktiv nuqtai nazaringizga butunlay qoʻshilaman.'
  },
  {
    id: 'fr-p15',
    language: 'french',
    category: 'Taʼlim',
    nativePhrase: 'La pratique orale quotidienne est indispensable pour la fluidité.',
    transcription: '[lah prah-teek oh-rahl koh-tee-dyen eh tahn-dee-spahn-sahbl]',
    translation: 'Kundalik ogʻzaki nutq amaliyoti ravon gapirish uchun nihoyatda zarurdir.'
  },
  {
    id: 'fr-p16',
    language: 'french',
    category: 'Sayohat',
    nativePhrase: 'Est-ce que ce vol est direct vers lʼaéroport Paris Charles-de-Gaulle?',
    transcription: '[ehs-kuh suh vohl eh dee-rekt vair lah-ay-roh-por]',
    translation: 'Bu reys Parij Sharl-de-Goll aeroportiga toʻgʻridan-toʻgʻri uchadimi?'
  },
  {
    id: 'fr-p17',
    language: 'french',
    category: 'Restoran & Xarid',
    nativePhrase: 'Ce plat traditionnel est délicieux, mes compliments chaleureux au chef!',
    transcription: '[suh plah trah-dee-syo-nel eh day-lee-syuh]',
    translation: 'Ushbu milliy taom juda mazali ekan, oshpazga iliq tabriklarimizni yetkazing!'
  },
  {
    id: 'fr-p18',
    language: 'french',
    category: 'Ish & Biznes',
    nativePhrase: 'Jʼai le plaisir de vous transmettre le rapport dʼactivité complet.',
    transcription: '[zhay luh play-zeer duh voo trahns-meh-truh luh rah-por]',
    translation: 'Sizga toʻliq faoliyat hisobotini taqdim etishdan mamnunman.'
  },
  {
    id: 'fr-p19',
    language: 'french',
    category: 'Kundalik',
    nativePhrase: 'Prenez bien soin de vous et à très bientôt, jʼespère!',
    transcription: '[pruh-nay byen swahn duh voo ay ah tray byen-toh]',
    translation: 'Oʻzingizni asrang va tez orada yana koʻrishamiz degan umiddaman!'
  },
  {
    id: 'fr-p20',
    language: 'french',
    category: 'Muloqot',
    nativePhrase: 'Enchanté dʼavoir fait votre connaissance, au grand plaisir de vous revoir!',
    transcription: '[ahn-shahn-tay dah-vwahr fay voh-truh koh-neh-sahns]',
    translation: 'Siz bilan tanishganimdan shodman, yana uchrashish baxtiga erishaylik!'
  },

  // ==========================================
  // NEMIS TILI (20 ta jonli ibora)
  // ==========================================
  {
    id: 'de-p1',
    language: 'german',
    category: 'Taʼlim',
    nativePhrase: 'Ich möchte mich an einer renommierten Universität in Deutschland bewerben.',
    transcription: '[ikh myekh-tuh mikh an ay-ner oo-nee-ver-zee-tate be-ver-ben]',
    translation: 'Men Germaniyadagi nufuzli universitetga hujjat topshirish niyatidaman.'
  },
  {
    id: 'de-p2',
    language: 'german',
    category: 'Muloqot',
    nativePhrase: 'Könnten Sie das bitte noch einmal langsam wiederholen?',
    transcription: '[kyen-ten zee das bi-tuh nokh ayn-mahl lang-zam vee-der-ho-len]',
    translation: 'Iltimos, shuni yana bir bor sekinroq takrorlay olasizmi?'
  },
  {
    id: 'de-p3',
    language: 'german',
    category: 'Muloqot',
    nativePhrase: 'Es freut mich außerordentlich, Sie persönlich kennenzulernen.',
    transcription: '[es froyt mikh ow-ser-or-dent-likh zee per-zyen-likh ken-nen-tsoo-ler-nen]',
    translation: 'Siz bilan shaxsan tanishganimdan behad xursandman.'
  },
  {
    id: 'de-p4',
    language: 'german',
    category: 'Taʼlim',
    nativePhrase: 'Ich bereite mich intensiv auf die offizielle Goethe-Zertifikat B2 Prüfung vor.',
    transcription: '[ikh be-rye-tuh mikh in-ten-zeef owf dee pryoo-foong for]',
    translation: 'Men rasmiy Goethe B2 imtihoniga intensiv tarzda tayyorgarlik koʻryapman.'
  },
  {
    id: 'de-p5',
    language: 'german',
    category: 'Taʼlim',
    nativePhrase: 'Können Sie mir bitte erklären, wie dieser Satz grammatikalisch aufgebaut ist?',
    transcription: '[kyen-nen zee meer bi-tuh er-klyay-ren vee dee-zer zats owf-ge-bowt ist]',
    translation: 'Iltimos, bu gap qanday grammatik tuzilganini tushuntirib bera olasizmi?'
  },
  {
    id: 'de-p6',
    language: 'german',
    category: 'Sayohat',
    nativePhrase: 'Entschuldigung, von welchem Gleis fährt der ICE-Zug nach Berlin ab?',
    transcription: '[ent-shool-dee-goong, fon vel-khem glyse fehrt der tsook ap]',
    translation: 'Kechirasiz, Berlinga qatnovchi ICE tezyurar poyezdi qaysi platformadan joʻnaydi?'
  },
  {
    id: 'de-p7',
    language: 'german',
    category: 'Sayohat',
    nativePhrase: 'Ich hätte gerne eine Hin- und Rückfahrkarte nach Frankfurt am Main.',
    transcription: '[ikh heh-tuh ger-nuh ay-nuh hin oont ryook-fahr-kar-tuh]',
    translation: 'Mayndagi Frankfurtga borib-kelish uchun bitta poyezd chiptasi olmoqchi edim.'
  },
  {
    id: 'de-p8',
    language: 'german',
    category: 'Restoran & Xarid',
    nativePhrase: 'Wir möchten bitte bestellen: Ein stilles Wasser und das Tagesgericht.',
    transcription: '[veer myekh-ten bi-tuh be-shte-len: ayn shteel-les vas-ser]',
    translation: 'Buyurtma bermoqchi edik: bitta gazsiz suv va kunning maxsus taomi.'
  },
  {
    id: 'de-p9',
    language: 'german',
    category: 'Restoran & Xarid',
    nativePhrase: 'Die Rechnung, bitte! Können wir getrennt mit Karte bezahlen?',
    transcription: '[dee rekh-noong bi-tuh! kyen-nen veer ge-trent mit kar-tuh be-tsah-len]',
    translation: 'Hisobni bering, iltimos! Karta orqali alohida-alohida toʻlasak boʻladimi?'
  },
  {
    id: 'de-p10',
    language: 'german',
    category: 'Ish & Biznes',
    nativePhrase: 'Wir freuen uns sehr auf eine erfolgreiche und langfristige Zusammenarbeit.',
    transcription: '[veer froy-en oons zayr owf ay-nuh er-folg-rye-khe tsoo-zam-men-ar-bite]',
    translation: 'Biz muvaffaqiyatli va uzoq muddatli hamkorlikdan nihoyatda mamnun boʻlamiz.'
  },
  {
    id: 'de-p11',
    language: 'german',
    category: 'Ish & Biznes',
    nativePhrase: 'Ich schicke Ihnen alle erforderlichen Unterlagen per E-Mail bis heute Nachmittag.',
    transcription: '[ikh shee-kuh ee-nen al-luh oon-ter-lah-gen per ee-mayl]',
    translation: 'Bugun tushdan keyingacha barcha kerakli hujjatlarni elektron pochtangizga yuboraman.'
  },
  {
    id: 'de-p12',
    language: 'german',
    category: 'Kundalik',
    nativePhrase: 'Ich wünsche Ihnen einen angenehmen und rundum erfolgreichen Arbeitstag!',
    transcription: '[ikh vyoon-shuh ee-nen ay-nen an-ge-nay-men ar-bites-tahk]',
    translation: 'Sizga maroqli va har tomonlama muvaffaqiyatli ish kuni tilayman!'
  },
  {
    id: 'de-p13',
    language: 'german',
    category: 'Kundalik',
    nativePhrase: 'Vielen herzlichen Dank für Ihre außerordentliche Freundlichkeit und Hilfe.',
    transcription: '[fee-len herts-likh-en dank fyoor ee-ruh froynt-likh-kite]',
    translation: 'Favqulodda samimiyligingiz va bebaho yordamingiz uchun chin dildan rahmat.'
  },
  {
    id: 'de-p14',
    language: 'german',
    category: 'Muloqot',
    nativePhrase: 'Das ist ein äußerst interessanter und innovativer Vorschlag.',
    transcription: '[das ist ayn oy-serst in-te-res-zan-ter for-shlahk]',
    translation: 'Bu juda ham qiziqarli va innovatsion taklifdir.'
  },
  {
    id: 'de-p15',
    language: 'german',
    category: 'Sayohat',
    nativePhrase: 'Wie weit ist es von hier zum historischen Rathaus zu Fuß?',
    transcription: '[vee vite ist es fon heer tsoom raht-hows tsoo foos]',
    translation: 'Bu yerdan tarixiy shahar meriyasigacha piyoda qancha masofa bor?'
  },
  {
    id: 'de-p16',
    language: 'german',
    category: 'Ish & Biznes',
    nativePhrase: 'Pünktlichkeit und Zuverlässigkeit sind entscheidende Kriterien im Berufsleben.',
    transcription: '[pyoonkt-likh-kite oont tsoo-fer-les-ikh-kite zint kree-tay-ryen]',
    translation: 'Vaqtga rioya qilish va ishonchlilik kasbiy faoliyatda hal qiluvchi mezonlardir.'
  },
  {
    id: 'de-p17',
    language: 'german',
    category: 'Taʼlim',
    nativePhrase: 'Übung macht den Meister, besonders beim kontinuierlichen Sprachenlernen.',
    transcription: '[yoo-boong makht dayn my-ster, be-zon-ders baym shprah-khen-ler-nen]',
    translation: 'Mashq qilsang — ustoz boʻlasan, ayniqsa uzluksiz til oʻrganishda.'
  },
  {
    id: 'de-p18',
    language: 'german',
    category: 'Restoran & Xarid',
    nativePhrase: 'Vielen herzlichen Dank, das traditionelle Essen hat ausgezeichnet geschmeckt!',
    transcription: '[fee-len herts-likh-en dank, das es-sen hat ows-ge-tsaykh-net ge-shmekt]',
    translation: 'Katta rahmat, milliy taom shunchaki ajoyib va juda totli boʻldi!'
  },
  {
    id: 'de-p19',
    language: 'german',
    category: 'Kundalik',
    nativePhrase: 'Passen Sie gut auf sich auf und bis zum nächsten Mal!',
    transcription: '[pas-sen zee goot owf zikh owf oont bis tsoom nekh-sten mahl]',
    translation: 'Oʻzingizni ehtiyot qiling va keyingi uchrashuvgacha xayr!'
  },
  {
    id: 'de-p20',
    language: 'german',
    category: 'Muloqot',
    nativePhrase: 'Auf Wiedersehen und viel Erfolg bei Ihren zukünftigen Projekten!',
    transcription: '[owf vee-der-zay-en oont feel er-folg]',
    translation: 'Xayr salomat boʻling va kelgusi loyihalaringizda ulkan muvaffaqiyatlar yor boʻlsin!'
  }
];

export interface AudioListeningChallenge {
  id: string;
  language: LanguageType;
  audioPrompt: string; // The phrase to speak
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const AUDIO_LISTENING_CHALLENGES: AudioListeningChallenge[] = [
  // ENGLISH CHALLENGES
  {
    id: 'alc-en-1',
    language: 'english',
    audioPrompt: 'Could you please elaborate on that point?',
    question: 'Eshitilgan jumlada notiq nima soʻramoqda?',
    options: [
      'Fikrni kengroq tushuntirib berishni',
      'Gapni tugatishni va ketishni',
      'Yangi kitob sotib olishni',
      'Hisobni toʻlashni'
    ],
    correctIndex: 0,
    explanation: '"Elaborate on that point" iborasi "fikrni yanada batafsilroq va kengroq tushuntirish" maʼnosini bildiradi.'
  },
  {
    id: 'alc-en-2',
    language: 'english',
    audioPrompt: 'Success in learning languages requires continuous perseverance.',
    question: 'Jumlada qaysi asosiy sifat til oʻrganishdagi muvaffaqiyat garovi deb aytildi?',
    options: [
      'Boylik va hashamat',
      'Uzluksiz matonat va sabr-toqat (Perseverance)',
      'Faqat chet elda yashash',
      'Tezkor yodlash usuli'
    ],
    correctIndex: 1,
    explanation: '"Perseverance" — bu toʻsiqlarga qaramay toʻxtamasdan olgʻa intilish, matonat demakdir.'
  },
  {
    id: 'alc-en-3',
    language: 'english',
    audioPrompt: 'We are looking forward to establishing a fruitful long-term partnership.',
    question: 'Bu jumla qaysi sohada eng koʻp qoʻllaniladi?',
    options: [
      'Tibbiy operatsiyada',
      'Bolalar bogʻchasida',
      'Rasmiy biznes va ishbilarmonlik muzokaralarida',
      'Sport stadionida'
    ],
    correctIndex: 2,
    explanation: '"Establishing a fruitful partnership" rasmiy biznes uchrashuvlari va hamkorlik shartnomalarining ajralmas iborasidir.'
  },
  {
    id: 'alc-en-4',
    language: 'english',
    audioPrompt: 'Excuse me, which terminal does the flight to London depart from?',
    question: 'Yoʻlovchi qanday maʼlumotni soʻramoqda?',
    options: [
      'Mehmonxona xonasi narxini',
      'London reysi joʻnaydigan terminal raqamini',
      'Ob-havo maʼlumotini',
      'Bojxona qoidalarini'
    ],
    correctIndex: 1,
    explanation: '"Which terminal does the flight depart from" savoli aeroportda samolyot joʻnash terminalini aniqlash uchun beriladi.'
  },

  // RUSSIAN CHALLENGES
  {
    id: 'alc-ru-1',
    language: 'russian',
    audioPrompt: 'Будьте добры, подскажите дорогу к центральной библиотеке.',
    question: 'Suhbatdosh qayerga olib boruvchi yoʻlni soʻramoqda?',
    options: [
      'Markaziy kutubxonaga',
      'Temir yoʻl vokzaliga',
      'Supermarketga',
      'Kinolarga'
    ],
    correctIndex: 0,
    explanation: '"Центральная библиотека" — markaziy kutubxona hisoblanadi.'
  },
  {
    id: 'alc-ru-2',
    language: 'russian',
    audioPrompt: 'Каждый выученный урок — это новое личное достижение.',
    question: '"Достижение" soʻzining maʼnosi nima?',
    options: [
      'Xato yoki kamchilik',
      'Shaxsiy yutuq, muvaffaqiyatli natija',
      'Vaqtni behuda sarflash',
      'Dam olish kuni'
    ],
    correctIndex: 1,
    explanation: '"Достижение" rus tilida erishilgan marra, gʻalaba yoki yutuqni ifodalaydi.'
  },
  {
    id: 'alc-ru-3',
    language: 'russian',
    audioPrompt: 'Мы готовы к долгосрочному и взаимовыгодному партнерству.',
    question: 'Ushbu iborada qanday hamkorlik nazarda tutilgan?',
    options: [
      'Faqat bir martalik savdo',
      'Uzoq muddatli va oʻzaro manfaatli hamkorlik',
      'Muddati nomaʼlum tanaffus',
      'Xavfli moliyaviy bitim'
    ],
    correctIndex: 1,
    explanation: '"Долгосрочный" — uzoq muddatli, "взаимовыгодный" — oʻzaro manfaatli degan maʼnolarni anglatadi.'
  },

  // FRENCH CHALLENGES
  {
    id: 'alc-fr-1',
    language: 'french',
    audioPrompt: 'Pardon monsieur, où se trouve la station de métro la plus proche?',
    question: 'Fransuzcha jumlada qaysi joy haqida soʻralmoqda?',
    options: [
      'Eng yaqin dorixona',
      'Eng yaqin metro bekati (station de métro)',
      'Avtobus bekati',
      'Aeroport kutish zali'
    ],
    correctIndex: 1,
    explanation: '"Station de métro la plus proche" — eng yaqin metro bekati degani.'
  },
  {
    id: 'alc-fr-2',
    language: 'french',
    audioPrompt: 'Sʼil vous plaît, lʼaddition! Est-ce que nous pouvons régler par carte bancaire?',
    question: 'Bu jumla qayerda va nima maqsadda aytiladi?',
    options: [
      'Kutubxonada kitob olishda',
      'Restoranda hisobni soʻrash va karta orqali toʻlashda',
      'Universitetga kirish imtihonida',
      'Poyezd kutayotganda'
    ],
    correctIndex: 1,
    explanation: '"Lʼaddition" fransuz restoranlarida hisob-kitob chekini soʻrashda ishlatiladi.'
  },
  {
    id: 'alc-fr-3',
    language: 'french',
    audioPrompt: 'Lʼapprentissage dʼune langue est une magnifique découverte.',
    question: '"Magnifique découverte" birikmasi nimani anglatadi?',
    options: [
      'Qiyin va ogʻir vazifa',
      'Ajoyib va goʻzal kashfiyot',
      'Qimmatbaho xarid',
      'Kutilmagan xavf'
    ],
    correctIndex: 1,
    explanation: '"Magnifique" — goʻzal, ajoyib; "découverte" — kashfiyot, yangi bilimni ochish deganidir.'
  },

  // GERMAN CHALLENGES
  {
    id: 'alc-de-1',
    language: 'german',
    audioPrompt: 'Könnten Sie das bitte noch einmal langsam wiederholen?',
    question: 'Nemischa jumlada soʻzlovchi nimani iltimos qildi?',
    options: [
      'Eshikni yopib qoʻyishni',
      'Shuni yana bir bor sekinroq takrorlashni (langsam wiederholen)',
      'Boshqa xonaga oʻtishni',
      'Tezroq gapirishni'
    ],
    correctIndex: 1,
    explanation: '"Noch einmal langsam wiederholen" — yana bir marta sekinroq takrorlab berishni anglatadi.'
  },
  {
    id: 'alc-de-2',
    language: 'german',
    audioPrompt: 'Entschuldigung, von welchem Gleis fährt der ICE-Zug nach Berlin ab?',
    question: 'Yoʻlovchi nimani bilmoqchi boʻlmoqda?',
    options: [
      'Berlin poyezdi qaysi platformadan (Gleis) joʻnashini',
      'Poyezd ichida ovqat bor-yoʻqligini',
      'Yoʻl chiptasi narxini',
      'Berlin shahrining ob-havosini'
    ],
    correctIndex: 0,
    explanation: 'Nemis temir yoʻl vokzallarida "Gleis" soʻzi poyezd toʻxtaydigan yoʻl/platformani bildiradi.'
  },
  {
    id: 'alc-de-3',
    language: 'german',
    audioPrompt: 'Pünktlichkeit und Zuverlässigkeit sind entscheidende Kriterien im Berufsleben.',
    question: 'Nemis ish madaniyatida qaysi ikkita fazilat eng muhim deb taʼkidlandi?',
    options: [
      'Baland ovozda gapirish va tezlik',
      'Punktuallik (vaqtga rioya qilish) va ishonchlilik (Zuverlässigkeit)',
      'Faqat kompyuterda ishlash',
      'Koʻp taʼtil olish'
    ],
    correctIndex: 1,
    explanation: '"Pünktlichkeit" (vaqtga qatʼiy rioya qilish) va "Zuverlässigkeit" (ishonchlilik) nemis madaniyatining poydevor fazilatlaridir.'
  }
];
