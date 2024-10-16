import React from 'react';
import { useParams } from 'react-router-dom';
import BusinessManage from '../components/BussinessManage';

const IndexPage = () => {
  const { businessId } = useParams();

  return <BusinessManage businessId={businessId} isAdmin={false} />;
};

export default IndexPage;
