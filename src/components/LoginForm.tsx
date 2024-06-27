import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import RegisterForm from "./RegisterForm";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "danger" | "success";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { role } = await login(email, password);
      setAlertInfo({ type: "success", message: "Login successful!" });
      
      setTimeout(() => {
        if(role === "Customer") { 
          navigate('dashboard/reservations');
        } else if(role === "Admin") {
          navigate('/dashboard/services');
        }else {
          navigate('/dashboard');
        }
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      setAlertInfo({
        type: "danger",
        message: "Login failed! please try again",
      });
    }
  };

  if (showRegister) {
    return (
      <RegisterForm
        onClose={onClose}
        switchToLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <button
          onClick={onClose}
          className="text-red-600 hover:text-black absolute top-4 right-4"
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
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
            LOGIN
          </h1>
              {alertInfo && (
                <Alert
                  type={alertInfo.type}
                  message={alertInfo.message}
                  onClose={() => setAlertInfo(null)}
                />
              )}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <a
                onClick={() => setShowRegister(true)}
                className="font-medium text-blue-700 hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
