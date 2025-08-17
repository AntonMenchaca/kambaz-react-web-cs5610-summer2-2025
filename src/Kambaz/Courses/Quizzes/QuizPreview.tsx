import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz, Question } from "./types";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: any } }) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: any }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<{ earnedPoints: number; totalPoints: number }>({ earnedPoints: 0, totalPoints: 0 });
  const [loading, setLoading] = useState(true);

  const fetchQuizData = useCallback(async () => {
    if (!qid) return;
    try {
      setLoading(true);
      const [quizData, questionsData] = await Promise.all([
        quizzesClient.findQuizById(qid),
        quizzesClient.findQuestionsForQuiz(qid)
      ]);
      setQuiz(quizData);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setLoading(false);
    }
  }, [qid]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach(question => {
      totalPoints += question.points || 0;
      const userAnswer = answers[question._id];

      if (question.type === 'MULTIPLE_CHOICE') {
        const correctChoice = question.choices?.find(choice => choice.isCorrect);
        if (userAnswer === correctChoice?.text) {
          earnedPoints += question.points || 0;
        }
      } else if (question.type === 'TRUE_FALSE') {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points || 0;
        }
      } else if (question.type === 'FILL_IN_BLANK') {
        const correctAnswers = question.possibleAnswers || [];
        const userAnswerLower = userAnswer?.toLowerCase().trim();
        const isCorrect = correctAnswers.some(correct => {
          const correctLower = correct.toLowerCase().trim();
          return question.caseSensitive ? userAnswer?.trim() === correct.trim() : userAnswerLower === correctLower;
        });
        if (isCorrect) {
          earnedPoints += question.points || 0;
        }
      }
    });

    return { earnedPoints, totalPoints };
  };

  const handleSubmitPreview = () => {
    const scoreResult = calculateScore();
    setScore(scoreResult);
    setShowResults(true);
  };

  const renderQuestion = (question: Question, index: number) => {
    const userAnswer = answers[question._id];
    let isCorrect = false;
    let correctAnswerText = "";

    if (showResults) {
      if (question.type === 'MULTIPLE_CHOICE') {
        const correctChoice = question.choices?.find(choice => choice.isCorrect);
        correctAnswerText = correctChoice?.text || "";
        isCorrect = userAnswer === correctAnswerText;
      } else if (question.type === 'TRUE_FALSE') {
        correctAnswerText = String(question.correctAnswer);
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === 'FILL_IN_BLANK') {
        correctAnswerText = question.possibleAnswers?.join(", ") || "";
        const userAnswerLower = userAnswer?.toLowerCase().trim();
        isCorrect = question.possibleAnswers?.some(correct => {
          const correctLower = correct.toLowerCase().trim();
          return question.caseSensitive ? userAnswer?.trim() === correct.trim() : userAnswerLower === correctLower;
        }) || false;
      }
    }

    return (
      <div key={question._id} className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title mb-0">
              Question {index + 1}
              {showResults && (
                <span className={`badge ms-2 ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                  {isCorrect ? <FaCheck className="me-1" /> : <FaTimes className="me-1" />} {question.points} pts
                </span>
              )}
            </h5>
            <small className="text-muted">{question.points} points</small>
          </div>

          <div className="mb-3" dangerouslySetInnerHTML={{ __html: question.question }} />

          {question.type === 'MULTIPLE_CHOICE' && (
            <div className="mb-3">
              {question.choices?.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${question._id}`}
                    id={`question-${question._id}-${choiceIndex}`}
                    checked={answers[question._id] === choice.text}
                    onChange={() => handleAnswerChange(question._id, choice.text)}
                    disabled={showResults}
                  />
                  <label
                    className={`form-check-label ${showResults
                        ? choice.isCorrect
                          ? "text-success fw-bold"
                          : userAnswer === choice.text && !choice.isCorrect
                            ? "text-danger"
                            : ""
                        : ""
                      }`}
                    htmlFor={`question-${question._id}-${choiceIndex}`}
                  >
                    {showResults && choice.isCorrect && "✓ "}
                    {showResults && userAnswer === choice.text && !choice.isCorrect && "✗ "}
                    {choice.text}
                  </label>
                </div>
              ))}
            </div>
          )}

          {question.type === 'TRUE_FALSE' && (
            <div className="mb-3">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${question._id}`}
                  id={`question-${question._id}-true`}
                  checked={answers[question._id] === true}
                  onChange={() => handleAnswerChange(question._id, true)}
                  disabled={showResults}
                />
                <label
                  className={`form-check-label ${showResults && question.correctAnswer === true ? "text-success fw-bold" : ""
                    }`}
                  htmlFor={`question-${question._id}-true`}
                >
                  {showResults && question.correctAnswer === true && "✓ "}
                  True
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${question._id}`}
                  id={`question-${question._id}-false`}
                  checked={answers[question._id] === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                  disabled={showResults}
                />
                <label
                  className={`form-check-label ${showResults && question.correctAnswer === false ? "text-success fw-bold" : ""
                    }`}
                  htmlFor={`question-${question._id}-false`}
                >
                  {showResults && question.correctAnswer === false && "✓ "}
                  False
                </label>
              </div>
            </div>
          )}

          {question.type === 'FILL_IN_BLANK' && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your answer"
                value={answers[question._id] || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                disabled={showResults}
              />
            </div>
          )}

          {showResults && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="mb-2">
                <strong>Your answer: </strong>
                <span className={isCorrect ? "text-success" : "text-danger"}>
                  {userAnswer ? String(userAnswer) : "No answer provided"}
                </span>
              </div>
              {!isCorrect && (
                <div>
                  <strong>Correct answer: </strong>
                  <span className="text-success">{correctAnswerText}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-5">Loading quiz preview...</div>;
  if (!quiz) return <div className="text-center py-5">Quiz not found</div>;

  // Only faculty can preview
  if (currentUser?.role !== 'FACULTY') {
    return (
      <div className="alert alert-danger">
        Only faculty members can preview quizzes.
      </div>
    );
  }

  return (
    <div id="wd-quiz-preview" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title} - Preview</h2>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            <FaArrowLeft className="me-1" />
            Back to Quizzes
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            <FaEdit className="me-1" />
            Edit Quiz
          </button>
        </div>
      </div>

      {showResults && (
        <div className="alert alert-info mb-4">
          <h5>Preview Results</h5>
          <p className="mb-1">
            Score: {score.earnedPoints}/{score.totalPoints} points
            ({score.totalPoints > 0 ? ((score.earnedPoints / score.totalPoints) * 100).toFixed(1) : 0}%)
          </p>
          <p className="mb-0"><em>This is a preview - results are not saved.</em></p>
        </div>
      )}

      <div className="card mb-4">
        <div className="card-body">
          <h4>Quiz Instructions</h4>
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: quiz.description || "No description provided." }} />
          <hr />
          <div className="row">
            <div className="col-md-6">
              <strong>Time Limit:</strong> {quiz.timeLimit} minutes<br />
              <strong>Attempts Allowed:</strong> {quiz.multipleAttempts ? quiz.howManyAttempts : 1}<br />
              <strong>Total Points:</strong> {quiz.points}
            </div>
            <div className="col-md-6">
              <strong>Questions:</strong> {questions.length}<br />
              <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}<br />
              <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}
            </div>
          </div>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="alert alert-warning">
          This quiz has no questions yet. Add questions in the Quiz Editor.
        </div>
      ) : (
        <>
          {questions.map((question, index) => renderQuestion(question, index))}

          {!showResults ? (
            <div className="text-center my-4">
              <button className="btn btn-primary btn-lg" onClick={handleSubmitPreview}>
                Submit Preview
              </button>
            </div>
          ) : (
            <div className="text-center my-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowResults(false);
                  setAnswers({});
                  setScore({ earnedPoints: 0, totalPoints: 0 });
                }}
              >
                Take Preview Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
