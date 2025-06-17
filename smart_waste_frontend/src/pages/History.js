// History.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { refreshAccessToken } from '../auth';

export const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
                console.error("Unauthorized: Could not refresh token");
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/prediction/history/', {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                console.log("History API Response:", response.data);
                setHistory(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className='p-8 min-h-screen bg-green-100'>
            <h1 className='text-3xl font-bold text-green-700 mb-6 text-center'>Your Prediction History</h1>
            {history.length === 0 ? (
                <p className='text-center text-gray-500'>No prediction history found.</p>
            ) : (
                <div className='overflow-x-auto md:min-w-fit'>
                    <table className='min-w-full bg-white rounded-t-lg shadow-md'>
                        <thead className='bg-green-200 text-green-900'>
                            <tr>
                                <th className='py-3 px-4 border text-center'>#</th>
                                <th className='py-3 px-4 border text-center'>Date</th>
                                <th className='py-3 px-4 border text-center'>Weight</th>
                                <th className='py-3 px-4 border text-center'>Color</th>
                                <th className='py-3 px-4 border text-center'>Texture</th>
                                <th className='py-3 px-4 border text-center'>Size</th>
                                <th className='py-3 px-4 border text-center'>Shape</th>
                                <th className='py-3 px-4 border text-center'>Prediction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={item.id} className='hover:bg-green-50'>
                                    <td className='py-2 px-4 border text-center'>{index + 1}</td>
                                    <td className='py-2 px-4 border text-center'>{new Date(item.created_at).toLocaleString()}</td>
                                    <td className='py-2 px-4 border text-center'>{item.weight}</td>
                                    <td className='py-2 px-4 border text-center'>{item.color}</td>
                                    <td className='py-2 px-4 border text-center'>{item.texture}</td>
                                    <td className='py-2 px-4 border text-center'>{item.size}</td>
                                    <td className='py-2 px-4 border text-center'>{item.shape}</td>
                                    <td className='py-2 px-4 border text-center font-semibold text-green-700'>{item.predicted_label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
