import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { enrollment } from "./Enrollment/types";
import { useState } from "react";
import { addEnrollment, deleteEnrollment } from "./Enrollment/reducer";
export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: { courses: any, course: any, setCourse: (course: any) => void, addNewCourse: () => void, deleteCourse: (id: string) => void, updateCourse: () => void }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentReducer.enrollments);
  const [showEnrollments, setShowEnrollments] = useState(false);
  const dispatch = useDispatch();
  console.log("enrollments", enrollments);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === 'FACULTY' &&
        <>
          <h5>New Course
            <Button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse} > Add </Button>
            <Button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </Button>
            <Button variant="primary" className="btn float-end me-2"
              onClick={() => setShowEnrollments(!showEnrollments)} id="wd-update-course-click">
              {!showEnrollments ? "Enrolled Courses" : "Enrollments"}
            </Button>
          </h5><br />
          <FormControl value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder={course.name} className="mb-2" />
          <FormControl value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} placeholder={course.description} className="mb-2" />
          <hr />
        </>}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button className="me-4" variant="primary"> Go </Button>


                    {currentUser.role === 'FACULTY' && <>
                      <Button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning ms-4 me-2" >
                        Edit
                      </Button>

                      <Button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }} className="btn btn-danger m-s-10 me-0"
                        id="wd-delete-course-click">
                        Delete
                      </Button>
                      <Button variant={showEnrollments ? "danger" : "primary"} onClick={(event) => {
                        event.preventDefault();
                        if (!showEnrollments) {
                          dispatch(addEnrollment({ _id: course._id, user: currentUser._id, course: course.name }));
                        } else {
                          dispatch(deleteEnrollment({ _id: course._id, }));
                        }
                      }} className="btn btn-danger m-s-10 me-0"
                      >
                        {showEnrollments ? "Unenroll" : "Enroll"}
                      </Button>
                    </>}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}
