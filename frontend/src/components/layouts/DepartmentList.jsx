import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import InputSearch from "../elements/input/InputSearch";
import { Link } from "react-router-dom";
import Button from "../elements/button/Button";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async () => {
    // const data = departments.filter((dep) => dep._id !== id);
    // setFilteredDepartments(data);
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
          // action: <DepartmentButtons Id={dep._id} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // search
  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <Typography className="text-2xl font-bold">
              Manage Departments
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSearch
              placeholder="Seacrh By Dep Name"
              onChange={filterDepartments}
            />
            <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
              <Link to="/admin-dashboard/add-new-department">Add New</Link>
            </Button>
          </div>

          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
            />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default DepartmentList;
