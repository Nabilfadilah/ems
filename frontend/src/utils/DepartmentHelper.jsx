import { useNavigate } from "react-router-dom";
import Button from "../components/elements/button/Button";
import axios from "axios";
import ModalDelete from "../components/elements/popup/ModalDelete";

export const columns = [
  {
    name: "No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Nama Departemen",
    selector: (row) => row.dep_name,
    // sortable: true,
  },
  {
    name: "Aksi",
    selector: (row) => row.action,
    center: "true",
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
          onDepartmentDelete();
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
        className="bg-green-800 text-white font-semibold"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Ubah
      </Button>
      <Button
        className="bg-red-700 text-white font-semibold"
        onClick={() => handleDelete(_id)}
      >
        Hapus
      </Button>
    </div>
  );
};
