"use client";
import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Header/>
      <h1>{`404 - Page Not Found`}</h1>
      <p>{`The page you're looking for doesn't exist.`}</p>
      <Footer/>
    </div>
  );
};

export default NotFound;