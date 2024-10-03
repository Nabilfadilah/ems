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

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  //   const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  // handle deaprtment
  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  //   useEffect(() => {
  //     const fetchEmployee = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/api/employee/${id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           }
  //         );
  //         console.log("Employee Data Edit:", response.data);
  //         if (response.data.success) {
  //           const employee = response.data.employee;
  //           setEmployee((prev) => ({
  //             ...prev,
  //             name: employee.userId.name,
  //             maritalStatus: employee.maritalStatus,
  //             designation: employee.designation,
  //             salary: employee.salary,
  //             department: employee.department,
  //           }));
  //         }
  //       } catch (error) {
  //         if (error.response && !error.response.data.success) {
  //           alert(error.response.data.error);
  //         }
  //       }
  //     };
  //     fetchEmployee();
  //   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
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
  };

  return (
    <>
      {departments ? (
        <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-6">
            <Typography className="text-xl font-bold">Add Salary</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* department */}
              <div>
                <Label>Department</Label>
                <select
                  name="department"
                  className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
                  required
                  onChange={handleDepartment}
                  value={departments.department}
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
                <Label>Employee</Label>
                <select
                  name="employeeId"
                  className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* basic salary */}
              <div>
                <InputForm
                  className="w-full"
                  name="basicSalary"
                  label="Basic Salary"
                  type="number"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                  value={salary.basicSalary}
                />
              </div>

              {/* allowances */}
              <div>
                <InputForm
                  className="w-full"
                  name="allowances"
                  label="Allowances"
                  type="number"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                  value={salary.allowances}
                />
              </div>

              {/* deductions */}
              <div>
                <InputForm
                  className="w-full"
                  name="deductions"
                  label="deductions"
                  type="number"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                  value={salary.deductions}
                />
              </div>

              {/* pay date */}
              <div>
                <InputForm
                  className="w-full"
                  name="payDate"
                  label="Pay Date"
                  type="date"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
              >
                Add Salary
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
