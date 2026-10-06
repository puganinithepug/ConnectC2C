import React from 'react';
import '../styles/components/Card.css';

const Card = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      className={`card card-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

