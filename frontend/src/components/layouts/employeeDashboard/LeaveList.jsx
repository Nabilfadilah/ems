import React from "react";
import Typography from "../../elements/text/Typography";
import InputSeacrh from "../../elements/input/InputSearch";
import Button from "../../elements/button/Button";
import { Link } from "react-router-dom";

const LeaveList = () => {
  return (
    <div className="p-6">
      <div className="text-center">
        <Typography className="text-2xl font-bold">Manage Leave</Typography>
      </div>
      <div className="flex justify-between items-center">
        <InputSeacrh
          placeholder="Seacrh By Dep Name"
          //  onChange={filterDepartments}
        />
        <Button className="px-4 py-1 bg-green-800 hover:bg-green-700 text-white font-bold">
          <Link to="/employee-dashboard/add-leave">Add New</Link>
        </Button>
      </div>
    </div>
  );
};

export default LeaveList;
