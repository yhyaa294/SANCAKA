// Data kuis untuk berbagai kategori aksara Jawa
const quizConfig = {
  totalQuestions: 5,
  shuffleQuestions: true,
};

// Kategori Dasar (Hanacaraka) - menggunakan file yang ada
const dasarQuestions = [
  { 
    latin: 'Ha', 
    description: 'Aksara dasar "Ha".', 
    image: 'assets/Javanese_script_-_Ha.png', 
    sound: null,
    lookAlikes: ['Ra', 'Pa', 'Ya']
  },
  { 
    latin: 'Na', 
    description: 'Aksara dasar "Na".', 
    image: 'assets/Javanese_script_-_Na.png', 
    sound: null,
    lookAlikes: ['Ma', 'Ga', 'Ba']
  },
  { 
    latin: 'Ca', 
    description: 'Aksara dasar "Ca".', 
    image: 'assets/Javanese_script_-_Ca.png', 
    sound: null,
    lookAlikes: ['Ja', 'Nya', 'Sa']
  },
  { 
    latin: 'Ra', 
    description: 'Aksara dasar "Ra".', 
    image: 'assets/Javanese_script_-_Ra.png', 
    sound: null,
    lookAlikes: ['La', 'Pa', 'Ya']
  },
  { 
    latin: 'Ka', 
    description: 'Aksara dasar "Ka".', 
    image: 'assets/Javanese_script_-_Ka.png', 
    sound: null,
    lookAlikes: ['Ga', 'Ba', 'Sa']
  },
  { 
    latin: 'Da', 
    description: 'Aksara dasar "Da".', 
    image: 'assets/Javanese_script_-_Da.png', 
    sound: null,
    lookAlikes: ['Wa', 'Sa', 'Ta']
  },
  { 
    latin: 'Ta', 
    description: 'Aksara dasar "Ta".', 
    image: 'assets/Javanese_script_-_Ta.png', 
    sound: null,
    lookAlikes: ['Da', 'Tha', 'Sa']
  },
  { 
    latin: 'Sa', 
    description: 'Aksara dasar "Sa".', 
    image: 'assets/Javanese_script_-_Sa.png', 
    sound: null,
    lookAlikes: ['Ca', 'Nya', 'Da']
  },
  { 
    latin: 'Wa', 
    description: 'Aksara dasar "Wa".', 
    image: 'assets/Javanese_script_-_Wa.png', 
    sound: null,
    lookAlikes: ['Da', 'Ta', 'La']
  },
  { 
    latin: 'La', 
    description: 'Aksara dasar "La".', 
    image: 'assets/Javanese_script_-_La.png', 
    sound: null,
    lookAlikes: ['Ra', 'Pa', 'Ya']
  },
  { 
    latin: 'Pa', 
    description: 'Aksara dasar "Pa".', 
    image: 'assets/Javanese_script_-_Pa.png', 
    sound: null,
    lookAlikes: ['Ba', 'Ga', 'Ra']
  },
  { 
    latin: 'Dha', 
    description: 'Aksara dasar "Dha".', 
    image: 'assets/Javanese_script_-_Dha.png', 
    sound: null,
    lookAlikes: ['Da', 'Tha', 'Ta']
  },
  { 
    latin: 'Ja', 
    description: 'Aksara dasar "Ja".', 
    image: 'assets/Javanese_script_-_Ja.png', 
    sound: null,
    lookAlikes: ['Ca', 'Nya', 'Ya']
  },
  { 
    latin: 'Ya', 
    description: 'Aksara dasar "Ya".', 
    image: 'assets/Javanese_script_-_Ya.png', 
    sound: null,
    lookAlikes: ['La', 'Ra', 'Ja']
  },
  { 
    latin: 'Nya', 
    description: 'Aksara dasar "Nya".', 
    image: 'assets/Javanese_script_-_Nya.png', 
    sound: null,
    lookAlikes: ['Ca', 'Ja', 'Sa']
  },
  { 
    latin: 'Ma', 
    description: 'Aksara dasar "Ma".', 
    image: 'assets/Javanese_script_-_Ma.png', 
    sound: null,
    lookAlikes: ['Na', 'Ga', 'Ba']
  },
  { 
    latin: 'Ga', 
    description: 'Aksara dasar "Ga".', 
    image: 'assets/Javanese_script_-_Ga.png', 
    sound: null,
    lookAlikes: ['Ka', 'Ba', 'Pa']
  },
  { 
    latin: 'Ba', 
    description: 'Aksara dasar "Ba".', 
    image: 'assets/Javanese_script_-_Ba.png', 
    sound: null,
    lookAlikes: ['Pa', 'Ga', 'Ma']
  },
  { 
    latin: 'Tha', 
    description: 'Aksara dasar "Tha".', 
    image: 'assets/Javanese_script_-_Tha.png', 
    sound: null,
    lookAlikes: ['Ta', 'Da', 'Dha']
  },
  { 
    latin: 'Nga', 
    description: 'Aksara dasar "Nga".', 
    image: 'assets/Javanese_script_-_Nga.png', 
    sound: null,
    lookAlikes: ['Na', 'Ma', 'Ga']
  }
];

// Kategori Murda - menggunakan file yang ada dengan format yang sesuai
const murdaQuestions = [
  { 
    latin: 'Murda Ba', 
    description: 'Aksara murda "Ba".', 
    image: 'assets/aksara murda/Aksara-murda-ba.png', 
    sound: null,
    lookAlikes: ['Ba', 'Pa', 'Ma']
  },
  { 
    latin: 'Murda Ga', 
    description: 'Aksara murda "Ga".', 
    image: 'assets/aksara murda/Aksara-murda-ga.png', 
    sound: null,
    lookAlikes: ['Ga', 'Ka', 'Ba']
  },
  { 
    latin: 'Murda Ka', 
    description: 'Aksara murda "Ka".', 
    image: 'assets/aksara murda/Aksara-murda-ka.png', 
    sound: null,
    lookAlikes: ['Ka', 'Ga', 'Ba']
  },
  { 
    latin: 'Murda Na', 
    description: 'Aksara murda "Na".', 
    image: 'assets/aksara murda/Aksara-murda-na.png', 
    sound: null,
    lookAlikes: ['Na', 'Ma', 'Ga']
  },
  { 
    latin: 'Murda Nja', 
    description: 'Aksara murda "Nja".', 
    image: 'assets/aksara murda/Aksara-murda-nja.png', 
    sound: null,
    lookAlikes: ['Nya', 'Ja', 'Ca']
  },
  { 
    latin: 'Murda Pa', 
    description: 'Aksara murda "Pa".', 
    image: 'assets/aksara murda/Aksara-murda-pa.png', 
    sound: null,
    lookAlikes: ['Pa', 'Ba', 'Ma']
  },
  { 
    latin: 'Murda Sa', 
    description: 'Aksara murda "Sa".', 
    image: 'assets/aksara murda/Aksara-murda-sa.png', 
    sound: null,
    lookAlikes: ['Sa', 'Ca', 'Nya']
  },
  { 
    latin: 'Murda Sha', 
    description: 'Aksara murda "Sha".', 
    image: 'assets/aksara murda/Aksara-murda-sha.png', 
    sound: null,
    lookAlikes: ['Sa', 'Sha', 'Nya']
  },
  { 
    latin: 'Murda Ta', 
    description: 'Aksara murda "Ta".', 
    image: 'assets/aksara murda/Aksara-murda-ta.png', 
    sound: null,
    lookAlikes: ['Ta', 'Da', 'Tha']
  }
];

// Kategori Pasangan - menggunakan file yang ada dengan format yang sesuai
const pasanganQuestions = [
  { 
    latin: 'Pasangan Ba', 
    description: 'Aksara pasangan "Ba".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ba-nglegena.png', 
    sound: null,
    lookAlikes: ['Ba', 'Pa', 'Ma']
  },
  { 
    latin: 'Pasangan Ca', 
    description: 'Aksara pasangan "Ca".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ca-nglegena.png', 
    sound: null,
    lookAlikes: ['Ca', 'Ja', 'Nya']
  },
  { 
    latin: 'Pasangan Da', 
    description: 'Aksara pasangan "Da".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-da-nglegena.png', 
    sound: null,
    lookAlikes: ['Da', 'Ta', 'Tha']
  },
  { 
    latin: 'Pasangan Dha', 
    description: 'Aksara pasangan "Dha".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-dha-nglegena.png', 
    sound: null,
    lookAlikes: ['Dha', 'Da', 'Tha']
  },
  { 
    latin: 'Pasangan Ga', 
    description: 'Aksara pasangan "Ga".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ga-nglegena.png', 
    sound: null,
    lookAlikes: ['Ga', 'Ka', 'Ba']
  },
  { 
    latin: 'Pasangan Ha', 
    description: 'Aksara pasangan "Ha".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ha-nglegena.png', 
    sound: null,
    lookAlikes: ['Ha', 'Ra', 'Pa']
  },
  { 
    latin: 'Pasangan Ja', 
    description: 'Aksara pasangan "Ja".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ja-nglegena.png', 
    sound: null,
    lookAlikes: ['Ja', 'Ca', 'Nya']
  },
  { 
    latin: 'Pasangan Ka', 
    description: 'Aksara pasangan "Ka".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ka-nglegena.png', 
    sound: null,
    lookAlikes: ['Ka', 'Ga', 'Ba']
  },
  { 
    latin: 'Pasangan La', 
    description: 'Aksara pasangan "La".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-la-nglegena.png', 
    sound: null,
    lookAlikes: ['La', 'Ra', 'Ya']
  },
  { 
    latin: 'Pasangan Ma', 
    description: 'Aksara pasangan "Ma".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ma-nglegena.png', 
    sound: null,
    lookAlikes: ['Ma', 'Na', 'Ga']
  },
  { 
    latin: 'Pasangan Na', 
    description: 'Aksara pasangan "Na".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-na-nglegena.png', 
    sound: null,
    lookAlikes: ['Na', 'Ma', 'Ga']
  },
  { 
    latin: 'Pasangan Nga', 
    description: 'Aksara pasangan "Nga".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-nga-nglegena.png', 
    sound: null,
    lookAlikes: ['Nga', 'Na', 'Ma']
  },
  { 
    latin: 'Pasangan Nya', 
    description: 'Aksara pasangan "Nya".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-nya-nglegena.png', 
    sound: null,
    lookAlikes: ['Nya', 'Ca', 'Ja']
  },
  { 
    latin: 'Pasangan Pa', 
    description: 'Aksara pasangan "Pa".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-pa-nglegena.png', 
    sound: null,
    lookAlikes: ['Pa', 'Ba', 'Ma']
  },
  { 
    latin: 'Pasangan Ra', 
    description: 'Aksara pasangan "Ra".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ra-nglegena.png', 
    sound: null,
    lookAlikes: ['Ra', 'La', 'Ya']
  },
  { 
    latin: 'Pasangan Sa', 
    description: 'Aksara pasangan "Sa".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-sa-nglegena.png', 
    sound: null,
    lookAlikes: ['Sa', 'Ca', 'Nya']
  },
  { 
    latin: 'Pasangan Ta', 
    description: 'Aksara pasangan "Ta".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ta-nglegena.png', 
    sound: null,
    lookAlikes: ['Ta', 'Da', 'Tha']
  },
  { 
    latin: 'Pasangan Tha', 
    description: 'Aksara pasangan "Tha".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-tha-nglegena.png', 
    sound: null,
    lookAlikes: ['Tha', 'Ta', 'Da']
  },
  { 
    latin: 'Pasangan Wa', 
    description: 'Aksara pasangan "Wa".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-wa-nglegena.png', 
    sound: null,
    lookAlikes: ['Wa', 'Da', 'Ta']
  },
  { 
    latin: 'Pasangan Ya', 
    description: 'Aksara pasangan "Ya".', 
    image: 'assets/Pasangan aksara/Aksara-jawa-pasangan-ya-nglegena.png', 
    sound: null,
    lookAlikes: ['Ya', 'La', 'Ra']
  }
];

// Kategori Sandangan - menggunakan file yang ada dengan format yang sesuai
const sandanganQuestions = [
  { 
    latin: 'Sandangan Cakra', 
    description: 'Sandangan Cakra.', 
    image: 'assets/sandangan/Sandangan_cakra.png', 
    sound: null,
    lookAlikes: ['Sandangan Keret', 'Sandangan Layar', 'Sandangan Pengkal']
  },
  { 
    latin: 'Sandangan Cecak', 
    description: 'Sandangan Cecak.', 
    image: 'assets/sandangan/Sandangan_cecak.png', 
    sound: null,
    lookAlikes: ['Sandangan Pangkon', 'Sandangan Wignyan', 'Sandangan Panjingan']
  },
  { 
    latin: 'Sandangan Dirga Mure', 
    description: 'Sandangan Dirga Mure.', 
    image: 'assets/sandangan/Sandangan_dirga_mure.png', 
    sound: null,
    lookAlikes: ['Sandangan Taling', 'Sandangan Pepet', 'Sandangan Wulu']
  },
  { 
    latin: 'Sandangan Keret', 
    description: 'Sandangan Keret.', 
    image: 'assets/sandangan/Sandangan_keret.png', 
    sound: null,
    lookAlikes: ['Sandangan Cakra', 'Sandangan Layar', 'Sandangan Pengkal']
  },
  { 
    latin: 'Sandangan Layar', 
    description: 'Sandangan Layar.', 
    image: 'assets/sandangan/Sandangan_layar.png', 
    sound: null,
    lookAlikes: ['Sandangan Cakra', 'Sandangan Keret', 'Sandangan Pengkal']
  },
  { 
    latin: 'Sandangan Pangkon', 
    description: 'Sandangan Pangkon.', 
    image: 'assets/sandangan/Sandangan_pangkon.png', 
    sound: null,
    lookAlikes: ['Sandangan Cecak', 'Sandangan Wignyan', 'Sandangan Panjingan']
  },
  { 
    latin: 'Sandangan Pengkal', 
    description: 'Sandangan Pengkal.', 
    image: 'assets/sandangan/Sandangan_pengkal.png', 
    sound: null,
    lookAlikes: ['Sandangan Cakra', 'Sandangan Keret', 'Sandangan Layar']
  },
  { 
    latin: 'Sandangan Pepet', 
    description: 'Sandangan Pepet.', 
    image: 'assets/sandangan/Sandangan_pepet.png', 
    sound: null,
    lookAlikes: ['Sandangan Taling', 'Sandangan Dirga Mure', 'Sandangan Wulu']
  },
  { 
    latin: 'Sandangan Suku', 
    description: 'Sandangan Suku.', 
    image: 'assets/sandangan/Sandangan_suku.png', 
    sound: null,
    lookAlikes: ['Sandangan Wulu', 'Sandangan Taling', 'Sandangan Pepet']
  },
  { 
    latin: 'Sandangan Taling', 
    description: 'Sandangan Taling.', 
    image: 'assets/sandangan/Sandangan_taling.png', 
    sound: null,
    lookAlikes: ['Sandangan Dirga Mure', 'Sandangan Pepet', 'Sandangan Wulu']
  },
  { 
    latin: 'Sandangan Wignyan', 
    description: 'Sandangan Wignyan.', 
    image: 'assets/sandangan/Sandangan_wignyan.png', 
    sound: null,
    lookAlikes: ['Sandangan Cecak', 'Sandangan Pangkon', 'Sandangan Panjingan']
  },
  { 
    latin: 'Sandangan Wulu', 
    description: 'Sandangan Wulu.', 
    image: 'assets/sandangan/Sandangan_wulu.png', 
    sound: null,
    lookAlikes: ['Sandangan Suku', 'Sandangan Taling', 'Sandangan Pepet']
  }
];

// Struktur data kuis berdasarkan kategori
const quizCategories = {
  dasar: {
    name: "Hanacaraka Dasar",
    questions: dasarQuestions
  },
  murda: {
    name: "Aksara Murda",
    questions: murdaQuestions
  },
  pasangan: {
    name: "Pasangan Aksara",
    questions: pasanganQuestions
  },
  sandangan: {
    name: "Sandangan",
    questions: sandanganQuestions
  }
};

// Expose to global for app.js consumption
window.QUIZ_CONFIG = quizConfig;
window.QUIZ_CATEGORIES = quizCategories;