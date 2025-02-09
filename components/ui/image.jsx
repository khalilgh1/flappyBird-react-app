import React from 'react';

const Image = ({ src, alt, className, fill }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={fill ? { width: '100%', height: '100%' } : {}}
    />
  );
};

export default Image;