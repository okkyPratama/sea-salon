import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import Breadcrumb from './Breadcrumb';
import Table, { Column } from './Table';
import { Link } from 'react-router-dom';

interface Reservation {
  id: number;
  name: string;
  phone_number: string;
  service: string;
  date_time: string;
  location: string;
}

const Reservation: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { authAxios } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await authAxios.get("http://localhost:5000/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [authAxios])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const columns:Column<Reservation>[] = [
    { header: "Name", accessor: "name" as keyof Reservation },
    { header: "Phone Number", accessor: "phone_number" as keyof Reservation },
    { header: "Service", accessor: "service" as keyof Reservation },
    {header: "Location", accessor: "branch_name" as keyof Reservation },
    { 
      header: "Date", 
      accessor: "date_time",
      cell: (value) => typeof value === 'string' ? formatDate(value) : 'Invalid Date'
    },
    {
      header: "Time",
      accessor: "date_time",
      cell: (value) => typeof value === 'string' ? formatTime(value) : 'Invalid Time'
    },
  ];

  const breadcrumbItems = [
    { label: "Dashboard", path: "" },
    { label: "Reservations", path: "/dashboard/reservations" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-2">My Reservations</h2>
        <Link
          to="/dashboard/reservations/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Reservation
        </Link>
      </div>
      <Breadcrumb items={breadcrumbItems} />
      <Table<Reservation>
        columns={columns}
        data={reservations}
      />
    </div>
  )
}

export default Reservation