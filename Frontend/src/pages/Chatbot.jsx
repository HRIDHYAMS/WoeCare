import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperclip, FaLocationArrow } from "react-icons/fa";
import "./Chatbot.css";



// Firebase imports
import { doc, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../.././Backend/firebase"; // Adjust the import path as needed

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const chatContainerRef = useRef(null);
  const messageCountRef = useRef(0);

  // Load chat history when authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadChatHistory(user.uid);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Append a new message to the UI
  const appendMessage = (sender, message, id = null) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender, message, id },
    ]);
  };

  // Load chat history from Firestore for a given user ID
  const loadChatHistory = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const chatRef = collection(userRef, "chats");
      const q = query(chatRef, orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      const history = [];
      querySnapshot.forEach((docSnap) => {
        history.push(docSnap.data());
      });
      setMessages(history);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  // Send a message: update UI, store in Firestore, and fetch bot response
  const sendMessage = async () => {
    if (!inputText && !selectedFile) return;
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const chatRef = collection(userRef, "chats");

    // Append user's message in UI
    appendMessage("user", inputText || "File Sent");

    // Store user's message in Firestore
    await addDoc(chatRef, {
      sender: "user",
      message: inputText,
      timestamp: new Date(),
    });

    const textToSend = inputText;
    setInputText("");

    // Build form data for backend
    const formData = new FormData();
    formData.append("msg", textToSend);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    // Fetch bot response from backend
    fetchBotResponse(formData, user.uid);
  };

  // Call backend API to get bot response and then store it in Firestore
  const fetchBotResponse = (formData, uid) => {
    fetch("http://localhost:3000/get", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(async (data) => {
        console.log("Received from backend:", data);
        displayBotResponse(data || "");
        const userRef = doc(db, "users", uid);
        const chatRef = collection(userRef, "chats");
        await addDoc(chatRef, {
          sender: "bot",
          message: data,
          timestamp: new Date(),
        });
      })
      .catch((error) => {
        console.error("Error fetching bot response:", error);
        appendMessage("model error", "Failed to fetch a response from the server.");
      })
      .finally(() => setSelectedFile(null));
  };

  // Gradually display bot response without appending undefined
  const displayBotResponse = (data) => {
    const botMessageId = `botMessage-${messageCountRef.current++}`;
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
              {msg.sender === "user" ? "You" : "WoeBot"}
            </div>
            <div className="msg-body">{msg.message}</div>
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
