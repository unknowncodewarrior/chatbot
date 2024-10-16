const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");
const router = express.Router();

router.post("/users", createUser); // POST request to create user
router.get("/users", getUsers); // GET request to fetch users

module.exports = router;
