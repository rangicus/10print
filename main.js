let screen = {};
let colors = {};

let chars = [];

let rowTime = 0;
let charTimer = 0;
let charTime = 50;
let hasHit = false;

let canvas, charWidth, charPerRow, timePerRow;

function setup () {
  screen.w = windowWidth; screen.h = windowHeight;

  charWidth = Math.min(screen.w, screen.h) * 0.1;
  charPerRow = Math.floor(screen.w / charWidth) + 1;
  timePerRow = charPerRow * charTime;
  
  canvas = createCanvas(screen.w, screen.h);

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

    if (!hasHit && y * charWidth >= screen.h * 0.9) {
      hasHit = true;
      rowTime = 0;
    }
  }

  if (hasHit && rowTime / timePerRow >= 1) {
    chars.splice(0, charPerRow);
    rowTime -= timePerRow;
  }
}