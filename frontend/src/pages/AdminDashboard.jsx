import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/layouts/AdminSidebar";
import Navbar from "../components/layouts/Navbar";
// import AdminSummary from "../components/layouts/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth;

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        {/* <AdminSummary /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
