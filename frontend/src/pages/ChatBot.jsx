import React, { useState, useEffect, useRef, useContext } from "react";
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
import { UserContext } from "../App";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa"; // For send button icon

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chat_id, setChatId] = useState(null);
  const { id, programId } = useContext(UserContext);
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
    return () => {
      setChatId(null);
    };
  }, [id, programId]);

  const sendMessage = async () => {
    const newMessage = { _id: messages.length + 1, message, sender: "user" };
    setMessages([...messages, newMessage]);
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_LANGCHAIN}/chat`,
        {
          message,
          chat_id,
          programId,
        }
      );
      const botReply = {
        _id: messages.length + 2,
        message: response.data.reply,
        sender: "bot",
      };

      if (!chat_id) {
        setChatId(response.data.chat_id);
      }

      setTimeout(() => {
        setMessages([...messages, newMessage, botReply]);
      }, 300);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg rounded">
        <Card.Header className="bg-primary text-white">ChatBot</Card.Header>
        <Card.Body className="chat-container" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <div className="message-list-container">
            <ListGroup className="message-list" ref={messageListRef}>
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert
                    variant={msg.sender === "bot" ? "success" : "primary"}
                    className={`message rounded-pill shadow-sm ${
                      msg.sender === "bot" ? "text-start" : "text-end"
                    }`}
                  >
                    {msg.message}
                  </Alert>
                </motion.div>
              ))}
            </ListGroup>
          </div>
          <Form className="message-form mt-3" onSubmit={handleSubmit}>
            <InputGroup className="shadow-sm rounded-pill">
              <FormControl
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-0"
                style={{ borderRadius: "30px 0 0 30px" }}
              />
              <Button
                variant="primary"
                onClick={sendMessage}
                className="border-0"
                style={{ borderRadius: "0 30px 30px 0" }}
              >
                <FaPaperPlane />
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChatBot;
