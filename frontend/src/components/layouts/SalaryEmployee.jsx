import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import InputSeacrh from "../elements/input/InputSearch";
import { useAuth } from "../../context/AuthContext";
import Button from "../elements/button/Button";
import { IoMdArrowBack } from "react-icons/io";

const SalaryEmployee = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Salary view data: ", response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // search
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    const records = salaries.filter((leave) =>
      String(leave.payDate).toLocaleLowerCase().includes(searchValue)
    );
    setFilteredSalaries(records);
  };

  // const handleSearch = (q) => {
  //   const records = salaries.filter((leave) =>
  //     leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
  //   );
  //   setFilteredSalaries(records);
  // };

  // const handleSearch = (e) => {
  //   const records = salaries.filter((leave) =>
  //     String(leave.employeeId)
  //       .toLocaleLowerCase()
  //       .includes(e.toLocaleLowerCase())
  //   );
  //   setFilteredSalaries(records);
  // };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading.....</div>
      ) : (
        <div className="overflow-x-auto pb-2 shadow-2xl">
          <div className="text-center">
            <Typography className="text-2xl font-bold">
              Riwayat Gaji Karyawan
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <InputSeacrh
              placeholder="Cari berdasarkan tanggal pembayaran"
              onChange={handleSearch}
            />

            {user.role === "admin" && (
              <Link to="/admin-dashboard/employees">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-1 shadow-xl font-bold">
                  <IoMdArrowBack strokeWidth={2} className="h-4 w-4" /> Kembali
                </Button>
              </Link>
            )}
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 shadow-2xl mt-5">
              <thead className="text-xs text-white uppercase bg-gray-800  border border-gray-700">
                <tr>
                  <th className="px-6 py-3">No.</th>
                  <th className="px-6 py-3">ID Karyawan</th>
                  <th className="px-6 py-3">Gaji Karyawan</th>
                  <th className="px-6 py-3">Tunjangan</th>
                  <th className="px-6 py-3">Pengurangan</th>
                  <th className="px-6 py-3">Total Gaji</th>
                  <th className="px-6 py-3">Tanggal Pembayaran</th>
                </tr>
              </thead>
              <tbody className="text-black shadow-2xl">
                {filteredSalaries.map((salary, index) => {
                  // Hitung netSalary secara dinamis
                  const netSalary =
                    salary.basicSalary + salary.allowances - salary.deductions;

                  return (
                    // Tambahkan return di sini
                    <tr
                      key={salary.id}
                      className="bg-white border-b dark:bg-white dark:border-gray-300"
                    >
                      <td className="px-6 py-3">{index + 1}.</td>
                      <td className="px-6 py-3">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-3">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(salary.basicSalary)}
                      </td>
                      <td className="px-6 py-3">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(salary.allowances)}
                      </td>
                      <td className="px-6 py-3">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(salary.deductions)}
                      </td>
                      <td className="px-6 py-3">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(netSalary)}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default SalaryEmployee;
