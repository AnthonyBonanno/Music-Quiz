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
        image: String
        userId: String!
        questions: [Question]
    }

    type Question {
        _id: ID
        name: String
        image: String
        audio: String!
        choices: [Choice]
        hint: Hint
    }

    type Choice {
        name: String
        correctAnswer: Boolean!
    }

    type Hint {
        name: String
    }

    type Auth {
        token: ID!
        username: User
    }

    input CreateQuizInput {
        name: String!
        description: String
        image: String
        userId: String!
        questions: [String]
    }

    input CreateQuestionInput {
        name: String
        image: String
        audio: String!
        choices: [String]
        hint: String
    }

    type Query {
        user(username: String!): User
        quizzes: [Quiz]
        quiz(quizId: ID!): [Question]
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
