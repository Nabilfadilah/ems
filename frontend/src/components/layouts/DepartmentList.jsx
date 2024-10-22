import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import InputSearch from "../elements/input/InputSearch";
import { Link } from "react-router-dom";
import Button from "../elements/button/Button";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { FaRegPlusSquare } from "react-icons/fa";

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
        // let sno = 1;
        const data = await response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: `${index + 1}.`,
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
        <div className="departemen">
          <div className="text-center">
            <Typography className="text-2xl font-bold">
              Kelola Departemen
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSearch
              placeholder="Cari berdasarkan nama departemen"
              onChange={filterDepartments}
            />
            <Link to="/admin-dashboard/add-new-department">
              <Button className="bg-green-800 hover:bg-green-700 text-white font-bold flex items-center gap-2 shadow-xl">
                <FaRegPlusSquare strokeWidth={2} className="h-4 w-4" /> Tambah
              </Button>
            </Link>
          </div>

          <div className="table-container overflow-x-auto mt-5 shadow-2xl">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              responsive
              highlightOnHover
              striped
              dense
              customStyles={customStyles} // Menerapkan gaya khusus
            />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default DepartmentList;

const customStyles = {
  headCells: {
    style: {
      paddingTop: "8px",
      paddingBottom: "8px",
      fontSize: "14px",
      backgroundColor: "#1f2937", // Warna gelap untuk header
      color: "#ffffff", // Warna teks header
      fontWeight: "bold", // Menjadikan teks header lebih tebal
      // borderBottom: "2px solid #d1d5db", // Garis pembatas bawah header
    },
  },
  cells: {
    style: {
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  },
};
