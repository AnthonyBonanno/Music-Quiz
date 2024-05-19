import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_QUESTION } from "../utils/mutations";
import QuizCreated from "../components/QuizCreated/QuizCreated";

import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CreateQuestionForm = ({ quizId }) => {
  const [name, setName] = useState('');
  const [lyric, setLyric] = useState('');
  const [choices, setChoices] = useState([{ name: '', correctAnswer: false }]);
  const [hint, setHint] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [addQuestion] = useMutation(ADD_QUESTION);

  const handleChoiceChange = (index, field, value) => {
    const newChoices = choices.slice();
    newChoices[index][field] = value;

    // Ensure only one correct answer
    if (field === 'correctAnswer' && value) {
      newChoices.forEach((choice, idx) => {
        if (idx !== index) {
          choice.correctAnswer = false;
        }
      });
    }

    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, { name: '', correctAnswer: false }]);
  };

  const handleRemoveChoice = (index) => {
    const newChoices = choices.slice();
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addQuestion({
        variables: {
          createQuestion: {
            quizId,
            name,
            lyric,
            choices,
            hint,
          },
        },
      });
      setQuestionCount(questionCount + 1);
      // Optionally reset form or provide user feedback
      setName('');
      setLyric('');
      setChoices([{ name: '', correctAnswer: false }]);
      setHint('');
      // Check if the question count reaches the limit
      if (questionCount + 1 >= 20) {
        setQuizCompleted(true);
      }
    } catch (err) {
      console.error("Error creating question:", err);
      setErrorMessage("Error creating question. Please try again.");
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  if (quizCompleted) {
    return <QuizCreated />;
  }

  return (
    <Container>
      <h2 className="my-4">Create a New Question</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="questionName">
          <Form.Label>Question Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter question name"
          />
        </Form.Group>
        <Form.Group controlId="questionLyric">
          <Form.Label>Lyric</Form.Label>
          <Form.Control
            type="text"
            value={lyric}
            onChange={(e) => setLyric(e.target.value)}
            placeholder="Enter lyric"
            required
          />
        </Form.Group>
        <Form.Label>Choices</Form.Label>
        {choices.map((choice, index) => (
          <Row key={index} className="align-items-center mb-2">
            <Col>
              <Form.Control
                type="text"
                value={choice.name}
                onChange={(e) => handleChoiceChange(index, 'name', e.target.value)}
                placeholder={`Choice ${index + 1}`}
                required
              />
            </Col>
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                label="Correct"
                checked={choice.correctAnswer}
                onChange={(e) => handleChoiceChange(index, 'correctAnswer', e.target.checked)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="danger" onClick={() => handleRemoveChoice(index)}>Remove</Button>
            </Col>
          </Row>
        ))}
        <Button variant="secondary" onClick={handleAddChoice}>Add Choice</Button>
        <Form.Group controlId="questionHint" className="mt-3">
          <Form.Label>Hint</Form.Label>
          <Form.Control
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="Enter hint"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Add Question</Button>
      </Form>
      <Button variant="success" onClick={handleFinishQuiz} className="mt-3">Finish Creating Quiz</Button>
      {questionCount >= 20 && <Alert variant="warning" className="mt-3">You have reached the limit of 20 questions.</Alert>}
    </Container>
  );
};

export default CreateQuestionForm;