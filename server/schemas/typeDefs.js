const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    quizzes: [Quiz]
    }

    type Quiz {
        _id: ID
        name: String
        description: String
        image: String
        questions: [Question]
    }

    type Question {
        _id: ID
        name: String
        image: String
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
        user()
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
