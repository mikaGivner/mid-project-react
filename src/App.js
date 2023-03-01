import { useState, useEffect } from "react";
// import axios from "axios";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import styled from "styled-components";

import LogIn from "./components/LogIn";
import { Submit } from "./style";
function App() {
  const [isLogOut, setIsLogOut] = useState(false);

  const isLogIn = localStorage.getItem("logIn");
  useEffect(() => {
    if (isLogIn.length !== 0) {
      setIsLogOut(true);
    } else setIsLogOut(false);
  }, [isLogOut, isLogIn]);
  const logOut = () => {
    localStorage.setItem("logIn", ``);
    setIsLogOut(false);
  };
  return (
    <div>
      {!isLogOut ? (
        <LogIn setIsLogOut={setIsLogOut} />
      ) : (
        <Submit onClick={logOut}>LogOut</Submit>
      )}
    </div>
  );
}

export default App;
