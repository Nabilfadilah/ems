import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import InputSeacrh from "../elements/input/InputSearch";
import { Link } from "react-router-dom";
import Button from "../elements/button/Button";
import axios from "axios";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const LeaveAdmin = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const data = await response.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: `${index + 1}.`,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: (
            <LeaveButtons
              // Id={emp._id}
              id={leave._id}
            />
          ),
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // search
  const handleSearch = (e) => {
    const data = leaves.filter((leave) =>
      leave.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  // filter status
  // const filterByButton = (status) => {
  //   const data = leaves.filter((leave) =>
  //     leave.status.toLowerCase().includes(status.toLowerCase())
  //   );
  //   setFilteredLeaves(data);
  // };

  const filterByButton = (status) => {
    const filteredData = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );

    // Atur ulang nomor urut berdasarkan hasil filter
    const dataNewNo = filteredData.map((leave, index) => ({
      ...leave,
      sno: `${index + 1}.`, // Nomor diatur ulang dari 1
    }));

    setFilteredLeaves(dataNewNo);
  };

  return (
    <>
      {filteredLeaves === null ? (
        <div>Loading...</div>
      ) : (
        <div className="leave">
          <div className="text-center">
            <Typography className="text-2xl font-bold">Kelola Cuti</Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSeacrh
              placeholder="Cari berdasarkan nama karyawan"
              onChange={handleSearch}
            />
            <div className="space-x-1">
              <Button
                className="px-4 py-1 bg-gray-800 hover:bg-gray-700 text-white font-bold"
                onClick={() => filterByButton("")}
              >
                All
              </Button>
              <Button
                className="px-4 py-1 bg-yellow-500 hover:bg-yellow-400 text-white font-bold"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </Button>
              <Button
                className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </Button>
              <Button
                className="px-4 py-1 bg-red-800 hover:bg-red-700 text-white font-bold"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </Button>
            </div>
          </div>

          <div className="table-container overflow-x-auto mt-5 shadow-2xl">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              responsive
              highlightOnHover
              striped
              customStyles={customStyles} // Menerapkan gaya khusus
              dense
            />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default LeaveAdmin;

const customStyles = {
  headCells: {
    style: {
      paddingTop: "8px",
      paddingBottom: "8px",
      fontSize: "14px",
      backgroundColor: "#1f2937", // Warna gelap untuk header
      color: "#ffffff", // Warna teks header
      fontWeight: "bold", // Menjadikan teks header lebih tebal
      // borderBottom: "2px solid #d1d5db", // Garis pembatas bawah header
    },
  },
  cells: {
    style: {
      paddingTop: "6px",
      paddingBottom: "6px",
    },
  },
};
