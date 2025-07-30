import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import { enrollment, enrollmentState } from "./types";
import * as db from "../Database";
const initialState: enrollmentState = {
  enrollments: db.enrollments,
}

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<enrollment>) => {
      state.enrollments.push(action.payload);
    },
    deleteEnrollment: (state, action: PayloadAction<{ _id: string }>) => {
      state.enrollments = state.enrollments.filter(
        (a: enrollment) => a._id !== action.payload._id
      );
    },
    updateEnrollment: (state, action: PayloadAction<enrollment>) => {
      const index = state.enrollments.findIndex(
        (a: enrollment) => a._id === action.payload._id
      );
      if (index !== -1) {
        state.enrollments[index] = action.payload;
      }
    },
  },
});

export const { addEnrollment, deleteEnrollment, updateEnrollment } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;