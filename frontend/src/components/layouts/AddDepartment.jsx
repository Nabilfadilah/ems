import React, { useState } from "react";
import Typography from "../elements/text/Typography";
import InputForm from "../elements/input/InputForm";
import Button from "../elements/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Label from "../elements/input/Label";
import axios from "axios";
import ModalAdd from "../../components/elements/popup/ModalAdd";

const AddDepartment = () => {
  // state
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
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
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-bold">Add Department</Typography>
        <Link to="/admin-dashboard/departments">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1">
            <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <InputForm
            className="w-full"
            name="dep_name"
            label="Department Name"
            type="text"
            placeholder="John Doe"
            required
            onChange={handleChange}
          />
        </div>

        <div className="w-full mt-5">
          <Label>Description</Label>
          <textarea
            name="description"
            placeholder="John Doe"
            className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-600 w-full font-bold text-white h-8 mt-5"
        >
          Add Department
        </Button>
      </form>
    </div>
  );
};

export default AddDepartment;
