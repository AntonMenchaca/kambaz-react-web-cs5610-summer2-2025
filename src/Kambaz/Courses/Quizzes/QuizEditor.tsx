import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaTimes } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Quiz } from "./types";
import QuestionEditor from "./QuestionEditor";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

  const handleInputChange = (field: keyof Quiz, value: string | number | boolean | Date | undefined) => {
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
              <Button variant="secondary" className="me-2" onClick={handleCancel}>
                <FaTimes className="me-1" />
                Cancel
              </Button>
              <Button variant="secondary" className="me-2" onClick={handleSave}>
                <FaSave className="me-1" />
                Save
              </Button>
              <Button variant="primary" onClick={handleSaveAndPublish}>
                <FaSave className="me-1" />
                Save & Publish
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-4">
            <Button
              variant={activeTab === "details" ? "primary" : "outline-primary"}
              className="me-2"
              onClick={() => setActiveTab("details")}
            >
              Details
            </Button>
            <Button
              variant={activeTab === "questions" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("questions")}
            >
              Questions
            </Button>
          </div>

          {/* Details Tab Content */}
          {activeTab === "details" && (
            <div className="card">
              <div className="card-body">
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={quiz.description || ""}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </Form.Group>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Quiz Type</Form.Label>
                        <Form.Select
                          value={quiz.quizType || "GRADED_QUIZ"}
                          onChange={(e) => handleInputChange("quizType", e.target.value)}
                        >
                          <option value="GRADED_QUIZ">Graded Quiz</option>
                          <option value="PRACTICE_QUIZ">Practice Quiz</option>
                          <option value="GRADED_SURVEY">Graded Survey</option>
                          <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Points</Form.Label>
                        <Form.Control
                          type="number"
                          value={quiz.points || 0}
                          onChange={(e) => handleInputChange("points", parseInt(e.target.value) || 0)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Assignment Group</Form.Label>
                        <Form.Select
                          value={quiz.assignmentGroup || "QUIZZES"}
                          onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
                        >
                          <option value="QUIZZES">Quizzes</option>
                          <option value="EXAMS">Exams</option>
                          <option value="ASSIGNMENTS">Assignments</option>
                          <option value="PROJECT">Project</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="hasTimeLimit"
                          label="Enable Time Limit"
                          checked={quiz.timeLimit !== undefined && quiz.timeLimit !== null}
                          onChange={e => {
                            if (e.target.checked) {
                              handleInputChange("timeLimit", quiz.timeLimit || 20);
                            } else {
                              handleInputChange("timeLimit", undefined);
                            }
                          }}
                        />
                        <Form.Label className="mt-2">Time Limit (minutes)</Form.Label>
                        <Form.Control
                          type="number"
                          value={quiz.timeLimit ?? ''}
                          min={1}
                          disabled={quiz.timeLimit === undefined || quiz.timeLimit === null}
                          onChange={e => handleInputChange("timeLimit", parseInt(e.target.value) || 1)}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="shuffleAnswers"
                      label="Shuffle Answers"
                      checked={quiz.shuffleAnswers || false}
                      onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="multipleAttempts"
                      label="Allow Multiple Attempts"
                      checked={quiz.multipleAttempts || false}
                      onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
                    />
                  </Form.Group>

                  {quiz.multipleAttempts && (
                    <Form.Group className="mb-3">
                      <Form.Label>How Many Attempts</Form.Label>
                      <Form.Control
                        type="number"
                        value={quiz.howManyAttempts || 1}
                        onChange={(e) => handleInputChange("howManyAttempts", parseInt(e.target.value) || 1)}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Access Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.accessCode || ""}
                      onChange={(e) => handleInputChange("accessCode", e.target.value)}
                      placeholder="Leave blank for no access code"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="oneQuestionAtATime"
                      label="One Question at a Time"
                      checked={quiz.oneQuestionAtATime || false}
                      onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="webcamRequired"
                      label="Webcam Required"
                      checked={quiz.webcamRequired || false}
                      onChange={(e) => handleInputChange("webcamRequired", e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id="lockQuestionsAfterAnswering"
                      label="Lock Questions After Answering"
                      checked={quiz.lockQuestionsAfterAnswering || false}
                      onChange={(e) => handleInputChange("lockQuestionsAfterAnswering", e.target.checked)}
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().split('T')[0] : ""}
                          onChange={(e) => handleInputChange("dueDate", e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Available From</Form.Label>
                        <Form.Control
                          type="date"
                          value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().split('T')[0] : ""}
                          onChange={(e) => handleInputChange("availableDate", e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Available Until</Form.Label>
                        <Form.Control
                          type="date"
                          value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().split('T')[0] : ""}
                          onChange={(e) => handleInputChange("untilDate", e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Form>
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
