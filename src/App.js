// App.js
import React, { useState, useEffect } from 'react';
import Player from './Player';
import InteractiveElement from './InteractiveElement';
import backgroundImage from './assets/platform.jpg';
import textboxImage from './assets/textbox.png';

const App = () => {
    const [playerPosition, setPlayerPosition] = useState(0);
    const [collisionObjectPosition, setCollisionObjectPosition] = useState(
        window.innerWidth + 100
    );
    const [showTextBox, setShowTextBox] = useState(false);
    const [arrowKeyPressed, setArrowKeyPressed] = useState(null);
    const [isWalking, setIsWalking] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState(0);

    useEffect(() => {
        const moveObjects = () => {
            if (arrowKeyPressed === 'ArrowLeft') {
                setPlayerPosition((prev) => Math.max(prev - moveSpeed, 0));
                setCollisionObjectPosition((prev) => prev + moveSpeed);
                setBackgroundPosition((prev) => prev + moveSpeed);
                setIsWalking(true);
            } else if (arrowKeyPressed === 'ArrowRight') {
                setPlayerPosition((prev) =>
                    Math.min(prev + moveSpeed, window.innerWidth - 200)
                );
                setCollisionObjectPosition((prev) => prev - moveSpeed);
                setBackgroundPosition((prev) => prev - moveSpeed);
                setIsWalking(true);
            } else {
                setIsWalking(false);
            }

            // Check for collision between player and collision object
            const playerWidth = 0; // Adjust the player width
            const collisionObjectWidth = 600; // Adjust the collision object width

            const isCollision =
                playerPosition + playerWidth >= collisionObjectPosition &&
                playerPosition <= collisionObjectPosition + collisionObjectWidth;

            setShowTextBox(isCollision);
        };

        const intervalId = setInterval(moveObjects, 16);

        return () => {
            clearInterval(intervalId);
        };
    }, [arrowKeyPressed, playerPosition, collisionObjectPosition]);

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
    }, [collisionObjectPosition]);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            setArrowKeyPressed(event.key);
        }
    };

    const handleKeyUp = () => {
        setArrowKeyPressed(null);
    };

    const moveSpeed = 5;

    return (
        <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${backgroundPosition}px 0`,
        backgroundSize: 'cover',
      }}
    >
      <Player walking={isWalking} />
      <InteractiveElement position={collisionObjectPosition} />
      {showTextBox && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '711px', height: '100px', padding: '100px', transform: 'translate(-50%, -70%)', 
        backgroundImage: `url(${textboxImage})`, backgroundSize: 'cover' }}>
          Birthday message goes here
        </div>
      )}
    </div>
    );
};

export default App;