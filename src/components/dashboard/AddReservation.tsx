import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Alert from "../Alert";

const validateDateTime = (dateTime: string): string | null => {
  const date = new Date(dateTime);
  const hours = date.getHours();

  if (hours < 9 || hours >= 21) {
    return "Booking time must be between 9:00 AM and 9:00 PM";
  }

  return null;
};

const AddReservation: React.FC = () => {
  const { user, authAxios } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    service: "",
    dateTime: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "danger" | "success";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
        setFormData(prevState => ({
            ...prevState,
            name: user.fullname || "",
            phoneNumber: user.phone_number || "",
        }))
    }
  }, [user])


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "dateTime") {
      const error = validateDateTime(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateTime: error || "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setAlertInfo({
        type: "danger",
        message: "You must be logged in to make a reservation.",
      });
      return;
    }

    const dateTimeError = validateDateTime(formData.dateTime);
    if (dateTimeError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateTime: dateTimeError,
      }));
      return;
    }

    setIsLoading(true);

    try {
      await authAxios.post("http://localhost:5000/reservations", {
        user_id: user.user_id,
        name: formData.name,
        phone_number: formData.phoneNumber,
        service: formData.service,
        date_time: formData.dateTime,
      });
      setAlertInfo({
        type: "success",
        message: "Reservation submitted successfully!",
      });
      setTimeout(() => {
        navigate("/dashboard/reservations");
      }, 2000);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      setAlertInfo({
        type: "danger",
        message: "Failed to submit reservation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Reservations", path: "/dashboard/reservations" },
    { label: "Add Reservation", path: "/dashboard/reservations/add" },
  ]

  return(
    <div>
    <h2 className="text-2xl font-bold mb-4">Add New Reservation</h2>
    <Breadcrumb items={breadcrumbItems} />
    <div className="flex justify-start items-center h-full">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        {alertInfo && (
          <Alert
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={() => setAlertInfo(null)}
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="service"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="">Select a service</option>
              <option value="Haircuts and Styling">Haircuts and Styling</option>
              <option value="Manicure and Pedicure">Manicure and Pedicure</option>
              <option value="Facial Treatment">Facial Treatment</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dateTime"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            {errors.dateTime && (
              <p className="text-red-500 text-xs italic">{errors.dateTime}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add Reservation"}
          </button>
        </form>
      </div>
    </div>
  </div>
  ) 
};

export default AddReservation;
