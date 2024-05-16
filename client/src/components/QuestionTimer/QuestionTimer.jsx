import { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <>
        <h2>Time remaining: {seconds}</h2>
    </>
  )
};

export default Timer;