import Form from "react-bootstrap/Form";

export default function CreateQuiz() {
  return (
    <Form>
      <Form.Group>
        <Form.Control size="lg" type="text" placeholder="Quiz Title" />
        <Form.Control type="text" placeholder="Question Text (not required)" />
      </Form.Group>

      <Form.Group>
      <Form.Label>Upload an mp3 file</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </Form>
  );
}
