// Player.js
import React, { useState } from 'react';

const Player = ({ position }) => {
  const [isMoving, setIsMoving] = useState(false);

  const playerStyle = {
    position: 'absolute',
    left: '50%',
    bottom: '50px',
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      setIsMoving(true);
    }
  };

  const handleKeyUp = () => {
    setIsMoving(false);
  };

  return (
    <div
      style={playerStyle}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex="0"
    >
      {/* Your player sprite or animation component */}
      Player Sprite
    </div>
  );
};

export default Player;
