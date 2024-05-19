import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../utils/mutations";
import QuizCreated from "../components/QuizCreated/QuizCreated";

const CreateQuestionForm = ({ quizId }) => {
  const [name, setName] = useState("");
  const [lyric, setLyric] = useState("");
  const [choices, setChoices] = useState([{ name: "", correctAnswer: false }]);
  const [hint, setHint] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [addQuestion] = useMutation(ADD_QUESTION);

  const handleChoiceChange = (index, field, value) => {
    const newChoices = choices.slice();
    newChoices[index][field] = value;
    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, { name: "", correctAnswer: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addQuestion({
        variables: {
          createQuestion: {
            quizId,
            name,
            lyric,
            choices,
            hint,
          },
        },
      });
      console.log("Question added successfully");
      setQuestionCount(questionCount + 1);
      // set fields back to null
      setName("");
      setLyric("");
      setChoices([{ name: "", correctAnswer: false }]);
      setHint("");
      // If questionCount reaches 20, finish creating the quiz
      if (questionCount + 1 >= 20) {
        setQuizCompleted(true);
      }
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  if (quizCompleted) {
    return <QuizCreated />;
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Question Text"
        />
        <input
          type="text"
          value={lyric}
          onChange={(e) => setLyric(e.target.value)}
          placeholder="Lyric"
          required
        />
        {choices.map((choice, index) => (
          <div key={index}>
            <input
              type="text"
              value={choice.name}
              onChange={(e) =>
                handleChoiceChange(index, "name", e.target.value)
              }
              placeholder={`Choice ${index + 1}`}
              required
            />
            <label>
              Correct Answer
              <input
                type="checkbox"
                checked={choice.correctAnswer}
                onChange={(e) =>
                  handleChoiceChange(index, "correctAnswer", e.target.checked)
                }
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddChoice}>
          Add Choice
        </button>
        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Hint"
        />
        <button type="submit">Add Question</button>
      </form>
      <button onClick={handleFinishQuiz}>Finish Creating Quiz</button>
      {questionCount >= 20 && <p>You have reached the limit of 20 questions.</p>}
    </section>
  );
};

export default CreateQuestionForm;
