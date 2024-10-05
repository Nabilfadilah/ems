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
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
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
    const records = leaves.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(records);
  };

  return (
    <>
      {filteredLeaves === null ? (
        <div>Loading...</div>
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
            <div className="space-x-2">
              <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
                Pending
              </Button>
              <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
                Approved
              </Button>
              <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
                Rejected
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default LeaveAdmin;
