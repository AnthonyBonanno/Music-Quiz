import { useState } from "react";
import Question from "./Question";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_QUIZ } from "../utils/queries";
import { Link, useParams } from "react-router-dom";

const Quiz = () => {
  const [phase, setPhase] = useState(0);
  const [questionIndex, setQuestionIndex] = useState();
  const [quizScore, setQuizScore] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  const { quizId } = useParams();

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

  const increaseScore = () => {
    setQuizScore(quizScore + 1);
    handleNext();
  };

  const countWrongAnswer = () => {
    setWrongAnswer(wrongAnswer + 1);
    handleNext();
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
        <>
          <Question
            question={quiz.questions[questionIndex]}
            countWrongAnswer={countWrongAnswer}
            increaseScore={increaseScore}
          />
          <h3>Score: {quizScore}</h3>
        </>
      )}
      {phase == 2 && (
        <>
          <h1>GAME OVER</h1>
          <h3>Score: {quizScore}</h3>
          <h3>Wrong Answers: {wrongAnswer}</h3>
          <Link to="/">Click here to return to the homepage!</Link>
        </>
      )}
    </>
  );
};

export default Quiz;
