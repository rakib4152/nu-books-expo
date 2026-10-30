export interface UserProfile {
  name: string;
  email: string;
  subject: string;
  thana: string;
  collegeName: string;
  isAuthenticated: boolean;
  avatarUrl?: string;
}

export interface QuestionItem {
  id: string;
  questionText: string;
  questionTextBn?: string;
  subject: string;
  chapter?: string;
  options: {
    id: string;
    text: string;
    textBn?: string;
  }[];
  correctOptionId: string;
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SuggestionTopic {
  id: string;
  title: string;
  subject: string;
  importance: 'Very High' | 'High' | 'Medium';
  expectedQuestions: number;
  description: string;
  recommendedChapters: string[];
}

export interface PreviousYearExam {
  id: string;
  examName: string;
  year: number;
  boardOrUniversity: string;
  totalQuestions: number;
  timeMinutes: number;
  participantsCount: number;
  subject: string;
}
