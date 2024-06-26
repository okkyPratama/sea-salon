import React from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import LandingPage from "./LandingPage";
import AdminServices from "./components/dashboard/AdminServices";
import Branch from "./components/dashboard/Branch";
import Reservation from "./components/dashboard/Reservation";
import AddBranch from "./components/dashboard/AddBranch";
import AddService from "./components/dashboard/AddService";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="reservations" element={<Reservation />}></Route>
              <Route path="services" element={<AdminServices />} />
              <Route path="services/add" element={<AddService />} />
              <Route path="branch" element={<Branch />} />
              <Route path="branch/add" element={<AddBranch />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
