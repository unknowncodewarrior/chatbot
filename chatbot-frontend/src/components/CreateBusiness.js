import React, { useState } from 'react';
import { createBusiness } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateBusiness = () => {
  const [name, setName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createBusiness({ name, admin_email: adminEmail });
    navigate(`/admin/${data.business._id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Business Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
      <button type="submit">Create Business</button>
    </form>
  );
};

export default CreateBusiness;
