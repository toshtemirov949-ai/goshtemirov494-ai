# -*- coding: utf-8 -*-
"""
1,000 Authentic English Words:
200 A1, 200 A2, 200 B1, 200 B2, 200 C1
All words are 100% real, standard English words.
"""

A1_WORDS = [
    # 200 words
    "hello", "goodbye", "please", "thank you", "welcome", "yes", "no", "name", "friend", "family",
    "father", "mother", "brother", "sister", "son", "daughter", "child", "parents", "baby", "people",
    "man", "woman", "boy", "girl", "teacher", "student", "doctor", "school", "class", "book",
    "pen", "pencil", "paper", "notebook", "table", "chair", "desk", "window", "door", "bed",
    "room", "house", "home", "kitchen", "apartment", "wall", "floor", "phone", "computer", "clock",
    "water", "tea", "coffee", "milk", "bread", "butter", "cheese", "egg", "meat", "chicken",
    "fish", "rice", "soup", "salad", "apple", "banana", "orange", "lemon", "grape", "fruit",
    "vegetable", "potato", "tomato", "carrot", "onion", "sugar", "salt", "breakfast", "lunch", "dinner",
    "food", "drink", "cup", "plate", "glass", "fork", "knife", "spoon", "bottle", "restaurant",
    "time", "day", "night", "morning", "afternoon", "evening", "today", "tomorrow", "yesterday", "week",
    "month", "year", "hour", "minute", "second", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday", "Sunday", "spring", "summer", "autumn", "winter", "sun", "moon", "star", "sky",
    "rain", "snow", "wind", "cloud", "weather", "hot", "cold", "warm", "cool", "clean",
    "red", "blue", "green", "yellow", "black", "white", "orange", "pink", "purple", "brown",
    "grey", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "twenty", "hundred", "thousand", "first", "second", "third", "number",
    "big", "small", "good", "bad", "happy", "sad", "new", "old", "young", "fast",
    "slow", "easy", "hard", "busy", "rich", "poor", "tall", "short", "heavy", "light",
    "car", "bus", "train", "bicycle", "plane", "street", "road", "city", "town", "country",
    "world", "sea", "river", "tree", "flower", "park", "garden", "animal", "dog", "cat"
]

A2_WORDS = [
    # 200 words
    "airport", "ticket", "suitcase", "luggage", "passport", "flight", "terminal", "platform", "railway", "passenger",
    "tourist", "journey", "trip", "travel", "vacation", "holiday", "hotel", "reception", "reservation", "guest",
    "key", "elevator", "cafe", "bakery", "supermarket", "groceries", "pharmacy", "medicine", "hospital", "nurse",
    "dentist", "patient", "health", "fever", "headache", "bandage", "ambulance", "police", "station", "officer",
    "bank", "cash", "credit card", "wallet", "post office", "envelope", "stamp", "museum", "theater", "cinema",
    "concert", "stadium", "match", "player", "team", "coach", "sport", "football", "tennis", "swimming",
    "gym", "exercise", "traffic", "accident", "subway", "taxi", "bridge", "corner", "square", "neighborhood",
    "office", "colleague", "meeting", "manager", "salary", "career", "profession", "engineer", "driver", "pilot",
    "lawyer", "accountant", "architect", "mechanic", "electrician", "uniform", "jacket", "sweater", "trousers", "skirt",
    "boots", "socks", "gloves", "scarf", "umbrella", "sunglasses", "watch", "jewelry", "ring", "necklace",
    "furniture", "sofa", "mirror", "lamp", "carpet", "curtain", "fridge", "oven", "stove", "sink",
    "shower", "towel", "soap", "shampoo", "brush", "blanket", "pillow", "balcony", "roof", "garage",
    "forest", "mountain", "hill", "lake", "ocean", "island", "beach", "sand", "desert", "nature",
    "hobby", "guitar", "piano", "camera", "photo", "painting", "drawing", "exhibition", "festival", "celebration",
    "party", "invitation", "gift", "surprise", "birthday", "safety", "danger", "rule", "advice", "decision",
    "tired", "hungry", "thirsty", "angry", "bored", "excited", "nervous", "afraid", "careful", "polite",
    "arrive", "leave", "depart", "return", "remember", "forget", "describe", "explain", "understand", "spend",
    "choose", "prefer", "receive", "send", "borrow", "lend", "prepare", "decide", "continue", "finish",
    "begin", "follow", "change", "try", "move", "stay", "wait", "call", "meet", "invite",
    "celebrate", "repair", "clean", "wash", "wear", "carry", "cook", "bake", "taste", "smell"
]

B1_WORDS = [
    # 200 words
    "education", "knowledge", "skill", "ability", "experience", "opportunity", "development", "improvement", "progress", "success",
    "failure", "achievement", "goal", "target", "purpose", "ambition", "challenge", "solution", "problem", "method",
    "system", "process", "result", "effect", "impact", "cause", "reason", "opinion", "argument", "discussion",
    "debate", "agreement", "decision", "choice", "difference", "similarity", "advantage", "disadvantage", "benefit", "risk",
    "society", "community", "culture", "tradition", "custom", "citizen", "government", "law", "rule", "freedom",
    "justice", "equality", "respect", "honesty", "trust", "friendship", "relationship", "marriage", "generation", "youth",
    "neighbor", "population", "security", "peace", "conflict", "volunteer", "charity", "donation", "support", "cooperation",
    "media", "internet", "website", "application", "software", "network", "device", "screen", "message", "communication",
    "information", "news", "article", "interview", "journalism", "broadcast", "advertising", "audience", "entertainment", "podcast",
    "platform", "connection", "digital", "virtual", "online", "privacy", "security", "innovation", "discovery", "invention",
    "business", "company", "enterprise", "industry", "market", "economy", "finance", "budget", "investment", "profit",
    "cost", "price", "customer", "client", "service", "product", "quality", "quantity", "contract", "agreement",
    "negotiation", "strategy", "management", "leadership", "employee", "employer", "colleague", "interview", "resume", "qualification",
    "confidence", "patience", "courage", "curiosity", "creativity", "intelligence", "generous", "independent", "ambitious", "reliable",
    "optimistic", "pessimistic", "sensitive", "sensible", "enthusiastic", "determined", "anxious", "satisfied", "disappointed", "embarrassed",
    "environment", "nature", "climate", "pollution", "resource", "energy", "protection", "conservation", "wildlife", "planet",
    "diet", "nutrition", "fitness", "workout", "prevention", "treatment", "recovery", "symptom", "illness", "infection",
    "celebration", "atmosphere", "destination", "reservation", "invitation", "appearance", "impression", "attitude", "behavior", "complaint",
    "consequence", "flexibility", "generosity", "friendship", "happiness", "hospitality", "imagination", "motivation", "personality", "reputation",
    "achieve", "improve", "develop", "encourage", "support", "influence", "participate", "contribute", "organize", "manage"
]

B2_WORDS = [
    # 200 words
    "hypothesis", "methodology", "infrastructure", "perspective", "demonstrate", "facilitate", "sustainable", "resilient", "equitable", "substantial",
    "comprehensive", "preliminary", "phenomenon", "fundamental", "inevitable", "cooperation", "distinction", "emphasis", "evaluate", "evidence",
    "implication", "initiative", "legitimate", "maintenance", "mutual", "negotiate", "precision", "priority", "profound", "prominent",
    "proportion", "prospective", "rational", "remarkable", "resolution", "sophisticated", "spontaneous", "sufficient", "synthesize", "versatile",
    "acquisition", "allegation", "ambiguity", "assessment", "assumption", "awareness", "benchmark", "capability", "cohesion", "compensation",
    "competence", "compliance", "compromise", "consensus", "consequence", "contemporary", "controversy", "correlation", "criterion", "deficit",
    "delegation", "dimension", "discretion", "diversity", "efficiency", "eliminate", "encounter", "endorsement", "enhancement", "establishment",
    "ethical", "expertise", "feasibility", "fluctuation", "formulate", "framework", "governance", "hierarchy", "implementation", "incentive",
    "incorporate", "indication", "inherent", "insight", "integration", "integrity", "intervention", "justification", "legislation", "leverage",
    "manifestation", "manipulate", "marginal", "modification", "monopoly", "motivation", "negligence", "neutrality", "obligation", "orientation",
    "paradox", "parameter", "perception", "perseverance", "plausible", "pragmatic", "precaution", "predominant", "presumption", "productivity",
    "proliferation", "proposition", "prosperity", "protocol", "qualification", "questionnaire", "random", "reconciliation", "redundant", "refinement",
    "reinforce", "relevance", "reluctance", "remedy", "restriction", "retention", "revenue", "rigorous", "scrutiny", "segmentation",
    "simultaneous", "solidarity", "speculate", "stagnation", "stimulus", "subsequent", "subsidy", "supplement", "suppress", "surveillance",
    "tangible", "tariff", "threshold", "tolerance", "trajectory", "transformation", "transmission", "transparency", "uncertainty", "undergo",
    "undertake", "uniformity", "unprecedented", "validity", "variable", "variation", "viability", "vulnerable", "welfare", "yield",
    "abundant", "accurate", "adequate", "advocate", "aggregate", "allocate", "analogy", "anticipate", "coherent", "collaborate",
    "compatible", "compound", "concurrent", "conform", "constitute", "constrain", "contradict", "deduce", "denote", "deviate",
    "differentiate", "diminish", "discrete", "displace", "distort", "empirical", "equate", "erode", "explicit", "fluctuate",
    "identical", "implicit", "induce", "intrinsic", "invoke", "mediate", "modify", "offset", "precede", "reinforce"
]

C1_WORDS = [
    # 200 words
    "quintessential", "serendipity", "eloquence", "ubiquitous", "paradigm", "dichotomy", "esoteric", "ephemeral", "perspicacious", "rhetoric",
    "aberration", "adversarial", "advocate", "alleviate", "allocate", "aloof", "ameliorate", "anachronistic", "anticipate", "apprehend",
    "articulate", "ascertain", "aspiration", "augment", "authentic", "autonomous", "benevolent", "capricious", "catalyst", "chronicle",
    "collaborate", "colloquial", "commend", "compatible", "concise", "condescend", "conundrum", "converge", "corroborate", "culminate",
    "daunting", "delineate", "derive", "differentiate", "diminish", "disparity", "disseminate", "emulate", "encompass", "endorse",
    "epitome", "erudite", "exacerbate", "exemplary", "expedite", "formidable", "fortuitous", "foster", "futile", "galvanize",
    "germane", "grandiose", "hackneyed", "haphazard", "hierarchy", "homogeneous", "hyperbole", "idiosyncratic", "imminent", "immutable",
    "impartial", "impeccable", "imperative", "impetus", "impromptu", "inadvertent", "incessant", "incisive", "incongruous", "indolent",
    "ineffable", "infallible", "ingenious", "ingenuous", "inhibit", "innocuous", "inordinate", "insatiable", "insidious", "insinuate",
    "insolent", "instigate", "insular", "integral", "intelligible", "intermittent", "intractable", "intrepid", "intrinsic", "invigorate",
    "irrevocable", "judicious", "juxtaposition", "kinship", "laconic", "laudable", "lucid", "magnanimous", "malevolent", "malleable",
    "manifest", "meticulous", "mitigate", "modicum", "morose", "multifarious", "myriad", "negligible", "neophyte", "nonchalant",
    "notorious", "novice", "nuance", "obdurate", "obfuscate", "oblivious", "obscure", "obsequious", "obstinate", "ominous",
    "onerous", "opaque", "opportunistic", "optimum", "opulent", "orthodox", "oscillate", "ostentatious", "pacify", "palpable",
    "panacea", "panache", "paucity", "pedantic", "peerless", "penchant", "pensive", "penury", "perennial", "perfunctory",
    "peripheral", "pernicious", "perpetuate", "pertinent", "pervasive", "petulant", "placid", "platitude", "plethora", "poignant",
    "pragmatic", "precarious", "precocious", "predilection", "premonition", "presumptuous", "pristine", "prodigious", "prolific", "propensity",
    "provincial", "prudent", "pugnacious", "punctilious", "quagmire", "quandary", "quell", "querulous", "quixotic", "rancor",
    "rapacious", "recalcitrant", "recondite", "redolent", "remonstrate", "reprobate", "repudiate", "rescind", "resplendent", "reticent",
    "reverent", "sagacious", "salient", "salutary", "sanctimonious", "sanguine", "scintillating", "scrupulous", "sedentary", "seraphic"
]
