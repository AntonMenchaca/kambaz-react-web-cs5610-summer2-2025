import Account from "./Account";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, updateCourse } from "./Courses/reducer";
import Session from "./Account/Session";
import * as client from "./Courses/client";
import * as userClient from "./Account/client";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);


  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={() => dispatch(deleteCourse(course._id))}
                  updateCourse={() => dispatch(updateCourse(course))} />
              </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            } />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
