import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import { enrollment, enrollmentState } from "./types";

const initialState: enrollmentState = {
  enrollments: [],
}

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<enrollment[]>) => {
      state.enrollments = action.payload;
    },
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

export const { setEnrollments, addEnrollment, deleteEnrollment, updateEnrollment } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;