"use client";

import { createContext, useContext, useState, useEffect } from "react";

const MateriContext = createContext();

export const MateriProvider = ({ children }) => {
  const [materiData, setMateriData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMateri = async ({ kdmtk, kelas, kdhari, kdjur }) => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem("token_elearning");
      const response = await fetch(
        `/api/v1/mhslearning/materi/${kdmtk}/${kelas}/${kdhari}/${kdjur}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMateriData(data);
    } catch (err) {
      console.error("Error fetching materi:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MateriContext.Provider
      value={{ materiData, setMateriData, loading, error, fetchMateri }}
    >
      {children}
    </MateriContext.Provider>
  );
};

export const useMateri = () => useContext(MateriContext);
