import React from 'react';
import { useParams } from 'react-router-dom';
import BusinessManage from '../components/BussinessManage';

const AdminPage = () => {
  const { businessId } = useParams();

  return <BusinessManage businessId={businessId} isAdmin={true} />;
};

export default AdminPage;
