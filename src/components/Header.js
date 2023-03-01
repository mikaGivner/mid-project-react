import { NavLink } from "react-router-dom";
import "./style.css";
import { Navbar, Submit } from "../style";
export default function Header() {
  return (
    <Navbar>
      <li>
        <NavLink className="link" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="link" to="/Favourites">
          Favourites
        </NavLink>
      </li>
    </Navbar>
  );
}
