export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  points: number;
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECT";
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate?: Date | string;
  availableDate?: Date | string;
  untilDate?: Date | string;
  published: boolean;
  questions?: Question[];
  questionCount?: number;
}

export interface Question {
  _id: string;
  title: string;
  quiz: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";
  points: number;
  question: string;
  choices?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer?: boolean;
  possibleAnswers?: string[];
  caseSensitive?: boolean;
}

export interface QuizAttempt {
  _id: string;
  quiz: string;
  user: string;
  attempt: number;
  answers: Array<{
    question: string;
    answer: any;
    isCorrect: boolean;
    pointsEarned: number;
  }>;
  score: number;
  totalPoints: number;
  startedAt: Date | string;
  submittedAt?: Date | string;
  timeSpent?: number;
}

export interface CreateQuizData {
  title: string;
  description?: string;
  quizType?: Quiz["quizType"];
  points?: number;
  assignmentGroup?: Quiz["assignmentGroup"];
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  howManyAttempts?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  dueDate?: Date | string;
  availableDate?: Date | string;
  untilDate?: Date | string;
  published?: boolean;
}
