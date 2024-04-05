import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import from react-router-dom
import HomePage from "./Home/HomePage";
import PageLayout from "./Layout/PageLayout";
import { useEffect, useState } from "react";

function App() {
  const [style , setStyle] = useState(true) ; 
  const [text , setText] = useState("") ; 
  const [searchClicked , setClicked] = useState(false) ; 

  function getStatesFromLayout (receivedText , clicked){
    setText(receivedText) ; 
    setClicked(clicked) ; 
  

  }

 useEffect(()=>{
  console.log("from App " , text) ; 
  console.log("from App Search is  "  , searchClicked ) ;
 } , [text]) ;  
  function getDisplayStyle(style){
    setStyle(style) ; 

  }
  return (
    <Router> {/* Use BrowserRouter as Router */}
      <div>
        <Routes>
          <Route path="/" element={<PageLayout getStyle = {getDisplayStyle} getState = {getStatesFromLayout} />}>
            <Route index element={<HomePage displayStyle = {style} reqQuery = {text}  search = {searchClicked}    />} /> {/* Use index for root path */}
            {/* <Route path="/user" element={<HomePage displayStyle = {style}   />} /> Use index for root path */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
