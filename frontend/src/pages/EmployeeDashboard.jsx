import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Typography from "../components/elements/text/Typography";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/layouts/employeeDashboard/EmployeeSidebar";

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <EmployeeSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={handleSidebarToggle}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-20"
        } bg-gray-100 overflow-y-auto`}
      >
        <Navbar />
        <div className="flex-1 overflow-x-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
