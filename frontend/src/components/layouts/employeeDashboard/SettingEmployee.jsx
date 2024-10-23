import React, { useState } from "react";
import Typography from "../../elements/text/Typography";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import InputForm from "../../elements/input/InputForm";
import Button from "../../elements/button/Button";
import ModalEdit from "../../elements/popup/ModalEdit";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SettingEmployee = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State untuk menyimpan status visibility masing-masing password field
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password tidak sesuai");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        ModalEdit();
        if (response.data.success) {
          // Cek peran user, jika admin arahkan ke dashboard admin, jika employee ke dashboard employee
          if (user.role === "admin") {
            navigate("/admin-dashboard");
          } else if (user.role === "employee") {
            navigate("/employee-dashboard");
          }
          setError(""); // Reset error jika tidak ada masalah
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md w-full">
      <Typography className="text-2xl font-bold mb-6">
        Ubah Kata Sandi
      </Typography>
      <Typography className="text-red-500">{error}</Typography>

      <form onSubmit={handleSubmit}>
        {/*  old password */}
        <div className="relative">
          <InputForm
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            label="Password Lama"
            placeholder="Masukan Password"
            onChange={handleChange}
            required
          />
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>

        {/*  new password */}
        <div className="relative">
          <InputForm
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            label="Password Baru"
            placeholder="Masukan Password"
            onChange={handleChange}
            required
          />
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>

        {/*  confirm password */}
        <div className="relative mb-4">
          <InputForm
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            label="Konfirmasi Password"
            placeholder="Masukan Password"
            onChange={handleChange}
            required
          />
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
        >
          Ubah Password
        </Button>
      </form>
    </div>
  );
};

export default SettingEmployee;
