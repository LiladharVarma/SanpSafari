import React from "react";
import notFoundSvg from "./images/download.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <img
        src={notFoundSvg} 
        alt="Results Not Found"
        className="w-[400px] h-[300px] mb-6"
      />
      <p className="text-gray-400 text-lg mb-4">Results not found</p>
      <p className="text-gray-600">Try refining your search criteria.</p>
    </div>
  );
};

export default NotFound;
