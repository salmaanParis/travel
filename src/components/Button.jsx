// src/components/ui/Button.jsx

import React from 'react';

const Button = ({ children, className, size, onClick }) => {
  const sizeClasses = size === 'lg' ? 'px-4 py-2 text-lg' : 'px-3 py-1 text-sm';

  return (
    <button
      className={`bg-primary hover:bg-primary-dark text-white rounded ${sizeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
