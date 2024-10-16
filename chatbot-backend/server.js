const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const businessRoutes = require('./routes/business'); // Import the business routes
const adminRoutes = require('./routes/admin'); // Import the admin routes
const conversationRoutes = require('./routes/conversation'); // Import the conversation routes
const chatRoutes = require('./routes/chat'); // Import the chat routes
const userRoutes = require("./routes/userRoutes");

// Connect to the database
connectDB();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Define API routes
app.use('/api/chat', chatRoutes); // Chat-related routes

app.use('/api/business', businessRoutes); // Business-related routes

app.use('/api/admin', adminRoutes); // Admin-related routes

app.use('/api/conversation', conversationRoutes); // Conversation-related routes

app.use("/api", userRoutes);// Use user routes


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

