import { useNavigate } from "react-router-dom";
import Button from "../components/elements/button/Button";
import axios from "axios";
import ModalDelete from "../components/elements/popup/ModalDelete";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const konfirmasi = await ModalDelete();

    if (konfirmasi) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Terjadi kesalahan di server.");
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <Button
        className="bg-green-800 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </Button>
      <Button
        className="bg-red-700 text-white"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </Button>
    </div>
  );
};
