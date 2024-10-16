import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBot from '../components/Chatbot';

const ChatPage = () => {
  const { businessId } = useParams();
  return <ChatBot businessId={businessId} />;
};

export default ChatPage;
