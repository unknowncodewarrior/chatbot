import React from 'react';
import { useParams } from 'react-router-dom';
import BusinessBot from '../components/BusinessBot';

const BusinessBotPage = () => {
  const { businessId } = useParams();

  return <BusinessBot businessId={businessId} isAdmin={true} />;
};

export default BusinessBotPage;
