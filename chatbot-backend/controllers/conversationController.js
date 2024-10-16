// chatbot-backend/controllers/conversationController.js

const Conversation = require("../models/Conversation");

// Save or update a conversation
// Save or update a conversation
exports.saveConversation = async (req, res) => {
  const { userId, botId, question, response, lastNodeId } = req.body;
  // Validate required fields
  if (!userId || !botId || !question || !response || !lastNodeId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if conversation already exists
    let conversation = await Conversation.findOne({ user_id: userId, bot_id: botId });

    const newMessage = { question, response, timestamp: new Date() }; // Add timestamp here

    if (conversation) {
      // If conversation exists, update it
      conversation.conversation.push(newMessage);
      conversation.last_node_id = lastNodeId; // Update the last node ID
      await conversation.save(); // Save the updated conversation
    } else {
      // If it doesn't exist, create a new one
      conversation = new Conversation({
        user_id: userId,
        bot_id: botId,
        conversation: [newMessage], // Add the first message
        last_node_id: lastNodeId,
      });
      await conversation.save();
    }

    res.status(200).json({
      message: "Conversation saved successfully",
      conversation: {
        _id: conversation._id,
        user_id: conversation.user_id,
        bot_id: conversation.bot_id,
        conversation: conversation.conversation,
        last_node_id: conversation.last_node_id,
        created_at: conversation.created_at,
      },
    });
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).json({ error: "Failed to save conversation", details: error.message });
  }
};


// Fetch a conversation
exports.getConversation = async (req, res) => {
  const { userId, botId } = req.params; // Ensure botId is passed correctly

  try {
    if (!botId || !botId) {
      return res.status(400).json({ error: "userId and botId are required." });
    }

    const conversation = await Conversation.findOne({ user_id: userId, bot_id: botId });
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });

    res.status(200).json({
      _id: conversation._id,
      user_id: conversation.user_id,
      bot_id: conversation.bot_id,
      conversation: conversation.conversation,
      last_node_id: conversation.last_node_id,
      created_at: conversation.created_at,
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to fetch conversation", details: error.message });
  }
};

