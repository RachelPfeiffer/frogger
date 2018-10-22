// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
const randomX = Math.floor(Math.random() * 5);
const yOptions = [210, 130, 50];
const randomY = function () {
  const randomLine = Math.floor((Math.random() * 3));
  return yOptions[randomLine];
};
const speedOptions = [50, 75, 75, 100, 150, 200]
const randomSpeed = function () {
  const pickSpeed = Math.floor((Math.random() * 5));
  return speedOptions[pickSpeed];
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
  // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
      this.x = -50;
      this.y = randomY();
      this.speed = randomSpeed();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 370;
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
  if (this.y<-30) {
    this.y = -30;
  } else if (this.y > 370) {
    this.y = 370;
  } else if (this.x < 0) {
    this.x = 0;
  } else if (this.x > 400) {
    this.x = 400;
  } else if ((Math.abs(this.x - enemyOne.x) < 55) && this.y === enemyOne.x || (Math.abs(this.x - enemyTwo.x) < 55 && this.y === enemyTwo.y) || (Math.abs(this.x - enemyThree.x < 55) && enemyThree.y === enemyTwo.y)) {
    this.x = 200;
    this.y = 370;
  } else if (this.y = -30) {
    const youWin = document.createElement("div");
    youWin.innerText = 'You win!'
    const window = document.querySelector("body");
    window.appendChild(youWin);
    document.removeEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

  }
};

Player.prototype.handleInput = function(key) {
  if (key === 'left') {
    this.x -= 100;
  } else if (key === 'up') {
    this.y -= 80;
  } else if (key === 'right') {
    this.x += 100;
  } else if (key === 'down'){
    this.y += 80;
  }
}
// Draw the enemy on the screen, required method for game
  Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyOne = new Enemy(randomX, randomY(), randomSpeed());
const enemyTwo = new Enemy(randomX, randomY(), randomSpeed());
const enemyThree = new Enemy(randomX, randomY(), randomSpeed());

const allEnemies = [enemyOne,enemyTwo,enemyThree];
const player = new Player();
allEnemies.forEach(function randomize(enemy){
  enemy.x = randomX;
  enemy.y = randomY();
  enemy.speed = randomSpeed();
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
