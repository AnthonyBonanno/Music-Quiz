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
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  const [addQuestion] = useMutation(ADD_QUESTION);

  const handleChoiceChange = (index, field, value) => {
    const newChoices = choices.slice();
    newChoices[index][field] = value;

    if (field === "correctAnswer" && value) {
      newChoices.forEach((choice, i) => {
        if (i !== index) {
          choice.correctAnswer = false;
        }
      });
    }

    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, { name: "", correctAnswer: false }]);
  };

  const handleRemoveChoice = (index) => {
    const newChoices = choices.slice();
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
      // Add question to the questions list on the side
      setQuestions([...questions, { name, lyric, choices, hint }]);
      // set fields back to null
      setName("");
      setLyric("");
      setChoices([{ name: "", correctAnswer: false }]);
      setHint("");
      setCurrentQuestionIndex(null);
      // If questionCount reaches 3, finish creating the quiz
      if (questionCount + 1 >= 3) {
        setQuizCompleted(true);
      }
    } catch (err) {
      console.error("Error creating question:", err);
    }
  };

  const handleFinishQuiz = async () => {
    await handleSubmit();
    setQuizCompleted(true);
  };

  const handleQuestionClick = (index) => {
    const question = questions[index];
    setName(question.name);
    setLyric(question.lyric);
    setChoices(question.choices);
    setHint(question.hint);
    setCurrentQuestionIndex(index);
  };

  if (quizCompleted) {
    return <QuizCreated />;
  }

  return (
    <section>
      <aside>
        <h3>Questions</h3>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <button type="button" onClick={() => handleQuestionClick(index)}>
                {question.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
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
            <button type="button" onClick={() => handleRemoveChoice(index)}>
              Remove Choice
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddChoice}>
          Add Choice
        </button>
        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Hint (If player gets stuck)"
        />
        <button type="submit">
          {currentQuestionIndex !== null ? "Update Question" : "Add Question"}
        </button>
      </form>
      <button onClick={handleFinishQuiz}>Save and Finish Quiz</button>
      {questionCount >= 3 && <p>You have reached the limit of 3 questions.</p>}
    </section>
  );
};

export default CreateQuestionForm;
