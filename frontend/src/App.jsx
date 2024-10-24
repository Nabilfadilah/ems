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
import EditEmployee from "./components/layouts/EditEmployee";
import AddSalary from "./components/layouts/AddSalary";
import SalaryEmployee from "./components/layouts/SalaryEmployee";
import EmployeeSummary from "./components/layouts/employeeDashboard/EmployeeSummary";
import LeaveList from "./components/layouts/employeeDashboard/LeaveList";
import AddLeave from "./components/layouts/employeeDashboard/AddLeave";
import SettingEmployee from "./components/layouts/employeeDashboard/SettingEmployee";
import LeaveAdmin from "./components/layouts/LeaveAdmin";
import ViewLeave from "./components/layouts/ViewLeave";

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
            path="/admin-dashboard/department"
            element={<DepartmentList />}
          />
          <Route
            path="/admin-dashboard/department/add"
            element={<AddDepartment />}
          />
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          />

          {/* route employee */}
          <Route path="/admin-dashboard/employee" element={<EmployeeList />} />
          <Route
            path="/admin-dashboard/employee/add"
            element={<AddEmployee />}
          />
          <Route
            path="/admin-dashboard/employee/:id"
            element={<ViewEmployee />}
          />
          <Route
            path="/admin-dashboard/employee/edit/:id"
            element={<EditEmployee />}
          />
          <Route
            path="/admin-dashboard/employee/leave/:id"
            element={<LeaveList />}
          />

          {/* route leave */}
          <Route path="/admin-dashboard/leave" element={<LeaveAdmin />} />
          <Route path="/admin-dashboard/leave/:id" element={<ViewLeave />} />

          {/* route salary */}
          <Route path="/admin-dashboard/salary" element={<AddSalary />} />
          <Route
            path="/admin-dashboard/employee/salary/:id"
            element={<SalaryEmployee />}
          />

          {/* route setting */}
          <Route
            path="/admin-dashboard/setting"
            element={<SettingEmployee />}
          />
        </Route>

        {/* route khusus employee */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* untuk menghubungkan dengan sumary menngunakan outlet */}
          <Route index element={<EmployeeSummary />} />

          {/* route profile */}
          <Route
            path="/employee-dashboard/profile/:id"
            element={<ViewEmployee />}
          />

          {/* route leaves */}
          <Route path="/employee-dashboard/leave/:id" element={<LeaveList />} />
          <Route path="/employee-dashboard/leave/add" element={<AddLeave />} />

          {/* route salary */}
          <Route
            path="/employee-dashboard/salary/:id"
            element={<SalaryEmployee />}
          />

          {/* route setting */}
          <Route
            path="/employee-dashboard/setting"
            element={<SettingEmployee />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
