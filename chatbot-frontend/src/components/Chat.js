// chatbot-frontend/src/components/Chat.js

import React, { useState, useEffect } from "react";
import { chatWithBot, getBotConfig, saveConversation } from "../utils/api"; // Added saveConversation

const Chat = ({ businessId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    if (!localUserId) {
      const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    } else {
      setUserId(localUserId);
    }

    const loadPreviousMessages = async () => {
      try {
        const previousMessages = await getBotConfig(businessId);
        setMessages(previousMessages.conversation || []);
        setConversationId(previousMessages._id);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    if (businessId) {
      loadPreviousMessages();
    }
  }, [businessId]);

  const handleSend = async (msg) => {
    if (!msg) return;

    const newMessage = { sender: "You", text: msg };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    try {
      const response = await chatWithBot(msg, businessId, userId, conversationId);
      const botResponse = { sender: "Bot", text: response.response };

      // Save the conversation
      await saveConversation({
        userId,
        botId: businessId, // Assuming businessId is the botId
        question: msg,
        response: response.response,
        lastNodeId: conversationId, // Assuming the last node ID is needed
      });

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error during chat:", error);
      const errorMessage = { sender: "Bot", text: "Sorry, there was an error. Please try again." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Chat with {businessId}</h2>
      <div className="messages-container mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${msg.sender === "You" ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-left"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSend(message)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
