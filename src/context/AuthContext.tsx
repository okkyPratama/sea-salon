import axios, { AxiosInstance } from "axios";
import { ReactNode, createContext, useState } from "react";

interface User {
  user_id:number;
  fullname: string;
  email: string;
  phone_number: string;
  role: "Customer" | "Admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authAxios: AxiosInstance;
}

export const AuthContext = createContext< AuthContextType| undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);


  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const authAxios = axios.create();

  authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

  return (
    <AuthContext.Provider value={{ user, login, logout,authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};
