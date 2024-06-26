import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../../hooks/useAuth';

const AddBranch: React.FC = () => {
  const [branchName, setBranchName] = useState('');
  const [location, setLocation] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const navigate = useNavigate();
  const {authAxios} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAxios.post('http://localhost:5000/branches', {
        branch_name: branchName,
        branch_location: location,
        opening_time: openingTime,
        closing_time: closingTime
      });
      navigate('/dashboard/branch');
    } catch (error) {
      console.error('Error adding branch:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Branches', path: '/dashboard/branches' },
    { label: 'Add Branch', path: '/dashboard/branches/add' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Branch</h2>
      <Breadcrumb items={breadcrumbItems} />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
          <input
            type="text"
            id="branchName"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">Opening Time (HH:MM:SS)</label>
          <input
            type="text"
            id="openingTime"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">Closing Time (HH:MM:SS)</label>
          <input
            type="text"
            id="closingTime"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Branch
        </button>
      </form>
    </div>
  );
};

export default AddBranch;