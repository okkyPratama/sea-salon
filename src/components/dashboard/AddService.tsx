import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FormLayout from "./FormLayout";
import FormField from "./FormFields";

interface Branch {
  id: number;
  branch_name: string;
}

const AddService: React.FC = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("00:30");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const navigate = useNavigate();
  const { authAxios } = useAuth();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await authAxios.get("http://localhost:5000/branches");
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, [authAxios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAxios.post("http://localhost:5000/branch-services", {
        branch_id: branchId,
        service_name: name,
        duration_per_session: duration,
      });
      navigate("/dashboard/services");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Services", path: "/dashboard/services" },
    { label: "Add Service", path: "/dashboard/services/add" },
  ];

  return (
    <FormLayout 
    title="Add New Service"
    breadcrumbItems={breadcrumbItems}
    onSubmit={handleSubmit}
    submitButtonText="Add Service"
  >
    <FormField label="Branch" id="branch">
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
    </FormField>
    
    <FormField label="Service Name" id="name">
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      />
    </FormField>
    
    <FormField label="Duration" id="duration">
      <input
        type="time"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      />
    </FormField>
  </FormLayout>
  );
};

export default AddService;
