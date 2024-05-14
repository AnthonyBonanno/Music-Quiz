
const ChoiceList = ({choices, correctAnswer, increaseScore}) => {
    const handleClick = (selectedChoice) => {
        if (selectedChoice === correctAnswer) {
            <p>Correct Answer!</p>
            increaseScore();
        } else {
            <p>Incorrect Answer.</p>
        }
    };

    return (
        <>
            {choices.map((choice) => (
                <button key={choice._id} onClick={() => handleClick(choice)}>
                    {choice.name}
                </button>
            ))}
        </>
    )
}

export default ChoiceList;