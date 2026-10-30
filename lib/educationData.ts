import { QuestionItem, SuggestionTopic, PreviousYearExam, UserProfile } from '@/types/education';

export const INITIAL_USER: UserProfile = {
  name: 'Md. Rakibul Hasan',
  email: 'rakib.edu.bd@gmail.com',
  subject: 'Computer Science & ICT',
  thana: 'Dhanmondi, Dhaka',
  collegeName: 'Dhaka College, Dhaka',
  isAuthenticated: true
};

export const SAMPLE_QUESTIONS: QuestionItem[] = [
  {
    id: 'q-1',
    questionText: 'কোন প্রজন্মের কম্পিউটারে প্রথম ইন্টিগ্রেটেড সার্কিট (IC) ব্যবহার করা হয়?',
    questionTextBn: 'In which computer generation were Integrated Circuits (ICs) first introduced?',
    subject: 'ICT',
    chapter: 'কম্পিউটার সংগঠন ও মেমরি',
    options: [
      { id: 'opt-a', text: 'প্রথম প্রজন্ম (1st Generation)' },
      { id: 'opt-b', text: 'দ্বিতীয় প্রজন্ম (2nd Generation)' },
      { id: 'opt-c', text: 'তৃতীয় প্রজন্ম (3rd Generation)' },
      { id: 'opt-d', text: 'চতুর্থ প্রজন্ম (4th Generation)' }
    ],
    correctOptionId: 'opt-c',
    explanation: 'তৃতীয় প্রজন্মের কম্পিউটারে (১৯৬৫–১৯৭১) ট্রানজিস্টরের পরিবর্তে প্রথম সিলিকন ভিত্তিক ইন্টিগ্রেটেড সার্কিট (IC) ব্যবহৃত হয়।',
    difficulty: 'Medium'
  },
  {
    id: 'q-2',
    questionText: 'আলোর প্রতিসরণের ক্ষেত্রে স্নেলের সূত্রটি নিচের কোনটি?',
    questionTextBn: 'Which of the following represents Snell\'s Law in optics?',
    subject: 'Physics',
    chapter: 'জ্যামিতিক আলোকবিজ্ঞান',
    options: [
      { id: 'opt-a', text: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)' },
      { id: 'opt-b', text: 'v = f · λ' },
      { id: 'opt-c', text: 'E = h · ν' },
      { id: 'opt-d', text: 'F = m · a' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'স্নেলের সূত্রানুসারে আপতন কোণের সাইন এবং প্রতিসরণ কোণের সাইনের অনুপাত প্রতিসরাঙ্কের সাথে ব্যস্তানুপাতিক: n₁ sin(θ₁) = n₂ sin(θ₂)।',
    difficulty: 'Easy'
  },
  {
    id: 'q-3',
    questionText: 'নিচের কোনটি অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং (OOP) এর মৌলিক স্তম্ভ নয়?',
    questionTextBn: 'Which of the following is NOT a fundamental pillar of Object-Oriented Programming?',
    subject: 'Computer Science',
    chapter: 'প্রোগ্রামিং ও অ্যালগরিদম',
    options: [
      { id: 'opt-a', text: 'Encapsulation (এনক্যাপসুলেশন)' },
      { id: 'opt-b', text: 'Inheritance (উত্তরাধিকার)' },
      { id: 'opt-c', text: 'Polymorphism (বহুরূপতা)' },
      { id: 'opt-d', text: 'Compilation (কম্পাইলেশন)' }
    ],
    correctOptionId: 'opt-d',
    explanation: 'OOP-এর মূল চারটি স্তম্ভ হলো Encapsulation, Abstraction, Inheritance এবং Polymorphism। Compilation হলো সোর্স কোড রূপান্তরের প্রক্রিয়া।',
    difficulty: 'Easy'
  },
  {
    id: 'q-4',
    questionText: 'একটি গোলকের ব্যাসার্ধ পরিমাপে 2% ত্রুটি হলে এর আয়তন নির্ণয়ে শতকরা ত্রুটি কত হবে?',
    questionTextBn: 'If there is a 2% error in measuring the radius of a sphere, what is the percentage error in its volume?',
    subject: 'Mathematics',
    chapter: 'পরিমাপ ও শতকরা ত্রুটি',
    options: [
      { id: 'opt-a', text: '2%' },
      { id: 'opt-b', text: '4%' },
      { id: 'opt-c', text: '6%' },
      { id: 'opt-d', text: '8%' }
    ],
    correctOptionId: 'opt-c',
    explanation: 'গোলকের আয়তন V = (4/3)πr³। ত্রুটির ক্ষেত্রে: ΔV/V = 3 · (Δr/r) = 3 × 2% = 6%।',
    difficulty: 'Medium'
  },
  {
    id: 'q-5',
    questionText: 'কোন নেটওয়ার্ক টপোলজিতে সেন্ট্রাল হাব বা সুইচের প্রয়োজন হয়?',
    questionTextBn: 'Which network topology requires a central Hub or Switch?',
    subject: 'ICT',
    chapter: 'কম্পিউটার নেটওয়ার্কিং',
    options: [
      { id: 'opt-a', text: 'স্টার টপোলজি (Star Topology)' },
      { id: 'opt-b', text: 'বাস টপোলজি (Bus Topology)' },
      { id: 'opt-c', text: 'রিং টপোলজি (Ring Topology)' },
      { id: 'opt-d', text: 'মেশ টপোলজি (Mesh Topology)' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'স্টার টপোলজিতে প্রতিটি নোড সরাসরি একটি কেন্দ্রীয় ডিভাইস (যেমন সুইচ বা হাব) এর সাথে পৃথক ক্যাবলের মাধ্যমে সংযুক্ত থাকে।',
    difficulty: 'Easy'
  }
];

export const SAMPLE_SUGGESTIONS: SuggestionTopic[] = [
  {
    id: 'sug-1',
    title: 'আইসিটি: ডিজিটাল লজিক ও বুলিয়ান অ্যালজেব্রা',
    subject: 'ICT',
    importance: 'Very High',
    expectedQuestions: 4,
    description: 'লজিক গেইট (NAND, NOR এর সার্বজনীনতা), ডিমরগ্যানের উপপাদ্য এবং হাফ অ্যাডার ও ফুল অ্যাডার বর্তনী থেকে প্রতি বছর সৃজনশীল ও বহুনির্বাচনি প্রশ্ন নিশ্চিত আসে।',
    recommendedChapters: ['অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস', 'সার্বজনীন গেইট রূপান্তর']
  },
  {
    id: 'sug-2',
    title: 'পদার্থবিজ্ঞান: ভেক্টর ও গতিবিদ্যা সমীকরণ',
    subject: 'Physics',
    importance: 'Very High',
    expectedQuestions: 5,
    description: 'নদী-নৌকার ন্যূনতম দূরত্ব ও সময়, ডট ও ক্রস গুণনের ব্যবহারিক সমস্যা এবং প্রাসের গতিপথ সম্পর্কিত গাণিতিক সমস্যাবলি পুঙ্খানুপুঙ্খ অনুশীলন করুন।',
    recommendedChapters: ['ভেক্টর অধ্যায় ২', 'গতিবিদ্যা অধ্যায় ৩']
  },
  {
    id: 'sug-3',
    title: 'রসায়ন: পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
    subject: 'Chemistry',
    importance: 'High',
    expectedQuestions: 3,
    description: 'আয়নীকরণ শক্তি, তড়িৎ ঋণাত্মকতার ক্রম পরিবর্তন এবং সংকরায়ন (sp, sp², sp³) নির্ণয় সংক্রান্ত সৃজনশীল অংশ অত্যন্ত গুরুত্বপূর্ণ।',
    recommendedChapters: ['মৌলের পর্যায়বৃত্ত ধর্ম', 'রাসায়নিক পরিবর্তন']
  },
  {
    id: 'sug-4',
    title: 'উচ্চতর গণিত: ক্যালকুলাস (অন্তরীকরণ ও যোগজীকরণ)',
    subject: 'Mathematics',
    importance: 'Very High',
    expectedQuestions: 6,
    description: 'লিমিটের আদর্শ সূত্রাবলি, ত্রিকোণমিতিক ফাংশনের পর্যায়ক্রমিক অন্তরীকরণ এবং নির্দিষ্ট যোগজের ক্ষেত্রফল নির্ণয়ের প্রয়োগে সর্বোচ্চ গুরুত্ব দিন।',
    recommendedChapters: ['অধ্যায় ৯: অন্তরীকরণ', 'অধ্যায় ১০: যোগজীকরণ']
  },
  {
    id: 'sug-5',
    title: 'ইংরেজি: Right Form of Verbs & Prepositions',
    subject: 'English',
    importance: 'High',
    expectedQuestions: 5,
    description: 'Appropriate Prepositions, Conditional sentences, and Subject-Verb agreement exceptions are frequent in competitive tests.',
    recommendedChapters: ['Grammar Master Series', 'Confusing Words']
  }
];

export const PREVIOUS_YEAR_EXAMS: PreviousYearExam[] = [
  {
    id: 'exam-2024-dhaka',
    examName: 'এইচএসসি চূড়ান্ত পরীক্ষা ২০২৪ - ঢাকা বোর্ড',
    year: 2024,
    boardOrUniversity: 'ঢাকা শিক্ষা বোর্ড (Dhaka Board)',
    totalQuestions: 25,
    timeMinutes: 25,
    participantsCount: 48200,
    subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)'
  },
  {
    id: 'exam-2023-buet',
    examName: 'বুয়েট ভর্তি পরীক্ষা ২০২৩ - প্রিলিমিনারি সেট',
    year: 2023,
    boardOrUniversity: 'BUET Admission Test',
    totalQuestions: 30,
    timeMinutes: 30,
    participantsCount: 22400,
    subject: 'পদার্থবিজ্ঞান ও গণিত'
  },
  {
    id: 'exam-2023-allboard',
    examName: 'সম্মিলিত বোর্ড পরীক্ষা ২০২৩ - বিজ্ঞান বিভাগ',
    year: 2023,
    boardOrUniversity: 'সকল শিক্ষা বোর্ড সমন্বিত',
    totalQuestions: 25,
    timeMinutes: 25,
    participantsCount: 65100,
    subject: 'রসায়ন বিজ্ঞান (Chemistry)'
  },
  {
    id: 'exam-2022-du-ka',
    examName: 'ঢাকা বিশ্ববিদ্যালয় "ক" ইউনিট ভর্তি পরীক্ষা ২০২২',
    year: 2022,
    boardOrUniversity: 'Dhaka University (A Unit)',
    totalQuestions: 35,
    timeMinutes: 40,
    participantsCount: 38900,
    subject: 'পদার্থ, রসায়ন, গণিত ও জীববিজ্ঞান'
  },
  {
    id: 'exam-2021-chittagong',
    examName: 'এইচএসসি পরীক্ষা ২০২১ - চট্টগ্রাম বোর্ড',
    year: 2021,
    boardOrUniversity: 'চট্টগ্রাম শিক্ষা বোর্ড',
    totalQuestions: 25,
    timeMinutes: 25,
    participantsCount: 31200,
    subject: 'তথ্য ও যোগাযোগ প্রযুক্তি'
  }
];
