import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import HomePage from "./Home/HomePage";
import PageLayout from "./Layout/PageLayout";
import { useEffect, useState } from "react";

function App() {
  const [style, setStyle] = useState(true);
  const [text, setText] = useState("");
  const [searchClicked, setClicked] = useState(false);
  const [theme , setTheme] = useState(true) ; 

  function getStatesFromLayout(receivedText, clicked) {
    setText(receivedText);
    setClicked(clicked);
  }

  useEffect(()=> {
    if(theme === true){
      document.documentElement.classList.add("dark") ; 
    }else{
      document.documentElement.classList.remove("dark") ; 
      document.documentElement.classList.add("light") ; 

    }

  }, [theme]) ; 

  // useEffect(() => {
  //   console.log("from App ", text);
  //   console.log("from App Search is  ", searchClicked);
  // }, [text]);
  function getDisplayStyle(style) {
    setStyle(style);
  }
  function getTheme(receivedTheme){
    setTheme(receivedTheme) ; 
  }
  return (
    <Router>
     
      <div className="bg-white text-white dark:bg-black dark:white">
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout
                getStyle={getDisplayStyle}
                getState={getStatesFromLayout}
                getCurrentTheme = {getTheme}
              />
            }
          >
            <Route
              index
              element={
                <HomePage
                  displayStyle={style}
                  reqQuery={text}
                  search={searchClicked}
                />
              }
            />
           
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
