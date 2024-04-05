import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
const Navbar = (props) => {
  const [normal, setNormal] = useState(true);
  const [text , setText] = useState("") ; 
  const [fetch , setFetch] = useState(false) ; 

  function handleClick() {
    setNormal((prev) => !prev);
    props.getStyle(normal);
  }

  const handleChange = (e)=>{
    setText(e.target.value) ; 
    
  }
  function handleSearch() {
    // Toggle the value of fetch and store it in a variable
    const updatedFetch = !fetch;
    setFetch(updatedFetch); // Update the state
    
    // Pass the updated value of fetch directly to the getQuery function
    props.getQuery(text, updatedFetch);
  }

  console.log("from Navbar Search is  " , fetch) ; 


  return (
    <div className=" flex flex-wrap relative justify-between items-center p-5">
      <div className="flex flex-wrap gap-4 items-center">
        <button onClick={handleClick} className="btn">
          Normal
        </button>
        <button onClick={handleClick} className="btn">
          Grid
        </button>
        {/* <button className="btn">Search</button> */}
        <input className="text-white bg-zinc-600 p-2 rounded-lg focus:border-none focus:outline-none focus:text-white focus:outline-2 focus:outline-solid focus:outline-white " placeholder="Search" type="text" onChange={handleChange} />
        <button onClick={handleSearch}><SearchIcon /></button>
      </div>
      <div className="absolute inset-y-0 right-0 mr-4 top-3">
        <h2 className="text-lg sm:text-xl">photosHunt.com</h2>
      </div>
    </div>
  );
};

export default Navbar;
