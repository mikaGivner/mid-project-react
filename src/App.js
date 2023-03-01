// import axios from "axios";
// import styled from "styled-components";

import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/LogIn";
import { Submit } from "./style";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import FavouritesPlaces from "./components/FavouritesPlaces";
function App() {
  const router = createBrowserRouter(
    [
      { path: "/", element: <Home /> },
      { path: "/Favourites", element: <FavouritesPlaces /> },
    ],
    <require to="/" />
  );
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
        <div>
          <RouterProvider router={router}></RouterProvider>
          <Submit onClick={logOut}>LogOut</Submit>

          {/* <Link to="/"> */}
          {/* </Link> */}
        </div>
      )}
    </div>
  );
}

export default App;
