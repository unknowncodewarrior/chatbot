import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// Function to create a business
export const createBusiness = (data) =>
  axios.post(`${BASE_URL}/business`, data);

export const getConversation = (businessId, userId) => {
  return axios.get(`${BASE_URL}/conversation/${userId}/${businessId}`);
};
// Function to update the conversation
export const updateConversation = (
  userId,
  botId,
  question,
  response,
  lastNodeId
) => {
  return axios.post(`${BASE_URL}/conversation`, {
    userId,
    botId,
    question,
    response,
    lastNodeId,
  });
};
export const getUsers = async () => {
  return await axios.get(`${BASE_URL}/users`);
};

export const fetchAllBusinesses = () => {
  return axios.get(`${BASE_URL}/business/all`);
};

export const deleteBusiness = (businessId) => {
  return axios.delete(`${BASE_URL}/business/${businessId}`);
};

export const createBot = (businessId, data) =>
  axios.post(`${BASE_URL}/admin/${businessId}`, data);

export const getBot = async (businessId) => {
  return await axios.get(`${BASE_URL}/admin/${businessId}`);
};

export const getConversationByUserIdAndBotId = (userId, botId) => {
  return axios.get(`${BASE_URL}/conversation/${userId}/${botId}`);
};

export const getBotConfig = (businessId) => {
  return axios.get(`${BASE_URL}/${businessId}`); // Adjust this endpoint according to your API structure
};
