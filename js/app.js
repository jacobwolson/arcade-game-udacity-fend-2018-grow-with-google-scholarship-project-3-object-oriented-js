/*Portions of Matthew Cranford's walkthrough for this project were consulted
*and concepts from the walkthrough were implimented or built upon in writing
*code at various points throughout `app.js` and at places where interaction
*between `app.js` and other scripts was added beyond such interaction included
*in the source code provided by Udacity for this project.
*
*See:
*https://matthewcranford.com/arcade-game-walkthrough-part-1-starter-code-breakdown/
*https://matthewcranford.com/arcade-game-walkthrough-part-2-pseudo-code/
*https://matthewcranford.com/arcade-game-walkthrough-part-3-creating-a-hero/
*https://matthewcranford.com/arcade-game-walkthrough-part-4-heros-first-steps/
*https://matthewcranford.com/arcade-game-walkthrough-part-5-adding-enemies/
*https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/
*/

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
      this.x = 0;
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
      this.x = 0;
    }
  }
}

class EnemyFast extends Enemy {
  update(dt) {
    this.x = this.x + 100 * dt;
    if (this.x > 520) {
      this.x = 0;
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
        if (this.x < -45) {
        this.x = -45;
        };
        break;
      case 'right':
        this.x +=20;
        if (this.x > 445) {
          this.x = 445;
        };
        break;
      case 'up':
        this.y -=20;
        break;
      case 'down':
        this.y +=20;
        if (this.y > 415) {
          this.y = 415;
        };
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

  /* When the player makes it "home," the level is finished and the
  *completion popover is displayed.
  *
  *At this point, `levelComplete` is set to true, triggering
  *`window.cancelAnimationFrame(main)` to run inside the `update(dt)` function
  *in engine.js, stopping the game from being redrawn and preventing the player
  *and the enemies entities from changing position any futher. The concept for this
  *functionality and its implimentation using `window.cancelAnimationFrame()`
  *was inspired by "Part 6" of Matthew Cranford's walkthrough for this project,
  *"Collisions, Win Conditions, and Game Resets."
  */  
  checkForFinish() {
    if(this.y < -10) {
      document.body.querySelector('#completion-popover').style.display = 'block';
      levelComplete = true;
    }
  }
}

// Instantiation of objects to create game entitities
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
 * "How TO - CSS/JS Modal": https://www.w3schools.com/howto/howto_css_modals.asp.
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
