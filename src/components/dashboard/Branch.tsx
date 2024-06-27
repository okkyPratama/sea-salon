import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import Breadcrumb from "./Breadcrumb";
import { Link } from "react-router-dom";

interface Branch {
  id: number;
  branch_name: string;
  branch_location: string;
  opening_time: string;
  closing_time: string;
}

const Branch: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/branches");
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const columns = [
    { header: "Branch Name", accessor: "branch_name" as keyof Branch },
    { header: "Location", accessor: "branch_location" as keyof Branch },
    { header: "Opening Time", accessor: "opening_time" as keyof Branch },
    { header: "Closing Time", accessor: "closing_time" as keyof Branch },
  ];

  const handleViewDetail = (branch: Branch) => {
    console.log("View detail for branch:", branch);
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "" },
    { label: "Branch", path: "/dashboard/branch" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Branch</h2>

        <Link
          to="/dashboard/branch/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Branch
        </Link>
      </div>
      <Breadcrumb items={breadcrumbItems} />
      <Table<Branch>
        columns={columns}
        data={branches}
        onViewDetail={handleViewDetail}
      />
    </div>
  );
};

export default Branch;
