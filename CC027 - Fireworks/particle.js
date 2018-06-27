class Particle {
    constructor(x, y, vel) {
        this.pos = createVector(x, y);
        if (vel) {
            this.vel = vel;
        } else {
            this.vel = createVector(0, -4);
        }
        this.acc = createVector(0, 0);

    }

    applyForce(force) {
        this.acc.add(force);

    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        point(this.pos.x, this.pos.y);
    }
}

