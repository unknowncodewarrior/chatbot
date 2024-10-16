const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bot_name: { type: String, required: true },
  conversation_tree: [
    {
      id: { type: String, required: true }, // Each node must have an ID
      question: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          next: { type: String, default: null }, // Use String to match your ID structure
        },
      ],
    },
  ],
  actions: [
    {
      trigger: { type: String, required: true },
      response: { type: String, required: true },
      effect: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Chatbot", chatbotSchema);
