let canvas = {
  size: { x: null, y: null, },
};

let colors = {};

let chars = [];

let rowTime = 0;
let charTimer = 0;
let charTime = 50;
let hasHit = false;

let charWidth, charPerRow, timePerRow;

function setup () {
  windowResized();

  canvas.e = createCanvas(canvas.size.x, canvas.size.y);

  colors = {
    white: color(255),
    black: color(0)
  };

  noFill();
  stroke(colors.white);
  strokeWeight(1);
}

function draw () {
  background(colors.black);
  rowTime += 16.667;
  charTimer += 16.667;

  if (charTimer >= charTime) {
    charTimer -= charTime;
    chars.push( Math.random() > 0.5 ? "/" : "\\" );
  }
  
  for (let i = 0; i < chars.length; i ++) {
    let y = Math.floor(i / charPerRow);
    let x = i - y * charPerRow;
    let t = (hasHit ? rowTime / timePerRow * charWidth : 0);

    if (chars[i] ==  "/") line( x * charWidth, (y + 1) * charWidth - t, (x + 1) * charWidth, y * charWidth - t );
    if (chars[i] == "\\") line( x * charWidth, y * charWidth - t, (x + 1) * charWidth, (y + 1) * charWidth - t );

    if (!hasHit && y * charWidth >= canvas.size.y * 0.9) {
      hasHit = true;
      rowTime = 0;
    }
  }

  if (hasHit && rowTime / timePerRow >= 1) {
    chars.splice(0, charPerRow);
    rowTime -= timePerRow;
  }
}

function windowResized () {
  // Canvas Resizing
  canvas.size.x = window.innerWidth;
  canvas.size.y = window.innerHeight;

  resizeCanvas(canvas.size.x, canvas.size.y);
  
  // Calcs
  charWidth = Math.min(canvas.size.x, canvas.size.y) * 0.1;
  charPerRow = Math.floor(canvas.size.x / charWidth) + 1;
  timePerRow = charPerRow * charTime;
}