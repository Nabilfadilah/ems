import React, { useEffect, useState } from "react";
import Typography from "../elements/text/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputSeacrh from "../elements/input/InputSearch";

const SalaryEmployee = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}`,
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
      String(leave.employeeId).toLocaleLowerCase().includes(searchValue)
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
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <Typography className="text-2xl font-bold">
              Salary History
            </Typography>
          </div>
          <div className="flex justify-end my-3">
            <InputSeacrh
              placeholder="Seacrh By Emp ID"
              onChange={handleSearch}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">
                      {salary.employeeId.employeeId}
                    </td>
                    {/* <td className="px-6 py-3">{salary.employeeId._id}</td> */}
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
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
