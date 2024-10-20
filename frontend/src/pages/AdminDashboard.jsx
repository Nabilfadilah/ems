import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/layouts/AdminSidebar";
import Navbar from "../components/layouts/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={handleSidebarToggle}
      />

      {/* Konten Utama */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-56" : "ml-20"
        } bg-gray-100 overflow-y-auto`}
      >
        <Navbar />

        {/* Wrapper for page content to ensure proper scrolling */}
        <div className="flex-1 overflow-x-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
