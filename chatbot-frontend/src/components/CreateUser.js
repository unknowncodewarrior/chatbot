// chatbot-frontend/src/components/CreateUser.js

import React, { useState } from "react";
import axios from "axios";

const CreateUser = ({ businessName }) => { // Accept businessName prop
  const [name, setName] = useState("");
  const [status, setStatus] = useState("regular");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = `user-${Math.random().toString(36).substr(2, 9)}`; // Create a unique user ID

    try {
      // Assuming businessId is stored based on businessName, you can retrieve it from your API
      // For now, just pass businessName as businessId for demonstration
      const response = await axios.post("http://localhost:3001/api/users", {
        userId,
        name,
        businessId: businessName, // Use businessName as businessId
        status,
      });


      // Reset form
      setName("");
      setStatus("regular");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create User
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="regular">Regular</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
