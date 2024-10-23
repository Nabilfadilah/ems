import React, { useState } from "react";
import Typography from "../../elements/text/Typography";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../elements/button/Button";
import { IoMdArrowBack } from "react-icons/io";
import Label from "../../elements/input/Label";
import InputForm from "../../elements/input/InputForm";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import ModalAdd from "../../elements/popup/ModalAdd";
import * as Yup from "yup";
import { useFormik } from "formik";

// validasi yup
const validationAdd = Yup.object({
  leaveType: Yup.string().required("Jenis Cuti harus diisi"),
  startDate: Yup.date().required("Tanggal Awal harus diisi").nullable(),
  endDate: Yup.date().required("Tanggal Akhir harus diisi").nullable(),
  reason: Yup.string().required("Alasan harus diisi"),
});

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // menggunakan formik
  const formik = useFormik({
    initialValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      // startDate: new Date().toISOString().split("T")[0], // Format tanggal menjadi YYYY-MM-DD
      // endDate: new Date().toISOString().split("T")[0],
      reason: "",
    },
    validationSchema: validationAdd,
    onSubmit: async (values) => {
      console.log("Ini data add leave karyawan : ", values);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/leave/add",
          { ...values, userId: user._id }, // Gabungkan formik values dengan userId
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        ModalAdd();
        if (response.data.success) {
          navigate(`/employee-dashboard/leaves/${user._id}`);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-bold">
          Alasan Permintaan Cuti
        </Typography>
        <Link to={`/employee-dashboard/leaves/${user._id}`}>
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1 shadow-xl font-bold">
            <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Kembali
          </Button>
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* leave type */}
          <div>
            <Label>Jenis Cuti</Label>
            <select
              name="leaveType"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.leaveType && formik.errors.leaveType
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.leaveType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select Type</option>
              <option value="sick_leave">Sick Leave</option>
              <option value="casual_leave">Casual Leave</option>
              <option value="annual_leave">Annual Leave</option>
            </select>
            {formik.touched.leaveType && formik.errors.leaveType ? (
              <div className="text-red-500 text-sm">
                {formik.errors.leaveType}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* start date */}
            <div>
              <InputForm
                className={`w-full ${
                  formik.touched.startDate && formik.errors.startDate
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                name="startDate"
                label="Start Date"
                type="date"
                placeholder="John Doe"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.startDate}
                </div>
              ) : null}
            </div>

            {/* end date */}
            <div>
              <InputForm
                className={`w-full ${
                  formik.touched.endDate && formik.errors.endDate
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                name="endDate"
                label="End Date"
                type="date"
                placeholder="John Doe"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.endDate}
                </div>
              ) : null}
            </div>
          </div>

          {/* date */}
          <div>
            <Label>Alasan</Label>
            <textarea
              name="reason"
              placeholder="Alasan"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.reason && formik.errors.reason
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.reason && formik.errors.reason ? (
              <div className="text-red-500 text-sm">{formik.errors.reason}</div>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
          >
            Simpan Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
