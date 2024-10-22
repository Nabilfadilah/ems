import React, { useState } from "react";
import Typography from "../elements/text/Typography";
import InputForm from "../elements/input/InputForm";
import Button from "../elements/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Label from "../elements/input/Label";
import axios from "axios";
import ModalAdd from "../../components/elements/popup/ModalAdd";
import * as Yup from "yup";
import { useFormik } from "formik";

// validasi yup
const validationAdd = Yup.object({
  dep_name: Yup.string().required("Nama Departemen harus diisi"),
  description: Yup.string().required("Deskripsi harus diisi"),
});

const AddDepartment = () => {
  const navigate = useNavigate();

  // menggunakan formik
  const formik = useFormik({
    initialValues: {
      dep_name: "",
      description: "",
    },
    validationSchema: validationAdd,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/department/add",
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        ModalAdd();
        if (response.data.success) {
          navigate("/admin-dashboard/departments");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    },
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDepartment({ ...department, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-bold">Tambah Departemen</Typography>
        <Link to="/admin-dashboard/departments">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1 shadow-xl font-bold">
            <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Kembali
          </Button>
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <InputForm
            className={`w-full ${
              formik.touched.dep_name && formik.errors.dep_name
                ? "border-red-500"
                : "border-gray-400"
            }`}
            name="dep_name"
            label="Nama Departemen"
            type="text"
            placeholder="John Doe"
            value={formik.values.dep_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="w-full mt-5">
          <Label>Deskripsi</Label>
          <textarea
            name="description"
            placeholder="John Doe"
            className={`mt-1 p-2 block w-full border rounded-md ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-400"
            }`}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-600 w-full font-bold text-white h-8 mt-5"
        >
          Simpan Data
        </Button>
      </form>
    </div>
  );
};

export default AddDepartment;
