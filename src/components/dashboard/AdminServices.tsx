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

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
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
      <Table<Service> columns={columns} data={services} />
    </>
  );
};

export default AdminServices;
