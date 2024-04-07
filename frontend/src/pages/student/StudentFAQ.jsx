import React from "react";
import { Form, InputGroup } from "react-bootstrap";

function StudentFAQ() {
  return (
    <div>
      <h2>Chat with AI </h2>
      <Form>
        <InputGroup>
          <Form.Control
            as="textarea"
            placeholder="Type your question here..."
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default StudentFAQ;
