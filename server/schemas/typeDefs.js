const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    quizzes: [Quiz]
}

type Quiz {
    _id: ID
    name: String!
    description: String
    quizCreator: String
    questions: [Question]
}

type Question {
    _id: ID
    name: String
    lyric: String!
    choices: [Choice]
    hint: String
}

type Choice {
    name: String
    correctAnswer: Boolean!
}

type Auth {
    token: ID!
    user: User
}

input CreateQuizInput {
    name: String!
    description: String
    quizCreator: String
    questions: [String]
}

input CreateQuestionInput {
    quizId: ID!
    name: String
    lyric: String!
    choices: [CreateChoiceInput]
    hint: String
}

input CreateChoiceInput {
    name: String
    correctAnswer: Boolean!
}

input UpdateQuestionInput {
    id: ID!
    quizId: ID!
    name: String
    lyric: String!
    choices: [CreateChoiceInput]
    hint: String
}

type Query {
    user(username: String!): User
    quizzes: [Quiz]
    quiz(quizId: ID!): Quiz
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuiz(createQuiz: CreateQuizInput!): Quiz
    removeQuiz(quizId: ID!): Quiz
    addQuestion(createQuestion: CreateQuestionInput!): Question
    updateQuestion(updateQuestion: UpdateQuestionInput!): Question
}
`;

module.exports = typeDefs;
