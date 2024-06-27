import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../../hooks/useAuth';

const AddBranch: React.FC = () => {
  const [branchName, setBranchName] = useState('');
  const [location, setLocation] = useState('');
  const [openingTime, setOpeningTime] = useState('09:00');
  const [closingTime, setClosingTime] = useState('17:00');
  const navigate = useNavigate();
  const { authAxios } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAxios.post('http://localhost:5000/branches', {
        branch_name: branchName,
        branch_location: location,
        opening_time: `${openingTime}:00`,
        closing_time: `${closingTime}:00`
      });
      navigate('/dashboard/branch');
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Branches', path: '/dashboard/branch' },
    { label: 'Add Branch', path: '/dashboard/branch/add' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Branch</h2>
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex justify-start items-center h-full">
        <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h5 className="text-2xl font-medium text-gray-900 mb-6">
              Add New Branch
            </h5>
            <div className="space-y-6">
              <div>
                <label htmlFor="branchName" className="block mb-2 text-sm font-medium text-gray-900">
                  Branch Name
                </label>
                <input
                  type="text"
                  id="branchName"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="openingTime" className="block mb-2 text-sm font-medium text-gray-900">
                  Opening Time
                </label>
                <input
                  type="time"
                  id="openingTime"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="closingTime" className="block mb-2 text-sm font-medium text-gray-900">
                  Closing Time
                </label>
                <input
                  type="time"
                  id="closingTime"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Branch
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBranch;