import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/button/Button";
import axios from "axios";
import ModalDelete from "../components/elements/popup/ModalDelete";

export const columns = [
  {
    name: "No.",
    selector: (row) => row.sno,
    with: "30px",
  },
  {
    name: "ID Karyawan",
    selector: (row) => row.employeeId,
    sortable: true,
    with: "120px",
  },
  {
    name: "Nama Karyawan",
    selector: (row) => row.name,
    with: "120px",
  },
  {
    name: "Tipe Cuti",
    selector: (row) => row.leaveType,
    with: "120px",
  },
  {
    name: "Departemen",
    selector: (row) => row.department,
    with: "120px",
  },
  {
    name: "Hari",
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
    name: "Aksi",
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
        className="bg-green-800 text-white font-semibold"
        onClick={() => handleView(id)}
      >
        View
      </Button>
    </div>
  );
};
