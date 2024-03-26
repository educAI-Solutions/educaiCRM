// LoginForm.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call onLogin function with username and password
    onLogin({ username, password });
    setIsSubmitted(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <div className={`card border-primary mt-5 ${isSubmitted ? "border-success" : ""}`}>
            <div className="card-header bg-primary text-white">Log In</div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
