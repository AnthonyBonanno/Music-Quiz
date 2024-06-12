import { useState, useEffect } from "react";
import ChoiceList from "../components/ChoiceList/ChoiceList";
import QuestionTimer from "../components/QuestionTimer/QuestionTimer";

const Question = ({ question, countWrongAnswer, increaseScore }) => {
  const [revealHint, setRevealHint] = useState(false);

  // Use useEffect to reset the revealHint state when the question changes
  useEffect(() => {
    setRevealHint(false);
  }, [question]);


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
        <h2>♪ {question.lyric} ♪</h2>
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
