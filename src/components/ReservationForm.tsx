import React, { useCallback, useEffect, useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

interface Branch {
  id: number;
  branch_name: string;
  opening_time: string;
  closing_time: string;
  services: Array<{ id: number; name: string; duration: string }>;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  isOpen,
  onClose,
  defaultService = "",
}) => {
  const { user, authAxios } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    branchId: "",
    service: defaultService,
    dateTime: "",
  });
  const [branches, setBranches] = useState<Branch[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [alertInfo, setAlertInfo] = useState<{
    type: "danger" | "success";
    message: string;
  } | null>(null);

  const fetchBranchesAndServices = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("Fetching branches and services...");
      const response = await authAxios.get("http://localhost:5000/branches-services");
      console.log("Branches and services fetched:", response.data);
      setBranches(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching branches and services:", error);
      setAlertInfo({
        type: "danger",
        message: "Failed to fetch branches and services. Please try again.",
      });
      setBranches([]);
    } finally {
      setIsLoading(false);
    }
  }, [authAxios]);

  useEffect(() => {
    if (!Array.isArray(branches)) {
      console.error("branches is not an array:", branches);
      setBranches([]);
    }
  }, [branches]);

  useEffect(() => {
    console.log("ReservationForm isOpen:", isOpen);
    if (isOpen) {
      fetchBranchesAndServices();
      if (user) {
        setFormData((prevState) => ({
          ...prevState,
          name: user.fullname || "",
          phoneNumber: user.phone_number || "",
        }));
      }
    }
  }, [isOpen, user, fetchBranchesAndServices]);

  useEffect(() => {
    console.log("Branches state updated:", branches);
  }, [branches]);
  
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "branchId") {
      setFormData((prevState) => ({ ...prevState, service: "" }));
    }

    if (name === "dateTime") {
      const selectedBranch = branches.find(
        (branch) => branch.id === parseInt(formData.branchId)
      );
      if (selectedBranch) {
        const error = validateDateTime(
          value,
          selectedBranch.opening_time,
          selectedBranch.closing_time
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateTime: error || "",
        }));
      }
    }
  };

  const validateDateTime = (
    dateTime: string,
    openingTime: string,
    closingTime: string
  ): string | null => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    if (timeString < openingTime || timeString > closingTime) {
      return `Booking time must be between ${openingTime} and ${closingTime}`;
    }

    return null;
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

    const selectedBranch = branches.find(
      (branch) => branch.id === parseInt(formData.branchId)
    );
    if (selectedBranch) {
      const dateTimeError = validateDateTime(
        formData.dateTime,
        selectedBranch.opening_time,
        selectedBranch.closing_time
      );
      if (dateTimeError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateTime: dateTimeError,
        }));
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await authAxios.post("http://localhost:5000/reservations", {
        user_id: user.user_id,
        name: formData.name,
        phone_number: formData.phoneNumber,
        branch_id: formData.branchId,
        service: formData.service,
        date_time: formData.dateTime,
      });
      console.log("Reservation submitted successfully:", response.data);
      setAlertInfo({
        type: "success",
        message: "Reservation submitted successfully!",
      });
      setTimeout(() => {
        if (user.role === "Customer") {
          navigate("/dashboard/reservations");
        }
        onClose();
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

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Make a Reservation</h2>
        {alertInfo && (
          <Alert
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={() => setAlertInfo(null)}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="branchId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Branch
            </label>
            <select
              id="branchId"
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a branch</option>
              {Array.isArray(branches) && branches.length > 0 ? (
                branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name}
                  </option>
                ))
              ) : (
                <option value="">No branches available</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="service"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a service</option>
              {formData.branchId &&
                Array.isArray(branches) &&
                branches
                  .find((branch) => branch.id === parseInt(formData.branchId))
                  ?.services?.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name} ({service.duration})
                    </option>
                  ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateTime"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.dateTime && (
              <p className="text-red-500 text-xs italic">{errors.dateTime}</p>
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
