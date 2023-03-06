import { useState, useRef, useEffect, useContext } from "react";
import { SaveOptionContext } from "./StateContext";
import {
  Input,
  InputTitle,
  Submit,
  WrapperForm,
  WrapperLogInPage,
} from "../style";
import styled from "styled-components";
import "./style.css";
import Users from "./Data";

export default function LogIn({ setShowLogIn, setIsLogIn }) {
  const [validMessage, setValidMessage] = useState("please enter your details");
  const { userName, setUserName } = useContext(SaveOptionContext);
  // const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nameFocus, setNameFocus] = useState("autoFocus");
  const [passwordFocus, setPasswordFocus] = useState("");
  const [openingAnimation, setOpeningAnimation] = useState("openingAnimation");

  useEffect(() => {
    setTimeout(() => {
      setOpeningAnimation("");
    }, 2000);
  }, []);
  const H3 = styled.h3`
    color: ${validMessage === "please enter your details"
      ? "var(--lightDarkBlue)"
      : "red"};
    line-height: 2rem;
    font-family: "Shantell Sans", cursive;
    font-size: 130%;
    @media (min-width: 700px) {
      font-size: 2rem;
      line-height: 3.6rem;
    }
  `;

  const newUserName = (e) => {
    setUserName(e.target.value);
    setNameFocus("autoFocus");
    setPasswordFocus("");
  };
  const newPassword = (e) => {
    setPassword(e.target.value);
    setPasswordFocus("autoFocus");
    setNameFocus("");
  };
  const checkUser = (e) => {
    e.preventDefault();
    console.log(userName, password);
    if (userName === "" || password === "") {
      setValidMessage("Please fill all");
    } else {
      const validUser = Users.find((user) => user.name === userName); //if the name exists in the array, validUser return the obj of this name, otherwise validUser will be null
      if (validUser) {
        //if the name exists
        if (validUser.password === password) {
          setUserName("");
          setPassword("");
          setValidMessage("please enter your details");
          localStorage.setItem("logIn", `${userName}`);
          // localStorage.setItem(`${userName}`, ``);
          setShowLogIn(false);
          setIsLogIn("Log Out");
        } else setValidMessage("Incorrect password, try again");
      } else setValidMessage("Incorrect name, try again");
    }
  };
  function Back() {
    setUserName("");
    setPassword("");
    setShowLogIn(false);
  }
  return (
    <WrapperLogInPage>
      <WrapperForm onSubmit={checkUser} className={openingAnimation}>
        <h1>Welcome</h1>
        <H3>{validMessage}</H3>
        <InputTitle>Enter UserName</InputTitle>
        <Input
          type="text"
          value={userName}
          onChange={newUserName}
          autoFocus={nameFocus}
        />
        <InputTitle>Enter Password</InputTitle>
        <Input
          type="password"
          value={password}
          onChange={newPassword}
          autoFocus={passwordFocus}
        />
        <Submit type="submit">Log In</Submit>
        <Submit onClick={Back}>Back</Submit>
      </WrapperForm>
    </WrapperLogInPage>
  );
}
