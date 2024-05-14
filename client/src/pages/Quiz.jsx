import { useState } from "react";
import Question from "./Question";

const Quiz = (quiz) => {
  const [phase, setPhase] = useState(0);
  const [questionIndex, setQuestionIndex] = useState();

  const handleStart = () => {
    setPhase(1);
    setQuestionIndex(0);
    console.log("Starting quiz: " + quiz.id);
  };

  const handleNext = () => {
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <>
      {phase == 0 ? (
        <>
          <h1>{quiz.name}</h1>
          <img src={quiz.image} />
          <button onClick={handleStart}>Start Quiz!</button>
        </>
      ) : (
        <Question
          question={quiz.questions[questionIndex]}
          handleNext={handleNext}
        />
      )}
    </>
  );
};

export default Quiz;
