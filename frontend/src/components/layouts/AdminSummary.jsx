import React, { useEffect, useState } from "react";
import SummaryCard from "../fragments/SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(summary.data);
        setSummary(summary.data);
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Ringkasan Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUser />}
          text="Total Karyawan"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departemen"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Gaji Bulanan"
          number={summary.totalSalary}
          color="bg-gray-700"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-2xl font-bold">Detail Cuti</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Cuti Diterapkan"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-700"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Cuti Disetujui"
            number={summary.leaveSummary.approved}
            color="bg-green-700"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Cuti Tertunda"
            number={summary.leaveSummary.pending}
            color="bg-yellow-700"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Cuti Ditolak"
            number={summary.leaveSummary.rejected}
            color="bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
