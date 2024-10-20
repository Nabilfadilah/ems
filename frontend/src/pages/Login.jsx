import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ModalLogin from "../components/elements/popup/ModalLogin";
import Form from "../components/elements/form/Form";
import InputForm from "../components/elements/input/InputForm";
import Button from "../components/elements/button/Button";
import Typography from "../components/elements/text/Typography";
import bgLogin from "../assets/img/bgLogin.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";

// validasi login
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Alamat email salah")
    .required("Email harus diisi."),
  password: Yup.string()
    .min(5, "Password minimal harus 5 karakter")
    .required("Password harus diisi."),
});

const Login = () => {
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  // formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          values // gunakan formik values untuk mengirim email dan password
        );
        if (response.data.success) {
          login(response.data.user);
          localStorage.setItem("token", response.data.token);
          if (response.data.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/employee-dashboard");
          }
          ModalLogin();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        } else {
          setError("Server Error");
        }
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* bagian kanan, gambar */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full">
        <img src={bgLogin} alt="Placeholder" className="w-auto h-auto mt-10" />
      </div>

      {/* bagian kiri, form login */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-300 p-8">
        <div className="border shadow p-6 w-96 bg-white">
          <Typography className="text-2xl mb-4 font-poppins font-extrabold text-center">
            Employee Management System
          </Typography>
          {/* <h2 className="text-2xl font-bold mb-4">Login</h2> */}
          {error && <p className="text-red-500">{error}</p>}
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <InputForm
                type="email"
                label="Email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>
            <div>
              <InputForm
                type="password"
                label="Password"
                className="w-full px-3 py-2 border"
                placeholder="*********"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} // handle blur untuk validasi
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 pt-0">{formik.errors.password}</p>
              ) : null}
            </div>

            <div className="mb-4 mt-8">
              <Button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold"
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
