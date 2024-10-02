import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/layouts/AdminSummary";
import DepartmentList from "./components/layouts/DepartmentList";
import AddDepartment from "./components/layouts/AddDepartment";
import EditDepartment from "./components/layouts/EditDepartment";
import EmployeeList from "./components/layouts/EmployeeList";
import AddEmployee from "./components/layouts/AddEmployee";
import ViewEmployee from "./components/layouts/ViewEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* untuk menghubungkan dengan sumary menngunakan outlet */}
          <Route index element={<AdminSummary />}></Route>
          {/* route department */}
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          />
          <Route
            path="/admin-dashboard/add-new-department"
            element={<AddDepartment />}
          />
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          />

          {/* route employee */}
          <Route path="/admin-dashboard/employees" element={<EmployeeList />} />
          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          />
          <Route
            path="/admin-dashboard/employee/:id"
            element={<ViewEmployee />}
          />
        </Route>

        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
