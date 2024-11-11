import { ADD_STUDENT, DELETE_STUDENT, EDIT_STUDENT, SEARCH_STUDENT } from "../type/FormType";

const initialState = {
  students: JSON.parse(localStorage.getItem("students")) || [],
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      const updatedStudents = [...state.students, action.payload];
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      return {
        ...state,
        students: updatedStudents,
      };

    case DELETE_STUDENT:
      const filteredStudents = state.students.filter((student) => student.maSV !== action.payload);
      localStorage.setItem("students", JSON.stringify(filteredStudents));
      return {
        ...state,
        students: filteredStudents,
      };

    case EDIT_STUDENT:
      // Update the student in the array
      const editedStudents = state.students.map((student) => (student.maSV === action.payload.maSV ? action.payload : student));
      localStorage.setItem("students", JSON.stringify(editedStudents));
      return {
        ...state,
        students: editedStudents,
      };

    case SEARCH_STUDENT:
      // Get the search query and handle case sensitivity
      const searchQuery = action.payload.toLowerCase();

      // Log the search query (optional, for debugging)
      console.log("🚀 ~ formReducer ~ searchQuery:", searchQuery);

      // If search query is empty, return all students
      if (searchQuery.trim() === "") {
        return {
          ...state,
          students: JSON.parse(localStorage.getItem("students")) || [],
        };
      }

      // Filter the students based on the search query (e.g., search by name or ID)
      const searchedStudents = state.students.filter((student) => {
        const studentEmail = student.email ? student.email.toLowerCase() : "";
        const studentPhone = student.soDT ? student.soDT.toLowerCase() : "";
        const studentName = student.hoTen ? student.hoTen.toLowerCase() : "";
        const studentId = student.maSV ? student.maSV.toString().toLowerCase() : "";
        // Check if the student name or ID includes the search query
        return studentName.includes(searchQuery) || studentId.includes(searchQuery) || studentEmail.includes(searchQuery) || studentPhone.includes(searchQuery);
      });

      return {
        ...state,
        students: searchedStudents,
      };

    default:
      return state;
  }
};

export default formReducer;
