import axios from "axios";
import { ReactNode, createContext, useState } from "react";

interface User {
  user_id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: "Customer" | "Admin";
}

interface AuthContextType {
  user: User | null;
  login: (email:string,password:string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user,setUser] = useState<User | null>(null);

    const login = async (email: string,password:string) => {
        try {
            const response = await axios.post('http://localhost:5000/login',{email,password}) 
            setUser(response.data.user);
            localStorage.setItem('token',response.data.token)
        } catch (error) {
            console.error('Login failed',error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ user,login,logout }}>
            {children}
        </AuthContext.Provider>
    );
};