import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { refreshAccessToken } from '../auth';

export const Feedback = () => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchLatestPrediction = async () => {

            try {
                const res = await axios.get('http://localhost:8000/api/feedback/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Feedback API Response:", res.data);
                setPrediction(res.data);
            } catch (error) {
                console.error('Error fetching latest prediction:', error);
            }
        };

        fetchLatestPrediction();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8000/api/feedback/',
                {
                    rating,
                    comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRating(5);
            setComment('');
            setSubmitted(true);
        } catch (error) {
            console.log('Submission failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Give Feedback</h2>

                {prediction ? (
                    <div className="mb-4 text-sm text-gray-700">
                        <p><strong>Prediction:</strong> {prediction.predicted_label}</p>
                        <p><strong>Date:</strong>
                            {new Date(prediction.created_at).toLocaleString()}
                        </p>
                        </div>
                        ): (
                        <p className="text-red-500">No prediction available.</p>
        )}

                        <label className="block mb-2 font-semibold">Rating (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />

                        <label className="block mb-2 font-semibold">Comment (optional)</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        >
                            Submit Feedback
                        </button>

                        {submitted && (
                            <p className="mt-4 text-green-600 font-semibold text-center">Thanks for your feedback!</p>
                        )}
                    </form>
    </div>
    );
};
