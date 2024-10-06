import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/button/Button";
import axios from "axios";
import ModalDelete from "../components/elements/popup/ModalDelete";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    with: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    with: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    with: "120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    with: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    with: "120px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    with: "120px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    with: "120px",
    cell: (row) => (
      <div
        style={{
          backgroundColor:
            row.status === "Approved"
              ? "#4CAF50" // Hijau untuk Approved
              : row.status === "Pending"
              ? "#FFC107" // Kuning untuk Pending
              : "#F44336", // Merah untuk Rejected
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          textAlign: "center",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {row.status}
      </div>
    ),
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <div className="flex space-x-3">
      <Button
        className="bg-green-800 text-white"
        onClick={() => handleView(id)}
      >
        View
      </Button>
    </div>
  );
};
