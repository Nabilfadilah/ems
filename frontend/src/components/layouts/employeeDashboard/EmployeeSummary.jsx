import { FaUser } from "react-icons/fa";
import React from "react";
import SummaryCard from "../../fragments/SummaryCard";
import { useAuth } from "../../../context/AuthContext";

const EmployeeSummary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Employee Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUser />}
          text="Welcome Back"
          number={user.name}
          color="bg-teal-600"
        />
      </div>
    </div>
  );
};

export default EmployeeSummary;
