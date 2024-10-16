import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { deleteBusiness, fetchAllBusinesses } from '../services/api';

const BusinessManage = ({ isAdmin }) => {
  const [businesses, setBusinesses] = useState([]);

  // Fetch all businesses using the API service
  const getBusinesses = async () => {
    try {
      const { data } = await fetchAllBusinesses();
      setBusinesses(data);
    } catch (error) {
      toast.error('Error fetching businesses');
    }
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  const handleDeleteBusiness = async (businessId) => {
    try {
      await deleteBusiness(businessId);
      toast.success('Business deleted successfully');
      setBusinesses(businesses.filter((business) => business._id !== businessId));
    } catch (error) {
      toast.error('Error deleting business');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow-lg rounded-lg h-[80ch] flex flex-col">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold mb-3">Business List</h2>
        <div className="flex flex-col space-y-4">
          {businesses.map((business) => (
            <div
              key={business._id}
              className="border border-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center mb-4"
            >
              <div>
                <Link
                  to={`/chat/${business._id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {business.name}
                </Link>
                <p className="text-gray-600">Admin Email: {business.admin_email}</p>
              </div>

              {isAdmin && <Link to={'/business/'+business._id} >
              <button
                className="p-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition duration-200"
                >
                configure
              </button>
                </Link>}
              {isAdmin && <button
                onClick={() => handleDeleteBusiness(business._id)}
                className="p-2 bg-red-600 text-white font-semibold rounded hover:bg-red-500 transition duration-200"
              >
                Delete
              </button>}
            </div>
          ))}
        </div>
      </div>
      {isAdmin && (
        <Link
          className="p-2 mb-5 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition duration-200"
          to="/create-business"
        >
          Create Business
        </Link>
      )}
    </div>
  );
};

export default BusinessManage;
