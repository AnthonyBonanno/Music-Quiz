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

export const QUERY_QUIZZES = gql`
  query getQuizzes {
    quizzes {
      _id
      name
      description
      image
    }
  }
`;

export const QUERY_SINGLE_QUIZ = gql`
  query getSingleQuiz($quizId: ID!) {
    quiz(thoughtId: $thoughtId) {
      _id
      name
      description
      image
      questions {
        _id
        name
        image
        choices
        hint
      }
    }
  }
`;
