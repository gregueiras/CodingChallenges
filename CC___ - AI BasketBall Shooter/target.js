/*jshint esversion: 6*/

class Target {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = size;
    }

    applyForce(x, y) {
        this.acc = createVector(x, y);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    draw() {
        ellipseMode(CENTER);
        rectMode(CENTER);

        stroke('red');
        fill('white');
        rect(this.pos.x, this.pos.y - 35, 120, 120);

        noFill();
        stroke('red');
        rect(this.pos.x, this.pos.y - 35, 50, 50);

        noFill();
        strokeWeight(4);
        stroke('orange');
        ellipse(this.pos.x, this.pos.y, this.size, this.size / 4);
    }
}