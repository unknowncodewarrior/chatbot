import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const saveBotConfig = async (
  businessId,
  conversationTree,
  botName,
  actions
) => {
  try {
    const response = await axios.post(`${API_URL}/admin/${businessId}`, {
      conversationTree,
      botName,
      actions,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error saving bot configuration:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getBotConfig = async (businessId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/${businessId}`); // Ensure businessId is correct
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching bot configuration:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error to be caught in the calling function
  }
};

export const saveConversation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/conversation`, data);
    return response.data; // Returns the saved conversation
  } catch (error) {
    console.error("Error saving conversation:", error);
    throw error; // Re-throw error for further handling
  }
};

export const getConversation = async (userId, botId) => {
  try {
    const response = await axios.get(
      `${API_URL}/conversation/${userId}/${botId}`
    );
    return response.data; // Returns the fetched conversation
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error; // Re-throw error for further handling
  }
};

export const chatWithBot = async (
  message,
  businessId,
  userId,
  conversationId
) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message,
      businessId,
      userId,
      conversationId,
    });
    return response.data; // Assumes response has a field `response` with bot's reply
  } catch (error) {
    console.error("Error chatting with bot:", error);
    throw error;
  }
};
