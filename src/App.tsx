import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Review from "./components/Review";
import Service from "./components/Service";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Service/>
      <Review/>
      <Footer />
    </>
  );
}

export default App;
