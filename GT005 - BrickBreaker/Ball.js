/*jshint esversion: 6 */

class Ball {
    constructor(x, y, vel) {
        this.pos = createVector(x, y);
        if (vel)
            this.vel = vel;
        else
            this.vel = createVector(random(-2, 2), random(-2, 2));
        this.size = 8;
        this.alive = true;
    }
    update() {
        this.pos.add(this.vel);

        if (this.intersect(pad)) {
            this.hitPad();
        }

        if (this.pos.x - this.size / 2 <= 0 || this.pos.x + this.size / 2 >= width) {
            this.hitSide();
        }

        if (this.pos.y - this.size / 2 <= 0) {
            this.hitTop();
        }

        if (this.pos.y + this.size / 2 >= height) {
            this.alive = false;
        }

    }
    hitSide() {
        this.vel.x *= -1;
    }
    hitTop() {
        this.vel.y *= -1;
    }
    hitPad() {
        this.hitTop();

        this.vel.x = map(pad.pos.x - this.pos.x, -pad.width / 2, pad.width / 2, 3, -3);
    }

    show() {
        fill(255);
        noStroke();

        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    intersect(obj2) {
        return (this.pos.x - this.size / 2 <= obj2.pos.x + obj2.width / 2 &&
            this.pos.x + this.size / 2 >= obj2.pos.x - obj2.width / 2 &&
            this.pos.y + this.size / 2 >= obj2.pos.y - obj2.height / 2 &&
            this.pos.y - this.size / 2 <= obj2.pos.y + obj2.height / 2);

    }
}