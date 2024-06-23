import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Review from "./components/Review";
import Service from "./components/Service";
import { AuthProvider } from "./context/AuthContext";
const App: React.FC = () => {
  return (
    <AuthProvider>
    <div className="App">
      <Navbar />
      <Hero />
      <Service />
      <Review />
      <Footer />
    </div>
    </AuthProvider>
  );
};

export default App;
