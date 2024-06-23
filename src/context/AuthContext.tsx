import { ReactNode, createContext, useState } from "react";

interface User {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: "Customer" | "Admin";
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user,setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user,login,logout }}>
            {children}
        </AuthContext.Provider>
    );
};