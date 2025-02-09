import React, { useState } from 'react';

export const Slider = ({ min, max, step, defaultValue, onValueChange, className }) => {
  const [value, setValue] = useState(defaultValue[0]);
  
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onValueChange([newValue]);
  };
  
  const getTrackWidth = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className={`relative w-full h-6 ${className}`}>
      <div className="absolute h-2 top-2 w-full bg-yellow-200 rounded-full">
        <div 
          className="absolute h-full bg-yellow-500 rounded-full" 
          style={{ width: `${getTrackWidth()}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="absolute w-full h-2 top-2 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full 
        transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? 'bg-yellow-500' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg 
          transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export const Button = ({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick, 
  style,
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none';
  
  const variants = {
    default: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    destructive: 'bg-red-500 hover:bg-red-600 text-green',
    outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50',
    bordered: `relative border-2 border-yellow-800 hover:border-yellow-600 after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-0 after:hover:opacity-20 after:transition-opacity`,
  };

  // Special handling for background color buttons
  const isBackgroundBtn = className?.includes('bg-btn');
  const selectedStyle = isBackgroundBtn ? {
    ...style,
    boxShadow: variant === 'default' ? '0 0 0 4px rgba(234, 179, 8, 0.5)' : 'none',
  } : style;

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      style={selectedStyle}
      {...props}
    >
      {children}
    </button>
  );
};