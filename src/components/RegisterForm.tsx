import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Alert from "./Alert";

interface RegisterFormProps {
    onClose: () => void;
    switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onClose, switchToLogin}) => {
    const [fullname,setFullname] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [alertInfo, setAlertInfo] = useState<{type: 'danger' | 'success'; message: string} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {
                fullname,
                email,
                phone_number: phoneNumber,
                password
              });
              
            setAlertInfo({type:'success',message:'Register successful!'});
            
            setTimeout( async()=> {
                try {
                    await login(email,password);
                    onClose();
                } catch (error) {
                    console.error("Auto-login failed:", error);
                }

            },2000)
        } catch (error) {
            console.error("Register failed: ",error);
            setAlertInfo({ type: 'danger', message: 'Register failed. Please try again.' });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
              REGISTER
            </h1>
              {alertInfo && (
                <Alert 
                    type={alertInfo.type}
                    message={alertInfo.message}
                    onClose={() => setAlertInfo(null)}
                />
              )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <a onClick={switchToLogin} className="font-medium text-blue-700 hover:underline cursor-pointer">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>   
    );
};

export default RegisterForm;