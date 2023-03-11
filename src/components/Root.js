import { useState, useEffect, useContext, useCallback } from "react";
import { SaveOptionContext } from "./StateContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function RootLayout() {
  const nameUser = localStorage.getItem("logIn");
  const {
    setOpenHamburger,
    showLogIn,
    setShowLogIn,
    saveOptionn,
    setSaveOptionn,
    setIsLearn,
    showSignUp,
    setShowSignUp,
  } = useContext(SaveOptionContext);
  //   const [saveOption, setSaveOption] = useState("");
  const [isLogIn, setIsLogIn] = useState("Log In");
  const showLog = useCallback(
    (e) => {
      setIsLearn(false);
      setOpenHamburger(false);
      if (e.target.innerText === "Log In") {
        setShowLogIn(true);
      } else {
        localStorage.setItem("logIn", ``);
        localStorage.setItem("Admin", ``);
        setIsLogIn("Log In");
        setSaveOptionn("");
        setShowLogIn(false);
      }
    },
    [setIsLearn, setSaveOptionn, setShowLogIn, setOpenHamburger]
  );
  function ShowSign() {
    setOpenHamburger(false);
    setShowSignUp(true);
  }
  useEffect(() => {
    if (nameUser !== "") {
      setSaveOptionn("Save");
      setIsLogIn("Log Out");
    } else {
      setSaveOptionn("");
    }
  }, [saveOptionn, setSaveOptionn, isLogIn, nameUser, showLog]);
  return (
    <>
      <Header
        showLogIn={showLogIn}
        showLog={showLog}
        isLogIn={isLogIn}
        setShowLogIn={setShowLogIn}
        setIsLogIn={setIsLogIn}
        showSign={ShowSign}
        showSignUp={showSignUp}
      />
      <Outlet />
    </>
  );
}
