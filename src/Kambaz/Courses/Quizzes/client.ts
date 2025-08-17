import axios from "axios";
import { Quiz, Question, QuizAttempt, CreateQuizData } from "./types";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api`;

// Quiz APIs
export const findQuizzesForCourse = async (courseId: string): Promise<Quiz[]> => {
  const response = await axios.get(`${QUIZZES_API}/courses/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: CreateQuizData): Promise<Quiz> => {
  const response = await axios.post(`${QUIZZES_API}/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: Partial<Quiz>): Promise<any> => {
  const response = await axios.put(`${QUIZZES_API}/quizzes/${quizId}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string): Promise<any> => {
  const response = await axios.delete(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId: string): Promise<any> => {
  const response = await axios.put(`${QUIZZES_API}/quizzes/${quizId}/publish`);
  return response.data;
};

export const unpublishQuiz = async (quizId: string): Promise<any> => {
  const response = await axios.put(`${QUIZZES_API}/quizzes/${quizId}/unpublish`);
  return response.data;
};

// Question APIs
export const findQuestionsForQuiz = async (quizId: string): Promise<Question[]> => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/questions`);
  return response.data;
};

export const findQuestionById = async (questionId: string): Promise<Question> => {
  const response = await axios.get(`${QUIZZES_API}/questions/${questionId}`);
  return response.data;
};

export const createQuestion = async (quizId: string, question: Partial<Question>): Promise<Question> => {
  const response = await axios.post(`${QUIZZES_API}/quizzes/${quizId}/questions`, question);
  return response.data;
};

export const updateQuestion = async (questionId: string, question: Partial<Question>): Promise<any> => {
  const response = await axios.put(`${QUIZZES_API}/questions/${questionId}`, question);
  return response.data;
};

export const deleteQuestion = async (questionId: string): Promise<any> => {
  const response = await axios.delete(`${QUIZZES_API}/questions/${questionId}`);
  return response.data;
};

// Quiz Attempt APIs
export const findAttemptsForQuiz = async (quizId: string): Promise<QuizAttempt[]> => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/attempts`);
  return response.data;
};

export const findAttemptsForUser = async (userId: string): Promise<QuizAttempt[]> => {
  const response = await axios.get(`${QUIZZES_API}/users/${userId}/attempts`);
  return response.data;
};

export const findAttemptsForUserAndQuiz = async (userId: string, quizId: string): Promise<QuizAttempt[]> => {
  const response = await axios.get(`${QUIZZES_API}/users/${userId}/quizzes/${quizId}/attempts`);
  return response.data;
};

export const findLatestAttemptForUserAndQuiz = async (userId: string, quizId: string): Promise<QuizAttempt | null> => {
  const response = await axios.get(`${QUIZZES_API}/users/${userId}/quizzes/${quizId}/latest-attempt`);
  return response.data;
};

export const createAttempt = async (userId: string, quizId: string): Promise<QuizAttempt> => {
  const response = await axios.post(`${QUIZZES_API}/users/${userId}/quizzes/${quizId}/attempts`);
  return response.data;
};

export const submitAttempt = async (attemptId: string, answers: any[]): Promise<QuizAttempt> => {
  const response = await axios.put(`${QUIZZES_API}/attempts/${attemptId}/submit`, { answers });
  return response.data;
};

export const findAttemptById = async (attemptId: string): Promise<QuizAttempt> => {
  const response = await axios.get(`${QUIZZES_API}/attempts/${attemptId}`);
  return response.data;
};

// Additional client functions for quiz taking
export const startQuizAttempt = async (quizId: string): Promise<QuizAttempt> => {
  const response = await axios.post(`${QUIZZES_API}/quizzes/${quizId}/attempts/start`);
  return response.data;
};

export const createAttemptForUser = async (userId: string, quizId: string): Promise<QuizAttempt> => {
  const response = await axios.post(`${QUIZZES_API}/users/${userId}/quizzes/${quizId}/attempts`);
  return response.data;
};

export const getQuizAttempts = async (quizId: string): Promise<QuizAttempt[]> => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/attempts`);
  return response.data;
};

export const getLatestQuizAttempt = async (quizId: string): Promise<QuizAttempt | null> => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/attempts/latest`);
  return response.data;
};
