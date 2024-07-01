import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import Axios for making HTTP requests
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode JWT tokens

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS; // Get backend address from environment variable

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { t } = useTranslation(); // Initialize useTranslation hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await window.crypto.subtle.digest("SHA-256", data);
      const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));
      console.log("Base64 hash:", base64Hash);
      console.log(BACKEND_ADDRESS);
      const response = await axios.post(
        `https://www.educaiapis.online/mongo_api/api/auth/login`,
        { identifier, password: base64Hash }
      ); // Make POST request to backend login endpoint
      const { token } = response.data; // Assuming backend sends back a token upon successful login
      console.log("Login response:", response.data);

      // Decoded token brings username, role, iat and exp
      const decodedToken = jwtDecode(token);
      const { username, role, id, exp } = decodedToken;
      // Verify the token and decode it
      setIsSubmitted(true);
      setError("");
      onLogin(token, username, role, id, exp); // Call onLogin function to update authentication state
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username/email or password"); // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3 mb-3">
          <div
            className={`card border-primary ${
              isSubmitted ? "border-success" : ""
            }`}
          >
            <div className="card-header bg-primary text-white">Log In</div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t("utils.login.usernameMail")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("utils.login.enterUsernameMail")}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{t("utils.login.password")}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t("utils.login.enterPassword")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <Button variant="primary" type="submit" className="mt-3">
                  {t("utils.login.login")}
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
