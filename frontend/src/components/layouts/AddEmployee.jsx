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

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
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
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-bold">Add New Employee</Typography>
        <Link to="/admin-dashboard/employees">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1">
            <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* name */}
          <div>
            <InputForm
              className="w-full"
              name="name"
              label="Name"
              type="text"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          {/* email */}
          <div>
            <InputForm
              className="w-full"
              name="email"
              label="Email"
              type="email"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          {/* employee id */}
          <div>
            <InputForm
              className="w-full"
              name="employeeId"
              label="Employee ID"
              type="text"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          {/* date birth */}
          <div>
            <InputForm
              className="w-full"
              name="dob"
              label="Date of Birth"
              type="date"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          {/* gender */}
          <div>
            <Label>Gender</Label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Mele</option>
              <option value="famele">Famale</option>
            </select>
          </div>

          {/* marital status */}
          <div>
            <Label>Marital Status</Label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* designation */}
          <div>
            <InputForm
              className="w-full"
              name="designation"
              label="Designation"
              type="text"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          {/* department */}
          <div>
            <Label>Department</Label>
            <select
              name="department"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* salary */}
          <div>
            <InputForm
              className="w-full"
              name="salary"
              label="Salary"
              type="text"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />
          </div>

          {/* password */}
          <div>
            <InputForm
              className="w-full"
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              required
              onChange={handleChange}
            />
          </div>

          {/* role */}
          <div>
            <Label>Role</Label>
            <select
              name="role"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* image upload */}
          <div>
            <InputForm
              className="w-full"
              name="image"
              label="Upload Image"
              type="file"
              placeholder="********"
              accept="image/*"
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
            Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
