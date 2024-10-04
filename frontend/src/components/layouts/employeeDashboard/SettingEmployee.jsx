import React, { useState } from "react";
import Typography from "../../elements/text/Typography";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import InputForm from "../../elements/input/InputForm";
import Button from "../../elements/button/Button";
import ModalEdit from "../../elements/popup/ModalEdit";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
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
          navigate("/employee-dashboard");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <Typography className="text-2xl font-bold mb-6">
        Change Password
      </Typography>
      <Typography className="text-red-500">{error}</Typography>

      <form onSubmit={handleSubmit}>
        {/*  old password */}
        <div>
          <InputForm
            type="password"
            name="oldPassword"
            label="Old Password"
            placeholder="Change Password"
            onChange={handleChange}
            required
          />
        </div>

        {/*  new password */}
        <div>
          <InputForm
            type="password"
            name="newPassword"
            label="New Password"
            placeholder="Change Password"
            onChange={handleChange}
            required
          />
        </div>

        {/*  confirm password */}
        <div>
          <InputForm
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Change Password"
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-600 font-bold text-white h-8 mt-5"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default SettingEmployee;
