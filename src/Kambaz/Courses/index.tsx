import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
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
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
