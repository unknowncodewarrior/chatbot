// controllers/businessController.js
const Business = require("../models/Business");

// Create a new business
exports.createBusiness = async (req, res) => {
  const { name, admin_email } = req.body;

  if (!name || !admin_email) {
    return res
      .status(400)
      .json({ error: "Name and admin email are required." });
  }

  try {
    const newBusiness = new Business({ name, admin_email });
    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Business name must be unique." });
    }
    res
      .status(500)
      .json({ error: "Failed to create business", details: error.message });
  }
};

// Get a single business by name
exports.getBusiness = async (req, res) => {
  const { name } = req.query; // Get business name from query parameters

  if (!name) {
    return res.status(400).json({ error: "Business name is required." });
  }

  try {
    const business = await Business.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(business);
  } catch (error) {
    console.error("Error fetching business:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch business", details: error.message });
  }
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch businesses", details: error.message });
  }
};
