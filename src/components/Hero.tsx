import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "./LoginForm";

const BookNowIcon: React.FC = () => (
  <svg
    className="w-5 h-5 ml-2 -mr-1"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const Hero: React.FC = () => {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.log("User state changed:", user);
    console.log("showReservationForm:", showReservationForm);
  }, [user, showReservationForm]);

  const handleBookNowClick = () => {
    console.log("Book Now clicked. User:", user);
    if (user) {
      setShowReservationForm(true);
    } else {
      setShowLoginForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowReservationForm(false);
    setShowLoginForm(false);
  };

  return (
    <section className="bg-slate-100">
    <div className="flex flex-col lg:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="order-2 lg:order-1 mr-auto place-self-center lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-cyan-600">
          Beauty and Elegance Redefined
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl ">
          A sanctuary where you can indulge in the latest hair trends,
          cutting-edge treatments, and unparalleled pampering.
        </p>
        <button
          onClick={handleBookNowClick}
          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-primary-300"
        >
          Book Now
          <BookNowIcon />
        </button>
      </div>
      <div className="order-1 lg:order-2 mb-8 lg:mb-0 lg:mt-0 lg:col-span-5 flex justify-center lg:justify-end">
        <img 
          src="/src/assets/sea-salon-model2-bgremove.png" 
          alt="mockup" 
          className="max-w-full h-auto"
        />
      </div>
    </div>
    <ReservationForm isOpen={showReservationForm} onClose={handleCloseForm} />
    {showLoginForm && !user && <LoginForm onClose={handleCloseForm} />}
  </section>
  );
};

export default Hero;