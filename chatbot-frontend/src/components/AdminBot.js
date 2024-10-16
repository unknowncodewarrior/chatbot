import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // Importing toast from Sonner

const AdminBot = ({ businessId }) => {
  const [botName, setBotName] = useState('');
  const [conversationTree, setConversationTree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [nextId, setNextId] = useState(1); // To generate unique IDs for conversation nodes

  // Function to add a new conversation node
  const handleAddNode = () => {
    const newNode = {
      id: nextId.toString(),
      question: '',
      options: [{ text: '', next: null }], // Start with one option
    };
    setConversationTree([...conversationTree, newNode]);
    setNextId(nextId + 1); // Increment ID for the next node
  };

  // Function to handle input changes for questions and options
  const handleInputChange = (nodeIndex, field, value, optionIndex) => {
    const newTree = [...conversationTree];
    if (field === 'question') {
      newTree[nodeIndex].question = value;
    } else if (field === 'optionText') {
      newTree[nodeIndex].options[optionIndex].text = value;
    } else if (field === 'next') {
      newTree[nodeIndex].options[optionIndex].next = value;
    }
    setConversationTree(newTree);
  };

  // Function to add an option to a node
  const handleAddOption = (nodeIndex) => {
    const newOption = { text: '', next: null };
    const newTree = [...conversationTree];
    newTree[nodeIndex].options.push(newOption);
    setConversationTree(newTree);
  };

  // Save bot configuration
  const handleSaveBot = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`http://localhost:3001/api/admin/${businessId}`, {
        botName,
        conversationTree,
      });
      setSuccess(true);

      // Show a success notification
      toast.success("Bot saved successfully!");
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while saving the bot.');
      console.error('Error saving bot configuration:', err);

      // Show an error notification
      toast.error(err.response?.data?.error || 'An error occurred while saving the bot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Admin Bot Setup</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="bot-name">
          Bot Name
        </label>
        <input
          id="bot-name"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          placeholder="Enter bot name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Conversation Tree</h2>
        {conversationTree.map((node, nodeIndex) => (
          <div key={node.id} className="mb-4">
            <input
              value={node.question}
              onChange={(e) => handleInputChange(nodeIndex, 'question', e.target.value)}
              placeholder="Enter question"
              className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
            {node.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex mb-2">
                <input
                  value={option.text}
                  onChange={(e) => handleInputChange(nodeIndex, 'optionText', e.target.value, optionIndex)}
                  placeholder="Enter option text"
                  className="w-1/2 mr-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
                <input
                  value={option.next || ''}
                  onChange={(e) => handleInputChange(nodeIndex, 'next', e.target.value, optionIndex)}
                  placeholder="Next node ID"
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddOption(nodeIndex)}
              className="mt-2 bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
            >
              Add Option
            </button>
          </div>
        ))}
        <button
          onClick={handleAddNode}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out mb-4"
        >
          Add Node
        </button>
      </div>

      <button
        onClick={handleSaveBot}
        disabled={loading}
        className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out`}
      >
        {loading ? 'Saving...' : 'Save Bot'}
      </button>

    </div>
  );
};

export default AdminBot;
