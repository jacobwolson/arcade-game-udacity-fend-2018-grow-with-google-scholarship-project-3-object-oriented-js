// Variables declared use in multiple scopes
let levelComplete = false;

// Enemies our player must avoid
class Enemy {
  constructor (x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    this.x = this.x + 50 * dt;
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
    this.x = this.x + 65 * dt;
    if (this.x > 500) {
      this.x = -3;
    }
  }
}

class EnemyFaster extends Enemy {
  update(dt) {
    this.x = this.x + 100 * dt;
    if (this.x > 520) {
      this.x = -50;
    }
  }
}

// The player the user controls and attempts to navigate across the canvas with

class Player {
  constructor () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 405;
  }

  update(dt) {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(k) {
    if (k == 'left') {
      this.x -=15;
      if (this.x < -50) {
        this.x = -45;
      }
    }
    if (k == 'right') {
      this.x +=15;
      if (this.x > 450) {
        this.x = 445;
      }
    }
    if (k == 'up') {
      this.y -= 15;
    }
    if (k == 'down') {
      this.y += 15;
      if (this.y > 425) {
        this.y = 415;
      }
    }
  }

  checkForCollision() {
    let xLow = this.x - 60;
    let xHigh = this.x + 60;
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



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-5, 310);
const enemy2 = new Enemy(220, 310);
const enemy3 = new Enemy(350, 310);
const enemy4 = new EnemyFast(25, 220);
const enemy5 = new EnemyFast(200, 220);
const enemy6 = new EnemySlow(-140, 130);
const enemy7 = new EnemySlow(10, 130);
const enemy8 = new EnemySlow(210, 130);
const enemy9 = new EnemyFaster(200, 50);
// let enemy1 = new Enemy(50, 50);
// let enemy2 = new EnemySlow(200, 150);
// let enemy3 = new EnemyFast(200, 300);
// let enemy4 = new EnemySlow(0, 200);
// let enemy5 = new EnemyFast(-100, 300);
// let enemy6 = new EnemySlow(-100, 150);
// let enemy7 = new EnemyFast(-200, 300);
// let enemy8 = new Enemy(200, 50);
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9];
let player = new Player();



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

// Popover functionality
const popoverClose = document.body.querySelectorAll('.popover-close');
const popover = document.body.querySelectorAll('.popover');
const completionPopoverClose = document.body.querySelector('#completion-popover-close');

/*
 * Code designed to handle possiblity of multiple popovers on page.
 */
popoverClose.forEach(function(x) {
  x.addEventListener('click', function () {
  popover.forEach(function(x) {
    x.style.display = 'none';
  });
  if (x.id = "completion-popover-close") {
    location.reload();
  };
  });
});

/* For popover displayed on game completion, refresh page if user
 * selects to play again.
 */
document.querySelector("#play-again-button").addEventListener('click', function () {
  location.reload();
});
