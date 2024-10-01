import Swal from "sweetalert2";
import imgModal from "../../../assets/img/simpan.png";
import "./ModalAdd.css";

const ModalAdd = () => {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Berhasil menambahkan data",
      imageUrl: imgModal,
      imageWidth: 145,
      imageHeight: 145,
      imageAlt: "Custom image",
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: "tambah-popup",
        title: "tambah-title",
      },
      willClose: () => {
        resolve();
      },
    });
  });
};

export default ModalAdd;
