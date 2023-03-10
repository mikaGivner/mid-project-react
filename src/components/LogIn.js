import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SaveOptionContext } from "./StateContext";
import {
  ClickSign,
  SignUpInput,
  Submit,
  WrapperForm,
  WrapperLogInPage,
} from "../style";
import styled from "styled-components";
import "./style.css";

export default function LogIn({ setShowLogIn, setIsLogIn }) {
  const [validMessage, setValidMessage] = useState("Please enter your details");
  const { userName, setUserName, setShowSignUp } =
    useContext(SaveOptionContext);
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
    color: ${validMessage === "Please enter your details"
      ? "var(--brown)"
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
  const checkUser = async (e) => {
    e.preventDefault();

    if (userName === "" || password === "") {
      setValidMessage("Please fill all");
    } else {
      const userAPI = await axios.get(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/users`
      );
      const validUser = userAPI.data.find((user) => user.userName === userName); //if the name exists in the array, validUser return the obj of this name, otherwise validUser will be null
      if (validUser) {
        //if the name exists
        if (validUser.password === password) {
          setUserName("");
          setPassword("");
          setValidMessage("Please enter your details");
          localStorage.setItem("logIn", `${userName}`);

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
  function toSignUp() {
    setUserName("");
    setPassword("");
    setShowLogIn(false);
    setShowSignUp(true);
  }
  return (
    <WrapperLogInPage>
      <WrapperForm onSubmit={checkUser} className={openingAnimation}>
        <h1>Welcome</h1>
        <H3>{validMessage}</H3>
        <div>
          <p>Enter UserName</p>
          <SignUpInput
            type="text"
            value={userName}
            onChange={newUserName}
            autoFocus={nameFocus}
          />
          <p>Enter Password</p>
          <SignUpInput
            type="password"
            value={password}
            onChange={newPassword}
            autoFocus={passwordFocus}
          />
        </div>
        <Submit type="submit">Log In</Submit>
        <Submit onClick={Back}>Back</Submit>
        <ClickSign onClick={toSignUp}>
          <p> You have no user? Click here and create one</p>
        </ClickSign>
      </WrapperForm>
    </WrapperLogInPage>
  );
}
