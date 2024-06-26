import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_QUIZ = gql`
  mutation addQuiz($createQuiz: CreateQuizInput!) {
    addQuiz(createQuiz: $createQuiz) {
      _id
      name
      description
      quizCreator
    }
  }
`;

export const REMOVE_QUIZ = gql`
  mutation removeQuiz($quizId: ID!) {
    removeQuiz(quizId: $quizId) {
      _id
      name
      description
      quizCreator
      questions {
        _id
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

export const ADD_QUESTION = gql`
  mutation addQuestion($createQuestion: CreateQuestionInput!) {
    addQuestion(createQuestion: $createQuestion) {
      _id
      name
      lyric
      choices {
        name
        correctAnswer
      }
      hint
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($updateQuestion: UpdateQuestionInput!) {
    updateQuestion(updateQuestion: $updateQuestion) {
      _id
      name
      lyric
      choices {
        name
        correctAnswer
      }
      hint
    }
  }
`;
