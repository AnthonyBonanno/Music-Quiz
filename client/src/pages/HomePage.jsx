import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_QUIZZES } from "../utils/queries";

export default function HomePage() {
  const { loading, data } = useQuery(QUERY_QUIZZES);

  const quizzes = data?.quizzes || {};

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <section>
      <Link to={`/CreateQuiz`}>Create your own quiz!</Link>
      {quizzes.map((quiz) => (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            margin: "16px 0",
            backgroundColor: "grey",
          }}
          key={quiz._id}
        >
          <Link to={`/Quiz/${quiz._id}`}>{quiz.name}</Link>
          <p>{quiz.description}</p>
          <p style={{ margin: '0', color: '#9E0A00' }}>Created by: {quiz.quizCreator || '(anonymous user)'}</p>
        </div>
      ))}
    </section>
  );
}
