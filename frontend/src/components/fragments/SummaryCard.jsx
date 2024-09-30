import React from "react";
import Typography from "../elements/text/Typography";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-xl">
      <div
        className={`text-3xl flex justify-center items-center ${color} text-white px-4`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <Typography className="text-lg font-semibold">{text}</Typography>
        <Typography className="text-xl font-bold">{number}</Typography>
      </div>
    </div>
  );
};

export default SummaryCard;
