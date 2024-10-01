import Swal from "sweetalert2";
import "./ModalLogin.css";
import imgModal from "../../../assets/img/berhasilLogin.png";

const ModalLogin = () => {
  Swal.fire({
    title: "Selamat! <br/> Kamu sudah bisa mengakses",
    imageUrl: imgModal,
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      popup: "sukses-popup",
      title: "sukses-title",
      image: "sukses-image",
    },
  });
};

export default ModalLogin;
