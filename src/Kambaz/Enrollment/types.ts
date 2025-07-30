export type enrollment =  { "_id": string, "user": string, "course": string } 

export type  enrollmentState = {
  enrollments: enrollment[];
};