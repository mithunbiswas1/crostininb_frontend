// src/hooks/useGender.js
"use client";

import { useState, useEffect } from 'react';

export const useGender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [genders, setGenders] = useState([]);

  // Load gender from localStorage on mount
  useEffect(() => {
    const storedGender = localStorage.getItem('selectedGender');
    if (storedGender) {
      try {
        const gender = JSON.parse(storedGender);
        setSelectedGender(gender);
      } catch (e) {
        console.error('Error parsing stored gender:', e);
      }
    }
  }, []);

  // Save gender to localStorage when it changes
  const updateGender = (gender) => {
    setSelectedGender(gender);
    if (gender) {
      localStorage.setItem('selectedGender', JSON.stringify(gender));
    } else {
      localStorage.removeItem('selectedGender');
    }
  };

  return {
    selectedGender,
    genders,
    setGenders,
    updateGender
  };
};