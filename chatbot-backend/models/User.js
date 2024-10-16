const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String, // UUID format
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a Business model
    ref: "Business",
    required: true,
  },
  status: {
    type: String,
    enum: ["regular", "premium"],
    default: "regular",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
module.exports = mongoose.model("User", userSchema);
