import Navbar from "./Navigation/Navbar";
import "./Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Navbar
      links={[
        <Link key={1} style={{ padding: "20px", fontSize: "30px" }} to="/">
          Home Page
        </Link>,
        <Link key={2} style={{ padding: "20px", fontSize: "30px" }} to="/me">
          Profile
        </Link>,
        <Link key={3} style={{ padding: "20px", fontSize: "30px" }} to="/Signup">
          Signup
        </Link>,
        <Link key={4} style={{ padding: "20px", fontSize: "30px" }} to="/Login">
          Login
        </Link>,
      ]}
    />
  );
}
