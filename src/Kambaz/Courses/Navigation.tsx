import { Link, useParams, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const chosenPath = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = pathname === chosenPath;

        return (
          <Link

            key={link}
            to={chosenPath}
            className={`list-group-item border-0 ${isActive
              ? "active text-black bg-white" : "text-danger "}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
