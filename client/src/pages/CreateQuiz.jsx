import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUIZ } from "../utils/mutations";
import CreateQuestionForm from "./CreateQuestion";

const CreateQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quizCreator, setQuizCreator] = useState("");
  const [quizId, setQuizId] = useState(null);

  const [addQuiz, { error }] = useMutation(ADD_QUIZ);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addQuiz({
        variables: {
          createQuiz: {
            name,
            description,
            quizCreator,
          },
        },
      });
      setQuizId(data.addQuiz._id);
    } catch (err) {
      console.error("Error creating quiz:", err);
    }
  };

  if (quizId) {
    return <CreateQuestionForm quizId={quizId} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Quiz Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (Optional)"
      />
      <input
        type="text"
        value={quizCreator}
        onChange={(e) => setQuizCreator(e.target.value)}
        placeholder="Created By (Optional)"
      />
      <button type="submit">
        Create Quiz
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CreateQuiz;
