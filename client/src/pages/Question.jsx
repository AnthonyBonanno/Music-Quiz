import { useState } from "react";
import ChoiceList from "../components/ChoiceList/ChoiceList";
import QuestionTimer from "../components/QuestionTimer/QuestionTimer";

const Question = ({ handleNext, question }) => {
  const [quizScore, setQuizScore] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [revealHint, setRevealHint] = useState(false);

  const increaseScore = () => {
    setQuizScore(quizScore + 1);
    handleNext();
  };

  const countWrongAnswer = () => {
    setWrongAnswer(wrongAnswer + 1);
    handleNext();
  };

  const hintButton = () => {
    setRevealHint(!revealHint);
  };

  return (
    <>
      <h1>{question.name}</h1>

      <section>
        <QuestionTimer
          key={question.lyric}
          countWrongAnswer={countWrongAnswer}
        />
        <h2>{question.lyric}</h2>
        <h4>Choose an answer!</h4>
        <ChoiceList
          choices={question.choices}
          increaseScore={increaseScore}
          countWrongAnswer={countWrongAnswer}
        />
      </section>

      <button onClick={hintButton}>Stuck? Click here for a hint!</button>
      {revealHint && <p>{question.hint}</p>}
    </>
  );
};

export default Question;
