/*jshint esversion: 6 */

var radius;
var myPi;
var inCircle;
var numPoints;
var piText;

function setup() {
    radius = 150;
    createCanvas(2 * radius, 2 * radius);
    ellipseMode(CENTER);
    background(0);
    stroke(255);
    strokeWeight(8);
    ellipse(width / 2, height / 2, radius * 2, radius * 2);
    strokeWeight(4);

    inCircle = 0;
    numPoints = 0;
    piText = createP();
}

function draw() {
    for (let i = 0; i < 10; i++) {

        let newPoint = createVector(random(0, width), random(0, height));
        console.log(newPoint);
        if (dist(width / 2, height / 2, newPoint.x, newPoint.y) > radius) {
            stroke('red');
        } else {
            stroke('green');
            inCircle++;
        }
        numPoints++;

        point(newPoint.x, newPoint.y);
        myPi = 4 * inCircle / numPoints;

    }

    piText.html(`PI: ${myPi} <br> Diff: ${abs(myPi - Math.PI)} <br> Inside Circle: ${inCircle} <br> Total Points: ${numPoints}`);

}