import React from "react";
import { useAuth } from "../../context/AuthContext";
import Typography from "../elements/text/Typography";
import Button from "../elements/button/Button";
import ModalLogout from "../elements/popup/ModalLogout";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    ModalLogout(logout);
  };

  return (
    <div className="flex items-center text-white justify-between h-12 bg-cyan-950 px-5">
      <Typography className="px-1">
        {" "}
        Selamat Datang, <b>{user.name}</b>
      </Typography>
      <Button
        className="bg-gray-200 hover:bg-gray-300 font-bold text-black flex items-center space-x-2 px-4 py-2"
        onClick={handleLogout}
      >
        <MdLogout />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Navbar;
