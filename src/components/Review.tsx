import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Alert from "./Alert";

interface Review {
  id?: number;
  customer_name: string;
  rating: number;
  comment: string;
}

export default function Review(): React.ReactElement {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    customer_name: "",
    rating: 1,
    comment: "",
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reviews");
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    }));
  };

  const handleStarClick = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating: rating }));
  };

  const [alertInfo, setAlertInfo] = useState<{
    type: "danger" | "success";
    message: string;
  } | null>(null);
  const handleCloseAlert = () => {
    setAlertInfo(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reviews", newReview);
      setNewReview({ customer_name: "", rating: 0, comment: "" });
      fetchReviews();
      setAlertInfo({
        type: "success",
        message: "Review submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      setAlertInfo({
        type: "danger",
        message: "Failed to submit review! please try again.",
      });
    }
  };

  const scroll = (scrollOfset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOfset,
        behavior: "smooth",
      });
    }
  };

  const StarIcon: React.FC<{ filled: boolean; onClick: () => void }> = ({
    filled,
    onClick,
  }) => (
    <svg
      className={`w-8 h-8 cursor-pointer ${
        filled ? "text-yellow-300" : "text-gray-300"
      }`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
      onClick={onClick}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 inline-block text-transparent bg-clip-text">
            Customer Reviews
          </h2>
        </div>

        {alertInfo && (
          <Alert
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={handleCloseAlert}
          />
        )}

        <div className="relative mb-12 w-full overflow-visible">
          <div className="flex items-center">
            <button
              onClick={() => scroll(-600)}
              className="p-3 bg-white rounded-full shadow-md z-20 mr-4 flex-shrink-0 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="w-full overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar px-2"
                style={{ width: "100%" }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white p-6 rounded-lg shadow-md flex-shrink-0 w-72 md:w-80 lg:w-96"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-300 flex-shrink-0">
                        <svg
                          className="w-full h-full text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {review.customer_name}
                        </h3>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              filled={star <= review.rating}
                              onClick={() => {}}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scroll(600)}
              className="p-3 bg-white rounded-full shadow-md z-20 ml-4 flex-shrink-0 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-24">
        <form
          onSubmit={handleSubmit}
          className="mb-12 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="customer_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={newReview.customer_name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-bold mb-2"
            >
              Rating
            </label>
            <div className="flex flex-row items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <StarIcon
                  key={rating}
                  filled={rating <= newReview.rating}
                  onClick={() => handleStarClick(rating)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-bold mb-2"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            Submit Review
          </button>
        </form>


        </div>
      </div>
    </section>
  );
}
