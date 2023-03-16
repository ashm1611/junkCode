// ammount to add on each registry creation success
const confettiCount = 100;
const sequinCount = 10;

// "physics" variables
const gravityConfetti = 0.3;
const gravitySequins = 0.55;
const dragConfetti = 0.075;
const dragSequins = 0.02;
const terminalVelocity = 3;

// init other global elements
let canvas = null;
let ctx = '';

// add Confetto/Sequin objects to arrays to draw them
const confetti = [];
const sequins = [];

const colors = [
  { front: '#068488', back: '#127776' }, // Teal
  { front: '#199F9E', back: '#11A09F' }, // Light Blue
  { front: '#5c86ff', back: '#09BCBA' }, // Darker Blue
];

// helper function to pick a random number within a range
const randomRange = (min, max) => Math.random() * (max - min) + min;

// helper function to get initial velocities for confetti
// this weighted spread helps the confetti look more realistic
const initConfettoVelocity = (xRange, yRange) => {
  const x = randomRange(xRange[0], xRange[1]);
  const range = yRange[1] - yRange[0] + 1;
  let y =
    yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
  if (y >= yRange[1] - 1) {
    // Occasional confetto goes higher than the max
    y += Math.random() < 0.25 ? randomRange(1, 3) : 0;
  }
  return { x, y: -y };
};

// Confetto Class
function Confetto() {
  this.randomModifier = randomRange(0, 99);
  this.color = colors[Math.floor(randomRange(0, colors.length))];
  this.dimensions = {
    x: randomRange(2, 9),
    y: randomRange(8, 15),
  };
  this.position = {
    x: randomRange(canvas.width / 2, canvas.width / 2),
    y: randomRange(canvas.height / 2, canvas.height / 2),
  };
  this.rotation = randomRange(0, 2 * Math.PI);
  this.scale = {
    x: 1,
    y: 1,
  };
  this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
}
// eslint-disable-next-line func-names
Confetto.prototype.update = function() {
  // apply forces to velocity
  this.velocity.x -= this.velocity.x * dragConfetti;
  this.velocity.y = Math.min(
    this.velocity.y + gravityConfetti,
    terminalVelocity
  );
  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

  // set position
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  // spin confetto by scaling y and set the color, .09 just slows cosine frequency
  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
};

// Sequin Class
function Sequin() {
  this.color = colors[Math.floor(randomRange(0, colors.length))].back;
  this.radius = randomRange(1, 2);
  this.position = {
    x: randomRange(canvas.width / 2, canvas.width / 2),
    y: randomRange(canvas.height / 2, canvas.height / 2),
  };
  this.velocity = {
    x: randomRange(-6, 6),
    y: randomRange(-8, -12),
  };
}
// eslint-disable-next-line func-names
Sequin.prototype.update = function() {
  // apply forces to velocity
  this.velocity.x -= this.velocity.x * dragSequins;
  this.velocity.y += gravitySequins;

  // set position
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

// add elements to arrays to be drawn
export const initBurst = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto());
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < sequinCount; i++) {
    sequins.push(new Sequin());
  }
};

// draws the elements on the canvas
export const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(confetto => {
    const width = confetto.dimensions.x * confetto.scale.x;
    const height = confetto.dimensions.y * confetto.scale.y;

    // move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // update confetto "physics" values
    confetto.update();

    // get front or back fill color
    ctx.fillStyle =
      confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // defining area of animation
    if (confetto.velocity.y < 0) {
      ctx.clearRect(canvas.width / 2, canvas.height / 2, 200, 200);
    }
  });

  sequins.forEach(sequin => {
    // move canvas to position
    ctx.translate(sequin.position.x, sequin.position.y);

    // update sequin "physics" values
    sequin.update();

    // set the color
    ctx.fillStyle = sequin.color;

    // draw sequin
    ctx.beginPath();
    ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
    ctx.fill();

    // reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // defining area of animation
    if (sequin.velocity.y < 0) {
      ctx.clearRect(canvas.width / 2, canvas.height / 2, 200, 200);
    }
  });

  // remove confetti and sequins that fall off the screen
  // must be done in seperate loops to avoid noticeable flickering
  confetti.forEach((confetto, index) => {
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
  });
  sequins.forEach((sequin, index) => {
    if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
  });

  window.requestAnimationFrame(render);
};

export function showConfetti() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.zIndex = '9999999';
  canvas.style.position = 'absolute';
  canvas.style.top = '50px';
  canvas.style.right = '32px';
  initBurst();
  render();

  setTimeout(() => {
    canvas.style.height = 0;
  }, 5000);
}
