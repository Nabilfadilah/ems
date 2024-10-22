import React, { useState, useEffect } from "react";
import Typography from "../../elements/text/Typography";
import InputSeacrh from "../../elements/input/InputSearch";
import Button from "../../elements/button/Button";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

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
        <div className="leave">
          <div className="text-center">
            <Typography className="text-2xl font-bold">Kelola Cuti</Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSeacrh
              placeholder="Cari berdasarkan jenis cuti"
              onChange={handleSearch}
            />

            {user.role === "employee" && ( // Kondisi untuk hanya menampilkan button jika user adalah admin
              <Link to="/employee-dashboard/add-leave">
                <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
                  <FaRegPlusSquare strokeWidth={2} className="h-4 w-4" /> Tambah
                </Button>
              </Link>
            )}

            {user.role === "admin" && (
              <Link to="/admin-dashboard/employees">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1 shadow-xl font-bold">
                  <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Kembali
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-5">
            <table className="w-full text-sm text-left text-gray-500 shadow-2xl mt-5">
              <thead className="text-xs text-white uppercase bg-gray-800 border border-gray-700">
                <tr>
                  <th className="px-6 py-3">No.</th>
                  <th className="px-6 py-3">Jenis Cuti</th>
                  <th className="px-6 py-3">Dari</th>
                  <th className="px-6 py-3">Sampai</th>
                  <th className="px-6 py-3">Deskripsi</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-black shadow-2xl">
                {filteredleaves.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className="bg-white border-b dark:bg-white dark:border-gray-300"
                  >
                    <td className="px-6 py-3">{index + 1}.</td>
                    <td className="px-6 py-3">{leave.leaveType}</td>
                    <td className="px-6 py-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{leave.reason}</td>
                    <td
                      className={`px-6 py-3 font-extrabold ${
                        leave.status === "Approved"
                          ? "text-green-500"
                          : leave.status === "Pending"
                          ? "text-yellow-500"
                          : leave.status === "Rejected"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {leave.status}
                    </td>
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
