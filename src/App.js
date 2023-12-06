// App.js
import React, { useState, useEffect } from 'react';
import Player from './Player';
import InteractiveElement from './InteractiveElement';
import CollisionObject from './CollisionObject';
import backgroundImage from './assets/platform.jpg';
import textboxImage from './assets/textbox.png';

const App = () => {
    const [playerPosition, setPlayerPosition] = useState(0);
    const [playerDirection, setPlayerDirection] = useState('right');
    const [showTextBox, setShowTextBox] = useState(false);
    const [textboxMessage, setTextboxMessage] = useState('Happy Birthday!');
    const [arrowKeyPressed, setArrowKeyPressed] = useState(null);
    const [isWalking, setIsWalking] = useState(false);
    const [backgroundPosition, setBackgroundPosition] = useState(0);

    const [collisionObjects] = useState([
        new CollisionObject(500, 'message 1', './assets/collision.png', 200, 100),
        new CollisionObject(1000, 'message 2', './assets/collision.png', 200, 100),
        new CollisionObject(1500, 'message 3', './assets/collision.png', 200, 100),
        new CollisionObject(2000, 'message 4', './assets/collision.png', 200, 100),
    ]);;

    useEffect(() => {
        const moveObjects = () => {
            const minX = 0;
            const maxX = 2 * window.innerWidth
            if (arrowKeyPressed === 'ArrowLeft') {
                setPlayerPosition((prev) => Math.max(prev - moveSpeed, minX));
                setPlayerDirection('left');
                setIsWalking(true);
                setBackgroundPosition(-playerPosition);
                collisionObjects.forEach(collisionObject => collisionObject.setPosition(playerPosition));
            } else if (arrowKeyPressed === 'ArrowRight') {
                setPlayerPosition((prev) => Math.min(prev + moveSpeed, maxX));
                setPlayerDirection('right');
                setIsWalking(true);
                setBackgroundPosition(-playerPosition);
                collisionObjects.forEach(collisionObject => collisionObject.setPosition(playerPosition));
            } else {
                setIsWalking(false);
                // setPlayerDirection('none'); // only makes sense if you have a forward-facing sprite
            }

            // Check for collision between player and collision object
            setShowTextBox(false);
            collisionObjects.forEach(collisionObject => {
                if (collisionObject.checkCollision(100)) {
                    setShowTextBox(true);
                    setTextboxMessage(collisionObject.message);
                }
            });
        };

        const intervalId = setInterval(moveObjects, 16);

        return () => {
            clearInterval(intervalId);
        };
    }, [arrowKeyPressed, playerPosition]);

    useEffect(() => {
        /*
        const handleResize = () => {
            setCollisionObjectPosition(collisionObjectStart - playerPosition);
            setBackgroundPosition(-playerPosition);
        };
        // resizing is janky but i'm not sure what's causing it and it's not really worth the effort
        */
 
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        //window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            //window.removeEventListener('resize', handleResize);
        };
    }, []);

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
      <Player walking={isWalking} direction={playerDirection} />
      {collisionObjects.map(collisionObject => <InteractiveElement position={collisionObject.position}/>)}
      {showTextBox && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '711px', height: '100px', padding: '100px', transform: 'translate(-50%, -70%)', 
        backgroundImage: `url(${textboxImage})`, backgroundSize: 'cover' }}>
          {textboxMessage}
        </div>
      )}
    </div>
    );
};

export default App;