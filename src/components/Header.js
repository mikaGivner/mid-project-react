import { useContext } from "react";
import { Logo } from "../style";
import { NavLink } from "react-router-dom";
import "./style.css";
import { Navbar, HamburgerNav, OpenHamburgerNav } from "../style";
import LogIn from "./LogIn";
import { SaveOptionContext } from "./StateContext";
import SignUpPage from "./SignUpPage";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Header(props) {
  const { setIsLearn, setDeletFeatuer, openHamburger, setOpenHamburger } =
    useContext(SaveOptionContext);
  function closeLearn() {
    setIsLearn(false);
    setDeletFeatuer("To delete");
    setOpenHamburger(false);
  }
  function OpenDelet() {
    setIsLearn(false);
    setDeletFeatuer("Stop delete");
    setOpenHamburger(false);
  }
  const currentUser = localStorage.getItem("logIn");
  function OpenBurger() {
    if (!openHamburger) setOpenHamburger(true);
    else {
      setOpenHamburger(false);
    }
  }
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
          <NavLink onClick={closeLearn} className="link" to="/AboutPage">
            About
          </NavLink>
        </li>
        <li>
          <NavLink onClick={OpenDelet} className="link" to="/Favourites">
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
        {props.isLogIn === "Log In" && (
          <li className="link" onClick={props.showSign}>
            Sign up
          </li>
        )}
      </Navbar>
      <HamburgerNav>
        <li>
          <RxHamburgerMenu
            onClick={OpenBurger}
            style={{ fontSize: "x-large" }}
          />
        </li>
        <li className="link log" onClick={props.showLog}>
          {props.isLogIn}
        </li>
        {props.isLogIn === "Log In" && (
          <li className="link" onClick={props.showSign}>
            Sign up
          </li>
        )}
      </HamburgerNav>
      {props.showLogIn && (
        <LogIn
          setShowLogIn={props.setShowLogIn}
          setIsLogIn={props.setIsLogIn}
        />
      )}
      {props.showSignUp && <SignUpPage />}
      {openHamburger && (
        <OpenHamburgerNav>
          <ul>
            <li>
              <NavLink onClick={closeLearn} className="link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeLearn} className="link" to="/AboutPage">
                About
              </NavLink>
            </li>
            <li>
              <NavLink onClick={OpenDelet} className="link" to="/Favourites">
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
          </ul>
        </OpenHamburgerNav>
      )}
    </>
  );
}
