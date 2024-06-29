import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Alert from "../Alert";

interface Branch {
  id: number;
  branch_name: string;
  opening_time: string;
  closing_time: string;
  services: Array<{ id: number; name: string; duration: string }>;
}

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

const AddReservation: React.FC = () => {
  const { user, authAxios } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    branchId: "",
    service: "",
    dateTime: "",
  });
  const [branches, setBranches] = useState<Branch[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "danger" | "success";
    message: string;
  } | null>(null);

  const fetchBranchesAndServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get(
        "http://localhost:5000/branches-services"
      );
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
    fetchBranchesAndServices();
  }, [fetchBranchesAndServices]);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        name: user.fullname || "",
        phoneNumber: user.phone_number || "",
      }));
    }
  }, [user]);

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
      await authAxios.post("http://localhost:5000/reservations", {
        user_id: user.user_id,
        name: formData.name,
        phone_number: formData.phoneNumber,
        branch_id: formData.branchId,
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
  ];

  if (isLoading) {
    return(
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
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
                htmlFor="branchId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Branch
              </label>
              <select
                id="branchId"
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                {formData.branchId &&
                  Array.isArray(branches) &&
                  branches
                    .find((branch) => branch.id === parseInt(formData.branchId))
                    ?.services.map((service) => (
                      <option key={service.id} value={service.name}>
                        {service.name} ({service.duration})
                      </option>
                    ))}
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
  );
};
export default AddReservation;
