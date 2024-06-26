import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Review from "./components/Review";
import Service from "./components/Service";

const LandingPage: React.FC = () => {
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

  export default LandingPage;