import { useContext } from "react";
import { Logo } from "../style";
import { NavLink } from "react-router-dom";
import "./style.css";
import { Navbar } from "../style";
import LogIn from "./LogIn";
import { SaveOptionContext } from "./StateContext";
export default function Header(props) {
  const { setIsLearn, setDeletFeatuer } = useContext(SaveOptionContext);
  function closeLearn() {
    setIsLearn(false);
    setDeletFeatuer("To delete");
  }
  const currentUser = localStorage.getItem("logIn");
  return (
    <>
      <Logo>
        <span className="t">T</span>
        <span className="r">r</span>
        <span className="i">i</span>
        <span className="p">p</span>
        <span className="o">o</span>
      </Logo>
      <Navbar>
        <li>
          <NavLink onClick={closeLearn} className="link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink onClick={closeLearn} className="link" to="/Favourites">
            Favorites
          </NavLink>
        </li>
        {currentUser !== "" && (
          <li>
            <NavLink onClick={closeLearn} className="link" to="/AddPlace">
              Add Places
            </NavLink>
          </li>
        )}
        <li className="link log" onClick={props.showLog}>
          {props.isLogIn}
        </li>
        {props.showLogIn && (
          <LogIn
            setShowLogIn={props.setShowLogIn}
            setIsLogIn={props.setIsLogIn}
          />
        )}
      </Navbar>
    </>
  );
}
