import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_QUIZZES } from "../utils/queries";
import { REMOVE_QUIZ } from "../utils/mutations";

export default function HomePage() {
  const { loading, data } = useQuery(QUERY_QUIZZES);
  const [removeQuiz] = useMutation(REMOVE_QUIZ, {
    update(cache, { data: { removeQuiz } }) {
      if (!removeQuiz) {
        return; 
      }

      const { quizzes } = cache.readQuery({ query: QUERY_QUIZZES });
      cache.writeQuery({
        query: QUERY_QUIZZES,
        data: { quizzes: quizzes.filter((quiz) => quiz._id !== removeQuiz._id) },
      });
    },
  });

  const quizzes = data?.quizzes || [];

  if (loading) {
    return <p>loading...</p>;
  }

  const handleDeleteQuiz = async (quizId) => {
    try {
      await removeQuiz({
        variables: { quizId },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <Link style={{ fontSize: "50px", }} className="major-mono-display-regular" to={`/CreateQuiz`}>Create your own quiz!</Link>
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
          <p style={{ margin: "0", color: "#9E0A00" }}>
            Created by: {quiz.quizCreator || "(anonymous user)"}
          </p>
          <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete Quiz</button>
        </div>
      ))}
    </section>
  );
}