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
import axios from "axios";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chat_id, setChatId] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission (and reload)
    sendMessage();
  };

  useEffect(() => {
    // Clear chatId when component unmounts
    return () => {
      setChatId(null);
    };
  }, []);

  const sendMessage = async () => {
    // Add the user's message
    const newMessage = { _id: messages.length + 1, message, sender: "user" };
    setMessages([...messages, newMessage]);
    setMessage("");

    try {
      // Send user's message to the backend API
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_LANGCHAIN}/chat`,
        {
          message,
          chat_id,
        }
      );
      const botReply = {
        _id: messages.length + 2,
        message: response.data.reply,
        sender: "bot",
      };

      // Update chat_id if it's not set
      if (!chat_id) {
        setChatId(response.data.chat_id);
      }

      // Simulate a delay for the bot's response (optional)
      setTimeout(() => {
        setMessages([...messages, newMessage, botReply]);
      }, 300);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error here, display error message, etc.
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>ChatBot</Card.Header>
        <Card.Body className="chat-container">
          <div className="message-list-container">
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
          </div>
          <Form className="message-form" onSubmit={handleSubmit}>
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
