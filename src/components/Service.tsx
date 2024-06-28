import React, { useState } from "react";
import ReservationForm from "./ReservationForm";

type ServiceProps = {
  title: string;
  image: string;
  alt: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const services = [
  {
    title: "Haircuts and Styling",
    image: "/src/assets/haircut-styling-img.png",
    alt: "icon",
  },
  {
    title: "Manicure and Pedicure",
    image: "/src/assets/manicure-img.png",
    alt: "icon",
  },
  {
    title: "Facial Treatment",
    image: "/src/assets/facial-treatment-img.png",
    alt: "icon",
  },
];

const ServiceCard: React.FC<ServiceProps> = ({ title, image, alt, onClick }) => (

  <div className="border rounded-md p-4 ">
      <img src={image} alt={alt} className="w-full object-contain" />
    <div className="mt-3">
      <h4 className="text-gray-800 text-xl font-semibold mb-2">{title}</h4>
      <button
        onClick={onClick}
        type="button"
        className="w-full mt-3 px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 rounded-md"
        aria-label={`Book ${title}`}
      >
        Book Now
      </button>

    </div>
  </div>
);

export default function Service() {
    const [showReservationForm, setShowReservationForm] = useState(false);
    
    const handleBookNowClick = () => {
        setShowReservationForm(true);
    }
    
    const handleCloseForm = () => {
        setShowReservationForm(false);
    };
    
    return (
        <section className=" mb-2" id="services">
      <div className="max-w-5xl mx-auto">
        <div className="text-center pt-6">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 inline-block text-transparent bg-clip-text">
            Our Services
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-4 max-sm:max-w-sm max-sm:mx-auto">
          {services.map((service, index) => (
              <ServiceCard onClick={handleBookNowClick} key={index} {...service} />
            ))}
        </div>
      </div>
      <ReservationForm isOpen={showReservationForm} onClose={handleCloseForm} />
    </section>
  );
}
