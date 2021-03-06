var Sound = function (src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.style.display = "none";
  this.play = function () {
    this.sound.currentTime = 0;
    this.sound.play();
  }
}
// Enemies our player must avoid
var Enemy = function() {
//choose arbitrary x location for enemies to start
  const randomX = 10;
 //choose on of the 3 rows that the enemies may show up on
  const possibleYs = [60, 130, 200, 60, 130];
  const randomYpicker = Math.floor((Math.random() * 3)) ;
  const randomY = possibleYs[randomYpicker];


    this.sprite = 'images/enemy-bug.png';
    this.x = randomX;
    this.y = randomY;
    this.speed = Math.random()*150 + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  const possibleYs = [60, 130, 200];
  const randomYpicker = Math.floor((Math.random() * 3)) ;
  const randomY = possibleYs[randomYpicker];
  this.x = this.x += this.speed * dt;

  //When the enemy finishes crossing the board, it chooses a new speed and goes back to the beginning of the board.
  if (this.x > 500) {
    this.x = -100;
    this.speed = (Math.random()*150 + 100);
    this.y = randomY;
  }

  //If the player is to be found anywhere on the picture of the cockroach, he's out.
  if (Math.abs(player.x - this.x) < 70 && Math.abs(player.y - this.y) < 15) {
  player.x = 200;
  player.y = 370;
  splat.play();
}
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 370;
};

Player.prototype.update = function() {
  //if player reaches top, let him jump in the water and show the player a win.
  if (this.y < -20) {
    this.y = -20;
    setTimeout(function() {
      tada.play();
      confirm('You Win! Click OK to close this window, then click anywhere to start again!');
      restart();
      function restart() {
        if (player.y<=-20) {
        player.x = 200;
        player.y = 370;
        console.log("new game in progress");
      } else {
        document.removeEventListener('keyup', restart);
        document.removeEventListener('click', restart);
      };
    }
      document.addEventListener('click', restart)
      document.addEventListener('keyup', restart)

    },50);

  };

//Don't let sprite leave the top, sides, bottom.
  if (this.x < 0) {
    this.x = 0;
  };

  if (this.x > 400) {
    this.x = 400;
  };

  if (this.y > 370) {
    this.y = 370;
  };
};
confirm("Use the arrow keys to guide your player to the river! Ready?");

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const splat = new Sound('splat.mp3');
const tada = new Sound('tada.mp3');
const jump = new Sound('boing.mp3');
// THANK YOU MIKE KOENIG FOR THE SOUND EFFECT!

Player.prototype.handleInput = function(keydown) {
  if (keydown === 'left') {
    this.x -= 100;
    jump.play();
  } else if (keydown === 'right') {
    this.x += 100;
    jump.play();
  } else if (keydown === 'up') {
    this.y -= 80;
    jump.play();
  } else if (keydown === 'down') {
    this.y += 80;
    jump.play();
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const EnemyOne = new Enemy();
const EnemyTwo = new Enemy();
const EnemyThree = new Enemy();
const EnemyFour = new Enemy();
const allEnemies = [EnemyOne, EnemyTwo, EnemyThree, EnemyFour];
const player = new Player();

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
