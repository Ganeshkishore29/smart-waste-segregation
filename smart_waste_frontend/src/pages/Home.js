import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, refreshAccessToken } from "../auth";
export const Home = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [texture, setTexture] = useState("");
  const [shape, setShape] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(""); 
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); 
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if(!token){
      
       token= await refreshAccessToken()
       if (!token){
        setError("You are not Authorized. Please login again")
        navigate("/login")
        return
        
       }
      }
      const response = await axios.post(
        "http://localhost:8000/api/predict/",
        {
          weight,
          color,
          size,
          texture,
          shape,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      setWeight("");
setColor("");
setSize("");
setTexture("");
setShape("");

      setPrediction(response.data.prediction); 
      setError(""); 
    } catch (error) {
      setPrediction(null);
      console.error("Prediction error:", error.response?.data || error.message);
      setError("Error during prediction. Please try again."); 
    }
  };
  return (
    <div className="container min-w-full min-h-screen bg-green-100 flex flex-col  justify-center items-center">
      <section className="bg-white py-12 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Why Use Our System?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 border rounded-xl shadow hover:shadow-lg">
            <h3 className="font-semibold text-green-700 text-xl mb-2">
              Fast Prediction
            </h3>
            <p className="text-gray-600">
              Upload your waste details and get instant classification results.
            </p>
          </div>
          <div className="p-4 border rounded-xl shadow hover:shadow-lg">
            <h3 className="font-semibold text-green-700 text-xl mb-2">
              Eco-Friendly
            </h3>
            <p className="text-gray-600">
              Helps reduce landfill waste and improve recycling processes.
            </p>
          </div>
          <div className="p-4 border rounded-xl shadow hover:shadow-lg">
            <h3 className="font-semibold text-green-700 text-xl mb-2">
              Smart ML System
            </h3>
            <p className="text-gray-600">
              Built with advanced machine learning algorithms for accuracy.
            </p>
          </div>
        </div>
      </section>

      <h2 className="text-2xl font-bold text-center mb-6 mt-6 text-green-700">
        Waste Prediction
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {prediction && (
        <div className="mt-4 p-4 border rounded bg-green-100">
          <p>
            <strong>Predicted Label:</strong> {prediction.predicted_label}
          </p>
          <p>
            <strong>Recycle Tip:</strong> {prediction.recycle_tip}
          </p>
        </div>
      )}
  <form onSubmit={handleSubmit}>
        <table className="w-full table-auto">
          <tbody>
            <tr className="mb-4">
              <td className="pr-4 py-2 font-medium text-gray-700">Weight:</td>
              <td>
                <input
                  type="number"
                  value={weight}
                  placeholder="eg. 1.0, 2.5"
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </td>
            </tr>
            <tr className="mb-4">
              <td className="pr-4 py-2 font-medium text-gray-700">Color:</td>
              <td>
                <input
                  type="text"
                  value={color}
                  placeholder="eg. Red,Green"
                  onChange={(e) => setColor(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </td>
            </tr>
            <tr className="mb-4">
              <td className="pr-4 py-2 font-medium text-gray-700">Size:</td>
              <td>
                <input
                  type="text"
                  value={size}
                  placeholder="eg. small,medium,large"
                  onChange={(e) => setSize(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </td>
            </tr>
            <tr className="mb-4">
              <td className="pr-4 py-2 font-medium text-gray-700">Texture:</td>
              <td>
                <input
                  type="text"
                  value={texture}
                  placeholder="eg. smooth,soft,rough"
                  onChange={(e) => setTexture(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </td>
            </tr>
            <tr className="mb-4">
              <td className="pr-4 py-2 font-medium text-gray-700">Shape:</td>
              <td>
                <input
                  type="text"
                  value={shape}
                  placeholder="eg. cube,sphere,cylinder"
                  onChange={(e) => setShape(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Predict
        </button>
      </form>
    
      <footer className="bg-green-800 text-white text-center mt-7 px-7 py-4">
        <p>
          
          2025 Smart Waste Segregation System. Built with 💚 by Ganesh Kishore S
        </p>
      </footer>
    </div>
  );
};
