const QuizList = ({ quizzes }) => {
    if (!quizzes || quizzes.length === 0) {
        <p>This user has no quizzes!</p>
    }

    return (
        <>
            {quizzes.map((quiz) => (
                <button key={quiz._id}>
                    {quiz.name}
                </button>
            ))}
        </>
    )
}

export default QuizList;