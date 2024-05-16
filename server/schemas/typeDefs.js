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
        userId: String!
        questions: [Question]
    }

    type Question {
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
        userId: String!
        questions: [String]
    }

    input CreateQuestionInput {
        name: String
        lyric: String!
        choices: [String]
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
        addQuestion(createQuestion: CreateQuestionInput!): Question
    }
`;

module.exports = typeDefs;
