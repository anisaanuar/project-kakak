class CollisionObject {
    constructor(initialPosition, message, image, height, width) {
      this.initialPosition = initialPosition;
      this.position = initialPosition;
      this.message = message;
      this.image = image;
      this.height = height;
      this.width = width;
    }
  
    setPosition(playerPosition) {
        this.position = this.initialPosition - playerPosition;
    }

    // Function to check for collision with player
    checkCollision(playerWidth) {
      // Collision is calculated relative to the center of the screen
      return playerWidth >= this.position && 0 <= this.position + this.width;
    }
}
  
export default CollisionObject;