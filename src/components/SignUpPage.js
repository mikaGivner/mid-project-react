import { useState, useContext } from "react";
import axios from "axios";
import { SaveOptionContext } from "./StateContext";
import "./style.css";
import {
  InputsForm,
  Submit,
  WrapperForm,
  WrapperLogInPage,
  SignUpInput,
  ClickSign,
} from "../style";

export default function SignUpPage() {
  const { setShowSignUp, setShowLogIn } = useContext(SaveOptionContext);
  function CloseSignUp() {
    setShowSignUp(false);
  }
  const goLog = () => {
    setShowSignUp(false);
    setShowLogIn(true);
  };
  const [createName, setCreateName] = useState("");
  const [messageName, setMessageName] = useState("");
  function UpdateUser(e) {
    setCreateName(e.target.value);
    setAddNewUser("");
  }
  const [createPassword, setCreatePassword] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  function UpdatePsw(e) {
    setAddNewUser("");
    setCreatePassword(e.target.value);
  }
  const [createPswVrf, setCreatePswVrf] = useState("");
  const [messagePswVrf, setMessagePswVrf] = useState("");
  function UpdatePswVrf(e) {
    setAddNewUser("");
    setCreatePswVrf(e.target.value);
  }
  const [addNewUser, setAddNewUser] = useState("");

  async function checkNewUser(e) {
    e.preventDefault();
    let suitName = false;
    let suitPsw = false;
    let suitPswVrf = false;
    setMessageName("");
    setMessagePassword("");
    setMessagePswVrf("");
    setAddNewUser("");
    const userAPI = await axios.get(
      `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/users`
    );

    let userArr = userAPI.data;
    console.log(userArr);
    let unUsedName = true;
    let unUsedPsw = true;
    //check correct userName
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    for (let user of userArr) {
      if (user.userName === createName) {
        setMessageName("This name is already used");
        unUsedName = false;
      }
      if (user.password === createPassword) {
        setMessagePassword("This password is already used");
        unUsedPsw = false;
      }
    }
    if (unUsedName) {
      if (!usernameRegex.test(createName)) {
        setMessageName(
          "User name length has to be 7 characters minimum and contains only letters and numbers but both"
        );
      } else {
        suitName = true;
      }
    }
    //check correct psw
    const upperRegex = /[A-Z]/;
    const lowerRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    if (unUsedPsw) {
      if (
        createPassword.length < 8 ||
        !upperRegex.test(createPassword) ||
        !lowerRegex.test(createPassword) ||
        !numberRegex.test(createPassword)
      ) {
        setMessagePassword(
          "Password needs to contain upper case, lower case, and number but only those characters kind. 8 characters minimum "
        );
      } else {
        suitPsw = true;
        if (createPswVrf !== createPassword) {
          setMessagePswVrf("It's not your password. Please try again");
        } else {
          suitPswVrf = true;
        }
      }
    }
    if (suitName && suitPsw && suitPswVrf && unUsedName && unUsedPsw) {
      const newUser = {
        userName: `${createName}`,
        password: `${createPassword}`,
        isAdmin: false,
      };
      await axios.post(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/users`,
        newUser
      );
      setAddNewUser("New user created ");
      setCreateName("");
      setCreatePassword("");
      setCreatePswVrf("");
    }
  }

  return (
    <WrapperLogInPage>
      <WrapperForm className="openingAnimation" onSubmit={checkNewUser}>
        <h1>Lets Get Started...</h1>
        <InputsForm>
          <SignUpInput
            type="name"
            placeholder="Choose an userName"
            value={createName}
            onChange={UpdateUser}
          />
          {messageName}
          <SignUpInput
            type="password"
            placeholder="Choose a password"
            value={createPassword}
            onChange={UpdatePsw}
          />
          {messagePassword}
          <SignUpInput
            type="password"
            placeholder="Verify password"
            value={createPswVrf}
            onChange={UpdatePswVrf}
          />
          {messagePswVrf}
          {addNewUser}
          <br></br>
          <Submit type="submit">Create user</Submit>
          <Submit onClick={CloseSignUp}>Back</Submit>
        </InputsForm>
        <ClickSign onClick={goLog}>Go to log in</ClickSign>
      </WrapperForm>
    </WrapperLogInPage>
  );
}
