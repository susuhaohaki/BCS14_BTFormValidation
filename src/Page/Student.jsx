import React from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

const Student = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default Student;
