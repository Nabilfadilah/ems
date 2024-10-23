import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../elements/button/Button";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const ViewLeave = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  // untuk kondisi tombol back
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/view/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Leave detail Data:", response.data);
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Leave detail Data:", response.data);
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <Typography className="text-2xl font-bold mx-9">
              Detail Cuti Karyawan
            </Typography>
            {user.role === "admin" && (
              <Link to="/admin-dashboard/leaves">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2 py-2 px-4 rounded-lg">
                  <IoMdArrowBack className="h-5 w-5" /> Kembali
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profil Karyawan */}
            <div className="flex flex-col items-center">
              {leave?.employeeId?.userId?.profileImage && (
                <img
                  src={`http://localhost:5000/${leave.employeeId?.userId?.profileImage}`}
                  className="rounded-full border-2 border-gray-300 w-40 h-40 mb-4"
                  alt="Profile"
                />
              )}
              <Typography className="text-xl font-semibold text-gray-800">
                {leave.employeeId?.userId?.name}
              </Typography>
              <Typography className="text-sm text-gray-600">
                ID Karyawan: {leave.employeeId.employeeId}
              </Typography>
            </div>

            {/* Detail Cuti */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Jenis Cuti:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {leave.leaveType}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">Alasan:</Typography>
                <Typography className="text-lg text-gray-700">
                  {leave.reason}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Departemen:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {leave.employeeId?.department?.dep_name || "N/A"}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Tanggal Mulai:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {new Date(leave.startDate).toLocaleDateString()}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  Tanggal Akhir:
                </Typography>
                <Typography className="text-lg text-gray-700">
                  {new Date(leave.endDate).toLocaleDateString()}
                </Typography>
              </div>

              <div className="flex justify-between items-center">
                <Typography className="text-lg font-bold">
                  {leave.status === "Pending" ? "Aksi:" : "Status:"}
                </Typography>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-4">
                    <Button
                      className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <Typography
                    className={`text-lg font-semibold ${
                      leave.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {leave.status}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-20">
          <Typography className="text-lg text-gray-600">Loading...</Typography>
        </div>
      )}
    </>
  );
};

export default ViewLeave;
