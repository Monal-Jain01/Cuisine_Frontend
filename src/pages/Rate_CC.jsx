import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContextProvider";

export default function Rate_CC() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { theme } = useContext(ThemeContext);
  const [RateData, setRateData] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [minimise, setminimise] = useState(false);
  const [hover, setHover] = useState(0); // Stores the hovered star for visual feedback

  const Get_AllRates = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/rate-cc`, {
        withCredentials: true,
      });
      setRateData(data.reverse()); // Show newest first
    } catch (error) {
      toast.error("Failed to fetch ratings");
    }
  };

  useEffect(() => {
    Get_AllRates();
  }, [RateData]);

  const HandleSubmitRate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/rate-cc",
        { feedback, rating },
        { withCredentials: true }
      );
      setRateData([data, ...RateData]);
      setFeedback("");
      setRating(5);
      toast.success("Feedback submitted!");
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <>
      <div className={`${theme} h-screen min-h-fit py-8`}>
        <h1 className="text-4xl font-bold text-center mt-4">What People say</h1>
        <h2 className="font-[200] text-center md:text-xl">
          Know the experience and reviews of people
        </h2>
        <div className=" w-[100vw] h-[60vh] mt-8 text-white overflow-y-auto">
          {RateData.map((item, index) => (
            <div
              key={item._id || index}
              className="mb-16 p-4 bg-black/55 m-4 md:m-24 shadow-xl shadow-black/50 rounded-xl  "
            >
              <div className="flex justify-between">
                <p>Posted At: {new Date(item.createdAt).toLocaleString()}</p>
                <div className="text-right text-2xl mb-2">
                  {[...Array(5)].map((star, i) => {
                    const starIndex = i + 1;
                    return (
                      <span
                        key={starIndex}
                        className={
                          starIndex <= item.rating
                            ? "text-amber-400"
                            : "text-gray-300"
                        }
                      >
                        &#9733;
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between my-4">
                <div className="flex">
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black/50 p-2 backdrop-blur-2xl shadow-md shadow-black text-white text-xl mr-5">
                    {item.username[0].toUpperCase()}
                  </div>
                  <p className="text-center font-semibold text-xl">
                    {item.username}
                  </p>
                </div> 
                <p>{item.rating} / 5</p>
              </div>
              <p>{item.feedback}</p>
            </div>
          ))}
        </div>
        <div
          className={`fixed shadow-lg md:w-[40vw] w-fit shadow-black/70 border rounded-2xl bottom-0 md:right-0 p-4  ${
            theme === "light" ? "bg-gray-600" : "bg-gray-400"
          }`}
        >
          {!minimise ? (
            <button
              className="text-3xl cursor-pointer text-right w-full"
              onClick={() => {
                setminimise(!minimise);
              }}
            >
              {" "}
              &#8722;
            </button>
          ) : (
            <button
              className="cursor-pointer text-3xl text-right w-full"
              onClick={() => {
                setminimise(!minimise);
              }}
            >
              {" "}
              &#43;{" "}
            </button>
          )}

          <div>
            <h1 className="font-bold text-2xl text-center">
              Share Your Review{" "}
            </h1>
            <h2 className="text-center ">
              Your experience with us helps us to improve!
            </h2>
          </div>
          <div className={`${minimise && "hidden"}`}>
            <div className="text-center md:text-7xl text-4xl p-4 mb-8">
              {[...Array(5)].map((star, index) => {
                index += 1; // Adjust index to be 1-based for rating
                return (
                  <span
                    key={index}
                    className={
                      index <= (hover || rating)
                        ? "text-amber-500"
                        : "text-gray-500"
                    }
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)} // Revert to actual rating on mouse leave
                  >
                    &#9733; {/* Unicode star character */}
                  </span>
                );
              })}
            </div>
            <form onSubmit={HandleSubmitRate} className="">
              <div className="flex justify-between text-sm">
                <h1>{new Date().toLocaleString()}</h1>
                <div className="flex gap-3">
                  <h1>Rating:</h1>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="md:mr-2"
                  />
                </div>
              </div>
              <div className="flex m-4 text-black ml-0 items-center md:mr-12">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your Review Matters to Us!"
                  className="focus:outline-2  outline-2 outline-amber-400 rounded-lg p-4  focus:outline-blue-700 mr-2 md:mr-8 w-[80%]"
                  required
                />
                <button
                  type="submit"
                  className="border bg-gradient-to-r from-blue-400 to-blue-900 rounded-xl px-4 md:px-12 font-bold h-fit py-4 "
                >
                  POST
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
