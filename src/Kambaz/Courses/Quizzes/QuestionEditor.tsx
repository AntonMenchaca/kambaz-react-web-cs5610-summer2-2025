import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import * as quizzesClient from "./client";
import { Question } from "./types";

export default function QuestionEditor() {
  const { qid } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchQuestions = useCallback(async () => {
    if (!qid) return;
    try {
      const questionsData = await quizzesClient.findQuestionsForQuiz(qid);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [qid]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAddQuestion = () => {
    setEditingQuestion({
      title: "Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]
    });
    setIsEditing(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsEditing(true);
  };

  const handleSaveQuestion = async () => {
    if (!qid || !editingQuestion) return;

    try {
      if (editingQuestion._id) {
        await quizzesClient.updateQuestion(editingQuestion._id, editingQuestion);
      } else {
        await quizzesClient.createQuestion(qid, editingQuestion);
      }
      setIsEditing(false);
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await quizzesClient.deleteQuestion(questionId);
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingQuestion(null);
  };

  const handleQuestionChange = (field: keyof Question, value: string | number | boolean | string[]) => {
    setEditingQuestion(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleChoiceChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
    if (!editingQuestion?.choices) return;

    const newChoices = [...editingQuestion.choices];
    newChoices[index] = { ...newChoices[index], [field]: value };

    // If setting this choice as correct, make others incorrect for multiple choice
    if (field === 'isCorrect' && value === true && editingQuestion.type === 'MULTIPLE_CHOICE') {
      newChoices.forEach((choice, i) => {
        if (i !== index) choice.isCorrect = false;
      });
    }

    setEditingQuestion(prev => prev ? { ...prev, choices: newChoices } : null);
  };

  const addChoice = () => {
    if (!editingQuestion?.choices) return;
    setEditingQuestion(prev => prev ? {
      ...prev,
      choices: [...(prev.choices || []), { text: "", isCorrect: false }]
    } : null);
  };

  const removeChoice = (index: number) => {
    if (!editingQuestion?.choices || editingQuestion.choices.length <= 2) return;
    const newChoices = editingQuestion.choices.filter((_, i) => i !== index);
    setEditingQuestion(prev => prev ? { ...prev, choices: newChoices } : null);
  };

  return (
    <div id="wd-question-editor" className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quiz Questions</h3>
        <button className="btn btn-primary" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </button>
      </div>

      {isEditing && editingQuestion && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editingQuestion._id ? 'Edit Question' : 'New Question'}</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Question Title</label>
              <input
                type="text"
                className="form-control"
                value={editingQuestion.title || ""}
                onChange={(e) => handleQuestionChange("title", e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Question Type</label>
                  <select
                    className="form-select"
                    value={editingQuestion.type || "MULTIPLE_CHOICE"}
                    onChange={(e) => handleQuestionChange("type", e.target.value)}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_IN_BLANK">Fill in the Blank</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Points</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editingQuestion.points || 1}
                    onChange={(e) => handleQuestionChange("points", parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Question Text</label>
              <textarea
                className="form-control"
                rows={3}
                value={editingQuestion.question || ""}
                onChange={(e) => handleQuestionChange("question", e.target.value)}
              />
            </div>

            {/* Multiple Choice Options */}
            {editingQuestion.type === "MULTIPLE_CHOICE" && (
              <div className="mb-3">
                <label className="form-label">Answer Choices</label>
                {editingQuestion.choices?.map((choice, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <div className="form-check me-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="correctAnswer"
                        checked={choice.isCorrect}
                        onChange={(e) => handleChoiceChange(index, 'isCorrect', e.target.checked)}
                      />
                    </div>
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder={`Choice ${index + 1}`}
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                    />
                    {editingQuestion.choices && editingQuestion.choices.length > 2 && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeChoice(index)}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button className="btn btn-outline-primary btn-sm" onClick={addChoice}>
                  <FaPlus className="me-1" />
                  Add Choice
                </button>
              </div>
            )}

            {/* True/False Options */}
            {editingQuestion.type === "TRUE_FALSE" && (
              <div className="mb-3">
                <label className="form-label">Correct Answer</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="truefalse"
                      id="true"
                      checked={editingQuestion.correctAnswer === true}
                      onChange={() => handleQuestionChange("correctAnswer", true)}
                    />
                    <label className="form-check-label" htmlFor="true">
                      True
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="truefalse"
                      id="false"
                      checked={editingQuestion.correctAnswer === false}
                      onChange={() => handleQuestionChange("correctAnswer", false)}
                    />
                    <label className="form-check-label" htmlFor="false">
                      False
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Fill in the Blank Options */}
            {editingQuestion.type === "FILL_IN_BLANK" && (
              <div className="mb-3">
                <label className="form-label">Possible Answers (one per line)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Enter possible correct answers, one per line"
                  value={editingQuestion.possibleAnswers?.join('\n') || ""}
                  onChange={(e) => handleQuestionChange("possibleAnswers", e.target.value.split('\n').filter(a => a.trim()))}
                />
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={editingQuestion.caseSensitive || false}
                    onChange={(e) => handleQuestionChange("caseSensitive", e.target.checked)}
                  />
                  <label className="form-check-label">
                    Case Sensitive
                  </label>
                </div>
              </div>
            )}

            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleSaveQuestion}>
                <FaSave className="me-1" />
                Save Question
              </button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                <FaTimes className="me-1" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="list-group">
        {questions.map((question, index) => (
          <div key={question._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h6 className="mb-1">
                  {index + 1}. {question.title}
                </h6>
                <p className="mb-1 text-muted">{question.question}</p>
                <small className="text-muted">
                  Type: {question.type.replace('_', ' ')} | Points: {question.points}
                </small>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEditQuestion(question)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteQuestion(question._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        {questions.length === 0 && !isEditing && (
          <div className="text-center py-4 text-muted">
            No questions added yet. Click "New Question" to add your first question.
          </div>
        )}
      </div>
    </div>
  );
}
