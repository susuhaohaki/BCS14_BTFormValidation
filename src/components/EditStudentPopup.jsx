// src/components/EditStudentPopup.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { editStudent } from "../redux/action/FormAction";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditStudentPopup = ({ isOpen, student, onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    hoTen: Yup.string("Họ tên không chứa số")
      .matches(/^[a-zA-Z\s]+$/, "Họ tên không chứa ký tự đặc biệt hoặc số")
      .required("Vui lòng nhập họ và tên"),
    soDT: Yup.string()
      .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ. Vui lòng nhập lại")
      .required("Vui lòng nhập số điện thoại")
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .max(11, "Số điện thoại không quá 11 chữ số"), // Optional: can set max length depending on your format
    email: Yup.string().email("Vui lòng nhập đúng định dạng email").required("Vui lòng nhập email"),
  });

  const handleSaveChanges = (values) => {
    dispatch(editStudent(values));
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-lg w-full">
          <h3 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin sinh viên</h3>
          <Formik
            initialValues={{
              maSV: student.maSV,
              hoTen: student.hoTen,
              soDT: student.soDT,
              email: student.email,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700">Mã SV:</label>
                  <Field type="text" name="maSV" readOnly className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Họ Tên:</label>
                  <Field type="text" name="hoTen" className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="hoTen" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Số Điện Thoại:</label>
                  <Field type="text" name="soDT" className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="soDT" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email:</label>
                  <Field type="email" name="email" className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2">
                    Đóng
                  </button>
                  <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Lưu
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default EditStudentPopup;
