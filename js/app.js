// Variables declared for use in multiple scopes
let levelComplete = false;

// Enemies our player must avoid
class Enemy {
  constructor (x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    this.x = this.x + 65 * dt;
    if (this.x > 500) {
      this.x = -3;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class EnemySlow extends Enemy {
  update(dt) {
    this.x = this.x + 20 * dt;
    if (this.x > 500) {
      this.x = -3;
    }
  }
}

class EnemyFast extends Enemy {
  update(dt) {
    this.x = this.x + 100 * dt;
    if (this.x > 520) {
      this.x = -50;
    }
  }
}

// Player that user attempts to navigate "safely" across the canvas
class Player {
  constructor () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 385;
  }

  update(dt) {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(k) {
    switch(k) {
      case 'left':
        this.x = this.x - 20;
        break;
      case 'right':
        this.x +=20;
        break;
      case 'up':
        this.y -=20;
        break;
      case 'down':
        this.y +=20;
        break;
    }
  }

  // Method filters for collision of player entity and an enemy entity.
  // If collision detected, player is moved back to original start point.
  checkForCollision() {
    let xLow = this.x - 48;
    let xHigh = this.x + 48;
    let yLow = this.y - 40;
    let yHigh = this.y + 40;
    allEnemies.forEach(function(e) {
      if (e.x > xLow && e.x < xHigh && e.y > yLow && e.y < yHigh) {
        player.x = 200;
        player.y = 405;
      };
    });
  }

  checkForFinish() {
    if(this.y < -10) {
      document.body.querySelector('#completion-popover').style.display = 'block';
      levelComplete = true;
    }
  }
}

// Instanting objects for game entitities.
// Instances of Enemy class placed in single array `allEnemies`.
const enemy1 = new Enemy(25, 220);
const enemy2 = new Enemy(200, 220);
const enemy3 = new EnemySlow(-140, 130);
const enemy4 = new EnemySlow(10, 130);
const enemy5 = new EnemySlow(210, 130);
const enemy6 = new EnemyFast(300, 50);
const enemy7 = new EnemyFast(5, 50);
const enemy8 = new EnemyFast(-100, 50);
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];
let player = new Player();

// Listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Popover functionality

/**
 * Functionality for popover adapted from the w3schools tutorial
 * "How TO - CSS/JS Modal": https://www.w3schools.com/howto/howto_css_modals.asp
 */
const popoverClose = document.body.querySelectorAll('.popover-close');
const popover = document.body.querySelectorAll('.popover');
const completionPopoverClose = document.body.querySelector('#completion-popover-close');

// Designed to handle possiblity of multiple popovers on page.
popoverClose.forEach(function(x) {
  x.addEventListener('click', closePopover);
});

function closePopover() {
  popover.forEach(function(x) {
    x.style.display = 'none';
  });
  // If closing popover displayed on game completion, reload page.
  if (this.id ='completion-popover-close') {
    location.reload();
  };
}

// For popover displayed on game completion, refresh page if user selects to play again.
document.querySelector("#play-again-button").addEventListener('click', function () {
  location.reload();
});
