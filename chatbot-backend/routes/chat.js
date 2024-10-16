// chatbot-backend/routes/chat.js

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Route for chatting with the bot
router.post("/", chatController.chatWithBot);

module.exports = router;
