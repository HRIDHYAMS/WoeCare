import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperclip, FaLocationArrow } from "react-icons/fa";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const chatContainerRef = useRef(null);
  const messageCountRef = useRef(0);

  // Scroll chat to the bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Append a new message to the chat
  const appendMessage = (sender, message, id = null) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender, message, id },
    ]);
  };

  // Send a message to the backend
  const sendMessage = () => {
    if (!inputText && !selectedFile) return;

    // Append user's message
    appendMessage("user", inputText || "File Sent");
    const textToSend = inputText;
    setInputText("");

    // Build form data for the request
    const formData = new FormData();
    formData.append("msg", textToSend);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    fetchBotResponse(formData);
  };

  // Fetch the bot's reply from the backend
  const fetchBotResponse = (formData) => {
    fetch("http://localhost:3000/get", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Received from backend:", data);
        displayBotResponse(data || "");
      })
      .catch((error) => {
        console.error("Error:", error);
        appendMessage("model error", "Failed to fetch a response from the server.");
      })
      .finally(() => setSelectedFile(null));
  };

  // Display the bot's reply gradually without appending "undefined"
  const displayBotResponse = (data) => {
    const botMessageId = `botMessage-${messageCountRef.current++}`;
    // Start with an empty message
    appendMessage("model", "", botMessageId);
    
    let index = 0;
    let currentText = "";
    const interval = setInterval(() => {
      if (index < data.length) {
        currentText += data[index];
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMessageId ? { ...msg, message: currentText } : msg
          )
        );
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  return (
    <div className="chatbot-container">
      <div className="header">
        <img src="https://i.ibb.co/F57MGN0/ai-1.png" alt="Chatbot Logo" />
      </div>
      <div id="chatContainer" className="chat-container" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="msg-header">
              {msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}
            </div>
            <div className="msg-body" id={msg.id}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          type="text"
          value={inputText}
          placeholder="Ask me anything"
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button onClick={() => document.getElementById("fileInput").click()}>
          <FaPaperclip />
        </button>
        <button onClick={sendMessage}>
          <FaLocationArrow />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
