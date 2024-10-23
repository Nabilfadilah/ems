import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../elements/button/Button";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  // untuk kondisi tombol back
  const { user } = useAuth();

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
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <Typography className="text-2xl font-bold px-16">
              Detail Karyawan
            </Typography>

            {user.role === "admin" && ( // Kondisi untuk hanya menampilkan button jika user adalah admin
              <Link to="/admin-dashboard/employees">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1">
                  <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profil Karyawan */}
            <div className="flex flex-col items-center">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                className="rounded-full border-2 border-gray-300 w-40 h-40 mb-4"
              />
              <Typography className="text-xl font-semibold text-gray-800">
                {employee.userId.name}
              </Typography>
              <Typography className="text-sm text-gray-600">
                ID Karyawan: {employee.employeeId}
              </Typography>
            </div>

            {/* tanggal ulang tahun */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Tanggal Lahir:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {new Date(employee.dob).toLocaleDateString()}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Jenis Kelamin:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {employee.gender}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Departemen:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {employee.department.dep_name}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Status Pernikahan:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {employee.maritalStatus}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-80">
          <Typography className="text-lg text-gray-600">Loading...</Typography>
        </div> // or handle error message
      )}
    </>
  );
};

export default ViewEmployee;
