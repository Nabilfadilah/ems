import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../elements/button/Button";
import { IoMdArrowBack } from "react-icons/io";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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
        console.log("Employee Data:", response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  return (
    <>
      {employee && employee.userId ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <Typography className="text-2xl font-bold px-10">
              Employee Details
            </Typography>
            <Link to="/admin-dashboard/employees">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1">
                <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">Name:</Typography>
                <Typography className="font-medium">
                  {employee.userId.name}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Employee ID:
                </Typography>
                <Typography className="font-medium">
                  {employee.employeeId}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Date of Birth:
                </Typography>
                <Typography className="font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">Gender:</Typography>
                <Typography className="font-medium">
                  {employee.gender}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Department:
                </Typography>
                <Typography className="font-medium">
                  {employee.department.dep_name}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Marital Status:
                </Typography>
                <Typography className="font-medium">
                  {employee.maritalStatus}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-80">Loading...</div> // or handle error message
      )}
    </>
  );
};

export default ViewEmployee;
