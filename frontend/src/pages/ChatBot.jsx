import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  InputGroup,
  FormControl,
  ListGroup,
  Card,
  Container,
  Alert,
} from "react-bootstrap";
import "../chatbot.css"; // Import your CSS file
import smoothscroll from "smoothscroll-polyfill";

const ChatBot = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    { _id: 1, message: "Hello, how can I help you?", sender: "bot" },
  ]);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      smoothscroll.polyfill();
      messageListRef.current.scroll({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const presetBotResponses = [
    "I'm still learning, but I can try my best!",
    "That's an interesting question. Let me think...",
    "I'm here to assist you in any way I can.",
    "Feel free to ask me anything you'd like to know.",
  ];

  const sendMessage = async () => {
    // Add the user's message
    const newMessage = { _id: messages.length + 1, message, sender: "user" };
    setMessages([...messages, newMessage]);
    setMessage("");

    // Get a random preset response from the array
    const randomIndex = Math.floor(Math.random() * presetBotResponses.length);
    const botReply = {
      _id: messages.length + 2,
      message: presetBotResponses[randomIndex],
      sender: "bot",
    };

    // Simulate a delay for the bot's response (optional)
    setTimeout(() => {
      setMessages([...messages, newMessage, botReply]);
    }, 500);
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>ChatBot</Card.Header>
        <Card.Body className="chat-container">
          <ListGroup className="message-list" ref={messageListRef}>
            {messages.map((msg) => (
              <Alert
                key={msg._id}
                variant={msg.sender === "bot" ? "success" : "primary"} // Use Bootstrap variants for colors
                className={`message ${
                  msg.sender === "bot" ? "text-start" : "text-end"
                }`}
              >
                {msg.message}
              </Alert>
            ))}
          </ListGroup>

          <Form className="message-form">
            <InputGroup>
              <FormControl
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="primary" onClick={sendMessage}>
                Send
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChatBot;
