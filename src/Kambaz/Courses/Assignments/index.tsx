import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import "./index.css";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useSelector } from "react-redux";
import { Assignment } from "./types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Assignments() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments }: { assignments: Assignment[] } = useSelector((state: any) => state.assignmentReducer);
  useEffect(() => {
    console.log("Assignments loaded:", assignments);
  }, [assignments]);
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

        {currentUser.role === 'FACULTY' && <div>
          <Button variant="secondary" className="me-2">
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>}
      </div>

      {/* Header */}
      <div style={{ height: 80, backgroundColor: "#adafb0ff" }} className="d-flex align-items-center rounded ">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  <BsGripVertical className="fs-5 text-secondary me-3 mt-1" /><h5 className="fw-bold me-3 mb-0">ASSIGNMENTS</h5></div>

        <div className="wd-assignment-title">
          <div className="text-secondary border-rounded p-1 ">40% of Total</div>
          <Link to={`/Kambaz/Courses/${assignments[0]?.course}/Assignments/New`}>
            <FaPlus size={24} style={{ cursor: "pointer" }} />
          </Link>
          <LessonControlButtons />
        </div>
      </div>

      {/* Assignment list */}
      <ListGroup className="border-0">
        {assignments.map(({ _id, title, course }) => (
          <ListGroup.Item
            key={_id}
            className="d-flex align-items-start p-3 mb-3 rounded border-1"
            style={{ backgroundColor: "#fff" }}
          >
            <BsGripVertical className="fs-5 text-secondary me-3 mt-1" />
            <div className="flex-grow-1">
              <a
                href={`#/Kambaz/Courses/${course}/Assignments/${_id}`}
                className="fw-bold text-dark text-decoration-none d-block mb-1"
              >
                {title}
              </a>
              {/* Commenting out since we currently don't have these fields in the data
              <div className="text-muted small mb-1">
                <span className="text-danger">Multiple Modules</span>{" "}
                | <strong>Not available until</strong> {available} |
              </div>
              <div className="text-muted small">
                <strong>Due:</strong> {due} | {points} pts
              </div> */}
            </div>
            <LessonControlButtons />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
