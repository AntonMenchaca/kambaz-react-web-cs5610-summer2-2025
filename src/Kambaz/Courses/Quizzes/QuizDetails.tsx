import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEdit, FaPlay } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz } from "./types";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: any } }) => state.accountReducer);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid) return;
      try {
        setLoading(true);
        const quizData = await quizzesClient.findQuizById(qid);
        setQuiz(quizData);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [qid]);

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "No date set";
    return new Date(date).toLocaleDateString();
  };

  const getQuizTypeDisplay = (type: string) => {
    switch (type) {
      case "GRADED_QUIZ": return "Graded Quiz";
      case "PRACTICE_QUIZ": return "Practice Quiz";
      case "GRADED_SURVEY": return "Graded Survey";
      case "UNGRADED_SURVEY": return "Ungraded Survey";
      default: return type;
    }
  };

  const getAssignmentGroupDisplay = (group: string) => {
    switch (group) {
      case "QUIZZES": return "Quizzes";
      case "EXAMS": return "Exams";
      case "ASSIGNMENTS": return "Assignments";
      case "PROJECT": return "Project";
      default: return group;
    }
  };

  const isFaculty = currentUser?.role === "FACULTY";

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div id="wd-quiz-details" className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{quiz.title}</h2>
            <div>
              {isFaculty ? (
                <>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)}
                  >
                    <FaPlay className="me-1" />
                    Preview
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}
                  >
                    <FaEdit className="me-1" />
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/take`)}
                    disabled={!quiz.published}
                  >
                    {quiz.published ? "Take Quiz" : "Quiz Not Available"}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/results`)}
                  >
                    View Results
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h4>Quiz Instructions</h4>
                  <div className="quiz-description mb-4">
                    {quiz.description || "No description provided."}
                  </div>
                </div>

                <div className="col-md-4">
                  <h5>Quiz Details</h5>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td><strong>Quiz Type</strong></td>
                        <td>{getQuizTypeDisplay(quiz.quizType)}</td>
                      </tr>
                      <tr>
                        <td><strong>Points</strong></td>
                        <td>{quiz.points}</td>
                      </tr>
                      <tr>
                        <td><strong>Assignment Group</strong></td>
                        <td>{getAssignmentGroupDisplay(quiz.assignmentGroup)}</td>
                      </tr>
                      <tr>
                        <td><strong>Shuffle Answers</strong></td>
                        <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td><strong>Time Limit</strong></td>
                        <td>{quiz.timeLimit} Minutes</td>
                      </tr>
                      <tr>
                        <td><strong>Multiple Attempts</strong></td>
                        <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
                      </tr>
                      {quiz.multipleAttempts && (
                        <tr>
                          <td><strong>How Many Attempts</strong></td>
                          <td>{quiz.howManyAttempts}</td>
                        </tr>
                      )}
                      <tr>
                        <td><strong>Show Correct Answers</strong></td>
                        <td>{quiz.showCorrectAnswers}</td>
                      </tr>
                      {quiz.accessCode && (
                        <tr>
                          <td><strong>Access Code</strong></td>
                          <td>Required</td>
                        </tr>
                      )}
                      <tr>
                        <td><strong>One Question at a Time</strong></td>
                        <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td><strong>Webcam Required</strong></td>
                        <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td><strong>Lock Questions After Answering</strong></td>
                        <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-md-4">
                  <h6>Due</h6>
                  <p>{formatDate(quiz.dueDate)}</p>
                </div>
                <div className="col-md-4">
                  <h6>Available from</h6>
                  <p>{formatDate(quiz.availableDate)}</p>
                </div>
                <div className="col-md-4">
                  <h6>Until</h6>
                  <p>{formatDate(quiz.untilDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
