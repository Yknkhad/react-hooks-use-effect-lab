import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle countdown timer
  useEffect(() => {
    // If the timer reaches 0, reset and call onAnswered(false)
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset the timer to 10 seconds
      onAnswered(false); // Call onAnswered with false when time is up
      return;
    }

    // Only set the timeout if timeRemaining > 0
    const timerId = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1); // Decrease the time by 1
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]); // Dependencies: timeRemaining and onAnswered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer when an answer is selected
    onAnswered(isCorrect); // Call the parent callback with true/false depending on the answer
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
