import React, { useState } from "react";
import { createBusiness } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Importing toast from Sonner

const CreateBusiness = () => {
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createBusiness({ name, admin_email: adminEmail });
      navigate(`/business/${data._id}`); // Access the business ID directly
      
      // Show a success notification
      toast.success("Business created successfully!");
    } catch (error) {
      console.error("Error creating business:", error);

      // Show an error notification
      toast.error("Error creating business. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create a New Business
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="business-name"
              className="block text-sm font-medium text-gray-700"
            >
              Business Name
            </label>
            <input
              id="business-name"
              type="text"
              placeholder="Business Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Business
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;
