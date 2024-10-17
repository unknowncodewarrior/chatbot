import React, { useEffect, useState } from "react";
import { toast } from "sonner"; // Importing Toaster and toast from Sonner
import {
  getBot,
  getConversationByUserIdAndBotId,
  updateConversation,
} from "../services/api";

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
    if (!storedUserId) {
      const tmp = +new Date();
      localStorage.setItem("userId", tmp);
      setUserId(tmp);
    } else {
      setUserId(storedUserId);
    }

    // Fetch bot configuration to get botId and lastNodeId
    const fetchBotConfig = async () => {
      try {
        const res = await getBot(businessId);
        // Set botId, lastNodeId, and conversation from the response
        setBotId(res.data.bot_id);
        setLastNodeId(res.data.last_node_id);
        setConversation(res.data.conversation);
      } catch (error) {
        console.error("Error fetching bot configuration:", error);
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "An unknown error occurred";
        toast.error("Error fetching bot configuration: " + errorMessage); // Use Sonner notification
      }
    };

    const fetchExistingConversations = async () => {
      if (storedUserId && botId) {
        try {
          const res = await getConversationByUserIdAndBotId(
            storedUserId,
            botId
          );
          if (res.data) {
            setConversations(res.data.conversation || []);
          }
        } catch (error) {
          console.error("Error fetching existing conversations:", error);
          const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "An unknown error occurred";
          toast.error("Error fetching existing conversations: " + errorMessage); // Use Sonner notification
        }
      }
    };

    if (storedUserId) {
      fetchBotConfig();
    }

    // Fetch existing conversations after bot config is retrieved
    fetchExistingConversations();
  }, [businessId, userId, botId]); // Added userId and botId as dependencies

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return; // Don't send empty messages

    try {
      // Fetch the bot's response based on the user's question
      const botResponse = fetchBotResponse(question);
      const response = botResponse;

      const res = await updateConversation(
        userId,
        botId,
        question,
        response,
        lastNodeId
      );
      // Update the conversation state
      setConversations((prev) => [
        ...prev,
        { question, response: botResponse, timestamp: new Date() }, // Add timestamp here
      ]);
      toast.success(res.data.message); // Use Sonner notification

      // Clear the question input
      setQuestion("");
    } catch (error) {
      console.error("Error saving conversation:", error);
      const errorMessage =
        error.response?.data?.error ||
        "An unknown error occurred while saving the conversation.";
      toast.error("Error saving conversation: " + errorMessage); // Use Sonner notification
    }
  };

  // Fetch the bot's response based on the conversation
  const fetchBotResponse = (userQuestion) => {
    const matchedResponse = conversation.find(
      (node) => node.question.toLowerCase() === userQuestion.toLowerCase()
    );
    return matchedResponse
      ? matchedResponse.response
      : "Sorry, I didn't understand that."; // Default response if no match is found
  };

  // Helper function to format the timestamp
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";
    return seconds < 30 ? "just now" : seconds + " seconds ago";
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow-lg rounded-lg h-[80ch] flex flex-col">
      <h2 className="text-3xl font-semibold mb-5 text-center text-gray-800">
        Chat with the Bot
      </h2>
      <div className="flex-grow overflow-auto p-4 border border-gray-200 rounded-lg bg-gray-50 no-scrollbar">
        <ul className="space-y-2">
          {conversations.map((conv, index) => (
            <li key={index} className="flex flex-col gap-y-3">
              <div className="flex justify-end">
                <div className="max-w-xs p-3 rounded-lg text-white bg-blue-600">
                  <strong>You:</strong>
                  <span className="break-all ml-2">{conv.question}</span>
                  <div className="text-xs text-gray-300">
                    {formatTimeAgo(conv.timestamp)}
                  </div>{" "}
                  {/* Display timestamp */}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-lg text-gray-700 bg-gray-200">
                  <strong>Bot:</strong>
                  <span className="break-all ml-2">{conv.response}</span>
                  <div className="text-xs text-gray-700">
                    {formatTimeAgo(conv.timestamp)}
                  </div>{" "}
                  {/* Display timestamp */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSend} className="mt-4">
        <div className="flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            placeholder="Type your question here..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-500 transition duration-200"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
