import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import InputForm from "../elements/input/InputForm";
import Label from "../elements/input/Label";
import Button from "../elements/button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import ModalEdit from "../../components/elements/popup/ModalEdit";
import { useFormik } from "formik";
import * as Yup from "yup";
import CurrencyInput from "react-currency-input-field";

// validasi yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  maritalStatus: Yup.string().required("Status pernikahan wajib diisi"),
  designation: Yup.string().required("Jabatan wajib diisi"),
  salary: Yup.number()
    .required("Gaji wajib diisi")
    .min(0, "Gaji harus lebih besar atau sama dengan 0"),
  department: Yup.string().required("Department wajib dipilih"),
});

const EditEmployee = () => {
  // const [employee, setEmployee] = useState({
  //   name: "",
  //   maritalStatus: "",
  //   designation: "",
  //   salary: 0,
  //   department: "",
  // });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch department data
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Employee Data Edit:", response.data);
        if (response.data.success) {
          const employee = response.data.employee;
          formik.setValues({
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department._id,
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEmployee((prevData) => ({ ...prevData, [name]: value }));
  // };

  // Setup Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      maritalStatus: "",
      designation: "",
      salary: 0,
      department: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/employee/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        ModalEdit();
        if (response.data.success) {
          navigate("/admin-dashboard/employee");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    },
  });

  return (
    <>
      {departments.length > 0 ? (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <Typography className="text-xl font-bold">
              Ubah Data Karyawan
            </Typography>
            <Link to="/admin-dashboard/employee">
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
                  className={`mt-1 p-2 block w-full border rounded-md ${
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
                  <option value="">Select Gender</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* designation */}
              <div>
                <InputForm
                  className={`mt-1 p-2 block w-full border rounded-md ${
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
                  onValueChange={(value) =>
                    formik.setFieldValue("salary", value)
                  }
                  onBlur={formik.handleBlur}
                />
              </div>

              {/* department */}
              <div className="col-span-2">
                <Label>Departemen</Label>
                <select
                  name="department"
                  className={`mt-1 p-2 block w-full border rounded-md ${
                    formik.touched.department && formik.errors.department
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
              >
                Ubah Data
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center p-80">Loading...</div> // or handle error message
      )}
    </>
  );
};

export default EditEmployee;
