import json
import os

with open('src/data/translator/translatorDb.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

existing_en = set((e['translations']['en'] or '').strip().lower() for e in db)
print(f"Initial count: {len(db)}")

# Base word families and lists to expand to 5000+ words
# We will create high-quality vocabulary across 10 categories
raw_words_data = [
    # Academic & Education (IELTS / TOEFL)
    ("analyze", "tahlil qilmoq", "анализировать", "analysieren", "analyser", "analiz etmek", "تحليل", "analizar", "分析", "분석하다", "education", "fe'l"),
    ("hypothesis", "faraz / gipoteza", "гипотеза", "Hypothese", "hypothèse", "hipotez", "فرضية", "hipótesis", "假设", "가설", "education", "ot"),
    ("evaluate", "baholamoq", "оценивать", "bewerten", "évaluer", "değerlendirmek", "تقييم", "evaluar", "评估", "평가하다", "education", "fe'l"),
    ("synthesize", "umumlashtirmoq", "синтезировать", "synthetisieren", "synthétiser", "sentezlemek", "توليف", "sintetizar", "综合", "종합하다", "education", "fe'l"),
    ("methodology", "metodologiya", "методология", "Methodik", "méthodologie", "metodoloji", "منهجية", "metodología", "方法论", "방법론", "education", "ot"),
    ("paradigm", "namuna / paradigma", "парадигма", "Paradigma", "paradigme", "paradigma", "نموذج", "paradigma", "范式", "패러다임", "education", "ot"),
    ("perspective", "nuqtai nazar", "перспектива", "Perspektive", "perspective", "bakış açısı", "منظور", "perspectiva", "视角", "관점", "education", "ot"),
    ("implication", "oqibat / ma'no", "последствие", "Auswirkung", "implication", "çıkarım", "مغزى", "implicación", "含意", "함의", "education", "ot"),
    ("comprehensive", "har tomonlama", "всесторонний", "umfassend", "complet", "kapsamlı", "شامل", "exhaustivo", "全面的", "포괄적인", "education", "sifat"),
    ("fundamental", "tub / asosiy", "фундаментальный", "grundlegend", "fondamental", "temel", "أساسي", "fundamental", "基本的", "기본적인", "education", "sifat"),
    ("deduce", "xulosa chiqarmoq", "делать вывод", "schlussfolgern", "déduire", "sonuç çıkarmak", "استنتج", "deducir", "推断", "추론하다", "education", "fe'l"),
    ("empirical", "tajribaga asoslangan", "эмпирический", "empirisch", "empirique", "ampirik", "تجريبي", "empírico", "实证的", "실증적인", "education", "sifat"),
    ("phenomenon", "hodisa", "явление", "Phänomen", "phénomène", "fenomen", "ظاهرة", "fenómeno", "现象", "현상", "education", "ot"),
    ("significance", "ahamiyat", "значение", "Bedeutung", "importance", "önem", "أهمية", "significado", "重要性", "중요성", "education", "ot"),
    ("subsequent", "keyingi", "последующий", "anschließend", "subséquent", "sonraki", "لاحق", "subsiguiente", "随后的", "그 다음의", "education", "sifat"),
    ("undertake", "o'z zimmasiga olmoq", "предпринимать", "unternehmen", "entreprendre", "üstlenmek", "تعهد", "emprender", "承担", "착수하다", "education", "fe'l"),
    ("variable", "o'zgaruvchi", "переменная", "Variable", "variable", "değişken", "متغير", "variable", "变量", "변수", "education", "ot"),
    ("differentiate", "farqlamoq", "различать", "unterscheiden", "différencier", "ayırt etmek", "تمييز", "diferenciar", "区分", "구별하다", "education", "fe'l"),
    ("fluctuate", "o'zgarib turmoq", "колебаться", "schwanken", "fluctuer", "dalgalanmak", "تذبذب", "fluctuar", "波动", "변동하다", "education", "fe'l"),
    ("interpret", "talqin qilmoq", "интерпретировать", "interpretieren", "interpréter", "yorumlamak", "تفسير", "interpretar", "解释", "해석하다", "education", "fe'l"),
    ("parameter", "ko'rsatkich / parametr", "параметр", "Parameter", "paramètre", "parametre", "معامل", "parámetro", "参数", "매개변수", "education", "ot"),
    ("precise", "aniq", "точный", "präzise", "précis", "kesin", "دقيق", "preciso", "精确的", "정확한", "education", "sifat"),
    ("preliminary", "dastlabki", "предварительный", "vorläufig", "préliminaire", "ön", "تمهيدي", "preliminar", "初步的", "예비의", "education", "sifat"),
    ("rationale", "mantiqiy asos", "обоснование", "Begründung", "justification", "gerekçe", "أساس منطقي", "razonamiento", "理论基础", "이유", "education", "ot"),
    ("retain", "saqlab qolmoq", "сохранять", "behalten", "retenir", "muhafaza etmek", "احتفظ", "retener", "保留", "유지하다", "education", "fe'l"),
    ("scrutinize", "sinchiklab tekshirmoq", "тщательно проверять", "prüfen", "scruter", "incelemek", "فحص بدقة", "escrutar", "细审", "면밀히 조사하다", "education", "fe'l"),
    ("validity", "haqqoniylik / yaroqlilik", "действительность", "Gültigkeit", "validité", "geçerlilik", "صلاحية", "validez", "有效性", "타당성", "education", "ot"),
    ("curriculum", "o'quv dasturi", "учебная программа", "Lehrplan", "programme scolaire", "müfredat", "منهج دراسي", "plan de estudios", "课程", "교육과정", "education", "ot"),
    ("dissertation", "ilmiy dissertatsiya", "диссертация", "Dissertation", "thèse", "tez", "أطروحة", "disertación", "学位论文", "학위 논문", "education", "ot"),
    ("pedagogy", "pedagogika", "педагогика", "Pädagogik", "pédagogie", "pedagoji", "علم التربية", "pedagogía", "教学法", "교수법", "education", "ot"),
    ("proficiency", "mahorat / daraja", "уровень владения", "Kompetenz", "maîtrise", "yeterlilik", "إتقان", "dominio", "熟练度", "숙련도", "education", "ot"),
    ("scholarship", "stipendiya / ilmiy grant", "стипендия", "Stipendium", "bourse", "burs", "منحة دراسية", "beca", "奖学金", "장학금", "education", "ot"),
    ("syllabus", "dars rejasi", "учебный план", "Lehrplan", "programme de cours", "ders izlencesi", "مفردات المنهج", "programa de estudio", "教学大纲", "강의계획서", "education", "ot"),
    ("tuition", "o'qish to'lovi", "плата за обучение", "Studiengebühr", "frais de scolarité", "öğrenim harcı", "الرسوم الدراسية", "matrícula", "学费", "수업료", "education", "ot"),
    ("undergraduate", "bakalavr talabasi", "студент бакалавриата", "Bachelorstudent", "étudiant de premier cycle", "lisans öğrencisi", "طالب جامعي", "estudiante de pregrado", "本科生", "학부생", "education", "ot"),
    ("postgraduate", "magistratura talabasi", "аспирант / магистрант", "Aufbaustudent", "étudiant de troisième cycle", "yüksek lisans öğrencisi", "طالب دراسات عليا", "estudiante de posgrado", "研究生", "대학원생", "education", "ot"),
    ("plagiarism", "ko'chirmachilik / plagiat", "плагиат", "Plagiat", "plagiat", "intihal", "سرقة أدبية", "plagio", "抄袭", "표절", "education", "ot"),
    ("intellectual", "aqliy / ziyoli", "интеллектуальный", "intellektuell", "intellectuel", "entelektüel", "فكري", "intelectual", "知识分子", "지적인", "education", "sifat"),
    ("cognitive", "ong / idrokka oid", "когнитивный", "kognitiv", "cognitif", "bilişsel", "معرفي", "cognitivo", "认知的", "인지의", "education", "sifat"),
    ("collaborate", "hamkorlik qilmoq", "сотрудничать", "zusammenarbeiten", "collaborer", "işbirliği yapmak", "تعاون", "colaborar", "合作", "협력하다", "education", "fe'l"),

    # IT & Software Engineering
    ("algorithm", "algoritm", "алгоритм", "Algorithmus", "algorithme", "algoritma", "خوارزمية", "algoritmo", "算法", "알고리즘", "it_tech", "ot"),
    ("asynchronous", "asinxron", "асинхронный", "asynchron", "asynchrone", "asenkron", "غير متزامن", "asíncrono", "异步的", "비동기식", "it_tech", "sifat"),
    ("backend", "backend / server qismi", "бэкенд", "Backend", "backend", "arka uç", "الخلفية", "backend", "后端", "백엔드", "it_tech", "ot"),
    ("frontend", "frontend / interfeys qismi", "фронтенд", "Frontend", "frontend", "ön uç", "الواجهة الأمامية", "frontend", "前端", "프런트엔드", "it_tech", "ot"),
    ("compiler", "kompilyator", "компилятор", "Compiler", "compilateur", "derleyici", "مترجم البرمجيات", "compilador", "编译器", "컴파일러", "it_tech", "ot"),
    ("deployment", "serverga joylash / deploy", "развертывание", "Bereitstellung", "déploiement", "dağıtım", "نشر", "despliegue", "部署", "배포", "it_tech", "ot"),
    ("framework", "freymvork", "фреймворк", "Framework", "cadre applicatif", "çatı", "إطار العمل", "marco de trabajo", "框架", "프레임워크", "it_tech", "ot"),
    ("middleware", "oraliq dastur", "промежуточное ПО", "Middleware", "logiciel médiateur", "ara katman", "البرمجيات الوسيطة", "middleware", "中间件", "미들웨어", "it_tech", "ot"),
    ("polymorphism", "polimorfizm", "полиморфизм", "Polymorphismus", "polymorphisme", "polimorfizm", "تعدد الأشكال", "polimorfismo", "多态性", "다형성", "it_tech", "ot"),
    ("recursion", "rekursiya", "рекурсия", "Rekursion", "récursion", "özyineleme", "عودية", "recursión", "递归", "재귀", "it_tech", "ot"),
    ("repository", "omborxona / repozitoriy", "репозиторий", "Repository", "dépôt", "depo", "مستودع", "repositorio", "代码库", "저장소", "it_tech", "ot"),
    ("authentication", "autentifikatsiya / tasdiqlash", "аутентификация", "Authentifizierung", "authentification", "kimlik doğrulama", "المصادقة", "autenticación", "身份验证", "인증", "it_tech", "ot"),
    ("authorization", "ruxsat berish / avtorizatsiya", "авторизация", "Autorisierung", "autorisation", "yetkilendirme", "تفويض", "autorización", "授权", "인가", "it_tech", "ot"),
    ("encryption", "shifrlash", "шифрование", "Verschlüsselung", "chiffrement", "şifreleme", "تشفير", "encriptación", "加密", "암호화", "it_tech", "ot"),
    ("decryption", "shifrni yechish", "расшифровка", "Entschlüsselung", "déchiffrement", "şifre çözme", "فك التشفير", "descifrado", "解密", "복호화", "it_tech", "ot"),
    ("endpoint", "tarmoq nuqtasi / endpoint", "конечная точка", "Endpunkt", "point de terminaison", "uç nokta", "نقطة النهاية", "punto final", "端点", "엔드포인트", "it_tech", "ot"),
    ("scalability", "kengayuvchanlik", "масштабируемость", "Skalierbarkeit", "évolutivité", "ölçeklenebilirlik", "قابلية التوسع", "escalabilidad", "可扩展性", "확장성", "it_tech", "ot"),
    ("debugging", "xatolarni tuzatish", "отладка", "Fehlerbehebung", "débogage", "hata ayıklama", "تصحيح الأخطاء", "depuración", "调试", "디버깅", "it_tech", "ot"),
    ("latency", "kechikish vaqti", "задержка", "Latenz", "latence", "gecikme", "وقت الاستجابة", "latencia", "延迟", "지연 시간", "it_tech", "ot"),
    ("throughput", "o'tkazish qobiliyati", "пропускная способность", "Durchsatz", "débit", "işlem hacmi", "إنتاجية", "rendimiento", "吞吐量", "처리량", "it_tech", "ot"),
    ("concurrency", "bir vaqtda ishlash", "параллелизм", "Nebenläufigkeit", "simultanéité", "eşzamanlılık", "تزامن", "concurrencia", "并发", "동시성", "it_tech", "ot"),
    ("refactoring", "kodni qayta ishlash", "рефакторинг", "Refaktorisierung", "refactorisation", "kod düzenleme", "إعادة هيكلة الكود", "refactorización", "重构", "리팩터링", "it_tech", "ot"),
    ("dependency", "bog'liqlik", "зависимость", "Abhängigkeit", "dépendance", "bağımlılık", "تبعية", "dependencia", "依赖项", "의존성", "it_tech", "ot"),
    ("containerization", "konteynerlash", "контейнеризация", "Containerisierung", "conteneurisation", "kapsayıcılama", "حاويات", "contenedorización", "容器化", "컨테이너화", "it_tech", "ot"),
    ("virtualization", "virtuallashtirish", "виртуализация", "Virtualisierung", "virtualisation", "sanallaştırma", "محاكاة افتراضية", "virtualización", "虚拟化", "가상화", "it_tech", "ot"),
    ("microservices", "mikroxizmatlar", "микросервисы", "Microservices", "microservices", "mikro hizmetler", "خدمات مصغرة", "microservicios", "微服务", "마이크로서비스", "it_tech", "ot"),
    ("artificial intelligence", "sun'iy intellekt", "искусственный интеллект", "künstliche Intelligenz", "intelligence artificielle", "yapay zeka", "الذكاء الاصطناعي", "inteligencia artificial", "人工智能", "인공지능", "it_tech", "ot"),
    ("machine learning", "mashinali o'rganish", "машинное обучение", "maschinelles Lernen", "apprentissage automatique", "makine öğrenimi", "تعلم الآلة", "aprendizaje automático", "机器学习", "머신러닝", "it_tech", "ot"),
    ("neural network", "neyron tarmog'i", "нейронная сеть", "neuronales Netzwerk", "réseau de neurones", "sinir ağı", "شبكة عصبية", "red neuronal", "神经网络", "신경망", "it_tech", "ot"),
    ("deep learning", "chuqur o'rganish", "глубокое обучение", "Deep Learning", "apprentissage profond", "derin öğrenme", "التعلم العميق", "aprendizaje profundo", "深度学习", "딥러닝", "it_tech", "ot"),
    ("blockchain", "blokcheyn", "блокчейн", "Blockchain", "chaîne de blocs", "blok zinciri", "سلسلة الكتل", "cadena de bloques", "区块链", "블록체인", "it_tech", "ot"),
    ("cybersecurity", "kiberxavfsizlik", "кибербезопасность", "Cybersicherheit", "cybersécurité", "siber güvenlik", "الأمن السيبراني", "ciberseguridad", "网络安全", "사이버 보안", "it_tech", "ot"),
    ("firewall", "xavfsizlik devori", "файрвол / брандмауэр", "Firewall", "pare-feu", "güvenlik duvarı", "جدار حماية", "cortafuegos", "防火墙", "방화벽", "it_tech", "ot"),
    ("cache", "kesh xotirasi", "кэш", "Cache", "mémoire cache", "önbellek", "ذاكرة التخزين المؤقت", "caché", "缓存", "캐시", "it_tech", "ot"),
    ("bandwidth", "tarmoq kengligi", "пропускная полоса", "Bandbreite", "bande passante", "bant genişliği", "عرض النطاق الترددي", "ancho de banda", "带宽", "대역폭", "it_tech", "ot"),
    ("interface", "interfeys", "интерфейс", "Schnittstelle", "interface", "arayüz", "واجهة", "interfaz", "接口", "인터페이스", "it_tech", "ot"),
    ("protocol", "protokol / qoidalar to'plami", "протокол", "Protokoll", "protocole", "protokol", "بروتوكول", "protocolo", "协议", "프로토콜", "it_tech", "ot"),
    ("query", "so'rov", "запрос", "Abfrage", "requête", "sorgu", "استعلام", "consulta", "查询", "쿼리", "it_tech", "ot"),
    ("schema", "sxema / ma'lumotlar tuzilmasi", "схема", "Schema", "schéma", "şema", "مخطط", "esquema", "模式", "스키마", "it_tech", "ot"),
    ("syntax", "sintaksis / qoidalar", "синтаксис", "Syntax", "syntaxe", "sözdizimi", "بناء الجملة", "sintaxis", "句法", "구문", "it_tech", "ot"),

    # Business, Finance & Economics
    ("entrepreneur", "tadbirkor", "предприниматель", "Unternehmer", "entrepreneur", "girişimci", "رائد أعمال", "emprendedor", "企业家", "기업가", "business", "ot"),
    ("revenue", "daromad", "выручка", "Einnahmen", "revenu", "gelir", "إيرادات", "ingresos", "收入", "수익", "business", "ot"),
    ("profit margin", "foyda marjasi", "маржа прибыли", "Gewinnspanne", "marge bénéficiaire", "kar marjı", "هامش الربح", "margen de beneficio", "利润率", "이윤율", "business", "ot"),
    ("investment", "sarmoya / investitsiya", "инвестиция", "Investition", "investissement", "yatırım", "استثمار", "inversión", "投资", "투자", "business", "ot"),
    ("portfolio", "portfel / aktivlar to'plami", "портфель", "Portfolio", "portefeuille", "portföy", "محفظة استثمارية", "cartera", "投资组合", "포트폴리오", "business", "ot"),
    ("dividend", "dividend / foyda ulushi", "дивиденд", "Dividende", "dividende", "temettü", "توزيعات الأرباح", "dividendo", "股息", "배당금", "business", "ot"),
    ("acquisition", "sotib olish / qo'shib olish", "приобретение", "Übernahme", "acquisition", "satın alma", "استحواذ", "adquisición", "收购", "인수", "business", "ot"),
    ("merger", "birlashish / qo'shilish", "слияние", "Fusion", "fusion", "birleşme", "اندماج", "fusión", "合并", "합병", "business", "ot"),
    ("stakeholder", "manfaattor tomon", "заинтересованная сторона", "Interessengruppe", "partie prenante", "paydaş", "صاحب المصلحة", "parte interesada", "利益相关者", "이해관계자", "business", "ot"),
    ("liquidity", "likvidlik / to'lov qobiliyati", "ликвидность", "Liquidität", "liquidité", "likidite", "سيولة نقدية", "liquidez", "流动性", "유동성", "business", "ot"),
    ("inflation", "inflyatsiya / pul qadrsizlanishi", "инфляция", "Inflation", "inflation", "enflasyon", "تضخم اقتصادي", "inflación", "通货膨胀", "인플레이션", "business", "ot"),
    ("deflation", "deflyatsiya / narxlar tushishi", "дефляция", "Deflation", "déflation", "deflasyon", "انكماش مالي", "deflación", "通货紧缩", "디플레이션", "business", "ot"),
    ("negotiation", "muzokara", "переговоры", "Verhandlung", "négociation", "müzakere", "مفاوضات", "negociación", "谈判", "협상", "business", "ot"),
    ("partnership", "sheriklik / hamkorlik", "партнерство", "Partnerschaft", "partenariat", "ortaklık", "شراكة", "asociación", "合伙关系", "동반자 관계", "business", "ot"),
    ("contract", "shartnoma", "контракт", "Vertrag", "contrat", "sözleşme", "عقد", "contrato", "合同", "계약", "business", "ot"),
    ("monopoly", "monopoliya", "монополия", "Monopol", "monopole", "tekel", "احتكار", "monopolio", "垄断", "독점", "business", "ot"),
    ("benchmark", "etalon / mezon", "эталон", "Maßstab", "point de référence", "kıyaslama", "معيار القياس", "punto de referencia", "基准", "기준점", "business", "ot"),
    ("franchise", "franshiza", "франшиза", "Franchise", "franchise", "bayilik", "امتياز تجاري", "franquicia", "特许经营", "가맹점", "business", "ot"),
    ("audit", "audit / moliyaviy tekshiruv", "аудит", "Wirtschaftsprüfung", "audit", "denetim", "تدقيق حسابات", "auditoría", "审计", "감사", "business", "ot"),
    ("turnover", "aylanma mablag'", "товарооборот", "Umsatz", "chiffre d'affaires", "ciro", "دوران رأس المال", "rotación", "营业额", "회전율", "business", "ot"),

    # Health, Medicine & Psychology
    ("antibody", "antitanacha", "антитело", "Antikörper", "anticorps", "antikor", "جسم مضاد", "anticuerpo", "抗体", "항체", "health", "ot"),
    ("cardiovascular", "yurak-qon tomir", "сердечно-сосудистый", "kardiovaskulär", "cardiovasculaire", "kardiyovasküler", "قلبي وعائي", "cardiovascular", "心血管的", "심혈관의", "health", "sifat"),
    ("diagnosis", "tashxis", "диагноз", "Diagnose", "diagnostic", "teşhis", "تشخيص", "diagnóstico", "诊断", "진단", "health", "ot"),
    ("metabolism", "moddalar almashinuvi", "метаболизм", "Stoffwechsel", "métabolisme", "metabolizma", "تمثيل غذائي", "metabolismo", "新陈代谢", "신진대사", "health", "ot"),
    ("nutritious", "to'yimli / foydali", "питательный", "nahrhaft", "nutritif", "besleyici", "مغذي", "nutritivo", "有营养的", "영양가 있는", "health", "sifat"),
    ("prescription", "shifokor retsepti", "рецепт врача", "Rezept", "ordonnance", "reçete", "وصفة طبية", "receta médica", "处方", "처방전", "health", "ot"),
    ("rehabilitation", "sog'lomlashtirish / reabilitatsiya", "реабилитация", "Rehabilitation", "réhabilitation", "rehabilitasyon", "إعادة تأهيل", "rehabilitación", "康复", "재활", "health", "ot"),
    ("resilience", "bardoshlilik", "стойкость", "Widerstandskraft", "résilience", "dirençlilik", "مرونة نفسية", "resiliencia", "适应力", "회복력", "health", "ot"),
    ("sedentary", "kamharakat", "малоподвижный", "sitzend", "sédentaire", "hareketsiz", "قليل الحركة", "sedentario", "久坐的", "앉아서 일하는", "health", "sifat"),
    ("therapy", "muolaja / terapiya", "терапия", "Therapie", "thérapie", "terapi", "علاج", "terapia", "疗法", "치료", "health", "ot"),
    ("vaccination", "emlash / vaksina", "вакцинация", "Impfung", "vaccination", "aşılama", "تطعيم", "vacunación", "疫苗接种", "예방접종", "health", "ot"),
    ("well-being", "farovonlik / salomatlik", "благополучие", "Wohlbefinden", "bien-être", "esenlik", "صحة ورفاهية", "bienestar", "幸福", "안녕", "health", "ot"),
    ("chronic", "surunkali", "хронический", "chronisch", "chronique", "kronik", "مزمن", "crónico", "慢性的", "만성의", "health", "sifat"),
    ("epidemic", "yuqumli kasallik tarqalishi", "эпидемия", "Epidemie", "épidémie", "salgın", "وباء", "epidemia", "流行病", "전염병", "health", "ot"),
    ("symptom", "belgi / alomat", "симптом", "Symptom", "symptôme", "belirti", "عرض مرض", "síntoma", "症状", "증상", "health", "ot"),

    # Nature, Environment & Science
    ("biodiversity", "biologik xilma-xillik", "биоразнообразие", "Biodiversität", "biodiversité", "biyoçeşitlilik", "تنوع بيولوجي", "biodiversidad", "生物多样性", "생물다양성", "nature", "ot"),
    ("ecosystem", "ekotizim", "экосистема", "Ökosystem", "écosystème", "ekosistem", "نظام بيئي", "ecosistema", "生态系统", "생태계", "nature", "ot"),
    ("conservation", "tabiatni asrash", "охрана природы", "Naturschutz", "préservation", "koruma", "حماية البيئة", "conservación", "环境保护", "보존", "nature", "ot"),
    ("deforestation", "o'rmonlarning kesilishi", "вырубка лесов", "Entwaldung", "déforestation", "ormansızlaşma", "إزالة الغابات", "deforestación", "滥伐森林", "삼림벌채", "nature", "ot"),
    ("renewable", "qayta tiklanuvchi", "возобновляемый", "erneuerbar", "renouvelable", "yenilenebilir", "متجدد", "renovable", "可再生的", "재생 가능한", "nature", "sifat"),
    ("atmosphere", "atmosfera / havo qatlami", "атмосфера", "Atmosphäre", "atmosphère", "atmosfer", "غلاف جوي", "atmósfera", "大气层", "대기", "nature", "ot"),
    ("precipitation", "yog'ingarchilik", "осадки", "Niederschlag", "précipitation", "yağış", "هطول الأمطار", "precipitación", "降水", "강수량", "nature", "ot"),
    ("solar energy", "quyosh energiyasi", "солнечная энергия", "Solarenergie", "énergie solaire", "güneş enerjisi", "طاقة شمسية", "energía solar", "太阳能", "태양 에너지", "nature", "ot"),
    ("sustainable", "barqaror", "устойчивый", "nachhaltig", "durable", "sürdürülebilir", "مستدام", "sostenible", "可持续的", "지속 가능한", "nature", "sifat"),
    ("endangered", "yo'qolib borayotgan", "вымирающий", "vom Aussterben bedroht", "en voie de disparition", "nesli tükenmekte olan", "مهدد بالانقراض", "en peligro de extinción", "濒危的", "멸종 위기에 처한", "nature", "sifat"),
    ("greenhouse effect", "issiqxona effekti", "парниковый эффект", "Tibhauseffekt", "effet de serre", "sera etkisi", "احتباس حراري", "efecto invernadero", "温室效应", "온실 효과", "nature", "ot"),
    ("fossil fuels", "qazilma yoqilg'ilar", "ископаемое топливо", "fossile Brennstoffe", "combustibles fossiles", "fosil yakıtlar", "وقود أحفوري", "combustibles fósiles", "化石燃料", "화석 연료", "nature", "ot"),
    ("glacier", "muzlik", "ледник", "Gletscher", "glacier", "buzul", "نهر جليدي", "glaciar", "冰川", "빙하", "nature", "ot"),
    ("tributary", "irmoq / daryo irmog'i", "приток", "Nebenfluss", "affluent", "kol", "رافد النهر", "afluente", "支流", "지류", "nature", "ot"),
    ("volcano", "vulqon", "вулкан", "Vulkan", "volcan", "yanardağ", "بركان", "volcán", "火山", "화산", "nature", "ot"),

    # Travel & Geography
    ("boarding pass", "uchish taloni", "посадочный талон", "Bordkarte", "carte d'embarquement", "biniş kartı", "بطاقة صعود الطائرة", "tarjeta de embarque", "登机牌", "탑승권", "travel", "ot"),
    ("customs", "bojxona", "таможня", "Zoll", "douane", "gümrük", "جمارك", "aduana", "海关", "세관", "travel", "ot"),
    ("destination", "manzil / yetib borish joyi", "место назначения", "Reiseziel", "destination", "varış yeri", "وجهة الوصول", "destino", "目的地", "목적지", "travel", "ot"),
    ("itinerary", "sayohat yo'nalishi", "маршрут путешествия", "Reiseroute", "itinéraire", "seyahat planı", "مسار الرحلة", "itinerario", "旅行路线", "여행 일정", "travel", "ot"),
    ("luggage", "yuk / bagaj", "багаж", "Gepäck", "bagages", "bagaj", "أمتعة السفر", "equipaje", "行李", "수하물", "travel", "ot"),
    ("reservation", "oldindan buyurtma / bron", "бронирование", "Reservierung", "réservation", "rezervasyon", "حجز مسبق", "reserva", "预订", "예약", "travel", "ot"),
    ("sightseeing", "diqqatga sazovor joylarni tomosha qilish", "осмотр достопримечательностей", "Besichtigung", "visite touristique", "gezip görme", "مشاهدة المعالم", "turismo", "观光", "관광", "travel", "ot"),
    ("departure", "jo'nab ketish", "отправление", "Abflug", "départ", "kalkış", "مغادرة", "salida", "出发", "출발", "travel", "ot"),
    ("arrival", "yetib kelish", "прибытие", "Ankunft", "arrivée", "varış", "وصول", "llegada", "到达", "도착", "travel", "ot"),
    ("embassy", "elchixona", "посольство", "Botschaft", "ambassade", "elçilik", "سفارة", "embajada", "大使馆", "대사관", "travel", "ot"),
    ("consulate", "konsulxona", "консульство", "Konsulat", "consulat", "konsolosluk", "قنصلية", "consulado", "领事馆", "영사관", "travel", "ot"),
    ("monument", "yodgorlik / haykal", "памятник", "Denkmal", "monument", "anıt", "نصب تذكاري", "monumento", "纪念碑", "기념비", "travel", "ot"),

    # Culture, Arts & Society
    ("heritage", "madaniy meros", "наследие", "Kulturerbe", "patrimoine", "miras", "تراث ثقافي", "patrimonio", "遗产", "유산", "culture", "ot"),
    ("masterpiece", "shoh asar", "шедевр", "Meisterwerk", "chef-d'œuvre", "şaheser", "تحفة فنية", "obra maestra", "杰作", "명작", "culture", "ot"),
    ("folklore", "xalq og'zaki ijodi / folklor", "фольклор", "Folklore", "folklore", "halk bilimi", "فلكلور شعبي", "folclore", "民间传说", "민속", "culture", "ot"),
    ("exhibition", "ko'rgazma", "выставка", "Ausstellung", "exposition", "sergi", "معرض", "exhibición", "展览", "전시회", "culture", "ot"),
    ("architecture", "arxitektura / me'morchilik", "архитектура", "Architektur", "architecture", "mimari", "هندسة معمارية", "arquitectura", "建筑学", "건축", "culture", "ot"),
    ("civilization", "sivilizatsiya / tamaddun", "цивилизация", "Zivilisation", "civilisation", "uygarlık", "حضارة", "civilización", "文明", "문명", "culture", "ot"),
    ("democracy", "demokratiya", "демократия", "Demokratie", "démocratie", "demokrasi", "ديمقراطية", "democracia", "民主", "민주주의", "society", "ot"),
    ("legislation", "qonunchilik", "законодательство", "Gesetzgebung", "législation", "mevzuat", "تشريع قانوني", "legislación", "立法", "입법", "society", "ot"),
    ("jurisdiction", "sud yurisdiksiyasi", "юрисдикция", "Zuständigkeit", "juridiction", "yargı yetkisi", "اختصاص قضائي", "jurisdicción", "管辖权", "관할권", "society", "ot"),
    ("constitution", "konstitutsiya / bosh qonun", "конституция", "Verfassung", "constitution", "anayasa", "دستور", "constitución", "宪法", "헌법", "society", "ot"),
    ("human rights", "inson huquqlari", "права человека", "Menschenrechte", "droits de l'homme", "insan hakları", "حقوق الإنسان", "derechos humanos", "人权", "인권", "society", "ot"),
    ("citizenship", "fuqarolik", "гражданство", "Staatsbürgerschaft", "citoyenneté", "vatandaşlık", "مواطنة", "ciudadanía", "公民身份", "시민권", "society", "ot"),
    ("solidarity", "hamjihatlik", "солидарность", "Solidarität", "solidarité", "dayanışma", "تضامن", "solidaridad", "团结", "연대", "society", "ot"),
    ("integrity", "halollik / butunlik", "честность / целостность", "Integrität", "intégrité", "dürüstlük", "نزاهة", "integridad", "正直", "진실성", "society", "ot"),

    # Daily, Emotions & Common Verbs & Idioms
    ("accomplish", "muvaffaqiyatli bajarmoq", "выполнять", "vollbringen", "accomplir", "başarmak", "إنجاز", "lograr", "完成", "성취하다", "daily", "fe'l"),
    ("appreciate", "qadrlamoq", "ценить", "schätzen", "apprécier", "takdir etmek", "يقدر", "apreciar", "感激", "감사하다", "daily", "fe'l"),
    ("apologize", "uzr so'ramoq", "извиняться", "sich entschuldigen", "s'excuser", "özür dilemek", "اعتذر", "disculparse", "道歉", "사과하다", "daily", "fe'l"),
    ("collaborate", "hamkorlikda ishlamoq", "сотрудничать", "zusammenarbeiten", "collaborer", "birlikte çalışmak", "تعاون", "colaborar", "协作", "협력하다", "daily", "fe'l"),
    ("congratulate", "tabriklamoq", "поздравлять", "gratulieren", "féliciter", "tebrik etmek", "هنأ", "felicitar", "祝贺", "축하하다", "daily", "fe'l"),
    ("determine", "aniqlamoq / qaror qilmoq", "определять", "bestimmen", "déterminer", "belirlemek", "حدد", "determinar", "确定", "결정하다", "daily", "fe'l"),
    ("encourage", "ruhlandirmoq", "воодушевлять", "ermutigen", "encourager", "cesaretlendirmek", "شجع", "alentar", "鼓励", "격려하다", "daily", "fe'l"),
    ("fascinating", "juda qiziqarli", "захватывающий", "faszinierend", "fascinant", "büyüleyici", "رائع ومثير", "fascinante", "迷人的", "매혹적인", "daily", "sifat"),
    ("grateful", "minnatdor", "благодарный", "dankbar", "reconnaissant", "minnettar", "ممتن", "agradecido", "感激的", "감사하는", "daily", "sifat"),
    ("hesitate", "ikkilanmoq", "колебаться", "zögern", "hésiter", "tereddüt etmek", "تردد", "dudar", "犹豫", "망설이다", "daily", "fe'l"),
    ("inspire", "ilhomlantirmoq", "вдохновлять", "inspirieren", "inspirer", "ilham vermek", "ألهم", "inspirar", "鼓舞", "영감을 주다", "daily", "fe'l"),
    ("negotiate", "kelishmoq / muzokara qilmoq", "договариваться", "verhandeln", "négocier", "pazarlık yapmak", "فاوض", "negociar", "协商", "협상하다", "daily", "fe'l"),
    ("overcome", "yengib o'tmoq", "преодолевать", "überwinden", "surmonter", "üstesinden gelmek", "تغلب على", "superar", "克服", "극복하다", "daily", "fe'l"),
    ("perceive", "idrok etmoq / tushunmoq", "воспринимать", "wahrnehmen", "percevoir", "algılamak", "أدرك", "percibir", "感知", "인지하다", "daily", "fe'l"),
    ("prioritize", "birinchi o'ringa qo'ymoq", "ставить в приоритет", "priorisieren", "prioriser", "önceliklendirmek", "أعطى أولوية", "priorizar", "优先考虑", "우선시하다", "daily", "fe'l"),
    ("recommend", "tavsiya qilmoq", "рекомендовать", "empfehlen", "recommander", "tavsiye etmek", "أوصى", "recomendar", "推荐", "추천하다", "daily", "fe'l"),
    ("struggle", "kurashmoq / qiynalmoq", "бороться", "kämpfen", "lutter", "çabalamak", "كفاح", "luchar", "挣扎", "분투하다", "daily", "fe'l"),
    ("transform", "o'zgartirmoq / tubdan yangilamoq", "трансформировать", "verwandeln", "transformer", "dönüştürmek", "حول", "transformar", "转变", "변화시키다", "daily", "fe'l"),
    ("understandable", "tushunarli", "понятный", "verständlich", "compréhensible", "anlaşılır", "مفهوم", "comprensible", "可以理解的", "이해할 수 있는", "daily", "sifat"),
    ("worthwhile", "arziydigan", "стоящий", "lohnend", "valable", "zahmete değer", "يستحق العناء", "que vale la pena", "值得的", "가치 있는", "daily", "sifat"),

    # Food, Kitchen & Dining
    ("appetizer", "ishtahaochar taom", "закуска", "Vorspeise", "entrée", "iştah açıcı", "مقبلات", "aperitivo", "开胃菜", "에피타이저", "food", "ot"),
    ("beverage", "ichimlik", "напиток", "Getränk", "boisson", "içecek", "مشروب", "bebida", "饮料", "음료", "food", "ot"),
    ("cuisine", "milliy oshxona", "кухня", "Küche", "cuisine", "mutfak", "مطبخ", "cocina", "美食", "요리", "food", "ot"),
    ("delicacy", "nodir taom / tansiq ovqat", "деликатес", "Delikatesse", "délice", "lezzet", "طعام شهي", "manjar", "佳肴", "진미", "food", "ot"),
    ("flavor", "ta'm va hid", "вкус и аромат", "Geschmack", "saveur", "lezzet", "نكهة", "sabor", "风味", "풍미", "food", "ot"),
    ("ingredient", "tarkibiy masalliq", "ингредиент", "Zutat", "ingrédient", "malzeme", "مكون غذائي", "ingrediente", "配料", "재료", "food", "ot"),
    ("organic", "tabiiy / organik", "органический", "biologisch", "biologique", "organik", "عضوي", "orgánico", "有机的", "유기농의", "food", "sifat"),
    ("recipe", "taom retsepti", "рецепт приготовления", "Rezept", "recette", "yemek tarifi", "وصفة طعام", "receta", "食谱", "요리법", "food", "ot"),
    ("seasoning", "ziravorlar", "приправа", "Gewürz", "assaisonnement", "çeşni", "توابل", "condimento", "调味料", "양념", "food", "ot"),
    ("vegetarian", "go'shtsiz ovqatlanuvchi", "вегетарианский", "vegetarisch", "végétarien", "vejetaryen", "نباتي", "vegetariano", "素食者", "채식주의자", "food", "sifat"),
]

# Write a dedicated builder that compiles comprehensive dictionaries programmatically
# to reach > 5000 total words!
with open('scripts/build_full_db.py', 'w', encoding='utf-8') as f_out:
    f_out.write('''# Auto-generated full database builder
import json
import re

with open('src/data/translator/translatorDb.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

existing_en = set((e['translations']['en'] or '').strip().lower() for e in db)
print(f"Starting with {len(db)} entries")

# Comprehensive word expansions across multiple domains
# Each domain has rich vocabulary items
domains = {
    "education": [
        ("academic", "ilmiy / akademik", "академический", "akademisch", "académique", "akademik", "أكاديمي", "académico", "学术的", "학술의", "sifat"),
        ("comprehension", "matnni tushunish", "понимание", "Verständnis", "compréhension", "kavrama", "استيعاب", "comprensión", "理解", "이해력", "ot"),
        ("dissertation", "ilmiy ish / dissertatsiya", "диссертация", "Dissertation", "thèse", "tez", "أطروحة", "disertación", "论文", "논문", "ot"),
        ("methodology", "tadqiqot usullari", "методология", "Methodik", "méthodologie", "metodoloji", "منهجية", "metodología", "方法论", "방법론", "ot"),
        ("citation", "iqtibos keltirish", "цитирование", "Zitierung", "citation", "atıf", "اقتباس", "cita", "引用", "인용", "ot"),
        ("hypothesis", "ilmiy faraz", "гипотеза", "Hypothese", "hypothèse", "hipotez", "فرضية", "hipótesis", "假设", "가설", "ot"),
        ("curriculum", "ta'lim dasturi", "учебный план", "Lehrplan", "programme", "müfredat", "منهج", "currículo", "课程", "커리큘럼", "ot"),
        ("evaluation", "baholash jarayoni", "оценивание", "Bewertung", "évaluation", "değerlendirme", "تقييم", "evaluación", "评估", "평가", "ot"),
        ("pedagogy", "pedagogika ilmi", "педагогика", "Pädagogik", "pédagogie", "pedagoji", "علم التربية", "pedagogía", "教育学", "교육학", "ot"),
        ("faculty", "fakultet / professor-o'qituvchilar", "факультет", "Fakultät", "faculté", "fakülte", "كلية", "facultad", "学院", "학부", "ot"),
    ]
}
''')
print("Helper created")
