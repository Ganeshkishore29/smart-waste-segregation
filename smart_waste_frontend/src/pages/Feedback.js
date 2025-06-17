import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Feedback = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');




  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLatestPrediction = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/prediction/latest/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPrediction(response.data.prediction);
        
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setPrediction(null);
        } else {
          setError('Something went wrong while fetching prediction.');
        }
      }
    };

    const fetchLatestFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/feedback/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFeedback(response.data);
      } catch (err) {
        console.log('No feedback found.');
      }
    };

    fetchLatestPrediction();
    fetchLatestFeedback();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prediction) {
      setError('No prediction available to give feedback.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/feedback/', {
        rating,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSubmitted(true);
      setComment('');
      setRating(5);
    } catch (err) {
      setError('Feedback submission failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
          Give Feedback
        </h2>

        {!prediction ? (
          <p className="text-red-500 mb-4">No prediction available.</p>
        ) : (
          <>
            <p className="text-green-700 ">
              Prediction: {prediction.predicted_label}
            </p>
            <p className="text-green-700 mb-4">
              Date: {new Date(prediction.created_at).toLocaleString()}
            </p>
            
          </>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 mt-4">Thanks for your feedback!</p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}

        {feedback && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-green-600 font-semibold">Latest Feedback</h3>
            <p>
              <strong>Rating:</strong> {feedback.rating}
            </p>
            <p>
              <strong>Comment:</strong> {feedback.comment || "No comment"}
            </p>
            <p>
              <strong>Submitted at:</strong>{" "}
              {new Date(feedback.submitted_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
