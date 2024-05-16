
const ChoiceList = ({choices, increaseScore, countWrongAnswer}) => {
    const handleClick = (selectedChoice) => {
        console.log(selectedChoice);
        if (selectedChoice.correctAnswer) {
            <p>Correct Answer!</p>
            increaseScore();
        } else {
            <p>Incorrect Answer.</p>
            countWrongAnswer();
        }
    };

    return (
        <>
            {choices.map((choice) => (
                <button key={choice.name} onClick={() => handleClick(choice)}>
                    {choice.name}
                </button>
            ))}
        </>
    )
}

export default ChoiceList;