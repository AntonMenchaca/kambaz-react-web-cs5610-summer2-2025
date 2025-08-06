import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { Assignment } from "./types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  const isNewAssignment = aid === "New";

  const defaultAssignment: Assignment = {
    _id: isNewAssignment ? uuidv4() : "",
    title: "",
    course: cid || 'RS101',
    description: "",
    points: 0,
    due_date: "",
    available_from: "",
    available_until: ""
  };

  const foundAssignment = assignments.find((a: Assignment) => a._id === aid);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment>(
    isNewAssignment ? defaultAssignment : (foundAssignment || defaultAssignment)
  );

  useEffect(() => {
    if (isNewAssignment) {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: "",
        course: cid || 'RS101',
        description: "",
        points: 0,
        due_date: "",
        available_from: "",
        available_until: ""
      };
      setCurrentAssignment(newAssignment);
    } else {
      const assignment = assignments.find((a: Assignment) => a._id === aid);
      if (assignment) {
        setCurrentAssignment(assignment);
      }
    }
  }, [aid, assignments, cid, isNewAssignment]);

  // Only allow faculty to access the assignment editor
  if (currentUser.role !== 'FACULTY') {
    return (
      <div className="p-4">
        <h3>Access Denied</h3>
        <p>Only faculty members can edit assignments.</p>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group controlId="wd-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={currentAssignment.title}
            onChange={(e) => {
              setCurrentAssignment({ ...currentAssignment, title: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={currentAssignment.description}
            onChange={(e) =>
              setCurrentAssignment({ ...currentAssignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={3}>Points</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={currentAssignment.points}
              onChange={(e) =>
                setCurrentAssignment({ ...currentAssignment, points: Number(e.target.value) })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={3}>Assignment Group</Form.Label>
          <Col sm={9}>
            <Form.Select
              value="ASSIGNMENTS"
              onChange={() => { }}
              disabled // Not in currentAssignment — disable for now
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={3}>Display Grade As</Form.Label>
          <Col sm={9}>
            <Form.Select
              value="Percentage"
              onChange={() => { }}
              disabled // Not editable in currentAssignment
            >
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={3}>Submission Type</Form.Label>
          <Col sm={9}>
            <Form.Select
              value="Online"
              onChange={() => { }}
              disabled // Not editable in currentAssignment
            >
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </Form.Select>

            <h5 className="mt-3">Online Entry Options</h5>
            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" disabled />
            <Form.Check type="checkbox" label="Website URL" id="wd-website-url" disabled />
            <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" disabled />
            <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" disabled />
            <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" disabled />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-assign-to">
          <Form.Label>Assign To</Form.Label>
          <Form.Select multiple value={["Everyone"]} onChange={() => { }} disabled>
            <option value="Everyone">Everyone</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
          <Form.Label column sm={3}>Due</Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              value={currentAssignment.due_date}
              onChange={(e) =>
                setCurrentAssignment({ ...currentAssignment, due_date: e.target.value })
              }
            />
          </Col>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="wd-available-from">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={currentAssignment.available_from}
              onChange={(e) =>
                setCurrentAssignment({ ...currentAssignment, available_from: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="wd-available-until">
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="date"
              value={currentAssignment.available_until}
              onChange={(e) =>
                setCurrentAssignment({ ...currentAssignment, available_until: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <div className="mt-4">

          <Button
            variant="secondary"
            onClick={() => {
              setCurrentAssignment(foundAssignment || defaultAssignment)
              navigate(`/Kambaz/Courses/${cid}/Assignments`);

            }}
            className="me-2"
            id="wd-cancel-assignment"
          >
            Cancel
          </Button>
          
          {!isNewAssignment && (
            <Button
              variant="outline-danger"
              onClick={async () => {
                try {
                  if (!currentAssignment._id) return;
                  
                  // Confirm before deleting
                  if (window.confirm(`Are you sure you want to delete "${currentAssignment.title}"?`)) {
                    await assignmentsClient.deleteAssignment(currentAssignment._id);
                    dispatch(deleteAssignment({ _id: currentAssignment._id }));
                    navigate(`/Kambaz/Courses/${cid}/Assignments`);
                  }
                } catch (error) {
                  console.error("Error deleting assignment:", error);
                }
              }}
              className="me-2"
              id="wd-delete-assignment"
            >
              Delete
            </Button>
          )}
          
          <Button
            variant="danger"
            onClick={async () => {
              try {
                if (!cid) return;

                if (isNewAssignment) {
                  // Creating a new assignment
                  console.log("Creating new assignment:", currentAssignment);
                  const newAssignment = await assignmentsClient.createAssignmentForCourse(cid, currentAssignment);
                  dispatch(addAssignment(newAssignment));
                } else {
                  // Updating an existing assignment
                  console.log("Updating existing assignment:", currentAssignment);
                  const updatedAssignment = await assignmentsClient.updateAssignment(currentAssignment);
                  dispatch(updateAssignment(updatedAssignment));
                }

                navigate(`/Kambaz/Courses/${cid}/Assignments`);
              } catch (error) {
                console.error("Error saving assignment:", error);
              }
            }}
            id="wd-save-assignment"
          >
            {isNewAssignment ? "Create Assignment" : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
