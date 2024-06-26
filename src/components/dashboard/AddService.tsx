import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../../hooks/useAuth';

const AddService: React.FC = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();
  const {authAxios} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await authAxios.post('http://localhost:5000/services', { name, duration_per_session: duration });
        navigate('/dashboard/services');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Services', path: '/dashboard/services' },
    { label: 'Add Service', path: '/dashboard/services/add' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
      <Breadcrumb items={breadcrumbItems} />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (HH:MM:SS)</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;