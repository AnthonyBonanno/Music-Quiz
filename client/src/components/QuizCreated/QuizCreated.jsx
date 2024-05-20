import { Link } from "react-router-dom";

export default function QuizCreated() {
  return (
    <div>
      <h1>Your quiz has been created!</h1>
      <p>Congratulations! Your quiz is ready.</p>
      <Link to="/">Click here to return to the homepage!</Link>
    </div>
  );
}