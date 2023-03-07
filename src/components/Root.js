import { useState, useEffect, useContext } from "react";
import { SaveOptionContext } from "./StateContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  const nameUser = localStorage.getItem("logIn");
  const { showLogIn, setShowLogIn, saveOptionn, setSaveOptionn, setIsLearn } =
    useContext(SaveOptionContext);
  //   const [saveOption, setSaveOption] = useState("");
  const [isLogIn, setIsLogIn] = useState("Log In");
  function showLog(e) {
    setIsLearn(false);
    if (e.target.innerText === "Log In") {
      setShowLogIn(true);
    } else {
      localStorage.setItem("logIn", ``);
      setIsLogIn("Log In");
      setSaveOptionn("");
      setShowLogIn(false);
    }
  }
  useEffect(() => {
    if (nameUser !== "") {
      setSaveOptionn("Save");
      setIsLogIn("Log Out");
    } else {
      setSaveOptionn("");
    }
  }, [saveOptionn, isLogIn, nameUser, showLog]);
  return (
    <>
      <Header
        showLogIn={showLogIn}
        showLog={showLog}
        isLogIn={isLogIn}
        setShowLogIn={setShowLogIn}
        setIsLogIn={setIsLogIn}
      />
      <Outlet />
    </>
  );
}
