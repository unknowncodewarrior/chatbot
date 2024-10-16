// chatbot-backend/routes/conversation.js

const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");

// Route for saving a conversation
router.post("/", conversationController.saveConversation);

// Route for fetching a conversation
router.get("/:userId/:botId", conversationController.getConversation);

module.exports = router;
