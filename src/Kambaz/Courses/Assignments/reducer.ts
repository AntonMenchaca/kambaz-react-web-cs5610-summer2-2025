import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Assignment, AssignmentState } from "./types";

const initialState: AssignmentState = {
  assignments: [],
} 

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<{ _id: string }>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload._id
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const index = state.assignments.findIndex(
        (a) => a._id === action.payload._id
      );
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } =
  assignmentSlice.actions;

export default assignmentSlice.reducer;