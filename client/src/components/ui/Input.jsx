import React from 'react';
import '../styles/components/Input.css';

const Input = React.forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`input-wrapper ${className}`}>
        {label && <label className="input-label">{label}</label>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
        />
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

