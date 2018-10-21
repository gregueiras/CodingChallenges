/*jshint esversion: 6*/

const size = 10;
let x = 0, y = 0;

function setup() {
  createCanvas(400, 400);
  background(33);
  stroke(255);
  strokeWeight(size/3);
}

function draw() {
  if (random(1) > 0.5) {
    line(x, y, x + size, y + size);
  } else {
    line(x + size, y, x, y + size);
  }
  x += size;
  if (x >= width) {
    x = 0;
    y += size;
  }
    
}