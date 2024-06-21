import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Review from "./components/Review";
import Service from "./components/Service";
const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Service />
      <Review />
      <Footer />
    </div>
  );
};

export default App;
