
const QuizList = (quizzes, handleStart) => {
    if (!quizzes) {
        <p>This user has no quizzes!</p>
    }

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