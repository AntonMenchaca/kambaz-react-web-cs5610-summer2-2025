import axios from "axios";
import { axiosWithCredentials } from "../Account/client";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/courses/${courseId}`);
    return response.data;
};

export const updateCourse = async (course: any) => {
    const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/courses/${course._id}`, course);
    return response.data;
};
