import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  duration_per_session: string;
}

interface Branch {
  id: number;
  branch_name: string;
  services: Service[];
}

const AdminServices: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranchesAndServices = async () => {
      try {
        const branchesResponse = await axios.get("http://localhost:5000/branches");
        const branchesWithServices = await Promise.all(
          branchesResponse.data.map(async (branch: Branch) => {
            const servicesResponse = await axios.get(`http://localhost:5000/branch-services/${branch.id}`);
            return { ...branch, services: servicesResponse.data };
          })
        );
        setBranches(branchesWithServices);
      } catch (error) {
        console.error("Error fetching branches and services:", error);
      }
    };

    fetchBranchesAndServices();
  }, []);

  const columns = [
    { header: "Name", accessor: "name" as keyof Service },
    { header: "Duration", accessor: "duration_per_session" as keyof Service },
  ];

  const breadcrumbItems = [
    { label: "Dashboard", path: "" },
    { label: "Services", path: "/dashboard/services" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Services</h2>
        <Link
          to="/dashboard/services/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Service
        </Link>
      </div>
      <Breadcrumb items={breadcrumbItems} />
      {branches.map((branch) => (
        <div key={branch.id} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{branch.branch_name}</h3>
          <Table<Service> columns={columns} data={branch.services} />
        </div>
      ))}
    </>
  );
};

export default AdminServices;