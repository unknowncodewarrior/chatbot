import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE_URL",BASE_URL)
// Function to create a business
export const createBusiness = (data) =>
  axios.post(`${BASE_URL}/business`, data);

// Function to fetch a conversation
export const getConversation = (businessId, userId) => {
  return axios.get(`/api/conversation/${userId}/${businessId}`);
};
// Function to update the conversation
export const updateConversation = (
  userId,
  botId,
  question,
  response,
  lastNodeId
) =>
  axios.post(`${BASE_URL}/conversation`, {
    userId,
    botId,
    question,
    response,
    lastNodeId,
  });

export const getUsers = async () => {
  return await axios.get(`${BASE_URL}/users`); // Adjust the endpoint if needed
};
