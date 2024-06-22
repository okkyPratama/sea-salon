import React, { useEffect, useState } from "react";

interface ReservationFormProps {
  onClose: () => void;
  defaultService?   : string;
}

const validateDateTime = (dateTime: string): string | null => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    if (hours < 9 || hours >= 21) {
      return "Booking time must be between 9:00 AM and 9:00 PM";
    }
  
    if (minutes !== 0) {
      return "Minutes must be added!";
    }
  
    return null;
  };

const ReservationForm: React.FC<ReservationFormProps> = ({onClose,defaultService = ''}) => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dateTimeError = validateDateTime(formData.dateTime);
        if (dateTimeError) {
          setErrors(prevErrors => ({
            ...prevErrors,
            dateTime: dateTimeError
          }));
          return;
        }
        console.log('Form submitted', formData);
        onClose();
      };


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Make a Reservation</h2>
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
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  
                        >
                          Book Now  
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Cancel
                        </button>    
                    </div>
                 </form>    
            </div>
        </div>
    );
};
export default ReservationForm;