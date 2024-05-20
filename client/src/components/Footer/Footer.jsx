import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <Link to="https://github.com/AnthonyBonanno/Music-Quiz">Github</Link>
      <p>Email me feedback:</p>
      <Link to="AnthonyB@gmail.com">AnthonyB@gmail.com</Link>
      <p>Consider donating!</p>
    </footer>
  );
}

export default Footer;
