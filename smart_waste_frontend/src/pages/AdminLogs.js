import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../auth";

export const AdminLog = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      if (!isAdmin()) {
        setError("Access denied. Admins only.");
        navigate("/");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/admin/log/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch admin logs", err);
        setError("Failed to fetch logs.");
      }
    };

    fetchLogs(); 

    const interval = setInterval(fetchLogs, 60000); 
    return () => clearInterval(interval); 
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">
        Admin Logs
      </h1>

      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}

      {logs.length === 0 && !error ? (
        <p className="text-gray-600 text-center">No logs available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-green-200 text-green-900">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Action</th>
                <th className="py-2 px-4 border">Timestamp</th>
                <th className="py-2 px-4 border">User</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id} className="hover:bg-green-50">
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">{log.action}</td>
                  <td className="py-2 px-4 border text-center">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border text-center">{log.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
