import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
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
        <Button variant="primary" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>

      {isEditing && editingQuestion && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editingQuestion._id ? 'Edit Question' : 'New Question'}</h5>
          </div>
          <div className="card-body">
            <Form.Group className="mb-3">
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                value={editingQuestion.title || ""}
                onChange={(e) => handleQuestionChange("title", e.target.value)}
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Question Type</Form.Label>
                  <Form.Select
                    value={editingQuestion.type || "MULTIPLE_CHOICE"}
                    onChange={(e) => handleQuestionChange("type", e.target.value)}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_IN_BLANK">Fill in the Blank</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    type="number"
                    value={editingQuestion.points || 1}
                    onChange={(e) => handleQuestionChange("points", parseInt(e.target.value) || 1)}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Question Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.question || ""}
                onChange={(e) => handleQuestionChange("question", e.target.value)}
              />
            </Form.Group>

            {/* Multiple Choice Options */}
            {editingQuestion.type === "MULTIPLE_CHOICE" && (
              <Form.Group className="mb-3">
                <Form.Label>Answer Choices</Form.Label>
                {editingQuestion.choices?.map((choice, index) => (
                  <InputGroup className="mb-2" key={index}>
                    <InputGroup.Radio
                      name="correctAnswer"
                      checked={choice.isCorrect}
                      onChange={(e) => handleChoiceChange(index, 'isCorrect', e.target.checked)}
                    />
                    <Form.Control
                      type="text"
                      placeholder={`Choice ${index + 1}`}
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                    />
                    {editingQuestion.choices && editingQuestion.choices.length > 2 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeChoice(index)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </InputGroup>
                ))}
                <Button variant="outline-primary" size="sm" onClick={addChoice}>
                  <FaPlus className="me-1" />
                  Add Choice
                </Button>
              </Form.Group>
            )}

            {/* True/False Options */}
            {editingQuestion.type === "TRUE_FALSE" && (
              <Form.Group className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    name="truefalse"
                    id="true"
                    label="True"
                    checked={editingQuestion.correctAnswer === true}
                    onChange={() => handleQuestionChange("correctAnswer", true)}
                  />
                  <Form.Check
                    type="radio"
                    name="truefalse"
                    id="false"
                    label="False"
                    checked={editingQuestion.correctAnswer === false}
                    onChange={() => handleQuestionChange("correctAnswer", false)}
                  />
                </div>
              </Form.Group>
            )}

            {/* Fill in the Blank Options */}
            {editingQuestion.type === "FILL_IN_BLANK" && (
              <Form.Group className="mb-3">
                <Form.Label>Possible Answers (one per line)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter possible correct answers, one per line"
                  value={editingQuestion.possibleAnswers?.join('\n') || ""}
                  onChange={(e) => handleQuestionChange("possibleAnswers", e.target.value.split('\n').filter(a => a.trim()))}
                />
                <Form.Check
                  className="mt-2"
                  type="checkbox"
                  label="Case Sensitive"
                  checked={editingQuestion.caseSensitive || false}
                  onChange={(e) => handleQuestionChange("caseSensitive", e.target.checked)}
                />
              </Form.Group>
            )}

            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleSaveQuestion}>
                <FaSave className="me-1" />
                Save Question
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                <FaTimes className="me-1" />
                Cancel
              </Button>
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
              <div  >
                <Button className="m-2" variant="outline-primary" size="sm" onClick={() => handleEditQuestion(question)}>
                  <FaEdit />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteQuestion(question._id)}>
                  <FaTrash />
                </Button>
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
