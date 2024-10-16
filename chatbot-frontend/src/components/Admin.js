import React, { useState, useEffect } from "react";
import { saveBotConfig, getBotConfig } from "../utils/api";
import axios from "axios";

const Admin = ({ businessName }) => {
  const [conversationTree, setConversationTree] = useState([]);
  const [actions, setActions] = useState([]);
  const [botName, setBotName] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", next: "" }]);

  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const config = await getBotConfig(businessName);
        setConversationTree(config.conversation_tree || []);
        setActions(config.actions || []);
        setBotName(config.bot_name || "");
      } catch (error) {
        console.error("Error fetching bot configuration:", error);
      }
    };
    fetchBotConfig();
  }, [businessName]);

  const handleAddOption = () => {
    setOptions([...options, { text: "", next: "" }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddNode = () => {
    if (question && options.length > 0) {
      setConversationTree([...conversationTree, { question, options }]);
      setQuestion("");
      setOptions([{ text: "", next: "" }]);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const getBusinessIdByName = async (businessName) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/business?name=${businessName}`
      );
      return response.data._id;
    } catch (error) {
      console.error("Error fetching business ID:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!conversationTree.length || !botName) {
      alert("Please complete all fields before saving.");
      return;
    }

    try {
      const businessId = await getBusinessIdByName(businessName);
      await saveBotConfig(businessId, conversationTree, botName);
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Error saving configuration. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Admin Panel for {businessName}
      </h2>

      <input
        type="text"
        placeholder="Bot Name"
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        className="block w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h3 className="font-semibold mb-2">Options (with next node ID)</h3>

        {options.map((option, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              placeholder="Option text"
              value={option.text}
              onChange={(e) =>
                handleOptionChange(index, "text", e.target.value)
              }
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Next node ID"
              value={option.next}
              onChange={(e) =>
                handleOptionChange(index, "next", e.target.value)
              }
              className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          onClick={handleAddOption}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600"
        >
          Add Option
        </button>
      </div>

      <div className="flex justify-between gap-4 mb-6">
        <button
          onClick={handleAddNode}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Add Node
        </button>
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save Configuration
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Conversation Tree</h3>
      <div className="bg-gray-100 p-4 rounded-lg text-sm max-h-64 overflow-y-auto">
        <pre>{JSON.stringify(conversationTree, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Admin;
