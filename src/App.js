// import axios from "axios";
// import styled from "styled-components";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import FavouritesPlaces from "./components/FavouritesPlaces";
import AddPlace from "./components/AddPlace";
import RootLayout from "./components/Root";
import AboutPage from "./components/AboutPage";
function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/AboutPage", element: <AboutPage /> },
          { path: "/Favourites", element: <FavouritesPlaces /> },
          { path: "/AddPlace", element: <AddPlace /> },
        ],
      },
    ],
    <require to="/" />
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
