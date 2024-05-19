import { useEffect, useState } from "react";

const Timer = ({ countWrongAnswer }) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        countWrongAnswer();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <>
        <h2>Seconds remaining: {seconds}</h2>
    </>
  )
};

export default Timer;