import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import Typography from "../elements/text/Typography";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-900 h-12 flex items-center justify-center">
        <Typography className="text-2xl text-center">Employee MS</Typography>
      </div>
      <div className="px-4">
        {/* dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900 " : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <Typography>Dashboard</Typography>
        </NavLink>

        {/* employee */}
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900" : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaUser />
          <Typography>Employee</Typography>
        </NavLink>

        {/* department */}
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900" : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <Typography>Department</Typography>
        </NavLink>

        {/* leave */}
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 py-2.5 px-4 rounded"
        >
          <FaCalendarAlt />
          <Typography>Leave</Typography>
        </NavLink>

        {/* salary */}
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 py-2.5 px-4 rounded"
        >
          <FaMoneyBillWave />
          <Typography>Salary</Typography>
        </NavLink>

        {/* settings */}
        <NavLink
          to="/admin-dashboard"
          className="flex items-center space-x-4 py-2.5 px-4 rounded"
        >
          <FaCogs />
          <Typography>Settings</Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
