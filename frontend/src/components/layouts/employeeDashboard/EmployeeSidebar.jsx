import { NavLink } from "react-router-dom";
import Typography from "../../elements/text/Typography";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaTachometerAlt,
  FaMoneyBillWave,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import emsLogo from "../../../assets/img/emsLogo.png";

const EmployeeSidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

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

      <div className="px-4 mt-4">
        {/* dashboard */}
        <NavLink
          to="/employee-dashboard"
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

        {/* profile */}
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 mb-2`
          }
        >
          <FaUser />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Profil Saya
          </Typography>
        </NavLink>

        {/* leaves */}
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 mb-2`
          }
        >
          <FaBuilding />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Cuti
          </Typography>
        </NavLink>

        {/* salary */}
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 mb-2`
          }
        >
          <FaMoneyBillWave />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Gaji
          </Typography>
        </NavLink>

        {/* settings */}
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-900" : "hover:bg-cyan-800"
            } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 mb-2`
          }
        >
          <FaCogs />
          <Typography className={`${!isOpen && "hidden"} text-sm`}>
            Pengaturan
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
