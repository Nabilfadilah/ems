import React from "react";
import { useAuth } from "../context/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth;
  return (
    <div>
      Admin Dashboard
      {user.name}
    </div>
  );
};

export default EmployeeDashboard;
