import React from 'react';
import '../styles/components/Button.css';

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${className} ${
    disabled ? 'btn-disabled' : ''
  }`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

