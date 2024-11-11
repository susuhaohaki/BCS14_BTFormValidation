import { ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, SEARCH_STUDENT } from "../type/FormType";

// Action to add a student
export const addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    payload: student,
  };
};

// Action to edit a student
export const editStudent = (student) => {
  return {
    type: EDIT_STUDENT,
    payload: student,
  };
};

// Action to delete a student
export const deleteStudent = (maSV) => {
  return {
    type: DELETE_STUDENT,
    payload: maSV,
  };
};

// Action to search a student
export const searchStudent = (query) => {
  return {
    type: SEARCH_STUDENT,
    payload: query,
  };
};
