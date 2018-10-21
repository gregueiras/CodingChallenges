/*jshint esversion: 6*/

let size = 10;
let slider;
let x = 0, y = 0;

function setup() {
  createCanvas(400, 400);
  background(33);
  stroke(255);
  strokeWeight(size/3);

  createDiv();
  slider = createSlider(1, 30, 10)
}

function draw() {
  size = slider.value();
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

  if (y >= height) {
    x = 0;
    y = 0;
    background(33);
  }
    
}