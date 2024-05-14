import Navbar from "./Navigation/Navbar";
import "./Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Navbar
      links={[
        <Link key={1} className="nav-link text-dark" id="menu-item" to="/">
          Home Page
        </Link>,
        <Link key={2} className="nav-link text-dark" id="menu-item" to="/Profile">
          Profile
        </Link>,
        <Link key={3} className="nav-link text-dark" to="/Signup">
          Signup
        </Link>,
      ]}
    />
  );
}
