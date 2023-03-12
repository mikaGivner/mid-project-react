// import axios from "axios";
// import styled from "styled-components";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import FavouritesPlaces from "./components/FavouritesPlaces";
import AddPlace from "./components/AddPlace";
import RootLayout from "./components/Root";
import AboutPage from "./components/AboutPage";
import DeletePlaces from "./components/DeletePlaces";
import AddAdmins from "./components/AddAdmins";
import ErrorPage from "./components/ErrorPage";
function App() {
  const userLogIn = localStorage.getItem("logIn");
  const adminUserLogIn = localStorage.getItem("Admin");
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/AboutPage", element: <AboutPage /> },
          { path: "/Favourites", element: <FavouritesPlaces /> },
          {
            path: "/AddPlace",
            element: userLogIn !== "" ? <AddPlace /> : <ErrorPage />,
          },
          {
            path: "/DeletePlaces",
            element: adminUserLogIn !== "" ? <DeletePlaces /> : <ErrorPage />,
          },
          {
            path: "/AddAdmins",
            element: adminUserLogIn !== "" ? <AddAdmins /> : <ErrorPage />,
          },
        ],
      },
    ],
    <require to="/" />
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
