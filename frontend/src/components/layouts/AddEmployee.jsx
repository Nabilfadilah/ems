import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import InputForm from "../elements/input/InputForm";
import Label from "../elements/input/Label";
import Button from "../elements/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import ModalAdd from "../../components/elements/popup/ModalAdd";
import * as Yup from "yup";
import { useFormik } from "formik";
import CurrencyInput from "react-currency-input-field";

// validasi login
const validationAdd = Yup.object({
  name: Yup.string().required("Nama harus diisi"),
  email: Yup.string()
    .email("Alamat email salah")
    .required("Email harus diisi."),
  employeeId: Yup.string().required("ID Karyawan harus diisi"),
  dob: Yup.string().required("Tanggal lahir harus diisi"),
  gender: Yup.string().required("Gender harus diisi"),
  maritalStatus: Yup.string().required("Status harus diisi"),
  designation: Yup.string().required("Penamaan harus diisi"),
  department: Yup.string().required("Departemen harus diisi"),
  salary: Yup.string().required("Gaji harus diisi"),
  password: Yup.string()
    .min(5, "Password minimal harus 5 karakter")
    .required("Password harus diisi."),
  role: Yup.string().required("Posisi harus diisi"),
  image: Yup.string().required("Gambar harus diisi"),
});

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  // const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // menggunakan formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      employeeId: "",
      dob: new Date(),
      gender: "",
      maritalStatus: "",
      departments: "",
      designation: "",
      salary: "",
      password: "",
      role: "",
      image: "",
    },
    validationSchema: validationAdd,
    onSubmit: async (values) => {
      try {
        const formDataObj = new FormData();
        Object.keys(values).forEach((key) => {
          formDataObj.append(key, values[key]);
        });

        const response = await axios.post(
          "http://localhost:5000/api/employee/add",
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        ModalAdd();
        if (response.data.success) {
          navigate("/admin-dashboard/employees");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    },
  });

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "image") {
  //     setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  //   } else {
  //     setFormData((prevData) => ({ ...prevData, [name]: value }));
  //   }
  // };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-bold">
          Tambah Data Karyawan
        </Typography>
        <Link to="/admin-dashboard/employees">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1 shadow-xl font-bold">
            <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Kembali
          </Button>
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* name */}
          <div>
            <InputForm
              className={`w-full ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="name"
              label="Nama Karyawan"
              type="text"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null} */}
          </div>

          {/* email */}
          <div>
            <InputForm
              className={`w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="email"
              label="Email"
              type="email"
              placeholder="John Doe"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null} */}
          </div>

          {/* employee id */}
          <div>
            <InputForm
              className={`w-full border ${
                formik.touched.employeeId && formik.errors.employeeId
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="employeeId"
              label="ID Karyawan"
              type="text"
              placeholder="John Doe"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.employeeId && formik.errors.employeeId ? (
              <div className="text-red-500 text-sm">
                {formik.errors.employeeId}
              </div>
            ) : null} */}
          </div>

          {/* date of birth */}
          <div>
            <InputForm
              className={`w-full border p-2 rounded-md ${
                formik.touched.dob && formik.errors.dob
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="dob"
              label="Tanggal Lahir"
              type="date"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.dob && formik.errors.dob ? (
              <div className="text-red-500 text-sm">{formik.errors.dob}</div>
            ) : null} */}
          </div>

          {/* gender */}
          <div>
            <Label>Gender</Label>
            <select
              name="gender"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.gender && formik.errors.gender
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Pilih Gender</option>
              <option value="male">Laki-laki</option>
              <option value="famele">Perempuan</option>
            </select>
            {/* {formik.touched.gender && formik.errors.gender ? (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            ) : null} */}
          </div>

          {/* marital status */}
          <div>
            <Label>Status Pernikahan</Label>
            <select
              name="maritalStatus"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.maritalStatus && formik.errors.maritalStatus
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Pilih Status</option>
              <option value="single">Belum Menikah</option>
              <option value="married">Menikah</option>
            </select>
            {/* {formik.touched.maritalStatus && formik.errors.maritalStatus ? (
              <div className="text-red-500 text-sm">
                {formik.errors.maritalStatus}
              </div>
            ) : null} */}
          </div>

          {/* designation */}
          <div>
            <InputForm
              className={`w-full border ${
                formik.touched.designation && formik.errors.designation
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="designation"
              label="Penamaan Tugas"
              type="text"
              placeholder="John Doe"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.designation && formik.errors.designation ? (
              <div className="text-red-500 text-sm">
                {formik.errors.designation}
              </div>
            ) : null} */}
          </div>

          {/* department */}
          <div>
            <Label>Departeme</Label>
            <select
              name="department"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.departments && formik.errors.departments
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.departments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Pilih Deparmen</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
            {/* {formik.touched.departments && formik.errors.departments ? (
              <div className="text-red-500 text-sm">
                {formik.errors.departments}
              </div>
            ) : null} */}
          </div>

          {/* salary */}
          <div>
            <Label>Gaji Perbulan</Label>
            <CurrencyInput
              id="salary"
              name="salary"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.salary && formik.errors.salary
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              placeholder="Rp. 0"
              prefix="Rp. "
              decimalsLimit={0} // Set to 0 for no decimal places
              value={formik.values.salary}
              onValueChange={(value) => formik.setFieldValue("salary", value)}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.salary && formik.errors.salary ? (
              <div className="text-red-500 text-sm">{formik.errors.salary}</div>
            ) : null} */}
          </div>

          {/* password */}
          <div>
            <InputForm
              className={`w-full border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null} */}
          </div>

          {/* role */}
          <div>
            <Label>Role</Label>
            <select
              name="role"
              className={`mt-1 p-2 block w-full border rounded-md ${
                formik.touched.role && formik.errors.role
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Karyawan</option>
            </select>
            {/* {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-sm">{formik.errors.role}</div>
            ) : null} */}
          </div>

          {/* image upload */}
          <div>
            <InputForm
              className={`w-full border ${
                formik.touched.image && formik.errors.image
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              name="image"
              label="Upload Gambar"
              type="file"
              placeholder="********"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            {/* {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            ) : null} */}
          </div>
        </div>

        <div>
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

export default AddEmployee;
