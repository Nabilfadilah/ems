import React, { useState, useEffect } from "react";
import Typography from "../elements/text/Typography";
import InputSeacrh from "../elements/input/InputSearch";
import Button from "../elements/button/Button";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [emLoading, setEmLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const onEmployeeDelete = async (id) => {
    const data = employees.filter((emp) => emp._id !== id);
    setEmployees(data);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            name: emp.userId.name,
            // profileImage: emp.userId.profileImage,
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
              />
            ),
            dep_name: emp.department.dep_name,
            dob: new Date(emp.dob).toLocaleDateString(),
            action: (
              <EmployeeButtons
                Id={emp._id}
                // onEmployeeDelete={onEmployeeDelete}
              />
            ),
            // action: <DepartmentButtons Id={dep._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // search
  const filterEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.emp_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <>
      {emLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <Typography className="text-2xl font-bold">
              Manage Employess
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSeacrh
              placeholder="Seacrh By Dep Name"
              onChange={filterEmployees}
            />
            <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
              <Link to="/admin-dashboard/add-employee">Add New</Link>
            </Button>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredEmployees} pagination />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default EmployeeList;
