import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { assignments } from "../../Database";
export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignment = assignments.find((a) => a._id === aid);

  return (

    <div id="wd-assignments-editor" className="p-4">
      {assignment ?
        <Form>
          <Form.Group controlId="wd-name" className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control type="text" defaultValue={assignment?.title} />
          </Form.Group>

          <Form.Group controlId="wd-description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={assignment.description} />
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-points">
            <Form.Label column sm={3}>Points</Form.Label>
            <Col sm={9}>
              <Form.Control type="number" defaultValue={100} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-group">
            <Form.Label column sm={3}>Assignment Group</Form.Label>
            <Col sm={9}>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
            <Form.Label column sm={3}>Display Grade As</Form.Label>
            <Col sm={9}>
              <Form.Select defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
            <Form.Label column sm={3}>Submission Type</Form.Label>
            <Col sm={9}>
              <Form.Select defaultValue="Online">
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </Form.Select>

              <h5 className="mt-3">Online Entry Options</h5>
              <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
              <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
              <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
              <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
              <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label>Assign To</Form.Label>
            <Form.Select multiple defaultValue={["Everyone"]}>
              <option value="Everyone">Everyone</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
            <Form.Label column sm={3}>Due</Form.Label>
            <Col sm={9}>
              <Form.Control type="date" defaultValue={assignment?.due_date} />
            </Col>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="wd-available-from">
              <Form.Label>Available From</Form.Label>
              <Form.Control type="date" defaultValue={assignment?.available_from} />
            </Form.Group>
            <Form.Group as={Col} controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control type="date" defaultValue={assignment?.available_until} />
            </Form.Group>
          </Row>

          <div className="mt-4">
            <Button variant="secondary" className="me-2" id="wd-cancel-assignment">Cancel</Button>
            <Button variant="danger" id="wd-save-assignment">Save</Button>
          </div>
        </Form>
        : <div>No Assignment Found</div>}

    </div>
  );
}
