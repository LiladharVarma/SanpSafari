import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import Crop75Icon from "@mui/icons-material/Crop75";
import ClearIcon from "@mui/icons-material/Clear";
import HistoryIcon from "@mui/icons-material/History";
const Navbar = (props) => {
  const [normal, setNormal] = useState(true);
  const [text, setText] = useState("");
  const [fetch, setFetch] = useState(false);
  const [open, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  //upadtes display tyle whether grid or normal
  function handleNormalClick() {
    setNormal(true);
    props.getStyle(normal);
  }
  // function handleGridClick() {
  //   setNormal("grid");
  //   props.getStyle(normal);
  // }

  //setting query typed in search field

  const handleChange = (e) => {
    setText(e.target.value);
  };

  //setting query selected from tags
  function setTextFromList(query, e) {
    console.log("reaceived query is ", query);
    setText(query);

    handleSearchForRecentClicks(e);
  }

  function handleSearch(e) {
    e.preventDefault();

    if (text.trim !== "" && !recentSearches.includes(text)) {
      recentSearches.push(text);
      setRecentSearches([...recentSearches]);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }

    const updatedFetch = !fetch;
    setFetch(updatedFetch);
    console.log("UPdated Fetch is ", updatedFetch);

    console.log("after selction upadted query is ", text);

    props.getQuery(text, updatedFetch);

    setFetch(false);
    setOpen(false);
    // setText("");
  }

  //Searches for the text selected from recent Searches or  Tags
  function handleSearchForRecentClicks(e) {
    e.preventDefault();
    const searchText = e.target.innerText; // Get the text directly from event target
    setText(searchText); // Update the state with the clicked item
    if (!recentSearches.includes(searchText) && searchText.trim !== "") {
      setRecentSearches([...recentSearches, searchText]); // Update recent searches
      localStorage.setItem(
        "recentSearches",
        JSON.stringify([...recentSearches, searchText])
      );
    }
    const updatedFetch = !fetch;
    setFetch(updatedFetch);
    props.getQuery(searchText, updatedFetch); // Call getQuery with the clicked item
    setOpen(false);
    setFetch(false);
  }

  //onClick deleteing user recent search
  function deleteSearch(id) {
    console.log("deleting Search");

    setRecentSearches((prev) => {
      const updatedSearches = prev.filter((item, index) => {
        return index !== id;
      });
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  }

  //Load recent searches from local storage if any
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    setRecentSearches(storedSearches || []);
  }, []);

  //closing modal
  function handleClose() {
    setOpen(false);
  }
  return (
    <div className=" flex flex-wrap relative justify-between items-center p-5">
      <div className="flex flex-wrap gap-4 items-center">
        <button
          onClick={handleNormalClick}
          className="btn border-[1.5px] border-solid border-slate-800 rounded-lg    pl-2 pr-2 p-1"
        >
          <Crop75Icon fontSize="medium" />
        </button>

        <button
          className=" border-[1.5px] border-solid border-slate-800 rounded-lg    pl-2 pr-2 p-1 hover:bg-slate-950"
          onClick={() => {
            setOpen(true);
          }}
        >
          <SearchIcon />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center "
        >
          <div className="border-[1px] border-solid border-slate-800 rounded-lg outline-none max-h-96 overflow-y-scroll w-[550px] flex flex-col  items-center bg-black p-4 ">
            <form className="w-full" onSubmit={handleSearch}>
              <input
                className="text-white bg-black border-[1px] border-solid border-slate-800 w-full p-2 rounded-lg focus:border-2 focus:outline-none focus:text-white   placeholder:text-slate-600 focus:border-solid focus:border-slate-800"
                placeholder="Search photos"
                type="text"
                value={text}
                onClick={() => {
                  setText("");
                }}
                onChange={handleChange}
                // focus:outline-[1.5px] focus:outline-solid focus:outline-white
              />
            </form>
            <Stack
              spacing={1}
              width={"100%"}
              paddingLeft={"5px"}
              marginTop={"10px"}
            >
              {recentSearches.length > 0 && (
                <p className="text-gray-500">
                  {/* <span className="mr-1">
                  <LocalOfferIcon fontSize="small" />
                </span> */}
                  Recent Search
                </p>
              )}
              {recentSearches.map((item, index) => {
                return (
                  <div className="flex items-center w-full gap-2  justify-between">
                    <div className="flex items-center w-full hover:border-[1.5px] hover:border-solid hover:border-slate-800 hover:bg-slate-900 p-2 rounded-lg gap-2">
                      <HistoryIcon fontSize="small " />
                      <p
                        className="cursor-pointer w-full "
                        value={text}
                        onClick={(e) => {
                          // setTextFromList(e.target.innerText, e);
                          setText(item);
                          // handleSearchForRecens(e) ;
                          handleSearchForRecentClicks(e);
                        }}
                      >
                        {item}
                      </p>
                    </div>
                    <p
                      className="text-white cursor-pointer"
                      onClick={() => {
                        deleteSearch(index);
                      }}
                    >
                      <ClearIcon />
                    </p>
                  </div>
                );
              })}

              <div className=" ">
                <p className="text-gray-500">
                  <span className="mr-1">
                    <LocalOfferIcon fontSize="small" />
                  </span>
                  TAGS
                </p>
                {["Nature", "Rain", "Cars", "Cricket", "Forest"].map((item) => (
                  <p
                    className="cursor-pointer hover:border-[1.5px] hover:border-solid hover:border-slate-800 hover:bg-slate-900 p-2 rounded-lg"
                    onClick={(e) => {
                      setTextFromList(item, e);
                    }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </Stack>
          </div>
        </Modal>
      </div>
      <div className="absolute inset-y-0 right-0 mr-4 top-4 ">
        <h2 className="text-lg sm:text-xl hover:text-gray-500 cursor-pointer">
          SnapSafari.com
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
