/*jshint esversion: 6*/
const states = {
    WAIT: 0,
    RISING: 1,
    SCORED: 2
};


class Ball {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.size = size;
        this.state = states.WAIT;
        this.alpha = 255;
    }

    applyForce(x, y) {
        this.acc = createVector(x, y);
        this.state = states.RISING;
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        if (this.state != states.WAIT) {
            this.acc = createVector(0, 0.05);
        }

        return this.score();

    }

    score() {
        if (this.pos.x - this.size < target.pos.x - target.size && this.pos.x + this.size > target.pos.x - target.size) {
            this.vel.y = -this.vel.y;
        } else if (this.pos.x > target.pos.x - target.size &&
            this.pos.x < target.pos.x + target.size &&
            floor(this.pos.y) == floor(target.pos.y) &&
            this.vel.y >= 0) {
            this.state = states.SCORED;
            return true;
        } else {
            return false;
        }
    }

    draw() {
        if (this.state === states.SCORED) {
            this.alpha -= 5;
        }
        noStroke();
        let c = color('orange');
        c.setAlpha(this.alpha);
        fill(c);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

}