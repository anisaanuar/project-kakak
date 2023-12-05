// App.js
import React, { useState, useEffect } from 'react';
import Player from './Player';
import InteractiveElement from './InteractiveElement';

const App = () => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [collisionObjectPosition, setCollisionObjectPosition] = useState(
    window.innerWidth + 100 // Start off-screen
  );
  const [showTextBox, setShowTextBox] = useState(false);
  const [arrowKeyPressed, setArrowKeyPressed] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      setArrowKeyPressed(event.key);
    }
  };

  const handleKeyUp = () => {
    setArrowKeyPressed(null);
  };

  useEffect(() => {
    const moveSpeed = 5; // Adjust the movement speed as needed

    const movePlayer = () => {
      if (arrowKeyPressed === 'ArrowLeft') {
        setPlayerPosition((prev) => Math.max(prev - moveSpeed, 0));
        setCollisionObjectPosition((prev) => prev + moveSpeed);
      } else if (arrowKeyPressed === 'ArrowRight') {
        setPlayerPosition((prev) =>
          Math.min(prev + moveSpeed, window.innerWidth - 200)
        );
        setCollisionObjectPosition((prev) => prev - moveSpeed);
      }
    };

    const intervalId = setInterval(movePlayer, 16); // Adjust the interval as needed

    return () => {
      clearInterval(intervalId);
    };
  }, [arrowKeyPressed]);

  useEffect(() => {
    // Check for collision between player and collision object
    const playerWidth = 100; // Adjust the player width
    const collisionObjectWidth = 100; // Adjust the collision object width

    const isCollision =
      playerPosition + playerWidth >= collisionObjectPosition &&
      playerPosition <= collisionObjectPosition + collisionObjectWidth;

    setShowTextBox(isCollision);
  }, [playerPosition, collisionObjectPosition]);

  useEffect(() => {
    const handleResize = () => {
      if (collisionObjectPosition > window.innerWidth - 200) {
        setCollisionObjectPosition(window.innerWidth - 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Player position={playerPosition} />
      <InteractiveElement position={collisionObjectPosition} />
      {showTextBox && <div>Text Box</div>}
    </div>
  );
};

export default App;
