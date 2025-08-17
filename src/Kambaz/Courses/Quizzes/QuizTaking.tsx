import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaClock } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz, Question, QuizAttempt } from "./types";

export default function QuizTaking() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: any } }) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: any }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [attemptStarted, setAttemptStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [previousAttempts, setPreviousAttempts] = useState<QuizAttempt[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

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

      // Check previous attempts
      try {
        const attempts = await quizzesClient.findAttemptsForUserAndQuiz(currentUser._id, qid);
        setPreviousAttempts(attempts);
      } catch (error) {
        console.log("No previous attempts found");
      }

    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      setLoading(false);
    }
  }, [qid, currentUser._id]);

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  // Timer effect
  useEffect(() => {
    if (attemptStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [attemptStarted, timeRemaining]);

  const startAttempt = async () => {
    if (!quiz || !qid) return;
    try {
      setAttemptStarted(true);
      setTimeRemaining(quiz.timeLimit * 60); // Convert minutes to seconds
      setStartTime(new Date());
    } catch (error) {
      console.error("Error starting quiz attempt:", error);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = async () => {
    if (!qid) return;
    try {
      const timeSpent = startTime ? Math.round((new Date().getTime() - startTime.getTime()) / (1000 * 60)) : 0;

      // Create attempt object
      const attemptData = {
        quiz: qid,
        user: currentUser._id,
        answers: Object.keys(answers).map(questionId => ({
          question: questionId,
          answer: answers[questionId]
        })),
        startedAt: startTime,
        submittedAt: new Date(),
        timeSpent
      };

      await quizzesClient.submitAttempt(qid + "-" + Date.now(), attemptData.answers);
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const canTakeQuiz = () => {
    if (!quiz) return false;
    return quiz.multipleAttempts
      ? previousAttempts.length < quiz.howManyAttempts
      : previousAttempts.length === 0;
  };

  const renderQuestion = (question: Question) => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title mb-0">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h5>
            <span className="badge bg-primary">{question.points} points</span>
          </div>

          <div className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />

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
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`question-${question._id}-${choiceIndex}`}
                  >
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
                />
                <label
                  className="form-check-label"
                  htmlFor={`question-${question._id}-true`}
                >
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
                />
                <label
                  className="form-check-label"
                  htmlFor={`question-${question._id}-false`}
                >
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
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-5">Loading quiz...</div>;
  if (!quiz) return <div className="text-center py-5">Quiz not found</div>;

  // Check if quiz is available
  const now = new Date();
  const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (!quiz.published) {
    return (
      <div className="alert alert-warning">
        This quiz is not published yet.
      </div>
    );
  }

  if (availableDate && now < availableDate) {
    return (
      <div className="alert alert-warning">
        This quiz is not available until {availableDate.toLocaleDateString()}.
      </div>
    );
  }

  if (untilDate && now > untilDate) {
    return (
      <div className="alert alert-danger">
        This quiz was available until {untilDate.toLocaleDateString()}.
      </div>
    );
  }

  if (!canTakeQuiz()) {
    return (
      <div className="alert alert-info">
        <h5>No More Attempts Available</h5>
        <p>You have used all available attempts for this quiz.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results`)}
        >
          View Results
        </button>
      </div>
    );
  }

  if (!attemptStarted) {
    return (
      <div id="wd-quiz-start" className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{quiz.title}</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            <FaArrowLeft className="me-1" />
            Back to Quizzes
          </button>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h4>Quiz Instructions</h4>
            <div className="mb-3" dangerouslySetInnerHTML={{ __html: quiz.description || "No description provided." }} />
            <hr />
            <div className="row">
              <div className="col-md-6">
                <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
                <p><strong>Questions:</strong> {questions.length}</p>
                <p><strong>Total Points:</strong> {quiz.points}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Attempts Allowed:</strong> {quiz.multipleAttempts ? quiz.howManyAttempts : 1}</p>
                <p><strong>Attempts Used:</strong> {previousAttempts.length}</p>
                <p><strong>Remaining Attempts:</strong> {quiz.multipleAttempts ? quiz.howManyAttempts - previousAttempts.length : 1 - previousAttempts.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={startAttempt}>
            Begin Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-quiz-taking" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        <div className="d-flex align-items-center gap-3">
          <div className="alert alert-info mb-0 d-flex align-items-center">
            <FaClock className="me-2" />
            Time Remaining: {formatTime(timeRemaining)}
          </div>
          <button
            className="btn btn-warning"
            onClick={() => setShowSubmitModal(true)}
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {quiz.oneQuestionAtATime ? (
        // One question at a time mode
        <div>
          {questions.length > 0 && renderQuestion(questions[currentQuestionIndex])}

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              <FaArrowLeft className="me-1" />
              Previous
            </button>

            <div>
              <span className="text-muted me-3">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                >
                  Next
                  <FaArrowRight className="ms-1" />
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // All questions at once mode
        <div>
          {questions.map((question, index) => (
            <div key={question._id} className="mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      Question {index + 1}
                    </h5>
                    <span className="badge bg-primary">{question.points} points</span>
                  </div>

                  <div className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />

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
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`question-${question._id}-${choiceIndex}`}
                          >
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
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`question-${question._id}-true`}
                        >
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
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`question-${question._id}-false`}
                        >
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
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <button
              className="btn btn-success btn-lg"
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submit Quiz</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSubmitModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to submit your quiz?</p>
                <p>You have answered <strong>{Object.keys(answers).length}</strong> of <strong>{questions.length}</strong> questions.</p>
                <p className="text-warning"><strong>This action cannot be undone.</strong></p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Continue Quiz
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
