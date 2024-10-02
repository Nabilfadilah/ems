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

// tabel employee
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "130px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  // const handleDelete = async (id) => {
  //   const konfirmasi = await ModalDelete();

  //   if (konfirmasi) {
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:5000/api/employee/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.data.success) {
  //         onEmployeeDelete(id);
  //       }
  //     } catch (error) {
  //       if (error.response && !error.response.data.success) {
  //         alert(error.response.data.error);
  //       } else {
  //         alert("Terjadi kesalahan di server.");
  //       }
  //     }
  //   }
  // };

  return (
    <div className="flex space-x-4">
      {/* view */}
      <Button
        className="bg-blue-800 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </Button>

      {/* edit */}
      <Button
        className="bg-green-800 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        Edit
      </Button>

      {/* salary */}
      <Button className="bg-yellow-700 text-white">Salary</Button>

      {/* leave */}
      <Button className="bg-red-700 text-white">Leave</Button>
    </div>
  );
};
