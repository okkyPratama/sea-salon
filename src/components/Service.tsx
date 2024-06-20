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
          <div className="border rounded-md p-6">
            <div className="mt-6">
              <img src="/src/assets/haircut-styling.png" alt="Icon" />
            </div>

            <div className="mt-6">
              <h4 className="text-gray-800 text-xl font-semibold mb-2">
                Haircuts and Styling
              </h4>
              <p className="text-sm text-gray-500">
                Everything you get in this plan
              </p>

              <button
                type="button"
                className="w-full mt-6 px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="border rounded-md p-6">
            <div className="mt-6">
              <img src="/src/assets/manicure-pedicure.png" alt="Icon" />
            </div>

            <div className="mt-6">
              <h4 className="text-gray-800 text-xl font-semibold mb-2">
                Manicure and Pedicure
              </h4>
              <p className="text-sm text-gray-500">
                Everything you get in this plan
              </p>

              <button
                type="button"
                className="w-full mt-6 px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="border rounded-md p-6">
            <div className="mt-6">
              <img src="/src/assets/facial-treatment.png" alt="Icon" />
            </div>

            <div className="mt-6">
              <h4 className="text-gray-800 text-xl font-semibold mb-2">
                Facial Treatment
              </h4>
              <p className="text-sm text-gray-500">
                Everything you get in this plan
              </p>
              <button
                type="button"
                className="w-full mt-6 px-5 py-2.5 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-cyan-500/50 rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
