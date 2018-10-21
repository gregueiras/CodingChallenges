/*jshint esversion: 6*/

let
  r1 = 100,
  r2 = 100,
  m1 = 40,
  m2 = 40,
  t1 = Math.PI/4,
  t2 = Math.PI/8,
  t1V = 0,
  t2V = 0;

let canvas;
const g = 1;

function setup() {
  createCanvas(600, 700);
  canvas = createGraphics(600, 700);
  canvas.background(33);
  stroke(255);
  strokeWeight(4);
  fill(255);


}

function draw() {
  let num1 = -g * (2 * m1 + m2) * sin(t1);
  let num2 = -m2 * g * sin(t1 - 2 * t2);
  let num3 = -2 * sin(t1 - t2) * m2;
  let num4 = t2V * t2V * r2 + t1V * t1V * cos(t1 - t2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * t1 - 2 * t2));

  let t1A = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(t1-t2);
  num2 = (t1V*t1V*r1*(m1+m2));
  num3 = g * (m1 + m2) * cos(t1);
  num4 = t2V*t2V*r2*m2*cos(t1-t2);
  den = r2 * (2*m1+m2-m2*cos(2*t1-2*t2));
  
  let t2A = (num1*(num2+num3+num4)) / den;

  image(canvas, 0, 0, width, height);
  let
    x1 = r1 * sin(t1),
    y1 = r1 * cos(t1),
    x2 = x1 + r2 * sin(t2),
    y2 = y1 + r2 * cos(t2);

  translate(width / 2, height / 2);
  line(0, 0, x1, y1);
  ellipse(x1, y1, m1);
  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2);

  canvas.translate(width / 2, height / 2);
  canvas.point(x2, y2);
  
  t1V += t1A;
  t2V += t2A;

  t1 += t1V;
  t2 += t2V;


}