import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../hooks/useAuth";

interface ReservationFormProps {
  onClose: () => void;
  defaultService?   : string;
}

const validateDateTime = (dateTime: string): string | null => {
    const date = new Date(dateTime);
    const hours = date.getHours();
  
    if (hours < 9 || hours >= 21) {
      return "Booking time must be between 9:00 AM and 9:00 PM";
    }

    return null;
  };

const ReservationForm: React.FC<ReservationFormProps> = ({onClose,defaultService = ''}) => {
  const {user,authAxios} = useAuth();  
  const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        service: defaultService,
        dateTime: '',
    });

    useEffect(()=> {
        setFormData(prevState => ({
            ...prevState,
            service: defaultService,
        }));
    }, [defaultService]);
    
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'dateTime') {
            const error = validateDateTime(value);
            setErrors(prevErrors => ({
              ...prevErrors,
              dateTime: error || ''
            }));
          }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState<{type: 'danger' | 'success'; message: string} | null>(null);
    const handleCloseAlert = () => {
        setAlertInfo(null);
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
          setAlertInfo({ type: 'danger', message: 'You must be logged in to make a reservation.' });
          return;
      }

        const dateTimeError = validateDateTime(formData.dateTime);
        if (dateTimeError) {
          setErrors(prevErrors => ({
            ...prevErrors,
            dateTime: dateTimeError
          }));
          return;
          setIsLoading(true);
        }

        try {
            const response = await authAxios.post('http://localhost:5000/bookings', {
                name: formData.name,
                phone_number: formData.phoneNumber,
                service: formData.service,
                date_time: formData.dateTime
            });
            console.log('Booking submitted successfully', response.data)
            setAlertInfo({ type: 'success', message: 'Booking submitted successfully!' });
            setTimeout(() => {
                onClose();
            }, 2000)
        } catch (error) {
            console.error("Error submitting booking:",error);

            setAlertInfo({ type: 'danger', message: 'Failed to submit booking. Please try again.' });
        } finally {
            setIsLoading(false);
        }
      };



    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Make a Reservation</h2>
                {alertInfo && <Alert type={alertInfo.type} message={alertInfo.message} onClose={handleCloseAlert}/>}
                 <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
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
                      <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
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
                        <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Service</label>
                        <select
                          id="service"                           
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required  
                        >
                            <option value="">Select a service</option>
                            <option value="Haircuts and Styling">Haircuts and Styling</option>
                            <option value="Manicure and Pedicure">Manicure and Pedicure</option>
                            <option value="Facial Treatment">Facial Treatment</option>
                        </select>
                    </div>
                    <div className="mb-4">
                       <label htmlFor="dateTime" className="block text-gray-700 text-sm font-bold mb-2">Date and Time</label>
                        <input 
                           type="datetime-local"
                           id="dateTime"
                           name="dateTime" 
                           value={formData.dateTime}
                           onChange={handleChange}
                           min="09:00"
                           max="20:00"
                           step="3600"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           required
                        />
                          {errors.dateTime && <p className="text-red-500 text-xs italic">{errors.dateTime}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Cancel
                        </button>    
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  
                        >
                           {isLoading ? 'Submitting...' : 'Book Now'}
                        </button>
                    </div>
                    {errors.submit && <p className="text-red-500 text-xs italic mt-2">{errors.submit}</p>}
                 </form>    
            </div>
        </div>
    );
};
export default ReservationForm;