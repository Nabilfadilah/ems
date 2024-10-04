import React from "react";
import { useAuth } from "../../context/AuthContext";
import Typography from "../elements/text/Typography";
import Button from "../elements/button/Button";
import ModalLogout from "../elements/popup/ModalLogout";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    ModalLogout(logout);
  };

  return (
    <div className="flex items-center text-white justify-between h-12 bg-teal-900 px-5">
      <Typography> Selamat Datang, {user.name}</Typography>
      <Button
        className="bg-gray-800 hover:bg-gray-700 font-bold"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
