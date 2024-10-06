import React, { useState, useEffect } from "react";
import Typography from "../../elements/text/Typography";
import InputSeacrh from "../../elements/input/InputSearch";
import Button from "../../elements/button/Button";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const LeaveList = () => {
  const [leaves, setleaves] = useState([]);
  const [filteredleaves, setFilteredleaves] = useState(null);
  const { user } = useAuth();
  let sno = 1;

  // untuk menghubungkan halaman leave admin
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("View view data: ", response.data);
      if (response.data.success) {
        // rubah jadi leaves
        setleaves(response.data.leaves);
        setFilteredleaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    const records = leaves.filter((leave) =>
      String(leave.leaveType).toLocaleLowerCase().includes(searchValue)
    );
    setFilteredleaves(records);
  };

  return (
    <>
      {filteredleaves === null ? (
        <div>Loading.....</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <Typography className="text-2xl font-bold">Manage leave</Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSeacrh
              placeholder="Seacrh By Dep Name"
              onChange={handleSearch}
            />

            {user.role === "employee" && ( // Kondisi untuk hanya menampilkan button jika user adalah admin
              <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
                <Link to="/employee-dashboard/add-leave">Add New</Link>
              </Button>
            )}
          </div>

          <div className="mt-5">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredleaves.map((leave) => (
                  <tr
                    // key={leave.id}
                    key={leave._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}.</td>
                    <td className="px-6 py-3">{leave.leaveType}</td>
                    <td className="px-6 py-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{leave.reason}</td>
                    <td className="px-6 py-3">{leave.status}</td>
                    {/* <td className="px-6 py-3">
                      {new Date(leave.appliedDate).toLocaleDateString()}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveList;
