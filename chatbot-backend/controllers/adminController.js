const mongoose = require('mongoose');
const Chatbot = require("../models/Bot");

exports.saveBotConfig = async (req, res) => {
  try {
    const { businessId } = req.params; 

    // Validate required fields
    const { conversationTree, botName } = req.body; 
    if (!conversationTree || !botName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate businessId
    if (!mongoose.isValidObjectId(businessId)) {
      console.error("Invalid businessId format:", businessId);
      return res.status(400).json({ error: "Invalid businessId format" });
    }

    // Create or update the chatbot
    const botConfig = await Chatbot.findOneAndUpdate(
      { business_id: businessId },
      { bot_name: botName, conversation_tree: conversationTree },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ message: "Bot configuration saved successfully", bot: botConfig });
  } catch (error) {
    console.error("Error saving bot configuration:", error);
    res.status(500).json({ error: "Failed to save configuration", details: error.message });
  }
};


exports.getBotConfig = async (req, res) => {
  try {
    const { businessId } = req.params; // Ensure you're getting the businessId

    // Validate businessId
    if (!mongoose.isValidObjectId(businessId)) {
      return res.status(400).json({ error: "Invalid businessId format" });
    }

    // Fetch the bot configuration based on the businessId
    const bot = await Chatbot.findOne({ business_id: businessId });
    if (!bot) return res.status(404).json({ error: "Bot not found" });

    // Prepare the conversation data
    const conversation = bot.conversation_tree.map(node => ({
      question: node.question,
      response: node.options.map(option => option.text).join(", "), // Join option texts or adjust based on your needs
    }));

    // Build the response object
    const botConfig = {
      _id: bot._id, // Use the ObjectId of the bot
      user_id: "uuid-12345", // You can change this to dynamically fetch or assign a user ID
      bot_id: bot._id, // Assuming the bot ID is the same as its _id
      conversation,
      last_node_id: bot.conversation_tree.length > 0 ? bot.conversation_tree[bot.conversation_tree.length - 1].id : null, // Get last node ID
      created_at: new Date().toISOString(), // Current date and time in ISO format
    };

    res.status(200).json(botConfig);
  } catch (error) {
    console.error("Error fetching bot configuration:", error);
    res.status(500).json({ error: "Failed to fetch bot", details: error.message });
  }
};



