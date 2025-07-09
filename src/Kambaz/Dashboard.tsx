import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/intensiveFoundations.png" width={200} />
            <div>
              <h5> CS5001 Intensive Foundations of CS </h5>
              <p className="wd-dashboard-course-title">
                Intensive Foundations of Computer Science  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/91011/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/discreteStructures.jpg" width={200} />
            <div>
              <h5> CS5002 Discrete Structures </h5>
              <p className="wd-dashboard-course-title">
                Discrete Structures </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/121314/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/java.png" width={200} />
            <div>
              <h5> CS5003 Object Oriented Programming </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Programming </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/151617/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/dataStructures.jpg" width={200} />
            <div>
              <h5> CS5004 Data Structures and Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Data Structures and Algorithms </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/181920/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/javascript.jpg" width={200} />
            <div>
              <h5> CS5005 Software Engineering </h5>
              <p className="wd-dashboard-course-title">
                Software Engineering </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/212223/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/htmlcss.jpg" width={200} />
            <div>
              <h5> CS5006 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Web Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/242526/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/mobile.png" width={200} />
            <div>
              <h5> CS5007 Mobile App Development </h5>
              <p className="wd-dashboard-course-title">
                Mobile App Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/272829/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/database.png" width={200} />
            <div>
              <h5> CS5008 Database Systems </h5>
              <p className="wd-dashboard-course-title">
                Database Systems </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/303132/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/cloud.png" width={200} />
            <div>
              <h5> CS5009 Cloud Computing </h5>
              <p className="wd-dashboard-course-title">
                Cloud Computing </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/333435/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/machinelearning.png" width={200} />
            <div>
              <h5> CS5010 Machine Learning </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/363738/Home"
            className="wd-dashboard-course-link" >
            <img src="/images/artificialintelligence.jpeg" width={200} />
            <div>
              <h5> CS5011 Artificial Intelligence </h5>
              <p className="wd-dashboard-course-title">
                Artificial Intelligence </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
