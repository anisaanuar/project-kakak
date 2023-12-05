// InteractiveElement.js
import React from 'react';

const InteractiveElement = ({ position }) => {
  const elementStyle = {
    position: 'absolute',
    left: `${position}px`,
    bottom: '50px',
    width: '100px', // Adjust based on the collision object width
    height: '50px', // Adjust based on the collision object height
    backgroundColor: 'red', // Add your styling
  };

  return <div style={elementStyle}>Collision Object</div>;
};

export default InteractiveElement;
