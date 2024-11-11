import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "./../redux/action/FormAction";

const StudentForm = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.formReducer.students);
  const formik = useFormik({
    initialValues: {
      maSV: "",
      hoTen: "",
      soDT: "",
      email: "",
    },
    validationSchema: Yup.object({
      maSV: Yup.number("Vui lòng nhập số").required("Vui lòng nhập mã sinh viên").typeError("Mã sinh viên phải là một số"),
      hoTen: Yup.string("Họ tên không chứa số")
        .matches(/^[a-zA-Z\s]+$/, "Họ tên không chứa ký tự đặc biệt hoặc số")
        .required("Vui lòng nhập họ và tên"),
      soDT: Yup.string()
        .matches(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, "Số điện thoại không hợp lệ. Vui lòng nhập lại")
        .required("Vui lòng nhập số điện thoại")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(11, "Số điện thoại không quá 11 chữ số"),
      email: Yup.string().email("Vui lòng nhập đúng định dạng email").required("Vui lòng nhập email"),
    }),
    onSubmit: (values) => {
      const isDuplicate = students.some((student) => student.maSV === values.maSV);
      if (isDuplicate) {
        // Thêm lỗi vào formik.errors để hiển thị thông báo
        formik.setErrors({
          ...formik.errors,
          maSV: "Mã sinh viên đã tồn tại. Vui lòng nhập mã khác.",
        });
      } else {
        dispatch(addStudent(values));
      }
    },

    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Thông tin Sinh Viên</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="maSV" className="block text-sm font-semibold text-gray-700 mb-2">
              Mã Sinh Viên
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.maSV}
              type="number"
              id="maSV"
              name="maSV"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mã sinh viên"
            />
            {formik.errors.maSV && formik.touched.maSV && <div className="text-red-500">{formik.errors.maSV}</div>}
          </div>

          <div>
            <label htmlFor="hoTen" className="block text-sm font-semibold text-gray-700 mb-2">
              Họ và Tên
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.hoTen}
              type="text"
              id="hoTen"
              name="hoTen"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập họ và tên"
            />
            {formik.errors.hoTen && formik.touched.hoTen && <div className="text-red-500">{formik.errors.hoTen}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <label htmlFor="soDT" className="block text-sm font-semibold text-gray-700 mb-2">
              Số Điện Thoại
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.soDT}
              type="tel"
              id="soDT"
              name="soDT"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập số điện thoại"
            />
            {formik.errors.soDT && formik.touched.soDT && <div className="text-red-500">{formik.errors.soDT}</div>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập email"
            />
            {formik.errors.email && formik.touched.email && <div className="text-red-500">{formik.errors.email}</div>}
          </div>
        </div>

        <div className="flex justify-start">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Thêm Sinh Viên
          </button>
        </div>
      </form>
    </>
  );
};

export default StudentForm;
