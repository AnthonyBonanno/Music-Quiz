import Navbar from "./Navigation/Navbar";
import "./Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Navbar
      links={[
        <Link key={1} to="/">
          Home Page
        </Link>,
        <Link key={2} to="/Profile">
          Profile
        </Link>,
        <Link key={3} to="/Signup">
          Signup
        </Link>,
        <Link key={4} to="/Login">
          Login
        </Link>,
      ]}
    />
  );
}
