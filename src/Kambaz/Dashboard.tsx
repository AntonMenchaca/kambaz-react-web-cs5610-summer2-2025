import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import "./styles.css";
import { useSelector } from "react-redux";
import { useState } from "react";
export default function Dashboard({
  courses,
  allCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrollInCourse,
  unenrollFromCourse
}: {
  courses: any,
  allCourses: any,
  course: any,
  setCourse: (course: any) => void,
  addNewCourse: () => void,
  deleteCourse: (id: string) => void,
  updateCourse: () => void,
  enrollInCourse: (courseId: string) => void,
  unenrollFromCourse: (courseId: string) => void
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showEnrollments, setShowEnrollments] = useState(false);

  // Helper function to check if user is enrolled in a course
  const isUserEnrolled = (courseId: string) => {
    return courses.some((enrolledCourse: any) => enrolledCourse._id === courseId);
  };

  // Get the courses to display based on showEnrollments state
  const displayCourses = showEnrollments ? allCourses : courses;


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* Toggle button for all users */}
      <div className="mb-3">
        <Button variant="primary" className="btn float-end"
          onClick={() => setShowEnrollments(!showEnrollments)} id="wd-enrollments-button">
          {!showEnrollments ? "Enrollments" : "Enrolled Courses"}
        </Button>
        <div className="clearfix"></div>
      </div>

      {/* FACULTY ONLY */}
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
          </h5><br />
          <FormControl value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder={course.name} className="mb-2" />
          <FormControl value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} placeholder={course.description} className="mb-2" />
          <hr />
        </>}

      <h2 id="wd-dashboard-published">
        {showEnrollments ? `All Courses (${allCourses.length})` : `My Courses (${courses.length})`}
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayCourses.map((course: any) => (

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
                  </Card.Body>
                </Link>

                {/* Button container outside of Link to prevent event conflicts */}
                <Card.Body className="pt-0">
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/Kambaz/Courses/${course._id}/Home`} className="flex-fill">
                      <Button variant="primary" className="w-100"> Go </Button>
                    </Link>

                    {/* Enroll/Unenroll button for ALL users */}
                    <Button variant={isUserEnrolled(course._id) ? "danger" : "success"}
                      onClick={async (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!isUserEnrolled(course._id)) {
                          // Enroll in course using server API
                          await enrollInCourse(course._id);
                        } else {
                          // Unenroll from course using server API
                          await unenrollFromCourse(course._id);
                        }
                      }}
                      className="flex-fill"
                    >
                      {isUserEnrolled(course._id) ? "Unenroll" : "Enroll"}
                    </Button>

                    {/* Edit/Delete buttons for FACULTY only */}
                    {currentUser.role === 'FACULTY' && <>
                      <Button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        variant="warning"
                        className="flex-fill"
                      >
                        Edit
                      </Button>

                      <Button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                        variant="danger"
                        className="flex-fill"
                        id="wd-delete-course-click">
                        Delete
                      </Button>
                    </>}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}
