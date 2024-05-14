import { useState } from "react";
import ChoiceList from "../components/ChoiceList/ChoiceList";

const Question = ({ handleNext, question }) => {

  const [quizScore, setQuizScore] = useState(0);

  const increaseScore = (index) => {
    if (question.choices[index].correctAnswer) {
      setQuizScore(quizScore+1)
    }
    handleNext();
  }


  return (
    <>
      <h1>{question.name}</h1>

      <section>
        <h1>Choose an answer!</h1>
        <ChoiceList choices={question.choices} increaseScore={increaseScore} />
      </section>
      
    </>
  )
  
}

export default Question;