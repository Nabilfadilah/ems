import Swal from "sweetalert2";
import "./ModalLogout.css";
import imgModal from "../../../assets/img/keluar.png";

const ModalLogout = (onConfirm) => {
  Swal.fire({
    title: "Apakah kamu yakin ingin keluar?",
    imageUrl: imgModal,
    showCancelButton: true,
    confirmButtonText: "Keluar",
    cancelButtonText: "Batal",
    reverseButtons: true,
    customClass: {
      popup: "logout-popup",
      title: "logout-title",
      image: "logout-image",
      confirmButton: "logout-confirmButton",
      cancelButton: "logout-cancelButton",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

export default ModalLogout;
