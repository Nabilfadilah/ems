import Swal from "sweetalert2";
import imgModal from "../../../assets/img/simpan.png";
import "./ModalEdit.css";

const ModalEdit = () => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Berhasil menyimpan perubahan",
      imageUrl: imgModal,
      imageWidth: 145,
      imageHeight: 145,
      imageAlt: "Custom image",
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        title: "edit-title",
        popup: "edit-popup",
      },
      willClose: () => {
        resolve();
      },
    });
  });
};

export default ModalEdit;
