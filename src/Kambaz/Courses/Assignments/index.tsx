import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import "./index.css";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  const assignments = [
    {
      id: 1,
      title: "A1 - ENV + HTML",
      available: "May 6 at 12:00am",
      due: "May 13 at 11:59pm",
      points: 100,
    },
    {
      id: 2,
      title: "A2 - CSS + BOOTSTRAP",
      available: "May 13 at 12:00am",
      due: "May 20 at 11:59pm",
      points: 100,
    },
    {
      id: 3,
      title: "A3 - JAVASCRIPT + REACT",
      available: "May 20 at 12:00am",
      due: "May 27 at 11:59pm",
      points: 100,
    },
  ];

  return (
    <div id="wd-assignments" className="p-4">
      {/* Search and buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <InputGroup style={{ maxWidth: "350px" }} id="wd-search-assignment-group">
          <InputGroup.Text className="bg-white border-end-0">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Assignments"
            className="border-start-0"
          />
        </InputGroup>

        <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  <BsGripVertical className="fs-5 text-secondary me-3 mt-1" /><h5 className="fw-bold me-3 mb-0">ASSIGNMENTS</h5></div>

        <div className="wd-assignment-title">
          <div className="text-secondary">40% of Total</div>
          <Button variant="light" size="sm">
            <FaPlus />
          </Button>
          <LessonControlButtons />
        </div>
      </div>

      {/* Assignment list */}
      <ListGroup className="border-0">
        {assignments.map(({ id, title, available, due, points }) => (
          <ListGroup.Item
            key={id}
            className="d-flex align-items-start p-3 mb-3 rounded border-start"
            style={{ backgroundColor: "#fff" }}
          >
            <BsGripVertical className="fs-5 text-secondary me-3 mt-1" />
            <div className="flex-grow-1">
              <a
                href={`#/Kambaz/Courses/1234/Assignments/${id}`}
                className="fw-bold text-dark text-decoration-none d-block mb-1"
              >
                {title}
              </a>
              <div className="text-muted small mb-1">
                <span className="text-danger">Multiple Modules</span>{" "}
                | <strong>Not available until</strong> {available} |
              </div>
              <div className="text-muted small">
                <strong>Due:</strong> {due} | {points} pts
              </div>
            </div>
            <LessonControlButtons />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
