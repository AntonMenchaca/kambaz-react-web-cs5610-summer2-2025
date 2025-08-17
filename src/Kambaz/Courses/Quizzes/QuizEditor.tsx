import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaTimes } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz } from "./types";
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: "New Quiz",
    description: "",
    quizType: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "IMMEDIATELY",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    published: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid || qid === "new") return;
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

  const handleInputChange = (field: keyof Quiz, value: string | number | boolean | Date) => {
    setQuiz(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!cid || !quiz.title) return;
    try {
      if (qid && qid !== "new") {
        await quizzesClient.updateQuiz(qid, quiz);
      } else {
        const newQuiz = await quizzesClient.createQuiz(cid, quiz as any);
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
        return;
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/details`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    if (!cid || !quiz.title) return;
    try {
      const updatedQuiz = { ...quiz, published: true };
      if (qid && qid !== "new") {
        await quizzesClient.updateQuiz(qid, updatedQuiz);
      } else {
        await quizzesClient.createQuiz(cid, updatedQuiz as any);
      }
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  if (loading) {
    return <div>Loading quiz editor...</div>;
  }

  return (
    <div id="wd-quiz-editor" className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{qid === "new" ? "New Quiz" : "Edit Quiz"}</h2>
            <div>
              <button className="btn btn-secondary me-2" onClick={handleCancel}>
                <FaTimes className="me-1" />
                Cancel
              </button>
              <button className="btn btn-secondary me-2" onClick={handleSave}>
                <FaSave className="me-1" />
                Save
              </button>
              <button className="btn btn-primary" onClick={handleSaveAndPublish}>
                <FaSave className="me-1" />
                Save & Publish
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
                onClick={() => setActiveTab("questions")}
              >
                Questions
              </button>
            </li>
          </ul>

          {/* Details Tab Content */}
          {activeTab === "details" && (
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={quiz.title || ""}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows={4}
                        value={quiz.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="quizType" className="form-label">Quiz Type</label>
                          <select
                            className="form-select"
                            id="quizType"
                            value={quiz.quizType || "GRADED_QUIZ"}
                            onChange={(e) => handleInputChange("quizType", e.target.value)}
                          >
                            <option value="GRADED_QUIZ">Graded Quiz</option>
                            <option value="PRACTICE_QUIZ">Practice Quiz</option>
                            <option value="GRADED_SURVEY">Graded Survey</option>
                            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="points" className="form-label">Points</label>
                          <input
                            type="number"
                            className="form-control"
                            id="points"
                            value={quiz.points || 0}
                            onChange={(e) => handleInputChange("points", parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
                          <select
                            className="form-select"
                            id="assignmentGroup"
                            value={quiz.assignmentGroup || "QUIZZES"}
                            onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
                          >
                            <option value="QUIZZES">Quizzes</option>
                            <option value="EXAMS">Exams</option>
                            <option value="ASSIGNMENTS">Assignments</option>
                            <option value="PROJECT">Project</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="timeLimit" className="form-label">Time Limit (minutes)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="timeLimit"
                            value={quiz.timeLimit || 20}
                            onChange={(e) => handleInputChange("timeLimit", parseInt(e.target.value) || 20)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="shuffleAnswers"
                          checked={quiz.shuffleAnswers || false}
                          onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="shuffleAnswers">
                          Shuffle Answers
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="multipleAttempts"
                          checked={quiz.multipleAttempts || false}
                          onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="multipleAttempts">
                          Allow Multiple Attempts
                        </label>
                      </div>
                    </div>

                    {quiz.multipleAttempts && (
                      <div className="mb-3">
                        <label htmlFor="howManyAttempts" className="form-label">How Many Attempts</label>
                        <input
                          type="number"
                          className="form-control"
                          id="howManyAttempts"
                          value={quiz.howManyAttempts || 1}
                          onChange={(e) => handleInputChange("howManyAttempts", parseInt(e.target.value) || 1)}
                        />
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="accessCode" className="form-label">Access Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="accessCode"
                        value={quiz.accessCode || ""}
                        onChange={(e) => handleInputChange("accessCode", e.target.value)}
                        placeholder="Leave blank for no access code"
                      />
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="oneQuestionAtATime"
                          checked={quiz.oneQuestionAtATime || false}
                          onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="oneQuestionAtATime">
                          One Question at a Time
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="webcamRequired"
                          checked={quiz.webcamRequired || false}
                          onChange={(e) => handleInputChange("webcamRequired", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="webcamRequired">
                          Webcam Required
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="lockQuestionsAfterAnswering"
                          checked={quiz.lockQuestionsAfterAnswering || false}
                          onChange={(e) => handleInputChange("lockQuestionsAfterAnswering", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="lockQuestionsAfterAnswering">
                          Lock Questions After Answering
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="dueDate" className="form-label">Due Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="dueDate"
                            value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().split('T')[0] : ""}
                            onChange={(e) => handleInputChange("dueDate", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="availableDate" className="form-label">Available From</label>
                          <input
                            type="date"
                            className="form-control"
                            id="availableDate"
                            value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().split('T')[0] : ""}
                            onChange={(e) => handleInputChange("availableDate", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="untilDate" className="form-label">Available Until</label>
                          <input
                            type="date"
                            className="form-control"
                            id="untilDate"
                            value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().split('T')[0] : ""}
                            onChange={(e) => handleInputChange("untilDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Questions Tab Content */}
          {activeTab === "questions" && (
            <div className="card">
              <div className="card-body">
                {qid && qid !== "new" ? (
                  <QuestionEditor />
                ) : (
                  <div>
                    <h4>Quiz Questions</h4>
                    <p className="text-muted">Save the quiz details first, then you can add questions.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
