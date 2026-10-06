import React from 'react';
import '../styles/components/LoadingSpinner.css';

const LoadingSpinner = ({ size = 'default', text = 'Loading...' }) => {
  return (
    <div className={`loading-spinner loading-spinner-${size}`}>
      <div className="spinner-animation"></div>
      <p className="spinner-text">{text}</p>
    </div>
  );
};

export default LoadingSpinner;

