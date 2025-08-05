import { axiosWithCredentials } from "../Account/client";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  console.log("Deleting course with ID:", courseId);
    const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/courses/${courseId}`);
    return response.data;
};

export const updateCourse = async (course: any) => {
    const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/courses/${course._id}`, course);
    return response.data;
};
