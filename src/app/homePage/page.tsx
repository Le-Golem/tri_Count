'use client'
import React, { useEffect, useState } from 'react';
import './homePage.css'; 

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     const isAuthenticated = await VérifierAuthentification();
  //     setIsLoggedIn(isAuthenticated);
  //   };

  //   checkAuthentication();
  // }, []);

  // useEffect(() => {
  //   window.location.href="http://localhost:3000/"
  // } , [isLoggedIn]);
  return (
      <div className="homepage-container">
        <h1 className="homepage-title">Bienvenue sur triCount !</h1>
      </div>

  );
}