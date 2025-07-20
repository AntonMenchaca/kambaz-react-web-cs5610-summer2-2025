import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./styles.css";
import * as db from "./Database";
const courses = db.courses;
const myCourses = [
  {
    id: "1234",
    img: "/images/reactjs.jpg",
    title: "CS1234 React JS",
    description: "Full Stack software developer",
  },
  {
    id: "5678",
    img: "/images/intensiveFoundations.png",
    title: "CS5001 Intensive Foundations of CS",
    description: "Intensive Foundations of Computer Science",
  },
  {
    id: "91011",
    img: "/images/discreteStructures.jpg",
    title: "CS5002 Discrete Structures",
    description: "Discrete Structures",
  },
  {
    id: "121314",
    img: "/images/java.png",
    title: "CS5003 Object Oriented Programming",
    description: "Object Oriented Programming",
  },
  {
    id: "151617",
    img: "/images/dataStructures.jpg",
    title: "CS5004 Data Structures and Algorithms",
    description: "Data Structures and Algorithms",
  },
  {
    id: "181920",
    img: "/images/javascript.jpg",
    title: "CS5005 Software Engineering",
    description: "Software Engineering",
  },
  {
    id: "212223",
    img: "/images/htmlcss.jpg",
    title: "CS5006 Web Development",
    description: "Web Development",
  },
  {
    id: "242526",
    img: "/images/mobile.png",
    title: "CS5007 Mobile App Development",
    description: "Mobile App Development",
  },
  {
    id: "272829",
    img: "/images/database.png",
    title: "CS5008 Database Systems",
    description: "Database Systems",
  },
  {
    id: "303132",
    img: "/images/cloud.png",
    title: "CS5009 Cloud Computing",
    description: "Cloud Computing",
  },
  {
    id: "333435",
    img: "/images/machinelearning.png",
    title: "CS5010 Machine Learning",
    description: "Machine Learning",
  },
  {
    id: "363738",
    img: "/images/artificialintelligence.jpeg",
    title: "CS5011 Artificial Intelligence",
    description: "Artificial Intelligence",
  },
];
export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
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
                    <Button variant="primary"> Go </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}
