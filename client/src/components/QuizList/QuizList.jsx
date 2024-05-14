
const QuizList = (quizzes, handleStart) => {
    return (
        <>
            {quizzes.map((quiz) => (
                <button key={quiz._id} onClick={handleStart}>
                    {quiz.name}
                </button>
            ))}
        </>
    )
}

export default QuizList;