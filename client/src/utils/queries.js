import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      quizzes {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      quizzes {
        _id
      }
    }
  }
`;

export const QUERY_QUIZZES = gql`
  query getQuizzes {
    quizzes {
      _id
      name
      description
      image
      userId
    }
  }
`;

export const QUERY_SINGLE_QUIZ = gql`
  query getSingleQuiz($quizId: ID!) {
    quiz(quizId: $quizId) {
      _id
      name
      description
      image
      questions {
        _id
        name
        image
        audio
        choices {
          name
          correctAnswer
        }
        hint {
          name
        }
      }
    }
  }
`;

export const QUERY_SINGLE_QUESTION = gql`
  query getSingleQuestion($questionId: ID!) {
    question(questionId: $questionId) {
      _id
      name
      image
      audio
      choices {
        name
        correctAnswer
      }
      hint {
        name
      }
    }
  }
`
