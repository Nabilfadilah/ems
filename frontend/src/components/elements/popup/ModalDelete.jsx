import Swal from "sweetalert2";
import imgModal from "../../../assets/img/delete.png";
import "./ModalDelete.css";

const ModalDelete = () => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Apakah kamu ingin menghapus data ini?",
      imageUrl: imgModal,
      reverseButtons: true,
      confirmButtonText: "Hapus!",
      showCancelButton: true,
      cancelButtonText: "Batal",
      customClass: {
        popup: "delete-poppup",
        title: "delete-title",
        image: "delete-image",
        confirmButton: "delete-confirmButton",
        cancelButton: "delete-cancelButton",
      },
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};

export default ModalDelete;
