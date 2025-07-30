export type Assignment = {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due_date: string;
  available_from: string;
  available_until: string;
};
export type AssignmentState = {
  assignments: Assignment[];
};