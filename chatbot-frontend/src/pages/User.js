// chatbot-frontend/src/pages/User.js

import React from 'react';
import { useParams } from 'react-router-dom';
import CreateUser from '../components/CreateUser';

const UserPage = () => {
  const { businessName } = useParams(); // Change to businessName
  return <CreateUser businessName={businessName} />; // Pass businessName to CreateUser
};

export default UserPage;
