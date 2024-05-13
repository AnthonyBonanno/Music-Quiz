const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    quizzes: [Quiz]
    }

    type Quiz {
        _id: ID
        name: String!
        description: String
        image: String
        createdBy: User
        questions: [Question]
    }

    type Question {
        _id: ID
        name: String
        image: String
        audio: String!
        correctAnswer: Boolean!
        choices: [Choice]
        hint: Hint
    }

    type Choice {
        name: String
    }

    type Hint {
        name: String
    }

    type Query {
        user(username: String!): User
        quizzes: [Quiz]
        quiz(quizId: ID!): [Question]
    }

    type Auth {
        token: ID!
        user: User
    }

    input CreateQuizInput {
        name: String!
        description: String
        image: String
        createdBy: User
        questions: [Question]
    }

    input CreateQuestionInput {
        name: String
        image: String
        audio: String!
        correctAnswer: Boolean!
        choices: [Choice]
        hint: Hint
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addQuiz(createQuiz: CreateQuizInput!): Quiz
        addQuestion(createQuestion: CreateQuestionInput!): Question
    }
`;

module.exports = typeDefs;
