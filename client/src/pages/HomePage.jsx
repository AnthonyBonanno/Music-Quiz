import { Link } from "react-router-dom";

export default function HomePage() {
    return (
      <section>
        <Link to={`/CreateQuiz`}>Create your own quiz!</Link>


      </section>
    );
  }