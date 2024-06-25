import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Review from "./components/Review";
import Service from "./components/Service";
import { AuthProvider } from "./context/AuthContext";
import {  Route, Routes,BrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashboardLayout";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Service />
      <Review />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
