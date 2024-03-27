import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import Axios for making HTTP requests

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5050/api/auth/login",
        { username, password }
      ); // Make POST request to backend login endpoint
      const { token, role } = response.data; // Assuming backend sends back a token upon successful login
      setIsSubmitted(true);
      setError("");
      onLogin(token, username, role); // Call onLogin function to update authentication state
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password"); // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <div
            className={`card border-primary mt-5 ${
              isSubmitted ? "border-success" : ""
            }`}
          >
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

                {error && <p className="text-danger">{error}</p>}

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
