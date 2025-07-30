import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import { course, courseState } from "./types";
import * as db from "../Database";
const initialState: courseState = {
  courses: db.courses,
  course: { "_id": "", "name": "", "number": "", "startDate": "", "endDate": "", "department": "", "credits": 0, "description": "" },
} 

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<course>) => {
      console.log("Adding course:", action.payload);
      console.log('the state before adding:', state);
      state.courses.push(action.payload);
    },
    deleteCourse: (state, action: PayloadAction<{ _id: string }>) => {
      state.courses = state.courses.filter(
        (a) => a._id !== action.payload._id
      );
    },
    updateCourse: (state, action: PayloadAction<course>) => {
      const index = state.courses.findIndex(
        (a) => a._id === action.payload._id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } =
  courseSlice.actions;

export default courseSlice.reducer;