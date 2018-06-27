/*jshint esversion: 6 */ 

function setup() {
    createCanvas(600, 600);
    strokeWeight(2);
    background(20);
    colorMode(HSB);

}

var n = 0;
var c = 8;

function draw() {

    if (n < 3000) {

        let phi = n * 137.5 * Math.PI / 180;
        let r = c * sqrt(n);

        let x = map(r * Math.cos(phi), -width / 2, width / 2, 0, width);
        let y = map(r * Math.sin(phi), height / 2, -height / 2, height, 0);

        fill((r) % 256, 255, 255);
        noStroke();
        ellipse(x, y, 8, 8);
        n++;
    }
}