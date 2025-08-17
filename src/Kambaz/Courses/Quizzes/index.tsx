import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlus, FaEllipsisV, FaBan, FaCheckCircle } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { forwardRef, MouseEvent } from "react";
import * as quizzesClient from "./client";
import { Quiz } from "./types";

function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  interface CurrentUser {
    _id: string;
    username: string;
    role: string;
  }
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: CurrentUser } }) => state.accountReducer);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = useCallback(async () => {
    if (!cid) return;
    try {
      setLoading(true);
      const courseQuizzes = await quizzesClient.findQuizzesForCourse(cid);
      setQuizzes(courseQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  }, [cid]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleCreateQuiz = async () => {
    if (!cid) return;
    try {
      const newQuiz = {
        title: "New Quiz",
        description: "",
      };
      const createdQuiz = await quizzesClient.createQuiz(cid, newQuiz);
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${createdQuiz._id}/details`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handlePublishToggle = async (quiz: Quiz) => {
    try {
      if (quiz.published) {
        await quizzesClient.unpublishQuiz(quiz._id);
      } else {
        await quizzesClient.publishQuiz(quiz._id);
      }
      fetchQuizzes();
    } catch (error) {
      console.error("Error toggling quiz publish status:", error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await quizzesClient.deleteQuiz(quizId);
        fetchQuizzes();
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!quiz.published) {
      return "Not Published";
    }

    if (untilDate && now > untilDate) {
      return "Closed";
    }

    if (availableDate && now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }

    if (availableDate && untilDate && now >= availableDate && now <= untilDate) {
      return "Available";
    }

    return "Available";
  };

  const isFaculty = currentUser?.role === "FACULTY";

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quizzes</h3>
        {isFaculty && (
          <button
            className="btn btn-danger"
            onClick={handleCreateQuiz}
          >
            <FaPlus className="me-2" />
            Quiz
          </button>
        )}
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No quizzes available.</p>
          {isFaculty && (
            <p className="text-muted">Click the "+ Quiz" button to create a new quiz.</p>
          )}
        </div>
      ) : (
        <div className="list-group">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    {isFaculty && (
                      <button
                        className="btn btn-link p-0 me-2"
                        onClick={() => handlePublishToggle(quiz)}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="text-success" />
                        ) : (
                          <FaBan className="text-muted" />
                        )}
                      </button>
                    )}
                    <h5
                      className="mb-0 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/details`)}
                    >
                      {quiz.title}
                    </h5>
                  </div>

                  <div className="text-muted small">
                    <div>
                      <strong>Availability:</strong> {getAvailabilityStatus(quiz)}
                    </div>
                    {quiz.dueDate && (
                      <div>
                        <strong>Due:</strong> {new Date(quiz.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    <div>
                      <strong>Points:</strong> {quiz.points || 0}
                    </div>
                    <div>
                      <strong>Questions:</strong> 0 {/* Will be updated when questions are implemented */}
                    </div>
                    {!isFaculty && (
                      <div>
                        <strong>Score:</strong> -- {/* Will show user's score */}
                      </div>
                    )}
                  </div>
                </div>

                {isFaculty && (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as={forwardRef<HTMLButtonElement, { onClick?: (event: MouseEvent<HTMLButtonElement>) => void }>(
                        ({ onClick }, ref) => (
                          <button
                            ref={ref}
                            className="btn btn-link p-0 border-0 bg-transparent"
                            style={{ boxShadow: "none" }}
                            onClick={e => {
                              e.preventDefault();
                              if (onClick) onClick(e);
                            }}
                            aria-label="Quiz actions"
                          >
                            <FaEllipsisV />
                          </button>
                        )
                      )}
                      id={`dropdown-${quiz._id}`}
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handlePublishToggle(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quizzes;
