import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Typography from "../elements/text/Typography";
import emsLogo from "../../assets/img/emsLogo.png";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpen ? "w-56" : "w-20"
      } bg-cyan-950 text-white h-screen fixed top-0 bottom-0 transition-all duration-300 rounded-e-xl`}
    >
      <div className="bg-cyan-950 h-20 flex items-center justify-between px-5">
        <img
          src={emsLogo}
          className={`cursor-pointer duration-500 w-10 h-10 ${
            open && "rotate-[360deg]"
          }`}
        />
        <Typography
          className={`${isOpen ? "text-lg" : "hidden"} text-center font-bold`}
        >
          Managemen Karyawan
        </Typography>
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Links */}
      <div className="px-4 mt-4">
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 mb-2`
          }
          end
        >
          <FaTachometerAlt />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Dashboard
          </Typography>
        </NavLink>

        {/* Employee */}
        <NavLink
          to="/admin-dashboard/employee"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded mb-2`
          }
        >
          <FaUser />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Karyawan
          </Typography>
        </NavLink>

        {/* Department */}
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded mb-2`
          }
        >
          <FaBuilding />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Departemen
          </Typography>
        </NavLink>

        {/* Leave */}
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded mb-2`
          }
        >
          <FaCalendarAlt />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Cuti Karyawan
          </Typography>
        </NavLink>

        {/* Salary */}
        <NavLink
          to="/admin-dashboard/salary"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded mb-2`
          }
        >
          <FaMoneyBillWave />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Gaji Karyawan
          </Typography>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded text-sm`
          }
        >
          <FaCogs />
          <Typography className={`${!isOpen && "hidden"}`}>
            Pengaturan
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
