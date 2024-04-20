import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InstagramIcon from "@mui/icons-material/Instagram";


const ImageCard = (props) => {
  const [displayStyle, setDisplayStyle] = useState(true);
  useEffect(() => {
    setDisplayStyle(props.display);
  }, [props.display]);
  function downloadPhoto(photoUrl) {
    fetch(photoUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "photo.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  let currentDate = props.created_at;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  const formattedDate = formatDate(currentDate);

  const handleClick = () => {};
  return (
    <>
      <div className=" w-full  mt-1 mb-1 flex flex-col md:flex-row">
        <div
          className={`${
            displayStyle ? "sm:w-[75%] pl-4 pr-4" : "w-full"
          } pl-0 pr-0`}
        >
          <img
            className="w-full object-cover"
            src={props.url}
            alt="trial-Images"
            onClick={() => {
              handleClick;
            }}
          />
        </div>
        <div
          className={`${
            !displayStyle
              ? "hidden"
              : "font-DankMono font-semibold tracking-wider md:w-[25%] w-full h-auto text-md"
          }`}
        >
          <div className=" grid sm:block grid-cols-2 sm:grid-cols-1 ">
            <Stack
              spacing={2}
              // border={"2px solid blue"}
              style={{ margin: "10px" }}
            >
              <p className="flex gap-1  dark:hover:text-white hover:text-black  text-gray-500">
                <InstagramIcon />
                {props.instagram_username}
              </p>
              {props.name && (
                <p className="flex gap-1  dark:hover:text-white hover:text-black  text-gray-500 ">
                  <CameraAltIcon />
                  {props.name}
                </p>
              )}
            </Stack>
            <Stack
              spacing={1.2}
              // border={"2px solid red"}
              style={{ margin: "10px" }}
              color={"gray"}
            >
              {/* {props.isRandom && ( */}
              <div className="flex flex-col">
                {props.focal_length && <p>{props.focal_length}mm</p>}
                {props.aperture && (
                  <p>
                    <span className="italic">f</span>/{props.aperture}
                  </p>
                )}
                {props.exposure_time && <p>{props.exposure_time}s</p>}
                {props.iso && <p>ISO {props.iso}</p>}
              </div>
              {/* )} */}

              <p>{formattedDate}</p>
              <p>Views {props.views}</p>
              <p>Likes {props.likes}</p>
              <button
                className="border-2 border-solid border-gray-500 text-gray dark:hover:border-white dark:hover:text-white hover:text-black rounded-lg p-2 "
                onClick={() => downloadPhoto(props.url)}
              >
                Download Image
              </button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
