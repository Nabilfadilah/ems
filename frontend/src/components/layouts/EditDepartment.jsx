import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../elements/button/Button";
import Label from "../elements/input/Label";
import InputForm from "../elements/input/InputForm";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import ModalEdit from "../../components/elements/popup/ModalEdit";

// Validasi Yup
const validationEdit = Yup.object({
  dep_name: Yup.string().required("Nama Departemen harus diisi"),
  description: Yup.string().required("Deskripsi harus diisi"),
});

const EditDepartment = () => {
  const { id } = useParams(); // Mendapatkan id dari parameter URL
  const [department, setDepartment] = useState(null);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect untuk mengambil data departemen berdasarkan id
  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department); // Menyimpan data departemen
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  // Menggunakan Formik
  const formik = useFormik({
    initialValues: {
      dep_name: department?.dep_name || "", // Nilai awal dari data yang diambil
      description: department?.description || "",
    },
    enableReinitialize: true, // Memungkinkan Formik untuk reinitialize ketika data berubah
    validationSchema: validationEdit,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/department/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          ModalEdit(); // Tampilkan modal setelah edit sukses
          navigate("/admin-dashboard/departments"); // Arahkan kembali setelah sukses
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <Typography className="text-xl font-bold">
              Ubah Departemen
            </Typography>
            <Link to="/admin-dashboard/departments">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1 shadow-xl font-bold">
                <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Back
              </Button>
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <InputForm
                className={`w-full ${
                  formik.touched.dep_name && formik.errors.dep_name
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                name="dep_name"
                label="Nama Departemen"
                type="text"
                placeholder="Nama Departemen"
                value={formik.values.dep_name} // Nilai dari Formik
                onChange={formik.handleChange} // Handle perubahan dari Formik
                onBlur={formik.handleBlur}
              />
              {formik.touched.dep_name && formik.errors.dep_name ? (
                <div className="text-red-500">{formik.errors.dep_name}</div>
              ) : null}
            </div>

            <div className="w-full mt-5">
              <Label>Deskripsi</Label>
              <textarea
                name="description"
                placeholder="Deskripsi Departemen"
                className={`mt-1 p-2 block w-full border rounded-md ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                value={formik.values.description} // Nilai dari Formik
                onChange={formik.handleChange} // Handle perubahan dari Formik
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500">{formik.errors.description}</div>
              ) : null}
            </div>

            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-600 w-full font-bold text-white h-8 mt-5"
            >
              Ubah Data
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
