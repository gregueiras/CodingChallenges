/*jshint esversion: 6*/

class Rocket {
    constructor(brain) {
        this.pos = createVector(width / 2, height - 50);
        this.vel = createVector(0, 0);
        this.width = 10;
        this.height = 20;

        if (brain) {
            this.brain = new Brain(brain);
        } else {
            this.brain = new Brain();
        }

        this.count = 0;
        this.score = 0;
        this.crashed = false;

    }

    update() {

        if (this.pos.x < 0 || this.pos.x > width ||
            this.pos.y < 0 || this.pos.y > height) {
            this.crashed = true;
        } else if (dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y) > target.size / 2 &&
            this.count < lifeSpan) {
            this.vel.add(this.brain.instructions[this.count++]);
            this.vel.limit(4);
            this.pos.add(this.vel);
        }
    }

    draw() {

        push();

        noStroke();
        fill(color('cyan'));
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);

        pop();
    }

}