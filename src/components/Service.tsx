import React, { useState } from "react";
import ReservationForm from "./ReservationForm";

type ServiceProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const services = [
  {
    title: "Haircuts and Styling",
    description: "Expert styling tailored to enhance your natural beauty and reflect your personal style.",
    image: "/src/assets/haircut-styling-img.png",
    alt: "Haircut and styling service",
  },
  {
    title: "Manicure and Pedicure",
    description: "Rejuvenate your hands and feet with our premium nail care and artistic polish application.",
    image: "/src/assets/manicure-img.png",
    alt: "Manicure and pedicure service",
  },
  {
    title: "Facial Treatment",
    description: "Revitalize your skin with customized treatments targeting your specific skincare needs.",
    image: "/src/assets/facial-treatment-img.png",
    alt: "Facial treatment service",
  },
];

const ServiceCard: React.FC<ServiceProps> = ({ title, description, image, alt, onClick }) => (
  <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <img src={image} alt={alt} className="w-full h-48 object-cover" />
    <div className="p-5">
      <h4 className="text-gray-800 text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-4 min-h-[60px]">{description}</p>
      <button
        onClick={onClick}
        type="button"
        className="w-full px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 rounded-md transition-all duration-300"
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
    <section className="py-12" id="services">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 inline-block text-transparent bg-clip-text">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury and precision with our premium salon services designed to enhance your natural beauty.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-4 max-sm:max-w-sm max-sm:mx-auto">
          {services.map((service, index) => (
            <ServiceCard onClick={handleBookNowClick} key={index} {...service} />
          ))}
        </div>
      </div>
      <ReservationForm isOpen={showReservationForm} onClose={handleCloseForm} />
    </section>
  );
}