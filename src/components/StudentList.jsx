import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, searchStudent } from "../redux/action/FormAction";
import EditStudentPopup from "./EditStudentPopup";

const StudentList = () => {
  const students = useSelector((state) => state.formReducer.students);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const dispatch = useDispatch();

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteClick = (maSV) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sinh viên này?");
    if (confirmDelete) {
      dispatch(deleteStudent(maSV));
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log("🚀 ~ handleSearchChange ~ query:", query);
    dispatch(searchStudent(query));
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 mt-10">Danh Sách Sinh Viên</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input type="text" placeholder="Tìm kiếm sinh viên..." onChange={handleSearchChange} className="border p-2 rounded-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Mã SV</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Họ Tên</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Số Điện Thoại</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Email</th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Action</th>
            </tr>
          </thead>

          {students.length > 0 ? (
            <tbody>
              {students.map((student) => (
                <tr key={student.maSV} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">{student.maSV}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">{student.hoTen}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">{student.soDT}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">{student.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    <button onClick={() => handleEditClick(student)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2">
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student.maSV)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mx-2"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="py-4 text-lg font-medium text-gray-500">
                  Hiện chưa có dữ liệu sinh viên
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      <EditStudentPopup isOpen={isModalOpen} student={selectedStudent} onClose={handleCloseModal} />
    </>
  );
};

export default StudentList;
