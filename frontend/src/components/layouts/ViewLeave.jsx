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
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <Typography className="text-2xl font-bold px-10">
              Leave Details
            </Typography>

            {user.role === "admin" && ( // Kondisi untuk hanya menampilkan button jika user adalah admin
              <Link to="/admin-dashboard/leaves">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1">
                  <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
                </Button>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {leave?.employeeId?.userId?.profileImage && (
                <img
                  src={`http://localhost:5000/${leave.employeeId?.userId?.profileImage}`}
                  className="rounded-full border w-72"
                />
              )}
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">Name:</Typography>
                {leave?.employeeId?.userId?.name && (
                  <Typography className="font-medium">
                    {leave.employeeId?.userId?.name}
                  </Typography>
                )}
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Employee ID:
                </Typography>
                <Typography className="font-medium">
                  {leave.employeeId.employeeId}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Leave Type:
                </Typography>
                <Typography className="font-medium">
                  {leave.leaveType}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">Reason:</Typography>
                <Typography className="font-medium">{leave.reason}</Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Department:
                </Typography>
                {leave?.employeeId?.department?.dep_name && (
                  <Typography className="font-medium">
                    {leave.employeeId?.department?.dep_name}
                  </Typography>
                )}
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">
                  Start Date:
                </Typography>
                <Typography className="font-medium">
                  {new Date(leave.startDate).toLocaleDateString()}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                <Typography className="text-lg font-bold">End Date:</Typography>
                <Typography className="font-medium">
                  {new Date(leave.endDate).toLocaleDateString()}
                </Typography>
              </div>
              <div className="flex space-x-3 mb-5">
                {/* <Typography className="text-lg font-bold">Status:</Typography> */}
                <Typography className="font-medium">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </Typography>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <Button
                      className="bg-green-700 hover:bg-green-600 text-white"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-red-700 hover:bg-red-600 text-white"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <Typography className="font-medium">
                    {leave.status}
                  </Typography>
                )}
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

export default ViewLeave;
