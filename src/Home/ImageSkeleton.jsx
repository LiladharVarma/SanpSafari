import React from "react";
import Skeleton from "@mui/material/Skeleton";


function ImageSkeleton() {
  return (
    <div className="w-full mt-1 mb-1 flex flex-col md:flex-row">
      <div className="w-full sm:w-[75%] ">
        <Skeleton
          variant="rounded"
          height={450}
          animation="wave"
          style={{ backgroundColor: "#333" }}
        />
      </div>
      <div className=" md:w-[25%] font-DankMono font-semibold tracking-wider w-full h-auto text-md">
        <div className="grid sm:block grid-cols-2 sm:grid-cols-1">
          <Skeleton
            variant="rounded"
            height={300}
            animation="wave"
            style={{ backgroundColor: "#333" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageSkeleton;
