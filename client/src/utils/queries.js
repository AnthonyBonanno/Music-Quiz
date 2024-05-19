import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      quizzes {
        _id
        name
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
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
      quizCreator
    }
  }
`;

export const QUERY_SINGLE_QUIZ = gql`
  query getSingleQuiz($quizId: ID!) {
    quiz(quizId: $quizId) {
      _id
      name
      description
      questions {
        name
        lyric
        choices {
          name
          correctAnswer
        }
        hint
      }
    }
  }
`;

