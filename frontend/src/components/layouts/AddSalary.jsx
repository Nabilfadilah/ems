import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import InputForm from "../elements/input/InputForm";
import Label from "../elements/input/Label";
import Button from "../elements/button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import ModalAdd from "../../components/elements/popup/ModalAdd";
import * as Yup from "yup";
import { useFormik } from "formik";
import CurrencyInput from "react-currency-input-field";

const AddSalary = () => {
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // Fetch employees based on selected department
  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  // Formik initialization with Yup validation
  const formik = useFormik({
    initialValues: {
      // department: "",
      employeeId: "",
      basicSalary: "",
      allowances: "",
      deductions: "",
      netSalary: 0,
      payDate: "",
    },
    validationSchema: Yup.object({
      department: Yup.string().required("Departemen harus diisi"),
      employeeId: Yup.string().required("ID Karyawan harus diisi"),
      basicSalary: Yup.number().required("Gaji Pokok harus diisi").min(0),
      allowances: Yup.number().required("Tunjangan harus diisi").min(0),
      deductions: Yup.number().required("Pengurangan harus diisi").min(0),
      payDate: Yup.date().required("Tanggal Pembayaran harus diisi"),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      console.log("Net Salary being submitted:", values.netSalary);
      try {
        const response = await axios.post(
          `http://localhost:5000/api/salary/add`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Data salary add :", response.data);
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

  // Handle changes and menjumlahkan netSalary
  const handleCurrencyChange = (name, value) => {
    const numericValue = value
      ? parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0
      : 0;

    // Set field value and wait until Formik updates the field value
    formik.setFieldValue(name, numericValue);

    setTimeout(() => {
      // Perbarui nilai netSalary setelah Formik memperbarui basicSalary, allowances, dan deductions
      const basicSalary = formik.values.basicSalary || 0;
      const allowances = formik.values.allowances || 0;
      const deductions = formik.values.deductions || 0;
      formik.setFieldValue("netSalary", basicSalary + allowances - deductions);
    }, 0); // Menunggu hingga formik update field
  };

  return (
    <>
      {departments ? (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <Typography className="text-xl font-bold">
              Tambah Gaji Karyawan
            </Typography>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* department */}
              <div>
                <Label>Departemen</Label>
                <select
                  name="department"
                  className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
                  required
                  value={formik.values.department}
                  onChange={handleDepartment}
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

              {/* employee */}
              <div>
                <Label>ID Karyawan</Label>
                <select
                  name="employeeId"
                  className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.employeeId}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
                {formik.errors.employeeId && formik.touched.employeeId && (
                  <div className="text-red-500">{formik.errors.employeeId}</div>
                )}
              </div>

              {/* basic salary */}
              <div>
                <Label>Gaji Pokok</Label>
                <CurrencyInput
                  id="basicSalary"
                  name="basicSalary"
                  className={`mt-1 p-2 block w-full border rounded-md ${
                    formik.touched.basicSalary && formik.errors.basicSalary
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  placeholder="Rp. 0"
                  prefix="Rp "
                  decimalsLimit={0}
                  onValueChange={(value) =>
                    handleCurrencyChange("basicSalary", value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.basicSalary && formik.touched.basicSalary && (
                  <div className="text-red-500">
                    {formik.errors.basicSalary}
                  </div>
                )}
              </div>

              {/* allowances */}
              <div>
                <Label>Tunjangan</Label>
                <CurrencyInput
                  id="allowances"
                  name="allowances"
                  className={`mt-1 p-2 block w-full border rounded-md ${
                    formik.touched.allowances && formik.errors.allowances
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  placeholder="Rp. "
                  prefix="Rp "
                  decimalsLimit={0}
                  onValueChange={(value) =>
                    handleCurrencyChange("allowances", value)
                  }
                />
                {formik.errors.allowances && formik.touched.allowances && (
                  <div className="text-red-500">{formik.errors.allowances}</div>
                )}
              </div>

              {/* deductions */}
              <div>
                <Label>Pengurangan</Label>
                <CurrencyInput
                  id="deductions"
                  name="deductions"
                  className={`mt-1 p-2 block w-full border rounded-md ${
                    formik.touched.deductions && formik.errors.deductions
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  placeholder="Rp. "
                  prefix="Rp "
                  decimalsLimit={0}
                  onValueChange={(value) =>
                    handleCurrencyChange("deductions", value)
                  }
                />
                {formik.errors.deductions && formik.touched.deductions && (
                  <div className="text-red-500">{formik.errors.deductions}</div>
                )}
              </div>

              {/* Net Salary (Read-only) */}
              <div>
                <Label>Total Gaji</Label>
                <CurrencyInput
                  id="netSalary"
                  name="netSalary"
                  className="w-full mt-1 p-2 border border-gray-400 rounded-md"
                  placeholder="Rp. "
                  prefix="Rp "
                  decimalsLimit={0}
                  value={formik.values.netSalary}
                  disabled
                />
              </div>

              {/* pay date */}
              <div>
                <InputForm
                  className={`mt-1 p-2 block w-full border rounded-md ${
                    formik.touched.payDate && formik.errors.payDate
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  name="payDate"
                  label="Tanggal Pembayaran"
                  type="date"
                  placeholder="John Doe"
                  onChange={formik.handleChange}
                  value={formik.values.payDate}
                />
                {formik.errors.payDate && formik.touched.payDate && (
                  <div className="text-red-500">{formik.errors.payDate}</div>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
              >
                Simpan Gaji
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

export default AddSalary;
