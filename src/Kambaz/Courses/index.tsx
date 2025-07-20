import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { courses } from "../Database";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((c) => c._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
