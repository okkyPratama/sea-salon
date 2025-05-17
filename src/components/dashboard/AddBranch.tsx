import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FormLayout from './FormLayout';
import FormField from './FormFields';

const AddBranch: React.FC = () => {
  const [branchName, setBranchName] = useState('');
  const [location, setLocation] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
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
    <FormLayout 
      title="Add New Branch"
      breadcrumbItems={breadcrumbItems}
      onSubmit={handleSubmit}
      submitButtonText="Add Branch"
    >
      <FormField label="Branch Name" id="branchName">
        <input
          type="text"
          id="branchName"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </FormField>
      
      <FormField label="Location" id="location">
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </FormField>
      
      <FormField label="Opening Time" id="openingTime">
        <input
          type="time"
          id="openingTime"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </FormField>
      
      <FormField label="Closing Time" id="closingTime">
        <input
          type="time"
          id="closingTime"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </FormField>
    </FormLayout>
  );
};

export default AddBranch;