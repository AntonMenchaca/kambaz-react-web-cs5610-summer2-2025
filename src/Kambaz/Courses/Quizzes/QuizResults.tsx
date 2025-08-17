import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaRedo } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz, Question, QuizAttempt } from "./types";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: { _id: string } } }) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);
  const [allAttempts, setAllAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!qid) return;
    try {
      setLoading(true);
      const [quizData, questionsData] = await Promise.all([
        quizzesClient.findQuizById(qid),
        quizzesClient.findQuestionsForQuiz(qid)
      ]);

      setQuiz(quizData);
      setQuestions(questionsData);

      // Try to get attempts
      try {
        const attempts = await quizzesClient.findAttemptsForUserAndQuiz(currentUser._id, qid);
        setAllAttempts(attempts);
        if (attempts.length > 0) {
          // Attempts are sorted by attempt number descending, so first is latest
          setLatestAttempt(attempts[0]);
        }
      } catch {
        console.log("No attempts found for this user");
      }

    } catch (error) {
      console.error("Error fetching quiz results:", error);
    } finally {
      setLoading(false);
    }
  }, [qid, currentUser._id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchParams]);

  const canRetakeQuiz = () => {
    if (!quiz || !latestAttempt) return false;
    return quiz.multipleAttempts && allAttempts.length < quiz.howManyAttempts;
  };

  const renderQuestionResult = (question: Question, index: number) => {
    const userAnswer = latestAttempt?.answers?.find(a => a.question === question._id)?.answer;
    let isCorrect = false;
    let correctAnswerText = "";
    let pointsEarned = 0;

    if (question.type === 'MULTIPLE_CHOICE') {
      const correctChoice = question.choices?.find(choice => choice.isCorrect);
      correctAnswerText = correctChoice?.text || "";
      isCorrect = userAnswer === correctAnswerText;
      pointsEarned = isCorrect ? question.points : 0;
    } else if (question.type === 'TRUE_FALSE') {
      correctAnswerText = String(question.correctAnswer);
      isCorrect = userAnswer === question.correctAnswer;
      pointsEarned = isCorrect ? question.points : 0;
    } else if (question.type === 'FILL_IN_BLANK') {
      const possibleAnswers = question.possibleAnswers || [];
      correctAnswerText = possibleAnswers.join(" or ");
      const userAnswerLower = userAnswer?.toLowerCase()?.trim();
      isCorrect = possibleAnswers.some(correct => {
        const correctLower = correct.toLowerCase().trim();
        return question.caseSensitive ? userAnswer?.trim() === correct.trim() : userAnswerLower === correctLower;
      });
      pointsEarned = isCorrect ? question.points : 0;
    }

    return (
      <div key={question._id} className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h6 className="card-title mb-0">
              Question {index + 1}
              <span className={`badge ms-2 ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                {isCorrect ? '✓' : '✗'} {pointsEarned}/{question.points} pts
              </span>
            </h6>
          </div>

          <div className="mb-3" dangerouslySetInnerHTML={{ __html: question.question }} />

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <strong>Your Answer:</strong>
                <div className={`mt-1 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                  {userAnswer !== undefined ? String(userAnswer) : "No answer provided"}
                </div>
              </div>
            </div>

            {!isCorrect && (
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Correct Answer:</strong>
                  <div className="text-success mt-1">{correctAnswerText}</div>
                </div>
              </div>
            )}
          </div>

          {question.type === 'MULTIPLE_CHOICE' && (
            <div className="mt-3">
              <small className="text-muted">Answer Choices:</small>
              <div className="mt-2">
                {question.choices?.map((choice, choiceIndex) => (
                  <div
                    key={choiceIndex}
                    className={`p-2 mb-1 rounded small ${choice.isCorrect
                      ? "bg-success bg-opacity-10 border border-success"
                      : userAnswer === choice.text && !choice.isCorrect
                        ? "bg-danger bg-opacity-10 border border-danger"
                        : "bg-light"
                      }`}
                  >
                    {choice.isCorrect && "✓ "}
                    {userAnswer === choice.text && !choice.isCorrect && "✗ "}
                    {choice.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-5">Loading results...</div>;
  if (!quiz) return <div className="text-center py-5">Quiz not found</div>;
  if (!latestAttempt) {
    return (
      <div className="alert alert-info">
        <h5>No Quiz Attempts Found</h5>
        <p>You haven't taken this quiz yet.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}
        >
          Take Quiz
        </button>
      </div>
    );
  }

  const scorePercentage = latestAttempt.totalPoints > 0 ? (latestAttempt.score / latestAttempt.totalPoints) * 100 : 0;

  return (
    <div id="wd-quiz-results" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title} - Results</h2>
        <div>
          {canRetakeQuiz() && (
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}
            >
              <FaRedo className="me-1" />
              Retake Quiz
            </button>
          )}
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            <FaArrowLeft className="me-1" />
            Back to Quizzes
          </button>
        </div>
      </div>

      {/* Score Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="mb-3">
                Score: {latestAttempt.score}/{latestAttempt.totalPoints} points
                <span className={`badge ms-2 ${scorePercentage >= 70 ? 'bg-success' :
                  scorePercentage >= 60 ? 'bg-warning text-dark' : 'bg-danger'
                  }`}>
                  {scorePercentage.toFixed(1)}%
                </span>
              </h4>

              <div className="mb-2">
                <strong>Attempt:</strong> {allAttempts.length} of {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
              </div>

              {latestAttempt.submittedAt && (
                <div className="mb-2">
                  <strong>Submitted:</strong> {new Date(latestAttempt.submittedAt).toLocaleString()}
                </div>
              )}

              {latestAttempt.timeSpent && (
                <div className="mb-2">
                  <strong>Time Taken:</strong> {latestAttempt.timeSpent} minutes
                </div>
              )}
            </div>

            <div className="col-md-6">
              {allAttempts.length > 1 && (
                <div>
                  <h6>Previous Attempts:</h6>
                  <div className="small">
                    {allAttempts.slice(1).map((attempt) => (
                      <div key={attempt._id} className="text-muted mb-1">
                        Attempt {attempt.attempt}: {attempt.score}/{attempt.totalPoints} points
                        ({attempt.totalPoints > 0 ? ((attempt.score / attempt.totalPoints) * 100).toFixed(1) : 0}%)
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {canRetakeQuiz() && (
                <div className="mt-3">
                  <div className="alert alert-info small mb-0">
                    You have {quiz.howManyAttempts - allAttempts.length} attempt(s) remaining.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Review */}
      {quiz.showCorrectAnswers === "IMMEDIATELY" || quiz.showCorrectAnswers === "AFTER_SUBMISSION" ? (
        <div>
          <h4 className="mb-3">Question Review</h4>
          {questions.map((question, index) => renderQuestionResult(question, index))}
        </div>
      ) : (
        <div className="alert alert-info">
          <h5>Answer Review Not Available</h5>
          <p>The instructor has configured this quiz to not show correct answers.</p>
        </div>
      )}

      {questions.length === 0 && (
        <div className="alert alert-warning">
          This quiz has no questions.
        </div>
      )}
    </div>
  );
}
