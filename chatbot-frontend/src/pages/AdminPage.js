import React from 'react';
import { useParams } from 'react-router-dom';
import AdminBot from '../components/AdminBot';

const AdminPage = () => {
  const { businessId } = useParams();
  return <AdminBot businessId={businessId} />;
};

export default AdminPage;
