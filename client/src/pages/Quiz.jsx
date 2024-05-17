import { useState } from "react";
import Question from "./Question";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_QUIZ } from "../utils/queries";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const [phase, setPhase] = useState(0);
  const [questionIndex, setQuestionIndex] = useState();

  const { quizId } = useParams();
  console.log(quizId);

  const { loading, data } = useQuery(QUERY_SINGLE_QUIZ, {
    variables: { quizId: quizId },
  });

  const quiz = data?.quiz || {};

  const handleStart = () => {
    setPhase(1);
    setQuestionIndex(0);
    console.log(quiz);
  };

  const handleNext = () => {
    setQuestionIndex(questionIndex + 1);
    if (questionIndex == quiz.questions.length - 1) {
      setPhase(2);
    }
  };

  if (loading) {
    return <p>loading...</p>;
  }
  console.log(quiz);
  return (
    <>
      {phase == 0 && (
        <>
          <h1>{quiz.name}</h1>
          <img src={quiz.image} />
          <button onClick={handleStart}>Start Quiz!</button>
          <p>{quiz.description}</p>
        </>
      )}
      {phase == 1 && (
        <Question
          question={quiz.questions[questionIndex]}
          handleNext={handleNext}
        />
      )}
      {phase == 2 && <h1>GAME OVER</h1>}
    </>
  );
};

export default Quiz;
