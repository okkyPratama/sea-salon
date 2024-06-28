import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../../hooks/useAuth';

interface Branch {
  id: number;
  branch_name: string;
}

const AddService: React.FC = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('00:30');
  const [branchId, setBranchId] = useState('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const navigate = useNavigate();
  const { authAxios } = useAuth();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await authAxios.get('http://localhost:5000/branches');
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
  }, [authAxios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAxios.post('http://localhost:5000/branch-services', { 
        branch_id: branchId,
        service_name: name,
        duration_per_session: duration 
      });
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
      <div className="flex justify-start items-center h-full">
        <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h5 className="text-2xl font-medium text-gray-900 mb-6">
              Add New Service
            </h5>
            <div className="space-y-6">
              <div>
                <label htmlFor="branch" className="block mb-2 text-sm font-medium text-gray-900">
                  Branch
                </label>
                <select
                  id="branch"
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select a branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Service Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900">
                  Duration
                </label>
                <input
                  type="time"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;