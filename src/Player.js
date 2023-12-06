// Player.js
import React, { useState, useEffect } from 'react';
import walkFrame1 from './assets/sprite-01.png';
import walkFrame2 from './assets/sprite-02.png';

const Player = ({ walking }) => {
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    let animationInterval;

    if (walking) {
      // Start the animation when walking begins
      animationInterval = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame === 1 ? 2 : 1));
      }, 300); // Adjust the interval as needed
    } else {
      // Reset the animation when walking stops
      setCurrentFrame(1);
      clearInterval(animationInterval);
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [walking]);

  const playerStyle = {
    position: 'absolute',
    bottom: '0',
    left: '45%', // Center the player horizontally
    transform: 'translateX(-50%)', // Adjust for centering
    width: '100px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    backgroundImage: `url(${currentFrame === 1 ? walkFrame1 : walkFrame2})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };

  return <div style={playerStyle}></div>;
};

export default Player;
