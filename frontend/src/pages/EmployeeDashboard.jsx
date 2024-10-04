import React from "react";
import { useAuth } from "../context/AuthContext";
import Typography from "../components/elements/text/Typography";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/layouts/employeeDashboard/EmployeeSidebar";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <EmployeeSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        {/* <EmployeeSummary /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
