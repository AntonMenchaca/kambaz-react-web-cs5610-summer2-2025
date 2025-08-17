import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizTaking from "./Quizzes/QuizTaking";
import QuizResults from "./Quizzes/QuizResults";
import { Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useState } from "react";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();

  const course = courses.find((c) => c._id === cid);
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify id="wd-course-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} className={"me-4 fs-4 mb-1"} style={{ cursor: 'pointer' }} />
        {course && course.name} &gt; {pathname.split("/")[4]} </h2> <hr />
      <div className="d-flex">
        <div className={sidebarOpen ? "d-md-block " : "d-none d-md-block"}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Assignments/NewAssignment" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid/details" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/take" element={<QuizTaking />} />
            <Route path="Quizzes/:qid/results" element={<QuizResults />} />
            <Route path="Quizzes/new" element={<QuizEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
