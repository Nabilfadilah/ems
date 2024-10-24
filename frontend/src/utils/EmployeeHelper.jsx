import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/button/Button";
import ModalDelete from "../components/elements/popup/ModalDelete";

export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// employee for salary form
export const getEmployees = async (id) => {
  let employees;

  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

// tabel employee
export const columns = [
  {
    name: "No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Nama",
    selector: (row) => row.name,
    // sortable: true,
    width: "180px",
  },
  {
    name: "Gambar",
    selector: (row) => row.profileImage,
    width: "170px",
  },
  {
    name: "Departemen",
    selector: (row) => row.dep_name,
    width: "170px",
  },
  {
    name: "Tanggal Lahir",
    selector: (row) => row.dob,
    // sortable: true,
    width: "170px",
  },
  {
    name: "Aksi",
    selector: (row) => row.action,
    center: "true",
  },
];

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4">
      {/* view */}
      <Button
        className="bg-blue-800 text-white font-semibold"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        Detail
      </Button>

      {/* edit */}
      <Button
        className="bg-green-800 text-white font-semibold"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Ubah
      </Button>

      {/* salary */}
      <Button
        className="bg-yellow-700 text-white font-semibold"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
      >
        Gaji
      </Button>

      {/* leave */}
      <Button
        className="bg-red-700 text-white font-semibold"
        onClick={() => navigate(`/admin-dashboard/employee/leave/${_id}`)}
      >
        Cuti
      </Button>
    </div>
  );
};
