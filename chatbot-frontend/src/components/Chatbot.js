// src/ChatBot.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatBot = ({ businessId }) => {
  const [userId, setUserId] = useState(""); // Stores the userId from localStorage
  const [botId, setBotId] = useState(""); // Stores the botId from backend
  const [lastNodeId, setLastNodeId] = useState(""); // Stores the lastNodeId from bot config
  const [question, setQuestion] = useState(""); // Stores user question
  const [conversations, setConversations] = useState([]); // Stores conversation history
  const [conversation, setConversation] = useState([]); // Store the conversation array

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("User ID not found in localStorage!");
    }

    // Fetch bot configuration to get botId and lastNodeId
    const fetchBotConfig = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/admin/${businessId}`);

        // Set botId, lastNodeId, and conversation from the response
        setBotId(res.data.bot_id); // Set the bot ID from the response
        setLastNodeId(res.data.last_node_id); // Set the last node ID from the response
        setConversation(res.data.conversation); // Store the conversation array
      } catch (error) {
        console.error("Error fetching bot configuration:", error);
        const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
        alert("Error fetching bot configuration: " + errorMessage);
      }
    };

    if (storedUserId) {
      fetchBotConfig();
    }
  }, [businessId]); // Added businessId as a dependency

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return; // Don't send empty messages

    try {
      // Fetch the bot's response based on the user's question
      const botResponse = fetchBotResponse(question); // Ensure this returns a valid response

      // Save the conversation with the response from the bot
      const res = await axios.post("http://localhost:3001/api/conversation", {
        userId,
        botId,
        question,
        response: botResponse, // Use the bot's response here
        lastNodeId,
      });

      // Update the conversation state
      setConversations((prev) => [...prev, { question, response: botResponse }]);
      alert(res.data.message); // Show success message

      // Clear the question input
      setQuestion("");
    } catch (error) {
      console.error("Error saving conversation:", error);
      const errorMessage = error.response?.data?.error || "An unknown error occurred while saving the conversation.";
      alert("Error saving conversation: " + errorMessage);
    }
  };

  // Fetch the bot's response based on the conversation
  const fetchBotResponse = (userQuestion) => {
    // Find the corresponding response in the conversation array
    const matchedResponse = conversation.find(node => node.question.toLowerCase() === userQuestion.toLowerCase());
    return matchedResponse ? matchedResponse.response : "Sorry, I didn't understand that."; // Default response if no match is found
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-5 text-center">Chat with the Bot</h2>
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder="Type your question here..."
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-200"
        >
          Send
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-6">Conversations:</h3>
      <ul className="mt-3 space-y-2">
        {conversations.map((conv, index) => (
          <li key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <strong>You:</strong> {conv.question} <br />
            <strong>Bot:</strong> {conv.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatBot;
