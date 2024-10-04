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

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      ModalAdd();
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
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
        <Typography className="text-xl font-bold">Request for Leave</Typography>
        <Link to="/employee-dashboard/leaves">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1">
            <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* leave type */}
          <div>
            <Label>Leave Type</Label>
            <select
              name="leaveType"
              className="mt-1 p-2 block w-full border border-gray-400 rounded-md"
              required
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="sick_leave">Sick Leave</option>
              <option value="casual_leave">Casual Leave</option>
              <option value="annual_leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* start date */}
            <div>
              <InputForm
                className="w-full"
                name="startDate"
                label="Start Date"
                type="date"
                placeholder="John Doe"
                required
                onChange={handleChange}
              />
            </div>

            {/* end date */}
            <div>
              <InputForm
                className="w-full"
                name="endDate"
                label="End Date"
                type="date"
                placeholder="John Doe"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          {/* date */}
          <div>
            <Label>Description</Label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-400 rounded"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
          >
            Add Salary
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
