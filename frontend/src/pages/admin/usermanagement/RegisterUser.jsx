import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setSuccessMessage("");
    setError("");
  }, [email, username, password, role]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await window.crypto.subtle.digest("SHA-256", data);
      const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));

      // Send as headers the jwt token as auth header
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:5050/api/auth/register", // Make POST request to backend register endpoint
        { email, username, password: base64Hash, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Registration response:", response.data);
      setError("");
      setSuccessMessage(`User ${username} registered successfully.`);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again."); // Handle registration error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3 mb-3">
          <div
            className={`card border-primary ${
              successMessage ? "border-success" : ""
            }${error ? "border-danger" : ""}`}
          >
            <div className="card-body">
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicUsername" className="mb-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicRole" className="mb-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
