import { NavLink } from "react-router-dom";
import Typography from "../../elements/text/Typography";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const EmployeeSidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-900 h-12 flex items-center justify-center">
        <Typography className="text-2xl text-center">Employee MS</Typography>
      </div>
      <div className="px-4">
        {/* dashboard */}
        <NavLink
          to="/employee-dashboard"
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

        {/* profile */}
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900" : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaUser />
          <Typography>My Profile</Typography>
        </NavLink>

        {/* leaves */}
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900" : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <Typography>Leaves</Typography>
        </NavLink>

        {/* salary */}
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900" : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <Typography>Salary</Typography>
        </NavLink>

        {/* settings */}
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-900" : "hover:bg-teal-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaCogs />
          <Typography>Settings</Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
