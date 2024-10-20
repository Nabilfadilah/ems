import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/layouts/AdminSidebar";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Pass state and handler to AdminSidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={handleSidebarToggle}
      />

      {/* Konten Utama */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-20"
        } bg-gray-100 h-screen`}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
