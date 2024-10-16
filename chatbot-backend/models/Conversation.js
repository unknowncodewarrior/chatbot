const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // UUID format
  bot_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bot", required: true },
  conversation: [
    {
      question: { type: String, required: true },
      response: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }, // Add timestamp for each message
    },
  ],
  last_node_id: { type: String, required: true }, // Assuming it’s a string
  created_at: { type: Date, default: Date.now },
});

// Create and export the model
module.exports = mongoose.model("Conversation", conversationSchema);
