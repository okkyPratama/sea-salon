import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section
      className="bg-gradient-to-b from-cyan-950 to-slate-900 text-white py-16"
      id="about"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute -z-10 inset-0">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-20"
              >
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  d="M40,90 C20,50 40,10 90,10 C140,10 190,40 190,100 C190,150 160,190 100,190 C40,190 10,150 30,110 C50,70 80,50 120,50 C160,50 180,70 180,110"
                />
              </svg>
            </div>
            <div className="relative z-10 mr-48">
              <img
                src="/src/assets/sea-salon-founder.png"
                alt="Thomas N - SEA Salon Founder"
                className="w-full max-w-md mx-auto"
              />
              <p className="text-center mt-4 font-mono text-lg">Thomas N</p>
            </div>
          </div>

          <div className="flex flex-col md:items-end text-left md:text-right">
            <h2 className="text-4xl font-bold mb-8 text-center md:text-right bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 inline-block text-transparent bg-clip-text">
              About Us
            </h2>

            <div className="text-left w-full">
              <p className="mb-4">
                In the year of 2018, Thomas N established the first SEA Salon in
                Kemang, Jakarta. And in the year of 2020, SEA Salon moved to
                Pacific Place Mall, and became the first premium beauty
                destination in the prestigious mall in South Jakarta.
              </p>

              <p className="mb-4">
                Furthermore, SEA Salon expanded the business to several malls in
                Jakarta and surrounding areas, which are: Pacific Place Mall,
                Grand Indonesia, Mall Kelapa Gading, Central Park Mall, Kota
                Kasablanka, AEON BSD, Summarecon Mall Serpong, Gandaria City,
                and Lippo Mall Puri.
              </p>

              <p>
                Our team of expert stylists, colorists, and therapists is
                dedicated to bringing out the best version of you—whether it's
                through a signature haircut, customized coloring, or
                rejuvenating spa treatments. Each visit is more than just an
                appointment—it's an experience designed to pamper and uplift.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
