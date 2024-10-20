import React, { useState, useEffect } from "react";
import Typography from "../elements/text/Typography";
import InputSeacrh from "../elements/input/InputSearch";
import Button from "../elements/button/Button";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FaRegPlusSquare } from "react-icons/fa";

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
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: `${index + 1}.`,
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
                // Id={emp._id}
                _id={emp._id}
                // onEmployeeDelete={onEmployeeDelete}
              />
            ),
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
  const handleSearch = (e) => {
    // const records = employees.filter((emp) =>
    //   emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    const searchTerm = e.target.value.toLowerCase();

    // Filter employees berdasarkan search term
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm)
    );

    // Update nomor urut setelah filter
    const updatedRecords = records.map((emp, index) => ({
      ...emp,
      sno: `${index + 1}.`, // Tetap menjaga nomor urut dengan titik
    }));
    setFilteredEmployees(updatedRecords);
  };

  return (
    <>
      {emLoading ? (
        <div className="text-center p-80">Loading...</div>
      ) : (
        <div className="">
          <div className="text-center">
            <Typography className="text-2xl font-bold">
              Kelola Karyawan
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSeacrh
              placeholder="Cara berdasarkan nama"
              onChange={handleSearch}
            />
            <Link to="/admin-dashboard/add-employee">
              <Button className="bg-green-800 hover:bg-green-700 text-white font-bold flex items-center gap-2 shadow-lg">
                <FaRegPlusSquare strokeWidth={2} className="h-4 w-4" /> Tambah
              </Button>
            </Link>
          </div>

          <div className="table-container overflow-x-auto mt-5 shadow-2xl">
            <DataTable
              columns={columns}
              data={filteredEmployees}
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

export default EmployeeList;

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#1f2937", // Warna gelap untuk header
      color: "#ffffff", // Warna teks header
      fontWeight: "bold", // Menjadikan teks header lebih tebal
      // borderBottom: "2px solid #d1d5db", // Garis pembatas bawah header
    },
  },
  cells: {
    style: {
      // borderRight: "1px solid #d1d5db", // Garis pembatas antar kolom
    },
  },
};
