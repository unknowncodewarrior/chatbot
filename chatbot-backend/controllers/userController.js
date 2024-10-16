const User = require("../models/User");


const Business = require("../models/Business"); // Import your Business model

exports.createUser = async (req, res) => {

  const { userId, name, businessId: businessName, status } = req.body;

  // Find the business by name to get the actual ObjectId
  const business = await Business.findOne({ name: businessName });

  if (!business) {
    return res.status(400).json({ error: "Business not found." });
  }

  const businessId = business._id; // Get the ObjectId

  // Ensure that userId, name, and businessId are provided
  if (!userId || !name || !businessId) {
    return res
      .status(400)
      .json({ error: "userId, name, and businessId are required." });
  }

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ user_id: userId });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    // Create a new User instance
    const newUser = new User({
      user_id: userId,
      name,
      business_id: businessId, // Use the actual ObjectId here
      status: status || "regular",
    });

    // Save the new user to the database
    await newUser.save();

    // Send the response in the desired format
    res.status(201).json({
      _id: newUser._id, // ObjectId from MongoDB
      name: newUser.name,
      business_id: newUser.business_id, // This is still an ObjectId
      status: newUser.status,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
};

// Fetch all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("business_id"); // Populate business details if necessary
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};
