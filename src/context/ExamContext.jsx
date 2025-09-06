"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ExamContext = createContext();

export function ExamProvider({ children }) {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = sessionStorage.getItem("token_elearning");
        if (!token) return;

        const res = await fetch('/api/v1/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error("Gagal ambil ujian");

        const data = await res.json();
        setExams(data.data || []);
      } catch (err) {
        console.error("Error fetch exams:", err);
      }
    };

    fetchExams();
  }, []);

  return (
    <ExamContext.Provider value={{ exams, setExams }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  return useContext(ExamContext);
}
