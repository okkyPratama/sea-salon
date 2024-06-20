type ServiceProps = {
  title: string;
  image: string;
  alt: string;
};

const services = [
  {
    title: "Haircuts and Styling",
    image: "/src/assets/haircut-styling.png",
    alt: "icon",
  },
  {
    title: "Manicure and Pedicure",
    image: "/src/assets/manicure-pedicure.png",
    alt: "icon",
  },
  {
    title: "Facial Treatment",
    image: "/src/assets/facial-treatment.png",
    alt: "icon",
  },
];

const ServiceCard: React.FC<ServiceProps> = ({ title, image, alt }) => (
  <div className="border rounded-md p-6 ">
    <div className="mt-6">
      <img src={image} alt={alt} className="w-full  object-cover" />
    </div>
    <div className="mt-6">
      <h4 className="text-gray-800 text-xl font-semibold mb-2">{title}</h4>
      <button
        type="button"
        className="w-full mt-6 px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 rounded-md"
        aria-label={`Book ${title}`}
      >
        Book Now
      </button>
    </div>
  </div>
);

export default function Service() {
  return (
    <section className=" mb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-center pt-6">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 inline-block text-transparent bg-clip-text">
            Our Services
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 mt-4 max-sm:max-w-sm max-sm:mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
