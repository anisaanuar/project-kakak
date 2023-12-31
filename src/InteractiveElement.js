// InteractiveElement.js
import React from 'react';
import collisionObjectImage from './assets/collision.png';

const InteractiveElement = ({ position }) => {
  const elementStyle = {
    position: 'absolute',
    bottom: '25px',
    left: `${window.innerWidth/2 + position}px`, // Position is relative to the center of the screen
    transform: `translateX(-50%)`, // Adjust for centering
    width: '100px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    backgroundImage: `url(${collisionObjectImage})`, // Set the path to your collision object image
    backgroundSize: 'contain', // Adjust the background size as needed
    backgroundRepeat: 'no-repeat',
  };

  return <div style={elementStyle}></div>;
};

export default InteractiveElement;
